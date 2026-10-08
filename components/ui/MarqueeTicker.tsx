"use client";

import React from "react";
import { useI18n } from "@/context/i18n-context";
import { companyData, pickList } from "@/lib/data/company";
import { IS_COMPANY_MODE } from "@/lib/site-mode";

interface MarqueeTickerProps {
  items?: string[];
  className?: string;
}

const PERSONAL_ITEMS = [
  "FULL-STACK ENGINEERING",
  "GEOSPATIAL GIS",
  "CROSS-PLATFORM MOBILE",
  "HONO / NODE.JS",
  "FLUTTER & REACT NATIVE",
  "ENTERPRISE SSO",
  "REDIS & BULLMQ",
  "MAPLIBRE GL",
  "HIGH-PERFORMANCE ARCHITECTURE",
];

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  items,
  className = "",
}) => {
  const { locale } = useI18n();
  const resolvedItems =
    items ??
    (IS_COMPANY_MODE
      ? pickList(companyData.ticker, locale)
      : PERSONAL_ITEMS);
  const displayList = [...resolvedItems, ...resolvedItems];

  return (
    <div
      className={`w-full overflow-hidden bg-[var(--navy)] text-[var(--surface)] py-2.5 border-y-2 border-[var(--gold)] font-mono text-xs select-none ${className}`}
      aria-hidden="true"
    >
      <div className="animate-marquee flex items-center gap-6">
        {displayList.map((item, index) => (
          <span key={index} className="inline-flex items-center gap-6 shrink-0">
            <span className="font-extrabold tracking-wider text-white">
              {item}
            </span>
            <span className="text-[var(--gold)] font-black">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
