"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Banner/Hero de la página "Nosotros".
 * Misma técnica de animación (blur palabra por palabra + esfera con scale/alpha)
 * que app/components/Hero.tsx y el resto de internas.
 */
export default function NosotrosBanner() {
  const containerRef = useRef<HTMLElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".ns-anim-pretitle",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
        0,
      )
        .fromTo(
          [".ns-blur-word", ".ns-blur-paragraph-word"],
          { autoAlpha: 0, filter: "blur(10px)", y: 10 },
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 0.4,
            stagger: 0.015,
            ease: "power2.out",
          },
          0.15,
        )
        .fromTo(
          ".ns-anim-btn",
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0, duration: 1.8, ease: "expo.out" },
          0.6,
        )
        .fromTo(
          sphereRef.current,
          { autoAlpha: 0, scale: 1.2 },
          { autoAlpha: 1, scale: 1, duration: 1.6, ease: "power3.out" },
          0,
        );
    },
    { scope: containerRef },
  );

  const paragraph =
    "Mi nombre es Gerardo Valenzuela y soy el fundador de Valhu Group, una agencia de innovación especializada en diseño y desarrollo web, performance ads, UX/UI y branding. Cuidamos el detalle y el acabado de cada entrega, porque un producto digital solo vale la pena si logra que tu marca destaque donde todas se parecen.";

  return (
    <section ref={containerRef} className="w-full bg-[#EFF8FD]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-8 pt-[24px] pb-[48px] md:pt-[40px] md:pb-[48px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[20px] md:gap-[24px] lg:gap-[40px] items-center border-b border-[#E1E7EC] pb-[24px] md:pb-[40px]">
          {/* COLUMNA IZQUIERDA */}
          <div className="md:col-span-7 flex flex-col items-start">
            {/* Pretitle */}
            <div className="mb-3">
              <span className="ns-anim-pretitle invisible text-[14px]/[18px] md:text-[16px]/[22px] uppercase underline decoration-[1px] decoration-[#969EB3] [text-underline-offset:2px] text-[#969EB3] font-normal inline-block">
                NOSOTROS
              </span>
            </div>

            {/* Título */}
            <h1 className="mb-[16px] md:mb-[20px] !text-[36px] !leading-[40px] md:!text-[52px] md:!leading-[58px] lg:!text-[64px] lg:!leading-[72px]">
              <span className="ns-blur-word invisible inline-block">
                Creamos
              </span>{" "}
              <span className="ns-blur-word invisible inline-block">
                productos
              </span>{" "}
              <span className="ns-blur-word invisible inline-block">que</span>{" "}
              <span className="ns-blur-word invisible inline-block font-accent italic font-light">
                te
              </span>{" "}
              <span className="ns-blur-word invisible inline-block font-accent italic font-light">
                diferencian
              </span>
            </h1>

            {/* Párrafo */}
            <p className="text-[14px] md:text-[16px] leading-[20px] text-[#485157] mb-[24px] md:mb-6 flex flex-wrap content-start gap-x-[4px] max-w-[600px]">
              {paragraph.split(" ").map((word, index) => (
                <span
                  key={`ns-p-${index}`}
                  className="ns-blur-paragraph-word invisible inline-block"
                >
                  {word}
                </span>
              ))}
            </p>

            {/* Botones */}
            <div className="ns-anim-btn invisible flex flex-col sm:flex-row gap-[20px] w-full sm:w-auto">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-3 px-[20px] py-[16px] rounded-[8px] bg-[#141821] text-white text-[16px] font-semibold hover:bg-opacity-90 transition-colors"
              >
                Conversemos tu proyecto
              </Link>

              <Link
                href="/servicios"
                className="inline-flex items-center justify-center gap-3 px-[20px] py-[16px] rounded-[8px] border border-[#D0D7DD] bg-[#EFF8FD] text-[16px] font-semibold text-[#141821] hover:bg-white transition-colors"
              >
                Ver servicios
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="-scale-y-100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.05317 5.80864L16.6169 14.568L16.7007 7.14383L17.6984 7.09145L17.5946 16.2833L8.40276 16.1794L8.47766 15.1832L15.9018 15.267L7.33812 6.50772L8.05317 5.80864Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA: la foto de quien está detrás de la agencia.
              El contenedor sigue la proporción del archivo (351x479) para
              que la foto lo llene sin recortes ni franjas vacías. */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            {/* El contenedor de fuera lo maneja GSAP (entrada). La inclinación
                vive en el de dentro para que las dos no se pisen. */}
            <div ref={sphereRef} className="w-full max-w-[360px] invisible">
              <div className="relative aspect-[1075/1464] rotate-2 transition-transform duration-300 ease-out hover:rotate-[5deg] drop-shadow-[0_40px_50px_rgba(62,82,87,0.12)]">
                <Image
                  src="/about/gerardo-valenzuela.webp"
                  alt="Gerardo Valenzuela, fundador de Valhu Group"
                  fill
                  priority
                  sizes="(min-width: 1024px) 360px, calc(100vw - 32px)"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
