import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import SVIQuoteVisual from './SVIQuoteVisual';

interface Slide {
  eyebrow: string;
  title: string;
  subtitle: string;
  buttons: { text: string; link: string; primary?: boolean }[];
  layout: 'text-left' | 'text-right';
  visualPlaceholder: JSX.Element;
}

export default function PremiumHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const slides: Slide[] = [
    {
      eyebrow: "Estrategia sistemática de renta variable americana",
      title: "Invertir en las mejores empresas de la bolsa Americana",
      subtitle: "SVI utiliza un proceso cuantitativo para identificar compañías de alta calidad a valoraciones atractivas.",
      buttons: [
        { text: "Conocer la metodología", link: "/metodologia", primary: true },
        { text: "Ver resultados", link: "/resultados" }
      ],
      layout: 'text-left',
      visualPlaceholder: <MarketVisual />
    },
    {
      eyebrow: "Proceso de inversión",
      title: "De miles de empresas a una cartera concentrada",
      subtitle: "Nuestro modelo analiza la totalidad del mercado americano para seleccionar 30 empresas.",
      buttons: [
        { text: "Ver metodología", link: "/metodologia", primary: true }
      ],
      layout: 'text-right',
      visualPlaceholder: <PipelineVisual />
    },
    {
      eyebrow: "Filosofía de inversión",
      title: "Calidad, valoración y disciplina",
      subtitle: "Un enfoque sistemático para invertir en empresas de alta calidad con visión de largo plazo.",
      buttons: [
        { text: "Conocer la estrategia", link: "/metodologia", primary: true }
      ],
      layout: 'text-left',
      visualPlaceholder: <PhilosophyVisual />
    },
    {
      eyebrow: "Rendimiento en tiempo real",
      title: "NAV del Systematic Value Investing",
      subtitle: "Seguimiento del valor liquidativo del fondo con datos históricos de los últimos 12 meses.",
      buttons: [
        { text: "Ver resultados", link: "/resultados", primary: true }
      ],
      layout: 'text-left',
      visualPlaceholder: <SVIQuoteVisual />
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAutoplay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoplay(false);
  };

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7500);
    return () => clearInterval(timer);
  }, [autoplay, slides.length]);

  return (
    <div className="relative min-h-screen bg-white pt-20 sm:pt-24 md:pt-0">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="relative h-full flex items-center pt-4 pb-12 md:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className={`grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center ${
                slide.layout === 'text-right' ? 'lg:grid-flow-dense' : ''
              }`}>
                <div className={slide.layout === 'text-right' ? 'lg:col-start-2' : ''}>
                  <div className="text-[10px] sm:text-xs md:text-sm font-semibold text-svi-secondary uppercase tracking-wider mb-3 sm:mb-4 lg:mb-6">
                    {slide.eyebrow}
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-svi-primary mb-3 sm:mb-4 lg:mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-svi-dark-grey mb-5 sm:mb-6 lg:mb-8 leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <div className="hidden lg:flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {slide.buttons.map((button, btnIndex) => (
                      <Link
                        key={btnIndex}
                        to={button.link}
                        className={`inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold rounded-lg transition-all ${
                          button.primary
                            ? 'bg-svi-primary text-white hover:bg-svi-secondary shadow-lg hover:shadow-xl'
                            : 'border-2 border-svi-primary text-svi-primary hover:bg-svi-primary hover:text-white'
                        }`}
                      >
                        {button.text}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className={`${slide.layout === 'text-right' ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="relative w-full aspect-[4/3] lg:aspect-square max-h-[40vh] lg:max-h-none">
                    {slide.visualPlaceholder}
                  </div>
                </div>

                <div className="lg:hidden flex flex-col gap-3 lg:col-span-2">
                  {slide.buttons.filter(button => button.primary).map((button, btnIndex) => (
                    <Link
                      key={btnIndex}
                      to={button.link}
                      className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-lg transition-all bg-svi-primary text-white hover:bg-svi-secondary shadow-lg hover:shadow-xl"
                    >
                      {button.text}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 md:left-8 top-[45%] md:top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all z-10 border border-svi-light-grey"
      >
        <ChevronLeft className="w-5 h-5 sm:w-5 sm:h-5 md:w-7 md:h-7 text-svi-dark-grey" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 md:right-8 top-[45%] md:top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all z-10 border border-svi-light-grey"
      >
        <ChevronRight className="w-5 h-5 sm:w-5 sm:h-5 md:w-7 md:h-7 text-svi-dark-grey" />
      </button>

      <div className="absolute bottom-3 sm:bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setAutoplay(false);
            }}
            className={`h-1.5 sm:h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'w-10 sm:w-12 bg-svi-primary'
                : 'w-1.5 sm:w-2 bg-svi-light-blue/50 hover:bg-svi-light-blue'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function MarketVisual() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-svi-light-blue/10 rounded-2xl overflow-hidden shadow-xl border border-svi-light-grey">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/foto-stock.png"
          alt="Mapa de mercados"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

function PipelineVisual() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-xl border border-svi-light-grey">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/filtro-empresas.png"
          alt="Proceso de filtrado de empresas"
          className="w-[115%] h-[115%] object-contain"
        />
      </div>
    </div>
  );
}

function PhilosophyVisual() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-svi-light-blue/10 to-gray-50 rounded-2xl overflow-hidden shadow-xl border border-svi-light-grey">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/cafe.png"
          alt="Calidad, valoración y disciplina"
          className="w-[90%] h-[90%] object-contain"
        />
      </div>
    </div>
  );
}

function PerformanceVisual() {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/yahoo-finance`;

        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (data.currentPrice && data.currentPrice > 0) {
          setChartData(data);
          setLoading(false);
        }
      } catch (err) {
        console.error('[CLIENT] Error:', err);
        setLoading(false);
      }
    };

    fetchChartData();
    const interval = setInterval(fetchChartData, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-svi-light-blue/5 rounded-2xl overflow-hidden shadow-xl border border-svi-light-grey">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-svi-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-svi-medium-grey text-sm font-medium">Cargando cotización en tiempo real...</p>
          </div>
        </div>
      ) : chartData ? (
        <YahooFinanceChart data={chartData} />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-svi-light-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="w-10 h-10 text-svi-primary" />
            </div>
            <h3 className="text-xl font-bold text-svi-primary mb-3">
              Datos no disponibles
            </h3>
            <p className="text-svi-dark-grey text-sm mb-6 leading-relaxed">
              Consulta el rendimiento del fondo directamente en Yahoo Finance.
            </p>
            <a
              href="https://finance.yahoo.com/quote/0P0001TB5J.F/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-svi-primary text-white font-semibold rounded-lg hover:bg-svi-secondary transition-all shadow-lg hover:shadow-xl"
            >
              Ver en Yahoo Finance
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function YahooFinanceChart({ data }: { data: any }) {
  const isPositive = data.change >= 0;
  const hasChartData = data.chartData && data.chartData.length > 0;

  if (!hasChartData) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="text-center space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-svi-primary/5 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-svi-dark-grey">En vivo</span>
            </div>
            <div>
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-svi-primary mb-3">
                ${data.currentPrice.toFixed(2)}
              </div>
              <div className={`text-2xl sm:text-3xl md:text-4xl font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? '+' : ''}{data.change.toFixed(2)} ({isPositive ? '+' : ''}{data.changePercent}%)
              </div>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm text-svi-medium-grey">
              Última actualización: {new Date(data.lastUpdate).toLocaleString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: 'short'
              })}
            </p>
          </div>

          <a
            href="https://finance.yahoo.com/quote/0P0001TB5J.F/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-svi-primary text-white font-semibold rounded-lg hover:bg-svi-secondary transition-all shadow-lg hover:shadow-xl"
          >
            Ver gráfico completo
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  const minPrice = Math.min(...data.chartData.map((d: any) => d.price));
  const maxPrice = Math.max(...data.chartData.map((d: any) => d.price));
  const priceRange = maxPrice - minPrice;
  const width = 100;
  const height = 100;

  const points = data.chartData.map((point: any, index: number) => {
    const x = (index / (data.chartData.length - 1)) * width;
    const normalizedPrice = ((point.price - minPrice) / priceRange);
    const y = height - (normalizedPrice * height);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="absolute inset-0 flex flex-col p-4 sm:p-6 lg:p-8">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-svi-primary">
              ${data.currentPrice.toFixed(2)}
            </span>
            <span className={`text-lg sm:text-xl md:text-2xl font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{data.change.toFixed(2)} ({isPositive ? '+' : ''}{data.changePercent}%)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-svi-primary/5 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-svi-dark-grey">En tiempo real</span>
            </div>
            <p className="text-xs text-svi-medium-grey">
              Últimos 12 meses
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 relative min-h-0 bg-white/50 rounded-xl p-4 border border-svi-light-grey/50">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0.2" />
              <stop offset="100%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2={width}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="0.3"
              vectorEffect="non-scaling-stroke"
              opacity="0.6"
            />
          ))}

          <polyline
            points={`0,${height} ${points} ${width},${height}`}
            fill="url(#chartGradient)"
            stroke="none"
          />

          <polyline
            points={points}
            fill="none"
            stroke={isPositive ? '#10b981' : '#ef4444'}
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="bg-white/70 rounded-lg p-3 border border-svi-light-grey/50">
          <p className="text-xs text-svi-medium-grey mb-1">Máximo</p>
          <p className="text-lg font-bold text-svi-dark-grey">${maxPrice.toFixed(2)}</p>
        </div>
        <div className="bg-white/70 rounded-lg p-3 border border-svi-light-grey/50">
          <p className="text-xs text-svi-medium-grey mb-1">Mínimo</p>
          <p className="text-lg font-bold text-svi-dark-grey">${minPrice.toFixed(2)}</p>
        </div>
        <div className="bg-white/70 rounded-lg p-3 border border-svi-light-grey/50">
          <p className="text-xs text-svi-medium-grey mb-1">Datos</p>
          <p className="text-lg font-bold text-svi-dark-grey">{data.dataPoints}</p>
        </div>
      </div>

      <div className="mt-3 text-center">
        <a
          href="https://finance.yahoo.com/quote/0P0001TB5J.F/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-svi-primary hover:text-svi-secondary transition-colors"
        >
          Ver más detalles en Yahoo Finance
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
