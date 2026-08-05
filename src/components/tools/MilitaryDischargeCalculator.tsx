"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locales";

const strings = {
  ko: {
    branch: "군종",
    army: "육군 / 해병대 (18개월)",
    navy: "해군 (20개월)",
    airforce: "공군 (21개월)",
    custom: "직접 입력",
    customMonths: "복무 개월수",
    enlistDate: "입대일",
    dischargeDate: "전역 예정일",
    dday: "디데이",
    progress: "복무 진행률",
    todayIsAfter: "전역일이 지났습니다",
    note: "복무기간은 병역법 기준 표준 기간이며, 휴가·교육 연기·복무기간 조정 등 개인 사정에 따라 실제 전역일과 다를 수 있습니다. 정확한 날짜는 소속 부대 또는 병무청에서 확인하세요.",
  },
  en: {
    branch: "Service branch",
    army: "Army / Marines (18 months)",
    navy: "Navy (20 months)",
    airforce: "Air Force (21 months)",
    custom: "Custom",
    customMonths: "Service length (months)",
    enlistDate: "Enlistment date",
    dischargeDate: "Expected discharge date",
    dday: "D-day",
    progress: "Service progress",
    todayIsAfter: "Discharge date has passed",
    note: "These are the standard service lengths under Korea's Military Service Act. Leave, deferred training, or individual adjustments can shift your actual discharge date — confirm the exact date with your unit or the Military Manpower Administration.",
  },
} as const;

const branches = [
  { key: "army", months: 18 },
  { key: "navy", months: 20 },
  { key: "airforce", months: 21 },
] as const;

function toDateInputValue(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addMonths(dateStr: string, months: number): Date | null {
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
  const [y, m, d] = parts;
  return new Date(y, m - 1 + months, d);
}

export default function MilitaryDischargeCalculator({ locale }: { locale: Locale }) {
  const t = strings[locale];
  const [branch, setBranch] = useState<"army" | "navy" | "airforce" | "custom">("army");
  const [customMonths, setCustomMonths] = useState("18");
  const [enlistDate, setEnlistDate] = useState(toDateInputValue(new Date()));

  const months =
    branch === "custom"
      ? parseInt(customMonths, 10) || 0
      : branches.find((b) => b.key === branch)!.months;

  const result = useMemo(() => {
    const discharge = addMonths(enlistDate, months);
    if (!discharge) return null;

    const enlist = addMonths(enlistDate, 0);
    if (!enlist) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    enlist.setHours(0, 0, 0, 0);
    discharge.setHours(0, 0, 0, 0);

    const totalDays = Math.round(
      (discharge.getTime() - enlist.getTime()) / (1000 * 60 * 60 * 24)
    );
    const elapsedDays = Math.round(
      (today.getTime() - enlist.getTime()) / (1000 * 60 * 60 * 24)
    );
    const remainingDays = Math.round(
      (discharge.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    const progress = Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));

    return { discharge, remainingDays, progress };
  }, [enlistDate, months]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {branches.map((b) => (
          <button
            key={b.key}
            onClick={() => setBranch(b.key)}
            className={`rounded-md px-3 py-1.5 text-sm border ${
              branch === b.key
                ? "bg-slate-900 text-white border-slate-900"
                : "border-slate-300 hover:bg-slate-50"
            }`}
          >
            {t[b.key]}
          </button>
        ))}
        <button
          onClick={() => setBranch("custom")}
          className={`rounded-md px-3 py-1.5 text-sm border ${
            branch === "custom"
              ? "bg-slate-900 text-white border-slate-900"
              : "border-slate-300 hover:bg-slate-50"
          }`}
        >
          {t.custom}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-500 mb-1">{t.enlistDate}</label>
          <input
            type="date"
            value={enlistDate}
            onChange={(e) => setEnlistDate(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
        {branch === "custom" && (
          <div>
            <label className="block text-xs text-slate-500 mb-1">{t.customMonths}</label>
            <input
              type="number"
              value={customMonths}
              onChange={(e) => setCustomMonths(e.target.value)}
              className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
        )}
      </div>

      {result && (
        <div className="mt-6">
          <div className="rounded-md border border-slate-200 p-4 text-center">
            <div className="text-xs text-slate-500 mb-1">{t.dischargeDate}</div>
            <div className="text-2xl font-extrabold text-slate-900">
              {result.discharge.getFullYear()}.
              {String(result.discharge.getMonth() + 1).padStart(2, "0")}.
              {String(result.discharge.getDate()).padStart(2, "0")}
            </div>
            <div className="mt-2 text-sm font-medium text-slate-700">
              {result.remainingDays > 0
                ? `D-${result.remainingDays}`
                : result.remainingDays === 0
                ? "D-Day"
                : t.todayIsAfter}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>{t.progress}</span>
              <span>{result.progress.toFixed(1)}%</span>
            </div>
            <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-slate-900 rounded-full"
                style={{ width: `${result.progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-slate-500 leading-relaxed">{t.note}</p>
    </div>
  );
}
