import { TrendingUp } from 'lucide-react';

export default function ResultsSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50/30 to-cyan-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-svi-primary mb-4 sm:mb-6">
            Resultados históricos
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-svi-dark-grey max-w-3xl mx-auto">
            El backtesting desde 1995 demuestra la capacidad de la estrategia para superar al mercado de forma consistente.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl">
            <div className="relative h-96 flex items-end justify-between gap-2">
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="svi-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#012878" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#012878" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="market-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6B7280" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#6B7280" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                <path
                  d="M 0 350 Q 100 330, 200 300 T 400 250 T 600 200 T 800 150 T 1000 80"
                  stroke="#012878"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />

                <path
                  d="M 0 350 Q 100 330, 200 300 T 400 250 T 600 200 T 800 150 T 1000 80 L 1000 400 L 0 400 Z"
                  fill="url(#svi-gradient)"
                />

                <path
                  d="M 0 360 Q 100 345, 200 330 T 400 300 T 600 270 T 800 240 T 1000 200"
                  stroke="#6B7280"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="8,8"
                />

                <path
                  d="M 0 360 Q 100 345, 200 330 T 400 300 T 600 270 T 800 240 T 1000 200 L 1000 400 L 0 400 Z"
                  fill="url(#market-gradient)"
                />

                {[0, 200, 400, 600, 800, 1000].map((x, i) => {
                  const ySVI = 350 - i * 55;
                  const yMarket = 360 - i * 32;
                  return (
                    <g key={i}>
                      <circle cx={x} cy={ySVI} r="6" fill="#012878" />
                      <circle cx={x} cy={yMarket} r="5" fill="#6B7280" />
                    </g>
                  );
                })}
              </svg>

              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-sm text-gray-500 font-medium px-2">
                <span>1995</span>
                <span>2000</span>
                <span>2005</span>
                <span>2010</span>
                <span>2015</span>
                <span>2020</span>
                <span>2024</span>
              </div>
            </div>

            <div className="mt-12 flex items-center justify-center gap-12">
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-svi-primary rounded-full"></div>
                <span className="text-lg font-semibold text-svi-primary">SVI Strategy</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-gray-400 rounded-full"></div>
                <span className="text-lg font-semibold text-svi-dark-grey">S&P 500</span>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center border-t border-gray-200 pt-6 sm:pt-8">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-svi-primary mb-2">+3.8%</div>
                <div className="text-xs sm:text-sm text-svi-dark-grey uppercase tracking-wider">Rentabilidad anual adicional</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-svi-primary mb-2">29 años</div>
                <div className="text-xs sm:text-sm text-svi-dark-grey uppercase tracking-wider">Historial backtesting</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-svi-primary mb-2">73%</div>
                <div className="text-xs sm:text-sm text-svi-dark-grey uppercase tracking-wider">Años superando al S&P 500</div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-svi-medium-grey">
              Rentabilidades pasadas no garantizan resultados futuros. Los datos son de backtesting histórico.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
