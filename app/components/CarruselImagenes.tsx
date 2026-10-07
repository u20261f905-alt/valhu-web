"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export type Pieza = { id: string; image: string; alt: string };

/**
 * Carrusel infinito de imágenes.
 *
 * La pista duplica el set una vez y se anima de -50% a 0% en bucle lineal.
 * Como las piezas están duplicadas exactamente, el salto de vuelta cae en un
 * fotograma idéntico al anterior y no se nota el corte.
 *
 * A los lados van dos degradados del color del fondo, para que las piezas
 * se desvanezcan en vez de cortarse contra el borde de la pantalla.
 */
export default function CarruselImagenes({
  piezas,
  duracion = 32,
  ancho = 460,
  alto = 288,
  pegadoArriba = false,
}: {
  piezas: Pieza[];
  /** Segundos que tarda en recorrer el set completo. Más alto, más lento. */
  duracion?: number;
  ancho?: number;
  alto?: number;
  /** True cuando va justo debajo de un título que ya puso la separación. */
  pegadoArriba?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        trackRef.current,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        trackRef.current,
        { xPercent: -50 },
        { xPercent: 0, duration: duracion, ease: "none", repeat: -1 },
      );
    },
    { scope: sectionRef, dependencies: [duracion] },
  );

  const enBucle = [...piezas, ...piezas];

  // En móvil las piezas se muestran al 60% para que el carrusel no coma
  // media pantalla de alto. La proporción se conserva.
  const anchoMovil = Math.round(ancho * 0.6);
  const altoMovil = Math.round(alto * 0.6);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden bg-[#EFF8FD] pb-0 ${pegadoArriba ? "pt-[20px]" : "pt-[24px] md:pt-[32px] lg:pt-[48px]"}`}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[90px] bg-gradient-to-r from-[#EFF8FD] to-transparent md:w-[300px]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[90px] bg-gradient-to-l from-[#EFF8FD] to-transparent md:w-[300px]" />

      <div
        ref={trackRef}
        className="flex w-max items-center gap-[12px] md:gap-[20px]"
        style={
          {
            "--pieza-ancho": `${ancho}px`,
            "--pieza-alto": `${alto}px`,
            "--pieza-ancho-movil": `${anchoMovil}px`,
            "--pieza-alto-movil": `${altoMovil}px`,
          } as CSSProperties
        }
      >
        {enBucle.map((pieza, i) => (
          <div
            key={`${pieza.id}-${i}`}
            className="relative h-[var(--pieza-alto-movil)] w-[var(--pieza-ancho-movil)] shrink-0 overflow-hidden rounded-[12px] md:h-[var(--pieza-alto)] md:w-[var(--pieza-ancho)]"
          >
            <Image
              src={pieza.image}
              alt={i < piezas.length ? pieza.alt : ""}
              fill
              className="object-cover"
              sizes={`(max-width: 767px) ${anchoMovil}px, ${ancho}px`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
