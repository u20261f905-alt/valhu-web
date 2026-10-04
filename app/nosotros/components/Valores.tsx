"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Iconos dibujados a mano, en línea.
 *
 * Son trazos simples con el mismo grosor en los cuatro, para que se lean
 * como una familia y no como cuatro dibujos sueltos. Usan currentColor,
 * así que heredan el color del texto y no hay que tocarlos si cambia.
 */
const trazo = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Diana: apuntar a un objetivo antes que a un gusto visual. */
function IconoObjetivo() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...trazo}
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" />
    </svg>
  );
}

/** Cimientos: capas que sostienen lo que se construye encima. */
function IconoCimientos() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...trazo}
    >
      <path d="M12 3 21 7.5 12 12 3 7.5 12 3Z" />
      <path d="M3 12.5 12 17l9-4.5" />
      <path d="M3 17.5 12 22l9-4.5" />
    </svg>
  );
}

/** Barras: lo que se mide y se compara. */
function IconoMedicion() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...trazo}
    >
      <path d="M3 21h18" />
      <path d="M6.5 21v-6" />
      <path d="M12 21V9" />
      <path d="M17.5 21v-9.5" />
    </svg>
  );
}

/** Dos personas: estar del mismo lado de la mesa. */
function IconoSocios() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...trazo}
    >
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
      <path d="M16.2 5.2a3.2 3.2 0 0 1 0 5.9" />
      <path d="M17.5 14.9c2.1.7 3.5 2.5 3.5 5.1" />
    </svg>
  );
}

const VALORES = [
  {
    id: "estrategia",
    Icono: IconoObjetivo,
    titulo: "Estrategia antes que estética",
    texto:
      "Una web bonita que no vende es un gasto. Cada decisión de diseño responde primero a un objetivo de negocio y recién después a una preferencia visual.",
  },
  {
    id: "tecnica",
    Icono: IconoCimientos,
    titulo: "Criterio técnico, no atajos",
    texto:
      "Construimos sobre bases que aguantan, con velocidad, seguridad y capacidad de crecer. Lo que se entrega rápido y mal se termina pagando dos veces.",
  },
  {
    id: "medicion",
    Icono: IconoMedicion,
    titulo: "Medimos lo que importa",
    texto:
      "Definimos desde el inicio qué significa que el proyecto funcione y cómo se va a medir. Las decisiones se discuten con datos, no con opiniones.",
  },
  {
    id: "socios",
    Icono: IconoSocios,
    titulo: "Socios, no proveedores",
    texto:
      "Nos involucramos en el negocio, no solo en el entregable. Si algo no le conviene al cliente, lo decimos aunque signifique vender menos.",
  },
];

export default function Valores() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".vl-blur-word",
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
        ".vl-card",
        { autoAlpha: 0, y: 70 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".vl-grid",
            start: "top 85%",
            once: true,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="w-full bg-[#EFF8FD] py-[48px]">
      <div className="mx-auto max-w-[1220px] px-4 md:px-8">
        <div className="mx-auto mb-[32px] max-w-[820px] text-center">
          <h2 className="text-[28px] leading-[34px] md:text-[48px] md:leading-[56px]">
            {["Cómo", "pensamos", "antes", "de"].map((word, i) => (
              <span
                key={`vl-t-${i}`}
                className="vl-blur-word invisible inline-block"
              >
                {word}&nbsp;
              </span>
            ))}
            <span className="vl-blur-word invisible inline-block font-accent italic font-light">
              construir
            </span>
          </h2>
        </div>

        <div className="vl-grid grid grid-cols-1 gap-[20px] md:grid-cols-2">
          {VALORES.map(({ id, Icono, titulo, texto }) => (
            <article
              key={id}
              className="vl-card invisible flex flex-col items-start gap-[16px] rounded-[16px] bg-white p-[24px]"
            >
              <span className="text-[#141821]">
                <Icono />
              </span>

              <h3 className="text-[24px] leading-[28px] font-normal text-[#141821]">
                {titulo}
              </h3>

              <p className="bg-transparent text-[16px] leading-[20px] text-[#485157]">
                {texto}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
