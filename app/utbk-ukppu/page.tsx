"use client";

import React, { useState, useEffect, useMemo } from "react";
import { getQuestionsByVersion, getNextVersion, LATEST_VERSION } from "@/assets/utbk-ukppu";
import { Question, QuestionVersion, UserSession } from "@/types/utbk-ukppu";
import {
  getStoredSession,
  saveStoredSession,
  clearStoredSession,
  parseAndValidateImportedSession,
} from "@/lib/cbt-session";
import { NamePromptModal } from "@/components/utbk-ukppu/NamePromptModal";
import { DeleteConfirmModal } from "@/components/utbk-ukppu/DeleteConfirmModal";
import { ConfirmModal } from "@/components/utbk-ukppu/ConfirmModal";
import { HeaderToolbar } from "@/components/utbk-ukppu/HeaderToolbar";
import { CaseStudyPanel } from "@/components/utbk-ukppu/CaseStudyPanel";
import { QuestionPanel } from "@/components/utbk-ukppu/QuestionPanel";
import { QuestionGridDrawer } from "@/components/utbk-ukppu/QuestionGridDrawer";
import { ResultReview } from "@/components/utbk-ukppu/ResultReview";

export default function CBTUtbkUkppuPage() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Dynamic question set based on active session's questionVersion (default: latest from registry)
  const activeVersion: QuestionVersion = session?.questionVersion || LATEST_VERSION;
  const questions: Question[] = useMemo(() => getQuestionsByVersion(activeVersion), [activeVersion]);

  // Modals & Drawers state
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isGridDrawerOpen, setIsGridDrawerOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Custom Confirm Modal state
  const [confirmModalState, setConfirmModalState] = useState<{
    isOpen: boolean;
    type?: "submit" | "reset" | "alert";
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  // Load stored session and theme preference on initial mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);

    const savedTheme = localStorage.getItem("utbk_cbt_theme") as "light" | "dark" | null;
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }

    const existing = getStoredSession();
    if (existing) {
      const normalizedExisting: UserSession = {
        ...existing,
        questionVersion: existing.questionVersion || LATEST_VERSION,
      };
      setSession(normalizedExisting);
      saveStoredSession(normalizedExisting);
      const targetQuestions = getQuestionsByVersion(normalizedExisting.questionVersion);
      if (
        typeof normalizedExisting.currentQuestionIndex === "number" &&
        normalizedExisting.currentQuestionIndex < targetQuestions.length
      ) {
        setCurrentIndex(normalizedExisting.currentQuestionIndex);
      }
    } else {
      setIsNameModalOpen(true);
    }
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("utbk_cbt_theme", nextTheme);
  };

  const handleSelectQuestion = (idx: number) => {
    setCurrentIndex(idx);
    if (session) {
      const updatedSession: UserSession = {
        ...session,
        currentQuestionIndex: idx,
      };
      setSession(updatedSession);
      saveStoredSession(updatedSession);
    }
  };

  // Timer interval effect
  useEffect(() => {
    if (!session || session.isSubmitted) return;

    const timer = setInterval(() => {
      setSession((prev) => {
        if (!prev || prev.isSubmitted) return prev;
        const updated = {
          ...prev,
          timeElapsed: prev.timeElapsed + 1,
        };
        saveStoredSession(updated);
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [session?.userName, session?.isSubmitted]);

  // Start brand new session with selected question version
  const handleStartSession = (userName: string, version: string = LATEST_VERSION) => {
    const newSession: UserSession = {
      userName,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      selectedAnswers: {},
      flaggedQuestions: {},
      timeElapsed: 0,
      isSubmitted: false,
      currentQuestionIndex: 0,
      questionVersion: version,
    };
    saveStoredSession(newSession);
    setSession(newSession);
    setCurrentIndex(0);
    setIsNameModalOpen(false);
  };

  // Handle imported session
  const handleImportSession = (importedSession: UserSession) => {
    const normalized: UserSession = {
      ...importedSession,
      questionVersion: importedSession.questionVersion || LATEST_VERSION,
    };
    saveStoredSession(normalized);
    setSession(normalized);
    const targetQuestions = getQuestionsByVersion(normalized.questionVersion);
    if (
      typeof normalized.currentQuestionIndex === "number" &&
      normalized.currentQuestionIndex < targetQuestions.length
    ) {
      setCurrentIndex(normalized.currentQuestionIndex);
    } else {
      setCurrentIndex(0);
    }
    setIsNameModalOpen(false);
  };

  // Cycle to the next version in the registry (fully data-driven — no hardcoded version names)
  const handlePromptSwitchVersion = () => {
    if (!session) return;
    const nextMeta = getNextVersion(session.questionVersion || LATEST_VERSION);

    setConfirmModalState({
      isOpen: true,
      type: "reset",
      title: "Ganti Paket Soal Ujian?",
      message: `Anda akan beralih ke ${nextMeta.name}. Jawaban pada sesi saat ini akan diatur ulang untuk paket baru. Lanjutkan?`,
      confirmText: `Ya, Beralih ke ${nextMeta.label}`,
      cancelText: "Batal",
      onConfirm: () => {
        setConfirmModalState((prev) => ({ ...prev, isOpen: false }));
        handleStartSession(session.userName, nextMeta.id);
      },
    });
  };

  const showAlert = (message: string, title = "Informasi") => {
    setConfirmModalState({
      isOpen: true,
      type: "alert",
      title,
      message,

      confirmText: "Mengerti",
      onConfirm: () => setConfirmModalState((prev) => ({ ...prev, isOpen: false })),
    });
  };

  // Trigger file import from header button
  const handleHeaderImportTrigger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const imported = parseAndValidateImportedSession(content);
        handleImportSession(imported);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        showAlert(err.message || "Gagal mengimpor file sesi.", "Gagal Impor Sesi");
      }
    };
    reader.readAsText(file);
  };

  // Handle option selection
  const handleSelectOption = (optionId: string) => {
    if (!session || session.isSubmitted) return;
    const currentQ = questions[currentIndex];
    const updatedSession: UserSession = {
      ...session,
      currentQuestionIndex: currentIndex,
      selectedAnswers: {
        ...session.selectedAnswers,
        [currentQ.id]: optionId,
      },
    };
    setSession(updatedSession);
    saveStoredSession(updatedSession);
  };

  // Handle toggle flagged status
  const handleToggleFlag = () => {
    if (!session || session.isSubmitted) return;
    const currentQ = questions[currentIndex];
    const isCurrentlyFlagged = Boolean(session.flaggedQuestions[currentQ.id]);

    const updatedSession: UserSession = {
      ...session,
      currentQuestionIndex: currentIndex,
      flaggedQuestions: {
        ...session.flaggedQuestions,
        [currentQ.id]: !isCurrentlyFlagged,
      },
    };
    setSession(updatedSession);
    saveStoredSession(updatedSession);
  };


  // Delete session & reset to name prompt
  const handleConfirmDeleteSession = () => {
    clearStoredSession();
    setSession(null);
    setCurrentIndex(0);
    setIsNameModalOpen(true);
  };

  // Trigger Custom Submit Exam Dialog
  const triggerSubmitExamModal = () => {
    if (!session) return;
    setConfirmModalState({
      isOpen: true,
      type: "submit",
      title: "Kumpulkan Hasil Ujian?",
      message: "Anda akan mengakhiri sesi ujian dan mengumpulkan seluruh jawaban yang telah dipilih. Apakah Anda yakin?",
      confirmText: "Ya, Kumpulkan Ujian",
      cancelText: "Lanjutkan Ujian",
      onConfirm: executeSubmitExam,
    });
  };

  // Execute Submit Exam
  const executeSubmitExam = () => {
    setConfirmModalState((prev) => ({ ...prev, isOpen: false }));
    setSession((prev) => {
      if (!prev) return prev;
      let score = 0;
      questions.forEach((q) => {
        if (prev.selectedAnswers[q.id] === q.key) {
          score++;
        }
      });
      const submittedSession: UserSession = {
        ...prev,
        isSubmitted: true,
        score,
      };
      saveStoredSession(submittedSession);
      return submittedSession;
    });
    setIsGridDrawerOpen(false);
  };

  // Trigger Custom Reset Exam Dialog
  const triggerResetExamModal = () => {
    if (!session) return;
    setConfirmModalState({
      isOpen: true,
      type: "reset",
      title: "Ulangi Sesi Ujian?",
      message: "Apakah Anda yakin ingin mengulangi ujian ini? Seluruh jawaban dan catatan ragu-ragu Anda akan direset dari awal.",
      confirmText: "Ya, Ulangi Ujian",
      cancelText: "Batal",
      onConfirm: executeResetExam,
    });
  };

  // Execute Reset Exam
  const executeResetExam = () => {
    setConfirmModalState((prev) => ({ ...prev, isOpen: false }));
    setSession((prev) => {
      if (!prev) return prev;
      const resetSession: UserSession = {
        ...prev,
        selectedAnswers: {},
        flaggedQuestions: {},
        timeElapsed: 0,
        isSubmitted: false,
        score: undefined,
      };
      saveStoredSession(resetSession);
      return resetSession;
    });
    setCurrentIndex(0);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-mono text-xs">
        <div className="animate-pulse">Memuat Aplikasi CBT UTBK UKPPU...</div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const totalAnswered = session ? Object.keys(session.selectedAnswers).filter((k) => session.selectedAnswers[k]).length : 0;

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
        {/* Name Prompt Modal (If no active session) */}
        <NamePromptModal
          isOpen={isNameModalOpen || !session}
          onStartSession={handleStartSession}
          onImportSession={handleImportSession}
          onError={(msg) => showAlert(msg, "Gagal Impor Sesi")}
        />

        {/* Delete Confirmation Modal */}
        {session && (
          <DeleteConfirmModal
            isOpen={isDeleteModalOpen}
            registeredName={session.userName}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirmDelete={handleConfirmDeleteSession}
          />
        )}

        {/* Custom Confirmation / Alert Modal */}
        <ConfirmModal
          isOpen={confirmModalState.isOpen}
          type={confirmModalState.type}
          title={confirmModalState.title}
          message={confirmModalState.message}
          confirmText={confirmModalState.confirmText}
          cancelText={confirmModalState.cancelText}
          onConfirm={confirmModalState.onConfirm}
          onCancel={() => setConfirmModalState((prev) => ({ ...prev, isOpen: false }))}
        />

        {/* Main App Content */}
        {session && (
          <>
            {/* Top Navigation Toolbar */}
            <HeaderToolbar
              session={session}
              timeElapsed={session.timeElapsed}
              onOpenDeleteModal={() => setIsDeleteModalOpen(true)}
              onImportTrigger={handleHeaderImportTrigger}
              onToggleGridDrawer={() => setIsGridDrawerOpen(true)}
              totalAnswered={totalAnswered}
              totalQuestions={questions.length}
              theme={theme}
              onToggleTheme={handleToggleTheme}
              onSwitchVersion={handlePromptSwitchVersion}
            />


            {/* Question Grid Navigation Drawer */}
            {!session.isSubmitted && (
              <QuestionGridDrawer
                isOpen={isGridDrawerOpen}
                onClose={() => setIsGridDrawerOpen(false)}
                questions={questions}
                currentIndex={currentIndex}
                selectedAnswers={session.selectedAnswers}
                flaggedQuestions={session.flaggedQuestions}
                onSelectQuestion={(idx) => handleSelectQuestion(idx)}
                onSubmitExam={triggerSubmitExamModal}
              />
            )}

            {/* Conditional View: CBT Single Scroll View vs Exam Results Review */}
            {session.isSubmitted ? (
              <main className="flex-1">
                <ResultReview
                  session={session}
                  questions={questions}
                  onResetExam={triggerResetExamModal}
                />
              </main>
            ) : (
              <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
                {/* Top Section: HOTS Case Study Narrative */}
                <CaseStudyPanel
                  question={currentQ}
                  currentIndex={currentIndex}
                  totalQuestions={questions.length}
                />

                {/* Bottom Section: Question Prompt & Answer Options A-E */}
                <QuestionPanel
                  question={currentQ}
                  currentIndex={currentIndex}
                  totalQuestions={questions.length}
                  selectedAnswer={session.selectedAnswers[currentQ.id]}
                  isFlagged={Boolean(session.flaggedQuestions[currentQ.id])}
                  onSelectOption={handleSelectOption}
                  onToggleFlag={handleToggleFlag}
                  onPrev={() => handleSelectQuestion(Math.max(0, currentIndex - 1))}
                  onNext={() => handleSelectQuestion(Math.min(questions.length - 1, currentIndex + 1))}
                  onSubmitExam={triggerSubmitExamModal}
                />
              </main>
            )}

          </>
        )}
      </div>
    </div>
  );
}
