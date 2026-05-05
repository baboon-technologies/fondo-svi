'use client';

import { Card } from '@/components/ui/card';

export function HistoricalResults() {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--svi-primary)' }}>
        Resultados sólidos desde 2023 reflejando la aplicación disciplinada del sistema de inversión
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-md">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Rentabilidad Histórica
              </h3>
              <div className="text-5xl font-bold mb-1" style={{ color: 'var(--svi-primary)' }}>
                +30,4%
              </div>
              <p className="text-sm text-gray-600">
                Rentabilidad Acumulada (Abr 2023 - Marzo 2026)
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">2023 (Abr-Dic)</span>
                  <span className="text-lg font-semibold text-green-600">+18,04%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">2024</span>
                  <span className="text-lg font-semibold text-green-600">+19,99%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">2025</span>
                  <span className="text-lg font-semibold text-red-600">-2,08%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Previsión 2026</span>
                  <span className="text-lg font-semibold text-green-600">+12,96%</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 leading-relaxed">
                Rentabilidad 2025 afectada por cambio de divisa EUR/USD. Rentabilidad en dólares: +10,9%.
                Rentabilidad YTD + Rentabilidad CAGR estimada en base a nuestra valoración.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-md">
          <div className="flex flex-col h-full justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Potencial de la Cartera
              </h3>
              <div className="text-5xl font-bold mb-2" style={{ color: 'var(--svi-primary)' }}>
                15,7%
              </div>
              <p className="text-sm text-gray-600 mb-8">
                Rentabilidad Anualizada Estimada
              </p>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <div className="text-5xl font-bold mb-2" style={{ color: 'var(--svi-primary)' }}>
                x2,1
              </div>
              <p className="text-sm text-gray-600">
                Estimado Valorización Cartera en Marzo 2031
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
