"use client";

import React from "react";

interface MarqueeTickerProps {
  items?: string[];
  className?: string;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  items = [
    "FULL-STACK ENGINEERING",
    "GEOSPATIAL GIS",
    "CROSS-PLATFORM MOBILE",
    "HONO / NODE.JS",
    "FLUTTER & REACT NATIVE",
    "ENTERPRISE SSO",
    "REDIS & BULLMQ",
    "MAPLIBRE GL",
    "HIGH-PERFORMANCE ARCHITECTURE",
  ],
  className = "",
}) => {
  const displayList = [...items, ...items];

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
