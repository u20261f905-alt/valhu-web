"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------------
   Los párrafos llevan <strong> intercalados, así que se definen como
   segmentos (texto + si va en negrita). Cada segmento se trocea en
   palabras para poder animarlas una por una sin perder el formato.
   Misma técnica que app/components/About.tsx.
--------------------------------------------------------------- */
type Segment = { text: string; bold?: boolean };

const COLUMNA_IZQUIERDA: Segment[] = [
  { text: 'Hay un patrón que se repite en el mercado. Proyectos digitales entregados a tiempo, que cumplen la lista de requisitos y aun así' },
  { text: 'no mueven nada,', bold: true },
  { text: 'porque en el camino nadie se detuvo a preguntar qué hacía a esa marca distinta de las otras diez que venden lo mismo.' },
];

const COLUMNA_DERECHA: Segment[] = [
  { text: 'Por eso trabajamos al revés. La diferenciación' },
  { text: 'no es un extra', bold: true },
  { text: 'que se agrega al final, es el punto de partida. Antes de diseñar una pantalla o levantar una campaña definimos qué va a hacer que te noten, y recién ahí construimos. El acabado' },
  { text: 'no es negociable,', bold: true },
  { text: 'porque es lo único que de verdad te separa de tu competencia.' },
];

function AnimatedWords({
  segments,
  wordClass,
  keyPrefix,
}: {
  segments: Segment[];
  wordClass: string;
  keyPrefix: string;
}) {
  return (
    <>
      {segments.map((segment, si) =>
        segment.text.split(" ").map((word, wi) => (
          <span
            key={`${keyPrefix}-${si}-${wi}`}
            className={`${wordClass} invisible inline-block ${
              segment.bold ? "text-[#141821] font-semibold" : ""
            }`}
          >
            {word}
          </span>
        )),
      )}
    </>
  );
}

export default function Manifiesto() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // 1. Título + párrafos: blur palabra por palabra al entrar al viewport.
      gsap.fromTo(
        [".mf-blur-word", ".mf-blur-paragraph-word"],
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

      // 2. Imágenes: la grande primero, la pequeña justo después.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".mf-imagenes",
          start: "top 80%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        ".mf-img-1",
        { autoAlpha: 0, y: 80 },
        { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out" },
      ).fromTo(
        ".mf-img-2",
        { autoAlpha: 0, y: 80 },
        { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out" },
        "-=0.75",
      );

      // next/image carga después del montaje y desplaza el layout.
      const handleLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", handleLoad);
      if (document.readyState === "complete") ScrollTrigger.refresh();

      return () => window.removeEventListener("load", handleLoad);
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="w-full bg-[#EFF8FD] py-[48px] md:py-[32px] lg:py-[48px]">
      <div className="mx-auto max-w-[1220px] px-4 md:px-8">
        {/* TÍTULO */}
        <h2 className="mb-[28px] max-w-[820px] text-[28px] leading-[34px] md:mb-[36px] md:text-[38px] md:leading-[44px] lg:text-[48px] lg:leading-[56px]">
          {["Nos", "incomoda"].map((word, i) => (
            <span
              key={`mf-t-${i}`}
              className="mf-blur-word invisible inline-block"
            >
              {word}&nbsp;
            </span>
          ))}
          <span className="mf-blur-word invisible inline-block font-accent italic font-light">
            el
          </span>{" "}
          <span className="mf-blur-word invisible inline-block font-accent italic font-light">
            promedio
          </span>
        </h2>

        {/* PÁRRAFOS EN DOS COLUMNAS */}
        <div className="grid grid-cols-1 gap-[20px] text-left text-[14px] leading-[20px] text-[#525866] md:grid-cols-2 md:text-[16px]">
          <p className="flex flex-wrap content-start gap-x-[4px] bg-transparent">
            <AnimatedWords
              segments={COLUMNA_IZQUIERDA}
              wordClass="mf-blur-paragraph-word"
              keyPrefix="mf-ci"
            />
          </p>

          <p className="flex flex-wrap content-start gap-x-[4px] bg-transparent">
            <AnimatedWords
              segments={COLUMNA_DERECHA}
              wordClass="mf-blur-paragraph-word"
              keyPrefix="mf-cd"
            />
          </p>
        </div>

        {/* IMÁGENES */}
        <div className="mf-imagenes mt-[40px] grid grid-cols-1 gap-[20px] lg:grid-cols-12">
          <div className="mf-img-1 invisible relative h-[280px] w-full overflow-hidden rounded-[16px] md:h-[420px] lg:col-span-7">
            <Image
              src="/about/nosotros-1.webp"
              alt="Dos diseñadores revisando una paleta de color frente a la pantalla"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>

          <div className="mf-img-2 invisible relative h-[280px] w-full overflow-hidden rounded-[16px] md:h-[420px] lg:col-span-5">
            <Image
              src="/about/nosotros-2.webp"
              alt="Manos escribiendo en un teclado junto a una laptop"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
