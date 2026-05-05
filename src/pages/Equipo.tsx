import { Linkedin } from 'lucide-react';
import TeamHeader from '../components/TeamHeader';

interface TeamMember {
  name: string;
  role: string;
  type: string;
  details: string[];
  image?: string;
  linkedin?: string;
}

export default function Equipo() {
  const founders: TeamMember[] = [
    {
      name: "David Sánchez Molina",
      role: "Responsable de Negocio",
      type: "Cofundador",
      details: [
        "Ingeniero Aeroespacial (UPC & University of Colorado) & Economista (UOC).",
        "Profesor en EADA Business School de Modelos Financieros, Valoración y Proyectos FInTech.",
        "Asesor Financiero Independiente (EFA & CFA Candidate Level II)."
      ],
      image: "/Equipo/25.png",
      linkedin: "https://www.linkedin.com/in/davidmirrorauthor/"
    },
    {
      name: "Edgar Alarcón Palma",
      role: "Responsable Tecnológico",
      type: "Cofundador",
      details: [
        "Ingeniero Electrónico (UPC) & Máster en Data Science (UOC).",
        "+10 años de experiencia en Arquitectura de Software, IA, Computer Vision, gestión de servidores y redes.",
        "Tech Lead de proyectos con Renfe, AENA, GAES, PortAventura, etc."
      ],
      image: "/Equipo/26.png",
      linkedin: "https://www.linkedin.com/in/edgar-alarcon/"
    },
    {
      name: "Javi Ródenas Cumplido",
      role: "Doctorado en IA (UB)",
      type: "Cofundador",
      details: [
        "Ingeniero Electrónico (UPC) & Doctorado IA (UB).",
        "+8 años en análisis de datos y a la vanguardia del estado del arte en Inteligencia Artificial.",
        "Experto en Computer Vision, modelos predictivos y series temporales."
      ],
      image: "/Equipo/27.png",
      linkedin: "https://www.linkedin.com/in/javier-rodenas-0226ba128/"
    },
    {
      name: "Sergi Farrés Contreras",
      role: "Partner Márketing - LemonAds",
      type: "Cofundador",
      details: [
        "MBA (EAE) & Máster en Data Science (Nuclio).",
        "+20 años como responsable comercial.",
        "Propietario de LemonAds, agencia de márketing digital con clientes como GAES, Grupo Volkswagen o la King's League."
      ],
      image: "/Equipo/28.png",
      linkedin: "https://www.linkedin.com/in/sergi-farr%C3%A9s/"
    }
  ];

  const advisors: TeamMember[] = [
    {
      name: "Adolf Todó Rovira",
      role: "Advisor",
      type: "Advisor",
      details: [
        "Ex Director General de Caixa Manresa y Ex Presidente de Caixa Catalunya.",
        "Consejero en TOUS."
      ],
      image: "/Equipo/29.png"
    },
    {
      name: "David Garrofé Puig",
      role: "Advisor",
      type: "Advisor",
      details: [
        "Ex Secretario General - Patronal CECOT.",
        "CEO de Binillium SL Investments"
      ],
      image: "/Equipo/30.png",
      linkedin: "https://www.linkedin.com/in/davidgarrofe/"
    },
    {
      name: "Gaspar Andrés Rius",
      role: "Advisor",
      type: "Advisor",
      details: [
        "Ex VP of Innovation - Procter & Gamble (NYSE:PG).",
        "Business Angel & Inversor Profesional."
      ],
      image: "/Equipo/31.png",
      linkedin: "https://www.linkedin.com/in/gaspar-andres/"
    }
  ];

  return (
    <div className="pt-20">
      <TeamHeader />

      <section className="pt-12 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-svi-primary">
              Fundadores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {founders.map((member, index) => (
                <TeamCard key={index} member={member} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-svi-primary">
              Advisors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {advisors.map((member, index) => (
                <TeamCard key={index} member={member} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="text-sm font-semibold text-svi-secondary uppercase tracking-wider mb-4">
              Nuestra filosofía
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-svi-primary leading-tight">
              Nuestros valores
            </h2>
          </div>

          {/* Grid principal: Pilares + Imagen */}
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 mb-16 lg:mb-20">
            {/* Pilares */}
            <div className="lg:col-span-3 flex flex-col justify-center space-y-6">
              {[
                {
                  title: "Educación financiera",
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )
                },
                {
                  title: "Fondos de inversión competitivos",
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  )
                },
                {
                  title: "Creación y preservación del patrimonio de nuestros clientes",
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )
                }
              ].map((pilar, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:border-svi-primary/30 transition-all duration-300 group">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br from-svi-primary to-svi-secondary flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      {pilar.icon}
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-svi-dark-grey leading-tight">
                        {pilar.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Imagen */}
            <div className="lg:col-span-2 flex items-center">
              <div className="relative w-full">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-svi-primary/20">
                  <img
                    src="/Stock.png"
                    alt="Valores del equipo"
                    className="w-full h-full object-cover aspect-[4/5]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bloque emocional: Sueños */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-svi-primary to-svi-secondary rounded-2xl lg:rounded-3xl p-8 lg:p-12 xl:p-14 shadow-2xl text-white relative overflow-hidden">
              {/* Elementos decorativos */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-svi-primary/30 rounded-full blur-3xl"></div>

              <div className="relative">
                <div className="mb-8 lg:mb-10">
                  <p className="text-2xl lg:text-3xl font-bold leading-tight">
                    Con el fin de conseguir que cumplan sus sueños:
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-10 lg:mb-12">
                  {[
                    {
                      text: "Hacer la entrada de su primera vivienda.",
                      icon: (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      )
                    },
                    {
                      text: "Planificarse para la jubilación.",
                      icon: (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )
                    },
                    {
                      text: "Enviar a sus hijos a universidades en el extranjero.",
                      icon: (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )
                    }
                  ].map((sueno, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                        {sueno.icon}
                      </div>
                      <p className="text-base lg:text-lg leading-relaxed text-white/95">
                        {sueno.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-8 lg:pt-10 border-t border-white/30">
                  <p className="text-xl lg:text-2xl xl:text-3xl font-semibold leading-relaxed max-w-4xl">
                    Y, en definitiva, ser el partner de confianza donde invertir sus ahorros a largo plazo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-svi-primary mb-12 text-center">
              Valores fundamentales
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-gray-50 rounded-2xl">
                <h3 className="text-2xl font-bold text-svi-primary mb-4">Disciplina</h3>
                <p className="text-gray-700 leading-relaxed">
                  Mantenemos un proceso sistemático y evitamos decisiones emocionales, incluso en períodos de volatilidad.
                </p>
              </div>

              <div className="p-8 bg-gray-50 rounded-2xl">
                <h3 className="text-2xl font-bold text-svi-primary mb-4">Transparencia</h3>
                <p className="text-gray-700 leading-relaxed">
                  Comunicamos claramente nuestra metodología, resultados y el razonamiento detrás de nuestras decisiones.
                </p>
              </div>

              <div className="p-8 bg-gray-50 rounded-2xl">
                <h3 className="text-2xl font-bold text-svi-primary mb-4">Innovación</h3>
                <p className="text-gray-700 leading-relaxed">
                  Investigamos continuamente nuevas técnicas y refinamos nuestros modelos basándonos en evidencia empírica.
                </p>
              </div>

              <div className="p-8 bg-gray-50 rounded-2xl">
                <h3 className="text-2xl font-bold text-svi-primary mb-4">Alineación</h3>
                <p className="text-gray-700 leading-relaxed">
                  Invertimos nuestro propio capital en la estrategia, alineando completamente nuestros intereses con los inversores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
      <div className="flex flex-col items-center text-center flex-grow">
        <div className="relative mb-4">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white border-4 border-svi-primary/20 shadow-lg overflow-hidden">
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.add('bg-gradient-to-br', 'from-blue-50', 'to-cyan-50');
                    const placeholder = document.createElement('div');
                    placeholder.className = 'w-full h-full flex items-center justify-center text-4xl font-bold';
                    placeholder.style.color = '#012878';
                    placeholder.textContent = member.name.charAt(0);
                    parent.appendChild(placeholder);
                  }
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                <span className="text-4xl font-bold text-svi-primary">
                  {member.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>

        <h3 className="text-lg md:text-xl font-bold text-svi-primary mb-2">
          {member.name}
        </h3>

        <p className="text-sm md:text-base font-semibold text-svi-primary mb-5">
          {member.role}
        </p>

        <div className="mb-5 w-full px-2">
          <ul className="text-left space-y-2">
            {member.details.map((detail, idx) => (
              <li key={idx} className="text-sm text-gray-700 leading-relaxed">
                • {detail}
              </li>
            ))}
          </ul>
        </div>

        {member.linkedin && (
          <div className="mt-auto pt-3">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-svi-light-grey text-svi-primary hover:bg-svi-primary hover:text-white transition-all duration-200"
              aria-label={`LinkedIn de ${member.name}`}
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
