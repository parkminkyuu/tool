"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locales";

const strings = {
  ko: {
    birthDate: "생년월일",
    refDate: "기준일",
    intlAge: "만 나이",
    intlAgeDesc: "법적 나이 (2023년부터 통일된 공식 나이)",
    yearAge: "연 나이",
    yearAgeDesc: "올해 연도 - 출생연도 (병역법 등 일부 법령 기준)",
    countingAge: "세는 나이",
    countingAgeDesc: "태어난 해를 1살로 치는 전통적 나이 (일상 대화에서 주로 사용)",
  },
  en: {
    birthDate: "Date of birth",
    refDate: "As of",
    intlAge: "Man-nai (International Age)",
    intlAgeDesc: "Korea's official legal age since the 2023 unification law",
    yearAge: "Yeon-nai (Year Age)",
    yearAgeDesc: "Current year minus birth year — used in a few remaining statutes",
    countingAge: "Se-neun-nai (Counting Age)",
    countingAgeDesc: "Traditional age counting birth year as age 1 — still common in casual speech",
  },
} as const;

function toDateInputValue(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function KoreanAgeCalculator({ locale }: { locale: Locale }) {
  const t = strings[locale];
  const [birth, setBirth] = useState("2000-01-01");
  const [ref, setRef] = useState(toDateInputValue(new Date()));

  const result = useMemo(() => {
    // Parse as plain Y/M/D integers (not Date objects) to avoid any
    // timezone-related off-by-one shifts for visitors outside Korea.
    const bParts = birth.split("-").map(Number);
    const rParts = ref.split("-").map(Number);
    if (bParts.length !== 3 || rParts.length !== 3) return null;
    const [by, bm, bd] = bParts;
    const [ry, rm, rd] = rParts;
    if ([by, bm, bd, ry, rm, rd].some((n) => Number.isNaN(n))) return null;

    const birthKey = by * 10000 + bm * 100 + bd;
    const refKey = ry * 10000 + rm * 100 + rd;
    if (birthKey > refKey) return null;

    let intlAge = ry - by;
    const hadBirthdayThisYear = rm > bm || (rm === bm && rd >= bd);
    if (!hadBirthdayThisYear) intlAge -= 1;

    const yearAge = ry - by;
    const countingAge = yearAge + 1;

    return { intlAge, yearAge, countingAge };
  }, [birth, ref]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-500 mb-1">{t.birthDate}</label>
          <input
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">{t.refDate}</label>
          <input
            type="date"
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
      </div>

      {result && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-md border border-slate-200 p-4 text-center">
            <div className="text-3xl font-extrabold text-slate-900">{result.intlAge}</div>
            <div className="text-sm font-medium text-slate-700 mt-1">{t.intlAge}</div>
            <div className="text-xs text-slate-500 mt-1">{t.intlAgeDesc}</div>
          </div>
          <div className="rounded-md border border-slate-200 p-4 text-center">
            <div className="text-3xl font-extrabold text-slate-900">{result.yearAge}</div>
            <div className="text-sm font-medium text-slate-700 mt-1">{t.yearAge}</div>
            <div className="text-xs text-slate-500 mt-1">{t.yearAgeDesc}</div>
          </div>
          <div className="rounded-md border border-slate-200 p-4 text-center">
            <div className="text-3xl font-extrabold text-slate-900">{result.countingAge}</div>
            <div className="text-sm font-medium text-slate-700 mt-1">{t.countingAge}</div>
            <div className="text-xs text-slate-500 mt-1">{t.countingAgeDesc}</div>
          </div>
        </div>
      )}
    </div>
  );
}
