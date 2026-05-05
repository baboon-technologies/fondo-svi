import { ArrowDown } from 'lucide-react';

export default function WhatSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50/30 to-cyan-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-svi-primary mb-4 sm:mb-6">
            Qué es Systematic Value Investing
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-svi-dark-grey max-w-3xl mx-auto">
            Una estrategia cuantitativa que combina calidad empresarial y valoraciones atractivas para construir una cartera concentrada de alto potencial.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-12">
            <div className="w-full bg-white rounded-3xl p-12 lg:p-16 shadow-lg text-center">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="grid grid-cols-10 gap-1.5">
                  {[...Array(100)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-sm bg-gray-300 opacity-60"
                    />
                  ))}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-svi-primary mb-2">Miles de empresas</h3>
              <p className="text-lg text-svi-dark-grey">Universo completo del mercado estadounidense</p>
            </div>

            <div className="flex flex-col items-center">
              <ArrowDown className="w-10 h-10 text-svi-primary mb-4" strokeWidth={3} />
              <div className="w-full max-w-md bg-white rounded-2xl p-10 shadow-lg border-4 border-svi-primary/30 text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="flex-1 h-1.5 bg-gradient-to-r from-transparent via-svi-primary to-transparent rounded-full"></div>
                  <div className="w-5 h-5 bg-svi-primary rounded-full animate-pulse"></div>
                  <div className="flex-1 h-1.5 bg-gradient-to-r from-transparent via-svi-primary to-transparent rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-svi-primary mb-2">Algoritmo SVI</h3>
                <p className="text-base text-svi-dark-grey">Filtra por calidad y valoración</p>
              </div>
              <ArrowDown className="w-10 h-10 text-svi-primary mt-4" strokeWidth={3} />
            </div>

            <div className="w-full bg-gradient-to-br from-svi-primary to-svi-secondary rounded-3xl p-12 lg:p-16 shadow-xl text-center text-white">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="grid grid-cols-6 gap-2">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded bg-white"
                    />
                  ))}
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-2">~30 empresas seleccionadas</h3>
              <p className="text-lg text-white/80">Cartera concentrada de alta convicción</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
