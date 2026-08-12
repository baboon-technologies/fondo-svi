import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Download, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

const REPORT_URL = 'https://reports.svinvesting.com/ultimo-reporte';
const PLATFORM_URL = 'https://app.svinvesting.com/';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isWide, setIsWide] = useState(() => window.innerWidth >= 1280);
  const location = useLocation();

  useEffect(() => {
    const onResize = () => setIsWide(window.innerWidth >= 1280);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const links: { path: string; label: string; external?: boolean }[] = [
    { path: '/metodologia', label: '¿CÓMO FUNCIONA?' },
    { path: '/resultados', label: 'RESULTADOS' },
    { path: '/equipo', label: 'EQUIPO' },
    { path: '/recursos', label: 'MEDIA' },
    { path: '/invertir', label: '¿CÓMO INVERTIR?' },
    { path: 'https://www.svinvesting.com', label: 'SOBRE SVI', external: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  const logo = (compact: boolean) => (
    <Link to="/" className="flex items-center shrink-0">
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1.5 whitespace-nowrap">
          <span className={`${compact ? 'text-lg' : 'text-2xl'} font-black text-svi-primary tracking-widest`}>SVI</span>
          <span className={`${compact ? 'text-[10px]' : 'text-sm'} font-bold text-svi-primary tracking-[0.15em] whitespace-nowrap`}>- US MARKETS</span>
        </div>
        <span className={`${compact ? 'text-[8px]' : 'text-[10px]'} font-mono font-semibold text-svi-medium-grey tracking-[0.18em] mt-0.5 whitespace-nowrap`}>
          ISIN: ES0131444137
        </span>
      </div>
    </Link>
  );

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-svi-light-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Mobile layout: logo left, download + hamburger right */}
        <div className={`flex items-center justify-between h-16 ${isWide ? 'hidden' : 'flex'}`}>
          {logo(true)}
          <div className="flex items-center gap-2">
            <a
              href={REPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-svi-primary text-white text-[10px] font-semibold tracking-wide rounded hover:bg-svi-secondary transition-colors whitespace-nowrap"
            >
              <Download className="w-3 h-3" />
              <span>Reporte (PDF)</span>
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-svi-medium-grey hover:text-svi-dark-grey"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop layout: logo left | nav center | buttons right */}
        <div className={`${isWide ? 'grid' : 'hidden'} grid-cols-[auto_1fr_auto] items-center h-20 gap-6`}>
          {logo(false)}

          {/* Nav links centered */}
          <div className="flex items-center justify-center gap-5">
            {links.map((link) => (
              link.external ? (
                <a
                  key={link.path}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium text-svi-medium-grey hover:text-svi-primary transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[13px] font-medium transition-colors whitespace-nowrap ${
                    isActive(link.path)
                      ? 'text-svi-primary'
                      : 'text-svi-medium-grey hover:text-svi-primary'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={REPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-svi-primary text-white text-[11px] font-semibold tracking-wide rounded hover:bg-svi-secondary transition-colors whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              Descarga Reporte Completo (PDF)
            </a>
            <a
              href={PLATFORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 text-white text-[11px] font-semibold tracking-wide rounded hover:bg-emerald-700 transition-colors whitespace-nowrap"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              ACCEDE A LA PLATAFORMA
            </a>
          </div>
        </div>

      </div>

      {isOpen && !isWide && (
        <div className="bg-white border-b border-svi-light-grey shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {links.map((link) => (
              link.external ? (
                <a
                  key={link.path}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-medium py-2 text-svi-medium-grey hover:text-svi-primary transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm font-medium py-2 transition-colors ${
                    isActive(link.path)
                      ? 'text-svi-primary'
                      : 'text-svi-medium-grey hover:text-svi-primary'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <a
                href={REPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-svi-primary text-white text-xs font-semibold tracking-wide rounded hover:bg-svi-secondary transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Descarga Reporte Completo (PDF)
              </a>
              <a
                href={PLATFORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white text-xs font-semibold tracking-wide rounded hover:bg-emerald-700 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                ACCEDE A LA PLATAFORMA
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
