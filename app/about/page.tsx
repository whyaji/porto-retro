"use client";

import { useI18n } from "@/context/i18n-context";
import { getWhatsAppUrl } from "@/lib/data/resume";
import { getSiteIdentity } from "@/lib/data/site";
import { companyData, pick } from "@/lib/data/company";
import { IS_COMPANY_MODE, IS_PRODUCTS_ENABLED } from "@/lib/site-mode";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  FiDownload,
  FiTerminal,
  FiCheckCircle,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiArrowRight,
  FiCpu,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const PERSONAL_FOCUS = [
  "Geospatial GIS & Interactive Map Visualizers",
  "Cross-Platform Flutter & React Native Mobile Apps",
  "Distributed RESTful APIs with Hono & Node.js",
  "Enterprise SSO & Caching Optimization",
];

export default function AboutPage() {
  const { t, locale } = useI18n();
  const identity = getSiteIdentity(locale);

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <SectionHeader
          number="00"
          title={t.about.title}
          subtitle={t.about.subtitle}
        />

        {/* Bio & Background Grid */}
        <ScrollReveal direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Editorial Text */}
            <div className="lg:col-span-8 space-y-8">
              {/* Card 1: Professional Bio */}
              <div className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b-2 border-[var(--navy)]">
                  <FiTerminal className="w-5 h-5 text-[var(--green)]" />
                  <h3 className="font-display font-extrabold text-xl text-[var(--navy)]">
                    {t.about.summaryTitle}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[var(--navy)]/90 font-sans leading-relaxed">
                  {identity.summary}
                </p>
              </div>

              {/* Card 2: Engineering Focus */}
              <div className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b-2 border-[var(--navy)]">
                  <div className="w-3 h-3 bg-[var(--gold)] border border-[var(--navy)]"></div>
                  <h3 className="font-display font-extrabold text-xl text-[var(--navy)]">
                    {t.about.backgroundTitle}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[var(--navy)]/90 font-sans leading-relaxed">
                  {t.about.backgroundP1}
                </p>
                <p className="text-sm sm:text-base text-[var(--navy)]/90 font-sans leading-relaxed">
                  {t.about.backgroundP2}
                </p>
              </div>

              {/* Card 3: Product & AI direction (company mode only) */}
              {IS_COMPANY_MODE && (
                <div className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b-2 border-[var(--navy)]">
                    <FiCpu className="w-5 h-5 text-[var(--green)]" />
                    <h3 className="font-display font-extrabold text-xl text-[var(--navy)]">
                      {t.ai.aboutTitle}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-[var(--navy)]/90 font-sans leading-relaxed">
                    {t.ai.aboutBody}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    {IS_PRODUCTS_ENABLED && (
                      <Button
                        href="/products"
                        variant="outline"
                        size="md"
                        rightIcon={<FiArrowRight className="w-4 h-4" />}
                      >
                        {t.products.viewAll}
                      </Button>
                    )}
                    <Button
                      href="/ai"
                      variant="gold"
                      size="md"
                      rightIcon={<FiArrowRight className="w-4 h-4" />}
                    >
                      {t.ai.badge}
                    </Button>
                  </div>
                </div>
              )}

              {/* Key Focus Highlights */}
              <div className="bg-[var(--surface-light)] border-2 border-[var(--navy)] p-6 sm:p-8 space-y-4">
                <h4 className="font-mono text-xs font-bold text-[var(--navy)] uppercase tracking-wider">
                  {IS_COMPANY_MODE
                    ? "// " + pick(companyData.card.focusLabel, locale)
                    : "// Core Architectural Competencies"}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  {(IS_COMPANY_MODE
                    ? companyData.card.focus
                    : PERSONAL_FOCUS
                  ).map((focusItem) => (
                    <div
                      key={focusItem}
                      className="flex items-start gap-2 p-3 bg-white border border-[var(--navy)]/20"
                    >
                      <FiCheckCircle className="w-4 h-4 text-[var(--green)] shrink-0 mt-0.5" />
                      <span>{focusItem}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar: Profile Snapshot & Quick Info */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow-lg p-6 space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b-2 border-[var(--navy)]">
                  <div className="w-12 h-12 bg-[var(--navy)] text-[var(--gold)] border-2 border-[var(--navy)] flex items-center justify-center font-display font-black text-xl retro-shadow-sm">
                    {identity.initials}
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-lg text-[var(--navy)]">
                      {identity.name}
                    </h3>
                    <Badge variant="green" size="sm">
                      {IS_COMPANY_MODE ? identity.role : "Active Engineer"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs text-[var(--navy)]">
                  <div>
                    <span className="text-[var(--navy)]/50 block text-[10px]">
                      {IS_COMPANY_MODE ? "FOUNDER" : "ORGANIZATION"}
                    </span>
                    <span className="font-bold">
                      {IS_COMPANY_MODE
                        ? companyData.founder
                        : "PT Sawit Sumbermas Sarana, Tbk."}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--navy)]/50 block text-[10px]">
                      LOCATION
                    </span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <FiMapPin className="w-3 h-3 text-[var(--green)]" />
                      <span>
                        {IS_COMPANY_MODE
                          ? pick(companyData.location, locale)
                          : "Kotawaringin Barat, Indonesia"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[var(--navy)]/50 block text-[10px]">
                      EMAIL CONTACT
                    </span>
                    <a
                      href={`mailto:${identity.contact.email}`}
                      className="text-[var(--green)] underline font-bold"
                    >
                      {identity.contact.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-[var(--navy)]/50 block text-[10px]">
                      PHONE / WA
                    </span>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--green)] underline font-bold"
                    >
                      {identity.contact.phone}
                    </a>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="pt-3 border-t border-[var(--navy)]/20 grid grid-cols-2 gap-2">
                  <Button
                    href={identity.contact.github}
                    external
                    variant="outline"
                    size="sm"
                    fullWidth
                    leftIcon={<FiGithub className="w-3.5 h-3.5" />}
                  >
                    GitHub
                  </Button>
                  <Button
                    href={identity.contact.linkedin}
                    external
                    variant="outline"
                    size="sm"
                    fullWidth
                    leftIcon={<FiLinkedin className="w-3.5 h-3.5" />}
                  >
                    LinkedIn
                  </Button>
                  <Button
                    href={identity.contact.instagram}
                    external
                    variant="outline"
                    size="sm"
                    fullWidth
                    leftIcon={<FiInstagram className="w-3.5 h-3.5" />}
                  >
                    Instagram
                  </Button>
                  <Button
                    href={getWhatsAppUrl()}
                    external
                    variant="outline"
                    size="sm"
                    fullWidth
                    leftIcon={<FaWhatsapp className="w-3.5 h-3.5" />}
                  >
                    WhatsApp
                  </Button>
                </div>

                {/* Download CV CTA */}
                <div className="pt-3">
                  {IS_COMPANY_MODE ? (
                    <Button
                      href="/contact"
                      variant="gold"
                      size="md"
                      fullWidth
                      leftIcon={<FiArrowRight className="w-4 h-4" />}
                    >
                      {t.nav.downloadCV}
                    </Button>
                  ) : (
                    <Button
                      href="/cv/cv-wahyu-patriaji.pdf"
                      external
                      variant="gold"
                      size="md"
                      fullWidth
                      leftIcon={<FiDownload className="w-4 h-4" />}
                    >
                      {t.nav.downloadCV} (PDF)
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Education & Achievements */}
        <ScrollReveal direction="up">
          <AchievementsSection isFullPage />
        </ScrollReveal>
      </div>
    </div>
  );
}
