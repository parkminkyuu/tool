"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locales";

const PYEONG_TO_SQM = 400 / 121; // 1 pyeong = 3.305785... m²

const strings = {
  ko: {
    pyeong: "평",
    sqm: "제곱미터 (m²)",
    commonSizes: "자주 찾는 아파트 평형",
    pyeongCol: "평",
    sqmCol: "전용면적 (m²)",
    note: "국민평형(84m²)은 약 25.4평입니다. 부동산 매물의 '공급면적'은 전용면적보다 커서 실제 체감 크기와 다를 수 있습니다.",
  },
  en: {
    pyeong: "Pyeong",
    sqm: "Square meters (m²)",
    commonSizes: "Common apartment sizes",
    pyeongCol: "Pyeong",
    sqmCol: "Exclusive area (m²)",
    note: "The most common Korean apartment size, 84m², is about 25.4 pyeong. Listed 'supply area' is usually larger than exclusive area, so actual usable space feels smaller.",
  },
} as const;

const commonPyeong = [10, 15, 18, 20, 24, 25, 30, 32, 33, 34, 40, 44, 50, 59, 84];

export default function PyeongSqmConverter({ locale }: { locale: Locale }) {
  const t = strings[locale];
  const [pyeong, setPyeong] = useState("34");
  const [sqm, setSqm] = useState(
    (parseFloat("34") * PYEONG_TO_SQM).toFixed(2)
  );

  const handlePyeongChange = (value: string) => {
    setPyeong(value);
    const n = parseFloat(value);
    setSqm(isNaN(n) ? "" : (n * PYEONG_TO_SQM).toFixed(2));
  };

  const handleSqmChange = (value: string) => {
    setSqm(value);
    const n = parseFloat(value);
    setPyeong(isNaN(n) ? "" : (n / PYEONG_TO_SQM).toFixed(2));
  };

  const table = useMemo(
    () =>
      commonPyeong.map((p) => ({
        pyeong: p,
        sqm: Math.round(p * PYEONG_TO_SQM * 10) / 10,
      })),
    []
  );

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-500 mb-1">{t.pyeong}</label>
          <input
            type="number"
            value={pyeong}
            onChange={(e) => handlePyeongChange(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">{t.sqm}</label>
          <input
            type="number"
            value={sqm}
            onChange={(e) => handleSqmChange(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500 leading-relaxed">{t.note}</p>

      <div className="mt-8">
        <h3 className="font-semibold text-slate-900 mb-3">{t.commonSizes}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="py-2 pr-4">{t.pyeongCol}</th>
                <th className="py-2">{t.sqmCol}</th>
              </tr>
            </thead>
            <tbody>
              {table.map((row) => (
                <tr key={row.pyeong} className="border-b border-slate-100">
                  <td className="py-2 pr-4 font-medium text-slate-900">
                    {row.pyeong}
                  </td>
                  <td className="py-2 text-slate-600">{row.sqm}m²</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
