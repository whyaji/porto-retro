"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validation/contact";
import { useI18n } from "@/context/i18n-context";
import { Button } from "@/components/ui/Button";
import { FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { Turnstile } from "next-turnstile";

export const ContactForm: React.FC = () => {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [serverMessage, setServerMessage] = useState<string>("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    if (turnstileSiteKey && !turnstileToken) {
      setStatus("error");
      setServerMessage("Please complete the security verification (Turnstile).");
      return;
    }

    setStatus("loading");
    setServerMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed to send message");
      }

      setStatus("success");
      setServerMessage(t.contact.successMessage);
      reset();
      setTurnstileToken("");
    } catch (err: unknown) {
      setStatus("error");
      const errorMessage =
        err instanceof Error ? err.message : t.contact.errorMessage;
      setServerMessage(errorMessage);
    }
  };

  return (
    <div className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-6 sm:p-8">
      <div className="mb-6 pb-4 border-b-2 border-[var(--navy)]">
        <h3 className="text-xl font-extrabold font-display text-[var(--navy)] tracking-tight">
          {t.contact.formTitle}
        </h3>
        <p className="text-xs font-mono text-[var(--navy)]/60 mt-1">
          SECURE_POST_CHANNEL // 256-BIT DISPATCH
        </p>
      </div>

      {status === "success" && (
        <div className="mb-6 p-4 bg-[var(--green-muted)] border-2 border-[var(--green)] flex items-start gap-3 text-[var(--green)]">
          <FiCheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm font-mono font-semibold">
            {serverMessage || t.contact.successMessage}
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-600 flex items-start gap-3 text-red-700">
          <FiAlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm font-mono font-semibold">
            {serverMessage || t.contact.errorMessage}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-mono font-bold text-[var(--navy)] uppercase mb-1.5"
          >
            {t.contact.nameLabel} <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder={t.contact.namePlaceholder}
            {...register("name")}
            className="w-full px-3.5 py-2.5 bg-[var(--surface-light)] border-2 border-[var(--navy)] text-sm font-sans text-[var(--navy)] placeholder-[var(--navy)]/40 focus:bg-white focus:outline-none transition-colors"
          />
          {errors.name && (
            <p className="mt-1 text-xs font-mono text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-mono font-bold text-[var(--navy)] uppercase mb-1.5"
          >
            {t.contact.emailLabel} <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder={t.contact.emailPlaceholder}
            {...register("email")}
            className="w-full px-3.5 py-2.5 bg-[var(--surface-light)] border-2 border-[var(--navy)] text-sm font-sans text-[var(--navy)] placeholder-[var(--navy)]/40 focus:bg-white focus:outline-none transition-colors"
          />
          {errors.email && (
            <p className="mt-1 text-xs font-mono text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="block text-xs font-mono font-bold text-[var(--navy)] uppercase mb-1.5"
          >
            {t.contact.subjectLabel} <span className="text-red-500">*</span>
          </label>
          <input
            id="subject"
            type="text"
            placeholder={t.contact.subjectPlaceholder}
            {...register("subject")}
            className="w-full px-3.5 py-2.5 bg-[var(--surface-light)] border-2 border-[var(--navy)] text-sm font-sans text-[var(--navy)] placeholder-[var(--navy)]/40 focus:bg-white focus:outline-none transition-colors"
          />
          {errors.subject && (
            <p className="mt-1 text-xs font-mono text-red-600">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs font-mono font-bold text-[var(--navy)] uppercase mb-1.5"
          >
            {t.contact.messageLabel} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder={t.contact.messagePlaceholder}
            {...register("message")}
            className="w-full px-3.5 py-2.5 bg-[var(--surface-light)] border-2 border-[var(--navy)] text-sm font-sans text-[var(--navy)] placeholder-[var(--navy)]/40 focus:bg-white focus:outline-none transition-colors resize-y"
          />
          {errors.message && (
            <p className="mt-1 text-xs font-mono text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Turnstile Captcha */}
        {turnstileSiteKey && (
          <div className="pt-1">
            <Turnstile
              siteKey={turnstileSiteKey}
              onVerify={(token) => setTurnstileToken(token)}
              onExpire={() => setTurnstileToken("")}
              onError={() => setTurnstileToken("")}
              theme="light"
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="gold"
            size="lg"
            fullWidth
            disabled={isSubmitting || status === "loading"}
            leftIcon={<FiSend className="w-4 h-4" />}
          >
            {isSubmitting || status === "loading"
              ? t.contact.sendingBtn
              : t.contact.submitBtn}
          </Button>
        </div>
      </form>
    </div>
  );
};
