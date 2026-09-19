"use client";

import React from "react";
import { Question } from "@/types/utbk-ukppu";
import { FiBookOpen, FiTag, FiLayers } from "react-icons/fi";

interface Props {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
}

export function CaseStudyPanel({ question, currentIndex, totalQuestions }: Props) {
  const { caseStudy, domainTitle, domainId, indicatorId, indicatorTitle } = question;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
      {/* Panel Top Metadata Header */}
      <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="px-2.5 py-0.5 sm:py-1 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 rounded-lg text-[11px] sm:text-xs font-black uppercase tracking-wider">
              Domain {domainId}
            </span>
            <span className="px-2.5 py-0.5 sm:py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] sm:text-xs font-bold">
              Indikator {indicatorId}
            </span>
          </div>

          <span className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">
            Studi Kasus Soal #{currentIndex + 1} dari {totalQuestions}
          </span>
        </div>

        <div>
          <h4 className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">
            {domainTitle}
          </h4>
          <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <FiLayers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span>{indicatorTitle}</span>
          </p>
        </div>
      </div>

      {/* Case Study Content Body */}
      <div className="p-4 sm:p-6 space-y-4">
        <div className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
            <FiBookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              Deskripsi Studi Kasus HOTS
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {caseStudy.title}
            </h3>
          </div>
        </div>

        {/* Tags */}
        {caseStudy.contextTags && caseStudy.contextTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {caseStudy.contextTags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[11px] sm:text-xs font-medium rounded-full"
              >
                <FiTag className="w-3 h-3 text-slate-400" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Scenario Narrative */}
        <div className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed space-y-3 font-normal">
          {caseStudy.scenario.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="bg-slate-50 dark:bg-slate-800/40 p-3.5 sm:p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/60 text-slate-800 dark:text-slate-200">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
