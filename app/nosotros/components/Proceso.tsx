"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ETAPAS = [
  {
    numero: "01",
    titulo: "Diagnóstico",
    texto:
      "Entendemos tu negocio, tu audiencia y qué está funcionando hoy. Sin esta etapa, todo lo demás son suposiciones.",
  },
  {
    numero: "02",
    titulo: "Estrategia",
    texto:
      "Definimos objetivos, alcance y prioridades. Acordamos qué vamos a medir y cómo se ve el éxito del proyecto.",
  },
  {
    numero: "03",
    titulo: "Diseño y desarrollo",
    texto:
      "Ejecutamos con revisiones en cada hito, para que no haya sorpresas al final ni cambios que rehagan el trabajo.",
  },
  {
    numero: "04",
    titulo: "Medición y evolución",
    texto:
      "Lanzamos, medimos y ajustamos. El proyecto no termina cuando sale al aire: ahí recién empieza a dar datos.",
  },
];

export default function Proceso() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        [".pr-blur-word", ".pr-blur-paragraph-word"],
        { autoAlpha: 0, filter: "blur(10px)", y: 10 },
        {
          autoAlpha: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.4,
          stagger: 0.015,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".pr-card",
        { autoAlpha: 0, y: 70 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pr-grid",
            start: "top 85%",
            once: true,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  const bajada =
    "El mismo método en cada proyecto, sea una web, una campaña o una marca completa.";

  return (
    <section ref={containerRef} className="w-full bg-[#EFF8FD] pt-[40px] md:pt-[48px] lg:pt-[64px] pb-0">
      <div className="mx-auto max-w-[1220px] px-4 md:px-8">
        <div className="mx-auto mb-[32px] max-w-[820px] text-center">
          <h2 className="mb-[12px] text-[28px] leading-[34px] md:text-[38px] md:leading-[44px] lg:text-[48px] lg:leading-[56px]">
            {["Cómo"].map((word, i) => (
              <span
                key={`pr-t-${i}`}
                className="pr-blur-word invisible inline-block"
              >
                {word}&nbsp;
              </span>
            ))}
            <span className="pr-blur-word invisible inline-block font-accent italic font-light">
              trabajamos
            </span>
          </h2>

          <p className="mx-auto flex max-w-[640px] flex-wrap justify-center gap-x-[4px] bg-transparent text-[14px] leading-[22px] text-[#525866] md:text-[16px]">
            {bajada.split(" ").map((word, index) => (
              <span
                key={`pr-b-${index}`}
                className="pr-blur-paragraph-word invisible inline-block"
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        <div className="pr-grid grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-4">
          {ETAPAS.map((etapa) => (
            <article
              key={etapa.numero}
              className="pr-card invisible flex flex-col items-start gap-[16px] rounded-[16px] bg-white p-[24px]"
            >
              {/* Aquí el número sí dice algo: son pasos y van en orden. */}
              <p className="bg-transparent font-accent text-[32px] leading-[32px] font-light italic text-[#141821]">
                {etapa.numero}
              </p>

              <h3 className="text-[24px] leading-[28px] font-normal text-[#141821]">
                {etapa.titulo}
              </h3>

              <p className="bg-transparent text-[16px] leading-[20px] text-[#485157]">
                {etapa.texto}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
