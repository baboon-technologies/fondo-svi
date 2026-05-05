import type { Context } from '@netlify/functions';

interface QuoteResponse {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: string;
  currency: string;
  lastUpdate: string;
}

async function fetchYahooQuote(symbol: string): Promise<QuoteResponse> {
  const endpoints = [
    `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
    `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
    `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`,
  ];

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
  };

  for (const url of endpoints) {
    try {
      console.log(`[YAHOO-QUOTE] Trying endpoint: ${url}`);
      const response = await fetch(url, {
        headers,
        redirect: 'follow'
      });

      console.log(`[YAHOO-QUOTE] Response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[YAHOO-QUOTE] Error response: ${errorText}`);
        continue;
      }

      const data = await response.json();
      console.log(`[YAHOO-QUOTE] Response data:`, JSON.stringify(data).substring(0, 500));

      if (url.includes('/v8/finance/chart/')) {
        if (data.chart?.result && data.chart.result.length > 0) {
          const result = data.chart.result[0];
          const meta = result.meta;

          if (!meta.regularMarketPrice) {
            console.error('[YAHOO-QUOTE] No regularMarketPrice in meta');
            continue;
          }

          const regularMarketPrice = meta.regularMarketPrice;
          const previousClose = meta.previousClose || meta.chartPreviousClose;
          const regularMarketChange = regularMarketPrice - previousClose;
          const regularMarketChangePercent = (regularMarketChange / previousClose) * 100;
          const regularMarketTime = new Date(meta.regularMarketTime * 1000).toISOString();

          console.log(`[YAHOO-QUOTE] Success! Price: ${regularMarketPrice}`);

          return {
            symbol,
            regularMarketPrice: parseFloat(regularMarketPrice.toFixed(2)),
            regularMarketChange: parseFloat(regularMarketChange.toFixed(2)),
            regularMarketChangePercent: parseFloat(regularMarketChangePercent.toFixed(2)),
            regularMarketTime,
            currency: meta.currency || 'EUR',
            lastUpdate: new Date().toISOString(),
          };
        }
      } else if (url.includes('/v7/finance/quote')) {
        if (data.quoteResponse?.result && data.quoteResponse.result.length > 0) {
          const quote = data.quoteResponse.result[0];

          if (!quote.regularMarketPrice) {
            console.error('[YAHOO-QUOTE] No regularMarketPrice in quote');
            continue;
          }

          const regularMarketPrice = quote.regularMarketPrice;
          const previousClose = quote.regularMarketPreviousClose;
          const regularMarketChange = quote.regularMarketChange || (regularMarketPrice - previousClose);
          const regularMarketChangePercent = quote.regularMarketChangePercent || ((regularMarketChange / previousClose) * 100);
          const regularMarketTime = new Date(quote.regularMarketTime * 1000).toISOString();

          console.log(`[YAHOO-QUOTE] Success! Price: ${regularMarketPrice}`);

          return {
            symbol,
            regularMarketPrice: parseFloat(regularMarketPrice.toFixed(2)),
            regularMarketChange: parseFloat(regularMarketChange.toFixed(2)),
            regularMarketChangePercent: parseFloat(regularMarketChangePercent.toFixed(2)),
            regularMarketTime,
            currency: quote.currency || 'EUR',
            lastUpdate: new Date().toISOString(),
          };
        }
      }
    } catch (error) {
      console.error(`[YAHOO-QUOTE] Error with endpoint ${url}:`, error);
      continue;
    }
  }

  throw new Error('Failed to fetch quote from Yahoo Finance');
}

export default async (req: Request, context: Context) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const symbol = url.searchParams.get('symbol') || 'SVI.MC';

    console.log(`[YAHOO-QUOTE API] Request for symbol: ${symbol}`);

    const quoteData = await fetchYahooQuote(symbol);

    return new Response(JSON.stringify(quoteData), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60, s-maxage=60',
      },
    });
  } catch (error) {
    console.error('[YAHOO-QUOTE API] Error:', error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Failed to fetch quote',
        lastUpdate: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
};

export const config = {
  path: '/api/yahoo-quote',
};
