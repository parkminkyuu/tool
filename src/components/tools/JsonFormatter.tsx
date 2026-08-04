"use client";

import { useState } from "react";
import type { Locale } from "@/lib/locales";

const strings = {
  ko: {
    placeholder: '{"example": "여기에 JSON을 붙여넣으세요"}',
    format: "정렬 (Prettify)",
    minify: "압축 (Minify)",
    copy: "복사",
    copied: "복사됨!",
    clear: "지우기",
    validJson: "유효한 JSON입니다",
    invalidJson: "JSON 오류: ",
  },
  en: {
    placeholder: '{"example": "paste your JSON here"}',
    format: "Prettify",
    minify: "Minify",
    copy: "Copy",
    copied: "Copied!",
    clear: "Clear",
    validJson: "Valid JSON",
    invalidJson: "JSON Error: ",
  },
} as const;

export default function JsonFormatter({ locale }: { locale: Locale }) {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [valid, setValid] = useState(false);
  const [copied, setCopied] = useState(false);
  const t = strings[locale];

  const format = (indent: number | null) => {
    try {
      const parsed = JSON.parse(text);
      setText(
        indent === null
          ? JSON.stringify(parsed)
          : JSON.stringify(parsed, null, indent)
      );
      setError(null);
      setValid(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setValid(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setError(null);
          setValid(false);
        }}
        placeholder={t.placeholder}
        rows={12}
        spellCheck={false}
        className="w-full rounded-md border border-slate-300 p-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-slate-400 resize-y"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => format(2)}
          className="rounded-md bg-slate-900 text-white text-sm px-3 py-1.5 hover:bg-slate-700"
        >
          {t.format}
        </button>
        <button
          onClick={() => format(null)}
          className="rounded-md bg-slate-900 text-white text-sm px-3 py-1.5 hover:bg-slate-700"
        >
          {t.minify}
        </button>
        <button
          onClick={copy}
          className="rounded-md border border-slate-300 text-sm px-3 py-1.5 hover:bg-slate-50"
        >
          {copied ? t.copied : t.copy}
        </button>
        <button
          onClick={() => {
            setText("");
            setError(null);
            setValid(false);
          }}
          className="rounded-md border border-slate-300 text-sm px-3 py-1.5 hover:bg-slate-50"
        >
          {t.clear}
        </button>
      </div>
      {error && (
        <p className="mt-3 text-sm text-red-600">
          {t.invalidJson}
          {error}
        </p>
      )}
      {valid && !error && (
        <p className="mt-3 text-sm text-green-600">{t.validJson}</p>
      )}
    </div>
  );
}
