import { Linkedin } from 'lucide-react';
import TeamHeader from './TeamHeader';

interface TeamMember {
  name: string;
  role: string;
  type: string;
  details: string[];
  image?: string;
  linkedin?: string;
}

export default function TeamSection() {
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
    <section className="bg-white">
      <TeamHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 md:pb-24">
        <div className="mb-16 sm:mb-20">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-svi-primary mb-8 sm:mb-10 md:mb-12 text-center">
            Fundadores
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {founders.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-svi-primary mb-8 sm:mb-10 md:mb-12 text-center">
            Advisors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {advisors.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
      <div className="flex flex-col items-center text-center flex-grow">
        <div className="relative mb-4">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white border-4 border-svi-primary/20 shadow-lg overflow-hidden">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h4 className="text-lg md:text-xl font-bold text-svi-primary mb-2">
          {member.name}
        </h4>

        <p className="text-sm md:text-base font-semibold text-svi-primary mb-1">
          {member.role}
        </p>

        <p className="text-sm text-gray-500 mb-5 font-medium">
          {member.type}
        </p>

        <div className="mb-5 w-full">
          <ul className="text-left space-y-2.5">
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
