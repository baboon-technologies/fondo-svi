import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import ContactForm from '../components/ContactForm';

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="w-full rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center py-20 sm:py-28 my-8">
      <span className="text-sm text-svi-medium-grey font-medium text-center px-6">{label}</span>
    </div>
  );
}

const TABS = [
  { id: 'como-funciona', label: 'Cómo funciona el SVI' },
  { id: 'svi-10', label: 'SVI 1.0' },
  { id: 'svi-20', label: 'SVI 2.0' },
];

export default function Metodologia() {
  const [isBlock01Expanded, setIsBlock01Expanded] = useState(false);
  const [activeTab, setActiveTab] = useState('como-funciona');
  const tabBarRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const tabBarHeight = tabBarRef.current?.offsetHeight ?? 64;
    const headerOffset = 64 + tabBarHeight + 8;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: `-${headerOffset}px 0px -60% 0px`, threshold: 0 }
    );

    TABS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const tabBarHeight = tabBarRef.current?.offsetHeight ?? 64;
    const top = el.getBoundingClientRect().top + window.scrollY - 64 - tabBarHeight - 8;
    window.scrollTo({ top, behavior: 'smooth' });
    setActiveTab(id);
  };

  return (
    <div className="pt-16 sm:pt-20">

      {/* Sticky Tab Bar */}
      <div
        ref={tabBarRef}
        className="sticky top-16 sm:top-20 z-30 bg-white border-b border-gray-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`
                  flex-shrink-0 px-4 sm:px-6 py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'border-svi-primary text-svi-primary'
                    : 'border-transparent text-svi-medium-grey hover:text-svi-dark-grey hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── TAB 1: Cómo funciona el SVI ─── */}
      <section id="como-funciona" ref={(el) => { sectionRefs.current['como-funciona'] = el; }}>

        <div className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-svi-primary mb-4 sm:mb-6">
                Cómo funciona el Systematic Value Investing
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-svi-dark-grey mb-8 sm:mb-10 md:mb-12">
                Así selecciona SVI las compañías que forman parte de la estrategia.
              </p>
              <div className="w-full max-w-4xl mx-auto">
                <div className="relative rounded-xl overflow-hidden shadow-lg bg-black aspect-video">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/qCV5Tx_x6Ok"
                    title="Cómo funciona el Systematic Value Investing"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BLOQUE PASIVA VS ACTIVA */}
        <div className="pb-16 sm:pb-20 md:pb-24 lg:pb-32 pt-6 sm:pt-8 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8 mb-12 lg:mb-16">
              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-10 border border-gray-200">
                <p className="text-sm sm:text-base lg:text-xl text-svi-dark-grey leading-snug sm:leading-relaxed">
                  La inversión <span className="font-bold text-svi-primary">pasiva</span> es una solución eficaz para:
                </p>
                <ul className="mt-2 sm:mt-4 space-y-1 sm:space-y-2 text-xs sm:text-sm lg:text-lg text-svi-dark-grey">
                  <li>• reducir costes</li>
                  <li>• evitar errores emocionales</li>
                  <li>• obtener la rentabilidad media del mercado.</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-10 border border-gray-200">
                <p className="text-sm sm:text-base lg:text-xl text-svi-dark-grey leading-snug sm:leading-relaxed">
                  La inversión <span className="font-bold text-svi-primary">activa</span> permite:
                </p>
                <ul className="mt-2 sm:mt-4 space-y-1 sm:space-y-2 text-xs sm:text-sm lg:text-lg text-svi-dark-grey">
                  <li>• seleccionar empresas con mayor rentabilidad potencial</li>
                  <li>• evitar excesos de valoración</li>
                  <li>• y gestionar mejor el riesgo.</li>
                </ul>
              </div>
            </div>

            <div className="mb-0 -mt-8 sm:-mt-12 lg:-mt-16">
              <div className="relative aspect-[16/9] max-w-4xl mx-auto">
                <img
                  src="/Inversionpasivaactiva.png"
                  alt="Diagrama Passive vs Active vs Factor Investing"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="max-w-4xl mx-auto pt-8 sm:pt-10">
              <div className="text-center mb-8">
                <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-svi-medium-grey">
                  El problema es que
                </span>
                <h3 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-svi-dark-grey leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  La mayoría de opciones de inversión<br className="hidden sm:block" /> tienen un fallo fundamental
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-gray-50 border border-svi-light-grey rounded-xl p-6 sm:p-8">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-svi-primary block mb-3">
                    Inversión pasiva
                  </span>
                  <p className="text-svi-dark-grey text-base leading-relaxed">
                    No discrimina calidad ni precio — compra todo el mercado, bueno y malo.
                  </p>
                </div>
                <div className="bg-gray-50 border border-svi-light-grey rounded-xl p-6 sm:p-8">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-svi-primary block mb-3">
                    Gestión activa tradicional
                  </span>
                  <p className="text-svi-dark-grey text-base leading-relaxed">
                    Depende demasiado del gestor. No es atemporal, no es sistemática.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline */}
        <div className="pt-0 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-4 sm:mb-6 lg:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-svi-primary mb-4 sm:mb-6">
                El pipeline de inversión
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-svi-dark-grey max-w-3xl mx-auto">
                De miles de empresas a una cartera concentrada de alta convicción
              </p>
            </div>
            <div className="max-w-5xl mx-auto">
              <img
                src="/30iversiones.png"
                alt="El pipeline de inversión"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* 5 bloques */}
        <div className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-svi-primary mb-6">
                Cómo funciona el Systematic Value Investing
              </h2>
              <p className="text-lg sm:text-xl text-svi-dark-grey max-w-4xl mx-auto">
                Un proceso estructurado en 5 bloques que combina análisis cuantitativo, disciplina y supervisión continua.
              </p>
            </div>

            <div className="mb-16 lg:mb-20">
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0">
                  <div className="text-6xl sm:text-7xl font-light text-svi-light-blue/40">01</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-svi-primary mb-4">
                    Selección del universo de inversión
                  </h3>
                  <button
                    onClick={() => setIsBlock01Expanded(!isBlock01Expanded)}
                    className="flex items-center gap-2 text-svi-secondary hover:text-svi-primary transition-colors font-medium"
                  >
                    {isBlock01Expanded ? (
                      <><ChevronUp className="w-5 h-5" /><span>Ver menos</span></>
                    ) : (
                      <><ChevronDown className="w-5 h-5" /><span>Ver detalles completos</span></>
                    )}
                  </button>
                </div>
              </div>
              {isBlock01Expanded && (
                <div className="ml-0 lg:ml-24 space-y-8">
                  <div className="border-l-2 border-svi-light-blue/30 pl-6">
                    <h4 className="text-xl font-semibold text-svi-primary mb-3">Mercado</h4>
                    <div className="space-y-2 text-base text-svi-dark-grey">
                      <p><span className="font-medium">US Markets</span></p>
                      <p>Seguridad jurídica (SEC)</p>
                      <p className="font-medium mt-3">Mercado muy dinámico:</p>
                      <ul className="ml-5 space-y-1">
                        <li>• Alto volumen y compañías de gran capitalización</li>
                        <li>• Mercado de derivados muy activo</li>
                      </ul>
                    </div>
                  </div>
                  <div className="border-l-2 border-svi-light-blue/30 pl-6">
                    <h4 className="text-xl font-semibold text-svi-primary mb-3">Filtros iniciales</h4>
                    <div className="space-y-2 text-base text-svi-dark-grey">
                      <p>• Histórico mínimo: 5 años</p>
                      <p>• Capitalización y liquidez: &gt;$500M</p>
                    </div>
                  </div>
                  <div className="border-l-2 border-svi-light-blue/30 pl-6">
                    <h4 className="text-xl font-semibold text-svi-primary mb-3">Calidad del negocio</h4>
                    <div className="space-y-2 text-base text-svi-dark-grey">
                      <p>• Solvencia y liquidez</p>
                      <p>• Baja dilución</p>
                      <p>• Caja y beneficios positivos (Adj. FCF &gt; 0 y Adj. EPS &gt; 0)</p>
                      <p>• Ventajas competitivas superiores al promedio (MOAT S&P500)</p>
                    </div>
                  </div>
                  <div className="border-l-2 border-svi-light-blue/30 pl-6">
                    <h4 className="text-xl font-semibold text-svi-primary mb-3">Valoración</h4>
                    <div className="space-y-2 text-base text-svi-dark-grey">
                      <p>• Rentabilidad objetivo atractiva (ej. 15,7% anualizada, x2,1 en 5 años)</p>
                      <p>• Rentabilidad mínima: 10% anual</p>
                      <p>• Margen de seguridad: 15%</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-12 lg:space-y-16">
              {[
                {
                  num: '02',
                  title: 'Gestión de portfolio, control de riesgos y diversificación',
                  text: 'Sistema de construcción de cartera que equilibra concentración y diversificación. Gestión activa del riesgo mediante límites por posición, sector y correlaciones. Rebalanceo periódico para mantener la exposición objetivo.',
                },
                {
                  num: '03',
                  title: 'Criterios de compra/venta',
                  text: 'Reglas objetivas que determinan cuándo incorporar o eliminar una compañía de la cartera. Basadas en cambios en calidad empresarial, valoración relativa o deterioro fundamental. Sin decisiones discrecionales.',
                },
                {
                  num: '04',
                  title: 'Validación y supervisión humana',
                  text: 'Supervisión continua del sistema para detectar anomalías, validar coherencia de datos y garantizar la correcta ejecución del proceso. El equipo no toma decisiones de inversión, pero asegura el funcionamiento del sistema.',
                },
                {
                  num: '05',
                  title: 'Gestión de cambios y actualizaciones',
                  text: 'Mejora continua del modelo mediante análisis de resultados, incorporación de nuevos datos y ajustes metodológicos documentados. Cualquier cambio en el sistema se registra y comunica de forma transparente.',
                },
              ].map(({ num, title, text }) => (
                <div key={num}>
                  <div className="flex items-start gap-6 mb-4">
                    <div className="flex-shrink-0">
                      <div className="text-6xl sm:text-7xl font-light text-svi-light-blue/40">{num}</div>
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-svi-primary mb-3">{title}</h3>
                      <p className="text-base text-svi-dark-grey leading-relaxed">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ─── TAB 2: SVI 1.0 ─── */}
      <section id="svi-10" ref={(el) => { sectionRefs.current['svi-10'] = el; }} className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">

          <p className="font-mono text-xs text-svi-medium-grey mb-4 tracking-wide">SVI 1.0 — Abril 2023</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-svi-primary mb-5">La estrategia original</h2>
          <p className="text-base text-svi-dark-grey leading-relaxed mb-10">
            El SVI 1.0 es la primera versión del Systematic Value Investing US Markets, un fondo de inversión UCITS aprobado por la CNMV que aplica un proceso sistemático y atemporal de selección de empresas americanas infravaloradas, combinando criterios fundamentales y cuantitativos con supervisión humana. El objetivo es conseguir mayor rentabilidad que el S&P500 manteniendo una correlación alta con el índice, de forma metodológica y sin depender del criterio discrecional de ningún gestor.
          </p>

          {/* Subsection 1 */}
          <div className="border-t border-gray-200 pt-8 mb-8">
            <h3 className="text-base font-bold text-svi-primary mb-3">1. Universo de inversión</h3>
            <p className="text-base text-svi-dark-grey leading-relaxed mb-3">
              El SVI opera exclusivamente en el mercado bursátil estadounidense por tres razones: seguridad jurídica bajo la SEC, volumen y liquidez elevados en compañías de gran capitalización, y un mercado de derivados muy activo. Para entrar en el universo de inversión, una empresa debe cumplir todos estos filtros simultáneamente:
            </p>
            <ul className="space-y-1.5 text-base text-svi-dark-grey">
              <li><span className="text-svi-medium-grey">—</span> <span className="font-medium">Histórico mínimo:</span> 5 años cotizando en bolsa americana.</li>
              <li><span className="text-svi-medium-grey">—</span> <span className="font-medium">Capitalización y volumen:</span> market cap superior a 500M$ con volumen suficiente para garantizar liquidez.</li>
              <li><span className="text-svi-medium-grey">—</span> <span className="font-medium">Solvencia y liquidez:</span> balance sólido sin señales de deterioro financiero.</li>
              <li><span className="text-svi-medium-grey">—</span> <span className="font-medium">Baja dilución:</span> dilución anual ≤5%.</li>
              <li><span className="text-svi-medium-grey">—</span> <span className="font-medium">Caja y beneficios positivos:</span> Adj. FCF &gt; 0 y Adj. EPS &gt; 0. Solo negocios que generan caja real.</li>
              <li><span className="text-svi-medium-grey">—</span> <span className="font-medium">Ventajas competitivas:</span> MOAT SP500 superior al promedio del índice.</li>
              <li><span className="text-svi-medium-grey">—</span> <span className="font-medium">Valoración atractiva:</span> rentabilidad anualizada esperada ≥10% y margen de seguridad ≥15%.</li>
            </ul>
          </div>

          {/* Subsection 2 */}
          <div className="border-t border-gray-200 pt-8 mb-8">
            <h3 className="text-base font-bold text-svi-primary mb-3">2. Construcción de cartera y control de riesgos</h3>
            <p className="text-base text-svi-dark-grey leading-relaxed mb-3">
              El SVI 1.0 mantiene una cartera de 40 posiciones con los siguientes límites:
            </p>
            <ul className="space-y-1.5 text-base text-svi-dark-grey">
              <li><span className="text-svi-medium-grey">—</span> <span className="font-medium">Requisitos UCITS (5/10/40):</span> ninguna posición puede superar el 10% de la cartera. La suma de todas las posiciones que superen el 5% no puede exceder el 40% del total.</li>
              <li><span className="text-svi-medium-grey">—</span> Mínimo el 75% del fondo invertido en renta variable en todo momento. Liquidez objetivo entre el 5–15%.</li>
              <li><span className="text-svi-medium-grey">—</span> Máximo 20% de exposición a Small Caps (capitalización inferior a 2B$).</li>
              <li><span className="text-svi-medium-grey">—</span> Máximo 10% por industria.</li>
              <li><span className="text-svi-medium-grey">—</span> Máximo 10% por país, excepto bolsa americana.</li>
            </ul>
          </div>

          {/* Subsection 3 */}
          <div className="border-t border-gray-200 pt-8 mb-8">
            <h3 className="text-base font-bold text-svi-primary mb-3">3. Criterios de compra y venta</h3>
            <p className="text-base text-svi-dark-grey leading-relaxed">
              <span className="font-medium">Criterio de entrada:</span> una acción entra en cartera si está en el TOP 15 del ranking calidad/precio del universo de inversión y es necesaria para completar las 40 posiciones. <span className="font-medium">Criterio de salida:</span> una acción sale si incumple alguna condición del universo de inversión o cae a la posición 40 del ranking calidad/precio. <span className="font-medium">Rotación limitada:</span> máximo una compra/venta semanal para minimizar costes y evitar alta rotación.
            </p>
          </div>

          {/* Subsection 4 */}
          <div className="border-t border-gray-200 pt-8 mb-8">
            <h3 className="text-base font-bold text-svi-primary mb-3">4. Validación y supervisión humana</h3>
            <p className="text-base text-svi-dark-grey leading-relaxed">
              El SVI no es un sistema 100% automático. Antes de ejecutar cualquier operación, el equipo de analistas valida los inputs del modelo, el entorno macroeconómico e industrial, y el crecimiento y riesgos de cada tesis. Solo se ejecuta una operación cuando tanto el algoritmo como el equipo de analistas aprueban la inversión. El analista no tiene libertad de decisión discrecional — cualquier conflicto se eleva al comité de inversiones, que tiene la última palabra.
            </p>
          </div>

          {/* Subsection 5 */}
          <div className="border-t border-gray-200 pt-8 mb-10">
            <h3 className="text-base font-bold text-svi-primary mb-3">5. Gestión de cambios</h3>
            <p className="text-base text-svi-dark-grey leading-relaxed">
              El SVI incorpora mejoras con el tiempo. Todo cambio debe estar respaldado por análisis cuantitativo (simulaciones históricas, backtesting, stress tests, simulaciones Monte Carlo), aprobado por el comité de inversiones, y comunicado públicamente a todos los inversores a través de la web y la newsletter del fondo.
            </p>
          </div>

          {/* Images */}
          <div className="border-t border-gray-200 pt-8 space-y-8">
            <div>
              <div className="w-full overflow-hidden border border-gray-200 rounded bg-white">
                <img src="/Backtesting.png" alt="Simulación backtesting 1995–2025" className="w-full h-auto" />
              </div>
              <p className="mt-2 text-xs text-svi-medium-grey font-mono">Simulación backtesting 1995–2025</p>
            </div>
            <div>
              <div className="w-full overflow-hidden border border-gray-200 rounded bg-white">
                <img src="/Rentabilidad_por_anno.png" alt="Rentabilidades anuales SVI vs S&P500" className="w-full h-auto" />
              </div>
              <p className="mt-2 text-xs text-svi-medium-grey font-mono">Rentabilidades anuales SVI vs S&P500</p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── TAB 3: SVI 2.0 ─── */}
      <section id="svi-20" ref={(el) => { sectionRefs.current['svi-20'] = el; }} className="bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">

          <p className="font-mono text-xs text-svi-medium-grey mb-4 tracking-wide">SVI 2.0 — Noviembre 2025</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-svi-primary mb-5">Novedades de esta versión</h2>
          <p className="text-base text-svi-dark-grey leading-relaxed mb-10">
            El SVI 2.0 es la segunda versión del Systematic Value Investing US Markets, puesta en producción en noviembre de 2025. Esta actualización introduce tres cambios en la estrategia, todos validados con simulaciones históricas desde 1995 y aprobados por el comité de inversiones antes de su implementación. El resto de criterios de selección, entrada, salida y gestión de riesgos se mantienen igual que en el SVI 1.0.
          </p>

          {/* Cambio 1 */}
          <div className="border-t border-gray-200 pt-8 mb-8">
            <p className="font-mono text-xs text-svi-medium-grey mb-2 tracking-wide">Cambio 1</p>
            <h3 className="text-base font-bold text-svi-primary mb-4">Cartera reducida de 40 a 30 posiciones</h3>

            <p className="text-base text-svi-dark-grey leading-relaxed mb-3">
              <span className="font-medium">Qué cambia:</span> el número máximo de posiciones en cartera pasa de 40 a 30.
            </p>
            <p className="text-base text-svi-dark-grey leading-relaxed mb-3">
              <span className="font-medium">Por qué:</span> las simulaciones históricas desde 1995 muestran de forma consistente que a mayor concentración de la cartera, mayor rentabilidad anualizada, siempre que se mantenga correlación con el índice y no se dispare la volatilidad. Simulamos carteras de 15 a 50 posiciones durante 30 años: cuanto más concentrada la cartera, mayor la rentabilidad acumulada, y todas las simulaciones baten al S&P500.
            </p>
            <p className="text-base text-svi-dark-grey leading-relaxed mb-6">
              <span className="font-medium">¿Por qué 30 y no 20?</span> El máximo teórico de rentabilidad se alcanza con 15–18 posiciones. Elegimos 30 por tres motivos: (1) captura el grueso del incremento de rentabilidad manteniendo diversificación suficiente para reducir el riesgo idiosincrático de cada acción; (2) pasar de 40 a 30 ya supone rotar el 25% de la cartera — ir a 20 implicaría una rotación mucho más agresiva que erosionaría parte de la rentabilidad extra; (3) el SVI no es un hedge fund ultraconcentrado sino una alternativa sistemática al S&P500, y 30 posiciones es el punto óptimo entre selectividad y estabilidad para el partícipe.
            </p>

            {/* Images */}
            <div className="space-y-6 mb-6">
              <div>
                <div className="w-full overflow-hidden border border-gray-200 rounded bg-white">
                  <img src="/30iversiones.png" alt="Rentabilidad acumulada por número de holdings (1994–2026)" className="w-full h-auto" />
                </div>
                <p className="mt-2 text-xs text-svi-medium-grey font-mono">Rentabilidad acumulada por número de holdings (1994–2026)</p>
              </div>
              <div>
                <div className="w-full overflow-hidden border border-gray-200 rounded bg-white">
                  <img src="/CAGR_Holdings.png" alt="Comparativa backtesting: 30 vs 40 holdings vs S&P500" className="w-full h-auto" />
                </div>
                <p className="mt-2 text-xs text-svi-medium-grey font-mono">Comparativa backtesting: 30 vs 40 holdings vs S&P500</p>
              </div>
            </div>

            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-2 pr-4 font-semibold text-svi-dark-grey text-xs uppercase tracking-wide"></th>
                    <th className="text-right py-2 px-3 font-semibold text-svi-dark-grey text-xs uppercase tracking-wide">Rentabilidad (%)</th>
                    <th className="text-right py-2 px-3 font-semibold text-svi-dark-grey text-xs uppercase tracking-wide">Volatilidad (%)</th>
                    <th className="text-right py-2 px-3 font-semibold text-svi-dark-grey text-xs uppercase tracking-wide">Sharpe</th>
                    <th className="text-right py-2 pl-3 font-semibold text-svi-dark-grey text-xs uppercase tracking-wide">Correlación SP500</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 pr-4 font-medium text-svi-primary">30 holdings</td>
                    <td className="py-2.5 px-3 text-right text-svi-dark-grey">15,1</td>
                    <td className="py-2.5 px-3 text-right text-svi-dark-grey">13,88</td>
                    <td className="py-2.5 px-3 text-right text-svi-dark-grey">0,94</td>
                    <td className="py-2.5 pl-3 text-right text-svi-dark-grey">0,898</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 pr-4 font-medium text-svi-dark-grey">40 holdings</td>
                    <td className="py-2.5 px-3 text-right text-svi-dark-grey">13,45</td>
                    <td className="py-2.5 px-3 text-right text-svi-dark-grey">13,51</td>
                    <td className="py-2.5 px-3 text-right text-svi-dark-grey">0,85</td>
                    <td className="py-2.5 pl-3 text-right text-svi-dark-grey">0,896</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-svi-medium-grey">S&amp;P 500</td>
                    <td className="py-2.5 px-3 text-right text-svi-medium-grey">8,83</td>
                    <td className="py-2.5 px-3 text-right text-svi-medium-grey">18,92</td>
                    <td className="py-2.5 px-3 text-right text-svi-medium-grey">0,36</td>
                    <td className="py-2.5 pl-3 text-right text-svi-medium-grey">1</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-base text-svi-dark-grey leading-relaxed">
              El extra de rentabilidad (+1,65% anual) no viene acompañado de un aumento significativo de volatilidad (+0,37%), y la correlación con el índice se mantiene prácticamente idéntica (0,898 vs 0,896).
            </p>
          </div>

          {/* Cambio 2 */}
          <div className="border-t border-gray-200 pt-8 mb-8">
            <p className="font-mono text-xs text-svi-medium-grey mb-2 tracking-wide">Cambio 2</p>
            <h3 className="text-base font-bold text-svi-primary mb-4">Eliminación de la comisión de éxito</h3>

            <p className="text-base text-svi-dark-grey leading-relaxed mb-4">
              <span className="font-medium">Qué cambia:</span> la comisión de éxito del 9% queda eliminada en todas las clases del fondo. <span className="font-medium">Por qué:</span> menos comisiones implica más rentabilidad neta para el inversor después de gastos.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-2 pr-4 font-semibold text-svi-dark-grey text-xs uppercase tracking-wide"></th>
                    <th className="text-right py-2 px-3 font-semibold text-svi-dark-grey text-xs uppercase tracking-wide">Comisión de gestión</th>
                    <th className="text-right py-2 pl-3 font-semibold text-svi-dark-grey text-xs uppercase tracking-wide">Comisión de éxito</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 pr-4 text-svi-dark-grey">Clase A (ES0131444129)</td>
                    <td className="py-2.5 px-3 text-right text-svi-dark-grey">1%</td>
                    <td className="py-2.5 pl-3 text-right text-svi-dark-grey">0%</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-svi-dark-grey">Clase B (ES0131444137)</td>
                    <td className="py-2.5 px-3 text-right text-svi-dark-grey">1,5%</td>
                    <td className="py-2.5 pl-3 text-right text-svi-dark-grey">0%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Cambio 3 */}
          <div className="border-t border-gray-200 pt-8 mb-10">
            <p className="font-mono text-xs text-svi-medium-grey mb-2 tracking-wide">Cambio 3</p>
            <h3 className="text-base font-bold text-svi-primary mb-4">Venta sistemática de derivados cubiertos</h3>

            <p className="text-base text-svi-dark-grey leading-relaxed mb-3">
              <span className="font-medium">Qué cambia:</span> el SVI 2.0 incorpora una estrategia de venta de puts y calls cubiertas sobre las posiciones de la cartera. Esta estrategia no existía en el SVI 1.0.
            </p>
            <p className="text-base text-svi-dark-grey leading-relaxed mb-3">
              <span className="font-medium">Cómo funciona:</span> vendemos puts cuando queremos comprar una acción (cobramos prima por comprometernos a comprarla a un precio determinado) y calls cuando queremos venderla. Siempre con colateral, nunca apalancado. El objetivo es monetizar el tiempo de espera dentro del proceso de inversión value: cobrar primas mientras esperamos que el mercado reconozca el valor de las empresas en cartera.
            </p>
            <p className="text-base text-svi-dark-grey leading-relaxed mb-6">
              <span className="font-medium">Por qué solo es viable en un fondo UCITS:</span> requiere volumen, liquidez y fiscalidad favorable que un inversor retail no puede replicar individualmente. El proceso está reglado, sistemático y descorrelacionado del timing del mercado. Complementa al value investing, no lo sustituye. En momentos de alta volatilidad las primas aumentan, convirtiendo la volatilidad en una fuente de ingresos adicional precisamente cuando más se necesita.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-2 pr-4 font-semibold text-svi-dark-grey text-xs uppercase tracking-wide">Entorno VIX</th>
                    <th className="text-left py-2 px-3 font-semibold text-svi-dark-grey text-xs uppercase tracking-wide">Volatilidad del mercado</th>
                    <th className="text-right py-2 px-3 font-semibold text-svi-dark-grey text-xs uppercase tracking-wide">Prima media mensual</th>
                    <th className="text-right py-2 pl-3 font-semibold text-svi-dark-grey text-xs uppercase tracking-wide">Extra rentabilidad esperado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 pr-4 font-mono text-xs text-svi-dark-grey">VIX &lt; 15</td>
                    <td className="py-2.5 px-3 text-svi-dark-grey">Baja / mercado estable</td>
                    <td className="py-2.5 px-3 text-right text-svi-dark-grey">0,3% – 0,5%</td>
                    <td className="py-2.5 pl-3 text-right text-svi-dark-grey">+4% a +6% anual</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 pr-4 font-mono text-xs text-svi-dark-grey">VIX 15–22</td>
                    <td className="py-2.5 px-3 text-svi-dark-grey">Moderada / lateral</td>
                    <td className="py-2.5 px-3 text-right text-svi-dark-grey">0,5% – 0,9%</td>
                    <td className="py-2.5 pl-3 text-right text-svi-dark-grey">+7% a +11% anual</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-mono text-xs text-svi-dark-grey">VIX &gt; 22</td>
                    <td className="py-2.5 px-3 text-svi-dark-grey">Alta / tensión de mercado</td>
                    <td className="py-2.5 px-3 text-right text-svi-dark-grey">1,0%+</td>
                    <td className="py-2.5 pl-3 text-right text-svi-dark-grey">+12% anual (picos)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="border-t border-gray-200 pt-8 mb-8">
            <p className="text-base text-svi-dark-grey leading-relaxed">
              Los tres cambios juntos tienen el potencial de añadir +1,65% de rentabilidad anual esperada por la concentración de cartera, mantener la correlación con el S&amp;P500 (~0,898), mejorar el ratio Sharpe en un +10,5%, y añadir entre un +3% y +11% extra anual por venta de derivados cubiertos.
            </p>
          </div>

          <a
            href="https://svinvesting.substack.com/p/actualizacion-del-svi-concentramos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-svi-secondary hover:text-svi-primary transition-colors"
          >
            Lee el análisis completo de la transición de 40 a 30 posiciones →
          </a>

        </div>
      </section>

      <ContactForm />

    </div>
  );
}
