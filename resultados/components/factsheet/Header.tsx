import Image from 'next/image';

interface HeaderProps {
  month: string;
  year: string;
  title: string;
  subtitle: string;
}

export function Header({ month, year, title, subtitle }: HeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-8 gap-4">
      <div className="flex-1">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight transition-all duration-300" style={{ color: 'var(--svi-primary)' }}>
          {title}
        </h1>
        <p className="text-base sm:text-xl font-semibold transition-colors duration-300" style={{ color: 'var(--svi-secondary)' }}>{subtitle}</p>
      </div>
      <div className="flex items-center gap-4 sm:gap-6 sm:ml-8 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Image src="/CNMVLogo.jpg" alt="CNMV Logo" width={70} height={42} className="object-contain transition-opacity duration-300 hover:opacity-90 flex-shrink-0" />
          <a
            href="/Folleto_CNMV_SVI_US_Markets.pdf"
            download="Folleto_CNMV_SVI_US_Markets.pdf"
            className="text-xs font-semibold leading-tight underline underline-offset-2 hover:opacity-75 transition-opacity duration-200 max-w-[90px]"
            style={{ color: '#012878' }}
          >
            Descarga el Folleto de CNMV - SVI US Markets
          </a>
        </div>
        <div className="transition-transform duration-300 hover:scale-105">
          <Image src="/image.png" alt="SVI - Systematic Value Investing" width={100} height={50} className="transition-opacity duration-300 hover:opacity-90" />
        </div>
      </div>
    </div>
  );
}
