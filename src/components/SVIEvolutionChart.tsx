import { useMemo } from 'react';

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
  n: number;
  title: string;
  lines: string[];
  t: number;        // posición del punto en el eje X
  v: number;        // posición del punto en el eje Y (%)
  bx: number;       // caja: x
  by: number;       // caja: y
  bw: number;       // caja: ancho
  bh: number;       // caja: alto
  from: [number, number]; // origen de la línea guía (en la caja)
}

const CALLOUTS: Callout[] = [
  { n: 1, title: 'SVI 1.0', lines: ['Cuenta auditada en', 'Interactive Brokers'],
    t: 2023.4, v: 2.5, bx: 118, by: 282, bw: 222, bh: 86, from: [167, 368] },
  { n: 2, title: 'SVI US Markets', lines: ['Creación del fondo de', 'inversión con AndBank'],
    t: 2023.72, v: 8, bx: 200, by: 442, bw: 248, bh: 84, from: [309, 442] },
  { n: 3, title: 'SVI 2.0', lines: ['Nueva versión de la', 'metodología SVI'],
    t: 2024.05, v: 21.5, bx: 350, by: 120, bw: 230, bh: 86, from: [456, 206] },
  { n: 4, title: 'Reducción comisiones', lines: ['Reducción de comisiones', 'del fondo con la CNMV'],
    t: 2024.45, v: 24, bx: 490, by: 336, bw: 296, bh: 86, from: [635, 336] },
  { n: 5, title: 'SVI 2.1', lines: ['Reducción de 40', 'holdings a 30 holdings'],
    t: 2024.9, v: 45, bx: 580, by: 22, bw: 252, bh: 86, from: [832, 62] },
  { n: 6, title: 'SVI 2.2', lines: ['Incluimos venta', 'de derivados'],
    t: 2025.15, v: 27, bx: 946, by: 76, bw: 190, bh: 86, from: [1000, 162] },
  { n: 7, title: 'SVI 3.0', lines: ['Nueva generación de la', 'metodología SVI'],
    t: 2025.22, v: 15.5, bx: 860, by: 396, bw: 252, bh: 86, from: [978, 396] },
  { n: 8, title: 'SVI 3.1', lines: ['Creación del', 'indicador AI Protected'],
    t: 2025.6, v: 29.5, bx: 1146, by: 76, bw: 252, bh: 86, from: [1190, 162] },
  { n: 9, title: 'SVI 3.2', lines: ['Eliminación del equiponderado', 'y mayor peso en tesis de alta', 'convicción'],
    t: 2026.2, v: 25.5, bx: 1280, by: 300, bw: 305, bh: 108, from: [1400, 300] },
];

// Anclas que definen la silueta de la curva (incluye los hitos)
const ANCHORS: [number, number][] = [
  [2023.25, -4], [2023.4, 2.5], [2023.52, -2], [2023.62, 4], [2023.72, 8],
  [2023.86, 2], [2024.0, 13], [2024.05, 21.5], [2024.14, 15], [2024.28, 26],
  [2024.38, 21], [2024.45, 24], [2024.55, 22], [2024.68, 31], [2024.8, 22],
  [2024.9, 45], [2025.0, 43], [2025.06, 47], [2025.1, 40], [2025.15, 27],
  [2025.18, 34], [2025.22, 15.5], [2025.3, 26], [2025.42, 31], [2025.52, 26],
  [2025.6, 29.5], [2025.72, 40], [2025.86, 39], [2026.0, 33], [2026.08, 42],
  [2026.14, 34], [2026.2, 25.5], [2026.3, 33], [2026.4, 29], [2026.5, 37],
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
  const STEPS = 7;
  for (let a = 0; a < ANCHORS.length - 1; a++) {
    const [t0, v0] = ANCHORS[a];
    const [t1, v1] = ANCHORS[a + 1];
    for (let s = 0; s < STEPS; s++) {
      const f = s / STEPS;
      const t = t0 + (t1 - t0) * f;
      const v = v0 + (v1 - v0) * f + noise(a * STEPS + s) * 1.6;
      pts.push([xFor(t), yFor(v)]);
    }
  }
  const last = ANCHORS[ANCHORS.length - 1];
  pts.push([xFor(last[0]), yFor(last[1])]);
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
}

export default function SVIEvolutionChart() {
  const path = useMemo(buildPath, []);

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
          aria-label="Evolución de la rentabilidad del SVI de 2023 a 2026 con sus nueve hitos metodológicos"
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

          {/* etiquetas eje X */}
          {XTICKS.map(([t, label], i) => (
            <text key={label} x={xFor(t)} y={B + 34}
                  textAnchor={i === 0 ? 'start' : i === XTICKS.length - 1 ? 'end' : 'middle'}
                  fontSize="19" fill="#6b7280" fontFamily="Inter, sans-serif">
              {label}
            </text>
          ))}

          {/* curva */}
          <path d={path} fill="none" stroke="#3b7fe4" strokeWidth={2.4}
                strokeLinejoin="round" strokeLinecap="round" />

          {/* líneas guía caja → punto */}
          {CALLOUTS.map((c) => (
            <line key={`ln-${c.n}`}
                  x1={c.from[0]} y1={c.from[1]}
                  x2={xFor(c.t)} y2={yFor(c.v)}
                  stroke="#1e4fa3" strokeWidth={1.6} />
          ))}

          {/* punto sobre la curva */}
          {CALLOUTS.map((c) => (
            <circle key={`pt-${c.n}`} cx={xFor(c.t)} cy={yFor(c.v)} r={8}
                    fill="#1e4fa3" stroke="#ffffff" strokeWidth={2.5} />
          ))}

          {/* cajas de texto */}
          {CALLOUTS.map((c) => (
            <g key={`box-${c.n}`}>
              <rect x={c.bx} y={c.by} width={c.bw} height={c.bh} rx={14}
                    fill="#eaf2fd" stroke="#b9d4f6" strokeWidth={1.5} />
              {/* número */}
              <circle cx={c.bx + 26} cy={c.by + 26} r={13} fill="#1e4fa3" />
              <text x={c.bx + 26} y={c.by + 32} textAnchor="middle"
                    fontSize="16" fontWeight="700" fill="#ffffff" fontFamily="Inter, sans-serif">
                {c.n}
              </text>
              {/* título */}
              <text x={c.bx + 48} y={c.by + 33} fontSize="22" fontWeight="700"
                    fill="#1e4fa3" fontFamily="Inter, sans-serif">
                {c.title}
              </text>
              {/* descripción */}
              {c.lines.map((ln, i) => (
                <text key={i} x={c.bx + 48} y={c.by + 58 + i * 22}
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
