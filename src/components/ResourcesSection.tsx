import { Youtube, Mail } from 'lucide-react';

export default function ResourcesSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50/30 to-cyan-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-svi-primary mb-4 sm:mb-6">
            Recursos
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-svi-dark-grey max-w-3xl mx-auto">
            Aprende más sobre inversión sistemática y value investing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mb-4 sm:mb-6 rounded-full bg-red-50 flex items-center justify-center">
              <Youtube className="w-7 h-7 sm:w-8 sm:h-8 text-red-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-svi-primary mb-3 sm:mb-4">Canal de YouTube</h3>
            <p className="text-base sm:text-lg text-svi-dark-grey mb-6 sm:mb-8 leading-relaxed">
              Análisis de mercados, explicaciones de estrategias y educación sobre inversión cuantitativa.
            </p>
            <button className="w-full px-6 py-3 sm:px-8 sm:py-4 bg-red-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-red-700 transition-colors">
              Visitar canal
            </button>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mb-4 sm:mb-6 rounded-full bg-orange-50 flex items-center justify-center">
              <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-orange-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-svi-primary mb-3 sm:mb-4">Newsletter en Substack</h3>
            <p className="text-base sm:text-lg text-svi-dark-grey mb-6 sm:mb-8 leading-relaxed">
              Análisis profundos, actualizaciones de cartera y reflexiones sobre inversión value.
            </p>
            <button className="w-full px-6 py-3 sm:px-8 sm:py-4 bg-orange-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-orange-700 transition-colors">
              Suscribirse
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
