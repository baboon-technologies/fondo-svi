interface TextSectionProps {
  title: string;
  paragraphs: string[];
}

export function TextSection({ title, paragraphs }: TextSectionProps) {
  return (
    <div className="mb-8">
      <div className="bg-blue-50 px-4 py-2 mb-4" style={{ borderLeft: '4px solid var(--svi-primary)' }}>
        <h3 className="text-base font-bold" style={{ color: 'var(--svi-primary)' }}>{title}</h3>
      </div>
      <div className="space-y-4 max-w-4xl">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-sm leading-relaxed text-justify" style={{ color: 'var(--svi-dark-gray)' }}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
