import Image from 'next/image';
import Link from 'next/link';

interface CtaProps {
  titleLine1?: string;
  titleHighlighted?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function Cta({
  titleLine1 = "¿Listo para transformar tu idea en",
  titleHighlighted = "resultados reales?",
  description = "Analicemos tu proyecto y descubre como podemos ayudarte a escalar.",
  buttonText = "Agendar reunión",
  buttonLink = "#contacto"
}: CtaProps) {
  return (
    <section className="w-full bg-[#EFF8FD] pb-[48px]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-8">
        <div className="relative w-full h-[375px] bg-[#141821] rounded-[16px] overflow-hidden flex flex-col items-center justify-center text-center px-4">
          
          {/* Esfera Izquierda */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-45 w-[326px] h-[326px]">
            <Image
              src="/hero-sphere.png"
              alt="Esfera decorativa Valhu Group"
              fill
              className="object-contain"
            />
          </div>

          {/* Esfera Derecha */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-[135deg] w-[326px] h-[326px]">
            <Image
              src="/hero-sphere.png"
              alt="Esfera decorativa Valhu Group"
              fill
              className="object-contain"
            />
          </div>

          {/* Contenido */}
          <div className="relative z-10 flex flex-col items-center gap-[24px]">
            <h2 className="bg-transparent text-white font-normal text-[32px] md:text-[48px] leading-[40px] md:leading-[56px] max-w-[700px]">
              {titleLine1} <br className="hidden md:block" />
              <span className="bg-transparent font-accent italic text-white" style={{ fontWeight: 300 }}>
                {titleHighlighted}
              </span>
            </h2>
            
            <p className="bg-transparent text-[#D0D5DD] text-[16px] leading-[20px] max-w-[600px] font-normal">
              {description}
            </p>

            <Link
              href={buttonLink}
              className="mt-[8px] inline-flex items-center gap-3 px-[24px] py-[16px] rounded-[8px] border border-[#477087] bg-transparent text-white text-[16px] font-medium hover:bg-[#477087]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#477087] transition-colors"
            >
              {buttonText}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}