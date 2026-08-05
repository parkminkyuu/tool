"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locales";

const strings = {
  ko: {
    hourlyWage: "시급 (원)",
    weeklyHours: "1주 소정근로시간",
    eligible: "지급 대상입니다",
    notEligible: "지급 대상이 아닙니다 (주 15시간 미만)",
    weeklyPay: "주휴수당 (1주)",
    monthlyPay: "월 환산 예상액 (약 4.345주)",
    note: "주휴수당은 주 15시간 이상 근무하고, 소정근로일에 결근 없이 개근한 경우 지급됩니다. 계산식: (1주 소정근로시간 ÷ 40) × 8 × 시급, 단 40시간을 초과해도 8시간분까지만 인정됩니다. 실제 지급액은 근무 형태나 사업장 규정에 따라 다를 수 있습니다.",
  },
  en: {
    hourlyWage: "Hourly wage (KRW)",
    weeklyHours: "Contracted hours per week",
    eligible: "Eligible for weekly holiday pay",
    notEligible: "Not eligible (under 15 hours/week)",
    weeklyPay: "Weekly holiday pay (per week)",
    monthlyPay: "Estimated monthly equivalent (≈4.345 weeks)",
    note: "Weekly holiday pay (주휴수당) applies to employees working 15+ hours a week with no unexcused absences. Formula: (weekly contracted hours ÷ 40) × 8 × hourly wage, capped at 8 hours' pay even beyond 40 hours/week. Actual payment can vary by workplace policy.",
  },
} as const;

export default function WeeklyHolidayPayCalculator({ locale }: { locale: Locale }) {
  const t = strings[locale];
  const [hourlyWage, setHourlyWage] = useState("10320");
  const [weeklyHours, setWeeklyHours] = useState("40");

  const result = useMemo(() => {
    const wage = parseFloat(hourlyWage);
    const hours = parseFloat(weeklyHours);
    if (isNaN(wage) || isNaN(hours) || wage < 0 || hours < 0) return null;

    const eligible = hours >= 15;
    const effectiveHours = (Math.min(hours, 40) / 40) * 8;
    const weeklyPay = eligible ? Math.round(effectiveHours * wage) : 0;
    const monthlyPay = Math.round(weeklyPay * 4.345);

    return { eligible, weeklyPay, monthlyPay };
  }, [hourlyWage, weeklyHours]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-500 mb-1">{t.hourlyWage}</label>
          <input
            type="number"
            value={hourlyWage}
            onChange={(e) => setHourlyWage(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">{t.weeklyHours}</label>
          <input
            type="number"
            value={weeklyHours}
            onChange={(e) => setWeeklyHours(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
      </div>

      {result && (
        <div className="mt-6">
          <div
            className={`text-center text-sm font-medium rounded-md p-2 ${
              result.eligible
                ? "bg-green-50 text-green-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {result.eligible ? t.eligible : t.notEligible}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-md border border-slate-200 p-4 text-center">
              <div className="text-2xl font-extrabold text-slate-900">
                {result.weeklyPay.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 mt-1">{t.weeklyPay}</div>
            </div>
            <div className="rounded-md border border-slate-200 p-4 text-center">
              <div className="text-2xl font-extrabold text-slate-900">
                {result.monthlyPay.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 mt-1">{t.monthlyPay}</div>
            </div>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-slate-500 leading-relaxed">{t.note}</p>
    </div>
  );
}
