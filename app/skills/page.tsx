import type { Metadata } from "next";
import { SkillsMatrix } from "@/components/sections/SkillsMatrix";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  {
    title: "Skills & Technical Stack",
    description:
      "Comprehensive overview of technical capabilities, frameworks, and architecture tools utilized by Wahyu Patriaji across enterprise web, GIS, mobile, and backend systems.",
    path: "/skills",
  },
  {
    title: "Capabilities",
    description:
      "The stack Patriaworks ships with — React, Next.js, Node.js, Flutter, React Native, Redis, and the geospatial tooling behind our web and field systems.",
    path: "/skills",
  }
);

export default function SkillsPage() {
  return (
    <div className="w-full flex flex-col">
      <SkillsMatrix isFullPage />
      <ContactCTA />
    </div>
  );
}
