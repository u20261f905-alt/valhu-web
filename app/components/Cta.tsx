'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { CTA_POR_DEFECTO } from '@/lib/home-defaults';

gsap.registerPlugin(ScrollTrigger);

interface CtaProps {
  titleLine1?: string;
  titleHighlighted?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function Cta({
  titleLine1 = CTA_POR_DEFECTO.titleLine1,
  titleHighlighted = CTA_POR_DEFECTO.titleHighlighted,
  description = CTA_POR_DEFECTO.description,
  buttonText = CTA_POR_DEFECTO.buttonText,
  buttonLink = CTA_POR_DEFECTO.buttonLink,
}: CtaProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Las esferas tenían -translate-x-1/2 / translate-x-1/2 y rotate en
      // Tailwind. GSAP escribe su propio transform, así que esos valores
      // se declaran aquí (xPercent / yPercent / rotation) para que no se
      // pierdan al animar la posición.
      gsap.set('.cta-sphere-left', { xPercent: -50, yPercent: -50, rotation: 45 });
      gsap.set('.cta-sphere-right', { xPercent: 50, yPercent: -50, rotation: 135 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
          invalidateOnRefresh: true,
        },
      });

      tl
        // ESFERA IZQUIERDA: entra desde la izquierda
        .fromTo(
          '.cta-sphere-left',
          { autoAlpha: 0, x: -180 },
          { autoAlpha: 1, x: 0, duration: 1.6, ease: 'power3.out' },
          0
        )
        // ESFERA DERECHA: entra desde la derecha, a la vez
        .fromTo(
          '.cta-sphere-right',
          { autoAlpha: 0, x: 180 },
          { autoAlpha: 1, x: 0, duration: 1.6, ease: 'power3.out' },
          0
        )
        // TÍTULO + PÁRRAFO: mismo blur palabra por palabra que en las
        // demás secciones.
        .fromTo(
          ['.cta-blur-word', '.cta-blur-paragraph-word'],
          { autoAlpha: 0, filter: 'blur(10px)', y: 10 },
          {
            autoAlpha: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.4,
            stagger: 0.015,
            ease: 'power2.out',
          },
          0.2
        )
        // BOTÓN: misma animación que el botón del Hero
        .fromTo(
          '.cta-btn',
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0, duration: 1.8, ease: 'expo.out' },
          0.6
        );

      const handleLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', handleLoad);
      if (document.readyState === 'complete') ScrollTrigger.refresh();

      return () => window.removeEventListener('load', handleLoad);
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="contacto" className="w-full bg-[#EFF8FD] pb-[48px]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-8">
        <div className="relative w-full h-[375px] bg-[#141821] rounded-[16px] overflow-hidden flex flex-col items-center justify-center text-center px-4">

          {/* Esfera Izquierda */}
          <div className="cta-sphere-left invisible pointer-events-none absolute left-0 top-1/2 w-[326px] h-[326px]">
            <Image
              src="/hero-sphere.png"
              alt="Esfera decorativa Valhu Group"
              fill
              className="object-contain"
            />
          </div>

          {/* Esfera Derecha */}
          <div className="cta-sphere-right invisible pointer-events-none absolute right-0 top-1/2 w-[326px] h-[326px]">
            <Image
              src="/hero-sphere.png"
              alt="Esfera decorativa Valhu Group"
              fill
              className="object-contain"
            />
          </div>

          {/* Contenido */}
          <div className="relative z-10 flex flex-col items-center gap-[24px]">
            <h2 className="bg-transparent text-white font-normal text-[32px] md:text-[48px] leading-[40px] md:leading-[56px] max-w-[700px] flex flex-wrap justify-center gap-x-[10px]">
              {titleLine1.split(' ').map((word, i) => (
                <span key={`ct-${i}`} className="cta-blur-word invisible inline-block">
                  {word}
                </span>
              ))}

              {/* Salto de línea en desktop: dentro de un flex, un <br> no
                  funciona, así que este span ocupa toda la fila. */}
              <span className="hidden md:block basis-full h-0" />

              {titleHighlighted.split(' ').map((word, i) => (
                <span
                  key={`cth-${i}`}
                  className="cta-blur-word invisible inline-block bg-transparent font-accent italic text-white"
                  style={{ fontWeight: 300 }}
                >
                  {word}
                </span>
              ))}
            </h2>

            <p className="bg-transparent text-[#D0D5DD] text-[14px] md:text-[16px] leading-[20px] max-w-[600px] font-normal flex flex-wrap justify-center gap-x-[4px]">
              {description.split(' ').map((word, i) => (
                <span
                  key={`cp-${i}`}
                  className="cta-blur-paragraph-word invisible inline-block"
                >
                  {word}
                </span>
              ))}
            </p>

            <div className="cta-btn invisible relative z-20">
              <Link
                href={buttonLink}
                className="mt-[8px] inline-flex items-center gap-3 px-[24px] py-[16px] rounded-[8px] border border-[#477087] bg-transparent text-white text-[16px] font-medium hover:bg-[#477087]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#477087] transition-colors"
              >
                {buttonText}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
