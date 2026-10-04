"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface UseCase {
  title: string;
  description: string;
}

/**
 * NOTA: la 3ra tarjeta ("Meta ads para empresas de servicios") tenía en Figma
 * la descripción de "Diseño y Desarrollo Web" pegada por error (copy-paste).
 * Se corrigió aquí con una descripción propia para Meta Ads. Revisar con el
 * cliente si el copy final debe ser otro.
 */
const USE_CASES: UseCase[] = [
  {
    title: "Meta ads para ecommerce",
    description: "Escala las ventas de tu ecommerce en 30 días.",
  },
  {
    title: "Meta ads para B2B",
    description: "Mejora el performance de tus Meta Ads para B2B.",
  },
  {
    title: "Meta ads para empresas de servicios",
    description:
      "Genera leads calificados y agenda más citas con campañas de conversión hechas a la medida de tu negocio.",
  },
];

export default function UseCases() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".ma-usecase-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="casos-de-uso"
      className="w-full pt-0 pb-[48px] md:pb-[80px] bg-[#EFF8FD]"
    >
      <div className="max-w-[1220px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
          {USE_CASES.map((item) => (
            <div
              key={item.title}
              className="ma-usecase-card invisible bg-white rounded-[16px] p-[24px] flex flex-col items-start gap-[16px]"
            >
              <h3 className="text-[24px] leading-[28px] font-normal text-[#141821]">
                {item.title}
              </h3>
              <p className="bg-transparent text-[16px] leading-[20px] text-[#485157]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
