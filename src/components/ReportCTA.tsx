import { Download } from 'lucide-react';

export default function ReportCTA() {
  return (
    <section className="py-14 bg-white border-t border-svi-light-grey">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <a
          href="https://www.svinvesting.com/ultimo-reporte"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-svi-primary text-white text-base font-semibold tracking-wide rounded-lg hover:bg-svi-secondary transition-colors shadow-lg"
        >
          <Download className="w-5 h-5" />
          Descarga Reporte Completo (PDF)
        </a>
      </div>
    </section>
  );
}
