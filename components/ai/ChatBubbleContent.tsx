import React, { useState } from "react";
import { FiCheck, FiCopy, FiVolume2, FiSquare } from "react-icons/fi";

interface ChatBubbleContentProps {
  content: string;
  isUser: boolean;
  timestamp: number;
  locale?: string;
}

export const ChatBubbleContent: React.FC<ChatBubbleContentProps> = ({
  content,
  isUser,
  timestamp,
  locale = "en",
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const formatTime = (ts: number) => {
    const date = new Date(ts);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    if (isToday) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return `${date.toLocaleDateString([], { month: "short", day: "numeric" })}, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(codeText);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSpeak = () => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(content);
    
    const targetLang = locale === "id" ? "id" : "en";
    utterance.lang = locale === "id" ? "id-ID" : "en-US";

    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find((v) => v.lang.toLowerCase().startsWith(targetLang));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  if (isUser) {
    return (
      <div className="space-y-1">
        <div className="whitespace-pre-wrap">{content}</div>
        <div className="text-[10px] text-white/70 text-right font-mono">
          {formatTime(timestamp)}
        </div>
      </div>
    );
  }

  if (!content || content.trim() === "") {
    return (
      <div className="flex items-center gap-1.5 py-1 text-[var(--navy)]/70 font-mono text-xs">
        <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-bounce" style={{ animationDelay: "300ms" }} />
        <span className="ml-1">Thinking...</span>
      </div>
    );
  }

  const parseInlineFormatting = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let keyCounter = 0;

    while (remaining.length > 0) {
      const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch && linkMatch.index !== undefined) {
        if (linkMatch.index > 0) {
          parts.push(parseBoldItalic(remaining.slice(0, linkMatch.index), keyCounter++));
        }
        parts.push(
          <a
            key={keyCounter++}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--navy)] font-bold underline hover:text-[var(--gold)]"
          >
            {linkMatch[1]}
          </a>
        );
        remaining = remaining.slice(linkMatch.index + linkMatch[0].length);
        continue;
      }

      parts.push(parseBoldItalic(remaining, keyCounter++));
      break;
    }

    return parts;
  };

  const parseBoldItalic = (text: string, baseKey: number) => {
    const boldParts = text.split(/\*\*(.*?)\*\*/g);
    return boldParts.map((part, i) => {
      if (i % 2 === 1) {
        return (
          <strong key={`${baseKey}_bold_${i}`} className="font-bold text-[var(--navy)]">
            {part}
          </strong>
        );
      }
      const italicParts = part.split(/\*(.*?)\*/g);
      return italicParts.map((subPart, j) => {
        if (j % 2 === 1) {
          return (
            <em key={`${baseKey}_italic_${i}_${j}`} className="italic">
              {subPart}
            </em>
          );
        }
        return subPart;
      });
    });
  };

  const renderTable = (rows: string[], keyPrefix: string) => {
    if (rows.length < 2) {
      return (
        <div key={`table_${keyPrefix}`} className="my-2 p-2 font-mono text-xs bg-white border border-[var(--navy)]">
          {rows.map((r, i) => (
            <div key={i}>{r}</div>
          ))}
        </div>
      );
    }

    const headerRow = rows[0];
    const bodyRows = rows.slice(2).filter((r) => !r.includes("---"));

    const parseCells = (rowStr: string) =>
      rowStr
        .split("|")
        .map((cell) => cell.trim())
        .filter((_, i, arr) => i > 0 && i < arr.length - 1);

    const headers = parseCells(headerRow);
    const parsedBody = bodyRows.map(parseCells);

    return (
      <div key={`table_${keyPrefix}`} className="my-3 overflow-x-auto border-2 border-[var(--navy)] retro-shadow-sm">
        <table className="w-full border-collapse font-mono text-xs bg-[var(--surface)]">
          <thead>
            <tr className="bg-[var(--navy)] text-[var(--surface)]">
              {headers.map((h, i) => (
                <th key={i} className="border border-[var(--navy)] px-3 py-2 text-left font-bold">
                  {parseInlineFormatting(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parsedBody.map((rowCells, rIdx) => (
              <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-[var(--surface-light)]" : "bg-[var(--surface)]"}>
                {rowCells.map((cell, cIdx) => (
                  <td key={cIdx} className="border border-[var(--navy)]/30 px-3 py-2 text-[var(--navy)]">
                    {parseInlineFormatting(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderFormattedText = (text: string) => {
    const codeBlockRegex = /```([a-zA-Z]*)\n([\s\S]*?)```/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <div key={`text_${lastIndex}`} className="space-y-2">
            {renderMarkdownParagraphs(text.slice(lastIndex, match.index))}
          </div>
        );
      }

      const lang = match[1] || "code";
      const codeContent = match[2];

      parts.push(
        <div key={`code_${match.index}`} className="my-3 border-2 border-[var(--navy)] bg-[#0f172a] text-emerald-400 font-mono text-xs rounded overflow-hidden retro-shadow-sm">
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#1e293b] border-b border-white/10 text-white/70 text-[10px]">
            <span className="uppercase tracking-wider font-bold">{lang}</span>
            <button
              onClick={() => handleCopyCode(codeContent)}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              {copiedCode === codeContent ? <FiCheck className="w-3.5 h-3.5 text-emerald-400" /> : <FiCopy className="w-3.5 h-3.5" />}
              <span>{copiedCode === codeContent ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <pre className="p-3 overflow-x-auto leading-relaxed">
            <code>{codeContent}</code>
          </pre>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(
        <div key={`text_${lastIndex}`} className="space-y-2">
          {renderMarkdownParagraphs(text.slice(lastIndex))}
        </div>
      );
    }

    return parts;
  };

  const renderMarkdownParagraphs = (chunk: string) => {
    const lines = chunk.split("\n");
    const elements: React.ReactNode[] = [];
    let listBuffer: string[] = [];
    let tableBuffer: string[] = [];

    const flushList = (keyPrefix: string) => {
      if (listBuffer.length > 0) {
        elements.push(
          <ul key={`list_${keyPrefix}`} className="list-disc list-inside space-y-1 my-2 pl-2">
            {listBuffer.map((item, i) => (
              <li key={i}>{parseInlineFormatting(item)}</li>
            ))}
          </ul>
        );
        listBuffer = [];
      }
    };

    const flushTable = (keyPrefix: string) => {
      if (tableBuffer.length > 0) {
        elements.push(renderTable(tableBuffer, keyPrefix));
        tableBuffer = [];
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
        flushList(idx.toString());
        tableBuffer.push(trimmed);
        return;
      }

      flushTable(idx.toString());

      if (trimmed.startsWith("### ")) {
        flushList(idx.toString());
        elements.push(
          <h3 key={idx} className="font-display font-bold text-base sm:text-lg text-[var(--navy)] mt-3 mb-1">
            {parseInlineFormatting(trimmed.replace("### ", ""))}
          </h3>
        );
        return;
      }
      if (trimmed.startsWith("## ")) {
        flushList(idx.toString());
        elements.push(
          <h2 key={idx} className="font-display font-bold text-lg sm:text-xl text-[var(--navy)] mt-4 mb-2">
            {parseInlineFormatting(trimmed.replace("## ", ""))}
          </h2>
        );
        return;
      }
      if (trimmed.startsWith("# ")) {
        flushList(idx.toString());
        elements.push(
          <h1 key={idx} className="font-display font-black text-xl sm:text-2xl text-[var(--navy)] mt-4 mb-2">
            {parseInlineFormatting(trimmed.replace("# ", ""))}
          </h1>
        );
        return;
      }

      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        listBuffer.push(trimmed.slice(2));
        return;
      }

      flushList(idx.toString());

      if (trimmed === "") {
        elements.push(<div key={idx} className="h-2" />);
        return;
      }

      elements.push(
        <p key={idx} className="leading-relaxed">
          {parseInlineFormatting(line)}
        </p>
      );
    });

    flushList("end");
    flushTable("end");
    return elements;
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">{renderFormattedText(content)}</div>

      {/* Assistant Bubble Footer Actions & Timestamp */}
      <div className="flex items-center justify-between pt-2 mt-2 border-t border-[var(--navy)]/10 text-[10px] font-mono text-[var(--navy)]/70">
        <span>{formatTime(timestamp)}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyText}
            className="flex items-center gap-1 hover:text-[var(--navy)] font-bold transition-colors cursor-pointer bg-white/60 px-2 py-1 rounded border border-[var(--navy)]/20"
            title="Copy response"
          >
            {copied ? <FiCheck className="w-3 h-3 text-emerald-600" /> : <FiCopy className="w-3 h-3" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
          <button
            type="button"
            onClick={handleSpeak}
            className={`flex items-center gap-1 font-bold transition-colors cursor-pointer px-2 py-1 rounded border ${
              isSpeaking
                ? "bg-amber-200 text-amber-900 border-amber-400 animate-pulse"
                : "bg-white/60 hover:text-[var(--navy)] border-[var(--navy)]/20"
            }`}
            title="Listen / Stop speech"
          >
            {isSpeaking ? <FiSquare className="w-3 h-3" /> : <FiVolume2 className="w-3 h-3" />}
            <span>{isSpeaking ? "Stop" : "Listen"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
