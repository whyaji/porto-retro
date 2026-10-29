import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function GET() {
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
    const controller = new AbortController();
    // Increased to 12 seconds to accommodate Cloudflare Tunnel & Access TLS/proxy handshake latency
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch(`${baseUrl}/api/tags`, {
      method: "GET",
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return NextResponse.json(
        {
          available: false,
          error: `Ollama service responded with status ${res.status}`,
          baseUrl,
        },
        { status: 200 }
      );
    }

    const data = await res.json();
    const fetchedModels: string[] = Array.isArray(data.models)
      ? data.models.map((m: { name: string }) => m.name)
      : [];

    const envModelList = process.env.OLLAMA_CHAT_MODEL_LIST;
    let allowedModels: string[] = [];

    if (envModelList && envModelList.trim().length > 0) {
      allowedModels = envModelList
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean);
    } else {
      allowedModels = fetchedModels;
    }

    const defaultModelEnv =
      process.env.OLLAMA_CHAT_MODEL_DEFAULT ||
      process.env.OLLAMA_CHAT_MODEL_DEFAULt ||
      allowedModels[0] ||
      fetchedModels[0] ||
      "lfm3:1.7b";

    const maxSessions = parseInt(process.env.AI_CHAT_MAX_SESSIONS || "10", 10);
    const maxSessionSize = parseInt(process.env.AI_CHAT_MAX_SESSIONS_SIZE || "50", 10);
    const think = process.env.OLLAMA_CHAT_THINK === "true";

    return NextResponse.json({
      available: true,
      models: allowedModels.length > 0 ? allowedModels : fetchedModels,
      defaultModel: defaultModelEnv,
      maxSessions: isNaN(maxSessions) ? 10 : maxSessions,
      maxSessionSize: isNaN(maxSessionSize) ? 50 : maxSessionSize,
      think,
      baseUrl,
    });
  } catch (error: unknown) {
    logger.warn({ error, baseUrl }, "Ollama service unavailable");
    return NextResponse.json(
      {
        available: false,
        error: error instanceof Error ? error.message : "Connection failed",
        baseUrl,
      },
      { status: 200 }
    );
  }
}
