import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ChatAiClient } from "@/components/ai/ChatAiClient";

export const metadata: Metadata = pageMetadata(
  {
    title: "AI Chat Assistant",
    description: "AI Chat Assistant powered by Ollama and Patriaworks.",
    path: "/chat-ai",
  },
  {
    title: "AI Chat Assistant",
    description: "Interactive AI Chat assistant connected to local/remote Ollama models.",
    path: "/chat-ai",
  }
);

export default function ChatAiRoutePage() {
  return <ChatAiClient />;
}
