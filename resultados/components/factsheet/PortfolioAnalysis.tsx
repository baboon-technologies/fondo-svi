'use client';

import { Card } from '@/components/ui/card';

interface MetricRowProps {
  label: string;
  svi: number;
  category: number;
  index: number;
  better: boolean;
}

function MetricRow({ label, svi, category, index }: Omit<MetricRowProps, 'better'>) {
  return (
    <div className="py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors duration-200">
      <div className="flex items-baseline justify-between gap-6">
        <div className="text-sm text-gray-700 font-medium min-w-[180px]">
          {label}
        </div>
        <div className="flex items-baseline gap-6 ml-auto">
          <div className="text-right min-w-[70px]">
            <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--svi-primary)' }}>
              {svi.toFixed(2)}
            </span>
          </div>
          <div className="text-right text-sm text-gray-500 min-w-[60px] tabular-nums">
            {category.toFixed(2)}
          </div>
          <div className="text-right text-sm text-gray-500 min-w-[60px] tabular-nums">
            {index.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioAnalysis() {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--svi-primary)' }}>
        Análisis de la Cartera
      </h2>

      {/* Bloque 1: Perfil Factorial + Medidas de Estilo */}
      <div className="mb-16">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2 text-gray-800">
            Perfil Factorial y Medidas de Estilo
          </h3>
          <p className="text-gray-500 text-sm">
            Análisis de valoración y crecimiento de la cartera frente a su categoría y benchmark.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Columna Izquierda: Medidas de Estilo (50%) */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-md p-8 flex flex-col">
            <h4 className="text-sm font-semibold text-gray-600 mb-6 uppercase tracking-wide">
              Medidas de Estilo
            </h4>

            <div className="flex-1">
              {/* Header Row */}
              <div className="flex items-baseline justify-between gap-6 pb-3 mb-2 border-b-2 border-gray-200">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide min-w-[180px]">
                  Métrica
                </div>
                <div className="flex items-baseline gap-6 ml-auto">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-right min-w-[70px]">
                    SVI
                  </div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-right min-w-[60px]">
                    Cat.
                  </div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-right min-w-[60px]">
                    Índice
                  </div>
                </div>
              </div>

              {/* Metric Rows */}
              <MetricRow
                label="Precio/beneficio"
                svi={10.35}
                category={15.94}
                index={19.50}
              />
              <MetricRow
                label="Precio/Valor contable"
                svi={2.01}
                category={2.50}
                index={3.22}
              />
              <MetricRow
                label="Precio/Ventas"
                svi={1.84}
                category={1.39}
                index={2.39}
              />
              <MetricRow
                label="Precio/Cash Flow"
                svi={5.08}
                category={10.80}
                index={12.26}
              />
              <MetricRow
                label="Rent. por dividendo %"
                svi={1.24}
                category={1.79}
                index={1.78}
              />
              <MetricRow
                label="Crec. a largo plazo %"
                svi={8.16}
                category={10.47}
                index={8.92}
              />
              <MetricRow
                label="Beneficios históricos %"
                svi={14.50}
                category={3.07}
                index={5.25}
              />
              <MetricRow
                label="Crecimiento Ventas %"
                svi={14.92}
                category={6.88}
                index={5.56}
              />
              <MetricRow
                label="Crec. Cash Flow %"
                svi={7.16}
                category={5.40}
                index={6.30}
              />
              <MetricRow
                label="Crec. Valor Contable %"
                svi={12.81}
                category={6.40}
                index={7.80}
              />
            </div>
          </div>

          {/* Columna Derecha: Perfil Factorial (50%) */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-md p-8 flex flex-col">
            <h4 className="text-sm font-semibold text-gray-600 mb-6 uppercase tracking-wide">
              Perfil Factorial
            </h4>
            <div className="flex-1 flex items-center justify-center min-h-[400px]">
              <img
                src="/perfil-factor.png"
                alt="Perfil Factorial"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bloque 2: Posiciones Principales */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Posiciones Principales
        </h3>
        <div className="bg-white border border-gray-300 overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-300">
                <th className="text-left py-2 px-3 text-gray-700 font-semibold">Posiciones</th>
                <th className="text-right py-2 px-3 text-gray-700 font-semibold whitespace-nowrap">Cartera Peso</th>
                <th className="text-left py-2 px-3 text-gray-700 font-semibold whitespace-nowrap">Compra inicial</th>
                <th className="text-right py-2 px-3 text-gray-700 font-semibold whitespace-nowrap">Valor de mercado</th>
                <th className="text-center py-2 px-3 text-gray-700 font-semibold">Div</th>
                <th className="text-right py-2 px-3 text-gray-700 font-semibold whitespace-nowrap">Cambio Acciones %</th>
                <th className="text-right py-2 px-3 text-gray-700 font-semibold whitespace-nowrap">1 año R1año</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              <tr className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
                <td className="py-2 px-3 font-medium">Genmab AS ADR</td>
                <td className="text-right py-2 px-3 tabular-nums">4,87</td>
                <td className="py-2 px-3">31 oct 2024</td>
                <td className="text-right py-2 px-3 tabular-nums">44.265</td>
                <td className="text-center py-2 px-3 text-[10px] text-gray-600">USD</td>
                <td className="text-right py-2 px-3 tabular-nums text-green-700 font-medium">90,76</td>
                <td className="text-right py-2 px-3 tabular-nums">27,97</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
                <td className="py-2 px-3 font-medium">CF Industries Holdings Inc</td>
                <td className="text-right py-2 px-3 tabular-nums">3,71</td>
                <td className="py-2 px-3">31 ene 2026</td>
                <td className="text-right py-2 px-3 tabular-nums">33.708</td>
                <td className="text-center py-2 px-3 text-[10px] text-gray-600">USD</td>
                <td className="text-right py-2 px-3 tabular-nums text-green-700 font-medium">100,00</td>
                <td className="text-right py-2 px-3 tabular-nums">68,49</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
                <td className="py-2 px-3 font-medium">StoneCo Ltd Class A</td>
                <td className="text-right py-2 px-3 tabular-nums">3,60</td>
                <td className="py-2 px-3">31 oct 2024</td>
                <td className="text-right py-2 px-3 tabular-nums">32.712</td>
                <td className="text-center py-2 px-3 text-[10px] text-gray-600">USD</td>
                <td className="text-right py-2 px-3 tabular-nums text-green-700 font-medium">13,81</td>
                <td className="text-right py-2 px-3 tabular-nums">41,02</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
                <td className="py-2 px-3 font-medium">Airbnb Inc Ordinary Shares - Class A</td>
                <td className="text-right py-2 px-3 tabular-nums">3,52</td>
                <td className="py-2 px-3">31 ene 2026</td>
                <td className="text-right py-2 px-3 tabular-nums">32.027</td>
                <td className="text-center py-2 px-3 text-[10px] text-gray-600">USD</td>
                <td className="text-right py-2 px-3 tabular-nums text-green-700 font-medium">100,00</td>
                <td className="text-right py-2 px-3 tabular-nums">5,27</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
                <td className="py-2 px-3 font-medium">Crocs Inc</td>
                <td className="text-right py-2 px-3 tabular-nums">3,38</td>
                <td className="py-2 px-3">31 ene 2026</td>
                <td className="text-right py-2 px-3 tabular-nums">30.718</td>
                <td className="text-center py-2 px-3 text-[10px] text-gray-600">USD</td>
                <td className="text-right py-2 px-3 tabular-nums text-green-700 font-medium">100,00</td>
                <td className="text-right py-2 px-3 tabular-nums text-red-700">-24,79</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
                <td className="py-2 px-3 font-medium">United Therapeutics Corp</td>
                <td className="text-right py-2 px-3 tabular-nums">3,33</td>
                <td className="py-2 px-3">30 nov 2024</td>
                <td className="text-right py-2 px-3 tabular-nums">30.289</td>
                <td className="text-center py-2 px-3 text-[10px] text-gray-600">USD</td>
                <td className="text-right py-2 px-3 tabular-nums text-green-700 font-medium">5,97</td>
                <td className="text-right py-2 px-3 tabular-nums">68,84</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
                <td className="py-2 px-3 font-medium">Palomar Holdings Inc</td>
                <td className="text-right py-2 px-3 tabular-nums">3,28</td>
                <td className="py-2 px-3">31 ene 2026</td>
                <td className="text-right py-2 px-3 tabular-nums">29.849</td>
                <td className="text-center py-2 px-3 text-[10px] text-gray-600">USD</td>
                <td className="text-right py-2 px-3 tabular-nums text-green-700 font-medium">100,00</td>
                <td className="text-right py-2 px-3 tabular-nums text-red-700">-9,93</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="py-2 px-3 font-medium">Alibaba Group Holding Ltd ADR</td>
                <td className="text-right py-2 px-3 tabular-nums">3,22</td>
                <td className="py-2 px-3">31 ene 2026</td>
                <td className="text-right py-2 px-3 tabular-nums">29.281</td>
                <td className="text-center py-2 px-3 text-[10px] text-gray-600">USD</td>
                <td className="text-right py-2 px-3 tabular-nums text-green-700 font-medium">100,00</td>
                <td className="text-right py-2 px-3 tabular-nums text-red-700">-4,42</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bloque 3: Exposición Sectorial + Estilo de Acciones */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold mb-6 text-gray-700">
          Exposición y Estilo de Acciones
        </h3>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Exposición Sectorial */}
          <Card className="p-6 bg-white border-gray-200 shadow-sm overflow-x-auto">
            <h4 className="font-semibold text-gray-700 mb-4">Exposición Sectorial</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600 font-semibold">Sector</th>
                  <th className="text-right py-2 text-gray-600 font-semibold">Fondo %</th>
                  <th className="text-right py-2 text-gray-600 font-semibold">Categoría %</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100">
                  <td className="py-2">Materiales Básicos</td>
                  <td className="text-right font-medium">8,45</td>
                  <td className="text-right">4,20</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2">Consumo Cíclico</td>
                  <td className="text-right font-medium">32,67</td>
                  <td className="text-right">18,50</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2">Tecnología</td>
                  <td className="text-right font-medium">28,91</td>
                  <td className="text-right">35,70</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2">Salud</td>
                  <td className="text-right font-medium">15,23</td>
                  <td className="text-right">12,80</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2">Servicios Financieros</td>
                  <td className="text-right font-medium">8,92</td>
                  <td className="text-right">15,40</td>
                </tr>
                <tr>
                  <td className="py-2">Otros</td>
                  <td className="text-right font-medium">5,82</td>
                  <td className="text-right">13,40</td>
                </tr>
              </tbody>
            </table>
          </Card>

          {/* Estilo de Acciones */}
          <Card className="p-6 bg-white border-gray-200 shadow-sm">
            <h4 className="font-semibold text-gray-700 mb-4">Estilo de Acciones</h4>
            <div className="h-72 flex items-center justify-center">
              <img
                src="/acciones-estilo.png"
                alt="Estilo de Acciones"
                className="w-full h-full object-contain"
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Bloque 4: Diversificación de la Cartera */}
      <div className="mb-16">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2 text-gray-800">
            Diversificación de la Cartera
          </h3>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-md p-8">
          <div className="w-full aspect-[16/9] flex items-center justify-center">
            <img
              src="/diversificacion.png"
              alt="Diversificación de la Cartera"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Bloque 5: Top 10 Transacciones */}
      <div className="mb-12">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2 text-gray-800">
            Top 10 Transacciones
          </h3>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-md p-8">
          <div className="w-full aspect-[16/9] flex items-center justify-center">
            <img
              src="/transaccion.png"
              alt="Top 10 Transacciones"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
