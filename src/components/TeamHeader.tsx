import { FlipWords } from "@/components/ui/flip-words";

export default function TeamHeader() {
  const words = [
    "inversión cuantitativa",
    "inteligencia artificial",
    "gestión empresarial"
  ];

  return (
    <div className="relative overflow-hidden bg-white py-20 md:py-24">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(94,127,195,0.04),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(76,110,181,0.03),transparent_60%)] pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-5xl lg:text-6xl font-bold mb-8 text-svi-primary">
          El equipo
        </h2>

        <div className="max-w-3xl mx-auto">
          <p className="text-xl lg:text-2xl font-light leading-relaxed text-svi-dark-grey">
            Experiencia combinada en
          </p>
          <div className="mt-2">
            <FlipWords
              words={words}
              duration={3500}
              className="text-2xl lg:text-3xl font-semibold text-svi-secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
