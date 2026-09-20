"use client";

import React from "react";
import { useI18n } from "@/context/i18n-context";
import { resumeData } from "@/lib/data/resume";
import { Button } from "@/components/ui/Button";
import { FiDownload, FiArrowRight } from "react-icons/fi";

export const ContactCTA: React.FC = () => {
  const { t } = useI18n();

  return (
    <section className="w-full py-16 md:py-24 bg-[var(--navy)] text-[var(--surface)] border-b-2 border-[var(--navy)] relative overflow-hidden bg-dots-pattern-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[var(--navy-dark)] border-2 border-[var(--gold)] p-8 sm:p-12 retro-shadow-gold">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--gold)] text-[var(--navy)] font-mono text-xs font-bold">
                <span>{t.hero.statusBadge}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight leading-tight">
                {t.contact.title}
              </h2>
              <p className="text-sm sm:text-base text-white/80 font-sans leading-relaxed max-w-2xl">
                {t.contact.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/70 pt-2">
                <span>📧 {resumeData.contact.email}</span>
                <span>•</span>
                <span>📱 {resumeData.contact.phone}</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Button
                href="/contact"
                variant="gold"
                size="lg"
                fullWidth
                rightIcon={<FiArrowRight className="w-4 h-4" />}
              >
                {t.hero.contactMe}
              </Button>
              <Button
                href="/cv/cv-wahyu-patriaji.pdf"
                external
                variant="outline"
                size="lg"
                fullWidth
                leftIcon={<FiDownload className="w-4 h-4" />}
                className="bg-transparent text-white border-white hover:bg-white hover:text-[var(--navy)]"
              >
                {t.hero.downloadCV}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
