"use client";

import { useState } from "react";
import type { Locale } from "@/lib/locales";

const strings = {
  ko: {
    inputPlaceholder: "인코딩/디코딩할 텍스트를 입력하세요...",
    encode: "인코딩",
    decode: "디코딩",
    copy: "복사",
    copied: "복사됨!",
    clear: "지우기",
    error: "디코딩할 수 없는 Base64 문자열입니다",
  },
  en: {
    inputPlaceholder: "Enter text to encode or decode...",
    encode: "Encode",
    decode: "Decode",
    copy: "Copy",
    copied: "Copied!",
    clear: "Clear",
    error: "Invalid Base64 string — cannot decode",
  },
} as const;

export default function Base64Tool({ locale }: { locale: Locale }) {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const t = strings[locale];

  const encode = () => {
    try {
      setText(btoa(unescape(encodeURIComponent(text))));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const decode = () => {
    try {
      setText(decodeURIComponent(escape(atob(text))));
      setError(null);
    } catch {
      setError(t.error);
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
        }}
        placeholder={t.inputPlaceholder}
        rows={10}
        spellCheck={false}
        className="w-full rounded-md border border-slate-300 p-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-slate-400 resize-y"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={encode}
          className="rounded-md bg-slate-900 text-white text-sm px-3 py-1.5 hover:bg-slate-700"
        >
          {t.encode}
        </button>
        <button
          onClick={decode}
          className="rounded-md bg-slate-900 text-white text-sm px-3 py-1.5 hover:bg-slate-700"
        >
          {t.decode}
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
          }}
          className="rounded-md border border-slate-300 text-sm px-3 py-1.5 hover:bg-slate-50"
        >
          {t.clear}
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}
