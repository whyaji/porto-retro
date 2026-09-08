"use client";

import React from "react";
import Image from "next/image";
import { useI18n } from "@/context/i18n-context";
import { getTrustedBy } from "@/lib/data/trustedBy";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FiExternalLink, FiShield } from "react-icons/fi";

export const TrustedBySection: React.FC = () => {
  const { t, locale } = useI18n();
  const items = getTrustedBy();

  return (
    <section className="w-full py-16 md:py-24 bg-[var(--surface-light)] border-b-2 border-[var(--navy)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="04"
          badge={t.trustedBy.badge}
          title={t.trustedBy.title}
          subtitle={t.trustedBy.subtitle}
          align="center"
        />

        <div className="flex flex-wrap justify-center items-stretch gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="w-full max-w-md bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-6 flex flex-col justify-between items-center text-center group hover:border-[var(--gold)] transition-all duration-200"
            >
              <div className="flex flex-col items-center w-full">
                <div className="relative w-20 h-20 shrink-0 bg-[var(--surface)] border border-[var(--navy)] p-2 flex items-center justify-center overflow-hidden mb-4">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-200"
                  />
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono font-bold text-[var(--green)] bg-[var(--green-muted)] border border-[var(--green)] mb-3">
                  <FiShield className="w-3 h-3" />
                  {item.category}
                </span>

                <h3 className="font-display font-extrabold text-lg text-[var(--navy)] group-hover:text-[var(--navy-light)] transition-colors">
                  {item.name}
                </h3>

                <p className="mt-2 text-xs sm:text-sm font-sans text-[var(--navy)]/75 leading-relaxed">
                  {item.description[locale as "id" | "en"] || item.description.en}
                </p>
              </div>

              {item.website && (
                <div className="w-full mt-6 pt-4 border-t border-[var(--navy)]/10 flex items-center justify-center">
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--navy)] hover:text-[var(--gold)] transition-colors"
                  >
                    <span>{t.trustedBy.visitWebsite}</span>
                    <FiExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
