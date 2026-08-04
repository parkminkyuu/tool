"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locales";

const strings = {
  ko: {
    mode1: "X는 Y의 몇 %인가요?",
    mode1Label1: "X",
    mode1Label2: "Y",
    mode1Result: (x: number, y: number, r: string) =>
      `${x}는 ${y}의 ${r}% 입니다`,
    mode2: "Y의 X%는 얼마인가요?",
    mode2Label1: "X (%)",
    mode2Label2: "Y",
    mode2Result: (x: number, y: number, r: string) => `${y}의 ${x}%는 ${r} 입니다`,
    mode3: "X에서 Y로 증감률은 몇 %인가요?",
    mode3Label1: "X (이전 값)",
    mode3Label2: "Y (이후 값)",
    mode3Result: (r: string) => `증감률: ${r}%`,
  },
  en: {
    mode1: "X is what percent of Y?",
    mode1Label1: "X",
    mode1Label2: "Y",
    mode1Result: (x: number, y: number, r: string) => `${x} is ${r}% of ${y}`,
    mode2: "What is X% of Y?",
    mode2Label1: "X (%)",
    mode2Label2: "Y",
    mode2Result: (x: number, y: number, r: string) => `${x}% of ${y} is ${r}`,
    mode3: "Percentage change from X to Y",
    mode3Label1: "X (old value)",
    mode3Label2: "Y (new value)",
    mode3Result: (r: string) => `Change: ${r}%`,
  },
} as const;

type Mode = "mode1" | "mode2" | "mode3";

export default function PercentageCalculator({ locale }: { locale: Locale }) {
  const [mode, setMode] = useState<Mode>("mode1");
  const [x, setX] = useState("50");
  const [y, setY] = useState("200");
  const t = strings[locale];

  const result = useMemo(() => {
    const xn = parseFloat(x);
    const yn = parseFloat(y);
    if (isNaN(xn) || isNaN(yn)) return null;

    if (mode === "mode1") {
      if (yn === 0) return null;
      return ((xn / yn) * 100).toFixed(2);
    }
    if (mode === "mode2") {
      return ((xn / 100) * yn).toFixed(2);
    }
    if (xn === 0) return null;
    return (((yn - xn) / xn) * 100).toFixed(2);
  }, [mode, x, y]);

  const modes: Mode[] = ["mode1", "mode2", "mode3"];
  const label1 =
    mode === "mode1" ? t.mode1Label1 : mode === "mode2" ? t.mode2Label1 : t.mode3Label1;
  const label2 =
    mode === "mode1" ? t.mode1Label2 : mode === "mode2" ? t.mode2Label2 : t.mode3Label2;

  return (
    <div>
      <div className="flex flex-col gap-2 mb-4">
        {modes.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`text-left rounded-md px-3 py-2 text-sm border ${
              mode === m
                ? "bg-slate-900 text-white border-slate-900"
                : "border-slate-300 hover:bg-slate-50"
            }`}
          >
            {t[m]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-500 mb-1">{label1}</label>
          <input
            type="number"
            value={x}
            onChange={(e) => setX(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">{label2}</label>
          <input
            type="number"
            value={y}
            onChange={(e) => setY(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
      </div>

      <div className="mt-6 rounded-md border border-slate-200 p-4 text-center text-lg font-semibold text-slate-900">
        {result === null
          ? "-"
          : mode === "mode1"
          ? t.mode1Result(parseFloat(x), parseFloat(y), result)
          : mode === "mode2"
          ? t.mode2Result(parseFloat(x), parseFloat(y), result)
          : t.mode3Result(result)}
      </div>
    </div>
  );
}
