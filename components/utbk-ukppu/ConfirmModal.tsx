"use client";

import React from "react";
import { FiAlertCircle, FiCheckCircle, FiRotateCcw, FiX, FiInfo } from "react-icons/fi";

export interface ConfirmModalProps {
  isOpen: boolean;
  type?: "submit" | "reset" | "alert";
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  type = "submit",
  title,
  message,
  confirmText,
  cancelText = "Batal",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "submit":
        return <FiCheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case "reset":
        return <FiRotateCcw className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case "alert":
        return <FiAlertCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />;
      default:
        return <FiInfo className="w-6 h-6 text-slate-700 dark:text-slate-300" />;
    }
  };

  const getHeaderBg = () => {
    switch (type) {
      case "submit":
        return "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/50";
      case "reset":
        return "bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900/50";
      case "alert":
        return "bg-rose-50 dark:bg-rose-950/40 border-rose-100 dark:border-rose-900/50";
      default:
        return "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700";
    }
  };

  const getConfirmBtnStyle = () => {
    switch (type) {
      case "submit":
        return "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20";
      case "reset":
        return "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20";
      case "alert":
        return "bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900";
      default:
        return "bg-slate-900 hover:bg-slate-800 text-white";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all">
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${getHeaderBg()}`}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-xs border border-slate-200/60 dark:border-slate-800">
              {getIcon()}
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {title}
            </h3>
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Message Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {message}
          </p>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {type !== "alert" && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-colors"
              >
                {cancelText}
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                onConfirm();
              }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 ${getConfirmBtnStyle()}`}
            >
              {confirmText || (type === "alert" ? "Mengerti" : "Konfirmasi")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
