'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface UseCase {
  title: string;
  description: string;
  href: string;
}

/**
 * NOTA: la 3ra tarjeta ("Meta ads para empresas de servicios") tenía en Figma
 * la descripción de "Diseño y Desarrollo Web" pegada por error (copy-paste).
 * Se corrigió aquí con una descripción propia para Meta Ads. Revisar con el
 * cliente si el copy final debe ser otro.
 */
const USE_CASES: UseCase[] = [
  {
    title: 'Meta ads para ecommerce',
    description: 'Escala las ventas de tu ecommerce en 30 días.',
    href: '#',
  },
  {
    title: 'Meta ads para B2B',
    description: 'Mejora el performance de tus Meta Ads para B2B.',
    href: '#',
  },
  {
    title: 'Meta ads para empresas de servicios',
    description: 'Genera leads calificados y agenda más citas con campañas de conversión hechas a la medida de tu negocio.',
    href: '#',
  },
];

function ArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.05317 5.80864L16.6169 14.568L16.7007 7.14383L17.6984 7.09145L17.5946 16.2833L8.40276 16.1794L8.47766 15.1832L15.9018 15.267L7.33812 6.50772L8.05317 5.80864Z" fill="currentColor" />
    </svg>
  );
}

export default function UseCases() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.ma-usecase-card').forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    },
    { scope: containerRef }
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
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 px-[16px] py-[16px] rounded-[12px] border border-[#98B3CB] text-[16px] font-semibold text-[#141821] hover:bg-[#F1F3F5] transition-colors"
              >
                Ver proyectos
                <ArrowIcon />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
