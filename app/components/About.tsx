'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------------
   Los párrafos llevan <strong> intercalados, así que se definen como
   segmentos (texto + si va en negrita). Cada segmento se trocea en
   palabras para poder animarlas una por una sin perder el formato.
--------------------------------------------------------------- */
type Segment = { text: string; bold?: boolean };

const INTRO: Segment[] = [
  { text: 'En' },
  { text: 'Valhu Group', bold: true },
  { text: ', no solo construimos productos digitales; construimos ecosistemas de innovación diseñados para escalar. Somos un' },
  { text: 'grupo de agencias estratégicas', bold: true },
  { text: 'unidas por una visión clara:' },
  { text: 'cerrar la brecha entre la ambición de negocio y la ejecución tecnológica.', bold: true },
];

const BOTTOM_LEFT: Segment[] = [
  { text: 'Somos el puente entre la' },
  { text: 'innovación creativa', bold: true },
  { text: 'y el' },
  { text: 'éxito comercial', bold: true },
  { text: '. Al integrar el diseño con estrategias tecnológicas de alto impacto,' },
];

const BOTTOM_RIGHT: Segment[] = [
  { text: 'permitimos que las empresas se enfoquen en su crecimiento mientras nosotros gestionamos la complejidad de su' },
  { text: 'presencia digital.', bold: true },
];

/* Convierte los segmentos en <span> por palabra, aplicando la clase
   de animación que corresponda al bloque. */
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

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // 1. TÍTULO + PÁRRAFO INTRODUCTORIO
      // Mismo blur palabra por palabra que en Services.
      gsap.fromTo(
        ['.about-blur-word', '.about-blur-paragraph-word'],
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

      // 2. IMÁGENES → PÁRRAFOS INFERIORES → BOTÓN
      // Todo encadenado en un timeline para garantizar el orden:
      // primero sube la imagen derecha, luego la izquierda, enseguida
      // los párrafos de dos columnas y al final el botón.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.about-bottom',
          start: 'top 70%',
          once: true,
          invalidateOnRefresh: true,
        },
      });

      tl
        // Imagen DERECHA primero
        .fromTo(
          '.about-img-right',
          { autoAlpha: 0, y: 80 },
          { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power3.out' }
        )
        // Imagen IZQUIERDA después
        .fromTo(
          '.about-img-left',
          { autoAlpha: 0, y: 80 },
          { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power3.out' },
          '-=0.75'
        )
        // Párrafos de dos columnas: mismo blur que el de arriba
        .fromTo(
          '.about-blur-bottom-word',
          { autoAlpha: 0, filter: 'blur(10px)', y: 10 },
          {
            autoAlpha: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.4,
            stagger: 0.015,
            ease: 'power2.out',
          },
          '-=0.5'
        )
        // Botón: misma animación que el botón del Hero
        .fromTo(
          '.about-btn',
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0, duration: 1.8, ease: 'expo.out' },
          '-=0.3'
        );

      // next/image carga después del montaje y desplaza el layout,
      // así que recalculamos los puntos de disparo.
      const handleLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', handleLoad);
      if (document.readyState === 'complete') ScrollTrigger.refresh();

      return () => window.removeEventListener('load', handleLoad);
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="nosotros"
      className="w-full py-[80px] bg-[#EFF8FD]"
    >
      <div className="max-w-[1220px] mx-auto px-4 md:px-8">

        {/* BLOQUE SUPERIOR: Título y Texto introductorio alineado abajo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] items-end mb-[24px]">
          {/* Título */}
          <h2 className="text-[36px] md:text-[48px] leading-[44px] md:leading-[56px] font-medium text-[#141821] flex flex-wrap gap-x-[10px]">
            {['El', 'motor', 'de', 'tu'].map((word, i) => (
              <span key={`t-${i}`} className="about-blur-word invisible inline-block">
                {word}
              </span>
            ))}
            <span className="hidden md:block basis-full h-0" />
            {['transformación', 'digital'].map((word, i) => (
              <span
                key={`ta-${i}`}
                className="about-blur-word invisible inline-block font-accent italic font-light"
              >
                {word}
              </span>
            ))}
          </h2>

          {/* Texto introductorio: 14px en mobile, 16px desde md */}
          <p className="text-left text-[14px] md:text-[16px] leading-[20px] text-[#525866] flex flex-wrap gap-x-[4px]">
            <AnimatedWords
              segments={INTRO}
              wordClass="about-blur-paragraph-word"
              keyPrefix="intro"
            />
          </p>
        </div>

        {/* BLOQUE INFERIOR: Fotos y Contenido */}
        <div className="about-bottom grid grid-cols-1 lg:grid-cols-2 gap-[20px] items-stretch">

          {/* Foto izquierda (img-about-1.webp con bordes de 16px) */}
          <div className="about-img-left invisible relative w-full h-[380px] lg:h-[480px] rounded-[16px] overflow-hidden">
            <Image
              src="/about/img-about-1.webp"
              alt="Equipo de Valhu Group"
              fill
              className="object-cover rounded-[16px]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col gap-[20px]">
            {/* Foto derecha (img-about-2.webp con bordes de 16px) */}
            <div className="about-img-right invisible relative w-full h-[220px] md:h-[260px] rounded-[16px] overflow-hidden">
              <Image
                src="/about/img-about-2.webp"
                alt="Diseño digital"
                fill
                className="object-cover rounded-[16px]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Texto en dos columnas + Botón del Hero */}
            <div className="flex flex-col gap-[20px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] text-left text-[14px] md:text-[16px] leading-[20px] text-[#525866]">
                <p className="flex flex-wrap gap-x-[4px]">
                  <AnimatedWords
                    segments={BOTTOM_LEFT}
                    wordClass="about-blur-bottom-word"
                    keyPrefix="bl"
                  />
                </p>
                <p className="flex flex-wrap gap-x-[4px]">
                  <AnimatedWords
                    segments={BOTTOM_RIGHT}
                    wordClass="about-blur-bottom-word"
                    keyPrefix="br"
                  />
                </p>
              </div>

              {/* Botón con estilo exacto del Hero */}
              <div className="about-btn invisible">
                <Link
                  href="#"
                  className="inline-flex items-center gap-3 px-[20px] py-[16px] rounded-[8px] border border-[#D0D5DD] bg-[#EFF8FD] text-[#141821] text-[16px] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141821] transition-colors"
                >
                  Más sobre Valhu Group
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.05317 5.80864L16.6169 14.568L16.7007 7.14383L17.6984 7.09145L17.5946 16.2833L8.40276 16.1794L8.47766 15.1832L15.9018 15.267L7.33812 6.50772L8.05317 5.80864Z" fill="#141821"/>
                  </svg>
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
