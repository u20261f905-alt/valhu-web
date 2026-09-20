'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Bento/marquee de portafolio ("SLIDER" en Figma, nodo 2152:17628).
 *
 * NOTA DE IMPLEMENTACIÓN: en Figma cada tarjeta es una composición con
 * decenas de capas anidadas (mockups de celular dentro de mockups, texto de
 * apps de terceros, etc.) — no es contenido editable de Valhu, son collages
 * de imágenes de proyectos reales ya "aplanados" visualmente. Reproducir esa
 * jerarquía capa por capa no aporta nada (no hay texto real que animar ahí
 * dentro) así que cada tarjeta se exporta como una sola imagen compuesta,
 * igual a lo que se ve en el diseño.
 *
 * Carrusel infinito: la pista duplica el set de tarjetas una vez y se anima
 * con xPercent de -50% a 0%, en loop lineal — como las imágenes están
 * duplicadas exactamente, el salto de vuelta a -50% es visualmente idéntico
 * al frame anterior, así que no se nota el "corte". Se mueve hacia la
 * derecha (xPercent aumenta) a velocidad lenta/media.
 */
const TILES = [
  { id: 'bento-1', image: '/services/diseno-desarrollo-web/bento-1.webp', alt: 'Portafolio: app deportiva' },
  { id: 'bento-2', image: '/services/diseno-desarrollo-web/bento-2.webp', alt: 'Portafolio: portal inmobiliario' },
  { id: 'bento-3', image: '/services/diseno-desarrollo-web/bento-3.webp', alt: 'Portafolio: apps varias' },
  { id: 'bento-4', image: '/services/diseno-desarrollo-web/bento-4.webp', alt: 'Portafolio: tarjeta de fidelización' },
];

export default function PortfolioSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Entrada: aparece al hacer scroll, una sola vez.
      gsap.fromTo(
        trackRef.current,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Loop infinito hacia la derecha, velocidad lenta/media, sin pausas.
      gsap.fromTo(
        trackRef.current,
        { xPercent: -50 },
        { xPercent: 0, duration: 32, ease: 'none', repeat: -1 }
      );
    },
    { scope: sectionRef }
  );

  // Duplicamos el set una vez para el loop infinito (ver nota arriba).
  const LOOP_TILES = [...TILES, ...TILES];

  return (
    <section ref={sectionRef} className="relative w-full pt-0 pb-[24px] md:pb-[40px] bg-[#EFF8FD] overflow-hidden">
      {/* Degradados en los bordes con el color del fondo, para que el carrusel "desaparezca" a los lados */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[60px] md:w-[160px] z-10 bg-gradient-to-r from-[#EFF8FD] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[60px] md:w-[160px] z-10 bg-gradient-to-l from-[#EFF8FD] to-transparent" />

      <div
        ref={trackRef}
        className="flex items-center gap-[20px] w-max"
      >
        {LOOP_TILES.map((tile, i) => (
          <div
            key={`${tile.id}-${i}`}
            className="relative shrink-0 w-[548px] h-[344px] rounded-[12px] overflow-hidden"
          >
            <Image
              src={tile.image}
              alt={tile.alt}
              fill
              className="object-cover"
              sizes="548px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
