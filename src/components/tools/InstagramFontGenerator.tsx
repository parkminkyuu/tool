"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locales";

const strings = {
  ko: {
    placeholder: "여기에 텍스트를 입력하세요 (예: 홍길동, hongstagram)",
    copy: "복사",
    copied: "복사됨!",
    empty: "위에 텍스트를 입력하면 다양한 폰트 스타일이 나타납니다.",
  },
  en: {
    placeholder: "Type your text here (e.g. your username or bio)",
    copy: "Copy",
    copied: "Copied!",
    empty: "Type something above to see the fancy font styles.",
  },
} as const;

type Range = {
  upper: number;
  lower: number;
  digit?: number;
  upperExceptions?: Record<number, number>;
  lowerExceptions?: Record<number, number>;
};

function mapAlpha(text: string, r: Range): string {
  return [...text]
    .map((ch) => {
      const code = ch.codePointAt(0)!;
      if (code >= 65 && code <= 90) {
        const i = code - 65;
        if (r.upperExceptions?.[i]) return String.fromCodePoint(r.upperExceptions[i]);
        return String.fromCodePoint(r.upper + i);
      }
      if (code >= 97 && code <= 122) {
        const i = code - 97;
        if (r.lowerExceptions?.[i]) return String.fromCodePoint(r.lowerExceptions[i]);
        return String.fromCodePoint(r.lower + i);
      }
      if (r.digit && code >= 48 && code <= 57) {
        return String.fromCodePoint(r.digit + (code - 48));
      }
      return ch;
    })
    .join("");
}

function mapCircled(text: string): string {
  return [...text]
    .map((ch) => {
      const code = ch.codePointAt(0)!;
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x24b6 + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x24d0 + (code - 97));
      if (code === 48) return "⓪";
      if (code >= 49 && code <= 57) return String.fromCodePoint(0x2460 + (code - 49));
      return ch;
    })
    .join("");
}

function mapFullwidth(text: string): string {
  return [...text]
    .map((ch) => {
      const code = ch.codePointAt(0)!;
      if (code === 32) return "　";
      if (code >= 33 && code <= 126) return String.fromCodePoint(0xff00 + (code - 32));
      return ch;
    })
    .join("");
}

function combining(text: string, mark: string): string {
  return [...text].map((ch) => (ch === " " ? ch : ch + mark)).join("");
}

const FLIP_MAP: Record<string, string> = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ",
  j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ",
  s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
  "0": "0", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ", "5": "5", "6": "9",
  "7": "ㄥ", "8": "8", "9": "6",
  ".": "˙", ",": "'", "'": ",", '"': "„", "?": "¿", "!": "¡",
  "(": ")", ")": "(", "[": "]", "]": "[", "{": "}", "}": "{",
  "<": ">", ">": "<", "_": "‾",
};

function flipText(text: string): string {
  return [...text.toLowerCase()]
    .map((ch) => FLIP_MAP[ch] ?? ch)
    .reverse()
    .join("");
}

const styles: { label: string; fn: (t: string) => string }[] = [
  { label: "Bold", fn: (t) => mapAlpha(t, { upper: 0x1d400, lower: 0x1d41a, digit: 0x1d7ce }) },
  {
    label: "Italic",
    fn: (t) =>
      mapAlpha(t, {
        upper: 0x1d434,
        lower: 0x1d44e,
        lowerExceptions: { 7: 0x210e },
      }),
  },
  { label: "Bold Italic", fn: (t) => mapAlpha(t, { upper: 0x1d468, lower: 0x1d482 }) },
  {
    label: "Script",
    fn: (t) =>
      mapAlpha(t, {
        upper: 0x1d49c,
        lower: 0x1d4b6,
        upperExceptions: {
          1: 0x212c, 4: 0x2130, 5: 0x2131, 7: 0x210b, 8: 0x2110,
          11: 0x2112, 12: 0x2133, 17: 0x211b,
        },
        lowerExceptions: { 4: 0x212f, 6: 0x210a, 14: 0x2134 },
      }),
  },
  { label: "Bold Script", fn: (t) => mapAlpha(t, { upper: 0x1d4d0, lower: 0x1d4ea }) },
  {
    label: "Fraktur",
    fn: (t) =>
      mapAlpha(t, {
        upper: 0x1d504,
        lower: 0x1d51e,
        upperExceptions: { 2: 0x212d, 7: 0x210c, 8: 0x2111, 17: 0x211c, 25: 0x2128 },
      }),
  },
  { label: "Bold Fraktur", fn: (t) => mapAlpha(t, { upper: 0x1d56c, lower: 0x1d586 }) },
  {
    label: "Double-Struck",
    fn: (t) =>
      mapAlpha(t, {
        upper: 0x1d538,
        lower: 0x1d552,
        digit: 0x1d7d8,
        upperExceptions: {
          2: 0x2102, 7: 0x210d, 13: 0x2115, 15: 0x2119, 16: 0x211a,
          17: 0x211d, 25: 0x2124,
        },
      }),
  },
  { label: "Sans-Serif", fn: (t) => mapAlpha(t, { upper: 0x1d5a0, lower: 0x1d5ba, digit: 0x1d7e2 }) },
  { label: "Sans-Serif Bold", fn: (t) => mapAlpha(t, { upper: 0x1d5d4, lower: 0x1d5ee, digit: 0x1d7ec }) },
  { label: "Monospace", fn: (t) => mapAlpha(t, { upper: 0x1d670, lower: 0x1d68a, digit: 0x1d7f6 }) },
  { label: "Circled", fn: mapCircled },
  { label: "Fullwidth", fn: mapFullwidth },
  { label: "Upside Down", fn: flipText },
  { label: "S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶", fn: (t) => combining(t, "̶") },
  { label: "U̲n̲d̲e̲r̲l̲i̲n̲e̲", fn: (t) => combining(t, "̲") },
];

export default function InstagramFontGenerator({ locale }: { locale: Locale }) {
  const [text, setText] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const t = strings[locale];

  const results = useMemo(
    () => styles.map((s) => ({ label: s.label, value: s.fn(text) })),
    [text]
  );

  const copy = async (value: string, i: number) => {
    await navigator.clipboard.writeText(value);
    setCopiedIndex(i);
    setTimeout(() => setCopiedIndex((cur) => (cur === i ? null : cur)), 1500);
  };

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.placeholder}
        className="w-full rounded-md border border-slate-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-slate-400"
      />

      {text === "" ? (
        <p className="mt-6 text-sm text-slate-400">{t.empty}</p>
      ) : (
        <div className="mt-6 flex flex-col gap-2">
          {results.map((r, i) => (
            <div
              key={r.label}
              className="flex items-center justify-between gap-3 rounded-md border border-slate-200 p-3"
            >
              <span className="break-all text-base text-slate-900">{r.value}</span>
              <button
                onClick={() => copy(r.value, i)}
                className="shrink-0 rounded-md border border-slate-300 text-xs px-2.5 py-1.5 hover:bg-slate-50"
              >
                {copiedIndex === i ? t.copied : t.copy}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
