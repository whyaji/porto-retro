import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function POST(req: Request) {
  const baseUrl = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const clientId = process.env.OLLAMA_CF_ACCESS_CLIENT_ID;
  const clientSecret = process.env.OLLAMA_CF_ACCESS_CLIENT_SECRET;
  if (clientId) {
    headers["CF-Access-Client-Id"] = clientId;
  }
  if (clientSecret) {
    headers["CF-Access-Client-Secret"] = clientSecret;
  }

  try {
    const body = await req.json();
    const { model, messages, options } = body;

    if (!model || !messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { message: "Invalid request payload: model and messages are required." },
        { status: 400 }
      );
    }

    const ollamaRes = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        options: options || {},
      }),
    });

    if (!ollamaRes.ok) {
      const errText = await ollamaRes.text();
      logger.error({ status: ollamaRes.status, errText }, "Ollama chat API error");
      return NextResponse.json(
        { message: `Ollama chat error: ${ollamaRes.status} - ${errText}` },
        { status: ollamaRes.status }
      );
    }

    if (!ollamaRes.body) {
      return NextResponse.json(
        { message: "Ollama returned empty response body." },
        { status: 500 }
      );
    }

    return new Response(ollamaRes.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    logger.error({ error }, "Error in chat-ai proxy");
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
