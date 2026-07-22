import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface Panel {
  title: string;
  content: JSX.Element;
  visual: JSX.Element;
}

export default function WhatIsCarousel() {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const panels: Panel[] = [
    {
      title: '¿Qué somos?',
      content: (
        <div>
          <p className="text-lg text-svi-dark-grey leading-relaxed mb-6">
            En Systematic Value Investing somos la primera Startup WealthTech española que combina la rigurosidad de la metodología de inversión en valor (Value Investing) con las tecnologías más punteras en IA, algoritmos cuantitativos e inversión sistemática y metodológica.
          </p>
          <ul className="space-y-3 mb-6">
            {[
              'Mentalidad "Business Owner" y visión de la cartera como una holding empresarial.',
              'Optimización de los fundamentales: crecimiento en ventas, flujos de caja, ventajas competitivas.',
              'Decisiones basadas en una combinación de datos y validación humana.',
              'Uso quirúrgico de la IA en la valoración y selección de activos. Sin cajas negras.',
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-svi-secondary flex-shrink-0 mt-1" />
                <span className="text-svi-dark-grey leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <div className="inline-block bg-emerald-50 border border-emerald-500/40 rounded-full px-6 py-3">
            <p className="text-emerald-900 font-bold">
              En definitiva: inversión a largo plazo buscando +10% de rentabilidad
            </p>
          </div>
        </div>
      ),
      visual: (
        <img
          src="/empresas.png"
          alt="Compañías SVI"
          className="w-full h-auto object-contain rounded-2xl shadow-xl"
        />
      ),
    },
    {
      title: 'El verdadero riesgo es invertir sin margen de seguridad',
      content: (
        <div>
          <p className="text-lg text-svi-dark-grey leading-relaxed mb-8">
            Compramos cuando el mercado ofrece el negocio con descuento respecto a su valor intrínseco. La volatilidad no es el riesgo: el verdadero riesgo es pagar de más por un negocio.
          </p>
          <p className="font-heading text-3xl lg:text-4xl font-bold text-svi-primary">
            Volatilidad &ne; Riesgo
          </p>
        </div>
      ),
      visual: (
        <img
          src="/deck/inversion-en-valor.png"
          alt="Inversión en Valor con margen de seguridad"
          className="w-full h-auto object-contain rounded-2xl shadow-xl"
        />
      ),
    },
    {
      title: '¿Qué hacemos en SVI?',
      content: (
        <div>
          <p className="text-lg text-svi-dark-grey leading-relaxed mb-6">
            Combinamos lo mejor de la inversión pasiva y de la inversión activa, con la rigurosidad de nuestra visión Value Investing Business Owner.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-xl p-5 border border-svi-light-grey">
              <h4 className="text-lg font-bold text-svi-primary mb-3">Inversión pasiva</h4>
              <ul className="space-y-2">
                {[
                  'Reducir costes',
                  'Evitar errores emocionales',
                  'Obtener la rentabilidad media del mercado',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-svi-secondary flex-shrink-0 mt-1" />
                    <span className="text-svi-dark-grey text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-svi-light-grey">
              <h4 className="text-lg font-bold text-svi-primary mb-3">Inversión activa</h4>
              <ul className="space-y-2">
                {[
                  'Seleccionar empresas con mayor rentabilidad potencial',
                  'Evitar excesos de valoración',
                  'Gestionar mejor el riesgo',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-svi-secondary flex-shrink-0 mt-1" />
                    <span className="text-svi-dark-grey text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-lg font-semibold text-svi-primary">
            De miles de acciones&hellip; a compañías concretas.
          </p>
        </div>
      ),
      visual: (
        <img
          src="/filtro-empresas.png"
          alt="De miles de acciones a compañías concretas"
          className="w-full h-auto object-contain rounded-2xl shadow-xl"
        />
      ),
    },
  ];

  const nextPanel = () => {
    setCurrentPanel((prev) => (prev + 1) % panels.length);
    setAutoplay(false);
  };

  const prevPanel = () => {
    setCurrentPanel((prev) => (prev - 1 + panels.length) % panels.length);
    setAutoplay(false);
  };

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setCurrentPanel((prev) => (prev + 1) % panels.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [autoplay, panels.length]);

  return (
    <div className="relative">
      <div className="grid">
        {panels.map((panel, index) => (
          <div
            key={index}
            className={`col-start-1 row-start-1 transition-opacity duration-1000 ${
              index === currentPanel ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center px-10 sm:px-12 lg:px-16 pb-12">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-svi-primary mb-5 leading-tight">
                  {panel.title}
                </h3>
                {panel.content}
              </div>
              <div className="flex items-center justify-center">
                {panel.visual}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevPanel}
        aria-label="Panel anterior"
        className="absolute left-0 sm:-left-2 top-[45%] -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all z-10 border border-svi-light-grey"
      >
        <ChevronLeft className="w-5 h-5 text-svi-dark-grey" />
      </button>

      <button
        onClick={nextPanel}
        aria-label="Panel siguiente"
        className="absolute right-0 sm:-right-2 top-[45%] -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all z-10 border border-svi-light-grey"
      >
        <ChevronRight className="w-5 h-5 text-svi-dark-grey" />
      </button>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
        {panels.map((_, index) => (
          <button
            key={index}
            aria-label={`Ir al panel ${index + 1}`}
            onClick={() => {
              setCurrentPanel(index);
              setAutoplay(false);
            }}
            className={`h-1.5 sm:h-2 rounded-full transition-all ${
              index === currentPanel
                ? 'w-10 sm:w-12 bg-svi-primary'
                : 'w-1.5 sm:w-2 bg-svi-light-blue/50 hover:bg-svi-light-blue'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
