"use client";

import React, { useState, useEffect } from "react";
import { FiTrash2, FiAlertTriangle, FiX } from "react-icons/fi";

interface Props {
  isOpen: boolean;
  registeredName: string;
  onClose: () => void;
  onConfirmDelete: () => void;
}

export function DeleteConfirmModal({ isOpen, registeredName, onClose, onConfirmDelete }: Props) {
  const [confirmInput, setConfirmInput] = useState("");

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConfirmInput("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isMatched = confirmInput.trim() === registeredName.trim();

  const handleConfirm = () => {
    if (isMatched) {
      onConfirmDelete();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-red-200 dark:border-red-950 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-red-50 dark:bg-red-950/40 border-b border-red-100 dark:border-red-900/50">
          <div className="flex items-center gap-2.5 text-red-600 dark:text-red-400 font-bold text-base">
            <FiAlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>Konfirmasi Hapus Sesi Ujian</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Tindakan ini akan menghapus seluruh lembar jawaban, progres waktu, dan data sesi Anda dari LocalStorage browser. Data yang dihapus{" "}
            <strong className="text-red-600 dark:text-red-400 font-semibold">tidak dapat dipulihkan kembali</strong>.
          </p>

          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl text-xs text-amber-800 dark:text-amber-300">
            <span className="font-semibold block mb-1">Syarat Konfirmasi:</span>
            Ketik ulang nama peserta secara presisi:{" "}
            <span className="font-mono font-bold bg-amber-200/60 dark:bg-amber-900/60 px-2 py-0.5 rounded text-slate-900 dark:text-slate-100">
              {registeredName}
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
              Masukkan Nama Peserta
            </label>
            <input
              type="text"
              value={confirmInput}
              onChange={(e) => setConfirmInput(e.target.value)}
              placeholder={`Tulis "${registeredName}" untuk konfirmasi`}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
              autoFocus
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              disabled={!isMatched}
              onClick={handleConfirm}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md ${
                isMatched
                  ? "bg-red-600 hover:bg-red-700 text-white shadow-red-500/20 active:scale-95 cursor-pointer"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none"
              }`}
            >
              <FiTrash2 className="w-4 h-4" />
              Hapus Sesi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
