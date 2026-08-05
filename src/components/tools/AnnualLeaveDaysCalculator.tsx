"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locales";

const strings = {
  ko: {
    hireDate: "입사일",
    refDate: "기준일",
    daysResult: "발생 연차",
    daysUnit: "일",
    underOneYear: "입사 1년 미만: 개근 시 매월 1일씩 발생 (최대 11일)",
    overOneYear: "입사 1년 이상: 기본 15일 + 3년차부터 2년마다 1일 가산 (최대 25일)",
    tenure: "근속기간",
    note: "근로기준법 제60조 기준 표준 계산이며, 회사 자체 규정(입사일 기준/회계연도 기준 등)이나 출근율에 따라 실제 발생 일수는 다를 수 있습니다.",
  },
  en: {
    hireDate: "Hire date",
    refDate: "As of",
    daysResult: "Accrued annual leave",
    daysUnit: "days",
    underOneYear: "Under 1 year: 1 day per full month of perfect attendance (max 11 days)",
    overOneYear: "1+ years: 15 base days, +1 day every 2 years starting year 3 (capped at 25)",
    tenure: "Tenure",
    note: "This follows the standard formula under Article 60 of Korea's Labor Standards Act. Actual accrual may differ based on company policy (hire-date vs. fiscal-year basis) or attendance rate.",
  },
} as const;

function toDateInputValue(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function AnnualLeaveDaysCalculator({ locale }: { locale: Locale }) {
  const t = strings[locale];
  const [hireDate, setHireDate] = useState("2023-04-01");
  const [refDate, setRefDate] = useState(toDateInputValue(new Date()));

  const result = useMemo(() => {
    const hParts = hireDate.split("-").map(Number);
    const rParts = refDate.split("-").map(Number);
    if (hParts.length !== 3 || rParts.length !== 3) return null;
    const [hy, hm, hd] = hParts;
    const [ry, rm, rd] = rParts;
    if ([hy, hm, hd, ry, rm, rd].some((n) => Number.isNaN(n))) return null;

    const hireKey = hy * 10000 + hm * 100 + hd;
    const refKey = ry * 10000 + rm * 100 + rd;
    if (hireKey > refKey) return null;

    let tenureYears = ry - hy;
    const hadAnniversary = rm > hm || (rm === hm && rd >= hd);
    if (!hadAnniversary) tenureYears -= 1;

    if (tenureYears < 1) {
      // Full months completed since hire date, capped at 11.
      let months = (ry - hy) * 12 + (rm - hm);
      if (rd < hd) months -= 1;
      months = Math.max(0, Math.min(11, months));
      return { days: months, tenureYears, underOneYear: true };
    }

    const bonus = Math.floor((tenureYears - 1) / 2);
    const days = Math.min(15 + bonus, 25);
    return { days, tenureYears, underOneYear: false };
  }, [hireDate, refDate]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-500 mb-1">{t.hireDate}</label>
          <input
            type="date"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">{t.refDate}</label>
          <input
            type="date"
            value={refDate}
            onChange={(e) => setRefDate(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
      </div>

      {result && (
        <>
          <div className="mt-6 rounded-md border border-slate-200 p-4 text-center">
            <div className="text-3xl font-extrabold text-slate-900">
              {result.days}
              <span className="text-base font-normal text-slate-500 ml-1">
                {t.daysUnit}
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-1">{t.daysResult}</div>
            <div className="text-xs text-slate-400 mt-1">
              {t.tenure}: {result.tenureYears}
              {locale === "ko" ? "년차" : "y"}
            </div>
          </div>

          <div className="mt-4 rounded-md bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600 leading-relaxed">
            {result.underOneYear ? t.underOneYear : t.overOneYear}
          </div>
        </>
      )}

      <p className="mt-4 text-xs text-slate-500 leading-relaxed">{t.note}</p>
    </div>
  );
}
