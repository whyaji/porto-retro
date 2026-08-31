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
  FiCheck,
} from "react-icons/fi";

export const HeroSection: React.FC = () => {
  const { t } = useI18n();

  return (
    <section className="relative w-full py-12 md:py-20 border-b-2 border-[var(--navy)] bg-grid-pattern overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left / Main Hero Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Retro Monospace Status Pill */}
            <div className="flex flex-wrap items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-500">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--navy)] text-[var(--surface)] text-xs font-mono font-bold retro-shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#27c93f] inline-block animate-pulse"></span>
                <span>{t.hero.terminalStatus}</span>
              </span>
              <Badge variant="gold" size="md">
                {t.hero.badge}
              </Badge>
            </div>

            {/* Main Headline */}
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <p className="text-sm sm:text-base font-mono font-bold text-[var(--green)]">
                &gt; {t.hero.greeting} <span className="underline decoration-wavy decoration-[var(--gold)]">{resumeData.name}</span>
              </p>
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

          {/* Right Column: Retro Blueprint / System Info Card */}
          <div className="lg:col-span-4">
            <div className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1">
              <div className="px-4 py-2 bg-[var(--navy)] text-[var(--surface)] font-mono text-xs flex items-center justify-between border-b-2 border-[var(--navy)]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff5f56]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#ffbd2e]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#27c93f]"></span>
                </div>
                <span className="font-bold text-[var(--gold)]">SYS_SPEC_2026</span>
              </div>

              <div className="p-5 space-y-4 font-mono text-xs text-[var(--navy)]">
                <div>
                  <span className="text-[var(--navy)]/50 block text-[10px]">CURRENT ROLE</span>
                  <span className="font-bold text-sm text-[var(--green)]">
                    Programmer @ PT Sawit Sumbermas Sarana Tbk
                  </span>
                </div>

                <div className="border-t border-[var(--navy)]/10 pt-3">
                  <span className="text-[var(--navy)]/50 block text-[10px]">CORE ARCHITECTURE</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <Badge variant="navy" size="sm">Hono / Node</Badge>
                    <Badge variant="navy" size="sm">React / Next</Badge>
                    <Badge variant="navy" size="sm">Flutter</Badge>
                    <Badge variant="navy" size="sm">MapLibre GIS</Badge>
                    <Badge variant="navy" size="sm">Redis / Queue</Badge>
                  </div>
                </div>

                <div className="border-t border-[var(--navy)]/10 pt-3">
                  <span className="text-[var(--navy)]/50 block text-[10px]">PRODUCTION STATS</span>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div className="p-2 bg-[var(--surface-light)] border border-[var(--navy)]/20">
                      <span className="font-display font-black text-lg text-[var(--navy)] block">
                        16+
                      </span>
                      <span className="text-[10px] text-[var(--navy)]/70">Projects Built</span>
                    </div>
                    <div className="p-2 bg-[var(--surface-light)] border border-[var(--navy)]/20">
                      <span className="font-display font-black text-lg text-[var(--green)] block">
                        2+ Yrs
                      </span>
                      <span className="text-[10px] text-[var(--navy)]/70">Production Exp</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[var(--navy)]/10 pt-3 text-[11px] text-[var(--navy)]/70 flex items-center gap-1.5">
                  <FiCheck className="w-3.5 h-3.5 text-[var(--green)] shrink-0" />
                  <span>Verified Single Source of Truth</span>
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
