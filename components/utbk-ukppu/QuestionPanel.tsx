"use client";

import React from "react";
import { Question } from "@/types/utbk-ukppu";
import { FiChevronLeft, FiChevronRight, FiFlag, FiCheckCircle, FiSend } from "react-icons/fi";

interface Props {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer?: string;
  isFlagged: boolean;
  onSelectOption: (optionId: string) => void;
  onToggleFlag: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSubmitExam: () => void;
}

export function QuestionPanel({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  isFlagged,
  onSelectOption,
  onToggleFlag,
  onPrev,
  onNext,
  onSubmitExam,
}: Props) {
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
      {/* Question Header Bar */}
      <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-black text-xs sm:text-sm flex items-center justify-center shadow-xs flex-shrink-0">
            {currentIndex + 1}
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            Pertanyaan {currentIndex + 1} dari {totalQuestions}
          </span>
        </div>

        {/* Flag Ragu-Ragu Button */}
        <button
          onClick={onToggleFlag}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
            isFlagged
              ? "bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800"
              : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
          }`}
        >
          <FiFlag className={`w-3.5 h-3.5 ${isFlagged ? "fill-amber-500 text-amber-500" : ""}`} />
          <span className="hidden sm:inline">{isFlagged ? "Ragu-Ragu (Tersimpan)" : "Tandai Ragu-Ragu"}</span>
          <span className="sm:hidden">{isFlagged ? "Ragu" : "Ragu-Ragu"}</span>
        </button>
      </div>

      {/* Main Question & Options Body */}
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Question Text Prompt */}
        <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h2 className="text-xs sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Options List A-E */}
        <div className="space-y-2.5 sm:space-y-3">
          {question.options.map((opt) => {
            const isSelected = selectedAnswer === opt.id;
            return (
              <label
                key={opt.id}
                onClick={() => onSelectOption(opt.id)}
                className={`flex items-start gap-3 sm:gap-3.5 p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-600 dark:border-emerald-500 ring-1 ring-emerald-600 shadow-xs"
                    : "bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80"
                }`}
              >
                {/* Option Badge A/B/C/D/E */}
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-xs font-black flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {opt.id}
                </div>

                {/* Option Text */}
                <div className="flex-1 text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-200 pt-0.5 leading-relaxed">
                  {opt.text}
                </div>

                {/* Radio selection checkmark */}
                {isSelected && (
                  <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                )}
              </label>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold transition-all ${
            currentIndex === 0
              ? "opacity-40 cursor-not-allowed bg-slate-200 dark:bg-slate-800 text-slate-500"
              : "bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
          }`}
        >
          <FiChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        {isLast ? (
          <button
            onClick={onSubmitExam}
            className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all active:scale-95"
          >
            <FiSend className="w-4 h-4" />
            <span>Kumpulkan</span>
          </button>
        ) : (
          <button
            onClick={onNext}
            className="flex items-center gap-1 sm:gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
          >
            <span>Selanjutnya</span>
            <FiChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
