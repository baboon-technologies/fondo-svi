import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NetworkBackground, FilterBackground, FunnelBackground, ChartBackground } from './backgrounds';

interface Slide {
  title: string;
  subtitle: string;
  cta: string;
  background: JSX.Element;
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      title: "La diferencia entre invertir y replicar el mercado está en cómo eliges las empresas.",
      subtitle: "SVI utiliza un proceso de inversión sistemático para seleccionar empresas de alta calidad a valoraciones atractivas.",
      cta: "Descubrir la estrategia",
      background: <NetworkBackground />
    },
    {
      title: "Un enfoque sistemático para invertir en renta variable.",
      subtitle: "Nuestro algoritmo analiza miles de compañías para encontrar las mejores oportunidades.",
      cta: "Ver metodología",
      background: <FilterBackground />
    },
    {
      title: "De miles de empresas a una cartera concentrada.",
      subtitle: "SVI construye una cartera de aproximadamente 30 compañías seleccionadas sistemáticamente.",
      cta: "Cómo funciona",
      background: <FunnelBackground />
    },
    {
      title: "Una estrategia diseñada para superar al mercado a largo plazo.",
      subtitle: "Backtesting histórico desde 1995 y proceso disciplinado.",
      cta: "Ver resultados",
      background: <ChartBackground />
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[85vh] sm:h-screen overflow-hidden bg-white">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="absolute inset-0">
            {slide.background}
          </div>

          <div className="relative z-20 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-4xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-svi-primary leading-tight mb-6 sm:mb-8">
                  {slide.title}
                </h1>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-svi-dark-grey leading-relaxed mb-8 sm:mb-10 max-w-3xl">
                  {slide.subtitle}
                </p>

                <button className="px-6 py-3 sm:px-8 sm:py-4 bg-svi-primary text-white text-base sm:text-lg font-semibold rounded-lg hover:bg-svi-secondary transition-all duration-300 shadow-lg hover:shadow-xl">
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 md:p-4 rounded-full bg-white/80 hover:bg-white transition-all duration-300 shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-700" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 md:p-4 rounded-full bg-white/80 hover:bg-white transition-all duration-300 shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-700" />
      </button>

      <div className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 sm:w-12 bg-svi-primary'
                : 'w-2 sm:w-3 bg-gray-400 hover:bg-gray-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
