'use client';

import { Card } from '@/components/ui/card';

export function MethodComparison() {
  const comparisonData = [
    {
      characteristic: "Decisiones",
      svi: "100% Objetivas. Basadas en criterios de inversión y datos.",
      traditional: "Discrecionales. Sujetas a sesgos y emociones.",
      indexed: "Automáticas. Siguen al índice sin análisis."
    },
    {
      characteristic: "Selección",
      svi: "Filtros de Calidad. Solo las mejores 30 empresas.",
      traditional: "Variable. Depende del criterio del gestor.",
      indexed: "Todo el mercado. Incluye empresas mediocres."
    },
    {
      characteristic: "Valoración",
      svi: "Margen de Seguridad. Compra con descuento >15%.",
      traditional: "Inconsistente. A menudo se paga por \"hype\".",
      indexed: "Irrelevante. Se compra a cualquier precio."
    },
    {
      characteristic: "Eficiencia",
      svi: "Alta. Cartera concentrada y optimizada.",
      traditional: "Media. A menudo \"closet indexing\".",
      indexed: "Baja. Arrastra el lastre de todo el índice."
    }
  ];

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--svi-primary)' }}>
        Un método más exigente que la gestión tradicional y más selectivo que la indexación
      </h2>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left p-4 font-semibold text-gray-700">Característica</th>
              <th className="text-left p-4 font-semibold text-white" style={{ backgroundColor: 'var(--svi-primary)' }}>
                SVI US Markets
              </th>
              <th className="text-left p-4 font-semibold text-gray-700 bg-gray-50">
                Gestión Tradicional
              </th>
              <th className="text-left p-4 font-semibold text-gray-700 bg-gray-50">
                Inversión Indexada
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-4 font-medium text-gray-900 bg-white">
                  {row.characteristic}
                </td>
                <td className="p-4 text-gray-700" style={{ backgroundColor: '#E6F2FF' }}>
                  {row.svi}
                </td>
                <td className="p-4 text-gray-700 bg-gray-50">
                  {row.traditional}
                </td>
                <td className="p-4 text-gray-700 bg-gray-50">
                  {row.indexed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-6">
        {comparisonData.map((row, index) => (
          <Card key={index} className="p-6 bg-white border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-gray-900">{row.characteristic}</h3>

            <div className="space-y-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#E6F2FF' }}>
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--svi-primary)' }}>
                  SVI US MARKETS
                </p>
                <p className="text-sm text-gray-700">{row.svi}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs font-semibold text-gray-600 mb-2">
                  GESTIÓN TRADICIONAL
                </p>
                <p className="text-sm text-gray-700">{row.traditional}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs font-semibold text-gray-600 mb-2">
                  INVERSIÓN INDEXADA
                </p>
                <p className="text-sm text-gray-700">{row.indexed}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
