'use client';

import { CircleCheck as CheckCircle2 } from 'lucide-react';

interface MetricRow {
  metric: string;
  svi: string;
  index: string;
  insight: string;
}

const metrics: MetricRow[] = [
  {
    metric: 'Rentabilidad Anual',
    svi: '15,1%',
    index: '8,83%',
    insight: 'Batimos al índice'
  },
  {
    metric: 'Volatilidad',
    svi: '13,88%',
    index: '18,92%',
    insight: 'con menos riesgo'
  },
  {
    metric: 'Sharpe',
    svi: '0,94',
    index: '0,36',
    insight: 'con mejor rentabilidad ajustada al riesgo'
  },
  {
    metric: 'Beta',
    svi: '0,91',
    index: '1',
    insight: 'sin asumir más riesgo de mercado'
  },
  {
    metric: 'ROIC',
    svi: '15%',
    index: '9%',
    insight: 'con mejor asignación de capital'
  },
  {
    metric: 'Margen FCF',
    svi: '23%',
    index: '18%',
    insight: 'y con alta generación de caja y resiliencia'
  }
];

export function HistoricalBacktesting() {
  return (
    <div className="pt-16 pb-4">
      {/* Main Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12" style={{ color: 'var(--svi-primary)' }}>
        ¿Cómo habría funcionado históricamente?
      </h2>

      {/* Subtitle */}
      <h3 className="text-lg sm:text-2xl font-semibold mb-6 sm:mb-8 text-gray-700">
        Simulaciones Históricas – Backtesting (Enero 1995 – Agosto 2025)
      </h3>

      {/* Chart */}
      <div className="mb-12">
        <div className="w-full flex items-center justify-center rounded-lg overflow-hidden">
          <img
            src="/historico.png"
            alt="Gráfica de backtesting histórico"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Metrics Comparison - Modern Card Layout */}
      <div className="mb-12 space-y-4">
        {/* Desktop View */}
        <div className="hidden md:block space-y-3">
          {metrics.map((row, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="grid grid-cols-[2fr_1.5fr_1.5fr_3fr] gap-8 items-center">
                {/* Métrica */}
                <div className="text-gray-700 font-medium text-base">
                  {row.metric}
                </div>

                {/* SVI - Highlighted */}
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: 'var(--svi-primary)' }}>
                    {row.svi}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">SVI</div>
                </div>

                {/* Índice */}
                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-600">
                    {row.index}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">Índice</div>
                </div>

                {/* Insight */}
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                    style={{ color: 'var(--svi-primary)' }}
                  />
                  <span className="text-gray-700 leading-relaxed text-sm">
                    {row.insight}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {metrics.map((row, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
            >
              {/* Métrica */}
              <div className="font-semibold text-gray-800 mb-4 text-base">
                {row.metric}
              </div>

              {/* SVI e Índice */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center bg-blue-50 rounded-lg p-3">
                  <div className="text-2xl font-bold" style={{ color: 'var(--svi-primary)' }}>
                    {row.svi}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">SVI</div>
                </div>
                <div className="text-center bg-gray-50 rounded-lg p-3">
                  <div className="text-2xl font-semibold text-gray-700">
                    {row.index}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Índice</div>
                </div>
              </div>

              {/* Insight */}
              <div className="flex items-start gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg">
                <CheckCircle2
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  style={{ color: 'var(--svi-primary)' }}
                />
                <span className="text-sm leading-relaxed">{row.insight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
