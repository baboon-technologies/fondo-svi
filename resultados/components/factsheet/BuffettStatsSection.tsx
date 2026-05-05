export function BuffettStatsSection() {
  return (
    <div>
      <div
        className="rounded-lg border p-8 bg-gray-50 border-gray-200"
        style={{ borderColor: 'var(--svi-light-gray)' }}
      >
        {/* Metric cards row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Left card — neutral */}
          <div
            className="flex-1 rounded-lg border p-6"
            style={{
              backgroundColor: '#f3f4f6',
              borderColor: 'var(--svi-light-gray)',
            }}
          >
            <p
              className="text-xs font-medium uppercase tracking-wide mb-3"
              style={{ color: 'var(--svi-medium-gray)' }}
            >
              Warren Buffett supera al índice
            </p>
            <p
              className="text-5xl sm:text-6xl font-bold leading-none mb-2"
              style={{ color: 'var(--svi-dark-gray)' }}
            >
              70%
            </p>
            <p className="text-sm" style={{ color: 'var(--svi-medium-gray)' }}>
              de los años
            </p>
          </div>

          {/* Right card — primary tinted */}
          <div
            className="flex-1 rounded-lg border p-6"
            style={{
              backgroundColor: '#dce6f5',
              borderColor: '#a3bbd2',
            }}
          >
            <p
              className="text-xs font-medium uppercase tracking-wide mb-3"
              style={{ color: 'var(--svi-secondary)' }}
            >
              El SVI supera al índice
            </p>
            <p
              className="text-5xl sm:text-6xl font-bold leading-none mb-2"
              style={{ color: 'var(--svi-primary)' }}
            >
              77%
            </p>
            <p className="text-sm" style={{ color: 'var(--svi-secondary)' }}>
              de los periodos
            </p>
          </div>
        </div>

        {/* Bottom row: photo + text */}
        <div className="flex items-center gap-4">
          <img
            src="/warren.png"
            alt="Warren Buffett"
            className="rounded-full object-cover flex-shrink-0"
            style={{ width: 56, height: 56 }}
          />
          <p className="text-sm leading-relaxed" style={{ color: 'var(--svi-dark-gray)' }}>
            Inversores excepcionales como Warren Buffett baten al índice el{' '}
            <strong>70%</strong> de los años — el SVI lo logra el{' '}
            <strong>77%</strong> de los periodos, con metodología sistemática y atemporal.
          </p>
        </div>
      </div>
    </div>
  );
}
