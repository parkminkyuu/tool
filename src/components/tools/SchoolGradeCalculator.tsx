"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locales";

const strings = {
  ko: {
    birthDate: "생년월일",
    entryElementary: "초등학교 입학",
    entryMiddle: "중학교 입학",
    entryHigh: "고등학교 입학",
    currentGrade: "현재 학년",
    beforeEntry: "입학 전",
    graduated: "고등학교 졸업",
    elementary: (n: number) => `초등학교 ${n}학년`,
    middle: (n: number) => `중학교 ${n}학년`,
    high: (n: number) => `고등학교 ${n}학년`,
  },
  en: {
    birthDate: "Date of birth",
    entryElementary: "Elementary school entry",
    entryMiddle: "Middle school entry",
    entryHigh: "High school entry",
    currentGrade: "Current grade",
    beforeEntry: "Not yet school age",
    graduated: "Graduated high school",
    elementary: (n: number) => `Elementary grade ${n}`,
    middle: (n: number) => `Middle school grade ${n}`,
    high: (n: number) => `High school grade ${n}`,
  },
} as const;

export default function SchoolGradeCalculator({ locale }: { locale: Locale }) {
  const t = strings[locale];
  const [birth, setBirth] = useState("2019-05-10");

  const result = useMemo(() => {
    const parts = birth.split("-").map(Number);
    if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
    const [by, bm, bd] = parts;

    // Korean elementary school entry rule: a child who has turned 6 by
    // March 1st enters that year; otherwise they enter the following year.
    const turnsSixBeforeOrOnMarch1 = bm < 3 || (bm === 3 && bd === 1);
    const entryYear = turnsSixBeforeOrOnMarch1 ? by + 6 : by + 7;
    const middleEntryYear = entryYear + 6;
    const highEntryYear = entryYear + 9;

    const today = new Date();
    const academicYear =
      today.getMonth() + 1 >= 3 ? today.getFullYear() : today.getFullYear() - 1;
    const gradeIndex = academicYear - entryYear; // 0-based, 0..11

    let currentGradeLabel: string;
    if (gradeIndex < 0) currentGradeLabel = t.beforeEntry;
    else if (gradeIndex <= 5) currentGradeLabel = t.elementary(gradeIndex + 1);
    else if (gradeIndex <= 8) currentGradeLabel = t.middle(gradeIndex - 5);
    else if (gradeIndex <= 11) currentGradeLabel = t.high(gradeIndex - 8);
    else currentGradeLabel = t.graduated;

    return { entryYear, middleEntryYear, highEntryYear, currentGradeLabel };
  }, [birth, t]);

  return (
    <div>
      <div>
        <label className="block text-xs text-slate-500 mb-1">{t.birthDate}</label>
        <input
          type="date"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          className="w-full sm:w-64 rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
      </div>

      {result && (
        <>
          <div className="mt-6 rounded-md border border-slate-200 p-4 text-center">
            <div className="text-xs text-slate-500 mb-1">{t.currentGrade}</div>
            <div className="text-2xl font-extrabold text-slate-900">
              {result.currentGradeLabel}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-md border border-slate-200 p-3 text-center">
              <div className="text-lg font-bold text-slate-900">
                {result.entryYear}
              </div>
              <div className="text-xs text-slate-500 mt-1">{t.entryElementary}</div>
            </div>
            <div className="rounded-md border border-slate-200 p-3 text-center">
              <div className="text-lg font-bold text-slate-900">
                {result.middleEntryYear}
              </div>
              <div className="text-xs text-slate-500 mt-1">{t.entryMiddle}</div>
            </div>
            <div className="rounded-md border border-slate-200 p-3 text-center">
              <div className="text-lg font-bold text-slate-900">
                {result.highEntryYear}
              </div>
              <div className="text-xs text-slate-500 mt-1">{t.entryHigh}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
