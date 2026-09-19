"use client";

import React from "react";
import { FiUser, FiDownload, FiUpload, FiTrash2, FiClock, FiGrid, FiShield, FiSun, FiMoon } from "react-icons/fi";
import { exportSessionToJSON } from "@/lib/cbt-session";
import { UserSession } from "@/types/utbk-ukppu";

interface Props {
  session: UserSession;
  timeElapsed: number;
  onOpenDeleteModal: () => void;
  onImportTrigger: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleGridDrawer: () => void;
  totalAnswered: number;
  totalQuestions: number;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export function HeaderToolbar({
  session,
  timeElapsed,
  onOpenDeleteModal,
  onImportTrigger,
  onToggleGridDrawer,
  totalAnswered,
  totalQuestions,
  theme,
  onToggleTheme,
}: Props) {
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const hours = Math.floor(mins / 60);
    const remMins = mins % 60;

    if (hours > 0) {
      return `${String(hours).padStart(2, "0")}:${String(remMins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
    return `${String(remMins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleExport = () => {
    exportSessionToJSON(session);
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-xs transition-colors">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-3">
          
          {/* Top Row on Mobile: Brand & Participant Name & Theme Toggle */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 dark:bg-slate-800 text-emerald-400 flex items-center justify-center font-bold border border-slate-800 dark:border-slate-700 flex-shrink-0">
                <FiShield className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 leading-tight font-display">
                  CBT UTBK UKPPU
                </h1>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium truncate max-w-[180px] sm:max-w-none">
                  Uji Kompetensi Profesi Psikolog Umum
                </p>
              </div>
            </div>

            {/* Participant Chip & Theme Toggle on Mobile */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200">
                <FiUser className="text-emerald-600 dark:text-emerald-400 text-xs" />
                <span className="truncate max-w-[90px] sm:max-w-[120px] text-xs font-bold">{session.userName}</span>
              </div>

              <button
                onClick={onToggleTheme}
                title={`Mode ${theme === "light" ? "Gelap (Dark)" : "Terang (Light)"}`}
                className="p-1.5 sm:p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-400 rounded-xl text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-700 flex-shrink-0"
              >
                {theme === "light" ? (
                  <FiMoon className="w-4 h-4 text-slate-700" />
                ) : (
                  <FiSun className="w-4 h-4 text-amber-400" />
                )}
              </button>
            </div>
          </div>

          {/* Bottom Row / Middle Info: Timer, Progress & Quick Actions */}
          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800">
            {/* Timer & Terjawab Counter */}
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 px-3 py-1 sm:py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700/60 text-xs">
              <div className="flex items-center gap-1 text-slate-900 dark:text-emerald-400 font-mono font-bold">
                <FiClock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                <span>{formatTimer(timeElapsed)}</span>
              </div>
              <div className="h-3.5 w-px bg-slate-300 dark:bg-slate-700"></div>
              <div className="font-semibold text-slate-600 dark:text-slate-300 text-[11px] sm:text-xs">
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">{totalAnswered}</span>/{totalQuestions}
              </div>
            </div>

            {/* Actions: Grid, Import, Export, Delete */}
            <div className="flex items-center gap-1.5">
              {!session.isSubmitted && (
                <button
                  onClick={onToggleGridDrawer}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
                >
                  <FiGrid className="w-3.5 h-3.5 text-slate-600 dark:text-emerald-400" />
                  <span>Grid Soal</span>
                </button>
              )}

              <label
                title="Impor Sesi"
                className="flex items-center gap-1 px-2 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
              >
                <FiUpload className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                <span className="hidden sm:inline">Impor</span>
                <input type="file" accept=".json" onChange={onImportTrigger} className="hidden" />
              </label>

              <button
                onClick={handleExport}
                title="Ekspor Sesi"
                className="flex items-center gap-1 px-2 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-700"
              >
                <FiDownload className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                <span className="hidden sm:inline">Ekspor</span>
              </button>

              <button
                onClick={onOpenDeleteModal}
                title="Hapus Sesi"
                className="flex items-center gap-1 px-2 py-1.5 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-400 rounded-xl text-xs font-semibold transition-colors border border-rose-200/60 dark:border-rose-900/60"
              >
                <FiTrash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Hapus</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
