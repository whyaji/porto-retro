"use client";

import React, { useState } from "react";
import { parseAndValidateImportedSession } from "@/lib/cbt-session";
import { UserSession } from "@/types/utbk-ukppu";
import { FiUser, FiUpload, FiPlay, FiShield } from "react-icons/fi";

interface Props {
  isOpen: boolean;
  onStartSession: (userName: string, version: "v1" | "v2") => void;
  onImportSession: (session: UserSession) => void;
  onError: (msg: string) => void;
}

export function NamePromptModal({ isOpen, onStartSession, onImportSession, onError }: Props) {
  const [nameInput, setNameInput] = useState("");
  const [version, setVersion] = useState<"v1" | "v2">("v2");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      setErrorMsg("Nama peserta tidak boleh kosong.");
      return;
    }
    setErrorMsg("");
    onStartSession(nameInput.trim(), version);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-4 animate-fade-in overflow-y-auto">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6">
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
          <form onSubmit={handleSubmit} className="space-y-5">
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

            {/* Version Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Pilih Paket Soal Ujian
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Version 2 Option (Default Newest) */}
                <div
                  onClick={() => setVersion("v2")}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    version === "v2"
                      ? "border-emerald-600 dark:border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xs ring-1 ring-emerald-500"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                        version === "v2" ? "border-emerald-600 bg-emerald-600" : "border-slate-400"
                      }`}>
                        {version === "v2" && <span className="w-1 h-1 bg-white rounded-full"></span>}
                      </span>
                      Paket V2 (Terbaru)
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-black uppercase tracking-wider">
                      Default
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-snug">
                    <strong>40 Soal HOTS</strong> • 5 Opsi (A–E)
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-tight">
                    Skenario kasus panjang & SJT dilematis. Bobot 70% Asesmen & Intervensi.
                  </p>
                </div>

                {/* Version 1 Option */}
                <div
                  onClick={() => setVersion("v1")}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    version === "v1"
                      ? "border-emerald-600 dark:border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xs ring-1 ring-emerald-500"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                        version === "v1" ? "border-emerald-600 bg-emerald-600" : "border-slate-400"
                      }`}>
                        {version === "v1" && <span className="w-1 h-1 bg-white rounded-full"></span>}
                      </span>
                      Paket V1 (Klasik)
                    </span>
                    <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-[10px] font-bold">
                      Bank Arsip
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-snug">
                    <strong>610 Soal Lengkap</strong> • 4 Opsi (A–D)
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-tight">
                    Bank soal komprehensif mencakup 13 domain secara luas.
                  </p>
                </div>
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
              <span>Mulai Sesi Ujian ({version.toUpperCase()})</span>
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
