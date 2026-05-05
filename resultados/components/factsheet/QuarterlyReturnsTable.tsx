interface QuarterlyReturn {
  year: string;
  quarters: string[];
  total: string;
}

interface QuarterlyReturnsTableProps {
  returns: QuarterlyReturn[];
}

const quarterNames = ['Q1', 'Q2', 'Q3', 'Q4'];

export function QuarterlyReturnsTable({ returns }: QuarterlyReturnsTableProps) {
  return (
    <div className="mb-8">
      <div className="bg-blue-50 px-4 py-2 mb-3" style={{ borderLeft: '4px solid var(--svi-primary)' }}>
        <h3 className="text-base font-bold" style={{ color: 'var(--svi-primary)' }}>Rendimiento Trimestral</h3>
      </div>
      <div className="overflow-x-auto border" style={{ borderColor: 'var(--svi-light-gray)' }}>
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr style={{ backgroundColor: '#F9FAFB' }}>
              <th className="border px-3 py-2 text-center font-bold" style={{ borderColor: 'var(--svi-light-gray)', color: 'var(--svi-primary)' }}></th>
              {quarterNames.map((quarter) => (
                <th key={quarter} className="border px-3 py-2 text-center font-bold" style={{ borderColor: 'var(--svi-light-gray)', color: 'var(--svi-primary)' }}>
                  {quarter}
                </th>
              ))}
              <th className="border px-3 py-2 text-center font-bold" style={{ borderColor: 'var(--svi-light-gray)', color: 'var(--svi-primary)' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((row) => (
              <tr key={row.year} className="transition-colors duration-200">
                <td className="border px-3 py-2 text-center font-bold transition-all duration-200" style={{ borderColor: 'var(--svi-light-gray)', backgroundColor: '#F9FAFB', color: 'var(--svi-secondary)' }}>
                  {row.year}
                </td>
                {row.quarters.map((value, index) => (
                  <td
                    key={index}
                    className={`border px-3 py-2 text-center font-medium transition-all duration-200 ${
                      value === '-' ? 'text-gray-400' : parseFloat(value) >= 0 ? 'text-green-700' : 'text-red-700'
                    }`}
                    style={{ borderColor: 'var(--svi-light-gray)' }}
                  >
                    {value}
                  </td>
                ))}
                <td className="border px-3 py-2 text-center font-bold transition-all duration-200" style={{ borderColor: 'var(--svi-light-gray)', backgroundColor: '#F9FAFB', color: 'var(--svi-secondary)' }}>
                  {row.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
