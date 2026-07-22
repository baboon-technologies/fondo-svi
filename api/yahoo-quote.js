import { getYahooQuote } from './_lib/core.mjs';

export default async function handler(req, res) {
  const url = new URL(req.url, 'http://x');
  const symbol = url.searchParams.get('symbol') || '0P0001TB5J.F';

  const { status, body } = await getYahooQuote(symbol);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
  res.status(status).json(body);
}
