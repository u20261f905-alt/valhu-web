'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------------
   Los párrafos llevan <strong> intercalados, así que se definen como
   segmentos (texto + si va en negrita). Cada segmento se trocea en
   palabras para poder animarlas una por una sin perder el formato.
   Misma técnica que app/components/About.tsx.
--------------------------------------------------------------- */
type Segment = { text: string; bold?: boolean };

const COLUMNA_IZQUIERDA: Segment[] = [
  { text: 'Nacimos de una observación simple: la mayoría de empresas no tiene un problema de' },
  { text: 'ideas', bold: true },
  { text: ', tiene un problema de' },
  { text: 'ejecución', bold: true },
  { text: '. Saben hacia dónde quieren ir, pero entre esa ambición y el resultado hay una distancia llena de decisiones técnicas, creativas y de inversión que nadie quiere tomar a ciegas.' },
];

const COLUMNA_DERECHA: Segment[] = [
  { text: 'Valhu Group existe para cerrar esa distancia. Integramos' },
  { text: 'diseño, desarrollo y performance', bold: true },
  { text: 'bajo una misma estrategia, para que cada pieza empuje en la misma dirección en lugar de competir entre sí. No entregamos piezas sueltas: entregamos' },
  { text: 'un sistema que funciona', bold: true },
  { text: 'y que puede crecer contigo.' },
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
        segment.text.split(' ').map((word, wi) => (
          <span
            key={`${keyPrefix}-${si}-${wi}`}
            className={`${wordClass} invisible inline-block ${
              segment.bold ? 'text-[#141821] font-semibold' : ''
            }`}
          >
            {word}
          </span>
        ))
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
        ['.mf-blur-word', '.mf-blur-paragraph-word'],
        { autoAlpha: 0, filter: 'blur(10px)', y: 10 },
        {
          autoAlpha: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 0.4,
          stagger: 0.015,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      // 2. Imágenes: la grande primero, la pequeña justo después.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.mf-imagenes',
          start: 'top 80%',
          once: true,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        '.mf-img-1',
        { autoAlpha: 0, y: 80 },
        { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power3.out' }
      ).fromTo(
        '.mf-img-2',
        { autoAlpha: 0, y: 80 },
        { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power3.out' },
        '-=0.75'
      );

      // next/image carga después del montaje y desplaza el layout.
      const handleLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', handleLoad);
      if (document.readyState === 'complete') ScrollTrigger.refresh();

      return () => window.removeEventListener('load', handleLoad);
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="w-full bg-[#EFF8FD] py-[48px]">
      <div className="mx-auto max-w-[1220px] px-4 md:px-8">

        {/* TÍTULO */}
        <h2 className="mb-[24px] max-w-[820px] text-[28px] leading-[34px] md:text-[48px] md:leading-[56px]">
          {['No', 'somos', 'un', 'proveedor', 'más:', 'somos', 'el'].map((word, i) => (
            <span key={`mf-t-${i}`} className="mf-blur-word invisible inline-block">
              {word}&nbsp;
            </span>
          ))}
          <span className="mf-blur-word invisible inline-block font-accent italic font-light">
            equipo
          </span>{' '}
          <span className="mf-blur-word invisible inline-block font-accent italic font-light">
            que
          </span>{' '}
          <span className="mf-blur-word invisible inline-block font-accent italic font-light">
            ejecuta
          </span>
        </h2>

        {/* PÁRRAFOS EN DOS COLUMNAS */}
        <div className="grid grid-cols-1 gap-[20px] text-left text-[14px] leading-[22px] text-[#525866] md:grid-cols-2 md:text-[16px] md:leading-[24px]">
          <p className="flex flex-wrap gap-x-[4px] bg-transparent">
            <AnimatedWords
              segments={COLUMNA_IZQUIERDA}
              wordClass="mf-blur-paragraph-word"
              keyPrefix="mf-ci"
            />
          </p>

          <p className="flex flex-wrap gap-x-[4px] bg-transparent">
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
              src="/about/img-about-1.webp"
              alt="Equipo de Valhu Group trabajando"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>

          <div className="mf-img-2 invisible relative h-[280px] w-full overflow-hidden rounded-[16px] md:h-[420px] lg:col-span-5">
            <Image
              src="/about/img-about-2.webp"
              alt="Proceso de diseño digital en Valhu Group"
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
