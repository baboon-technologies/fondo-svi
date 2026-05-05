import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const MONTH_ORDER: Record<string, number> = {
  Enero: 1, Febrero: 2, Marzo: 3, Abril: 4, Mayo: 5, Junio: 6,
  Julio: 7, Agosto: 8, Septiembre: 9, Octubre: 10, Noviembre: 11, Diciembre: 12,
};

function parseFilename(filename: string) {
  const match = filename.match(/^reporte_SVI_([A-Za-záéíóúüÁÉÍÓÚÜ]+)_(\d{4})\.pdf$/i);
  if (!match) return null;
  const [, month, year] = match;
  const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
  return { month: monthCapitalized, year };
}

export async function GET() {
  const docsDir = path.join(process.cwd(), 'public', 'documents');

  let files: string[] = [];
  try {
    files = fs.readdirSync(docsDir).filter((f) => f.endsWith('.pdf'));
  } catch {
    return NextResponse.json({ years: [] });
  }

  const byYear: Record<string, { label: string; name: string; path: string; monthOrder: number }[]> = {};

  for (const file of files) {
    const parsed = parseFilename(file);
    if (!parsed) continue;
    const { month, year } = parsed;
    if (!byYear[year]) byYear[year] = [];
    byYear[year].push({
      label: `Reporte SVI — ${month} ${year}`,
      name: file,
      path: `/documents/${file}`,
      monthOrder: MONTH_ORDER[month] ?? 0,
    });
  }

  const years = Object.entries(byYear)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, reports]) => ({
      year,
      files: reports
        .sort((a, b) => b.monthOrder - a.monthOrder)
        .map(({ label, name, path }) => ({ label, name, path })),
    }));

  return NextResponse.json({ years });
}
