import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeTicker } from "@/components/ui/MarqueeTicker";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsMatrix } from "@/components/sections/SkillsMatrix";
import { TrustedBySection } from "@/components/sections/TrustedBySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { createPageMetadata, DEFAULT_TITLE } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Home",
    description:
      "Production portfolio of Wahyu Patriaji — Full-Stack & Mobile Software Engineer at PT Sawit Sumbermas Sarana Tbk. Specializing in Node.js, Hono, React, React Native, Flutter, and Geospatial GIS applications.",
    path: "/",
  }),
  title: { absolute: DEFAULT_TITLE },
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <MarqueeTicker />

      <ScrollReveal direction="up">
        <FeaturedProjects />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <ExperienceSection />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <SkillsMatrix />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <TrustedBySection />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <TestimonialsSection />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <AchievementsSection />
      </ScrollReveal>

      <ContactCTA />
    </div>
  );
}
