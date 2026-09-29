'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------------
   Mismo patrón que app/components/About.tsx: los párrafos llevan
   <strong> intercalados, así que se definen como segmentos (texto +
   si va en negrita) y se trocean en palabras para animarlas una por
   una sin perder el formato.
--------------------------------------------------------------- */
type Segment = { text: string; bold?: boolean };

// Texto introductorio: igual al del bloque "Nosotros" del Home (About.tsx),
// no es específico de un servicio.
const INTRO: Segment[] = [
  { text: 'En' },
  { text: 'Valhu Group', bold: true },
  { text: ', no solo construimos productos digitales; construimos ecosistemas de innovación diseñados para escalar. Somos un' },
  { text: 'grupo de agencias estratégicas', bold: true },
  { text: 'unidas por una visión clara:' },
  { text: 'cerrar la brecha entre la ambición de negocio y la ejecución tecnológica.', bold: true },
];

// Texto inferior: a diferencia del Home, aquí está enfocado en Meta Ads.
const BOTTOM_LEFT: Segment[] = [
  { text: 'Cada campaña parte de un' },
  { text: 'diagnóstico de tu negocio y tu audiencia.', bold: true },
  { text: 'Diseñamos anuncios pensados para' },
  { text: 'detener el scroll', bold: true },
  { text: 'y los probamos constantemente para encontrar el mensaje y el formato que mejor convierten.' },
];

const BOTTOM_RIGHT: Segment[] = [
  { text: 'Optimizamos el presupuesto día a día en base a' },
  { text: 'datos reales', bold: true },
  { text: ', para bajar tu costo por lead y aumentar tus' },
  { text: 'ventas mes a mes', bold: true },
  { text: ', con reportes claros de cada resultado.' },
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

function ArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.05317 5.80864L16.6169 14.568L16.7007 7.14383L17.6984 7.09145L17.5946 16.2833L8.40276 16.1794L8.47766 15.1832L15.9018 15.267L7.33812 6.50772L8.05317 5.80864Z" fill="currentColor" />
    </svg>
  );
}

export default function StrategySection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // 1. TÍTULOS + PÁRRAFOS DE ARRIBA (Estrategias... / El motor de tu...)
      gsap.fromTo(
        ['.ma-strategy-blur-word', '.ma-strategy-blur-paragraph-word'],
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

      // 2. IMÁGENES → PÁRRAFOS INFERIORES → BOTÓN, encadenados igual que en About.tsx
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.ma-strategy-bottom',
          start: 'top 70%',
          once: true,
          invalidateOnRefresh: true,
        },
      });

      tl
        .fromTo(
          '.ma-strategy-img-right',
          { autoAlpha: 0, y: 80 },
          { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power3.out' }
        )
        .fromTo(
          '.ma-strategy-img-left',
          { autoAlpha: 0, y: 80 },
          { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power3.out' },
          '-=0.75'
        )
        .fromTo(
          '.ma-strategy-blur-bottom-word',
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
        .fromTo(
          '.ma-strategy-btn',
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0, duration: 1.8, ease: 'expo.out' },
          '-=0.3'
        );

      const handleLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', handleLoad);
      if (document.readyState === 'complete') ScrollTrigger.refresh();

      return () => window.removeEventListener('load', handleLoad);
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="w-full pt-0 pb-[48px] md:pb-[80px] bg-[#EFF8FD]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-8">

        {/* TÍTULO PRINCIPAL DE LA SECCIÓN */}
        <div className="flex flex-col items-center gap-[24px] text-center mb-[48px] md:mb-[64px]">
          <h2 className="font-medium text-[#141821] max-w-[900px] flex flex-wrap justify-center gap-x-[10px]">
            {['Estrategias', 'para', 'Aumentar', 'Ventas', 'y', 'Maximizar', 'Conversiones', 'en', 'Meta', 'Ads'].map((word, i) => (
              <span key={`ma-strategy-${i}`} className="ma-strategy-blur-word invisible inline-block">
                {word}
              </span>
            ))}
          </h2>
          <p className="text-[14px] md:text-[16px] text-[#485157] max-w-[604px]">
            Una buena estrategia, una mejor segmentación y una constante optimización de tus anuncios conseguirás resultados en Meta Ads.
          </p>
        </div>

        {/* BLOQUE "EL MOTOR DE TU TRANSFORMACIÓN DIGITAL" — igual al de Nosotros (About.tsx) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] items-end mb-[24px]">
          <h2 className="text-[36px] md:text-[48px] leading-[44px] md:leading-[56px] font-medium text-[#141821] flex flex-wrap gap-x-[10px]">
            {['El', 'motor', 'de', 'tu'].map((word, i) => (
              <span key={`ma-t-${i}`} className="ma-strategy-blur-word invisible inline-block">
                {word}
              </span>
            ))}
            <span className="hidden md:block basis-full h-0" />
            {['transformación', 'digital'].map((word, i) => (
              <span
                key={`ma-ta-${i}`}
                className="ma-strategy-blur-word invisible inline-block font-accent italic font-light"
              >
                {word}
              </span>
            ))}
          </h2>

          <p className="text-left text-[14px] md:text-[16px] leading-[20px] text-[#525866] flex flex-wrap gap-x-[4px]">
            <AnimatedWords
              segments={INTRO}
              wordClass="ma-strategy-blur-paragraph-word"
              keyPrefix="ma-intro"
            />
          </p>
        </div>

        {/* BLOQUE INFERIOR: mismas fotos que Nosotros (About.tsx), texto propio de Meta Ads */}
        <div className="ma-strategy-bottom grid grid-cols-1 lg:grid-cols-2 gap-[20px] items-stretch">

          <div className="ma-strategy-img-left invisible relative w-full h-[380px] lg:h-[480px] rounded-[16px] overflow-hidden">
            <Image
              src="/about/img-about-1.webp"
              alt="Equipo de Valhu Group"
              fill
              className="object-cover rounded-[16px]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="flex flex-col gap-[20px]">
            <div className="ma-strategy-img-right invisible relative w-full h-[220px] md:h-[260px] rounded-[16px] overflow-hidden">
              <Image
                src="/about/img-about-2.webp"
                alt="Diseño digital"
                fill
                className="object-cover rounded-[16px]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col gap-[20px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] text-left text-[14px] md:text-[16px] leading-[20px] text-[#525866]">
                <p className="flex flex-wrap gap-x-[4px]">
                  <AnimatedWords
                    segments={BOTTOM_LEFT}
                    wordClass="ma-strategy-blur-bottom-word"
                    keyPrefix="ma-bl"
                  />
                </p>
                <p className="flex flex-wrap gap-x-[4px]">
                  <AnimatedWords
                    segments={BOTTOM_RIGHT}
                    wordClass="ma-strategy-blur-bottom-word"
                    keyPrefix="ma-br"
                  />
                </p>
              </div>

              <div className="ma-strategy-btn invisible">
                <Link
                  href="/nosotros"
                  className="inline-flex items-center gap-3 px-[20px] py-[16px] rounded-[8px] border border-[#D0D5DD] bg-[#EFF8FD] text-[#141821] text-[16px] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141821] transition-colors"
                >
                  Más sobre Valhu Group
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
