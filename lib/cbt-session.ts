import { UserSession } from "@/types/utbk-ukppu";

const LOCAL_STORAGE_KEY = "utbk_ukppu_cbt_session_v1";

export function getStoredSession(): UserSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data && typeof data.userName === "string" && data.selectedAnswers) {
      return data as UserSession;
    }
    return null;
  } catch (err) {
    console.error("Failed to load CBT session from localStorage:", err);
    return null;
  }
}

export function saveStoredSession(session: UserSession): void {
  if (typeof window === "undefined") return;
  try {
    const updated = {
      ...session,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to save CBT session to localStorage:", err);
  }
}

export function clearStoredSession(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (err) {
    console.error("Failed to clear CBT session from localStorage:", err);
  }
}

export function exportSessionToJSON(session: UserSession): void {
  if (typeof window === "undefined") return;
  const jsonStr = JSON.stringify(session, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const sanitizedName = session.userName.toLowerCase().replace(/[^a-z0-9]/g, "_");
  const filename = `cbt_session_${sanitizedName}_${Date.now()}.json`;
  
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function parseAndValidateImportedSession(jsonString: string): UserSession {
  const parsed = JSON.parse(jsonString);
  if (!parsed || typeof parsed !== "object") {
    throw new Error("Format JSON tidak valid.");
  }
  if (!parsed.userName || typeof parsed.userName !== "string" || parsed.userName.trim() === "") {
    throw new Error("File sesi tidak memiliki nama pengguna (userName) yang valid.");
  }
  if (typeof parsed.selectedAnswers !== "object" || parsed.selectedAnswers === null) {
    throw new Error("File sesi tidak memiliki data jawaban (selectedAnswers) yang valid.");
  }
  
  const session: UserSession = {
    userName: parsed.userName.trim(),
    createdAt: parsed.createdAt || new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    selectedAnswers: parsed.selectedAnswers || {},
    flaggedQuestions: parsed.flaggedQuestions || {},
    timeElapsed: typeof parsed.timeElapsed === "number" ? parsed.timeElapsed : 0,
    isSubmitted: Boolean(parsed.isSubmitted),
    score: typeof parsed.score === "number" ? parsed.score : undefined,
    currentQuestionIndex: typeof parsed.currentQuestionIndex === "number" ? parsed.currentQuestionIndex : undefined,
  };
  
  return session;
}

