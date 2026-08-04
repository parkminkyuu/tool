"use client";

import { useState } from "react";
import type { Locale } from "@/lib/locales";

const strings = {
  ko: {
    placeholder: "여러 줄의 텍스트를 입력하세요...",
    removeDuplicates: "중복 줄 제거",
    removeBlank: "빈 줄 제거",
    trim: "앞뒤 공백 제거",
    sort: "가나다순 정렬",
    copy: "복사",
    copied: "복사됨!",
    clear: "지우기",
    output: "결과",
    lineCount: "줄 수",
  },
  en: {
    placeholder: "Enter multiple lines of text...",
    removeDuplicates: "Remove duplicate lines",
    removeBlank: "Remove blank lines",
    trim: "Trim whitespace",
    sort: "Sort alphabetically",
    copy: "Copy",
    copied: "Copied!",
    clear: "Clear",
    output: "Result",
    lineCount: "Lines",
  },
} as const;

export default function LineDedupe({ locale }: { locale: Locale }) {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const t = strings[locale];

  const apply = (
    fn: (lines: string[]) => string[]
  ) => {
    setText((prev) => fn(prev.split("\n")).join("\n"));
  };

  const removeDuplicates = () =>
    apply((lines) => Array.from(new Set(lines)));
  const removeBlank = () => apply((lines) => lines.filter((l) => l.trim() !== ""));
  const trimLines = () => apply((lines) => lines.map((l) => l.trim()));
  const sortLines = () =>
    apply((lines) => [...lines].sort((a, b) => a.localeCompare(b)));

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const lineCount = text === "" ? 0 : text.split("\n").length;

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.placeholder}
        rows={10}
        className="w-full rounded-md border border-slate-300 p-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-slate-400 resize-y"
      />
      <div className="mt-2 text-xs text-slate-500">
        {t.lineCount}: {lineCount}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={removeDuplicates}
          className="rounded-md bg-slate-900 text-white text-sm px-3 py-1.5 hover:bg-slate-700"
        >
          {t.removeDuplicates}
        </button>
        <button
          onClick={removeBlank}
          className="rounded-md bg-slate-900 text-white text-sm px-3 py-1.5 hover:bg-slate-700"
        >
          {t.removeBlank}
        </button>
        <button
          onClick={trimLines}
          className="rounded-md bg-slate-900 text-white text-sm px-3 py-1.5 hover:bg-slate-700"
        >
          {t.trim}
        </button>
        <button
          onClick={sortLines}
          className="rounded-md bg-slate-900 text-white text-sm px-3 py-1.5 hover:bg-slate-700"
        >
          {t.sort}
        </button>
        <button
          onClick={copy}
          className="rounded-md border border-slate-300 text-sm px-3 py-1.5 hover:bg-slate-50"
        >
          {copied ? t.copied : t.copy}
        </button>
        <button
          onClick={() => setText("")}
          className="rounded-md border border-slate-300 text-sm px-3 py-1.5 hover:bg-slate-50"
        >
          {t.clear}
        </button>
      </div>
    </div>
  );
}
