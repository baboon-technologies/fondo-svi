interface DistributorInfo {
  distributor: string;
  responsable: string;
  telefono: string;
  email: string;
}

interface DistributorTableProps {
  info: DistributorInfo;
}

export function DistributorTable({ info }: DistributorTableProps) {
  const rows = [
    { label: 'Distribuidor', value: info.distributor },
    { label: 'Responsable de Relaciones con Inversores', value: info.responsable },
    { label: 'Teléfono', value: info.telefono },
    { label: 'Email', value: info.email },
  ];

  return (
    <div className="mb-8">
      <div className="bg-blue-50 px-4 py-2 mb-3" style={{ borderLeft: '4px solid var(--svi-primary)' }}>
        <h3 className="text-base font-bold" style={{ color: 'var(--svi-primary)' }}>Información del Distribuidor</h3>
      </div>
      <div className="border overflow-hidden" style={{ borderColor: 'var(--svi-light-gray)' }}>
        {rows.map((row, index) => (
          <div
            key={index}
            className={`flex flex-col sm:grid sm:grid-cols-2 gap-1 sm:gap-4 px-4 py-3 transition-all duration-300 ${
              index !== rows.length - 1 ? 'border-b' : ''
            }`}
            style={{
              borderColor: 'var(--svi-light-gray)',
              backgroundColor: index % 2 === 0 ? 'white' : '#F9FAFB'
            }}
          >
            <span className="text-xs font-bold" style={{ color: 'var(--svi-dark-gray)' }}>{row.label}</span>
            <span className="text-sm font-medium break-all" style={{ color: 'var(--svi-secondary)' }}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
