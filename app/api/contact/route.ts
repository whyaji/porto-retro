import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { validateTurnstileToken } from "next-turnstile";
import { contactFormSchema } from "@/lib/validation/contact";
import { logger } from "@/lib/logger";

// Simple in-memory rate limiting map (IP -> timestamp[])
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

// Clean text to prevent email header injection
function sanitizeHeader(str: string): string {
  return str.replace(/[\r\n\0]/g, "").trim();
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  if (isRateLimited(ip)) {
    logger.warn({ ip }, "Contact form rate limit exceeded");
    return NextResponse.json(
      { message: "Too many requests. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const parseResult = contactFormSchema.safeParse(body);

    if (!parseResult.success) {
      logger.warn({ errors: parseResult.error.flatten(), ip }, "Contact form validation failed");
      return NextResponse.json(
        {
          message: "Invalid input data",
          errors: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message, turnstileToken } = parseResult.data;

    // Verify Turnstile Token if secret key is configured in environment
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      if (!turnstileToken) {
        logger.warn({ ip }, "Turnstile token missing in request");
        return NextResponse.json(
          { message: "Security verification token is missing. Please complete the captcha." },
          { status: 400 }
        );
      }

      try {
        const turnstileResult = await validateTurnstileToken({
          token: turnstileToken,
          secretKey: turnstileSecret,
          remoteip: ip !== "127.0.0.1" ? ip : undefined,
        });

        if (!turnstileResult.success) {
          logger.warn(
            { ip, errorCodes: turnstileResult.error_codes },
            "Turnstile token verification failed"
          );
          return NextResponse.json(
            { message: "Security verification failed. Please try again." },
            { status: 400 }
          );
        }
      } catch (turnstileErr) {
        logger.error({ error: turnstileErr, ip }, "Error validating Turnstile token");
        return NextResponse.json(
          { message: "Security verification error. Please try again." },
          { status: 500 }
        );
      }
    }

    const sanitizedName = sanitizeHeader(name);
    const sanitizedEmail = sanitizeHeader(email);
    const sanitizedSubject = sanitizeHeader(subject);

    const recipientEmail =
      process.env.CONTACT_EMAIL || "wahyupatriaji@gmail.com";

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASSWORD;
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
    const smtpFrom =
      process.env.SMTP_FROM ||
      `"Wahyu Patriaji Portfolio" <no-reply@patrialabs.vercel.app>`;

    if (!smtpHost || !smtpUser || !smtpPass) {
      logger.warn(
        { recipientEmail, sanitizedName, sanitizedEmail, sanitizedSubject },
        "SMTP not configured in environment. Simulating email transmission."
      );
      return NextResponse.json(
        {
          success: true,
          message: "Message received successfully (Dev simulation mode).",
        },
        { status: 200 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: smtpFrom,
      to: recipientEmail,
      subject: `[Portfolio Inquiry] ${sanitizedSubject}`,
      text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\nSubject: ${sanitizedSubject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #0b1849; line-height: 1.6;">
          <h2 style="color: #0b1849; border-bottom: 2px solid #e4b028; padding-bottom: 8px;">
            New Portfolio Inquiry
          </h2>
          <p><strong>From:</strong> ${sanitizedName} (&lt;${sanitizedEmail}&gt;)</p>
          <p><strong>Subject:</strong> ${sanitizedSubject}</p>
          <div style="background-color: #ebede3; padding: 16px; border-left: 4px solid #124d1c; margin-top: 16px; white-space: pre-wrap;">${message}</div>
          <p style="font-size: 12px; color: #777; margin-top: 24px;">Sent via patrialabs.vercel.app</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    logger.info(
      { ip, sanitizedEmail, sanitizedSubject },
      "Contact email dispatched successfully"
    );

    return NextResponse.json(
      { success: true, message: "Your message has been sent successfully." },
      { status: 200 }
    );
  } catch (error: unknown) {
    logger.error({ error, ip }, "Unexpected error in contact API handler");
    return NextResponse.json(
      { message: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
