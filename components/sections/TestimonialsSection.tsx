"use client";

import React from "react";
import Image from "next/image";
import { useI18n } from "@/context/i18n-context";
import { getTestimonials } from "@/lib/data/testimonials";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";

export const TestimonialsSection: React.FC = () => {
  const { t, locale } = useI18n();
  const testimonials = getTestimonials();

  return (
    <section className="w-full py-16 md:py-24 bg-[var(--surface)] border-b-2 border-[var(--navy)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="05"
          badge={t.testimonials.badge}
          title={t.testimonials.title}
          subtitle={t.testimonials.subtitle}
          align="center"
        />

        <div className="flex flex-wrap justify-center items-stretch gap-8">
          {testimonials.map((item) => {
            const maxStars = item.maxRating || 5;
            const currentRating = Math.min(item.rating, maxStars);

            return (
              <div
                key={item.id}
                className="w-full max-w-2xl bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Background decorative quote icon */}
                <FaQuoteLeft className="absolute -top-2 -right-2 w-24 h-24 text-[var(--navy)]/5 pointer-events-none select-none" />

                <div>
                  {/* Top Bar: Rating & Verification Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-[var(--navy)] mb-6">
                    <div className="flex items-center gap-1.5 bg-[var(--gold-muted)] px-3 py-1 border border-[var(--gold)]">
                      <div className="flex items-center gap-1 text-[var(--gold)]">
                        {Array.from({ length: maxStars }).map((_, idx) => (
                          <FaStar
                            key={idx}
                            className={`w-4 h-4 ${
                              idx < currentRating
                                ? "text-[var(--gold)]"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-mono text-xs font-bold text-[var(--navy)] ml-1">
                        {item.rating}.0 / {maxStars}.0
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[var(--green)] bg-[var(--green-muted)] px-2.5 py-1 border border-[var(--green)]">
                      <FiCheckCircle className="w-3.5 h-3.5" />
                      {t.testimonials.verifiedBadge}
                    </span>
                  </div>

                  {/* Testimonial Quote Content */}
                  <blockquote className="text-sm sm:text-base font-sans text-[var(--navy)] leading-relaxed italic bg-[var(--surface-light)] p-4 sm:p-5 border-l-4 border-[var(--gold)] mb-6">
                    &ldquo;{item.content[locale as "id" | "en"] || item.content.en}&rdquo;
                  </blockquote>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-[var(--navy)]/15">
                  {item.avatar && (
                    <div className="relative w-12 h-12 rounded-full border-2 border-[var(--navy)] overflow-hidden shrink-0 bg-[var(--surface)]">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="font-display font-extrabold text-base text-[var(--navy)]">
                      {item.name}
                    </h4>
                    <p className="text-xs font-mono text-[var(--navy)]/70">
                      {item.role[locale as "id" | "en"] || item.role.en} &bull;{" "}
                      <span className="font-bold text-[var(--navy)]">{item.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
