'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface QuoteData {
  price: string;
  change: string;
  changePercent: string;
  currency: string;
  timestamp: string;
  stale?: boolean;
}

interface LiveQuoteCardProps {
  ticker: string;
}

export function LiveQuoteCard({ ticker }: LiveQuoteCardProps) {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    try {
      const response = await fetch(`/api/yahoo-quote?ticker=${ticker}`);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      setQuote(data);
      setError(null);
    } catch (err) {
      setError('No disponible temporalmente');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
    const interval = setInterval(fetchQuote, 60000);
    return () => clearInterval(interval);
  }, [ticker]);

  if (loading) {
    return (
      <Card className="p-6 border" style={{ backgroundColor: '#F0F7FF', borderColor: 'var(--svi-light-gray)' }}>
        <div className="animate-pulse">
          <div className="h-4 rounded w-24 mb-4" style={{ backgroundColor: 'var(--svi-light-blue)' }}></div>
          <div className="h-8 rounded w-32" style={{ backgroundColor: 'var(--svi-light-blue)' }}></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 border" style={{ backgroundColor: '#FEF2F2', borderColor: '#FECACA' }}>
        <p className="text-sm font-medium" style={{ color: '#DC2626' }}>Cotización en tiempo real</p>
        <p className="text-sm mt-1" style={{ color: '#EF4444' }}>No disponible temporalmente</p>
      </Card>
    );
  }

  if (!quote) return null;

  const isPositive = parseFloat(quote.change) >= 0;
  const updateTime = new Date(quote.timestamp).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card className="p-6 border hover-lift transition-all duration-300" style={{ backgroundColor: '#F0F7FF', borderColor: 'var(--svi-light-gray)' }}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--svi-medium-gray)' }}>NAV en tiempo real</p>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-2xl sm:text-3xl font-bold transition-all duration-500" style={{ color: 'var(--svi-primary)' }}>{quote.price}</span>
            <span className="text-sm" style={{ color: 'var(--svi-medium-gray)' }}>{quote.currency}</span>
          </div>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className={`text-base sm:text-lg font-semibold transition-all duration-300 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{quote.change}
            </span>
            <span className={`text-sm font-medium px-2 py-1 rounded transition-all duration-300 ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {isPositive ? '+' : ''}{quote.changePercent}%
            </span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs" style={{ color: 'var(--svi-medium-gray)' }}>Actualizado</p>
          <p className="text-sm font-medium" style={{ color: 'var(--svi-dark-gray)' }}>{updateTime}</p>
          {quote.stale && (
            <p className="text-xs text-amber-600 mt-1">Datos en caché</p>
          )}
        </div>
      </div>
    </Card>
  );
}
