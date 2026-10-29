import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { AI_CHAT_MODE, AI_CHAT_URL } from "@/lib/site-mode";
import { ChatAiClient } from "@/components/ai/ChatAiClient";

export const metadata: Metadata = pageMetadata(
  {
    title: "AI Chat Assistant",
    description: "Gemini-like AI Chat Assistant powered by Ollama and Patriaworks.",
    path: "/app/chat-ai",
  },
  {
    title: "AI Chat Assistant",
    description: "Interactive AI Chat assistant connected to local/remote Ollama models.",
    path: "/app/chat-ai",
  }
);

export default function ChatAiAppPage() {
  if (AI_CHAT_MODE === "disabled") {
    notFound();
  }
  if (AI_CHAT_MODE === "redirect") {
    redirect(AI_CHAT_URL);
  }
  return <ChatAiClient />;
}
