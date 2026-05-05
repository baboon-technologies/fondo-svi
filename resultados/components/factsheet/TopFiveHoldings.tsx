interface TopFiveItem {
  name: string;
  percentage: string;
}

const defaultTopFive: TopFiveItem[] = [
  { name: "Genmab AS", percentage: "4,39%" },
  { name: "Crocs", percentage: "3,94%" },
  { name: "Monster Beverage Corp", percentage: "3,74%" },
  { name: "Palomar Holdings", percentage: "3,60%" },
  { name: "Afya Ltd", percentage: "3,57%" }
];

interface TopFiveHoldingsProps {
  items?: TopFiveItem[];
}

export function TopFiveHoldings({ items = defaultTopFive }: TopFiveHoldingsProps) {
  return (
    <div className="mb-8">
      <div className="inline-block bg-gray-100 px-4 py-2 mb-4 rounded-md">
        <h3 className="text-sm font-bold" style={{ color: 'var(--svi-primary)' }}>
          Top 5 Acciones
        </h3>
      </div>

      <div className="bg-white space-y-0">
        {items.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center py-4">
              <span className="text-base text-gray-900">{item.name}</span>
              <span className="text-base font-semibold text-gray-900">{item.percentage}</span>
            </div>
            {index < items.length - 1 && (
              <div className="h-px" style={{ backgroundColor: 'var(--svi-primary)', opacity: 0.4 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
