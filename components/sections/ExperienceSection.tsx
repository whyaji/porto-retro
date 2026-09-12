"use client";

import React from "react";
import { useI18n } from "@/context/i18n-context";
import { getResume } from "@/lib/data/resume";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { FiMapPin, FiCalendar, FiCheckCircle } from "react-icons/fi";

export const ExperienceSection: React.FC<{ isFullPage?: boolean }> = ({
  isFullPage = false,
}) => {
  const { t, locale } = useI18n();
  const resume = getResume(locale);

  return (
    <section className={`w-full py-16 md:py-24 border-b-2 border-[var(--navy)] ${isFullPage ? "" : "bg-[var(--surface)]"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="02"
          badge={t.experience.badge}
          title={t.experience.title}
          subtitle={t.experience.subtitle}
        />

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
                  <h3 className="text-lg sm:text-xl font-extrabold font-display text-white tracking-tight">
                    {companyItem.company}
                  </h3>
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
                        <h4 className="text-base sm:text-lg font-extrabold font-display text-[var(--navy)]">
                          {role.title}
                        </h4>
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
      </div>
    </section>
  );
};
