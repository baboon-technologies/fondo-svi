const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  image?: string;
}

function parseRSSFeed(xmlText: string): SubstackPost | null {
  try {
    console.log('[Substack RSS] Starting feed parsing...');

    const itemMatch = xmlText.match(/<item[^>]*>([\s\S]*?)<\/item>/);
    if (!itemMatch) {
      console.error('[Substack RSS] No <item> tag found in feed');
      return null;
    }

    const item = itemMatch[1];
    console.log('[Substack RSS] Found first item in feed');

    const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
                       item.match(/<title>(.*?)<\/title>/);
    const linkMatch = item.match(/<link>(.*?)<\/link>/);
    const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
    const descriptionMatch = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) ||
                            item.match(/<description>(.*?)<\/description>/s);

    const imageMatch = item.match(/<media:content[^>]*url="([^"]+)"/i) ||
                       item.match(/<enclosure[^>]*url="([^"]+)"[^>]*type="image/i) ||
                       item.match(/<media:thumbnail[^>]*url="([^"]+)"/i) ||
                       item.match(/<img[^>]*src="([^"]+)"/i);

    const title = titleMatch ? titleMatch[1].trim() : 'Newsletter de SVI';
    const link = linkMatch ? linkMatch[1].trim() : 'https://svinvesting.substack.com';
    const pubDate = pubDateMatch ? pubDateMatch[1].trim() : '';
    const description = descriptionMatch ? descriptionMatch[1] : '';
    const image = imageMatch ? imageMatch[1] : undefined;

    console.log('[Substack RSS] Parsed post:', {
      title,
      link,
      pubDate,
      hasImage: !!image,
      imageUrl: image
    });

    if (!image) {
      console.warn('[Substack RSS] No image found for latest post');
    }

    const cleanDescription = description
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 300);

    return {
      title,
      link,
      pubDate,
      description: cleanDescription,
      image,
    };
  } catch (error) {
    console.error('[Substack RSS] Error parsing RSS feed:', error);
    return null;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    console.log('[Substack Feed] Fetching RSS feed from: https://svinvesting.substack.com/feed');

    const response = await fetch('https://svinvesting.substack.com/feed');

    if (!response.ok) {
      console.error('[Substack Feed] HTTP error:', response.status);
      throw new Error(`Failed to fetch RSS feed: ${response.status}`);
    }

    console.log('[Substack Feed] Feed fetched successfully, parsing XML...');
    const xmlText = await response.text();
    const latestPost = parseRSSFeed(xmlText);

    if (!latestPost) {
      console.error('[Substack Feed] Failed to parse any posts from feed');
      throw new Error('No posts found in feed');
    }

    console.log('[Substack Feed] Successfully parsed latest post:', latestPost.title);

    return new Response(
      JSON.stringify(latestPost),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('[Substack Feed] Error fetching Substack feed:', error);

    return new Response(
      JSON.stringify({
        error: 'Failed to fetch latest post',
        message: error instanceof Error ? error.message : 'Unknown error'
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
});
