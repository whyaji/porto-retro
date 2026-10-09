import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { IS_COMPANY_MODE } from "@/lib/site-mode";
import { pageMetadata } from "@/lib/seo";
import { AiPageContent } from "@/components/ai/AiPageContent";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = pageMetadata(
  {
    title: "AI & Technical Approach",
    description:
      "The engineering approach of Wahyu Patriaji, from validation and logging to planned AI integration.",
    path: "/ai",
  },
  {
    title: "AI Integration",
    description:
      "What runs in Patriaworks production systems today, and the planned AI integration: server-side API keys, structured outputs, retrieval, human review, and cost controls. No AI feature is live yet.",
    path: "/ai",
  }
);

export default function AiPage() {
  if (!IS_COMPANY_MODE) {
    redirect("/");
  }

  return (
    <div className="w-full flex flex-col">
      <AiPageContent />
      <ContactCTA />
    </div>
  );
}
