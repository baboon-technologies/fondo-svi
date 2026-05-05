interface Feature {
  label: string;
  value: string;
}

interface FundFeaturesProps {
  featuresLeft: Feature[];
  featuresRight: Feature[];
}

export function FundFeatures({ featuresLeft, featuresRight }: FundFeaturesProps) {
  return (
    <div className="mb-8">
      <div className="bg-blue-50 px-4 py-2 mb-3" style={{ borderLeft: '4px solid var(--svi-primary)' }}>
        <h3 className="text-base font-bold" style={{ color: 'var(--svi-primary)' }}>Características del Fondo</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border" style={{ borderColor: 'var(--svi-light-gray)' }}>
          {featuresLeft.map((feature, index) => (
            <div
              key={index}
              className={`grid grid-cols-2 gap-4 px-4 py-2 ${
                index !== featuresLeft.length - 1 ? 'border-b' : ''
              }`}
              style={{
                borderColor: 'var(--svi-light-gray)',
                backgroundColor: index % 2 === 0 ? 'white' : '#F9FAFB'
              }}
            >
              <span className="text-xs font-bold" style={{ color: 'var(--svi-dark-gray)' }}>{feature.label}</span>
              <span className="text-xs" style={{ color: 'var(--svi-medium-gray)' }}>{feature.value}</span>
            </div>
          ))}
        </div>
        <div className="border" style={{ borderColor: 'var(--svi-light-gray)' }}>
          {featuresRight.map((feature, index) => (
            <div
              key={index}
              className={`grid grid-cols-2 gap-4 px-4 py-2 ${
                index !== featuresRight.length - 1 ? 'border-b' : ''
              }`}
              style={{
                borderColor: 'var(--svi-light-gray)',
                backgroundColor: index % 2 === 0 ? 'white' : '#F9FAFB'
              }}
            >
              <span className="text-xs font-bold" style={{ color: 'var(--svi-dark-gray)' }}>{feature.label}</span>
              <span className="text-xs" style={{ color: 'var(--svi-medium-gray)' }}>{feature.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
