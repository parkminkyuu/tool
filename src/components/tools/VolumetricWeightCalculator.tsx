"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locales";

const strings = {
  ko: {
    width: "가로 (cm)",
    length: "세로 (cm)",
    height: "높이 (cm)",
    actualWeight: "실측 무게 (kg, 선택)",
    divisor: "환산 계수",
    volumetricWeight: "부피무게",
    chargeableWeight: "적용 무게 (청구 기준)",
    note: "부피무게 = (가로×세로×높이) ÷ 환산계수. 국제택배·항공특송은 보통 6000을 사용하지만, 국내 택배사나 화물 종류에 따라 5000을 쓰기도 하므로 실제 이용하는 업체의 기준을 확인하세요. 실측 무게와 부피무게 중 더 큰 값이 배송비 산정에 적용되는 경우가 많습니다.",
  },
  en: {
    width: "Width (cm)",
    length: "Length (cm)",
    height: "Height (cm)",
    actualWeight: "Actual weight (kg, optional)",
    divisor: "Divisor",
    volumetricWeight: "Volumetric weight",
    chargeableWeight: "Chargeable weight (billing basis)",
    note: "Volumetric weight = (width × length × height) ÷ divisor. International couriers usually use 6000, but some domestic carriers or cargo types use 5000 — check your carrier's own standard. Shipping cost is usually based on whichever is larger: actual weight or volumetric weight.",
  },
} as const;

export default function VolumetricWeightCalculator({ locale }: { locale: Locale }) {
  const t = strings[locale];
  const [width, setWidth] = useState("40");
  const [length, setLength] = useState("30");
  const [height, setHeight] = useState("20");
  const [actualWeight, setActualWeight] = useState("");
  const [divisor, setDivisor] = useState("6000");

  const result = useMemo(() => {
    const w = parseFloat(width);
    const l = parseFloat(length);
    const h = parseFloat(height);
    const d = parseFloat(divisor);
    if ([w, l, h, d].some((n) => isNaN(n) || n <= 0)) return null;

    const volumetric = Math.round(((w * l * h) / d) * 100) / 100;
    const actual = parseFloat(actualWeight);
    const chargeable = !isNaN(actual) ? Math.max(actual, volumetric) : volumetric;

    return { volumetric, chargeable };
  }, [width, length, height, actualWeight, divisor]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-slate-500 mb-1">{t.width}</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">{t.length}</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">{t.height}</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-500 mb-1">{t.actualWeight}</label>
          <input
            type="number"
            value={actualWeight}
            onChange={(e) => setActualWeight(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">{t.divisor}</label>
          <select
            value={divisor}
            onChange={(e) => setDivisor(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value="6000">6000 ({locale === "ko" ? "국제/항공특송" : "international/air"})</option>
            <option value="5000">5000 ({locale === "ko" ? "국내 일부 업체" : "some domestic carriers"})</option>
          </select>
        </div>
      </div>

      {result && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-md border border-slate-200 p-4 text-center">
            <div className="text-2xl font-extrabold text-slate-900">
              {result.volumetric.toLocaleString()}
              <span className="text-base font-normal text-slate-500 ml-1">kg</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">{t.volumetricWeight}</div>
          </div>
          <div className="rounded-md border border-slate-200 p-4 text-center">
            <div className="text-2xl font-extrabold text-slate-900">
              {result.chargeable.toLocaleString()}
              <span className="text-base font-normal text-slate-500 ml-1">kg</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">{t.chargeableWeight}</div>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-slate-500 leading-relaxed">{t.note}</p>
    </div>
  );
}
