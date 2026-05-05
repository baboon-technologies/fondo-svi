'use client';

import { Card } from '@/components/ui/card';

export function HistoricalBenchmark() {
  return (
    <div className="py-12">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--svi-primary)' }}>
        Rentabilidad Histórica - Benchmark
      </h2>

      {/* Descriptive Text */}
      <div className="mb-8 space-y-3">
        <p className="text-gray-700 leading-relaxed">
          El SVI invierte en empresas Value de alta calidad con valoraciones atractivas.
          Su benchmark de referencia es el MSCI World Value Index, que replica la rentabilidad
          de las empresas con características Value en mercados desarrollados.
        </p>
        <p className="text-gray-700 leading-relaxed">
          A continuación se compara la rentabilidad del SVI con su índice de referencia y
          con otros índices relevantes para proporcionar contexto sobre su desempeño relativo.
        </p>
      </div>

      {/* Charts Grid */}
      <div className="space-y-6">
        {/* Row 1: Two Charts Side by Side */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Chart 1: 2023-2025 Bar Chart */}
          <Card className="p-6 bg-gray-50 border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Rentabilidad Anual (2023-2025)
            </h3>
            <div
              className="flex items-center justify-center bg-white border border-gray-300 rounded-lg overflow-hidden"
              style={{ height: '280px' }}
            >
              <img
                src="/2023-25.png"
                alt="Gráfica Rentabilidad 2023-2025"
                className="w-full h-full object-contain"
              />
            </div>
          </Card>

          {/* Chart 2: 2026 YTD Horizontal Chart */}
          <Card className="p-6 bg-gray-50 border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Rentabilidad 2026 YTD
            </h3>
            <div
              className="flex items-center justify-center bg-white border border-gray-300 rounded-lg overflow-hidden"
              style={{ height: '280px' }}
            >
              <img
                src="/svi2026ytd.png"
                alt="Gráfica 2026 YTD"
                className="w-full h-full object-contain"
              />
            </div>
          </Card>
        </div>

        {/* Row 2: Full Width Line Chart - EEUU */}
        <Card className="p-6 bg-gray-50 border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Comparación con Índices EEUU
          </h3>
          <div
            className="flex items-center justify-center bg-white border border-gray-300 rounded-lg overflow-hidden"
            style={{ height: '380px' }}
          >
            <img
              src="/indexes.png"
              alt="Gráfica Índices EEUU"
              className="w-full h-full object-contain"
            />
          </div>
        </Card>

        {/* Row 3: Full Width Line Chart - Europa */}
        <Card className="p-6 bg-gray-50 border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Comparación con Índices Europeos
          </h3>
          <div
            className="flex items-center justify-center bg-white border border-gray-300 rounded-lg overflow-hidden"
            style={{ height: '380px' }}
          >
            <img
              src="/svieurope.png"
              alt="Gráfica Índices Europeos"
              className="w-full h-full object-contain"
            />
          </div>
        </Card>

        {/* Row 4: Full Width - Últimas Transacciones */}
        <Card className="p-6 bg-gray-50 border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Últimas Transacciones
          </h3>
          <div
            className="flex items-center justify-center bg-white border border-gray-300 rounded-lg overflow-hidden"
            style={{ height: '380px' }}
          >
            <img
              src="/last-transactions.png"
              alt="Últimas Transacciones"
              className="w-full h-full object-contain"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
