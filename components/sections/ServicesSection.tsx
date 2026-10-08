"use client";

import React from "react";
import { useI18n } from "@/context/i18n-context";
import { companyData, pick, pickList } from "@/lib/data/company";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  FiLayout,
  FiSmartphone,
  FiServer,
  FiRefreshCw,
  FiCloud,
  FiCheckCircle,
} from "react-icons/fi";

const serviceIcons: Record<string, React.ReactNode> = {
  web: <FiLayout className="w-5 h-5" />,
  mobile: <FiSmartphone className="w-5 h-5" />,
  backend: <FiServer className="w-5 h-5" />,
  legacy: <FiRefreshCw className="w-5 h-5" />,
  care: <FiCloud className="w-5 h-5" />,
};

export const ServicesSection: React.FC = () => {
  const { t, locale } = useI18n();
  const services = companyData.services;
  const lastIndex = services.length - 1;

  return (
    <section className="w-full py-16 md:py-24 border-b-2 border-[var(--navy)] bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t.services.badge}
          title={t.services.title}
          subtitle={t.services.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className={`bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-5 sm:p-6 flex flex-col transition-transform duration-200 hover:-translate-y-1 ${
                idx === lastIndex ? "lg:col-span-2" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3 pb-3 border-b-2 border-[var(--navy)]">
                <div className="p-2 bg-[var(--navy)] text-[var(--gold)] border border-[var(--navy)]">
                  {serviceIcons[service.id] ?? <FiServer className="w-5 h-5" />}
                </div>
                <span className="font-mono text-[11px] font-bold text-[var(--navy)]/45">
                  0{idx + 1}
                </span>
              </div>

              <h3 className="font-display font-extrabold text-lg sm:text-xl text-[var(--navy)] mt-4">
                {pick(service.title, locale)}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--navy)]/75 font-sans leading-relaxed italic">
                {pick(service.summary, locale)}
              </p>

              <ul className="mt-4 space-y-2 flex-1">
                {pickList(service.points, locale).map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--navy)]/90 font-sans leading-relaxed"
                  >
                    <FiCheckCircle className="w-4 h-4 text-[var(--green)] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 mt-5 border-t border-[var(--navy)]/10 flex items-center justify-between text-[10px] font-mono text-[var(--navy)]/60">
                <span>SERVICE_0{idx + 1}</span>
                <span className="text-[var(--green)] font-bold">
                  {"// " + service.id.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
