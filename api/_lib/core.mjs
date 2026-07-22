// Pure ESM data layer shared by the Vercel serverless functions (api/*.js)
// and the Vite dev server plugin (vite.config.ts). No dependencies, no keys.

const TIMEOUT_MS = 8000;

// NOTE: the full Chrome desktop UA string gets 429-throttled by Yahoo's edge
// (verified 2026-07-22); the generic browser UA passes consistently.
const BROWSER_UA = 'Mozilla/5.0';

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function stripCdata(text) {
  return text.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '');
}

function stripHtml(text) {
  return decodeEntities(text.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

export async function getYahooQuote(symbol) {
  try {
    const path = `/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1y`;
    const headers = { 'User-Agent': BROWSER_UA, Accept: 'application/json' };

    let response;
    try {
      response = await fetchWithTimeout(`https://query1.finance.yahoo.com${path}`, { headers });
      if (!response.ok) throw new Error(`query1 HTTP ${response.status}`);
    } catch {
      response = await fetchWithTimeout(`https://query2.finance.yahoo.com${path}`, { headers });
      if (!response.ok) throw new Error(`query2 HTTP ${response.status}`);
    }

    const json = await response.json();
    const result = json?.chart?.result?.[0];
    if (!result || !result.meta) {
      throw new Error('Unexpected Yahoo Finance response shape');
    }

    const meta = result.meta;
    const timestamps = Array.isArray(result.timestamp) ? result.timestamp : [];
    const closes = result?.indicators?.quote?.[0]?.close ?? [];

    const chartData = [];
    for (let i = 0; i < timestamps.length; i++) {
      const close = closes[i];
      if (close === null || close === undefined || !Number.isFinite(close)) continue;
      chartData.push({
        date: new Date(timestamps[i] * 1000).toISOString().slice(0, 10),
        price: Number(close.toFixed(3)),
      });
    }

    let regularMarketPrice = meta.regularMarketPrice;
    if (!Number.isFinite(regularMarketPrice) && chartData.length > 0) {
      regularMarketPrice = chartData[chartData.length - 1].price;
    }
    if (!Number.isFinite(regularMarketPrice) || chartData.length === 0) {
      throw new Error('No price data available');
    }

    // meta.previousClose is often missing for funds, and chartPreviousClose is
    // the close BEFORE the 1y range (i.e. ~1 year ago), which would show the
    // yearly change as if it were daily. Derive it from the chart instead: if
    // the last chart point is the same day as the current price, use the
    // second-to-last close; otherwise use the last close.
    const marketDate = Number.isFinite(meta.regularMarketTime)
      ? new Date(meta.regularMarketTime * 1000).toISOString().slice(0, 10)
      : null;
    const lastPoint = chartData[chartData.length - 1];
    let chartPrevClose;
    if (marketDate && lastPoint.date === marketDate && chartData.length >= 2) {
      chartPrevClose = chartData[chartData.length - 2].price;
    } else {
      chartPrevClose = lastPoint.price;
    }
    const previousClose =
      meta.previousClose ?? chartPrevClose ?? meta.chartPreviousClose;

    let change = 0;
    let changePercent = 0;
    if (Number.isFinite(previousClose) && previousClose !== 0) {
      change = regularMarketPrice - previousClose;
      changePercent = (change / previousClose) * 100;
    }

    const lastUpdate = Number.isFinite(meta.regularMarketTime)
      ? new Date(meta.regularMarketTime * 1000).toISOString()
      : new Date().toISOString();

    return {
      status: 200,
      body: {
        symbol,
        regularMarketPrice,
        regularMarketChange: change,
        regularMarketChangePercent: changePercent,
        currency: meta.currency || 'EUR',
        chartData,
        lastUpdate,
      },
    };
  } catch (err) {
    return {
      status: 502,
      body: { error: `Failed to fetch quote: ${err instanceof Error ? err.message : String(err)}` },
    };
  }
}

const YOUTUBE_CHANNEL_ID = 'UCx07t1GEqzzPjdZMXjJmAKA';

export async function getLatestYouTube() {
  try {
    const response = await fetchWithTimeout(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`,
      { headers: { 'User-Agent': BROWSER_UA } }
    );
    if (!response.ok) throw new Error(`YouTube RSS HTTP ${response.status}`);

    const xml = await response.text();
    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];

    for (const entry of entries) {
      const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const rawTitle = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1];
      if (!videoId || !rawTitle) continue;

      const title = decodeEntities(stripCdata(rawTitle.trim()));
      if (/#short/i.test(title)) continue;

      const published = entry.match(/<published>([^<]+)<\/published>/)?.[1] || '';
      const rawDescription =
        entry.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] || '';
      const thumbnail =
        entry.match(/<media:thumbnail[^>]*url="([^"]+)"/)?.[1] ||
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      return {
        status: 200,
        body: {
          videoId,
          title,
          description: decodeEntities(stripCdata(rawDescription.trim())),
          thumbnail,
          publishedAt: published,
        },
      };
    }

    throw new Error('No valid video entries found in feed');
  } catch (err) {
    return {
      status: 502,
      body: { error: `Failed to fetch YouTube video: ${err instanceof Error ? err.message : String(err)}` },
    };
  }
}

export async function getLatestSubstack() {
  try {
    const response = await fetchWithTimeout('https://svinvesting.substack.com/feed', {
      headers: { 'User-Agent': BROWSER_UA },
    });
    if (!response.ok) throw new Error(`Substack feed HTTP ${response.status}`);

    const xml = await response.text();
    const item = xml.match(/<item>[\s\S]*?<\/item>/)?.[0];
    if (!item) throw new Error('No items found in feed');

    const rawTitle = item.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '';
    const title = decodeEntities(stripCdata(rawTitle.trim()));

    const rawLink = item.match(/<link>([\s\S]*?)<\/link>/)?.[1] || '';
    const link = stripCdata(rawLink.trim());

    const pubDate = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]?.trim() || '';

    const rawDescription = item.match(/<description>([\s\S]*?)<\/description>/)?.[1] || '';
    let description = stripHtml(stripCdata(rawDescription.trim()));
    if (description.length > 300) {
      description = `${description.slice(0, 300)}…`;
    }

    let image = item.match(/<enclosure[^>]*url="([^"]+)"/)?.[1] || '';
    if (!image) {
      const content = item.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/)?.[1] || '';
      image = stripCdata(content).match(/<img[^>]*src="([^"]+)"/)?.[1] || '';
    }

    if (!title || !link) throw new Error('Incomplete item in feed');

    return {
      status: 200,
      body: { title, link, pubDate, description, image },
    };
  } catch (err) {
    return {
      status: 502,
      body: { error: `Failed to fetch Substack post: ${err instanceof Error ? err.message : String(err)}` },
    };
  }
}
