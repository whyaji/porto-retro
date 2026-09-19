"use client";

import React, { useState, useMemo } from "react";
import { Question, UserSession } from "@/types/utbk-ukppu";
import {
  FiAward,
  FiCheckCircle,
  FiXCircle,
  FiBookOpen,
  FiDownload,
  FiRotateCcw,
  FiClock,
  FiFileText,
  FiLayers,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { exportSessionToJSON } from "@/lib/cbt-session";
import { exportQuestionsOnlyTXT, exportQuestionsAndResultsTXT } from "@/lib/cbt-export-txt";

interface Props {
  session: UserSession;
  questions: Question[];
  onResetExam: () => void;
}

interface GroupedIndicatorReview {
  fullId: string;
  domainId: number;
  domainTitle: string;
  indicatorId: string;
  indicatorTitle: string;
  items: { question: Question; globalIndex: number; isCorrect: boolean }[];
  correctCount: number;
}

export function ResultReview({ session, questions, onResetExam }: Props) {
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [statusFilter, setStatusFilter] = useState<"all" | "correct" | "incorrect">("all");
  const [selectedIndicatorFilter, setSelectedIndicatorFilter] = useState<string>("all");

  // Overall Score Calculation
  const correctCount = useMemo(() => {
    let count = 0;
    questions.forEach((q) => {
      if (session.selectedAnswers[q.id] === q.key) {
        count++;
      }
    });
    return count;
  }, [questions, session.selectedAnswers]);

  const totalQuestions = questions.length;
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

  const formatTimeSpent = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins} menit ${remainingSecs} detik`;
  };

  // Group questions by Domain & Indicator for scalable review navigation
  const groupedIndicators = useMemo(() => {
    const groups: GroupedIndicatorReview[] = [];
    questions.forEach((q, idx) => {
      const fullId = q.indicatorFullId || `D${q.domainId}-${q.indicatorId}`;
      const isCorrect = session.selectedAnswers[q.id] === q.key;

      let group = groups.find((g) => g.fullId === fullId);
      if (!group) {
        group = {
          fullId,
          domainId: q.domainId,
          domainTitle: q.domainTitle,
          indicatorId: q.indicatorId,
          indicatorTitle: q.indicatorTitle,
          items: [],
          correctCount: 0,
        };
        groups.push(group);
      }
      group.items.push({ question: q, globalIndex: idx, isCorrect });
      if (isCorrect) {
        group.correctCount++;
      }
    });
    return groups;
  }, [questions, session.selectedAnswers]);

  // List of unique indicators for filter dropdown
  const indicatorOptions = useMemo(() => {
    return groupedIndicators.map((g) => ({
      fullId: g.fullId,
      label: `Domain ${g.domainId} • Indikator ${g.indicatorId}: ${g.indicatorTitle}`,
    }));
  }, [groupedIndicators]);

  // Filtered grouped items based on active filter selections
  const filteredGroupedIndicators = useMemo(() => {
    return groupedIndicators
      .map((g) => {
        if (selectedIndicatorFilter !== "all" && g.fullId !== selectedIndicatorFilter) {
          return null;
        }

        const filteredItems = g.items.filter((item) => {
          if (statusFilter === "correct") return item.isCorrect;
          if (statusFilter === "incorrect") return !item.isCorrect;
          return true;
        });

        if (filteredItems.length === 0) return null;

        return {
          ...g,
          items: filteredItems,
        };
      })
      .filter(Boolean) as GroupedIndicatorReview[];
  }, [groupedIndicators, selectedIndicatorFilter, statusFilter]);

  const currentQ = questions[activeQuestionIdx];
  const userAnswer = session.selectedAnswers[currentQ?.id];
  const isCurrentCorrect = userAnswer === currentQ?.key;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Top Banner Result Summary Card */}
      <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-emerald-400">
              <FiAward className="w-4 h-4 text-amber-400" />
              <span>Hasil Asesmen UTBK UKPPU</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-display">
              Selamat, {session.userName}!
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-md">
              Anda telah menyelesaikan simulasi Ujian Tulis Berbasis Komputer UTBK Profesi Psikolog Umum.
            </p>
          </div>

          {/* Score Badge */}
          <div className="flex items-center gap-6 bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/15">
            <div className="text-center">
              <span className="block text-3xl sm:text-4xl font-black text-emerald-400">
                {scorePercentage}%
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider">
                Nilai Akhir
              </span>
            </div>

            <div className="h-10 w-px bg-white/20"></div>

            <div className="space-y-1 text-xs text-slate-200 font-medium">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-emerald-400" />
                <span>Benar: <strong>{correctCount}</strong> / {totalQuestions}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiXCircle className="text-rose-400" />
                <span>Salah/Kosong: <strong>{totalQuestions - correctCount}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-amber-400" />
                <span>Waktu: <strong>{formatTimeSpent(session.timeElapsed)}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onResetExam}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all backdrop-blur-xs border border-white/20"
          >
            <FiRotateCcw className="w-4 h-4 text-amber-400" />
            <span>Ulangi Ujian (Reset)</span>
          </button>

          {/* TXT & JSON Download Options */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => exportQuestionsOnlyTXT(questions)}
              title="Download lembar soal polos (.txt)"
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all backdrop-blur-xs border border-white/20"
            >
              <FiFileText className="w-4 h-4 text-amber-400" />
              <span>Download Soal Saja (.txt)</span>
            </button>

            <button
              onClick={() => exportQuestionsAndResultsTXT(session, questions)}
              title="Download lembar soal beserta jawaban Anda (.txt)"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-900/30"
            >
              <FiFileText className="w-4 h-4" />
              <span>Download Soal + Hasil (.txt)</span>
            </button>

            <button
              onClick={() => exportSessionToJSON(session)}
              title="Ekspor file sesi backup (.json)"
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all border border-slate-700"
            >
              <FiDownload className="w-4 h-4" />
              <span>Sesi (.json)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Review Section Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 font-display">
              Pembahasan & Pembelajaran Etika Asesmen
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Pilih nomor soal berdasarkan Domain dan Indikator di bawah untuk melihat kunci jawaban & pembahasan HIMPSI
            </p>
          </div>

          {/* Filter Status (All, Correct, Incorrect) */}
          <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold flex-shrink-0">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === "all"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              Semua ({totalQuestions})
            </button>
            <button
              onClick={() => setStatusFilter("correct")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                statusFilter === "correct"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950/40"
              }`}
            >
              <FiCheckCircle className="w-3.5 h-3.5" />
              <span>Benar ({correctCount})</span>
            </button>
            <button
              onClick={() => setStatusFilter("incorrect")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                statusFilter === "incorrect"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/40"
              }`}
            >
              <FiXCircle className="w-3.5 h-3.5" />
              <span>Salah ({totalQuestions - correctCount})</span>
            </button>
          </div>
        </div>

        {/* Filter Indicator Dropdown */}
        {indicatorOptions.length > 1 && (
          <div className="flex items-center gap-2">
            <FiFilter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <select
              value={selectedIndicatorFilter}
              onChange={(e) => setSelectedIndicatorFilter(e.target.value)}
              className="w-full sm:w-auto px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-emerald-500"
            >
              <option value="all">Tampilkan Semua Indikator Soal</option>
              {indicatorOptions.map((opt) => (
                <option key={opt.fullId} value={opt.fullId}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Grouped Scalable Review Question Navigation Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-6 shadow-sm">
        {filteredGroupedIndicators.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500 dark:text-slate-400">
            Tidak ada soal yang sesuai dengan filter yang dipilih.
          </div>
        ) : (
          filteredGroupedIndicators.map((group) => (
            <div key={group.fullId} className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 first:border-t-0 first:pt-0">
              {/* Group Section Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-[10px] font-black rounded uppercase tracking-wider">
                    Domain {group.domainId}
                  </span>
                  <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-[10px] font-bold rounded">
                    Indikator {group.indicatorId} ({group.fullId})
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <FiLayers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>{group.indicatorTitle}</span>
                  </h4>
                </div>

                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                  Akurasi: <strong className="text-emerald-700 dark:text-emerald-400">{group.correctCount}</strong>/{group.items.length} Benar
                </span>
              </div>

              {/* Group Question Buttons Grid */}
              <div className="flex flex-wrap gap-2">
                {group.items.map(({ question: q, globalIndex, isCorrect }) => {
                  const isActive = globalIndex === activeQuestionIdx;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setActiveQuestionIdx(globalIndex)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        isActive
                          ? "bg-slate-900 text-white dark:bg-emerald-600 dark:text-white border-slate-900 dark:border-emerald-500 shadow-md ring-2 ring-slate-900 dark:ring-emerald-400 ring-offset-2 dark:ring-offset-slate-900 scale-105 z-10"
                          : isCorrect
                          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900 hover:bg-emerald-100"
                          : "bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-900 hover:bg-rose-100"
                      }`}
                    >
                      <span>Soal #{globalIndex + 1}</span>
                      {isCorrect ? (
                        <FiCheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <FiXCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detailed Question & Explanation Box */}
      {currentQ && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          {/* Domain Badge & Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Domain {currentQ.domainId} • Indikator {currentQ.indicatorId} ({currentQ.indicatorFullId})
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">
                {currentQ.caseStudy.title}
              </h3>
            </div>

            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border ${
                isCurrentCorrect
                  ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                  : "bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800"
              }`}
            >
              {isCurrentCorrect ? (
                <>
                  <FiCheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Jawaban Tepat (+1)</span>
                </>
              ) : (
                <>
                  <FiXCircle className="w-4 h-4 text-rose-600" />
                  <span>Jawaban Kurang Tepat</span>
                </>
              )}
            </div>
          </div>

          {/* Case Scenario Narrative */}
          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
            <strong>Studi Kasus:</strong> {currentQ.caseStudy.scenario}
          </div>

          {/* Question Prompt */}
          <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
            {currentQ.question}
          </div>

          {/* Options List with Answer Key Highlight */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt) => {
              const isUserChoice = userAnswer === opt.id;
              const isKeyChoice = currentQ.key === opt.id;

              let cardStyle = "bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200";
              if (isKeyChoice) {
                cardStyle = "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 dark:border-emerald-600 text-emerald-950 dark:text-emerald-100 font-semibold ring-1 ring-emerald-500";
              } else if (isUserChoice && !isKeyChoice) {
                cardStyle = "bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100 font-medium";
              }

              return (
                <div
                  key={opt.id}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border text-xs leading-relaxed transition-colors ${cardStyle}`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg font-bold flex items-center justify-center flex-shrink-0 ${
                      isKeyChoice
                        ? "bg-emerald-600 text-white"
                        : isUserChoice
                        ? "bg-rose-600 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {opt.id}
                  </div>

                  <div className="flex-1 pt-0.5">{opt.text}</div>

                  {isKeyChoice && (
                    <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold uppercase tracking-wider">
                      Kunci Jawaban
                    </span>
                  )}
                  {isUserChoice && !isKeyChoice && (
                    <span className="px-2 py-0.5 bg-rose-600 text-white rounded text-[10px] font-bold uppercase tracking-wider">
                      Pilihan Anda
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Ethical Rationale Explanation Box */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-xs uppercase tracking-wider">
              <FiBookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Landasan Kode Etik & Pembahasan Rinci</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {currentQ.explanation}
            </p>
          </div>

          {/* Sequential Review Prev & Next Navigation Footer */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={() => setActiveQuestionIdx((prev) => Math.max(0, prev - 1))}
              disabled={activeQuestionIdx === 0}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeQuestionIdx === 0
                  ? "opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400"
                  : "bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              }`}
            >
              <FiChevronLeft className="w-4 h-4" />
              <span>Pembahasan Sebelumnya</span>
            </button>

            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {activeQuestionIdx + 1} / {totalQuestions}
            </span>

            <button
              onClick={() => setActiveQuestionIdx((prev) => Math.min(totalQuestions - 1, prev + 1))}
              disabled={activeQuestionIdx === totalQuestions - 1}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeQuestionIdx === totalQuestions - 1
                  ? "opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400"
                  : "bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white"
              }`}
            >
              <span>Pembahasan Selanjutnya</span>
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
