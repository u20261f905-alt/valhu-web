"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Las cuatro etapas de una campaña, en el mismo formato que "Cómo
 * trabajamos" de Nosotros: un número, un nombre y qué pasa ahí.
 */
const ETAPAS = [
  {
    numero: "01",
    titulo: "Análisis",
    texto:
      "Revisamos todo lo que ya tienes funcionando: la web, las redes, los canales por donde llegan tus clientes y cómo se responden los mensajes. Sin ese panorama no hay campaña que rinda.",
  },
  {
    numero: "02",
    titulo: "Estrategia",
    texto:
      "Definimos a quién le hablamos, con qué mensaje y en qué formato. Acordamos el objetivo de la campaña y cómo vamos a saber si se está cumpliendo.",
  },
  {
    numero: "03",
    titulo: "Pauta",
    texto:
      "Armamos y lanzamos las campañas en Meta. Probamos varias versiones del anuncio desde el inicio, porque cuál funciona mejor no se adivina, se mide.",
  },
  {
    numero: "04",
    titulo: "Optimización",
    texto:
      "Ajustamos presupuesto, segmentación y creatividades según lo que dicen los datos, para bajar el costo por resultado mes a mes y reportarte qué cambió.",
  },
];

export default function StrategySection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // 1. TÍTULOS + PÁRRAFOS DE ARRIBA (Estrategias... / El motor de tu...)
      gsap.fromTo(
        [".ma-strategy-blur-word", ".ma-strategy-blur-paragraph-word"],
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

      // 2. Las tarjetas del proceso entran escalonadas.
      gsap.fromTo(
        ".ma-etapa-card",
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ma-etapas",
            start: "top 80%",
            once: true,
          },
        },
      );

      const handleLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", handleLoad);
      if (document.readyState === "complete") ScrollTrigger.refresh();

      return () => window.removeEventListener("load", handleLoad);
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="w-full pt-0 pb-[48px] md:pb-[80px] bg-[#EFF8FD]"
    >
      <div className="max-w-[1220px] mx-auto px-4 md:px-8">
        {/* TÍTULO PRINCIPAL DE LA SECCIÓN */}
        <div className="flex flex-col items-center gap-[24px] text-center mb-[48px] md:mb-[64px]">
          <h2 className="font-medium text-[#141821] max-w-[900px] flex flex-wrap content-start justify-center gap-x-[10px]">
            {[
              "Estrategias",
              "para",
              "Aumentar",
              "Ventas",
              "y",
              "Maximizar",
              "Conversiones",
              "en",
              "Meta",
              "Ads",
            ].map((word, i) => (
              <span
                key={`ma-strategy-${i}`}
                className="ma-strategy-blur-word invisible inline-block"
              >
                {word}
              </span>
            ))}
          </h2>
          <p className="text-[14px] md:text-[16px] text-[#485157] max-w-[604px]">
            Una buena estrategia, una mejor segmentación y una constante
            optimización de tus anuncios conseguirás resultados en Meta Ads.
          </p>
        </div>

        <div className="ma-etapas grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-4">
          {ETAPAS.map((etapa) => (
            <article
              key={etapa.numero}
              className="ma-etapa-card invisible flex flex-col items-start gap-[16px] rounded-[16px] bg-white p-[24px]"
            >
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
