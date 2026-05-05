import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-svi-primary to-svi-secondary rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 text-center shadow-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 lg:mb-8">
            Empieza a invertir con SVI
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-50 mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto">
            Descubre cómo nuestra estrategia sistemática puede ayudarte a construir una cartera de inversión más sólida y rentable a largo plazo.
          </p>
          <button className="inline-flex items-center gap-2 sm:gap-3 px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6 bg-white text-svi-primary text-base sm:text-lg md:text-xl font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl">
            Contactar con el equipo
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="mt-10 sm:mt-12 md:mt-16 pt-8 sm:pt-10 md:pt-12 border-t border-white/20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-white">
              <div>
                <div className="text-2xl sm:text-3xl font-bold mb-2">30</div>
                <div className="text-sm sm:text-base text-blue-100">Empresas en cartera</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold mb-2">+60.000</div>
                <div className="text-sm sm:text-base text-blue-100">Compañías analizadas</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold mb-2">1995</div>
                <div className="text-sm sm:text-base text-blue-100">Backtesting desde</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 sm:mt-16 md:mt-20 text-center">
        <div className="text-svi-medium-grey text-sm">
          <p className="mb-2">© 2024 Systematic Value Investing. Todos los derechos reservados.</p>
          <p>Los resultados pasados no garantizan rentabilidades futuras.</p>
        </div>
      </footer>
    </section>
  );
}
