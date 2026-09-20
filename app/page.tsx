import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeTicker } from "@/components/ui/MarqueeTicker";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsMatrix } from "@/components/sections/SkillsMatrix";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { createPageMetadata, DEFAULT_TITLE } from "@/lib/seo";

// Dynamically import below-the-fold sections for optimal initial bundle size
const TrustedBySection = dynamic(
  () =>
    import("@/components/sections/TrustedBySection").then(
      (mod) => mod.TrustedBySection
    )
);

const TestimonialsSection = dynamic(
  () =>
    import("@/components/sections/TestimonialsSection").then(
      (mod) => mod.TestimonialsSection
    )
);

const AchievementsSection = dynamic(
  () =>
    import("@/components/sections/AchievementsSection").then(
      (mod) => mod.AchievementsSection
    )
);

const ContactCTA = dynamic(
  () =>
    import("@/components/sections/ContactCTA").then(
      (mod) => mod.ContactCTA
    )
);

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Home",
    description:
      "Software Engineering Portfolio of Wahyu Patriaji (PatriaLabs). Full-Stack & Mobile Engineer building web, mobile, and distributed backend systems.",
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
