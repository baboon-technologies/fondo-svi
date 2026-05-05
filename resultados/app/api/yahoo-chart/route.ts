import { NextResponse } from 'next/server';

const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 300000;

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
  const ticker = searchParams.get('ticker') || '0P0001TB5J.F';

  const now = Date.now();
  const cached = cache.get(ticker);

  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json(cached.data);
  }

  let data: any = null;

  for (const host of ['query1', 'query2']) {
    try {
      data = await fetchYahoo(
        `https://${host}.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=1y`
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

    const timestamps: number[] = result.timestamp;
    const closes: (number | null)[] = result.indicators.quote[0].close;
    const meta = result.meta;

    const points = timestamps
      .map((ts, i) => ({
        date: new Date(ts * 1000).toISOString().split('T')[0],
        value: closes[i],
      }))
      .filter((p): p is { date: string; value: number } =>
        p.value !== null && p.value !== undefined && !isNaN(p.value)
      );

    const chartData = {
      points,
      currency: meta.currency,
      currentPrice: meta.regularMarketPrice,
    };

    cache.set(ticker, { data: chartData, timestamp: now });
    return NextResponse.json(chartData);
  } catch {
    if (cached) return NextResponse.json({ ...cached.data, stale: true });
    return NextResponse.json({ error: 'Error al procesar datos' }, { status: 500 });
  }
}
