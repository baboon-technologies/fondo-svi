import { Link } from 'react-router-dom';
import { Target, DollarSign, TrendingUp, ArrowRight, TrendingDown, Focus, Settings, LineChart, Layers, Tag, Shuffle } from 'lucide-react';
import PremiumHero from '../components/PremiumHero';
import ValuationRiskSection from '../components/ValuationRiskSection';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <div>
      <PremiumHero />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-svi-primary mb-4">
              ¿Qué es Systematic Value Investing?
            </h2>
            <p className="text-xl text-svi-dark-grey max-w-2xl mx-auto leading-relaxed">
              Descubre el enfoque sistemático y basado en valor que guía cada decisión de inversión.
            </p>
          </div>
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-svi-light-grey" style={{ paddingTop: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/qCV5Tx_x6Ok"
              title="¿Qué es Systematic Value Investing?"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
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
              SVI selecciona 30 compañías de alta calidad a valoraciones atractivas.
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
                    Fondo de renta variable americana 100% sistemático, diseñado para capturar el valor de las mejores compañías de EE.UU. sin sesgos emocionales.
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
                  <h3 className="text-2xl font-bold text-svi-primary mb-3">100% Sistemático</h3>
                  <p className="text-lg text-svi-dark-grey leading-relaxed">
                    El proceso de inversión se basa en un conjunto de reglas cuantificables que definen qué empresas pueden entrar en cartera y bajo qué condiciones. Cada decisión responde al sistema, no a una opinión.
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
                    El track record, con cuenta real desde abril de 2023, es de un 30,4%, y la cartera actual tiene un potencial x2,1 en 5 años.
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
              El sistema analiza más de 60.000 acciones y construye una cartera de 30 compañías de alta calidad compradas a valoraciones atractivas.
            </p>
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
                Nuestra metodología combina análisis fundamental riguroso con un proceso de selección sistemático
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
    </div>
  );
}
