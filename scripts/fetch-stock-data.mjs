// Fetches monthly historical closing prices for a curated list of tickers
// from Yahoo Finance's public chart API and writes them to
// src/data/stock-prices.json for the "investment time machine" tool.
//
// This must be run somewhere with normal internet access (a developer
// machine or CI) — Yahoo Finance blocks CORS for browser calls, and some
// sandboxed environments block financial-data hosts outright. It's wired
// up to run automatically via .github/workflows/update-stock-data.yml.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TICKERS = [
  { symbol: "005930.KS", nameKo: "삼성전자", nameEn: "Samsung Electronics", market: "KR", currency: "KRW" },
  { symbol: "000660.KS", nameKo: "SK하이닉스", nameEn: "SK Hynix", market: "KR", currency: "KRW" },
  { symbol: "035420.KS", nameKo: "NAVER", nameEn: "NAVER", market: "KR", currency: "KRW" },
  { symbol: "035720.KS", nameKo: "카카오", nameEn: "Kakao", market: "KR", currency: "KRW" },
  { symbol: "005380.KS", nameKo: "현대차", nameEn: "Hyundai Motor", market: "KR", currency: "KRW" },
  { symbol: "069500.KS", nameKo: "KODEX 200 (코스피200 ETF)", nameEn: "KODEX 200 ETF", market: "KR", currency: "KRW" },
  { symbol: "360750.KS", nameKo: "TIGER 미국S&P500", nameEn: "TIGER US S&P500 ETF", market: "KR", currency: "KRW" },
  { symbol: "133690.KS", nameKo: "TIGER 미국나스닥100", nameEn: "TIGER US Nasdaq100 ETF", market: "KR", currency: "KRW" },
  { symbol: "AAPL", nameKo: "애플", nameEn: "Apple Inc.", market: "US", currency: "USD" },
  { symbol: "MSFT", nameKo: "마이크로소프트", nameEn: "Microsoft", market: "US", currency: "USD" },
  { symbol: "GOOGL", nameKo: "알파벳 (구글)", nameEn: "Alphabet (Google)", market: "US", currency: "USD" },
  { symbol: "AMZN", nameKo: "아마존", nameEn: "Amazon", market: "US", currency: "USD" },
  { symbol: "NVDA", nameKo: "엔비디아", nameEn: "NVIDIA", market: "US", currency: "USD" },
  { symbol: "TSLA", nameKo: "테슬라", nameEn: "Tesla", market: "US", currency: "USD" },
  { symbol: "META", nameKo: "메타 (페이스북)", nameEn: "Meta Platforms", market: "US", currency: "USD" },
  { symbol: "SPY", nameKo: "SPY (S&P500 ETF)", nameEn: "SPDR S&P 500 ETF", market: "US", currency: "USD" },
  { symbol: "QQQ", nameKo: "QQQ (나스닥100 ETF)", nameEn: "Invesco QQQ (Nasdaq100 ETF)", market: "US", currency: "USD" },
  { symbol: "VOO", nameKo: "VOO (S&P500 ETF)", nameEn: "Vanguard S&P 500 ETF", market: "US", currency: "USD" },
  { symbol: "BRK-B", nameKo: "버크셔 해서웨이", nameEn: "Berkshire Hathaway", market: "US", currency: "USD" },
];

async function fetchTicker(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
    symbol
  )}?range=25y&interval=1mo`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; toolbox-data-fetch/1.0)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  const result = json?.chart?.result?.[0];
  if (!result) throw new Error("no chart result");

  const timestamps = result.timestamp || [];
  const closes =
    result.indicators?.adjclose?.[0]?.adjclose ||
    result.indicators?.quote?.[0]?.close ||
    [];

  const prices = [];
  for (let i = 0; i < timestamps.length; i++) {
    const c = closes[i];
    // Skip nulls and non-positive/non-finite values — Yahoo's adjusted
    // close occasionally goes negative for very old data points around
    // extreme capital restructuring events (seen on 000660.KS in 2001-02).
    if (c == null || !(c > 0) || !isFinite(c)) continue;
    const d = new Date(timestamps[i] * 1000);
    const date = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getUTCDate()).padStart(2, "0")}`;
    prices.push({ date, close: Math.round(c * 100) / 100 });
  }
  return prices;
}

async function main() {
  const out = { generatedAt: new Date().toISOString(), tickers: {} };
  let failures = 0;

  for (const t of TICKERS) {
    process.stdout.write(`Fetching ${t.symbol}... `);
    try {
      const prices = await fetchTicker(t.symbol);
      out.tickers[t.symbol] = {
        nameKo: t.nameKo,
        nameEn: t.nameEn,
        market: t.market,
        currency: t.currency,
        prices,
      };
      console.log(`${prices.length} points`);
    } catch (e) {
      failures++;
      console.log(`FAILED (${e.message})`);
      // Keep any previously fetched data for this ticker rather than
      // wiping it out on a transient failure.
    }
    await new Promise((r) => setTimeout(r, 300));
  }

  const outPath = path.join(__dirname, "..", "src", "data", "stock-prices.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  // Merge with existing file so a transient failure on one ticker doesn't
  // delete previously fetched data for it.
  let existing = { tickers: {} };
  if (fs.existsSync(outPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(outPath, "utf-8"));
    } catch {
      // ignore unreadable existing file
    }
  }
  const merged = {
    generatedAt: out.generatedAt,
    tickers: { ...existing.tickers, ...out.tickers },
  };

  fs.writeFileSync(outPath, JSON.stringify(merged));
  console.log(`\nWrote ${outPath}`);

  if (failures === TICKERS.length) {
    console.error("All tickers failed to fetch.");
    process.exitCode = 1;
  }
}

main();
