interface TwoColumnIntroProps {
  description: string[];
  investmentObjective: {
    title: string;
    text: string;
  };
}

export function TwoColumnIntro({ description, investmentObjective }: TwoColumnIntroProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-8">
      <div className="space-y-4">
        {description.map((paragraph, index) => (
          <p key={index} className="text-sm leading-relaxed text-justify" style={{ color: 'var(--svi-dark-gray)' }}>
            {paragraph}
          </p>
        ))}
      </div>
      <div>
        <div className="border-2 p-6" style={{ borderColor: 'var(--svi-light-gray)', backgroundColor: '#F9FAFB' }}>
          <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--svi-primary)' }}>{investmentObjective.title}</h3>
          <p className="text-sm leading-relaxed text-justify" style={{ color: 'var(--svi-dark-gray)' }}>
            {investmentObjective.text}
          </p>
        </div>
      </div>
    </div>
  );
}
