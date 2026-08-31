import type { Metadata } from "next";
import { SkillsMatrix } from "@/components/sections/SkillsMatrix";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Skills & Technical Stack | Wahyu Patriaji",
  description:
    "Comprehensive overview of technical capabilities, frameworks, and architecture tools utilized by Wahyu Patriaji across enterprise web, GIS, mobile, and backend systems.",
};

export default function SkillsPage() {
  return (
    <div className="w-full flex flex-col">
      <SkillsMatrix isFullPage />
      <ContactCTA />
    </div>
  );
}
