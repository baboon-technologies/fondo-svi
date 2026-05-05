'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { useState } from 'react';

interface ChartItem {
  name: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  title: string;
  data: ChartItem[];
}

const PALETTE_SECTORIAL = ['#0e5fa6', '#2e7d32', '#c62828', '#e65100', '#6a1550', '#b8860b', '#00838f'];
const PALETTE_INDUSTRIAL = ['#d4edf9', '#0e5fa6', '#1a8fe3', '#2e7d32', '#43a047', '#66bb6a', '#8d6e63', '#a1887f', '#bcaaa4', '#37474f', '#546e7a', '#78909c', '#b0bec5'];
const PALETTE_PAIS = ['#0e5fa6', '#d4edf9', '#2e7d32', '#c62828', '#1565c0', '#6a1550', '#e65100', '#4e342e'];
const PALETTE_TAMANO = ['#0e5fa6', '#2e7d32', '#e65100', '#6a1550', '#b8860b'];

function formatPct(value: number) {
  return value.toFixed(2).replace('.', ',') + '%';
}

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 5} startAngle={startAngle} endAngle={endAngle} fill={fill} />
    </g>
  );
};

function SingleDonut({ title, data }: DonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4">
      <h3 className="text-base font-bold" style={{ color: 'var(--svi-primary)', borderLeft: '3px solid var(--svi-primary)', paddingLeft: '10px' }}>
        {title}
      </h3>
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0" style={{ width: 160, height: 160 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={72}
                dataKey="value"
                activeIndex={activeIndex !== null ? activeIndex : undefined}
                activeShape={renderActiveShape}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                animationBegin={150}
                animationDuration={1200}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-1.5 min-w-0">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-2 cursor-pointer group"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform duration-200 group-hover:scale-125"
                  style={{ backgroundColor: item.color }}
                />
                <span
                  className={`text-xs leading-tight truncate transition-colors duration-200 ${activeIndex === index ? 'font-semibold' : 'font-medium'}`}
                  style={{ color: activeIndex === index ? 'var(--svi-primary)' : '#4b5563' }}
                  title={item.name}
                >
                  {item.name}
                </span>
              </div>
              <span className="text-xs font-semibold flex-shrink-0" style={{ color: 'var(--svi-primary)' }}>
                {formatPct(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const sectorialData: ChartItem[] = [
  { name: 'Cuidado de la salud', value: 19.55, color: PALETTE_SECTORIAL[0] },
  { name: 'Consumo cíclico', value: 16.77, color: PALETTE_SECTORIAL[1] },
  { name: 'Servicios financieros', value: 16.39, color: PALETTE_SECTORIAL[2] },
  { name: 'Tecnología', value: 16.36, color: PALETTE_SECTORIAL[3] },
  { name: 'Liquidez', value: 16.10, color: PALETTE_SECTORIAL[4] },
  { name: 'Defensa del consumidor', value: 8.73, color: PALETTE_SECTORIAL[5] },
  { name: 'Servicios de comunicación', value: 6.11, color: PALETTE_SECTORIAL[6] },
];

const industrialData: ChartItem[] = [
  { name: 'Liquidez', value: 16.10, color: PALETTE_INDUSTRIAL[0] },
  { name: 'Biotecnología', value: 12.31, color: PALETTE_INDUSTRIAL[1] },
  { name: 'Software - Infraestructura', value: 12.04, color: PALETTE_INDUSTRIAL[2] },
  { name: 'Calzado y accesorios', value: 7.14, color: PALETTE_INDUSTRIAL[3] },
  { name: 'Servicios de crédito', value: 6.23, color: PALETTE_INDUSTRIAL[4] },
  { name: 'Fabricantes de medicamentos', value: 4.93, color: PALETTE_INDUSTRIAL[5] },
  { name: 'Mercados de capitales', value: 4.63, color: PALETTE_INDUSTRIAL[6] },
  { name: 'Comercio minorista por Internet', value: 4.44, color: PALETTE_INDUSTRIAL[7] },
  { name: 'Software - Aplicación', value: 4.31, color: PALETTE_INDUSTRIAL[8] },
  { name: 'Contenido e información de Internet', value: 3.88, color: PALETTE_INDUSTRIAL[9] },
  { name: 'Bebidas sin alcohol', value: 3.74, color: PALETTE_INDUSTRIAL[10] },
  { name: 'Seguro', value: 3.60, color: PALETTE_INDUSTRIAL[11] },
  { name: 'Servicios de educación y formación', value: 3.57, color: PALETTE_INDUSTRIAL[12] },
];

const paisData: ChartItem[] = [
  { name: 'Estados Unidos de América', value: 47.95, color: PALETTE_PAIS[0] },
  { name: 'Liquidez', value: 16.10, color: PALETTE_PAIS[1] },
  { name: 'Brasil', value: 13.43, color: PALETTE_PAIS[2] },
  { name: 'República Popular de China', value: 10.48, color: PALETTE_PAIS[3] },
  { name: 'Dinamarca', value: 6.18, color: PALETTE_PAIS[4] },
  { name: 'Israel', value: 2.32, color: PALETTE_PAIS[5] },
  { name: 'Uruguay', value: 1.93, color: PALETTE_PAIS[6] },
  { name: 'Canadá', value: 1.62, color: PALETTE_PAIS[7] },
];

const tamanoData: ChartItem[] = [
  { name: 'Large Cap', value: 37.03, color: PALETTE_TAMANO[0] },
  { name: 'Mid Cap', value: 22.91, color: PALETTE_TAMANO[1] },
  { name: 'Liquidez', value: 16.10, color: PALETTE_TAMANO[2] },
  { name: 'Small Cap', value: 14.49, color: PALETTE_TAMANO[3] },
  { name: 'Mega Cap', value: 9.46, color: PALETTE_TAMANO[4] },
];

export function DiversificationGrid() {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--svi-primary)' }}>
        Diversificación de la Cartera
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SingleDonut title="Diversificación Sectorial" data={sectorialData} />
        <SingleDonut title="Diversificación Industrial" data={industrialData} />
        <SingleDonut title="Diversificación por País" data={paisData} />
        <SingleDonut title="Diversificación por Tamaño" data={tamanoData} />
      </div>
    </div>
  );
}
