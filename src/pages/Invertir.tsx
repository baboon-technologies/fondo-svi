import { useState } from 'react';
import { Check, ArrowRight, Send, Shield, TrendingUp, Users, Download, UserPlus, Gift, Search, Wallet } from 'lucide-react';

export default function Invertir() {
  const [email, setEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formMsg, setFormMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-svi-primary mb-4 sm:mb-6">
              Por qué invertir con SVI
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 sm:p-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-svi-light-blue/20 flex items-center justify-center">
                <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-svi-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-svi-primary mb-3 sm:mb-4">Rendimiento superior</h3>
              <p className="text-base sm:text-lg text-svi-dark-grey leading-relaxed">
                Estrategia con +3.8% anual de rentabilidad adicional vs S&P 500 desde 1995
              </p>
            </div>

            <div className="text-center p-6 sm:p-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-svi-light-blue/20 flex items-center justify-center">
                <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-svi-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-svi-primary mb-3 sm:mb-4">Inversión disciplinada</h3>
              <p className="text-base sm:text-lg text-svi-dark-grey leading-relaxed">
                Proceso sistemático sin decisiones emocionales ni timing del mercado
              </p>
            </div>

            <div className="text-center p-6 sm:p-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-svi-light-blue/20 flex items-center justify-center">
                <Users className="w-7 h-7 sm:w-8 sm:h-8 text-svi-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-svi-primary mb-3 sm:mb-4">Equipo experto</h3>
              <p className="text-base sm:text-lg text-svi-dark-grey leading-relaxed">
                Gestión por profesionales con décadas de experiencia en inversión cuantitativa
              </p>
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
    </div>
  );
}
