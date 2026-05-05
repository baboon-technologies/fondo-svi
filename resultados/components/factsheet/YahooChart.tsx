'use client';

import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartPoint {
  date: string;
  value: number;
}

interface ChartData {
  points: ChartPoint[];
  currency: string;
  currentPrice: number;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' });
};

const formatValue = (value: number) =>
  value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded px-3 py-2 shadow-md text-xs">
        <p className="text-gray-500 mb-1">{label}</p>
        <p className="font-semibold" style={{ color: '#1a3a5c' }}>
          {formatValue(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export function YahooChart({ ticker = '0P0001TB5J.F' }: { ticker?: string }) {
  const [data, setData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/yahoo-chart?ticker=${encodeURIComponent(ticker)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) {
          setError(true);
        } else {
          setData(d);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [ticker]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center" style={{ minHeight: '200px' }}>
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <span className="text-xs text-gray-400">Cargando gráfica...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full flex items-center justify-center" style={{ minHeight: '200px' }}>
        <span className="text-xs text-gray-400">Gráfica no disponible</span>
      </div>
    );
  }

  const minVal = Math.min(...data.points.map((p) => p.value));
  const maxVal = Math.max(...data.points.map((p) => p.value));
  const padding = (maxVal - minVal) * 0.05;

  const tickIndexes = [0, Math.floor(data.points.length / 4), Math.floor(data.points.length / 2), Math.floor((data.points.length * 3) / 4), data.points.length - 1];
  const ticks = tickIndexes.map((i) => data.points[i]?.date).filter(Boolean);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400 font-medium">Evolución últimos 12 meses</span>
        <a
          href={`https://finance.yahoo.com/quote/${ticker}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-400 hover:text-blue-600 transition-colors"
        >
          Yahoo Finance
        </a>
      </div>
      <ResponsiveContainer width="100%" height={190}>
        <AreaChart data={data.points} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1a5fa8" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#1a5fa8" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            ticks={ticks}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[minVal - padding, maxVal + padding]}
            tickFormatter={formatValue}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            width={70}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#1a5fa8"
            strokeWidth={1.5}
            fill="url(#chartGradient)"
            dot={false}
            activeDot={{ r: 3, fill: '#1a5fa8', strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
