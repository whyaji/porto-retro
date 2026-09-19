"use client";

import React from "react";
import { Question } from "@/types/utbk-ukppu";
import { FiX, FiLayers } from "react-icons/fi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  currentIndex: number;
  selectedAnswers: Record<string, string>;
  flaggedQuestions: Record<string, boolean>;
  onSelectQuestion: (index: number) => void;
  onSubmitExam: () => void;
}

interface GroupedIndicator {
  fullId: string;
  domainId: number;
  indicatorId: string;
  indicatorTitle: string;
  items: { question: Question; globalIndex: number }[];
}

export function QuestionGridDrawer({
  isOpen,
  onClose,
  questions,
  currentIndex,
  selectedAnswers,
  flaggedQuestions,
  onSelectQuestion,
  onSubmitExam,
}: Props) {
  if (!isOpen) return null;

  const totalAnswered = Object.keys(selectedAnswers).filter((k) => selectedAnswers[k]).length;

  // Group questions by domain and indicator
  const groupedIndicators: GroupedIndicator[] = [];
  questions.forEach((q, idx) => {
    const fullId = q.indicatorFullId || `D${q.domainId}-${q.indicatorId}`;
    let group = groupedIndicators.find((g) => g.fullId === fullId);
    if (!group) {
      group = {
        fullId,
        domainId: q.domainId,
        indicatorId: q.indicatorId,
        indicatorTitle: q.indicatorTitle,
        items: [],
      };
      groupedIndicators.push(group);
    }
    group.items.push({ question: q, globalIndex: idx });
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Top Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-display">
              Navigasi Soal
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {totalAnswered} dari {questions.length} Terjawab
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Legend */}
        <div className="p-3.5 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-2 text-xs font-bold">
          <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
            <span className="w-3 h-3 rounded bg-emerald-600"></span>
            <span>Terjawab</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
            <span className="w-3 h-3 rounded bg-amber-500"></span>
            <span>Ragu-Ragu</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700"></span>
            <span>Belum</span>
          </div>
        </div>

        {/* Grouped Question Grid Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-6">
          {groupedIndicators.map((group) => (
            <div key={group.fullId} className="space-y-3">
              {/* Group Section Separator Header */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 first:border-t-0 first:pt-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="px-2 py-0.5 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-[10px] font-black rounded uppercase tracking-wider">
                    Domain {group.domainId}
                  </span>
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[10px] font-bold rounded">
                    Indikator {group.indicatorId}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 leading-snug">
                  <FiLayers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>{group.indicatorTitle}</span>
                </h4>
              </div>

              {/* 5-Column Grid */}
              <div className="grid grid-cols-5 gap-2.5">
                {group.items.map(({ question: q, globalIndex }) => {
                  const isCurrent = globalIndex === currentIndex;
                  const isAnswered = Boolean(selectedAnswers[q.id]);
                  const isFlagged = Boolean(flaggedQuestions[q.id]);

                  let badgeBg = "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700";
                  if (isFlagged) {
                    badgeBg = "bg-amber-500 text-white border-amber-600 shadow-amber-500/20";
                  } else if (isAnswered) {
                    badgeBg = "bg-emerald-600 text-white border-emerald-700 shadow-emerald-500/20";
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        onSelectQuestion(globalIndex);
                        onClose();
                      }}
                      className={`relative aspect-square rounded-xl font-black text-sm flex items-center justify-center border transition-all duration-150 ${badgeBg} ${
                        isCurrent
                          ? "ring-2 ring-slate-900 dark:ring-emerald-400 ring-offset-2 dark:ring-offset-slate-900 scale-105 z-10"
                          : "hover:scale-105"
                      }`}
                    >
                      <span>{globalIndex + 1}</span>

                      {/* Sub badge */}
                      {isAnswered && !isFlagged && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-800 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                          ✓
                        </span>
                      )}
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-800 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                          !
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Submit Action */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => {
              onClose();
              onSubmitExam();
            }}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition-all active:scale-95"
          >
            Selesaikan & Kumpulkan
          </button>
        </div>
      </div>
    </div>
  );
}
