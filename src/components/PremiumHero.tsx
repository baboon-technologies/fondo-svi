import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SVIQuoteVisual from './SVIQuoteVisual';

interface Slide {
  eyebrow: string;
  eyebrowNoCaps?: boolean;
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
      eyebrow: "El mejor Fondo de Inversión para invertir en compañías cotizadas en Estados Unidos.",
      eyebrowNoCaps: true,
      title: "Invierte en las 30 mejores oportunidades de la bolsa americana.",
      subtitle: "Nuestros algoritmos y equipo humano trabajando codo con codo para conseguirte excelentes rentabilidades.",
      buttons: [
        { text: "¿Cómo funciona?", link: "/metodologia", primary: true },
        { text: "Ver resultados", link: "/resultados" }
      ],
      layout: 'text-left',
      visualPlaceholder: <MarketVisual />
    },
    {
      eyebrow: "Proceso de inversión",
      title: "De miles de empresas a una cartera concentrada",
      subtitle: "Nuestro modelo analiza la totalidad del mercado americano para seleccionar 30 empresas. Nuestro equipo valida a mano cada una de las oportunidades antes de invertir. Sólo invertimos si existe alta convicción tanto por parte del algoritmo de SVI como del equipo de análisis.",
      buttons: [
        { text: "Ver metodología", link: "/metodologia", primary: true }
      ],
      layout: 'text-right',
      visualPlaceholder: <PipelineVisual />
    },
    {
      eyebrow: "Filosofía de inversión",
      title: "Objetividad, Atemporalidad y Sistematización",
      subtitle: "Un enfoque sistemático para invertir en empresas de alta calidad con visión de largo plazo, buscando el +10% de rentabilidad.",
      buttons: [
        { text: "Conocer la estrategia", link: "/metodologia", primary: true }
      ],
      layout: 'text-left',
      visualPlaceholder: <PhilosophyVisual />
    },
    {
      eyebrow: "Rendimiento en tiempo real",
      title: "NAV del Systematic Value Investing",
      subtitle: "Nuestro fondo es UCITS con ISIN español, totalmente líquido e invertible con un mínimo de 10€.",
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
                  <div className={`text-[10px] sm:text-xs md:text-sm font-semibold text-svi-secondary mb-3 sm:mb-4 lg:mb-6 ${
                    slide.eyebrowNoCaps ? 'tracking-normal' : 'uppercase tracking-wider'
                  }`}>
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

