import {
  ShieldCheck,
  Globe,
  Rocket,
  Scale,
  Filter,
  TrendingUp,
  Network,
  Cpu,
  Target,
  type LucideIcon,
} from 'lucide-react';
import SVIEvolutionChart from './SVIEvolutionChart';

interface Milestone {
  n: number;
  version: string;
  desc: string;
  Icon: LucideIcon;
}

const MILESTONES: Milestone[] = [
  { n: 1, version: 'SVI 1.0', desc: 'Cuenta auditada en Interactive Brokers.', Icon: ShieldCheck },
  { n: 2, version: 'SVI US Markets', desc: 'Creación del fondo de inversión con AndBank.', Icon: Globe },
  { n: 3, version: 'SVI 2.0', desc: 'Nueva versión de la metodología SVI.', Icon: Rocket },
  { n: 4, version: 'Reducción comisiones', desc: 'Reducción de comisiones del fondo con la CNMV.', Icon: Scale },
  { n: 5, version: 'SVI 2.1', desc: 'Reducción de 40 holdings a 30 holdings.', Icon: Filter },
  { n: 6, version: 'SVI 2.2', desc: 'Incluimos venta de derivados.', Icon: TrendingUp },
  { n: 7, version: 'SVI 3.0', desc: 'Nueva generación de la metodología SVI.', Icon: Network },
  { n: 8, version: 'SVI 3.1', desc: 'Creación del indicador AI Protected.', Icon: Cpu },
  { n: 9, version: 'SVI 3.2', desc: 'Eliminación del equiponderado y mayor peso en tesis de alta convicción.', Icon: Target },
];

export default function SVIEvolution() {
  return (
    <div className="py-16 sm:py-20 md:py-24 bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <p className="font-mono text-xs text-svi-medium-grey mb-3 tracking-wide">
            ABRIL 2023 → HOY
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-svi-primary mb-4">
            La evolución de la metodología SVI
          </h2>
          <p className="text-base sm:text-lg text-svi-dark-grey">
            Mejoramos el sistema de forma continua. Cada versión es un avance validado con
            simulaciones históricas y aprobado por el comité de inversiones antes de aplicarse.
          </p>
        </div>

        {/* Gráfico de evolución (SVG nativo) */}
        <div className="mb-12 sm:mb-14">
          <SVIEvolutionChart />
        </div>

        {/* Timeline nativo — en desktop la info ya está en el gráfico */}
        <ol className="lg:hidden relative max-w-3xl mx-auto">
          {/* línea vertical */}
          <span
            className="absolute left-5 sm:left-6 top-2 bottom-2 w-px bg-svi-light-blue/60"
            aria-hidden="true"
          />
          {MILESTONES.map((m) => (
            <li key={m.n} className="relative flex gap-4 sm:gap-6 pb-8 last:pb-0">
              {/* nodo con número */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-svi-primary text-white flex items-center justify-center font-bold text-sm sm:text-base shadow-md">
                  {m.n}
                </div>
              </div>
              {/* tarjeta */}
              <div className="flex-1 bg-white rounded-xl border border-svi-light-grey shadow-sm p-4 sm:p-5 -mt-0.5">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <m.Icon className="w-5 h-5 text-svi-secondary flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-bold text-svi-primary leading-tight">
                    {m.version}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-svi-dark-grey leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
