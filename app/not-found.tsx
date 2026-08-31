"use client";

import React from "react";
import { useI18n } from "@/context/i18n-context";
import { Button } from "@/components/ui/Button";
import { FiHome, FiAlertTriangle } from "react-icons/fi";

export default function NotFoundPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow-lg p-8 text-center space-y-6">
        <div className="w-16 h-16 bg-[var(--gold)] text-[var(--navy)] border-2 border-[var(--navy)] flex items-center justify-center mx-auto retro-shadow-sm">
          <FiAlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 border border-red-300">
            {t.notFound.code}
          </span>
          <h1 className="font-display font-black text-3xl text-[var(--navy)] tracking-tight">
            {t.notFound.title}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--navy)]/75 font-sans leading-relaxed">
            {t.notFound.description}
          </p>
        </div>

        <div className="pt-2">
          <Button
            href="/"
            variant="primary"
            size="lg"
            fullWidth
            leftIcon={<FiHome className="w-4 h-4" />}
          >
            {t.notFound.backHome}
          </Button>
        </div>
      </div>
    </div>
  );
}
