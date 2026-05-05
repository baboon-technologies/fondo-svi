import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Download } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isWide, setIsWide] = useState(() => window.innerWidth >= 1100);
  const location = useLocation();

  useEffect(() => {
    const onResize = () => setIsWide(window.innerWidth >= 1100);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const links = [
    { path: '/', label: 'HOME' },
    { path: '/metodologia', label: 'METODOLOGÍA' },
    { path: '/resultados', label: 'RESULTADOS' },
    { path: '/equipo', label: 'EQUIPO' },
    { path: '/recursos', label: 'MEDIA' },
    { path: '/invertir', label: 'INVERTIR' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-svi-light-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Mobile layout: logo + ISIN/download left, hamburger right */}
        <div className={`flex items-center justify-between h-16 ${isWide ? 'hidden' : 'flex'}`}>
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <span className="text-lg font-black text-svi-primary tracking-widest">SVI</span>
            </Link>
            <div className="flex items-center gap-2 border-l border-svi-light-grey pl-3">
              <div className="flex flex-col leading-none">
                <span className="text-[8px] font-semibold text-svi-medium-grey tracking-wider uppercase">ISIN</span>
                <span className="text-[10px] font-mono font-semibold text-svi-dark-grey tracking-wider mt-0.5">ES0131444137</span>
              </div>
              <a
                href="/SVI_para_institucionales.pdf"
                download
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-svi-primary text-white text-[10px] font-semibold tracking-wide rounded hover:bg-svi-dark transition-colors whitespace-nowrap"
              >
                <Download className="w-3 h-3" />
                <span>Reporte</span>
              </a>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-svi-medium-grey hover:text-svi-dark-grey"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop layout: logo left | nav center | ISIN+download right */}
        <div className={`${isWide ? 'grid' : 'hidden'} grid-cols-[auto_1fr_auto] items-center h-20 gap-6`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black text-svi-primary tracking-widest">SVI</span>
              <span className="text-[10px] font-semibold text-svi-primary tracking-[0.2em] uppercase mt-0.5">Systematic Value Investing</span>
            </div>
          </Link>

          {/* Nav links centered */}
          <div className="flex items-center justify-center gap-6">
            {links.map((link) => (
              link.external ? (
                <a
                  key={link.path}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-svi-medium-grey hover:text-svi-primary transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors whitespace-nowrap ${
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

          {/* ISIN + download */}
          <div className="flex items-center gap-3 border-l border-svi-light-grey pl-5 shrink-0">
            <div className="flex flex-col leading-none">
              <span className="text-[8px] font-semibold text-svi-medium-grey tracking-wider uppercase">ISIN</span>
              <span className="text-[11px] font-mono font-semibold text-svi-dark-grey tracking-wider mt-0.5">ES0131444137</span>
            </div>
            <a
              href="/SVI_para_institucionales.pdf"
              download
              className="flex items-center gap-1.5 px-4 py-2 bg-svi-primary text-white text-xs font-semibold tracking-wide rounded hover:bg-svi-dark transition-colors whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              Descárgate el reporte completo
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
          </div>
        </div>
      )}
    </nav>
  );
}
