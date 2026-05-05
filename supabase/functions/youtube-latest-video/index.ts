const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  const YOUTUBE_API_KEY = Deno.env.get("YOUTUBE_API_KEY");
  const CHANNEL_ID = "UCx07t1GEqzzPjdZMXjJmAKA";

  console.log("=== YOUTUBE EDGE FUNCTION DEBUG ===");
  console.log("YouTube API key exists:", !!YOUTUBE_API_KEY);
  console.log("YouTube CHANNEL_ID:", CHANNEL_ID);

  if (!YOUTUBE_API_KEY) {
    console.error("ERROR: Missing YOUTUBE_API_KEY environment variable");
    return new Response(
      JSON.stringify({
        error: "Missing YOUTUBE_API_KEY",
        debug: "API key not found in environment variables",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }

  if (!CHANNEL_ID) {
    console.error("ERROR: Missing CHANNEL_ID");
    return new Response(
      JSON.stringify({ error: "Missing CHANNEL_ID" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    console.log("Attempting to fetch videos from uploads playlist...");

    const channelsUrl = `https://www.googleapis.com/youtube/v3/channels?key=${YOUTUBE_API_KEY}&id=${CHANNEL_ID}&part=contentDetails`;
    const channelsResponse = await fetch(channelsUrl);

    if (!channelsResponse.ok) {
      const errorBody = await channelsResponse.text();
      console.error("Channels API error:", errorBody);
      throw new Error(`Failed to fetch channel: ${channelsResponse.status}`);
    }

    const channelsData = await channelsResponse.json();

    if (!channelsData.items || channelsData.items.length === 0) {
      throw new Error("Channel not found");
    }

    const uploadsPlaylistId = channelsData.items[0].contentDetails.relatedPlaylists.uploads;
    console.log("Uploads playlist ID:", uploadsPlaylistId);

    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${YOUTUBE_API_KEY}&playlistId=${uploadsPlaylistId}&part=snippet,contentDetails&maxResults=10`;
    const playlistResponse = await fetch(playlistUrl);

    if (!playlistResponse.ok) {
      const errorBody = await playlistResponse.text();
      console.error("Playlist API error:", errorBody);
      throw new Error(`Failed to fetch playlist: ${playlistResponse.status}`);
    }

    const playlistData = await playlistResponse.json();

    if (!playlistData.items || playlistData.items.length === 0) {
      throw new Error("No videos found in channel");
    }

    console.log(`Found ${playlistData.items.length} videos, filtering by duration...`);

    const videoIds = playlistData.items.map((item: any) => item.contentDetails.videoId).join(',');
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=contentDetails,snippet`;
    const videosResponse = await fetch(videosUrl);

    if (!videosResponse.ok) {
      const errorBody = await videosResponse.text();
      console.error("Videos API error:", errorBody);
      throw new Error(`Failed to fetch video details: ${videosResponse.status}`);
    }

    const videosData = await videosResponse.json();

    function parseDuration(duration: string): number {
      const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      if (!match) return 0;
      const hours = parseInt(match[1] || '0');
      const minutes = parseInt(match[2] || '0');
      const seconds = parseInt(match[3] || '0');
      return hours * 3600 + minutes * 60 + seconds;
    }

    const filteredVideos = videosData.items.filter((video: any) => {
      const duration = parseDuration(video.contentDetails.duration);
      console.log(`Video: ${video.snippet.title} - Duration: ${duration}s`);
      return duration > 180;
    });

    if (filteredVideos.length === 0) {
      throw new Error("No videos found with duration > 180 seconds");
    }

    const video = filteredVideos[0];
    const videoData = {
      videoId: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default.url,
      publishedAt: video.snippet.publishedAt,
    };

    console.log("SUCCESS: Found video >180s:", videoData.title);

    return new Response(JSON.stringify(videoData), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (error) {
    console.error("=== YOUTUBE EDGE FUNCTION ERROR ===");
    console.error(
      "Error type:",
      error instanceof Error ? error.constructor.name : typeof error
    );
    console.error(
      "Error message:",
      error instanceof Error ? error.message : error
    );
    console.error("Full error:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to fetch YouTube data",
        message: error instanceof Error ? error.message : "Unknown error",
        type: error instanceof Error ? error.constructor.name : typeof error,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
