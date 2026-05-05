export function NetworkBackground() {
  return (
    <div className="w-full h-full bg-white flex items-center justify-center">
      <img
        src="/foto-stock.png"
        alt="SVI Hero"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export function FilterBackground() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-white via-blue-50/20 to-white relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(120)].map((_, i) => {
          const size = Math.random() * 8 + 4;
          const left = Math.random() * 100;
          const top = Math.random() * 50;
          const delay = Math.random() * 5;
          const duration = 8 + Math.random() * 4;

          return (
            <div
              key={i}
              className="absolute rounded-full bg-gray-300"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                animation: `filterDown ${duration}s ease-in-out ${delay}s infinite`,
                opacity: 0.4
              }}
            />
          );
        })}
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 10 + 6;
          const left = Math.random() * 100;
          const delay = Math.random() * 5;

          return (
            <div
              key={`selected-${i}`}
              className="absolute rounded-full bg-svi-primary"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                bottom: '10%',
                animation: `pulse ${2 + Math.random()}s ease-in-out ${delay}s infinite`,
                opacity: 0.6
              }}
            />
          );
        })}
      </div>
      <style>{`
        @keyframes filterDown {
          0% { transform: translateY(0); opacity: 0.4; }
          50% { opacity: 0.2; }
          100% { transform: translateY(80vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export function FunnelBackground() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-white via-cyan-50/20 to-blue-50/30 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-15">
        <svg width="100%" height="100%" viewBox="0 0 800 800" className="max-w-4xl">
          <defs>
            <linearGradient id="funnel-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#012878" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#012878" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          <path
            d="M 100 150 L 700 150 L 500 450 L 300 450 Z"
            fill="url(#funnel-gradient)"
            stroke="#012878"
            strokeWidth="2"
          />

          <path
            d="M 300 450 L 500 450 L 450 600 L 350 600 Z"
            fill="url(#funnel-gradient)"
            stroke="#012878"
            strokeWidth="2"
          />

          {[...Array(80)].map((_, i) => {
            const x = 100 + Math.random() * 600;
            const y = 150 + Math.random() * 50;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="3"
                fill="#012878"
                opacity="0.5"
                className="animate-pulse"
                style={{
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1.5 + Math.random()}s`
                }}
              />
            );
          })}

          {[...Array(30)].map((_, i) => {
            const x = 350 + Math.random() * 100;
            const y = 570 + Math.random() * 30;
            return (
              <circle
                key={`bottom-${i}`}
                cx={x}
                cy={y}
                r="4"
                fill="#012878"
                opacity="0.8"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export function ChartBackground() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-white via-blue-50/25 to-white relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 1000 600" className="max-w-5xl">
          <defs>
            <linearGradient id="chart-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#012878" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#012878" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          <path
            d="M 50 500 Q 200 450, 350 380 T 650 280 T 950 150"
            stroke="#012878"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />

          <path
            d="M 50 500 Q 200 450, 350 380 T 650 280 T 950 150 L 950 600 L 50 600 Z"
            fill="url(#chart-gradient)"
          />

          {[50, 200, 350, 500, 650, 800, 950].map((x, i) => {
            const y = 500 - i * 50;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="6"
                fill="#012878"
                className="animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              />
            );
          })}
        </svg>
      </div>

      <div className="absolute top-20 right-20 text-gray-400 font-mono text-sm opacity-20">
        <div>1995 - 2024</div>
      </div>
    </div>
  );
}
