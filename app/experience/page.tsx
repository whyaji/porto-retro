import type { Metadata } from "next";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  {
    title: "Experience",
    description:
      "Explore career history, key contributions, and production systems engineered by Wahyu Patriaji at PT Sawit Sumbermas Sarana Tbk and Sekawan Media.",
    path: "/experience",
  },
  {
    title: "How We Work",
    description:
      "How Patriaworks takes a system from the first call to production: scoping, design, weekly builds, deployment, and the engagement models we work under.",
    path: "/experience",
  }
);

export default function ExperiencePage() {
  return (
    <div className="w-full flex flex-col">
      <ExperienceSection isFullPage />
      <ContactCTA />
    </div>
  );
}
