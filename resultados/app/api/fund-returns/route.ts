import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const revalidate = 1800;

const DEFAULT_TICKER = '0P0001TB5J.F';

const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 1800000; // 30 min

const YAHOO_HEADERS: Record<string, string> = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
  'Referer': 'https://finance.yahoo.com/',
  'Cache-Control': 'no-cache',
};

async function fetchYahoo(url: string) {
  const res = await fetch(url, { headers: YAHOO_HEADERS, cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

interface SeriesPoint {
  ts: number; // seconds
  close: number;
}

/** Formats a percentage with 1 decimal and Spanish decimal comma. */
function fmtPct(value: number, withSign: boolean): string {
  const abs = Math.abs(value).toFixed(1).replace('.', ',');
  if (value < 0) return `-${abs}%`;
  return withSign ? `+${abs}%` : `${abs}%`;
}

/** Most recent point whose timestamp (ms) is <= targetMs, or null. */
function baseAtOrBefore(series: SeriesPoint[], targetMs: number): SeriesPoint | null {
  let base: SeriesPoint | null = null;
  for (const p of series) {
    if (p.ts * 1000 <= targetMs) base = p;
    else break;
  }
  return base;
}

/** Total return + CAGR over `years` years ending at the last point, or null if not enough history. */
function periodReturn(series: SeriesPoint[], years: number): { total: number; cagr: number } | null {
  if (series.length < 2) return null;
  const last = series[series.length - 1];
  const target = new Date(last.ts * 1000);
  target.setUTCFullYear(target.getUTCFullYear() - years);
  const base = baseAtOrBefore(series, target.getTime());
  if (!base || base.ts === last.ts) return null;
  const ratio = last.close / base.close;
  const yearsExact = (last.ts - base.ts) / (365.25 * 24 * 3600);
  return {
    total: (ratio - 1) * 100,
    cagr: (Math.pow(ratio, 1 / yearsExact) - 1) * 100,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get('ticker') || DEFAULT_TICKER;

  const now = Date.now();
  const cached = cache.get(ticker);
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json(cached.data);
  }

  let data: any = null;
  for (const host of ['query1', 'query2']) {
    try {
      data = await fetchYahoo(
        `https://${host}.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=max`
      );
      break;
    } catch {
      // try next host
    }
  }

  if (!data) {
    if (cached) return NextResponse.json({ ...cached.data, stale: true });
    return NextResponse.json({ error: 'No disponible temporalmente' }, { status: 500 });
  }

  try {
    const result = data?.chart?.result?.[0];
    if (!result) throw new Error('Empty result');

    const timestamps: number[] = result.timestamp ?? [];
    const closes: (number | null)[] = result.indicators?.quote?.[0]?.close ?? [];
    const meta = result.meta;

    const series: SeriesPoint[] = timestamps
      .map((ts, i) => ({ ts, close: closes[i] }))
      .filter((p): p is SeriesPoint => p.close !== null && p.close !== undefined && !isNaN(p.close));

    if (series.length === 0) throw new Error('Empty series');

    const last = series[series.length - 1];
    const lastPrice: number = meta?.regularMarketPrice ?? last.close;

    // Replace the last close with the live NAV so intraday updates are reflected
    const liveSeries: SeriesPoint[] = [...series.slice(0, -1), { ts: last.ts, close: lastPrice }];

    // YTD: vs last close of the previous year
    const lastDate = new Date(last.ts * 1000);
    const jan1Ms = Date.UTC(lastDate.getUTCFullYear(), 0, 1);
    const ytdBase = baseAtOrBefore(liveSeries, jan1Ms - 1);
    const ytd = ytdBase ? (lastPrice / ytdBase.close - 1) * 100 : null;

    const y1 = periodReturn(liveSeries, 1);
    const y3 = periodReturn(liveSeries, 3);
    const y5 = periodReturn(liveSeries, 5);

    const previousClose: number = meta?.chartPreviousClose ?? lastPrice;
    const change = lastPrice - previousClose;
    const changePercent = previousClose !== 0 ? (change / previousClose) * 100 : 0;

    const payload = {
      // NAV block (same shape as /api/yahoo-quote) so the card can also feed from here
      nav: lastPrice.toFixed(4),
      change: change.toFixed(4),
      changePercent: changePercent.toFixed(2),
      currency: meta?.currency ?? 'EUR',
      date: lastDate.toISOString().split('T')[0],
      timestamp: new Date().toISOString(),
      // Period returns, formatted in Spanish (null = not enough history)
      returns: {
        ytd: ytd !== null ? fmtPct(ytd, true) : null,
        y1: y1 ? fmtPct(y1.total, true) : null,
        y3: y3 ? `${fmtPct(y3.total, false)} (${fmtPct(y3.cagr, false)} anualizado)` : null,
        y5: y5 ? `${fmtPct(y5.total, false)} (${fmtPct(y5.cagr, false)} anualizado)` : null,
      },
    };

    cache.set(ticker, { data: payload, timestamp: now });
    return NextResponse.json(payload);
  } catch {
    if (cached) return NextResponse.json({ ...cached.data, stale: true });
    return NextResponse.json({ error: 'Error al procesar datos' }, { status: 500 });
  }
}
