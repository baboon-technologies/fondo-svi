'use client';

interface ResultRow {
  metric: string;
  svi: string;
  index: string;
  highlighted?: boolean;
}

interface FundamentalRow {
  metric: string;
  svi: string;
  index: string;
  highlighted?: boolean;
}

const resultados: ResultRow[] = [
  { metric: 'Retorno', svi: '36%', index: '24%', highlighted: true },
  { metric: 'Retorno anual', svi: '12,50%', index: '8,60%' },
  { metric: 'Volatilidad', svi: '16,50%', index: '13,10%' },
  { metric: 'Beta', svi: '0,91', index: '1' },
  { metric: 'Sharpe Ratio', svi: '0,64', index: '0,51' },
  { metric: 'Sortino Ratio', svi: '0,91', index: '0,62' },
  { metric: 'Tracking Error', svi: '4,30%', index: '0' },
  { metric: 'Jensen Alpha', svi: '4,43%', index: '0%' },
  { metric: 'Portfolio Turnover', svi: '96,30%', index: '≈4%' },
  { metric: 'R²', svi: '0,78', index: '1,00' },
  { metric: 'Rentabilidad Esperada', svi: '14%', index: '≈0%', highlighted: true },
  { metric: 'Margen de Seguridad', svi: '15%', index: '-50%', highlighted: true },
];

const fundamentales: FundamentalRow[] = [
  { metric: 'PER', svi: 'x14', index: 'x31', highlighted: true },
  { metric: 'EV/FCF', svi: 'x15', index: 'x25' },
  { metric: 'EV/EBITDA', svi: 'x9', index: 'x19' },
  { metric: 'EV/EBIT', svi: 'x11', index: 'x23' },
  { metric: 'ROE', svi: '17%', index: '18%' },
  { metric: 'ROA', svi: '11%', index: '7%' },
  { metric: 'ROIC', svi: '15%', index: '9%', highlighted: true },
  { metric: 'Margen Bruto', svi: '64,00%', index: '56,00%' },
  { metric: 'Margen EBIT', svi: '24%', index: '27%' },
  { metric: 'Margen Neto', svi: '16%', index: '23%' },
  { metric: 'Margen FCF', svi: '23%', index: '18%', highlighted: true },
];

export function ComparisonTables() {
  return (
    <div className="my-12">
      {/* Desktop: 2 columns */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Tabla Resultados */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gray-100 border-b border-gray-200">
            <div className="grid grid-cols-[2fr_1fr_1fr]">
              <div className="px-3 sm:px-6 py-3 sm:py-4 font-bold text-gray-800 text-sm sm:text-base">Resultados</div>
              <div className="px-2 sm:px-4 py-3 sm:py-4 font-bold text-gray-800 text-center border-l border-gray-200 text-sm sm:text-base">SVI</div>
              <div className="px-2 sm:px-4 py-3 sm:py-4 font-bold text-gray-800 text-center border-l border-gray-200 text-sm sm:text-base">Índice</div>
            </div>
          </div>

          {/* Rows */}
          <div>
            {resultados.map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-[2fr_1fr_1fr] border-b border-gray-100 last:border-b-0 ${
                  row.highlighted ? 'bg-blue-50/40' : ''
                }`}
              >
                <div className={`px-3 sm:px-6 py-2 sm:py-3 text-gray-700 text-xs sm:text-sm ${row.highlighted ? 'font-semibold text-blue-900' : ''}`}>
                  {row.metric}
                </div>
                <div className={`px-2 sm:px-4 py-2 sm:py-3 text-center border-l border-gray-100 text-xs sm:text-sm ${
                  row.highlighted ? 'font-bold text-blue-700' : 'text-gray-700'
                }`}>
                  {row.svi}
                </div>
                <div className={`px-2 sm:px-4 py-2 sm:py-3 text-center border-l border-gray-100 text-xs sm:text-sm ${
                  row.highlighted ? 'font-semibold text-gray-700' : 'text-gray-600'
                }`}>
                  {row.index}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabla Fundamentales */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gray-100 border-b border-gray-200">
            <div className="grid grid-cols-[2fr_1fr_1fr]">
              <div className="px-3 sm:px-6 py-3 sm:py-4 font-bold text-gray-800 text-sm sm:text-base">Fundamentales</div>
              <div className="px-2 sm:px-4 py-3 sm:py-4 font-bold text-gray-800 text-center border-l border-gray-200 text-sm sm:text-base">SVI</div>
              <div className="px-2 sm:px-4 py-3 sm:py-4 font-bold text-gray-800 text-center border-l border-gray-200 text-sm sm:text-base">Índice</div>
            </div>
          </div>

          {/* Rows */}
          <div>
            {fundamentales.map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-[2fr_1fr_1fr] border-b border-gray-100 last:border-b-0 ${
                  row.highlighted ? 'bg-blue-50/40' : ''
                }`}
              >
                <div className={`px-3 sm:px-6 py-2 sm:py-3 text-gray-700 text-xs sm:text-sm ${row.highlighted ? 'font-semibold text-blue-900' : ''}`}>
                  {row.metric}
                </div>
                <div className={`px-2 sm:px-4 py-2 sm:py-3 text-center border-l border-gray-100 text-xs sm:text-sm ${
                  row.highlighted ? 'font-bold text-blue-700' : 'text-gray-700'
                }`}>
                  {row.svi}
                </div>
                <div className={`px-2 sm:px-4 py-2 sm:py-3 text-center border-l border-gray-100 text-xs sm:text-sm ${
                  row.highlighted ? 'font-semibold text-gray-700' : 'text-gray-600'
                }`}>
                  {row.index}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
