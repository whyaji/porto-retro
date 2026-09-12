"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useI18n } from "@/context/i18n-context";
import { getTrustedBy } from "@/lib/data/trustedBy";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { TrustedByItem } from "@/types/social-proof";
import {
  FiExternalLink,
  FiShield,
  FiX,
  FiCheckCircle,
  FiBriefcase,
  FiInfo,
} from "react-icons/fi";

const emptySubscribe = () => () => {};

export const TrustedBySection: React.FC = () => {
  const { t, locale } = useI18n();
  const items = getTrustedBy();
  const [selectedItem, setSelectedItem] = useState<TrustedByItem | null>(null);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Close modal on escape key and manage body overflow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };
    if (selectedItem) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

  const activeCategory = (item: TrustedByItem) => {
    if (typeof item.category === "object" && item.category !== null) {
      return item.category[locale as "id" | "en"] || item.category.en;
    }
    return item.category;
  };

  const activeRelationship = (item: TrustedByItem) => {
    if (item.relationship) {
      return item.relationship[locale as "id" | "en"] || item.relationship.en;
    }
    return null;
  };

  const activeHighlights = (item: TrustedByItem): string[] => {
    if (item.highlights) {
      return item.highlights[locale as "id" | "en"] || item.highlights.en || [];
    }
    return [];
  };

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

        {/* Logo Cards Grid */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`group relative w-full sm:w-[220px] md:w-[240px] ${
                item.withLabel ? "h-[140px]" : "h-[100px]"
              } bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow retro-shadow-hover p-4 flex flex-col items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] cursor-pointer overflow-hidden`}
              aria-label={`View details for ${item.name}`}
            >
              {/* Logo Container (Dark background if logo contains white text) */}
              <div
                className={`relative w-full ${
                  item.withLabel ? "h-16" : "h-16 sm:h-20"
                } flex items-center justify-center p-2 rounded transition-colors ${
                  item.bgDark
                    ? "bg-[var(--navy)] border border-[var(--gold)]/30"
                    : "bg-[var(--surface-light)]/50"
                }`}
              >
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 240px"
                  className="object-contain p-1 filter drop-shadow-sm group-hover:scale-110 transition-transform duration-200"
                />
              </div>

              {/* Company Name Label */}
              {item.withLabel && (
                <div className="mt-3 flex items-center gap-1 text-[11px] font-mono font-bold text-[var(--navy)]/85 group-hover:text-[var(--green)] transition-colors">
                  <span className="truncate max-w-[180px]">{item.name}</span>
                  <FiInfo className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--green)]" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Detail Modal Dialog via React Portal for true full-screen centering */}
      {mounted &&
        selectedItem &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[var(--navy)]/75 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSelectedItem(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div
              className="bg-[var(--card)] border-3 border-[var(--navy)] retro-shadow-lg max-w-xl w-full p-6 sm:p-8 relative overflow-hidden max-h-[90vh] flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 bg-[var(--surface-light)] border-2 border-[var(--navy)] text-[var(--navy)] hover:bg-[var(--gold)] transition-colors focus:outline-none cursor-pointer"
                aria-label={t.trustedBy.closeModal}
              >
                <FiX className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto pr-1 space-y-5">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-5 border-b-2 border-[var(--navy)]">
                  <div
                    className={`relative w-24 h-24 shrink-0 border-2 border-[var(--navy)] p-2 flex items-center justify-center ${
                      selectedItem.bgDark
                        ? "bg-[var(--navy)] border-[var(--gold)]"
                        : "bg-[var(--surface-light)]"
                    }`}
                  >
                    <Image
                      src={selectedItem.logo}
                      alt={selectedItem.name}
                      fill
                      sizes="96px"
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="text-center sm:text-left space-y-2">
                    <h3
                      id="modal-title"
                      className="font-display font-extrabold text-xl sm:text-2xl text-[var(--navy)]"
                    >
                      {selectedItem.name}
                    </h3>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-bold text-[var(--green)] bg-[var(--green-muted)] border border-[var(--green)]">
                        <FiShield className="w-3.5 h-3.5" />
                        {activeCategory(selectedItem)}
                      </span>

                      {activeRelationship(selectedItem) && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-bold text-[var(--navy)] bg-[var(--gold-muted)] border border-[var(--gold)]">
                          <FiBriefcase className="w-3.5 h-3.5 text-[var(--navy)]" />
                          {activeRelationship(selectedItem)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-sm font-sans text-[var(--navy)]/85 leading-relaxed bg-[var(--surface-light)] p-4 border-l-4 border-[var(--navy)]">
                    {selectedItem.description[locale as "id" | "en"] || selectedItem.description.en}
                  </p>
                </div>

                {/* Key Highlights */}
                {activeHighlights(selectedItem).length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-[var(--navy)] uppercase tracking-wider block">
                      {`// ${t.trustedBy.keyHighlights}:`}
                    </span>
                    <ul className="space-y-2">
                      {activeHighlights(selectedItem).map((hItem: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-[var(--navy)]/90"
                        >
                          <FiCheckCircle className="w-4 h-4 text-[var(--green)] shrink-0 mt-0.5" />
                          <span>{hItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="mt-6 pt-4 border-t-2 border-[var(--navy)] flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs font-mono text-[var(--green)] font-bold">
                  {"// VERIFIED_ORGANIZATION"}
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {selectedItem.website && (
                    <a
                      href={selectedItem.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-[var(--navy)] text-[var(--gold)] font-mono text-xs font-bold border-2 border-[var(--navy)] hover:bg-[var(--navy-light)] transition-colors"
                    >
                      <span>{t.trustedBy.visitWebsite}</span>
                      <FiExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-[var(--surface-light)] text-[var(--navy)] font-mono text-xs font-bold border-2 border-[var(--navy)] hover:bg-[var(--surface-dark)] transition-colors cursor-pointer"
                  >
                    {t.trustedBy.closeModal}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};
