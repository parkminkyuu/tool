"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locales";

const strings = {
  ko: {
    height: "키 (cm)",
    weight: "몸무게 (kg)",
    yourBmi: "당신의 BMI",
    categories: {
      under: "저체중",
      normal: "정상",
      over: "과체중",
      obese: "비만",
    },
  },
  en: {
    height: "Height (cm)",
    weight: "Weight (kg)",
    yourBmi: "Your BMI",
    categories: {
      under: "Underweight",
      normal: "Normal",
      over: "Overweight",
      obese: "Obese",
    },
  },
} as const;

export default function BmiCalculator({ locale }: { locale: Locale }) {
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("65");
  const t = strings[locale];

  const bmi = useMemo(() => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return null;
    return w / (h * h);
  }, [height, weight]);

  const category = useMemo(() => {
    if (bmi === null) return null;
    const [normalMax, overMax] = locale === "ko" ? [23, 25] : [25, 30];
    if (bmi < 18.5) return t.categories.under;
    if (bmi < normalMax) return t.categories.normal;
    if (bmi < overMax) return t.categories.over;
    return t.categories.obese;
  }, [bmi, t, locale]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-500 mb-1">{t.height}</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">{t.weight}</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
      </div>

      <div className="mt-6 rounded-md border border-slate-200 p-6 text-center">
        <div className="text-xs text-slate-500 mb-1">{t.yourBmi}</div>
        <div className="text-3xl font-extrabold text-slate-900">
          {bmi === null ? "-" : bmi.toFixed(1)}
        </div>
        {category && (
          <div className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
            {category}
          </div>
        )}
      </div>
    </div>
  );
}
