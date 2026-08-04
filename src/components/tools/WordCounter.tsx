"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locales";

const strings = {
  ko: {
    placeholder: "여기에 텍스트를 입력하거나 붙여넣으세요...",
    charsWithSpace: "공백 포함 글자수",
    charsNoSpace: "공백 제외 글자수",
    words: "단어수",
    lines: "줄 수",
    bytes: "바이트 (UTF-8)",
    clear: "지우기",
  },
  en: {
    placeholder: "Type or paste your text here...",
    charsWithSpace: "Characters (with spaces)",
    charsNoSpace: "Characters (no spaces)",
    words: "Words",
    lines: "Lines",
    bytes: "Bytes (UTF-8)",
    clear: "Clear",
  },
} as const;

export default function WordCounter({ locale }: { locale: Locale }) {
  const [text, setText] = useState("");
  const t = strings[locale];

  const stats = useMemo(() => {
    const charsWithSpace = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const lines = text === "" ? 0 : text.split(/\n/).length;
    const bytes = new TextEncoder().encode(text).length;
    return { charsWithSpace, charsNoSpace, words, lines, bytes };
  }, [text]);

  const items: [string, number][] = [
    [t.charsWithSpace, stats.charsWithSpace],
    [t.charsNoSpace, stats.charsNoSpace],
    [t.words, stats.words],
    [t.lines, stats.lines],
    [t.bytes, stats.bytes],
  ];

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.placeholder}
        rows={10}
        className="w-full rounded-md border border-slate-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 resize-y"
      />
      <div className="mt-3 flex justify-end">
        <button
          onClick={() => setText("")}
          className="text-sm text-slate-500 hover:text-slate-900"
        >
          {t.clear}
        </button>
      </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-3">
        {items.map(([label, value]) => (
          <div
            key={label}
            className="rounded-md border border-slate-200 p-3 text-center"
          >
            <div className="text-xl font-bold text-slate-900">
              {value.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 mt-1">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
