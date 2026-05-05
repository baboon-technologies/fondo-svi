'use client';

import { useEffect, useState } from 'react';
import { FileText, ChevronDown, ChevronUp, Download } from 'lucide-react';

interface ReportFile {
  name: string;
  label: string;
  path: string;
}

interface YearGroup {
  year: string;
  files: ReportFile[];
}

export function ReportsArchive() {
  const [archive, setArchive] = useState<YearGroup[]>([]);
  const [openYears, setOpenYears] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports')
      .then((res) => res.json())
      .then((data: { years: YearGroup[] }) => {
        setArchive(data.years);
        if (data.years.length > 0) {
          setOpenYears(new Set([data.years[0].year]));
        }
      })
      .catch(() => setArchive([]))
      .finally(() => setLoading(false));
  }, []);

  function toggle(year: string) {
    setOpenYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) {
        next.delete(year);
      } else {
        next.add(year);
      }
      return next;
    });
  }

  if (loading) {
    return (
      <div className="mb-8">
        <div className="bg-blue-50 px-4 py-2 mb-3" style={{ borderLeft: '4px solid var(--svi-primary)' }}>
          <h3 className="text-base font-bold" style={{ color: 'var(--svi-primary)' }}>
            Archivo Historico de Reportes
          </h3>
        </div>
        <div className="border rounded-sm p-4 animate-pulse" style={{ borderColor: 'var(--svi-light-gray)' }}>
          <div className="h-4 rounded w-24 mb-3" style={{ backgroundColor: 'var(--svi-light-blue, #dbeafe)' }} />
          <div className="h-4 rounded w-48" style={{ backgroundColor: 'var(--svi-light-blue, #dbeafe)' }} />
        </div>
      </div>
    );
  }

  if (archive.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="bg-blue-50 px-4 py-2 mb-3" style={{ borderLeft: '4px solid var(--svi-primary)' }}>
        <h3 className="text-base font-bold" style={{ color: 'var(--svi-primary)' }}>
          Archivo Historico de Reportes
        </h3>
      </div>

      <div className="border divide-y overflow-hidden rounded-sm" style={{ borderColor: 'var(--svi-light-gray)' }}>
        {archive.map(({ year, files }) => {
          const isOpen = openYears.has(year);
          return (
            <div key={year}>
              <button
                onClick={() => toggle(year)}
                className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-200 hover:bg-blue-50 focus:outline-none"
                style={{ backgroundColor: isOpen ? '#EFF6FF' : 'white' }}
                aria-expanded={isOpen}
              >
                <span className="text-sm font-bold" style={{ color: 'var(--svi-primary)' }}>
                  {year}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--svi-primary)' }} />
                ) : (
                  <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--svi-medium-gray)' }} />
                )}
              </button>

              {isOpen && (
                <div className="divide-y" style={{ backgroundColor: '#FAFAFA', borderColor: 'var(--svi-light-gray)' }}>
                  {files.map((file) => (
                    <a
                      key={file.name}
                      href={file.path}
                      download={file.name}
                      className="flex items-center justify-between px-6 py-3 group transition-colors duration-200 hover:bg-blue-50"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--svi-secondary)' }} />
                        <span
                          className="text-sm font-medium truncate group-hover:underline"
                          style={{ color: 'var(--svi-dark-gray)' }}
                        >
                          {file.label}
                        </span>
                      </div>
                      <Download
                        className="w-4 h-4 flex-shrink-0 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ color: 'var(--svi-primary)' }}
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
