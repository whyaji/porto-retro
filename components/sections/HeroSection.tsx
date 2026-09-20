"use client";

import React from "react";
import { useI18n } from "@/context/i18n-context";
import { resumeData } from "@/lib/data/resume";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  FiArrowRight,
  FiDownload,
  FiMail,
  FiActivity,
  FiLayers,
  FiSmartphone,
  FiCpu,
} from "react-icons/fi";

export const HeroSection: React.FC = () => {
  const { t } = useI18n();

  return (
    <section className="relative w-full py-12 md:py-20 border-b-2 border-[var(--navy)] bg-grid-pattern overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left / Main Hero Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Main Headline */}
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-[var(--green)]">
                <span className="w-2 h-2 rounded-full bg-[#27c93f] shrink-0"></span>
                <span>
                  {t.hero.greeting}{" "}
                  <span className="underline decoration-2 underline-offset-4 decoration-[var(--gold)] text-[var(--navy)] font-extrabold">
                    {resumeData.name}
                  </span>
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[var(--navy)] tracking-tight leading-[1.08]">
                {t.hero.tagline}
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-[var(--navy)]/80 font-sans leading-relaxed max-w-2xl animate-in fade-in duration-1000">
              {t.hero.subtagline}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                href="/projects"
                variant="primary"
                size="lg"
                rightIcon={<FiArrowRight className="w-4 h-4" />}
              >
                {t.hero.viewProjects}
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                leftIcon={<FiMail className="w-4 h-4" />}
              >
                {t.hero.contactMe}
              </Button>
              <Button
                href="/cv/cv-wahyu-patriaji.pdf"
                external
                variant="gold"
                size="lg"
                leftIcon={<FiDownload className="w-4 h-4" />}
              >
                {t.hero.downloadCV}
              </Button>
            </div>
          </div>

          {/* Right Column: Developer Summary Card */}
          <div className="lg:col-span-4">
            <div className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1">
              <div className="px-4 py-2.5 bg-[var(--navy)] text-[var(--surface)] font-mono text-xs flex items-center justify-between border-b-2 border-[var(--navy)]">
                <span className="font-bold text-[var(--gold)]">Developer Profile</span>
                <span className="text-[10px] text-white/70">PT SSMS Tbk</span>
              </div>

              <div className="p-5 space-y-4 font-mono text-xs text-[var(--navy)]">
                <div>
                  <span className="text-[var(--navy)]/60 block text-[10px] font-bold">CURRENT ROLE</span>
                  <span className="font-bold text-sm text-[var(--navy)]">
                    Programmer @ PT Sawit Sumbermas Sarana Tbk
                  </span>
                </div>

                <div className="border-t border-[var(--navy)]/10 pt-3">
                  <span className="text-[var(--navy)]/60 block text-[10px] font-bold">CORE TECH</span>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    <Badge variant="navy" size="sm">Node.js / Hono</Badge>
                    <Badge variant="navy" size="sm">React / Next.js</Badge>
                    <Badge variant="navy" size="sm">Flutter / React Native</Badge>
                    <Badge variant="navy" size="sm">PostgreSQL / Redis</Badge>
                    <Badge variant="navy" size="sm">System Architecture</Badge>
                  </div>
                </div>

                <div className="border-t border-[var(--navy)]/10 pt-3">
                  <span className="text-[var(--navy)]/60 block text-[10px] font-bold">KEY METRICS</span>
                  <div className="grid grid-cols-2 gap-2 mt-1.5">
                    <div className="p-2 bg-[var(--surface-light)] border border-[var(--navy)]/20">
                      <span className="font-display font-black text-lg text-[var(--navy)] block">
                        16+
                      </span>
                      <span className="text-[10px] text-[var(--navy)]/70">Production Apps</span>
                    </div>
                    <div className="p-2 bg-[var(--surface-light)] border border-[var(--navy)]/20">
                      <span className="font-display font-black text-lg text-[var(--green)] block">
                        2+ Yrs
                      </span>
                      <span className="text-[10px] text-[var(--navy)]/70">Engineering Exp</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 pt-8 border-t-2 border-[var(--navy)]">
          <div className="p-4 bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
            <div className="flex items-center gap-2 text-[var(--green)] mb-1">
              <FiActivity className="w-4 h-4" />
              <span className="font-mono text-[10px] uppercase font-bold">EXPERIENCE</span>
            </div>
            <span className="font-display font-black text-2xl sm:text-3xl text-[var(--navy)] block">
              2+ Years
            </span>
            <span className="text-xs text-[var(--navy)]/70 font-sans">{t.hero.stats.experience}</span>
          </div>

          <div className="p-4 bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
            <div className="flex items-center gap-2 text-[var(--navy)] mb-1">
              <FiLayers className="w-4 h-4" />
              <span className="font-mono text-[10px] uppercase font-bold">REPOSITORIES</span>
            </div>
            <span className="font-display font-black text-2xl sm:text-3xl text-[var(--navy)] block">
              16 Projects
            </span>
            <span className="text-xs text-[var(--navy)]/70 font-sans">{t.hero.stats.projects}</span>
          </div>

          <div className="p-4 bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
            <div className="flex items-center gap-2 text-[var(--green)] mb-1">
              <FiSmartphone className="w-4 h-4" />
              <span className="font-mono text-[10px] uppercase font-bold">PLATFORMS</span>
            </div>
            <span className="font-display font-black text-xl sm:text-2xl text-[var(--navy)] block truncate">
              Web & Mobile
            </span>
            <span className="text-xs text-[var(--navy)]/70 font-sans">{t.hero.stats.platforms}</span>
          </div>

          <div className="p-4 bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
            <div className="flex items-center gap-2 text-[var(--gold)] mb-1">
              <FiCpu className="w-4 h-4 text-[var(--navy)]" />
              <span className="font-mono text-[10px] uppercase font-bold text-[var(--navy)]">
                ARCHITECTURE
              </span>
            </div>
            <span className="font-display font-black text-xl sm:text-2xl text-[var(--navy)] block truncate">
              Full-Stack
            </span>
            <span className="text-xs text-[var(--navy)]/70 font-sans">{t.hero.stats.architecture}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
