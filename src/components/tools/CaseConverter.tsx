"use client";

import { useState } from "react";
import type { Locale } from "@/lib/locales";

const strings = {
  ko: {
    placeholder: "변환할 텍스트를 입력하세요...",
    upper: "대문자",
    lower: "소문자",
    title: "각 단어 첫글자 대문자",
    sentence: "문장 첫글자만 대문자",
    copy: "복사",
    copied: "복사됨!",
    clear: "지우기",
  },
  en: {
    placeholder: "Enter text to convert...",
    upper: "UPPERCASE",
    lower: "lowercase",
    title: "Title Case",
    sentence: "Sentence case",
    copy: "Copy",
    copied: "Copied!",
    clear: "Clear",
  },
} as const;

function toTitleCase(s: string) {
  return s.replace(
    /\w\S*/g,
    (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
  );
}

function toSentenceCase(s: string) {
  const lower = s.toLowerCase();
  return lower.replace(/(^\s*\w|[.!?]\s*\w)/g, (m) => m.toUpperCase());
}

export default function CaseConverter({ locale }: { locale: Locale }) {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const t = strings[locale];

  const actions: [string, (s: string) => string][] = [
    [t.upper, (s) => s.toUpperCase()],
    [t.lower, (s) => s.toLowerCase()],
    [t.title, toTitleCase],
    [t.sentence, toSentenceCase],
  ];

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.placeholder}
        rows={8}
        className="w-full rounded-md border border-slate-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 resize-y"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        {actions.map(([label, fn]) => (
          <button
            key={label}
            onClick={() => setText((prev) => fn(prev))}
            className="rounded-md bg-slate-900 text-white text-sm px-3 py-1.5 hover:bg-slate-700"
          >
            {label}
          </button>
        ))}
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
