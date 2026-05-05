import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartDataPoint {
  date: string;
  price: number;
  timestamp: number;
}

interface QuoteData {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: string;
  currency: string;
  lastUpdate: string;
  source?: string;
  chartData: ChartDataPoint[];
}

export default function SVIQuoteVisual() {
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mdzizyolyfflpzaqnbjw.supabase.co';
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
        const apiUrl = `${supabaseUrl}/functions/v1/svi-quote?symbol=0P0001TB5J.F`;

        console.log('[SVI-QUOTE CLIENT] Supabase URL:', supabaseUrl);
        console.log('[SVI-QUOTE CLIENT] Fetching from:', apiUrl);

        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'apikey': supabaseAnonKey,
          }
        });

        console.log('[SVI-QUOTE CLIENT] Response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('[SVI-QUOTE CLIENT] Error response:', errorText);
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        console.log('[SVI-QUOTE CLIENT] Data received:', JSON.stringify(data).substring(0, 200));
        console.log('[SVI-QUOTE CLIENT] Chart data points:', data.chartData?.length || 0);

        if (data.error) {
          throw new Error(data.error);
        }

        if (data.regularMarketPrice && data.regularMarketPrice > 0 && data.chartData && data.chartData.length > 0) {
          setQuoteData(data);
          setLoading(false);
          setError(false);
        } else {
          console.error('[SVI-QUOTE CLIENT] Invalid data structure:', {
            hasPrice: !!data.regularMarketPrice,
            hasChartData: !!data.chartData,
            chartLength: data.chartData?.length
          });
          throw new Error('Invalid data received');
        }
      } catch (err) {
        console.error('[SVI-QUOTE CLIENT] Error:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchQuote();
    const interval = setInterval(fetchQuote, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const isPositive = quoteData ? quoteData.regularMarketChange >= 0 : false;

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-svi-light-blue/5 rounded-2xl overflow-hidden shadow-xl border border-svi-light-grey">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-svi-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-svi-medium-grey text-sm font-medium">Cargando cotización en tiempo real...</p>
          </div>
        </div>
      ) : error ? (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-svi-light-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="w-10 h-10 text-svi-primary" />
            </div>
            <h3 className="text-xl font-bold text-svi-primary mb-3">
              Datos no disponibles
            </h3>
            <p className="text-svi-dark-grey text-sm mb-6 leading-relaxed">
              Consulta el rendimiento en tiempo real directamente en Yahoo Finance.
            </p>
            <a
              href="https://finance.yahoo.com/quote/0P0001TB5J.F/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-svi-primary text-white font-semibold rounded-lg hover:bg-svi-secondary transition-all shadow-lg hover:shadow-xl"
            >
              Ver en Yahoo Finance
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      ) : quoteData ? (
        <div className="absolute inset-0 flex flex-col p-3 sm:p-6">
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <div>
              <h3 className="text-[11px] sm:text-sm font-semibold text-svi-secondary uppercase tracking-wider">
                NAV en tiempo real
              </h3>
              <p className="text-[9px] sm:text-xs text-svi-medium-grey mt-0.5">
                {quoteData.symbol}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[9px] sm:text-xs text-svi-medium-grey">
                Última act.
              </p>
              <p className="text-[9px] sm:text-xs font-medium text-svi-dark-grey">
                {new Date(quoteData.regularMarketTime).toLocaleString('es-ES', {
                  day: '2-digit',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          <div className="mb-2 sm:mb-3">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-svi-primary">
              {quoteData.regularMarketPrice.toFixed(2)} {quoteData.currency}
            </div>
            <div className={`text-base sm:text-lg md:text-xl font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'} mt-0.5`}>
              {isPositive ? '+' : ''}{quoteData.regularMarketChange.toFixed(2)} ({isPositive ? '+' : ''}{quoteData.regularMarketChangePercent.toFixed(2)}%)
            </div>
            {quoteData.source && (
              <p className="text-[9px] sm:text-xs text-svi-medium-grey mt-1">
                Fuente: {quoteData.source === 'yahoo' ? 'Yahoo Finance' : 'Calculado'}
              </p>
            )}
          </div>

          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={quoteData.chartData} margin={{ top: 5, right: 5, left: -8, bottom: 0 }}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 9, fill: '#6B7280' }}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getDate()}/${date.getMonth() + 1}`;
                  }}
                  minTickGap={25}
                  height={30}
                />
                <YAxis
                  tick={{ fontSize: 9, fill: '#6B7280' }}
                  domain={['dataMin - 0.2', 'dataMax + 0.2']}
                  width={42}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '11px',
                    padding: '8px'
                  }}
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
                  }}
                  formatter={(value: number) => [`${value.toFixed(2)} EUR`, 'Precio']}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#003366"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-svi-light-grey flex justify-center">
            <a
              href="https://finance.yahoo.com/quote/0P0001TB5J.F/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-svi-primary text-[11px] sm:text-sm font-medium rounded-lg hover:bg-gray-50 border border-svi-light-grey transition-all shadow-sm hover:shadow-md"
            >
              Ver en Yahoo Finance
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
