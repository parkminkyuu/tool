import rawData from "@/data/stock-prices.json";

export type PricePoint = { date: string; close: number };

export type TickerData = {
  nameKo: string;
  nameEn: string;
  market: "KR" | "US";
  currency: "KRW" | "USD";
  prices: PricePoint[];
};

type StockDataFile = {
  generatedAt: string | null;
  tickers: Record<string, TickerData>;
};

const data = rawData as StockDataFile;

export const generatedAt = data.generatedAt;

export const tickers: { symbol: string; data: TickerData }[] = Object.entries(
  data.tickers
).map(([symbol, tickerData]) => ({ symbol, data: tickerData }));

export function getTicker(symbol: string): TickerData | undefined {
  return data.tickers[symbol];
}

/** Latest available price point, or null if no data yet. */
export function getLatestPrice(ticker: TickerData): PricePoint | null {
  if (ticker.prices.length === 0) return null;
  return ticker.prices[ticker.prices.length - 1];
}

/** Earliest available price point, or null if no data yet. */
export function getEarliestPrice(ticker: TickerData): PricePoint | null {
  if (ticker.prices.length === 0) return null;
  return ticker.prices[0];
}

/**
 * Finds the price point on or before targetDate. Falls back to the
 * earliest point if targetDate predates all available data.
 */
export function findPriceOnOrBefore(
  ticker: TickerData,
  targetDate: Date
): PricePoint | null {
  if (ticker.prices.length === 0) return null;
  let candidate = ticker.prices[0];
  for (const p of ticker.prices) {
    if (new Date(p.date).getTime() <= targetDate.getTime()) {
      candidate = p;
    } else {
      break;
    }
  }
  return candidate;
}

/** How many whole years of history are available for this ticker. */
export function availableYears(ticker: TickerData): number {
  const earliest = getEarliestPrice(ticker);
  const latest = getLatestPrice(ticker);
  if (!earliest || !latest) return 0;
  const years =
    (new Date(latest.date).getTime() - new Date(earliest.date).getTime()) /
    (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(years);
}
