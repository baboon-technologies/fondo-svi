export function CurrentInvestments() {
  return (
    <div className="pt-12 pb-4">
      {/* SVI US Markets chart vs benchmark */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden mb-12">
        <img
          src="/deck/svi-us-markets-chart.png"
          alt="SVI US Markets frente a su benchmark y tabla de rentabilidades trimestrales"
          className="w-full h-auto"
        />
      </div>

      {/* Current investments map */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8" style={{ color: 'var(--svi-primary)' }}>
        Conoce nuestras inversiones actuales.
      </h2>
      <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
        <img
          src="/deck/sp500-map.png"
          alt="Mapa de compañías SVI frente al universo del S&P500, por calidad y precio"
          className="w-full h-auto"
        />
      </div>
      <p className="text-sm mt-3" style={{ color: 'var(--svi-medium-gray)' }}>
        Nuestras compañías (círculos azules) frente al universo del S&amp;P500, por calidad y precio.
      </p>
      <a
        href="https://app.svinvesting.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-xs mt-1 hover:underline"
        style={{ color: 'var(--svi-primary)' }}
      >
        Explóralo en directo en app.svinvesting.com
      </a>
    </div>
  );
}
