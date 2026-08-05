"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locales";

const strings = {
  ko: {
    placeholder: "초성으로 변환할 한글 문장을 입력하세요 (예: 사랑해)",
    copy: "복사",
    copied: "복사됨!",
    clear: "지우기",
    output: "초성 결과",
  },
  en: {
    placeholder: "Enter a Korean sentence to convert to initial consonants",
    copy: "Copy",
    copied: "Copied!",
    clear: "Clear",
    output: "Result",
  },
} as const;

const CHOSUNG = [
  "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ",
  "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
];

function toChosung(text: string): string {
  return [...text]
    .map((ch) => {
      const code = ch.codePointAt(0)!;
      if (code < 0xac00 || code > 0xd7a3) return ch;
      const choIndex = Math.floor((code - 0xac00) / (21 * 28));
      return CHOSUNG[choIndex];
    })
    .join("");
}

export default function ChosungConverter({ locale }: { locale: Locale }) {
  const t = strings[locale];
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => toChosung(text), [text]);

  const copy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.placeholder}
        rows={5}
        className="w-full rounded-md border border-slate-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 resize-y"
      />

      <div className="mt-4">
        <label className="block text-xs text-slate-500 mb-1">{t.output}</label>
        <div className="w-full min-h-16 rounded-md border border-slate-200 bg-slate-50 p-3 text-lg font-medium text-slate-900 break-all">
          {result}
        </div>
      </div>

      <div className="mt-3 flex gap-2">
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
