"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locales";
import {
  tickers,
  getTicker,
  getLatestPrice,
  findPriceOnOrBefore,
  availableYears,
  generatedAt,
} from "@/lib/stock-data";

const strings = {
  ko: {
    ticker: "종목 선택",
    krGroup: "국내 (KOSPI)",
    usGroup: "해외 (US)",
    amount: "투자금액",
    yearsAgo: "투자 시점",
    yearsAgoSuffix: "년 전",
    thenPrice: "그때 가격",
    nowPrice: "현재 가격",
    shares: "매수 수량 (소수점 포함 가정)",
    currentValue: "현재 평가금액",
    profit: "손익",
    returnRate: "총 수익률",
    cagr: "연평균 수익률 (CAGR)",
    dataAsOf: "데이터 기준일",
    noData: "이 종목의 데이터가 아직 준비되지 않았습니다. 곧 업데이트됩니다.",
    usedEarliest: (year: string) =>
      `선택한 시점보다 데이터가 짧아 가장 이른 시점(${year})의 가격을 사용했습니다.`,
    disclaimer:
      "월별 종가 기준의 단순 참고용 계산이며, 배당 재투자·세금·환전 수수료·매매 수수료는 반영되지 않았습니다. 실제 투자 성과와 다를 수 있으며 투자 조언이 아닙니다.",
  },
  en: {
    ticker: "Choose a ticker",
    krGroup: "Korea (KOSPI)",
    usGroup: "United States",
    amount: "Investment amount",
    yearsAgo: "Investment date",
    yearsAgoSuffix: "years ago",
    thenPrice: "Price back then",
    nowPrice: "Current price",
    shares: "Shares bought (fractional assumed)",
    currentValue: "Current value",
    profit: "Profit / loss",
    returnRate: "Total return",
    cagr: "Annualized return (CAGR)",
    dataAsOf: "Data as of",
    noData: "Data for this ticker isn't ready yet. Check back soon.",
    usedEarliest: (year: string) =>
      `Data doesn't go back that far, so the earliest available date (${year}) was used instead.`,
    disclaimer:
      "This is a simple reference calculation based on monthly closing prices. It does not account for dividend reinvestment, taxes, currency conversion fees, or trading fees, and is not investment advice.",
  },
} as const;

const YEAR_PRESETS = [1, 3, 5, 10, 15, 20, 25];

function formatMoney(n: number, currency: "KRW" | "USD") {
  return n.toLocaleString(undefined, {
    maximumFractionDigits: currency === "KRW" ? 0 : 2,
  });
}

export default function InvestmentTimeMachine({ locale }: { locale: Locale }) {
  const t = strings[locale];
  const [symbol, setSymbol] = useState(tickers[0]?.symbol ?? "");
  const [amount, setAmount] = useState("1000000");
  const [yearsAgo, setYearsAgo] = useState(10);

  const ticker = getTicker(symbol);
  const krTickers = tickers.filter((x) => x.data.market === "KR");
  const usTickers = tickers.filter((x) => x.data.market === "US");
  const maxYears = ticker ? availableYears(ticker) : 0;
  const yearOptions = YEAR_PRESETS.filter((y) => y <= Math.max(maxYears, 1));

  const result = useMemo(() => {
    const ticker = getTicker(symbol);
    if (!ticker) return null;
    const latest = getLatestPrice(ticker);
    if (!latest) return null;

    const target = new Date();
    target.setFullYear(target.getFullYear() - yearsAgo);
    const then = findPriceOnOrBefore(ticker, target);
    if (!then) return null;

    const invested = parseFloat(amount);
    if (isNaN(invested) || invested <= 0) return null;

    const shares = invested / then.close;
    const currentValue = shares * latest.close;
    const profit = currentValue - invested;
    const returnRate = (profit / invested) * 100;

    const actualYears =
      (new Date(latest.date).getTime() - new Date(then.date).getTime()) /
      (1000 * 60 * 60 * 24 * 365.25);
    const cagr =
      actualYears > 0
        ? (Math.pow(currentValue / invested, 1 / actualYears) - 1) * 100
        : 0;

    const usedEarliestFallback =
      new Date(then.date).getTime() > target.getTime() + 1000 * 60 * 60 * 24 * 45;

    return { then, latest, shares, currentValue, profit, returnRate, cagr, usedEarliestFallback };
  }, [symbol, amount, yearsAgo]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-500 mb-1">{t.ticker}</label>
          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <optgroup label={t.krGroup}>
              {krTickers.map((x) => (
                <option key={x.symbol} value={x.symbol}>
                  {locale === "ko" ? x.data.nameKo : x.data.nameEn}
                </option>
              ))}
            </optgroup>
            <optgroup label={t.usGroup}>
              {usTickers.map((x) => (
                <option key={x.symbol} value={x.symbol}>
                  {locale === "ko" ? x.data.nameKo : x.data.nameEn} ({x.symbol})
                </option>
              ))}
            </optgroup>
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">
            {t.amount} ({ticker?.currency})
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="block text-xs text-slate-500 mb-1">{t.yearsAgo}</label>
        <div className="flex flex-wrap gap-2">
          {yearOptions.map((y) => (
            <button
              key={y}
              onClick={() => setYearsAgo(y)}
              className={`rounded-md px-3 py-1.5 text-sm border ${
                yearsAgo === y
                  ? "bg-slate-900 text-white border-slate-900"
                  : "border-slate-300 hover:bg-slate-50"
              }`}
            >
              {y}
              {t.yearsAgoSuffix}
            </button>
          ))}
        </div>
      </div>

      {!ticker || maxYears === 0 ? (
        <p className="mt-6 text-sm text-slate-500">{t.noData}</p>
      ) : result ? (
        <>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-md border border-slate-200 p-3 text-center">
              <div className="text-sm font-semibold text-slate-900">
                {formatMoney(result.then.close, ticker.currency)}
              </div>
              <div className="text-xs text-slate-500 mt-1">{t.thenPrice}</div>
            </div>
            <div className="rounded-md border border-slate-200 p-3 text-center">
              <div className="text-sm font-semibold text-slate-900">
                {formatMoney(result.latest.close, ticker.currency)}
              </div>
              <div className="text-xs text-slate-500 mt-1">{t.nowPrice}</div>
            </div>
            <div className="rounded-md border border-slate-200 p-3 text-center">
              <div className="text-sm font-semibold text-slate-900">
                {result.shares.toLocaleString(undefined, { maximumFractionDigits: 4 })}
              </div>
              <div className="text-xs text-slate-500 mt-1">{t.shares}</div>
            </div>
            <div className="rounded-md border border-slate-200 p-3 text-center">
              <div className="text-sm font-semibold text-slate-900">
                {formatMoney(result.currentValue, ticker.currency)}
              </div>
              <div className="text-xs text-slate-500 mt-1">{t.currentValue}</div>
            </div>
          </div>

          <div className="mt-4 rounded-md border border-slate-200 p-6 text-center">
            <div
              className={`text-3xl font-extrabold ${
                result.profit >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {result.profit >= 0 ? "+" : ""}
              {formatMoney(result.profit, ticker.currency)} {ticker.currency}
            </div>
            <div className="text-sm text-slate-500 mt-1">
              {t.profit} ({result.returnRate >= 0 ? "+" : ""}
              {result.returnRate.toFixed(1)}% {t.returnRate})
            </div>
            <div className="text-xs text-slate-400 mt-2">
              {t.cagr}: {result.cagr >= 0 ? "+" : ""}
              {result.cagr.toFixed(1)}%
            </div>
          </div>

          {result.usedEarliestFallback && (
            <p className="mt-3 text-xs text-amber-600">
              {t.usedEarliest(result.then.date.slice(0, 7))}
            </p>
          )}
        </>
      ) : null}

      {generatedAt && (
        <p className="mt-4 text-xs text-slate-400">
          {t.dataAsOf}: {generatedAt.slice(0, 10)}
        </p>
      )}

      <p className="mt-2 text-xs text-slate-500 leading-relaxed">{t.disclaimer}</p>
    </div>
  );
}
