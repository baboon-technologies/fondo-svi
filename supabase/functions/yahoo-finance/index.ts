import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ChartDataPoint {
  date: string;
  price: number;
  timestamp: number;
}

// Función para intentar obtener datos de Yahoo Finance
async function fetchFromYahoo(symbol: string): Promise<any> {
  const period1 = Math.floor(Date.now() / 1000) - (365 * 24 * 60 * 60);
  const period2 = Math.floor(Date.now() / 1000);

  const endpoints = [
    `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${period1}&period2=${period2}&interval=1d`,
    `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${period1}&period2=${period2}&interval=1d`,
  ];

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Referer': 'https://finance.yahoo.com/',
    'Origin': 'https://finance.yahoo.com',
    'Connection': 'keep-alive',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
  };

  for (const url of endpoints) {
    try {
      console.log(`[YAHOO] Trying endpoint: ${url}`);
      const response = await fetch(url, { headers });

      console.log(`[YAHOO] Status: ${response.status}`);

      if (response.ok) {
        const data = await response.json();
        if (data.chart?.result && data.chart.result.length > 0) {
          console.log(`[YAHOO] Success! Got ${data.chart.result[0].timestamp?.length || 0} data points`);
          return data;
        }
      }
    } catch (error) {
      console.error(`[YAHOO] Error with endpoint ${url}:`, error);
      continue;
    }
  }

  throw new Error("All Yahoo Finance endpoints failed");
}

// Parsear datos de Yahoo Finance
function parseYahooData(data: any, symbol: string) {
  if (!data.chart || !data.chart.result || data.chart.result.length === 0) {
    throw new Error("Invalid Yahoo Finance data structure");
  }

  const result = data.chart.result[0];
  const timestamps = result.timestamp || [];
  const quotes = result.indicators.quote[0];
  const closePrices = quotes.close || [];

  const chartData: ChartDataPoint[] = timestamps
    .map((timestamp: number, index: number) => {
      const price = closePrices[index];
      if (price === null || price === undefined) return null;

      return {
        date: new Date(timestamp * 1000).toISOString().split('T')[0],
        price: parseFloat(price.toFixed(2)),
        timestamp: timestamp
      };
    })
    .filter((item: ChartDataPoint | null) => item !== null);

  if (chartData.length === 0) {
    throw new Error("No valid price data found");
  }

  const currentPrice = chartData[chartData.length - 1]?.price || 0;
  const startPrice = chartData[0]?.price || 0;
  const change = currentPrice - startPrice;
  const changePercent = startPrice > 0 ? ((change / startPrice) * 100).toFixed(2) : "0";

  return {
    symbol,
    currentPrice,
    change: parseFloat(change.toFixed(2)),
    changePercent: parseFloat(changePercent),
    chartData,
    dataPoints: chartData.length,
    lastUpdate: new Date().toISOString(),
    source: 'yahoo'
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  const symbol = "0P0001TB5J.F";
  console.log(`[API] Request received for symbol: ${symbol}`);

  try {
    // Intentar obtener datos de Yahoo Finance
    const yahooData = await fetchFromYahoo(symbol);
    const parsedData = parseYahooData(yahooData, symbol);

    console.log(`[API] Successfully fetched data:`, {
      currentPrice: parsedData.currentPrice,
      dataPoints: parsedData.dataPoints,
      change: parsedData.change
    });

    return new Response(
      JSON.stringify(parsedData),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300, s-maxage=300"
        },
      }
    );
  } catch (error) {
    console.error("[API] Error fetching data:", error);

    // En caso de error, devolver datos fallback con estructura correcta
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to fetch financial data",
        symbol,
        currentPrice: 9.12,
        change: -0.18,
        changePercent: -1.94,
        chartData: [],
        dataPoints: 0,
        lastUpdate: new Date().toISOString(),
        source: 'fallback'
      }),
      {
        status: 200, // Devolver 200 para que el cliente pueda mostrar el fallback
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
