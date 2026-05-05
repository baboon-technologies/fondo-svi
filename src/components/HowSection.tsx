import { Database, BarChart3, CheckCircle, Briefcase } from 'lucide-react';

export default function HowSection() {
  const steps = [
    {
      icon: Database,
      number: "01",
      title: "Analizamos más de 60.000 empresas",
      description: "Procesamos datos financieros de todo el universo de renta variable estadounidense con nuestro sistema cuantitativo."
    },
    {
      icon: BarChart3,
      number: "02",
      title: "Aplicamos modelos cuantitativos",
      description: "Evaluamos cada empresa mediante métricas de calidad empresarial, rentabilidad sostenible y fortaleza financiera."
    },
    {
      icon: CheckCircle,
      number: "03",
      title: "Seleccionamos 30 compañías",
      description: "Identificamos las empresas con mejor combinación de calidad y valoración atractiva de forma sistemática."
    },
    {
      icon: Briefcase,
      number: "04",
      title: "Construimos la cartera",
      description: "Creamos una cartera concentrada con rebalanceo periódico y disciplina en la ejecución del proceso."
    }
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-svi-primary mb-4 sm:mb-6 text-left">
            Cómo funciona el proceso
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-svi-dark-grey max-w-3xl text-left">
            Un sistema disciplinado y replicable para identificar las mejores oportunidades de inversión.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img
              src="/Happypeople.png"
              alt="Happy people"
              className="w-full h-auto rounded-2xl shadow-xl"
            />
          </div>

          <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="flex gap-4 sm:gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-svi-light-blue/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-svi-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs sm:text-sm font-bold text-svi-primary mb-2">{step.number}</div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-svi-primary mb-3 sm:mb-4">{step.title}</h3>
                      <p className="text-sm sm:text-base md:text-lg text-svi-dark-grey leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 sm:mt-16 text-left">
          <button className="px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-white border-2 border-svi-primary text-svi-primary text-sm sm:text-base md:text-lg font-semibold rounded-lg hover:bg-svi-light-blue/20 transition-all duration-300">
            Conocer más sobre la metodología
          </button>
        </div>
      </div>
    </section>
  );
}
