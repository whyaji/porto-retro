import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeTicker } from "@/components/ui/MarqueeTicker";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsMatrix } from "@/components/sections/SkillsMatrix";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { IS_COMPANY_MODE, IS_PRODUCTS_ENABLED } from "@/lib/site-mode";
import { pageMetadata, DEFAULT_TITLE } from "@/lib/seo";

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
  ...pageMetadata(
    {
      title: "Home",
      description:
        "Software Engineering Portfolio of Wahyu Patriaji (PatriaWorks). Full-Stack & Mobile Engineer building web, mobile, and distributed backend systems.",
      path: "/",
    },
    {
      title: "Home",
      description:
        "Patriaworks is an independent software house building custom web platforms, offline-first field apps, and backend systems for operations that have outgrown spreadsheets, and developing its own AI-powered products with modern AI APIs.",
      path: "/",
    }
  ),
  title: { absolute: DEFAULT_TITLE },
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <MarqueeTicker />

      {IS_PRODUCTS_ENABLED && (
        <ScrollReveal direction="up">
          <ProductsSection />
        </ScrollReveal>
      )}

      {IS_COMPANY_MODE && (
        <ScrollReveal direction="up">
          <ServicesSection />
        </ScrollReveal>
      )}

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
