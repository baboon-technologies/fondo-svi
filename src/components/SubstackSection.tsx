import { useEffect, useState } from 'react';
import { ArrowRight, FileText, ExternalLink } from 'lucide-react';

const SUBSTACK_URL = 'https://svinvesting.substack.com';
const SUBSTACK_SUBSCRIBE_URL = 'https://svinvesting.substack.com/subscribe?utm_source=menu&simple=true&next=https%3A%2F%2Fsvinvesting.substack.com%2F';

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  image?: string;
}

export default function SubstackSection() {
  const [post, setPost] = useState<SubstackPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLatestPost = async () => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mdzizyolyfflpzaqnbjw.supabase.co';
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
        const apiUrl = `${supabaseUrl}/functions/v1/substack-latest`;

        console.log('[Substack] Fetching latest post from:', apiUrl);

        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'apikey': supabaseAnonKey,
          }
        });

        if (!response.ok) {
          console.error('[Substack] API response not OK:', response.status);
          throw new Error('Failed to fetch');
        }

        const data = await response.json();
        console.log('[Substack] Post received:', data.title);
        setPost(data);
        setError(false);
      } catch (err) {
        console.error('[Substack] Error fetching post:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPost();
  }, []);

  if (loading) {
    return (
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
            <div className="order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-100 aspect-video animate-pulse" />
            </div>
            <div className="order-2 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
              <div className="h-12 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-5/6 animate-pulse" />
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
          <div className="order-1">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
              {!error && post?.image ? (
                <div className="aspect-video">
                  <img
                    src={post.image}
                    alt={post.title || 'Newsletter SVI'}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-orange-500 to-orange-600 p-8 sm:p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                    <div className="text-white/90 text-5xl sm:text-6xl font-bold mb-2">
                      SVI
                    </div>
                    <div className="text-white/70 text-lg sm:text-xl font-medium">
                      Newsletter
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="order-2">
            <div className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-orange-600 to-orange-500 text-white text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6">
              Newsletter
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-svi-primary mb-4 sm:mb-6 leading-tight">
              {!error && post ? post.title : 'Newsletter de SVI'}
            </h2>

            <p className="text-base sm:text-lg text-svi-dark-grey mb-6 sm:mb-8 leading-relaxed">
              Análisis profundos, actualizaciones de cartera y reflexiones sobre inversión sistemática en renta variable americana.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={!error && post ? post.link : SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center px-6 sm:px-8 py-4 bg-svi-primary text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-svi-secondary transition-all shadow-md hover:shadow-lg group"
              >
                Leer último artículo
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={SUBSTACK_SUBSCRIBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center px-6 sm:px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-orange-700 hover:to-orange-600 transition-all shadow-md hover:shadow-lg group"
              >
                Suscribirse
                <ExternalLink className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
