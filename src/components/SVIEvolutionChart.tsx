import { useMemo } from 'react';
import {
  Shield,
  Globe,
  Rocket,
  Scale,
  Filter,
  TrendingUp,
  Settings,
  Cpu,
  Target,
  type LucideIcon,
} from 'lucide-react';

// viewBox
const W = 1600;
const H = 600;
const L = 100;     // margen izq (etiquetas %, incluye el "-10,00%")
const R = 1548;    // borde derecho del área de plot
const T = 24;      // margen sup
const B = 528;     // borde inf del área de plot

const T0 = 2023.25;
const T1 = 2026.5;
const V0 = -10;
const V1 = 50;

const xFor = (t: number) => L + ((t - T0) / (T1 - T0)) * (R - L);
const yFor = (v: number) => B - ((v - V0) / (V1 - V0)) * (B - T);

interface Callout {
  title: string;
  lines: string[];
  Icon: LucideIcon;
  t: number;   // punto: fecha
  v: number;   // punto: rentabilidad %
  dx: number;  // caja: desplazamiento X respecto al punto
  dy: number;  // caja: desplazamiento Y respecto al punto
  bw: number;  // caja: ancho
  bh: number;  // caja: alto
}

const CALLOUTS: Callout[] = [
  { title: 'SVI 1.0', lines: ['Cuenta Auditada en', 'Interactive Brokers'], Icon: Shield,
    t: 2023.42, v: 3.3, dx: -50, dy: -142, bw: 233, bh: 86 },
  { title: 'SVI US Markets', lines: ['Creación del Fondo de', 'Inversión con AndBank'], Icon: Globe,
    t: 2024.48, v: 28, dx: -278, dy: -94, bw: 259, bh: 86 },
  { title: 'SVI 2.0', lines: ['Nueva versión de la', 'metodología SVI'], Icon: Rocket,
    t: 2024.98, v: 44.8, dx: -300, dy: -44, bw: 233, bh: 86 },
  { title: 'Reducción comisiones', lines: ['Reducción Comisiones', 'Fondo con la CNMV'], Icon: Scale,
    t: 2025.24, v: 38.6, dx: -97, dy: -98, bw: 327, bh: 86 },
  { title: 'SVI 2.1', lines: ['Reducción de 40', 'holdings a 30 holdings'], Icon: Filter,
    t: 2025.36, v: 23, dx: -281, dy: -20, bw: 256, bh: 86 },
  { title: 'SVI 2.2', lines: ['Incluimos venta', 'de derivados'], Icon: TrendingUp,
    t: 2025.70, v: 28.4, dx: -192, dy: -96, bw: 200, bh: 86 },
  { title: 'SVI 3.0', lines: ['Nueva generación de la', 'metodología SVI'], Icon: Settings,
    t: 2026.11, v: 36.8, dx: -144, dy: -105, bw: 264, bh: 86 },
  { title: 'SVI 3.1', lines: ['Creación del', 'indicador AI', 'Protected'], Icon: Cpu,
    t: 2026.19, v: 30.4, dx: 10, dy: -69, bw: 175, bh: 106 },
  { title: 'SVI 3.2', lines: ['Eliminación del equiponderado', 'y mayor peso en tesis de alta', 'convicción'], Icon: Target,
    t: 2026.33, v: 25.2, dx: -202, dy: 22, bw: 321, bh: 106 },
];

// Silueta de la curva (los hitos están incluidos como anclas)
const ANCHORS: [number, number][] = [
  [2023.25, -2], [2023.30, -5], [2023.37, 0], [2023.42, 3.3], [2023.46, 0.9],
  [2023.48, 0], [2023.53, 3.4], [2023.57, 5.6], [2023.60, 7.9], [2023.63, 9],
  [2023.66, 10.4], [2023.70, 8.5], [2023.73, 9.6], [2023.77, 7.3], [2023.80, 5.6],
  [2023.84, 3.4], [2023.87, 2.3], [2023.90, 4.5], [2023.94, 6.8], [2023.99, 11.3],
  [2024.02, 14.7], [2024.06, 16.9], [2024.10, 19.2], [2024.13, 18], [2024.17, 21.4],
  [2024.20, 23.7], [2024.24, 26], [2024.27, 24.8], [2024.31, 27.7], [2024.34, 25.4],
  [2024.38, 27.1], [2024.41, 24.8], [2024.45, 26.5], [2024.48, 28], [2024.51, 26],
  [2024.55, 27.7], [2024.58, 30.5], [2024.61, 32.7], [2024.65, 34.4], [2024.68, 32.2],
  [2024.72, 29.3], [2024.75, 27.1], [2024.79, 24.3], [2024.82, 22.6], [2024.86, 26],
  [2024.89, 32.7], [2024.93, 39.5], [2024.96, 42.9], [2024.98, 44.8], [2025.01, 47.4],
  [2025.04, 46.3], [2025.07, 44.6], [2025.10, 45.7], [2025.12, 43.4], [2025.15, 42.3],
  [2025.18, 40.6], [2025.21, 39.5], [2025.24, 38.6], [2025.27, 35], [2025.29, 30.5],
  [2025.31, 32.7], [2025.32, 27.1], [2025.34, 20.3], [2025.35, 14.1], [2025.36, 23],
  [2025.40, 26], [2025.43, 24.3], [2025.46, 27.1], [2025.49, 24.8], [2025.52, 23.1],
  [2025.55, 25.4], [2025.58, 27.1], [2025.62, 24.8], [2025.66, 26.5], [2025.70, 28.4],
  [2025.73, 30.5], [2025.76, 32.7], [2025.79, 31], [2025.83, 32.2], [2025.86, 30.5],
  [2025.89, 31.6], [2025.92, 29.9], [2025.96, 32.2], [2026.00, 33.9], [2026.03, 35],
  [2026.07, 36.1], [2026.11, 36.8], [2026.15, 34], [2026.19, 30.4], [2026.23, 28.2],
  [2026.27, 26.5], [2026.30, 24.8], [2026.33, 25.2], [2026.38, 26], [2026.42, 27.1],
  [2026.46, 30.5], [2026.50, 35.5],
];

const XTICKS: [number, string][] = [
  [2023.5, '01/07/2023'], [2024.0, '01/01/2024'], [2024.5, '01/07/2024'],
  [2025.0, '01/01/2025'], [2025.5, '01/07/2025'], [2026.0, '01/01/2026'],
  [2026.5, '01/07/2026'],
];

const YTICKS = [-10, 0, 10, 20, 30, 40, 50];

function noise(i: number) {
  const s = Math.sin(i * 127.1) * 43758.5453;
  return (s - Math.floor(s)) - 0.5;
}

function buildPath() {
  const pts: [number, number][] = [];
  const STEPS = 5;
  for (let a = 0; a < ANCHORS.length - 1; a++) {
    const [t0, v0] = ANCHORS[a];
    const [t1, v1] = ANCHORS[a + 1];
    for (let s = 0; s < STEPS; s++) {
      const f = s / STEPS;
      const t = t0 + (t1 - t0) * f;
      const v = v0 + (v1 - v0) * f + noise(a * STEPS + s) * 1.5;
      pts.push([xFor(t), yFor(v)]);
    }
  }
  const last = ANCHORS[ANCHORS.length - 1];
  pts.push([xFor(last[0]), yFor(last[1])]);
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export default function SVIEvolutionChart() {
  const path = useMemo(buildPath, []);

  const items = CALLOUTS.map((c) => {
    const px = xFor(c.t);
    const py = yFor(c.v);
    const bx = px + c.dx;
    const by = py + c.dy;
    // punto de la caja más cercano al dato (origen de la línea guía)
    const fx = clamp(px, bx, bx + c.bw);
    const fy = clamp(py, by, by + c.bh);
    return { ...c, px, py, bx, by, fx, fy };
  });

  return (
    <div className="rounded-2xl border border-svi-light-grey bg-white shadow-md p-3 sm:p-5">
      <p className="lg:hidden text-[11px] text-svi-medium-grey mb-2">
        ← Desliza para ver el gráfico completo →
      </p>
      <div className="overflow-x-auto lg:overflow-visible">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-[1100px] lg:w-full max-w-none"
          role="img"
          aria-label="Evolución de la rentabilidad del SVI de 2023 a 2026 con sus hitos metodológicos"
        >
          {/* líneas horizontales + etiquetas % */}
          {YTICKS.map((v) => (
            <g key={v}>
              <line x1={L} x2={R} y1={yFor(v)} y2={yFor(v)}
                    stroke={v === 0 ? '#1a1a2e' : '#e5e7eb'} strokeWidth={v === 0 ? 2 : 1} />
              <text x={L - 12} y={yFor(v) + 5} textAnchor="end"
                    fontSize="19" fill="#6b7280" fontFamily="Inter, sans-serif">
                {v},00%
              </text>
            </g>
          ))}

          {/* líneas verticales de la rejilla */}
          {XTICKS.map(([t]) => (
            <line key={`v-${t}`} x1={xFor(t)} x2={xFor(t)} y1={T} y2={B}
                  stroke="#eef1f6" strokeWidth={1} />
          ))}

          {/* etiquetas eje X */}
          {XTICKS.map(([t, label], i) => (
            <text key={label} x={xFor(t)} y={B + 34}
                  textAnchor={i === 0 ? 'start' : i === XTICKS.length - 1 ? 'end' : 'middle'}
                  fontSize="19" fill="#6b7280" fontFamily="Inter, sans-serif">
              {label}
            </text>
          ))}

          {/* curva */}
          <path d={path} fill="none" stroke="#5b9bf0" strokeWidth={2.4}
                strokeLinejoin="round" strokeLinecap="round" />

          {/* líneas guía caja → punto */}
          {items.map((c) => (
            <line key={`ln-${c.title}`} x1={c.fx} y1={c.fy} x2={c.px} y2={c.py}
                  stroke="#1e4fa3" strokeWidth={1.6} />
          ))}

          {/* punto sobre la curva */}
          {items.map((c) => (
            <circle key={`pt-${c.title}`} cx={c.px} cy={c.py} r={8}
                    fill="#1e4fa3" stroke="#ffffff" strokeWidth={2.5} />
          ))}

          {/* cajas de texto */}
          {items.map((c) => (
            <g key={`box-${c.title}`}>
              <rect x={c.bx} y={c.by} width={c.bw} height={c.bh} rx={14}
                    fill="#ffffff" stroke="#2f6fd0" strokeWidth={1.6} />
              <c.Icon x={c.bx + 16} y={c.by + 14} width={30} height={30}
                      color="#1e4fa3" strokeWidth={2} />
              <text x={c.bx + 56} y={c.by + 34} fontSize="23" fontWeight="700"
                    fill="#1e4fa3" fontFamily="Inter, sans-serif">
                {c.title}
              </text>
              {c.lines.map((ln, i) => (
                <text key={i} x={c.bx + 56} y={c.by + 56 + i * 20}
                      fontSize="17" fill="#1f2d4d" fontFamily="Inter, sans-serif">
                  {ln}
                </text>
              ))}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
