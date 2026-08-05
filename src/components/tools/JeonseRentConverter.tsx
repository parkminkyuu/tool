"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locales";

const strings = {
  ko: {
    modeToRent: "전세 → 월세",
    modeToJeonse: "월세 → 전세 환산",
    deposit: "전세보증금 (만원)",
    newDeposit: "전환 후 보증금 (만원)",
    rate: "전환율 (연 %)",
    monthlyRent: "월세 (만원)",
    baseDeposit: "보증금 (만원)",
    result: "계산 결과",
    monthlyRentResult: "예상 월세",
    jeonseResult: "환산 전세보증금",
    perMonth: "만원 / 월",
    won: "만원",
    legalNote:
      "법정 전환율 상한은 '한국은행 기준금리 + 연 2%p'와 '연 10%' 중 낮은 값이며, 계약 갱신(갱신요구권 행사) 시에만 강제력이 있고 신규 계약에는 적용되지 않습니다. 정확한 현재 상한은 국토교통부 렌트홈에서 확인하세요.",
    invalid: "보증금은 전환 후 보증금보다 커야 합니다.",
  },
  en: {
    modeToRent: "Jeonse → Monthly rent",
    modeToJeonse: "Monthly rent → Jeonse equivalent",
    deposit: "Jeonse deposit (10k KRW)",
    newDeposit: "Deposit after conversion (10k KRW)",
    rate: "Conversion rate (annual %)",
    monthlyRent: "Monthly rent (10k KRW)",
    baseDeposit: "Deposit (10k KRW)",
    result: "Result",
    monthlyRentResult: "Estimated monthly rent",
    jeonseResult: "Equivalent jeonse deposit",
    perMonth: "10k KRW / month",
    won: "10k KRW",
    legalNote:
      "The statutory cap on the conversion rate is the lower of (Bank of Korea base rate + 2 percentage points) and 10% per year. It's only enforceable when a tenant exercises a lease renewal right — not on new contracts. Check Korea's Rent Home portal for the current cap.",
    invalid: "The deposit must be larger than the post-conversion deposit.",
  },
} as const;

export default function JeonseRentConverter({ locale }: { locale: Locale }) {
  const t = strings[locale];
  const [mode, setMode] = useState<"toRent" | "toJeonse">("toRent");
  const [deposit, setDeposit] = useState("30000");
  const [newDeposit, setNewDeposit] = useState("10000");
  const [rate, setRate] = useState("5.5");
  const [monthlyRent, setMonthlyRent] = useState("50");
  const [baseDeposit, setBaseDeposit] = useState("10000");

  const result = useMemo(() => {
    const r = parseFloat(rate);
    if (isNaN(r) || r <= 0) return null;

    if (mode === "toRent") {
      const d = parseFloat(deposit);
      const nd = parseFloat(newDeposit);
      if (isNaN(d) || isNaN(nd) || d <= nd) return null;
      const rent = ((d - nd) * (r / 100)) / 12;
      return Math.round(rent * 10) / 10;
    }

    const mr = parseFloat(monthlyRent);
    const bd = parseFloat(baseDeposit);
    if (isNaN(mr) || isNaN(bd)) return null;
    const jeonse = bd + (mr * 12) / (r / 100);
    return Math.round(jeonse * 10) / 10;
  }, [mode, deposit, newDeposit, rate, monthlyRent, baseDeposit]);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("toRent")}
          className={`rounded-md px-3 py-1.5 text-sm border ${
            mode === "toRent"
              ? "bg-slate-900 text-white border-slate-900"
              : "border-slate-300 hover:bg-slate-50"
          }`}
        >
          {t.modeToRent}
        </button>
        <button
          onClick={() => setMode("toJeonse")}
          className={`rounded-md px-3 py-1.5 text-sm border ${
            mode === "toJeonse"
              ? "bg-slate-900 text-white border-slate-900"
              : "border-slate-300 hover:bg-slate-50"
          }`}
        >
          {t.modeToJeonse}
        </button>
      </div>

      {mode === "toRent" ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-slate-500 mb-1">{t.deposit}</label>
            <input
              type="number"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
              className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">{t.newDeposit}</label>
            <input
              type="number"
              value={newDeposit}
              onChange={(e) => setNewDeposit(e.target.value)}
              className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">{t.rate}</label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-slate-500 mb-1">{t.baseDeposit}</label>
            <input
              type="number"
              value={baseDeposit}
              onChange={(e) => setBaseDeposit(e.target.value)}
              className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">{t.monthlyRent}</label>
            <input
              type="number"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(e.target.value)}
              className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">{t.rate}</label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
        </div>
      )}

      <div className="mt-6 rounded-md border border-slate-200 p-4 text-center">
        {result === null ? (
          <p className="text-sm text-red-600">{t.invalid}</p>
        ) : (
          <>
            <div className="text-xs text-slate-500 mb-1">
              {mode === "toRent" ? t.monthlyRentResult : t.jeonseResult}
            </div>
            <div className="text-3xl font-extrabold text-slate-900">
              {result.toLocaleString()}
              <span className="text-base font-normal text-slate-500 ml-1">
                {mode === "toRent" ? t.perMonth : t.won}
              </span>
            </div>
          </>
        )}
      </div>

      <p className="mt-4 text-xs text-slate-500 leading-relaxed">{t.legalNote}</p>
    </div>
  );
}
