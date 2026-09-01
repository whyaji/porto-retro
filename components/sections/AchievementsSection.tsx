"use client";

import React from "react";
import { useI18n } from "@/context/i18n-context";
import { resumeData } from "@/lib/data/resume";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FiAward, FiBookOpen, FiCalendar, FiCheckCircle } from "react-icons/fi";

export const AchievementsSection: React.FC<{ isFullPage?: boolean }> = ({
  isFullPage = false,
}) => {
  const { t } = useI18n();

  return (
    <section className={`w-full py-16 md:py-24 border-b-2 border-[var(--navy)] ${isFullPage ? "" : "bg-[var(--surface)]"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="04"
          badge={t.achievements.badge}
          title={t.achievements.title}
          subtitle={t.achievements.subtitle}
        />

        <div className="space-y-6 w-full">
          {resumeData.education.map((edu, idx) => (
            <div
              key={edu.institution}
              className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b-2 border-[var(--navy)]">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-[var(--navy)] text-[var(--gold)] border border-[var(--navy)] shrink-0">
                      {idx === 0 ? <FiBookOpen className="w-5 h-5" /> : <FiAward className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-lg text-[var(--navy)] leading-snug">
                        {edu.institution}
                      </h3>
                      <p className="text-xs font-mono text-[var(--green)] font-bold mt-1">
                        {edu.degree}
                      </p>
                    </div>
                  </div>

                  {edu.gpa && (
                    <div className="self-start sm:self-auto shrink-0 inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--surface-light)] border-2 border-[var(--navy)] text-xs font-mono text-[var(--navy)] shadow-[2px_2px_0px_0px_var(--navy)]">
                      <span className="text-[var(--navy)]/70 uppercase text-[11px] font-bold tracking-wider">
                        {t.about.gpa}:
                      </span>
                      <span className="text-sm font-extrabold text-[var(--green)]">
                        {edu.gpa}
                      </span>
                      <span className="text-[11px] text-[var(--navy)]/60 font-medium">/ 4.00</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-[var(--navy)]/70 py-3">
                  <span className="flex items-center gap-1.5">
                    <FiCalendar className="w-3.5 h-3.5 text-[var(--navy)]" />
                    <span>{edu.period}</span>
                  </span>
                  <span>|</span>
                  <span>{edu.location}</span>
                </div>

                {edu.summary && (
                  <p className="text-xs sm:text-sm text-[var(--navy)]/80 font-sans leading-relaxed bg-[var(--surface-light)] p-3.5 border-l-2 border-[var(--gold)] my-3">
                    {edu.summary}
                  </p>
                )}

                {/* Highlights */}
                {edu.highlights.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <span className="text-[11px] font-mono font-bold text-[var(--navy)] uppercase tracking-wider block">
                      {"// Program Highlights & Scope:"}
                    </span>
                    <ul className="space-y-2">
                      {edu.highlights.map((item, hIdx) => (
                        <li
                          key={hIdx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-[var(--navy)]/85 font-sans leading-relaxed"
                        >
                          <FiCheckCircle className="w-3.5 h-3.5 text-[var(--green)] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Distinction / Program Footer */}
              <div className="mt-6 pt-4 border-t border-[var(--navy)]/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--navy)]/60">ACCREDITED_PROGRAM</span>
                <span className="text-[var(--green)] font-bold">{"// VERIFIED"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
