'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { useState } from 'react';

interface ChartData {
  name: string;
  percentage: number;
  color: string;
}

interface DonutChartCardProps {
  title: string;
  data: ChartData[];
}

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export function DonutChartCard({ title, data }: DonutChartCardProps) {
  const chartData = data.filter(item => item.percentage > 0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="mb-8 bg-white">
      <div className="bg-blue-50 px-4 py-2 mb-4" style={{ borderLeft: '4px solid var(--svi-primary)' }}>
        <h3 className="text-base font-bold" style={{ color: 'var(--svi-primary)' }}>{title}</h3>
      </div>
      <div className="flex flex-col md:flex-row items-start gap-8 bg-white border p-6" style={{ borderColor: 'var(--svi-light-gray)' }}>
        <div className="w-full md:w-1/2">
          <div className="h-64 opacity-0 animate-slideInLeft" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="percentage"
                  label={({ percentage }) => `${percentage}%`}
                  labelLine={false}
                  animationBegin={200}
                  animationDuration={1500}
                  animationEasing="ease-out"
                  activeIndex={activeIndex !== null ? activeIndex : undefined}
                  activeShape={renderActiveShape}
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      className="cursor-pointer transition-all duration-300"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center">
          <div className="space-y-2 w-full">
            {chartData.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 group transition-all duration-300 opacity-0 animate-slideIn cursor-pointer"
                style={{ animationDelay: `${800 + index * 100}ms`, animationFillMode: 'forwards' }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-125"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm font-medium transition-all duration-300" style={{ color: 'var(--svi-dark-gray)' }}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
