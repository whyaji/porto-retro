"use client";

import React, { useState } from "react";
import { parseAndValidateImportedSession } from "@/lib/cbt-session";
import { UserSession } from "@/types/utbk-ukppu";
import { FiUser, FiUpload, FiPlay, FiShield } from "react-icons/fi";

interface Props {
  isOpen: boolean;
  onStartSession: (userName: string) => void;
  onImportSession: (session: UserSession) => void;
  onError: (msg: string) => void;
}

export function NamePromptModal({ isOpen, onStartSession, onImportSession, onError }: Props) {
  const [nameInput, setNameInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      setErrorMsg("Nama peserta tidak boleh kosong.");
      return;
    }
    setErrorMsg("");
    onStartSession(nameInput.trim());
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const imported = parseAndValidateImportedSession(content);
        onImportSession(imported);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        const msg = err.message || "Gagal mengimpor file sesi.";
        setErrorMsg(msg);
        onError(msg);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-4 animate-fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 dark:bg-slate-950 p-6 text-white text-center relative border-b border-slate-800">
          <div className="mx-auto w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-3 backdrop-blur-md border border-white/20">
            <FiShield className="w-6 h-6 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-black tracking-tight font-display">CBT UTBK UKPPU</h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 font-medium">
            Simulasi Ujian Tulis Berbasis Komputer & Soal HOTS Profesi Psikolog
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Nama Lengkap Peserta Asesmen
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiUser className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Masukkan nama lengkap Anda..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-emerald-500 text-sm font-medium transition-all"
                  autoFocus
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 text-xs font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-slate-900/10 dark:shadow-emerald-900/30 text-sm transition-all duration-200 active:scale-[0.99]"
            >
              <FiPlay className="w-4 h-4 text-emerald-400 dark:text-white" />
              <span>Mulai Sesi Ujian</span>
            </button>
          </form>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full"></div>
            <span className="bg-white dark:bg-slate-900 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider absolute">
              Atau Impor Sesi
            </span>
          </div>

          <div>
            <label className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-emerald-500 rounded-xl cursor-pointer text-slate-700 dark:text-slate-300 font-semibold text-xs transition-all hover:bg-slate-50 dark:hover:bg-slate-800/40">
              <FiUpload className="w-4 h-4 text-slate-600 dark:text-emerald-400" />
              <span>Unggah File Backup Sesi (.json)</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
