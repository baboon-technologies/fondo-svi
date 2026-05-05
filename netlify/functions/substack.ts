import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;

  if (!supabaseUrl) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing Supabase URL' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/substack-latest`);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    };
  } catch (error) {
    console.error('Error fetching Substack data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch Substack data',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};

export { handler };
