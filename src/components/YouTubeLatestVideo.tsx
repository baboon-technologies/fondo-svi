import { useEffect, useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';

interface YouTubeVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

export default function YouTubeLatestVideo() {
  const [video, setVideo] = useState<YouTubeVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mdzizyolyfflpzaqnbjw.supabase.co';
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
        const apiUrl = `${supabaseUrl}/functions/v1/youtube-latest-video`;

        console.log('[YouTube] Fetching latest video from:', apiUrl);

        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'apikey': supabaseAnonKey,
          }
        });

        if (!response.ok) {
          console.error('[YouTube] API response not OK:', response.status);
          throw new Error('Failed to fetch');
        }

        const data = await response.json();
        console.log('[YouTube] Video received:', data.title);
        setVideo(data);
        setError(false);
      } catch (err) {
        console.error('[YouTube] Error fetching video:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestVideo();
  }, []);

  if (loading) {
    return (
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
              <div className="h-12 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-full animate-pulse" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-100 aspect-video animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6">
              YouTube
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-svi-primary mb-4 sm:mb-6 leading-tight">
              {!error && video ? video.title : 'Últimos vídeos del canal'}
            </h2>

            <p className="text-base sm:text-lg text-svi-dark-grey mb-6 sm:mb-8 leading-relaxed">
              Análisis, reflexiones y contenido sobre inversión sistemática en renta variable americana.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {!error && video && (
                <a
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center px-6 sm:px-8 py-4 bg-red-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg group"
                >
                  Ver vídeo
                  <Play className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </a>
              )}

              <a
                href="https://www.youtube.com/@SVInvesting/featured"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center px-6 sm:px-8 py-4 bg-svi-primary text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-svi-secondary transition-all shadow-md hover:shadow-lg group"
              >
                Ver canal
                <ExternalLink className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              {!error && video ? (
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-red-600 to-red-700 p-8 sm:p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <Play className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                    <div className="text-white/90 text-5xl sm:text-6xl font-bold mb-2">
                      SVI
                    </div>
                    <div className="text-white/70 text-lg sm:text-xl font-medium">
                      YouTube
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
