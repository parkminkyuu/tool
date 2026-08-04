"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locales";

type Category = "length" | "weight" | "temperature" | "volume";

const strings = {
  ko: {
    categories: {
      length: "길이",
      weight: "무게",
      temperature: "온도",
      volume: "부피",
    },
    value: "값",
  },
  en: {
    categories: {
      length: "Length",
      weight: "Weight",
      temperature: "Temperature",
      volume: "Volume",
    },
    value: "Value",
  },
} as const;

const unitLabels: Record<Locale, Record<Category, Record<string, string>>> = {
  ko: {
    length: { m: "미터 (m)", km: "킬로미터 (km)", cm: "센티미터 (cm)", mi: "마일 (mi)", ft: "피트 (ft)", in: "인치 (in)" },
    weight: { kg: "킬로그램 (kg)", g: "그램 (g)", lb: "파운드 (lb)", oz: "온스 (oz)" },
    temperature: { c: "섭씨 (°C)", f: "화씨 (°F)", k: "켈빈 (K)" },
    volume: { l: "리터 (L)", ml: "밀리리터 (mL)", gal: "갤런 (gal)", cup: "컵 (cup)" },
  },
  en: {
    length: { m: "Meters (m)", km: "Kilometers (km)", cm: "Centimeters (cm)", mi: "Miles (mi)", ft: "Feet (ft)", in: "Inches (in)" },
    weight: { kg: "Kilograms (kg)", g: "Grams (g)", lb: "Pounds (lb)", oz: "Ounces (oz)" },
    temperature: { c: "Celsius (°C)", f: "Fahrenheit (°F)", k: "Kelvin (K)" },
    volume: { l: "Liters (L)", ml: "Milliliters (mL)", gal: "Gallons (gal)", cup: "Cups (cup)" },
  },
};

// Base units: length -> meters, weight -> kg, volume -> liters
const toBase: Record<Exclude<Category, "temperature">, Record<string, number>> = {
  length: { m: 1, km: 1000, cm: 0.01, mi: 1609.344, ft: 0.3048, in: 0.0254 },
  weight: { kg: 1, g: 0.001, lb: 0.45359237, oz: 0.028349523125 },
  volume: { l: 1, ml: 0.001, gal: 3.785411784, cup: 0.2365882365 },
};

function convert(category: Category, from: string, to: string, value: number): number {
  if (category === "temperature") {
    let celsius: number;
    if (from === "c") celsius = value;
    else if (from === "f") celsius = ((value - 32) * 5) / 9;
    else celsius = value - 273.15;

    if (to === "c") return celsius;
    if (to === "f") return (celsius * 9) / 5 + 32;
    return celsius + 273.15;
  }
  const table = toBase[category];
  const base = value * table[from];
  return base / table[to];
}

export default function UnitConverter({ locale }: { locale: Locale }) {
  const [category, setCategory] = useState<Category>("length");
  const [value, setValue] = useState("1");
  const units = Object.keys(unitLabels[locale][category]);
  const [from, setFrom] = useState(units[0]);
  const [to, setTo] = useState(units[1] ?? units[0]);
  const t = strings[locale];

  const changeCategory = (c: Category) => {
    setCategory(c);
    const u = Object.keys(unitLabels[locale][c]);
    setFrom(u[0]);
    setTo(u[1] ?? u[0]);
  };

  const result = useMemo(() => {
    const n = parseFloat(value);
    if (isNaN(n)) return "";
    const r = convert(category, from, to, n);
    return Number(r.toFixed(6)).toString();
  }, [category, from, to, value]);

  const categories: Category[] = ["length", "weight", "temperature", "volume"];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => changeCategory(c)}
            className={`rounded-md px-3 py-1.5 text-sm border ${
              category === c
                ? "bg-slate-900 text-white border-slate-900"
                : "border-slate-300 hover:bg-slate-50"
            }`}
          >
            {t.categories[c]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
        <div>
          <label className="block text-xs text-slate-500 mb-1">{t.value}</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">{From(locale)}</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            {units.map((u) => (
              <option key={u} value={u}>
                {unitLabels[locale][category][u]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">{To(locale)}</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            {units.map((u) => (
              <option key={u} value={u}>
                {unitLabels[locale][category][u]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 rounded-md border border-slate-200 p-4 text-center">
        <div className="text-2xl font-bold text-slate-900">
          {result} {unitLabels[locale][category][to]}
        </div>
      </div>
    </div>
  );
}

function From(locale: Locale) {
  return locale === "ko" ? "변환 전" : "From";
}
function To(locale: Locale) {
  return locale === "ko" ? "변환 후" : "To";
}
