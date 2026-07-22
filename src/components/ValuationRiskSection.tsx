import SVIQuoteVisual from './SVIQuoteVisual';

export default function ValuationRiskSection() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* BLOQUE 1 — EL COSTE DE COMPRAR CARO */}
        <div className="mb-32 lg:mb-40">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-svi-primary mb-6 leading-tight">
              Nunca en los últimos 25 años hemos pagado tan caro el S&P 500
            </h2>
            <p className="text-xl lg:text-2xl text-svi-dark-grey max-w-4xl mx-auto leading-relaxed">
              El mercado americano sigue ofreciendo oportunidades, pero comprar el índice completo a múltiplos históricamente elevados puede condicionar la rentabilidad futura durante muchos años.
            </p>
          </div>

          {/* Gráfico de valoración del S&P 500 */}
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-video rounded-2xl border border-svi-light-grey bg-white shadow-lg overflow-hidden">
              <img
                src="/SP500.png"
                alt="Valoración histórica del S&P 500"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* BLOQUE 2 — EL RIESGO TEMPORAL DEL INVERSOR INDEXADO */}
        <div className="mb-32 lg:mb-40">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Columna de texto */}
            <div className="order-1 lg:order-1">
              <h2 className="text-4xl lg:text-5xl font-bold text-svi-primary mb-6 leading-tight">
                Un paseo por el desierto de +15 años
              </h2>
              <p className="text-xl text-svi-dark-grey leading-relaxed">
                Incluso los grandes índices pueden atravesar largos periodos de rentabilidad decepcionante cuando se compran en momentos de exceso de valoración. El riesgo no siempre está en la volatilidad inmediata, sino en la paciencia que exige recuperar valor.
              </p>
            </div>

            {/* Columna de imagen/gráfico */}
            <div className="order-2 lg:order-2">
              <div className="relative aspect-[4/3] rounded-2xl border border-svi-light-grey bg-white shadow-lg overflow-hidden">
                <img
                  src="/paseodesierto.png"
                  alt="Gráfico histórico de periodos largos del mercado"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* BLOQUE 3 — LA ALTERNATIVA */}
        <div>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-svi-primary leading-tight">
              Indexarse = Conformarse
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Columna de texto */}
            <div>
              <p className="text-2xl lg:text-4xl text-svi-dark-grey leading-snug mb-8">
                Conseguir <strong className="font-bold text-svi-secondary">Más Rentabilidad</strong> con <strong className="font-bold text-svi-secondary">Menos Riesgo</strong> y <strong className="font-bold text-svi-secondary">Similar Correlación</strong> que el índice es posible.
              </p>

              <div className="bg-emerald-50 border border-emerald-500/40 rounded-xl p-6 lg:p-8">
                <p className="text-emerald-900 font-bold text-lg lg:text-xl leading-relaxed">
                  ¿Nuestro Objetivo? Buscar un +10% de rentabilidad anual invirtiendo en acciones cotizadas en EEUU a largo plazo.
                </p>
              </div>
            </div>

            {/* Columna del gráfico NAV en vivo */}
            <div>
              <div className="relative w-full aspect-[4/3]">
                <SVIQuoteVisual />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
