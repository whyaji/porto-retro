"use client";

import { useI18n } from "@/context/i18n-context";
import { resumeData } from "@/lib/data/resume";
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
} from "react-icons/fi";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <SectionHeader
          number="00"
          badge={t.about.badge}
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
                  {resumeData.summary}
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

              {/* Key Focus Highlights */}
              <div className="bg-[var(--surface-light)] border-2 border-[var(--navy)] p-6 sm:p-8 space-y-4">
                <h4 className="font-mono text-xs font-bold text-[var(--navy)] uppercase tracking-wider">
                  {"// Core Architectural Competencies"}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="flex items-start gap-2 p-3 bg-white border border-[var(--navy)]/20">
                    <FiCheckCircle className="w-4 h-4 text-[var(--green)] shrink-0 mt-0.5" />
                    <span>Geospatial GIS & Interactive Map Visualizers</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-white border border-[var(--navy)]/20">
                    <FiCheckCircle className="w-4 h-4 text-[var(--green)] shrink-0 mt-0.5" />
                    <span>Cross-Platform Flutter & React Native Mobile Apps</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-white border border-[var(--navy)]/20">
                    <FiCheckCircle className="w-4 h-4 text-[var(--green)] shrink-0 mt-0.5" />
                    <span>Distributed RESTful APIs with Hono & Node.js</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-white border border-[var(--navy)]/20">
                    <FiCheckCircle className="w-4 h-4 text-[var(--green)] shrink-0 mt-0.5" />
                    <span>Enterprise SSO & Caching Optimization</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar: Profile Snapshot & Quick Info */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow-lg p-6 space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b-2 border-[var(--navy)]">
                  <div className="w-12 h-12 bg-[var(--navy)] text-[var(--gold)] border-2 border-[var(--navy)] flex items-center justify-center font-display font-black text-xl retro-shadow-sm">
                    WP
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-lg text-[var(--navy)]">
                      {resumeData.name}
                    </h3>
                    <Badge variant="green" size="sm">
                      Active Engineer
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs text-[var(--navy)]">
                  <div>
                    <span className="text-[var(--navy)]/50 block text-[10px]">ORGANIZATION</span>
                    <span className="font-bold">PT Sawit Sumbermas Sarana, Tbk.</span>
                  </div>
                  <div>
                    <span className="text-[var(--navy)]/50 block text-[10px]">LOCATION</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <FiMapPin className="w-3 h-3 text-[var(--green)]" />
                      <span>Kotawaringin Barat, Indonesia</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[var(--navy)]/50 block text-[10px]">EMAIL CONTACT</span>
                    <a
                      href={`mailto:${resumeData.contact.email}`}
                      className="text-[var(--green)] underline font-bold"
                    >
                      {resumeData.contact.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-[var(--navy)]/50 block text-[10px]">PHONE / WA</span>
                    <span>{resumeData.contact.phone}</span>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="pt-3 border-t border-[var(--navy)]/20 flex gap-2">
                  <Button
                    href={resumeData.contact.github}
                    external
                    variant="outline"
                    size="sm"
                    leftIcon={<FiGithub className="w-3.5 h-3.5" />}
                  >
                    GitHub
                  </Button>
                  <Button
                    href={resumeData.contact.linkedin}
                    external
                    variant="outline"
                    size="sm"
                    leftIcon={<FiLinkedin className="w-3.5 h-3.5" />}
                  >
                    LinkedIn
                  </Button>
                </div>

                {/* Download CV CTA */}
                <div className="pt-3">
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
