import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = "UCx07t1GEqzzPjdZMXjJmAKA";

  console.log("=== YOUTUBE FUNCTION DEBUG ===");
  console.log("YouTube API key exists:", !!apiKey);
  console.log("YouTube CHANNEL_ID:", channelId);

  if (!apiKey) {
    console.error("ERROR: Missing YOUTUBE_API_KEY environment variable");
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Missing YOUTUBE_API_KEY',
        debug: 'API key not found in environment variables'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }

  if (!channelId) {
    console.error("ERROR: Missing CHANNEL_ID");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing CHANNEL_ID' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }

  try {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1&type=video`;
    console.log("YouTube request URL (without key):", `https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&part=snippet,id&order=date&maxResults=1&type=video`);

    const searchResponse = await fetch(searchUrl);

    console.log("Search API response status:", searchResponse.status);
    console.log("Search API response status text:", searchResponse.statusText);

    if (!searchResponse.ok) {
      const errorBody = await searchResponse.text();
      console.error("Search API error response body:", errorBody);

      console.log("Attempting fallback: channels + uploads playlist");

      const channelsUrl = `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&id=${channelId}&part=snippet,contentDetails`;
      console.log("Channels request URL (without key):", `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&part=snippet,contentDetails`);

      const channelsResponse = await fetch(channelsUrl);
      console.log("Channels API response status:", channelsResponse.status);

      if (!channelsResponse.ok) {
        const channelsErrorBody = await channelsResponse.text();
        console.error("Channels API error response body:", channelsErrorBody);
        throw new Error(`YouTube channels API failed: ${channelsResponse.status} ${channelsResponse.statusText} - ${channelsErrorBody}`);
      }

      const channelsData = await channelsResponse.json();

      if (!channelsData.items || channelsData.items.length === 0) {
        console.error("ERROR: No channel data returned");
        throw new Error('No channel data returned from YouTube API');
      }

      const uploadsPlaylistId = channelsData.items[0].contentDetails.relatedPlaylists.uploads;
      console.log("Uploads playlist ID:", uploadsPlaylistId);

      const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${uploadsPlaylistId}&part=snippet,contentDetails&maxResults=1`;
      console.log("Playlist request URL (without key):", `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${uploadsPlaylistId}&part=snippet,contentDetails&maxResults=1`);

      const playlistResponse = await fetch(playlistUrl);
      console.log("Playlist API response status:", playlistResponse.status);

      if (!playlistResponse.ok) {
        const playlistErrorBody = await playlistResponse.text();
        console.error("Playlist API error response body:", playlistErrorBody);
        throw new Error(`YouTube playlist API failed: ${playlistResponse.status} ${playlistResponse.statusText} - ${playlistErrorBody}`);
      }

      const playlistData = await playlistResponse.json();

      if (!playlistData.items || playlistData.items.length === 0) {
        console.error("ERROR: No videos returned from playlist");
        throw new Error('No videos returned from YouTube uploads playlist');
      }

      const video = playlistData.items[0];
      const videoData = {
        videoId: video.contentDetails.videoId,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default.url,
        publishedAt: video.snippet.publishedAt,
      };

      console.log("SUCCESS: Video fetched from fallback (playlist):", videoData.title);

      return {
        statusCode: 200,
        body: JSON.stringify(videoData),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=300',
        },
      };
    }

    const searchData = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      console.error("ERROR: No videos returned from search API");
      throw new Error('No videos returned from YouTube search API');
    }

    const video = searchData.items[0];
    const videoData = {
      videoId: video.id.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default.url,
      publishedAt: video.snippet.publishedAt,
    };

    console.log("SUCCESS: Video fetched from search:", videoData.title);

    return {
      statusCode: 200,
      body: JSON.stringify(videoData),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    };
  } catch (error) {
    console.error("=== YOUTUBE FUNCTION ERROR ===");
    console.error("Error type:", error instanceof Error ? error.constructor.name : typeof error);
    console.error("Error message:", error instanceof Error ? error.message : error);
    console.error("Full error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch YouTube data',
        message: error instanceof Error ? error.message : 'Unknown error',
        type: error instanceof Error ? error.constructor.name : typeof error,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};

export { handler };
