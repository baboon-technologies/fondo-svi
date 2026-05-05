import { NextResponse } from 'next/server';

const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60000;

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get('ticker');

  if (!ticker) {
    return NextResponse.json({ error: 'Ticker is required' }, { status: 400 });
  }

  const now = Date.now();
  const cached = cache.get(ticker);

  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json(cached.data);
  }

  let data: any = null;
  let lastError = '';

  for (const host of ['query1', 'query2']) {
    try {
      data = await fetchYahoo(
        `https://${host}.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}`
      );
      break;
    } catch (e: any) {
      lastError = e?.message ?? String(e);
    }
  }

  if (!data) {
    if (cached) return NextResponse.json({ ...cached.data, stale: true });
    return NextResponse.json({ error: `No disponible temporalmente (${lastError})` }, { status: 500 });
  }

  try {
    const result = data?.chart?.result?.[0];
    if (!result) throw new Error('Empty result');

    const meta = result.meta;
    const currentPrice: number = meta.regularMarketPrice;
    const previousClose: number = meta.chartPreviousClose;
    const change = currentPrice - previousClose;
    const changePercent = (change / previousClose) * 100;

    const quoteData = {
      price: currentPrice.toFixed(4),
      change: change.toFixed(4),
      changePercent: changePercent.toFixed(2),
      currency: meta.currency,
      timestamp: new Date().toISOString(),
    };

    cache.set(ticker, { data: quoteData, timestamp: now });
    return NextResponse.json(quoteData);
  } catch (e: any) {
    if (cached) return NextResponse.json({ ...cached.data, stale: true });
    return NextResponse.json({ error: 'Error al procesar datos' }, { status: 500 });
  }
}
