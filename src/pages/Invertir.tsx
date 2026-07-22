import { useState } from 'react';
import { Send, TrendingUp, UserPlus, Gift, Search } from 'lucide-react';
import ReportCTA from '../components/ReportCTA';

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-svi-primary text-white flex items-center justify-center text-sm sm:text-base font-bold">
        {n}
      </div>
      <div className="flex-1 min-w-0 text-sm sm:text-base text-svi-dark-grey leading-relaxed pt-1 sm:pt-1.5">
        {children}
      </div>
    </li>
  );
}

export default function Invertir() {
  const [email, setEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formMsg, setFormMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const tabLabels = [
    '¿Inviertes a título personal y eres residente en España?',
    '¿No resides en España o inviertes a través de una empresa o holding patrimonial?',
    'Documentos que necesitarás para abrirte cuenta',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormMsg(null);
    try {
      const payload: Record<string, string> = { email };
      if (userMessage.trim()) payload.message = userMessage.trim();
      const response = await fetch('https://formspree.io/f/xgorwjgk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setFormMsg({ type: 'success', text: '¡Gracias! Te contactaremos pronto.' });
        setEmail('');
        setUserMessage('');
      } else {
        setFormMsg({ type: 'error', text: 'Ha ocurrido un error. Por favor, inténtalo de nuevo.' });
      }
    } catch {
      setFormMsg({ type: 'error', text: 'Ha ocurrido un error. Por favor, inténtalo de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 sm:pt-20">
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#012878] mb-3 leading-tight">
                ¿Cómo invertir?
              </h1>
              <p className="text-base sm:text-lg text-[#4A4A4A] leading-relaxed mb-8">
                Empieza en pocos pasos desde MyInvestor.
              </p>
              <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-xl mb-8 lg:hidden">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/eSLHXY8kQcI"
                  title="Cómo invertir en el fondo SVI"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
          <div className="space-y-4 sm:space-y-5">

            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="text-4xl sm:text-5xl font-bold text-[#012878]">01</div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#012878] mb-2">
                    Descárgate MyInvestor
                  </h3>
                  <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
                    Accede a la plataforma desde la que puedes invertir en SVI.
                  </p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <a href="https://myinvestor.es/" target="_blank" rel="noopener noreferrer">
                    <img
                      src="/myinvestor-logo.jpg"
                      alt="MyInvestor"
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-contain cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="text-5xl font-bold text-[#012878]">02</div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl lg:text-2xl font-bold text-[#012878] mb-2">
                    Crea tu cuenta
                  </h3>
                  <p className="text-base text-[#4A4A4A] leading-relaxed">
                    El proceso de alta es sencillo y solo te llevará unos minutos.
                  </p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <UserPlus className="w-8 h-8 sm:w-10 sm:h-10 text-[#012878] stroke-[1.5]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="text-5xl font-bold text-[#012878]">03</div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl lg:text-2xl font-bold text-[#012878] mb-2">
                    Introduce el código promocional
                  </h3>
                  <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
                    Usa el código <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-lg bg-[#012878] text-white font-bold text-xs sm:text-sm">SVI25</span> para recibir <span className="font-semibold text-[#012878]">25€</span> en tu cuenta con una inversión mínima de 100€.
                  </p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-[#012878] stroke-[1.5]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="text-5xl font-bold text-[#012878]">04</div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl lg:text-2xl font-bold text-[#012878] mb-2">
                    Busca el fondo
                  </h3>
                  <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
                    Encuéntranos por el ISIN <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-lg bg-[#E5E7EB] text-[#012878] font-mono font-semibold text-xs sm:text-sm">ES0131444137</span> o por el nombre <span className="font-semibold text-[#012878]">SVI US Markets Clase B</span>.
                  </p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <Search className="w-8 h-8 sm:w-10 sm:h-10 text-[#012878] stroke-[1.5]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="text-5xl font-bold text-[#012878]">05</div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl lg:text-2xl font-bold text-[#012878] mb-2">
                    Realiza tu inversión
                  </h3>
                  <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
                    La orden puede tardar unos días hábiles en ejecutarse.
                  </p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-[#012878] stroke-[1.5]" />
                </div>
              </div>
            </div>

          </div>
            </div>

            <div className="hidden lg:block lg:sticky lg:top-28">
              <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/eSLHXY8kQcI"
                  title="Cómo invertir en el fondo SVI"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-svi-primary mb-4 sm:mb-6">
              Guía práctica de cómo invertir
            </h2>
            <p className="text-base sm:text-lg text-svi-dark-grey leading-relaxed max-w-3xl mx-auto">
              Para invertir en nuestro fondo, en función de si quieres invertir a título personal o a través de una empresa, existen diferentes vías:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12 sm:mb-16">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-svi-light-grey text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-svi-primary text-white flex items-center justify-center text-xl font-bold">
                A
              </div>
              <p className="text-sm sm:text-base text-svi-dark-grey leading-relaxed">
                A título personal a través de la app de MyInvestor.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-svi-light-grey text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-svi-primary text-white flex items-center justify-center text-xl font-bold">
                B
              </div>
              <p className="text-sm sm:text-base text-svi-dark-grey leading-relaxed">
                A título personal a través de una cuenta en AndBank España.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-svi-light-grey text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-svi-primary text-white flex items-center justify-center text-xl font-bold">
                C
              </div>
              <p className="text-sm sm:text-base text-svi-dark-grey leading-relaxed">
                A través de una sociedad con una cuenta en AndBank España.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-svi-light-grey space-y-4">
              <p className="text-sm sm:text-base text-svi-dark-grey leading-relaxed">
                <span className="font-bold text-svi-primary">¿Eres una empresa?</span> Hazlo con cuenta bancaria de empresa en AndBank.
              </p>
              <p className="text-sm sm:text-base text-svi-dark-grey leading-relaxed">
                <span className="font-bold text-svi-primary">¿Eres un particular que vive en el extranjero?</span> Hazlo con cuenta bancaria personal en AndBank.
              </p>
              <p className="text-sm sm:text-base text-svi-dark-grey leading-relaxed">
                <span className="font-bold text-svi-primary">¿Valoras el acompañamiento de un gestor bancario?</span> Hazlo con cuenta bancaria en AndBank.
              </p>
            </div>
            <p className="mt-6 text-sm sm:text-base text-svi-dark-grey leading-relaxed">
              Para cualquier otro caso, lo más cómodo es MyInvestor. En 15 minutos te puedes crear la cuenta online.
            </p>
            <p className="mt-4 text-sm sm:text-base text-svi-dark-grey leading-relaxed">
              Tanto AndBank como MyInvestor son bancos españoles con garantía de depósitos de hasta 100.000€ y permiten tanto suscribir participaciones como hacer traspaso de participaciones de otros fondos. Teóricamente puedes suscribir el fondo desde cualquier entidad bancaria española, pero recomendamos que lo hagas desde AndBank o MyInvestor para que pagues las menores comisiones posibles y ahorrarnos intermediarios.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-3 mb-8 sm:mb-10">
              {tabLabels.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 px-5 sm:px-6 py-3 rounded-full text-sm sm:text-base font-semibold text-center transition-colors ${
                    activeTab === i
                      ? 'bg-svi-primary text-white shadow-md'
                      : 'bg-white text-svi-primary border border-svi-light-grey hover:bg-svi-light-blue/20'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm border border-svi-light-grey">
              {activeTab === 0 && (
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-svi-primary mb-3">
                    ¿Inviertes a título personal y eres residente en España?
                  </h3>
                  <p className="text-sm sm:text-base text-svi-dark-grey leading-relaxed mb-8">
                    Si inviertes a título personal, eres residente en España y no necesitas un acompañamiento humano, esta es la vía: <span className="font-bold text-svi-primary">MyInvestor</span>.
                  </p>
                  <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-svi-medium-grey mb-5">
                    Pasos
                  </p>
                  <ol className="space-y-5">
                    <Step n={1}>
                      Te descargas la app de MyInvestor en el Apple Store o Google Play.
                    </Step>
                    <Step n={2}>
                      Sigues los pasos de creación de cuenta. Sólo te llevará 15 minutos. Ten a mano tu DNI o Pasaporte y ten paciencia: la aplicación no tiene por qué acertar a la primera.
                    </Step>
                    <Step n={3}>
                      Una vez creada la cuenta, guarda bien tu contraseña y los códigos de acceso que te envíen por SMS. Los necesitarás para invertir.
                    </Step>
                    <Step n={4}>
                      Espera unas horas/días a que te activen la cuenta.
                    </Step>
                    <Step n={5}>
                      Una vez activada, verás que tienes un IBAN bancario en la cuenta. Es a este IBAN donde tendrás que hacer una transferencia desde tu banco habitual. La transferencia tardará un par de días hábiles en llegar.
                    </Step>
                    <Step n={6}>
                      Cuando veas el dinero en la cuenta de MyInvestor, suscribe el fondo:
                      <ul className="mt-3 space-y-2 list-disc pl-5 marker:text-svi-primary">
                        <li>En "Home", busca "Fondos de Inversión" y clica "Me Interesa".</li>
                        <li>En el buscador de fondos escribe "svi us" o el ISIN de tu clase: Clase A con inversión mínima 1M€ (ES0131444129) o Clase B con inversión mínima 10€ (ES0131444137).</li>
                        <li>En "Efectivo Neto Aproximado" introduce la cantidad que deseas invertir.</li>
                        <li>Clica en los "Datos fundamentales para el inversor" y en el "Informe semestral": la app te obliga a leerlos antes de invertir.</li>
                        <li>Clica "He leído y acepto la información legal del fondo y el aviso legal".</li>
                        <li>Clica "CONTINUAR Y FIRMAR" e introduce las letras de tu clave (la que te enviaron por SMS al crear la cuenta).</li>
                      </ul>
                    </Step>
                  </ol>
                  <p className="mt-8 text-sm sm:text-base text-svi-dark-grey leading-relaxed">
                    Tu orden quedará registrada como PENDIENTE en "Inversión" → "Ver Listado de Órdenes". En 2-3 días hábiles verás el SVI US Markets en tu cartera. Enhorabuena, ya eres inversor sistemático. 😎
                  </p>
                </div>
              )}

              {activeTab === 1 && (
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-svi-primary mb-3">
                    ¿No resides en España o inviertes a través de una empresa o holding patrimonial?
                  </h3>
                  <p className="text-sm sm:text-base text-svi-dark-grey leading-relaxed mb-8">
                    Si inviertes a través de una empresa o holding patrimonial, eres residente fiscal fuera de España, has tenido problemas con la app de MyInvestor o prefieres un acompañamiento personalizado con un gestor bancario, esta es la vía: <span className="font-bold text-svi-primary">AndBank</span>.
                  </p>
                  <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-svi-medium-grey mb-5">
                    Pasos
                  </p>
                  <ol className="space-y-5">
                    <Step n={1}>
                      Prepara la documentación (en la pestaña "Documentos" tienes el anexo con los documentos según el tipo de cuenta).
                    </Step>
                    <Step n={2}>
                      Ponte en contacto vía mail con{' '}
                      <a
                        href="mailto:david@svinvesting.com"
                        className="text-svi-primary font-semibold underline hover:text-svi-secondary transition-colors"
                      >
                        david@svinvesting.com
                      </a>
                      . David creará un hilo de correos con los responsables de AndBank que gestionan la creación de cuentas de todos los clientes de Systematic Value Investing.
                    </Step>
                    <Step n={3}>
                      Cuando AndBank te escriba pidiendo la documentación, adjúntala en respuesta al mail.
                    </Step>
                    <Step n={4}>
                      Si toda la documentación está correcta, te responderán con un link para firmar electrónicamente la cuenta y facilitarte las claves de acceso. Guárdalas bien: las necesitarás para suscribir el fondo.
                    </Step>
                    <Step n={5}>
                      Una vez creada la cuenta, haz una transferencia desde tu banco habitual al IBAN de tu cuenta de AndBank. Tardará un par de días hábiles en llegar.
                    </Step>
                    <Step n={6}>
                      Suscribe las participaciones del fondo:
                      <ul className="mt-3 space-y-2 list-disc pl-5 marker:text-svi-primary">
                        <li>
                          Accede a{' '}
                          <a
                            href="https://www.andbank.es/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-svi-primary font-semibold underline hover:text-svi-secondary transition-colors"
                          >
                            https://www.andbank.es/
                          </a>{' '}
                          y clica "Banca Online".
                        </li>
                        <li>Introduce tu usuario y contraseña y accede a la plataforma.</li>
                        <li>Clica "Inversiones" → "Fondos" → "Operaciones y Consultas" → "Suscripciones".</li>
                        <li>En el buscador de fondos, busca por nombre "GESTION BOUTI VII SVI US MKT A" o, mejor aún, por el ISIN de tu clase: Clase A con inversión mínima 1M€ (ES0131444129) o Clase B con inversión mínima 10€ (ES0131444137).</li>
                        <li>Selecciona el fondo (comprueba bien que el ISIN sea el correcto) y en "datos económicos" pon la inversión que quieras realizar.</li>
                        <li>Abre los documentos del KIID y del INFORME SEMESTRAL (la web te obliga antes de invertir), acepta la operación e introduce las claves de la cuenta. Acepta la suscripción.</li>
                      </ul>
                    </Step>
                  </ol>
                  <p className="mt-8 text-sm sm:text-base text-svi-dark-grey leading-relaxed">
                    Tu orden quedará registrada. En 2-3 días hábiles, en "Inversiones" → "Valoración de cartera" verás el SVI US Markets. Enhorabuena, ya eres inversor sistemático. 😎
                  </p>
                  <p className="mt-4 text-sm sm:text-base text-svi-medium-grey leading-relaxed italic">
                    *Nota: como alternativa, el equipo de AndBank os puede ayudar en cualquier momento e, incluso, pueden suscribirlo por vosotros previa autorización. De igual modo, si queréis hacer un traspaso, lo mejor es hablar con ellos directamente.
                  </p>
                </div>
              )}

              {activeTab === 2 && (
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-svi-primary mb-8">
                    Documentos que necesitarás para abrirte cuenta
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <p className="font-bold text-svi-primary mb-3 text-sm sm:text-base">
                        Documentos AndBank – Cuenta Personal (residente español):
                      </p>
                      <ul className="space-y-2 list-disc pl-5 marker:text-svi-primary text-sm sm:text-base text-svi-dark-grey leading-relaxed">
                        <li>Fotocopia del DNI.</li>
                        <li>Fotocopia del último IRPF.</li>
                        <li>Fotocopia de una nómina reciente.</li>
                        <li>Número de teléfono.</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-svi-primary mb-3 text-sm sm:text-base">
                        Documentos AndBank – Cuenta Personal (residente extranjero):
                      </p>
                      <ul className="space-y-2 list-disc pl-5 marker:text-svi-primary text-sm sm:text-base text-svi-dark-grey leading-relaxed">
                        <li>Fotocopia del DNI español.</li>
                        <li>Fotocopia del NIF fiscal del país de residencia.</li>
                        <li>Fotocopia del certificado de inscripción consular en la embajada española en el país de residencia.</li>
                        <li>Fotocopia del certificado de residencia fiscal en el país extranjero emitido por las autoridades del país conforme se tributa allí.</li>
                        <li>Fotocopia de una última presentación y pago de impuestos (IRPF).</li>
                        <li>Fotocopia de una nómina reciente.</li>
                        <li>Número de teléfono móvil.</li>
                        <li>Dirección del domicilio en el extranjero.</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-svi-primary mb-3 text-sm sm:text-base">
                        Documentos AndBank – Cuenta Empresa (nacional):
                      </p>
                      <ul className="space-y-2 list-disc pl-5 marker:text-svi-primary text-sm sm:text-base text-svi-dark-grey leading-relaxed">
                        <li>Tarjeta del CIF de la sociedad.</li>
                        <li>Última declaración del Impuesto de Sociedades presentada.</li>
                        <li>Balance o Cuenta de Resultados del último año o Borrador del Impuesto de Sociedades.</li>
                        <li>Código LEI de la Sociedad (se solicita online al registro mercantil).</li>
                        <li>Escritura de constitución.</li>
                        <li>Escritura de poderes notariales.</li>
                        <li>Escritura de beneficiarios finales o Titularidad Real.</li>
                        <li>Cualquier otra escritura o modificación.</li>
                        <li>Fotocopia del DNI en vigor de cada apoderado o representante legal de la sociedad.</li>
                        <li>Teléfono, e-mail y domicilio de cada uno de los apoderados o representantes legales.</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-svi-primary mb-3 text-sm sm:text-base">
                        Documentos AndBank – Cuenta Empresa (extranjera):
                      </p>
                      <ul className="space-y-2 list-disc pl-5 marker:text-svi-primary text-sm sm:text-base text-svi-dark-grey leading-relaxed">
                        <li className="italic">*Se evalúa caso por caso en función de la empresa y el país.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-svi-primary to-svi-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            ¿Listo para empezar?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-50 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Solicita información sobre cómo acceder a nuestra estrategia de inversión.
          </p>

          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-3 sm:space-y-4 text-left">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              disabled={loading}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base text-svi-dark-grey placeholder-gray-400 border-2 border-transparent focus:border-white focus:outline-none transition-all"
            />
            <textarea
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="¿Quieres enviarnos un mensaje? (opcional)"
              rows={3}
              disabled={loading}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base text-svi-dark-grey placeholder-gray-400 border-2 border-transparent focus:border-white focus:outline-none transition-all resize-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 sm:py-4 bg-white text-svi-primary rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? 'Enviando...' : (<>Recibir información <Send className="w-4 h-4 sm:w-5 sm:h-5" /></>)}
            </button>
            {formMsg && (
              <div className={`p-3 sm:p-4 rounded-lg text-sm sm:text-base ${formMsg.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {formMsg.text}
              </div>
            )}
          </form>
        </div>
      </section>

      <ReportCTA />
    </div>
  );
}
