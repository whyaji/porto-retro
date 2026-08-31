import type { Metadata } from "next";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Experience | Wahyu Patriaji",
  description:
    "Explore career history, key contributions, and production systems engineered by Wahyu Patriaji at PT Sawit Sumbermas Sarana Tbk and Sekawan Media.",
};

export default function ExperiencePage() {
  return (
    <div className="w-full flex flex-col">
      <ExperienceSection isFullPage />
      <ContactCTA />
    </div>
  );
}
