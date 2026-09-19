"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FiUser,
  FiChevronDown,
  FiDownload,
  FiUpload,
  FiTrash2,
  FiClock,
  FiGrid,
  FiShield,
  FiSun,
  FiMoon,
  FiRefreshCw,
} from "react-icons/fi";
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
  onSwitchVersion?: () => void;
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
  onSwitchVersion,
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close user dropdown menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

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
    setIsMenuOpen(false);
  };

  const versionLabel = (session.questionVersion || "v2").toUpperCase();

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-xs transition-colors">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Brand Logo & Title & Version Tag */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-slate-800 text-emerald-400 flex items-center justify-center font-bold border border-slate-800 dark:border-slate-700 shadow-xs flex-shrink-0">
              <FiShield className="w-4 h-4 text-emerald-400" />
            </div>
            
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight font-display whitespace-nowrap">
                CBT UKPPU
              </h1>

              {/* Compact Version Badge */}
              <button
                type="button"
                onClick={onSwitchVersion}
                title={`Paket Soal Aktif: ${versionLabel} (Klik untuk ganti)`}
                className="px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-700 hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>{versionLabel}</span>
              </button>
            </div>
          </div>

          {/* Right: Timer, Question Grid, Theme & User Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Compact Timer & Answered Pill */}
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-200/80 dark:border-slate-700/60 text-xs flex-shrink-0">
              <div className="flex items-center gap-1 text-slate-900 dark:text-emerald-400 font-mono font-bold text-[11px] sm:text-xs">
                <FiClock className="w-3 h-3 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                <span>{formatTimer(timeElapsed)}</span>
              </div>
              <div className="h-3 w-px bg-slate-300 dark:bg-slate-700"></div>
              <div className="font-semibold text-slate-600 dark:text-slate-300 text-[10px] sm:text-[11px]">
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">{totalAnswered}</span>/{totalQuestions}
              </div>
            </div>

            {/* Grid Soal Button */}
            {!session.isSubmitted && (
              <button
                onClick={onToggleGridDrawer}
                title="Buka Lembar Grid Soal"
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
              >
                <FiGrid className="w-3.5 h-3.5 text-slate-600 dark:text-emerald-400" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              title={`Mode ${theme === "light" ? "Gelap (Dark)" : "Terang (Light)"}`}
              className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-400 rounded-xl text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-700 flex-shrink-0"
            >
              {theme === "light" ? (
                <FiMoon className="w-3.5 h-3.5 text-slate-700" />
              ) : (
                <FiSun className="w-3.5 h-3.5 text-amber-400" />
              )}
            </button>

            {/* User Dropdown Menu (Rightmost) */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                  isMenuOpen
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                }`}
              >
                <FiUser className={`text-xs ${isMenuOpen ? "text-emerald-400 dark:text-emerald-600" : "text-emerald-600 dark:text-emerald-400"}`} />
                <span className="max-w-[75px] sm:max-w-[110px] truncate text-[11px] sm:text-xs font-bold">
                  {session.userName}
                </span>
                <FiChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu Panel */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-fade-in divide-y divide-slate-100 dark:divide-slate-800">
                  {/* User Profile Header in Dropdown */}
                  <div className="px-3.5 py-2.5">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      Peserta Ujian
                    </div>
                    <div className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate mt-0.5">
                      {session.userName}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        {versionLabel}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        {session.questionVersion === "v1" ? "610 Soal Klasik" : "40 Soal HOTS"}
                      </span>
                    </div>
                  </div>

                  {/* Action Items */}
                  <div className="py-1">
                    {onSwitchVersion && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsMenuOpen(false);
                          onSwitchVersion();
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                      >
                        <FiRefreshCw className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Ganti Paket Soal ({session.questionVersion === "v1" ? "V2" : "V1"})</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleExport}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                    >
                      <FiDownload className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                      <span>Ekspor Backup Sesi (.json)</span>
                    </button>

                    <label
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-left"
                    >
                      <FiUpload className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                      <span>Impor Backup Sesi (.json)</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={(e) => {
                          setIsMenuOpen(false);
                          onImportTrigger(e);
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Danger Item */}
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenDeleteModal();
                      }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                      <span>Hapus / Keluar Sesi</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}

