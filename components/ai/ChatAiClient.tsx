/* eslint-disable react-hooks/purity, react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useI18n } from "@/context/i18n-context";
import { Button } from "@/components/ui/Button";
import { ChatBubbleContent } from "@/components/ai/ChatBubbleContent";
import {
  FiPlus,
  FiTrash2,
  FiSend,
  FiCpu,
  FiMessageSquare,
  FiAlertCircle,
  FiMenu,
  FiX,
  FiTerminal,
  FiInfo,
  FiMic,
  FiSquare,
} from "react-icons/fi";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface ChatSession {
  id: string;
  title: string;
  model: string;
  messages: Message[];
  updatedAt: number;
}

interface SpeechRecognitionResultItem {
  transcript: string;
}

interface SpeechRecognitionResultType {
  [index: number]: SpeechRecognitionResultItem;
}

interface SpeechRecognitionEventType {
  results: ArrayLike<SpeechRecognitionResultType>;
}

interface SpeechRecognitionInstance {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: (event: SpeechRecognitionEventType) => void;
  onerror: () => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

const LOCAL_STORAGE_KEY = "patriaworks_ai_chat_sessions_v2";

export const ChatAiClient: React.FC = () => {
  const { t, locale } = useI18n();

  const [loadingStatus, setLoadingStatus] = useState(true);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [models, setModels] = useState<string[]>([]);
  const [defaultModel, setDefaultModel] = useState<string>("lfm3:1.7b");
  const [maxSessionsLimit, setMaxSessionsLimit] = useState<number>(10);
  const [maxSessionSizeLimit, setMaxSessionSizeLimit] = useState<number>(50);
  const [thinkEnabled, setThinkEnabled] = useState<boolean>(false);

  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [activeSessionId, setActiveSessionId] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed[0].id;
        }
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [inputMessage, setInputMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState<string>("lfm3:1.7b");
  const [isStreaming, setIsStreaming] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  // Fetch status & models
  const fetchStatus = useCallback(async () => {
    setLoadingStatus(true);
    try {
      const res = await fetch("/api/chat-ai/status");
      const data = await res.json();
      setAvailable(Boolean(data.available));
      if (data.available) {
        setModels(data.models || []);
        const defModel = data.defaultModel || data.models?.[0] || "lfm3:1.7b";
        setDefaultModel(defModel);
        setSelectedModel((prev) => prev || defModel);
        setMaxSessionsLimit(data.maxSessions || 10);
        setMaxSessionSizeLimit(data.maxSessionSize || 50);
        setThinkEnabled(Boolean(data.think));
        setErrorMsg(null);
      } else {
        setAvailable(false);
        setErrorMsg(data.error || "Ollama service offline");
        setModels(data.models || ["lfm3:1.7b"]);
      }
    } catch (err: unknown) {
      setAvailable(false);
      setErrorMsg(err instanceof Error ? err.message : "Failed to connect to backend");
    } finally {
      setLoadingStatus(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Ensure default session if empty after load
  useEffect(() => {
    setSessions((prevSessions) => {
      if (prevSessions.length > 0) return prevSessions;
      const initialTitle = locale === "id" ? "Chat Pertama" : "First Chat";
      const modelToUse = defaultModel || "lfm3:1.7b";
      const newSession: ChatSession = {
        id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        title: initialTitle,
        model: modelToUse,
        messages: [],
        updatedAt: Date.now(),
      };
      setActiveSessionId(newSession.id);
      const updated = [newSession];
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, [defaultModel, locale]);

  // Save sessions to localStorage
  const saveSessionsToStorage = useCallback((updated: ChatSession[]) => {
    setSessions(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // quota exceeded or restricted
    }
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, isStreaming]);

  const activeSession = sessions.find((s) => s.id === activeSessionId) || null;

  // Speech-to-Text handler (Microphone)
  const toggleListening = () => {
    if (available === false) return;
    const win = window as Window & {
      SpeechRecognition?: new () => SpeechRecognitionInstance;
      webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
    };
    const SpeechRecognitionAPI = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      alert(
        locale === "id"
          ? "Speech recognition tidak didukung di browser ini."
          : "Speech recognition is not supported in this browser."
      );
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognitionAPI();
      recognition.lang = locale === "id" ? "id-ID" : "en-US";
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onresult = (event: SpeechRecognitionEventType) => {
        const transcript = Array.from({ length: event.results.length })
          .map((_, i) => event.results[i]?.[0]?.transcript || "")
          .join("");
        setInputMessage(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
      setIsListening(true);
    } catch {
      setIsListening(false);
    }
  };

  // Create new session
  const handleNewChat = () => {
    if (sessions.length >= maxSessionsLimit) {
      alert(t.chatAi.maxSessionsReached);
      return;
    }
    const newTitle = locale === "id" ? "Chat Baru" : "New Chat";
    const newSession: ChatSession = {
      id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: newTitle,
      model: selectedModel || defaultModel,
      messages: [],
      updatedAt: Date.now(),
    };
    const updated = [newSession, ...sessions];
    saveSessionsToStorage(updated);
    setActiveSessionId(newSession.id);
    setSidebarOpen(false);
  };

  // Delete session
  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = sessions.filter((s) => s.id !== id);
    saveSessionsToStorage(updated);
    if (activeSessionId === id) {
      if (updated.length > 0) {
        setActiveSessionId(updated[0].id);
      } else {
        const initialTitle = locale === "id" ? "Chat Pertama" : "First Chat";
        const newSession: ChatSession = {
          id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          title: initialTitle,
          model: defaultModel || "lfm3:1.7b",
          messages: [],
          updatedAt: Date.now(),
        };
        setSessions([newSession]);
        setActiveSessionId(newSession.id);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([newSession]));
        } catch {
          // ignore
        }
      }
    }
  };

  // Clear all sessions
  const handleClearAll = () => {
    const initialTitle = locale === "id" ? "Chat Pertama" : "First Chat";
    const newSession: ChatSession = {
      id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: initialTitle,
      model: defaultModel || "lfm3:1.7b",
      messages: [],
      updatedAt: Date.now(),
    };
    saveSessionsToStorage([newSession]);
    setActiveSessionId(newSession.id);
  };

  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isStreaming || available === false) return;

    let targetSession = activeSession;
    if (!targetSession) {
      if (sessions.length >= maxSessionsLimit) {
        alert(t.chatAi.maxSessionsReached);
        return;
      }
      const newSession: ChatSession = {
        id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        title: inputMessage.slice(0, 35) + (inputMessage.length > 35 ? "..." : ""),
        model: selectedModel || defaultModel || "lfm3:1.7b",
        messages: [],
        updatedAt: Date.now(),
      };
      const updated = [newSession, ...sessions];
      saveSessionsToStorage(updated);
      setActiveSessionId(newSession.id);
      targetSession = newSession;
    } else {
      if (targetSession.messages.length >= maxSessionSizeLimit) {
        alert(t.chatAi.maxSessionSizeReached);
        return;
      }
    }

    await executeSendMessage(
      targetSession.id,
      inputMessage,
      selectedModel || targetSession.model || defaultModel || "lfm3:1.7b",
      targetSession.messages
    );
  };

  const executeSendMessage = async (
    sessionId: string,
    text: string,
    modelToUse: string,
    existingMessages: Message[]
  ) => {
    const userMsg: Message = {
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    const assistantMsg: Message = {
      role: "assistant",
      content: "",
      timestamp: Date.now() + 1,
    };

    const nextMessages = [...existingMessages, userMsg];

    const updatedWithUser = sessions.map((s) =>
      s.id === sessionId
        ? {
            ...s,
            model: modelToUse,
            messages: [...nextMessages, assistantMsg],
            updatedAt: Date.now(),
          }
        : s
    );

    saveSessionsToStorage(updatedWithUser);
    setInputMessage("");
    setIsStreaming(true);

    try {
      const apiMessages = nextMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat-ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: modelToUse,
          messages: apiMessages,
          options: {
            think: thinkEnabled,
          },
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to generate response");
      }

      if (!res.body) {
        throw new Error("No response stream");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          try {
            const parsed = JSON.parse(trimmed);
            if (parsed.message?.content) {
              const chunkContent = parsed.message.content as string;

              setSessions((prevSessions) =>
                prevSessions.map((s) => {
                  if (s.id !== sessionId) return s;
                  const msgs = [...s.messages];
                  const lastIdx = msgs.length - 1;
                  if (lastIdx >= 0 && msgs[lastIdx].role === "assistant") {
                    msgs[lastIdx] = {
                      ...msgs[lastIdx],
                      content: msgs[lastIdx].content + chunkContent,
                    };
                  }
                  let newTitle = s.title;
                  if (s.messages.length <= 2 && text.trim().length > 0) {
                    newTitle = text.slice(0, 32) + (text.length > 32 ? "..." : "");
                  }
                  return { ...s, title: newTitle, messages: msgs, updatedAt: Date.now() };
                })
              );
            }
          } catch {
            // non-json or incomplete chunk
          }
        }
      }

      setSessions((latest) => {
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(latest));
        } catch {
          // ignore
        }
        return latest;
      });
    } catch (err: unknown) {
      const errText = err instanceof Error ? err.message : "Error during generation";
      setSessions((prevSessions) =>
        prevSessions.map((s) => {
          if (s.id !== sessionId) return s;
          const msgs = [...s.messages];
          const lastIdx = msgs.length - 1;
          if (lastIdx >= 0 && msgs[lastIdx].role === "assistant") {
            msgs[lastIdx] = {
              ...msgs[lastIdx],
              content: `⚠️ Error: ${errText}`,
            };
          }
          return { ...s, messages: msgs };
        })
      );
    } finally {
      setIsStreaming(false);
    }
  };

  if (loadingStatus) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[var(--surface)]">
        <div className="flex flex-col items-center gap-4 p-8 border-2 border-[var(--navy)] bg-[var(--surface-light)] retro-shadow">
          <div className="w-8 h-8 border-4 border-[var(--navy)] border-t-[var(--gold)] rounded-full animate-spin" />
          <p className="font-mono text-sm text-[var(--navy)] font-bold">
            {locale === "id" ? "Memeriksa status layanan Ollama AI..." : "Checking Ollama AI service status..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100dvh-60px)] md:h-[calc(100dvh-88px)] max-h-[calc(100dvh-60px)] md:max-h-[calc(100dvh-88px)] flex flex-col lg:flex-row bg-[var(--surface)] text-[var(--navy)] overflow-hidden">
      {/* Mobile Sidebar Toggle Header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[var(--surface-light)] border-b-2 border-[var(--navy)]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[var(--navy)] text-[var(--gold)] border border-[var(--navy)] flex items-center justify-center font-mono font-bold text-xs">
            <FiTerminal />
          </div>
          <span className="font-display font-black text-sm tracking-tight">{t.chatAi.title}</span>
        </div>
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 border-2 border-[var(--navy)] bg-[var(--surface)] text-[var(--navy)] retro-shadow-sm"
          aria-label="Toggle sessions sidebar"
        >
          {sidebarOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar: Chat Sessions & Settings */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-80 bg-[var(--surface-light)] border-r-2 border-[var(--navy)] flex flex-col transition-transform duration-200 shadow-xl lg:shadow-none`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b-2 border-[var(--navy)] flex items-center justify-between bg-[var(--navy)] text-[var(--surface)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[var(--gold)] text-[var(--navy)] border border-[var(--surface)] flex items-center justify-center font-mono font-black">
              <FiCpu className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-black text-sm tracking-tight">{t.chatAi.title}</h2>
              <span className="font-mono text-[10px] text-[var(--gold)] flex items-center gap-1">
                <span
                  className={`w-2 h-2 rounded-full inline-block ${
                    available ? "bg-emerald-400 animate-pulse" : "bg-amber-500"
                  }`}
                />
                {available ? t.chatAi.connected : (locale === "id" ? "Offline" : "Offline")}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white p-1 hover:bg-white/10"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* New Chat Button & Limits Info */}
        <div className="p-4 border-b-2 border-[var(--navy)] space-y-3">
          <Button
            variant="gold"
            fullWidth
            size="md"
            onClick={handleNewChat}
            disabled={sessions.length >= maxSessionsLimit || isStreaming}
            leftIcon={<FiPlus className="w-4 h-4" />}
          >
            {t.chatAi.newChat} ({sessions.length}/{maxSessionsLimit})
          </Button>

          {sessions.length >= maxSessionsLimit && (
            <p className="text-[11px] font-mono text-amber-700 bg-amber-50 p-2 border border-amber-300 rounded">
              {t.chatAi.maxSessionsReached}
            </p>
          )}

          {/* Model selector */}
          <div className="space-y-1">
            <label className="block text-xs font-mono font-bold text-[var(--navy)]">
              {t.chatAi.modelSelector}:
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono border-2 border-[var(--navy)] bg-[var(--surface)] text-[var(--navy)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)]"
            >
              {models.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <div className="flex items-center justify-between px-2 pb-1">
            <span className="text-xs font-mono font-bold text-[var(--navy)] uppercase tracking-wider">
              {t.chatAi.chatSessions} ({sessions.length})
            </span>
            {sessions.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="text-[11px] font-mono text-red-600 hover:underline cursor-pointer"
              >
                {t.chatAi.clearAll}
              </button>
            )}
          </div>

          {sessions.map((s) => {
            const isActive = s.id === activeSessionId;
            return (
              <div
                key={s.id}
                onClick={() => {
                  setActiveSessionId(s.id);
                  setSelectedModel(s.model || defaultModel);
                  setSidebarOpen(false);
                }}
                className={`group relative flex items-center justify-between p-3 border-2 cursor-pointer transition-all ${
                  isActive
                    ? "bg-[var(--navy)] text-[var(--surface)] border-[var(--navy)] retro-shadow-sm font-bold"
                    : "bg-[var(--surface)] text-[var(--navy)] border-[var(--navy)] hover:bg-[var(--surface-dark)]"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-6">
                  <FiMessageSquare className={`w-4 h-4 shrink-0 ${isActive ? "text-[var(--gold)]" : "text-[var(--navy)]"}`} />
                  <div className="truncate text-xs font-mono">
                    <p className="truncate">{s.title}</p>
                    <span className={`text-[10px] ${isActive ? "text-white/70" : "text-[var(--navy)]/60"}`}>
                      {s.model} • {s.messages.length} msgs
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => handleDeleteSession(s.id, e)}
                  className={`absolute right-2.5 p-1 rounded hover:bg-red-500 hover:text-white transition-colors cursor-pointer ${
                    isActive ? "text-white/80" : "text-[var(--navy)]/60"
                  }`}
                  title={t.chatAi.deleteChat}
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Sidebar Footer info */}
        <div className="p-3 border-t-2 border-[var(--navy)] bg-[var(--surface)] font-mono text-[11px] text-[var(--navy)]/70 flex items-center justify-between">
          <span>Ollama Base: {process.env.NEXT_PUBLIC_SITE_URL ? "Active" : "Local"}</span>
          <span className="font-bold text-[var(--green)]">v1.2</span>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full min-h-0 bg-[var(--surface)] overflow-hidden">
        {/* Chat Top Bar */}
        <div className="hidden lg:flex items-center justify-between px-6 py-3.5 bg-[var(--surface-light)] border-b-2 border-[var(--navy)]">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="font-display font-black text-base text-[var(--navy)]">
                {activeSession ? activeSession.title : t.chatAi.title}
              </h1>
              <span className="font-mono text-xs text-[var(--navy)]/70">
                {activeSession ? `${activeSession.model} • ${activeSession.messages.length} / ${maxSessionSizeLimit} messages` : t.chatAi.subtitle}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-[var(--navy)] text-[var(--gold)] font-mono text-xs font-bold border border-[var(--navy)]">
              Model: {selectedModel || defaultModel}
            </span>
          </div>
        </div>

        {/* Offline Warning Banner if unavailable */}
        {available === false && (
          <div className="bg-amber-100 border-b-2 border-amber-400 px-4 py-2 font-mono text-xs text-amber-900 flex items-center justify-between shrink-0">
            <span className="flex items-center gap-2">
              <FiAlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
              <span>
                {locale === "id"
                  ? "Layanan Ollama AI sedang offline. Anda dapat melihat riwayat chat, tetapi pesan baru tidak dapat dikirim saat ini."
                  : "Ollama AI service is offline. You can view chat history, but new messages cannot be sent at this time."}
                {errorMsg && <strong className="ml-1">({errorMsg})</strong>}
              </span>
            </span>
            <button
              type="button"
              onClick={fetchStatus}
              className="underline font-bold hover:text-black cursor-pointer ml-2"
            >
              {locale === "id" ? "Coba Lagi" : "Retry"}
            </button>
          </div>
        )}

        {/* Messages Container with clean background */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 bg-white/40">
          {!activeSession || activeSession.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4 py-12">
              <div className="w-16 h-16 bg-[var(--navy)] text-[var(--gold)] border-2 border-[var(--navy)] flex items-center justify-center text-2xl retro-shadow">
                <FiCpu />
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-[var(--navy)]">
                {t.chatAi.title}
              </h2>
              <p className="font-mono text-xs sm:text-sm text-[var(--navy)]/80">
                {t.chatAi.emptyState}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full pt-4">
                {[
                  locale === "id" ? "Jelaskan arsitektur backend sistem ini" : "Explain this system's backend architecture",
                  locale === "id" ? "Bagaimana cara kerja integrasi Ollama AI?" : "How does the Ollama AI integration work?",
                  locale === "id" ? "Tulis ringkasan portofolio teknik Wahyu" : "Write a summary of Wahyu's engineering portfolio",
                  locale === "id" ? "Saran optimasi performa aplikasi web Next.js" : "Tips for Next.js web performance optimization",
                ].map((promptText, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setInputMessage(promptText);
                    }}
                    className="p-3 text-left font-mono text-xs border-2 border-[var(--navy)] bg-[var(--surface-light)] hover:bg-[var(--surface-dark)] transition-colors retro-shadow-sm cursor-pointer"
                  >
                    💬 {promptText}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6 w-full">
              {activeSession.messages.map((msg, index) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={index}
                    className={`flex flex-col w-full ${isUser ? "items-end" : "items-start"}`}
                  >
                    {isUser ? (
                      <div className="max-w-[85%] sm:max-w-[75%] p-4 border-2 border-[var(--navy)] bg-[var(--navy)] text-[var(--surface)] retro-shadow-sm font-mono text-xs sm:text-sm whitespace-pre-wrap">
                        <ChatBubbleContent
                          content={msg.content}
                          isUser={isUser}
                          timestamp={msg.timestamp}
                          locale={locale}
                        />
                      </div>
                    ) : (
                      <div className="w-full max-w-none text-[var(--navy)] font-mono text-xs sm:text-sm leading-relaxed py-3 px-4 bg-transparent border-0">
                        <ChatBubbleContent
                          content={msg.content}
                          isUser={isUser}
                          timestamp={msg.timestamp}
                          locale={locale}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Session Size Warning Banner */}
        {activeSession && activeSession.messages.length >= maxSessionSizeLimit && (
          <div className="px-4 py-2.5 bg-amber-100 border-t-2 border-amber-400 text-amber-900 font-mono text-xs flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FiInfo className="w-4 h-4 shrink-0" />
              {t.chatAi.maxSessionSizeReached}
            </span>
            <Button size="sm" variant="gold" onClick={handleNewChat}>
              {t.chatAi.newChat}
            </Button>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-[var(--surface-light)] border-t-2 border-[var(--navy)]">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-center gap-2">
            <textarea
              rows={1}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder={
                available === false
                  ? (locale === "id" ? "Layanan AI sedang offline..." : "AI service is offline...")
                  : t.chatAi.typePlaceholder
              }
              disabled={
                isStreaming ||
                available === false ||
                (activeSession ? activeSession.messages.length >= maxSessionSizeLimit : false)
              }
              className="flex-1 px-4 py-3 border-2 border-[var(--navy)] bg-[var(--surface)] text-[var(--navy)] font-mono text-xs sm:text-sm resize-none focus:outline-none focus:ring-1 focus:ring-[var(--gold)] disabled:opacity-50"
            />
            <button
              type="button"
              onClick={toggleListening}
              disabled={available === false || isStreaming}
              className={`p-3 border-2 border-[var(--navy)] flex items-center justify-center retro-shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                isListening
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-[var(--surface)] text-[var(--navy)] hover:bg-[var(--surface-dark)]"
              }`}
              title={isListening ? "Stop speech-to-text recording" : "Speech to text (Microphone)"}
            >
              {isListening ? <FiSquare className="w-4 h-4" /> : <FiMic className="w-4 h-4" />}
            </button>
            <Button
              type="submit"
              variant="gold"
              size="md"
              disabled={
                !inputMessage.trim() ||
                isStreaming ||
                available === false ||
                (activeSession ? activeSession.messages.length >= maxSessionSizeLimit : false)
              }
              leftIcon={<FiSend className="w-4 h-4" />}
            >
              {isStreaming ? t.chatAi.thinking : t.chatAi.send}
            </Button>
          </form>
          <div className="max-w-4xl mx-auto pt-2 flex items-center justify-between text-[11px] font-mono text-[var(--navy)]/60">
            <span>Model: {selectedModel || defaultModel}</span>
            <span>Max session size: {maxSessionSizeLimit} messages</span>
          </div>
        </div>
      </main>
    </div>
  );
};
