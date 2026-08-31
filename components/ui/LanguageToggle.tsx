"use client";

import React from "react";
import { useI18n } from "@/context/i18n-context";

export const LanguageToggle: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className={`inline-flex items-center p-0.5 bg-[var(--surface-dark)] border-2 border-[var(--navy)] retro-shadow-sm font-mono text-xs ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => setLocale("id")}
        className={`px-2 py-1 font-bold transition-colors ${
          locale === "id"
            ? "bg-[var(--navy)] text-[var(--surface)] shadow-none"
            : "text-[var(--navy)] hover:bg-black/5"
        }`}
        aria-pressed={locale === "id"}
      >
        ID
      </button>
      <span className="text-[var(--navy)]/40 px-0.5 select-none">/</span>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`px-2 py-1 font-bold transition-colors ${
          locale === "en"
            ? "bg-[var(--navy)] text-[var(--surface)] shadow-none"
            : "text-[var(--navy)] hover:bg-black/5"
        }`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
    </div>
  );
};
