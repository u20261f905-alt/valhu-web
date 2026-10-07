'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * Banner/Hero de la página interna "Diseño y Desarrollo Web".
 * Misma técnica de animación (blur palabra por palabra + esfera con scale/alpha)
 * que app/components/Hero.tsx, para mantener consistencia entre Home e internas.
 */
export default function WebDesignBanner() {
  const containerRef = useRef<HTMLElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        '.wd-anim-pretitle',
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        0
      )
        .fromTo(
          ['.wd-blur-word', '.wd-blur-paragraph-word'],
          { autoAlpha: 0, filter: 'blur(10px)', y: 10 },
          {
            autoAlpha: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.4,
            stagger: 0.015,
            ease: 'power2.out',
          },
          0.15
        )
        .fromTo(
          '.wd-anim-btn',
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0, duration: 1.8, ease: 'expo.out' },
          0.6
        )
        .fromTo(
          sphereRef.current,
          { autoAlpha: 0, scale: 1.2 },
          { autoAlpha: 1, scale: 1, duration: 1.6, ease: 'power3.out' },
          0
        )
        // Flotación infinita, igual que la esfera del Home (Hero.tsx):
        // arranca justo cuando termina de encogerse (a los 1.6s).
        .add(() => {
          gsap.to(sphereRef.current, {
            y: -18,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
    },
    { scope: containerRef }
  );

  const paragraph =
    'Creamos páginas web profesionales en Lima con diseño a medida, carga rápida y enfocada en experiencia de usuario. Solicita tu cotización gratis.';

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="w-full bg-[#EFF8FD]"
    >
      <div className="max-w-[1220px] mx-auto px-4 md:px-8 pt-[24px] pb-0 md:pt-[40px] md:pb-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[20px] md:gap-[24px] lg:gap-[40px] items-center border-b border-[#E1E7EC] pb-[24px] md:pb-[40px]">

          {/* COLUMNA IZQUIERDA */}
          <div className="md:col-span-7 flex flex-col items-start">

            {/* DISEÑO Y DESARROLLO WEB */}
            <div className="mb-3">
              <span className="wd-anim-pretitle invisible text-[14px]/[18px] md:text-[16px]/[22px] uppercase underline decoration-[1px] decoration-[#969EB3] [text-underline-offset:2px] text-[#969EB3] font-normal inline-block">
                DISEÑO Y DESARROLLO WEB
              </span>
            </div>

            {/* Título */}
            <h1 className="mb-[16px] md:mb-[20px] !text-[36px] !leading-[40px] md:!text-[52px] md:!leading-[58px] lg:!text-[64px] lg:!leading-[72px]">
              <span className="wd-blur-word invisible inline-block">Comienza</span>{' '}
              <span className="wd-blur-word invisible inline-block">hoy</span>{' '}
              <span className="wd-blur-word invisible inline-block">con</span>{' '}
              <span className="wd-blur-word invisible inline-block">una</span>{' '}
              <span className="wd-blur-word invisible inline-block font-accent italic font-light">
                web
              </span>{' '}
              <span className="wd-blur-word invisible inline-block font-accent italic font-light">
                extraordinaria
              </span>
            </h1>

            {/* Párrafo */}
            <p className="text-[14px] md:text-[16px] text-[#485157] mb-[24px] md:mb-6 flex flex-wrap content-start gap-x-[6px] max-w-[600px]">
              {paragraph.split(' ').map((word, index) => (
                <span
                  key={`wd-p-${index}`}
                  className="wd-blur-paragraph-word invisible inline-block"
                >
                  {word}
                </span>
              ))}
            </p>

            {/* Botones */}
            <div className="wd-anim-btn invisible flex flex-col sm:flex-row gap-[20px] w-full sm:w-auto">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-3 px-[20px] py-[16px] rounded-[8px] bg-[#141821] text-white text-[16px] font-semibold hover:bg-opacity-90 transition-colors"
              >
                Cotiza tu web
              </Link>

              {/* Baja a los proyectos de esta misma página: flecha recta
                  hacia abajo, que es literalmente lo que hace el botón. */}
              <Link
                href="#proyectos"
                className="inline-flex items-center justify-center gap-3 px-[20px] py-[16px] rounded-[8px] border border-[#D0D7DD] bg-[#EFF8FD] text-[16px] font-semibold text-[#141821] hover:bg-white transition-colors"
              >
                Ver proyectos
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="12" y1="6" x2="12" y2="18" />
                  <polyline points="6.8 12.8 12 18 17.2 12.8" />
                </svg>
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA: imagen decorativa */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div
              ref={sphereRef}
              className="relative w-full max-w-[440px] aspect-square invisible drop-shadow-[0_60px_60px_rgba(62,82,87,0.10)]"
            >
              {/*
                Imagen exportada de Figma (nodo 2152:17626), guardada en:
                public/services/diseno-desarrollo-web/skyblue-sphere.webp
              */}
              <Image
                src="/services/diseno-desarrollo-web/skyblue-sphere.webp"
                alt="Render decorativo - Diseño y Desarrollo Web"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
