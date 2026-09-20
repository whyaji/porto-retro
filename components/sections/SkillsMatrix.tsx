"use client";

import React from "react";
import { useI18n } from "@/context/i18n-context";
import { skillCategories } from "@/lib/data/resume";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { FiCode, FiServer, FiSmartphone, FiDatabase, FiCloud } from "react-icons/fi";

const categoryIcons: { [key: string]: React.ReactNode } = {
  frontend: <FiCode className="w-5 h-5" />,
  backend: <FiServer className="w-5 h-5" />,
  mobile: <FiSmartphone className="w-5 h-5" />,
  database: <FiDatabase className="w-5 h-5" />,
  devops: <FiCloud className="w-5 h-5" />,
};

export const SkillsMatrix: React.FC<{ isFullPage?: boolean }> = ({
  isFullPage = false,
}) => {
  const { t, locale } = useI18n();

  return (
    <section className={`w-full py-16 md:py-24 border-b-2 border-[var(--navy)] ${isFullPage ? "" : "bg-[var(--surface-light)]"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="03"
          title={t.skills.title}
          subtitle={t.skills.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-5 sm:p-6 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 pb-3 border-b-2 border-[var(--navy)]">
                  <div className="p-2 bg-[var(--navy)] text-[var(--gold)] border border-[var(--navy)]">
                    {categoryIcons[category.id] || <FiCode className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-display font-extrabold text-base sm:text-lg text-[var(--navy)]">
                      {category.name[locale] || category.name.en}
                    </p>
                  </div>
                </div>

                {/* Category Description */}
                <p className="mt-3 text-xs text-[var(--navy)]/75 font-sans leading-relaxed">
                  {category.description[locale] || category.description.en}
                </p>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill.name}
                      variant={skill.highlight ? "green" : "surface"}
                      size="md"
                      className={skill.highlight ? "font-bold border-[var(--navy)]" : ""}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="pt-4 mt-6 border-t border-[var(--navy)]/10 flex items-center justify-between text-[10px] font-mono text-[var(--navy)]/60">
                <span>VERIFIED_STACK</span>
                <span className="text-[var(--green)] font-bold">{"// PRODUCTION"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
