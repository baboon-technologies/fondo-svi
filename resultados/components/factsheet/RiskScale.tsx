import { YahooChart } from './YahooChart';

interface RiskScaleProps {
  level: number;
  ticker?: string;
}

export function RiskScale({ level, ticker }: RiskScaleProps) {
  return (
    <div className="mb-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
      <div className="w-full md:flex-1">
        <div className="inline-block bg-blue-50 px-4 py-2 mb-3 transition-all duration-300" style={{ borderLeft: '4px solid var(--svi-primary)' }}>
          <h2 className="text-base font-bold" style={{ color: 'var(--svi-primary)' }}>Información del Riesgo</h2>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 mb-3">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => {
            const isActive = num === level;
            const isFilled = num < level;
            return (
              <div
                key={num}
                className={`w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center border-2 font-bold text-base sm:text-lg transition-all duration-300`}
                style={{
                  backgroundColor: isActive ? 'var(--svi-secondary)' : isFilled ? 'var(--svi-light-blue)' : 'white',
                  color: isActive ? 'white' : isFilled ? 'var(--svi-primary)' : 'var(--svi-medium-gray)',
                  borderColor: isActive ? 'var(--svi-secondary)' : isFilled ? 'var(--svi-light-blue)' : 'var(--svi-light-gray)'
                }}
              >
                {num}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-xs sm:text-sm mb-1 font-medium" style={{ color: 'var(--svi-dark-gray)' }}>
          <span>Menor Riesgo</span>
          <span>Mayor Riesgo</span>
        </div>
        <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--svi-medium-gray)' }}>
          <span>Normalmente Menores<br />Recompensas</span>
          <span className="text-right">Normalmente Mayores<br />Recompensas</span>
        </div>
      </div>

      <div className="w-full md:flex-1">
        <YahooChart ticker={ticker} />
      </div>
    </div>
  );
}
