import { Linkedin } from 'lucide-react';
import TeamHeader from '../components/TeamHeader';
import ContactForm from '../components/ContactForm';
import DavidBanner from '../components/DavidBanner';
import ReportCTA from '../components/ReportCTA';

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
                  El equipo tiene +50% del patrimonio personal invertido en nuestro propio fondo de inversión.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />

      <DavidBanner />

      <ReportCTA />
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
