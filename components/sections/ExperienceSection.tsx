"use client";

import React from "react";
import { useI18n } from "@/context/i18n-context";
import { getResume } from "@/lib/data/resume";
import { companyData, pick, pickList } from "@/lib/data/company";
import { IS_COMPANY_MODE } from "@/lib/site-mode";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import type { Locale } from "@/types/project";
import {
  FiMapPin,
  FiCalendar,
  FiCheckCircle,
  FiPackage,
} from "react-icons/fi";

const PersonalTimeline: React.FC<{ locale: Locale }> = ({ locale }) => {
  const resume = getResume(locale);

  return (
    <div className="space-y-10 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-7 before:w-0.5 before:bg-[var(--navy)]/30">
      {resume.experience.map((companyItem, compIdx) => (
        <div key={companyItem.company} className="relative pl-8 sm:pl-16 space-y-6">
          {/* Timeline Node Point */}
          <div className="absolute -left-1 sm:left-4 top-1.5 w-7 h-7 bg-[var(--navy)] text-[var(--gold)] border-2 border-[var(--navy)] flex items-center justify-center font-mono font-bold text-xs retro-shadow-sm z-10">
            0{compIdx + 1}
          </div>

          {/* Company Header */}
          <div className="bg-[var(--navy)] text-[var(--surface)] p-4 sm:p-5 border-2 border-[var(--navy)] retro-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="text-lg sm:text-xl font-extrabold font-display text-white tracking-tight">
                {companyItem.company}
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--gold)] mt-1">
                <FiMapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{companyItem.location}</span>
              </div>
            </div>
            <Badge variant="gold" size="sm">
              {companyItem.roles.length} {companyItem.roles.length > 1 ? "Roles" : "Role"}
            </Badge>
          </div>

          {/* Roles Under Company */}
          <div className="space-y-6">
            {companyItem.roles.map((role, roleIdx) => (
              <div
                key={`${role.title}-${roleIdx}`}
                className="bg-[var(--card)] border-2 border-[var(--navy)] p-5 sm:p-6 retro-shadow space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--navy)]/10">
                  <div>
                    <p className="text-base sm:text-lg font-extrabold font-display text-[var(--navy)]">
                      {role.title}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--surface-light)] border border-[var(--navy)] text-xs font-mono font-bold text-[var(--green)]">
                    <FiCalendar className="w-3.5 h-3.5" />
                    <span>{role.period}</span>
                  </div>
                </div>

                {role.summary && (
                  <p className="text-xs sm:text-sm text-[var(--navy)]/80 font-sans leading-relaxed italic bg-[var(--surface-light)] p-3 border-l-2 border-[var(--green)]">
                    &quot;{role.summary}&quot;
                  </p>
                )}

                {/* Highlights */}
                <div className="space-y-2 pt-2">
                  <span className="font-mono text-xs font-bold text-[var(--navy)] uppercase tracking-wider block">
                    {"// Key Contributions & Responsibilities:"}
                  </span>
                  <ul className="grid grid-cols-1 gap-2.5">
                    {role.highlights.map((highlight, hIdx) => (
                      <li
                        key={hIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--navy)]/90 font-sans leading-relaxed"
                      >
                        <FiCheckCircle className="w-4 h-4 text-[var(--green)] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const CompanyProcess: React.FC<{ locale: Locale }> = ({ locale }) => {
  const { t } = useI18n();

  return (
    <div className="space-y-12">
      {/* Process Steps */}
      <div className="space-y-4">
        {companyData.process.map((step) => (
          <div
            key={step.id}
            className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 sm:gap-6 bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-5 sm:p-6"
          >
            <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-4">
              <div className="w-11 h-11 shrink-0 bg-[var(--navy)] text-[var(--gold)] border-2 border-[var(--navy)] flex items-center justify-center font-mono font-black text-sm retro-shadow-sm">
                {step.step}
              </div>
              <p className="font-display font-extrabold text-lg sm:text-xl text-[var(--navy)] sm:pt-1.5">
                {pick(step.title, locale)}
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm sm:text-base text-[var(--navy)]/85 font-sans leading-relaxed">
                {pick(step.description, locale)}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--surface-light)] border border-[var(--navy)] text-xs font-mono font-bold text-[var(--navy)]">
                <FiPackage className="w-3.5 h-3.5 text-[var(--green)]" />
                <span className="text-[var(--navy)]/60 font-normal">OUTPUT:</span>
                <span>{pick(step.deliverable, locale)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Models */}
      <div>
        <div className="mb-6 flex flex-col">
          <span className="font-mono text-xs font-bold text-[var(--green)] bg-[var(--green-muted)] px-2 py-0.5 border border-[var(--green)] self-start mb-3">
            {t.engagements.label}
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--navy)] tracking-tight">
            {t.engagements.title}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {companyData.engagements.map((engagement) => (
            <div
              key={engagement.id}
              className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-5 sm:p-6 flex flex-col"
            >
              <div className="pb-3 border-b-2 border-[var(--navy)]">
                <p className="font-display font-extrabold text-lg text-[var(--navy)]">
                  {pick(engagement.title, locale)}
                </p>
                <p className="mt-1.5 text-xs font-mono text-[var(--green)] font-bold">
                  {pick(engagement.summary, locale)}
                </p>
              </div>

              <ul className="mt-4 space-y-2.5 flex-1">
                {pickList(engagement.points, locale).map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--navy)]/90 font-sans leading-relaxed"
                  >
                    <FiCheckCircle className="w-4 h-4 text-[var(--green)] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 mt-5 border-t border-[var(--navy)]/10 flex items-center justify-between text-[10px] font-mono text-[var(--navy)]/60">
                <span>ENGAGEMENT_MODEL</span>
                <span className="text-[var(--green)] font-bold">
                  {"// " + engagement.id.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ExperienceSection: React.FC<{ isFullPage?: boolean }> = ({
  isFullPage = false,
}) => {
  const { t, locale } = useI18n();

  return (
    <section className={`w-full py-16 md:py-24 border-b-2 border-[var(--navy)] ${isFullPage ? "" : "bg-[var(--surface)]"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="02"
          title={t.experience.title}
          subtitle={t.experience.subtitle}
        />

        {IS_COMPANY_MODE ? (
          <CompanyProcess locale={locale} />
        ) : (
          <PersonalTimeline locale={locale} />
        )}
      </div>
    </section>
  );
};
