import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] });

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://resultados-svi.vercel.app'),
  title: 'Resultados SVI — Systematic Value Investing US Markets',
  description:
    'Reporte mensual de resultados del fondo Systematic Value Investing US Markets (Gestión Boutique VII). Rentabilidad, cartera y archivo histórico.',
  openGraph: {
    title: 'Resultados SVI — Systematic Value Investing US Markets',
    description:
      'Reporte mensual de resultados del fondo Systematic Value Investing US Markets (Gestión Boutique VII).',
    url: 'https://resultados-svi.vercel.app',
    siteName: 'Resultados SVI',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/svi2026ytd.png',
        width: 1200,
        height: 630,
        alt: 'Rentabilidad YTD — Systematic Value Investing US Markets',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resultados SVI — Systematic Value Investing US Markets',
    description:
      'Reporte mensual de resultados del fondo Systematic Value Investing US Markets (Gestión Boutique VII).',
    images: ['/svi2026ytd.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="light">
      <body className={`${inter.className} ${playfair.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
