interface FooterProps {
  line1: string;
  line2: string;
}

export function Footer({ line1, line2 }: FooterProps) {
  return (
    <footer className="mt-12 pt-4 border-t-4" style={{ borderColor: 'var(--svi-primary)' }}>
      <div className="space-y-2">
        <p className="text-xs" style={{ color: 'var(--svi-medium-gray)' }}>{line1}</p>
        <p className="text-xs italic" style={{ color: 'var(--svi-medium-gray)' }}>{line2}</p>
      </div>
    </footer>
  );
}
