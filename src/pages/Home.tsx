import { Link } from 'react-router-dom';
import { ArrowRight, Focus, Settings, LineChart, Layers, Tag, Shuffle, ExternalLink } from 'lucide-react';
import PremiumHero from '../components/PremiumHero';
import ValuationRiskSection from '../components/ValuationRiskSection';
import ContactForm from '../components/ContactForm';
import WhatIsCarousel from '../components/WhatIsCarousel';
import DavidBanner from '../components/DavidBanner';

export default function Home() {
  return (
    <div>
      <PremiumHero />

      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-16">
          <div className="bg-emerald-50 border border-emerald-500/40 rounded-xl p-6 lg:p-8 text-center">
            <p className="text-emerald-900 font-bold text-lg lg:text-xl leading-relaxed">
              ¿Nuestro Objetivo? Buscar un +10% de rentabilidad anual invirtiendo en acciones cotizadas en EEUU a largo plazo.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-svi-primary mb-4">
              ¿Qué es Systematic Value Investing?
            </h2>
            <p className="text-xl text-svi-dark-grey max-w-2xl mx-auto leading-relaxed">
              Descubre el enfoque sistemático y basado en valor que guía cada decisión de inversión.
            </p>
          </div>
          <WhatIsCarousel />
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-svi-primary mb-6">
              Por qué existe SVI
            </h2>
            <p className="text-xl lg:text-2xl text-svi-dark-grey max-w-3xl mx-auto leading-relaxed">
              Los fondos indexados comprarán todas las acciones del índice, esté caro o barato el mercado, indistintamente.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-svi-light-blue/10 transition-colors border border-transparent hover:border-svi-light-blue/30">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white flex items-center justify-center shadow-sm border border-svi-light-grey">
                <Layers className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-svi-primary mb-4">Concentración</h3>
              <p className="text-lg text-svi-dark-grey leading-relaxed">
                Los índices pueden dar una falsa sensación de diversificación. Las 10 compañías más grandes del S&P500, por ejemplo, constituyen &gt;30% del índice.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-svi-light-blue/10 transition-colors border border-transparent hover:border-svi-light-blue/30">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white flex items-center justify-center shadow-sm border border-svi-light-grey">
                <Tag className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-svi-primary mb-4">Valoraciones</h3>
              <p className="text-lg text-svi-dark-grey leading-relaxed">
                Los índices no siempre suben. En ocasiones, puedes estar pagando caro un índice y enfrentarte a correcciones de mercado o rentabilidades mediocres cercanas al 0% durante +15 años. El precio que pagas importa mucho.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-svi-light-blue/10 transition-colors border border-transparent hover:border-svi-light-blue/30">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white flex items-center justify-center shadow-sm border border-svi-light-grey">
                <Shuffle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-svi-primary mb-4">Diversificación</h3>
              <p className="text-lg text-svi-dark-grey leading-relaxed">
                Poseer miles de empresas de un índice no es una diversificación eficiente y diluye el impacto de las mejores oportunidades, añadiendo empresas de baja calidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ValuationRiskSection />

      <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          {/* Main Headline */}
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-svi-primary mb-4 leading-tight">
              En el SVI US Markets seleccionamos 30 compañías de alta calidad a valoraciones atractivas.
            </h2>
            <p className="text-2xl lg:text-3xl text-svi-dark-grey font-light">
              Un enfoque selectivo frente a comprar todo el mercado.
            </p>
          </div>

          {/* Two Column Layout: Content + Image Placeholder */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16 lg:mb-20">
            {/* Left Column: Three Information Blocks */}
            <div className="space-y-10">
              {/* Block 1: Enfoque */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-svi-secondary/10 flex items-center justify-center">
                    <Focus className="w-7 h-7 text-svi-secondary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-svi-primary mb-3">Enfoque</h3>
                  <p className="text-lg text-svi-dark-grey leading-relaxed">
                    Fondo de renta variable americana 100% sistemático, diseñado para capturar el valor de las mejores compañías de EE.UU., buscando objetividad, atemporalidad y sistematización del proceso inversor.
                  </p>
                </div>
              </div>

              {/* Block 2: 100% Sistemático */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-svi-secondary/10 flex items-center justify-center">
                    <Settings className="w-7 h-7 text-svi-secondary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-svi-primary mb-3">Tecnología + Equipo Humano</h3>
                  <p className="text-lg text-svi-dark-grey leading-relaxed">
                    Sólo invertimos en las compañías que pasan nuestra rigurosa metodología y donde tanto nuestro algoritmo de SVI como nuestro equipo humano tiene una alta convicción.
                  </p>
                </div>
              </div>

              {/* Block 3: Rentabilidad */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-svi-secondary/10 flex items-center justify-center">
                    <LineChart className="w-7 h-7 text-svi-secondary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-svi-primary mb-3">Rentabilidad</h3>
                  <p className="text-lg text-svi-dark-grey leading-relaxed">
                    Simulaciones históricas con un +16% de rentabilidad versus el 10% del índice S&P500 + Track record auditado desde abril de 2023 con un +12% de rentabilidad anual.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Companies Image */}
            <div className="flex items-center justify-center">
              <div className="w-full h-full min-h-[400px] lg:min-h-[500px] rounded-2xl bg-white border border-svi-light-grey flex items-center justify-center p-8 shadow-sm">
                <img
                  src="/empresas.png"
                  alt="Compañías SVI"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Highlighted Statement Banner */}
          <div className="bg-white rounded-2xl shadow-sm border border-svi-light-blue/30 p-8 lg:p-12 text-center">
            <p className="text-xl lg:text-2xl text-svi-primary font-semibold leading-relaxed max-w-5xl mx-auto">
              De 60.000 acciones que existen en el mundo a 30 tesis de inversión de alta convicción y bajo los principios del Value Investing y la visión Business Owner a largo plazo, buscando el +10% de rentabilidad en todas nuestras inversiones.
            </p>
          </div>

          {/* S&P500 live map */}
          <div className="mt-16 lg:mt-20 text-center">
            <h3 className="text-3xl lg:text-4xl font-bold text-svi-primary mb-8">
              El S&P500 en directo
            </h3>
            <div className="max-w-5xl mx-auto">
              <div className="rounded-2xl border border-svi-light-grey bg-white shadow-lg overflow-hidden p-4 lg:p-6">
                <img
                  src="/deck/sp500-map.png"
                  alt="Mapa del S&P500 por calidad y precio"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
              <p className="mt-4 text-sm text-svi-medium-grey">
                Nuestras compañías (círculos azules) frente al universo del S&P500, por calidad y precio.
              </p>
              <a
                href="https://app.svinvesting.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center px-8 py-4 border-2 border-svi-primary text-svi-primary text-base font-semibold rounded-lg hover:bg-svi-primary hover:text-white transition-all"
              >
                Explóralo en directo en app.svinvesting.com
                <ExternalLink className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Optional Disclaimer Area */}
          <div className="mt-8 text-center">
            <p className="text-sm text-svi-dark-grey/60">
              {/* Espacio reservado para disclaimer o notas adicionales */}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src="/Screenshot_2026-04-20_at_15.58.24.png"
                alt="Happy people"
                className="w-full h-auto object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-svi-primary mb-8 text-left">
                ¿Cómo lo hacemos?
              </h2>
              <p className="text-xl text-svi-dark-grey mb-12 leading-relaxed text-left">
                Nuestro algoritmo y metodología de inversión es público y disponible a través de{' '}
                <a
                  href="https://app.svinvesting.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-svi-primary underline underline-offset-4 hover:text-svi-secondary transition-colors"
                >
                  APP.SVINVESTING.COM
                </a>{' '}
                y todas las actualizaciones y mejoras se encuentran aquí:
              </p>
              <Link
                to="/metodologia"
                className="inline-flex items-center justify-center px-8 py-4 bg-svi-primary text-white text-lg font-semibold rounded-lg hover:bg-svi-secondary transition-all shadow-lg hover:shadow-xl"
              >
                Descubre la metodología
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />

      <DavidBanner />
    </div>
  );
}
