"use client";

import React from "react";
import { useI18n } from "@/context/i18n-context";
import { IS_PRODUCTS_ENABLED } from "@/lib/site-mode";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  FiCheckCircle,
  FiClock,
  FiShield,
  FiArrowRight,
  FiPackage,
} from "react-icons/fi";

export const AiPageContent: React.FC = () => {
  const { t } = useI18n();
  const copy = t.ai;

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge={copy.badge}
          title={copy.title}
          subtitle={copy.subtitle}
        />

        {/* Intro */}
        <div className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-6 sm:p-8 space-y-4 max-w-4xl">
          {copy.intro.map((paragraph) => (
            <p
              key={paragraph}
              className="text-sm sm:text-base text-[var(--navy)]/90 font-sans leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Implemented vs planned */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section
            className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-6 sm:p-8"
            aria-labelledby="ai-today"
          >
            <div className="flex items-center gap-2 pb-3 border-b-2 border-[var(--navy)]">
              <FiCheckCircle className="w-5 h-5 text-[var(--green)]" />
              <h3
                id="ai-today"
                className="font-display font-extrabold text-xl text-[var(--navy)]"
              >
                {copy.todayTitle}
              </h3>
            </div>
            <ul className="mt-4 space-y-3">
              {copy.todayItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-[var(--navy)]/90 font-sans leading-relaxed"
                >
                  <span
                    className="w-1.5 h-1.5 bg-[var(--green)] border border-[var(--navy)] shrink-0 mt-2"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-6 sm:p-8"
            aria-labelledby="ai-planned"
          >
            <div className="flex items-center gap-2 pb-3 border-b-2 border-[var(--navy)]">
              <FiClock className="w-5 h-5 text-[var(--gold)]" />
              <h3
                id="ai-planned"
                className="font-display font-extrabold text-xl text-[var(--navy)]"
              >
                {copy.plannedTitle}
              </h3>
            </div>
            <ul className="mt-4 space-y-3">
              {copy.plannedItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-[var(--navy)]/90 font-sans leading-relaxed"
                >
                  <span
                    className="w-1.5 h-1.5 bg-[var(--gold)] border border-[var(--navy)] shrink-0 mt-2"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Principles */}
        <section
          className="bg-[var(--surface-light)] border-2 border-[var(--navy)] p-6 sm:p-8"
          aria-labelledby="ai-principles"
        >
          <div className="flex items-center gap-2 pb-3 border-b-2 border-[var(--navy)]">
            <FiShield className="w-5 h-5 text-[var(--green)]" />
            <h3
              id="ai-principles"
              className="font-display font-extrabold text-xl text-[var(--navy)]"
            >
              {copy.principlesTitle}
            </h3>
          </div>
          <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {copy.principlesItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 p-3 bg-white border border-[var(--navy)]/20 text-[var(--navy)]/90 font-sans leading-relaxed"
              >
                <FiShield className="w-4 h-4 text-[var(--green)] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Status note */}
        <div className="p-5 sm:p-6 bg-[var(--gold-muted)] border-2 border-[var(--gold)]">
          <span className="font-mono text-[10px] font-bold text-[var(--navy)] uppercase block mb-1">
            {"//"} STATUS
          </span>
          <p className="text-sm text-[var(--navy)] font-sans leading-relaxed">
            {copy.statusNote}
          </p>
        </div>

        {/* CTA */}
        <div className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="font-display font-extrabold text-xl text-[var(--navy)]">
              {copy.ctaTitle}
            </h3>
            <p className="text-sm text-[var(--navy)]/80 font-sans leading-relaxed">
              {copy.ctaText}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            {IS_PRODUCTS_ENABLED && (
              <Button
                href="/products"
                variant="outline"
                size="lg"
                leftIcon={<FiPackage className="w-4 h-4" />}
              >
                {copy.productsLink}
              </Button>
            )}
            <Button
              href="/contact"
              variant="gold"
              size="lg"
              rightIcon={<FiArrowRight className="w-4 h-4" />}
            >
              {copy.ctaButton}
            </Button>
          </div>
        </div>

        <p className="text-xs text-[var(--navy)]/60 font-mono leading-relaxed max-w-3xl">
          {copy.disclaimer}
        </p>
      </div>
    </div>
  );
};
