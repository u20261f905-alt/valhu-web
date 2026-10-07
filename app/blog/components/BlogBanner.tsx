'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * Banner/Hero del listado del blog.
 * Misma técnica de animación (blur palabra por palabra + esfera con scale/alpha)
 * que app/components/Hero.tsx y las demás internas, para mantener consistencia.
 */
export default function BlogBanner() {
  const containerRef = useRef<HTMLElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        '.bl-anim-pretitle',
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        0
      )
        .fromTo(
          ['.bl-blur-word', '.bl-blur-paragraph-word'],
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
          '.bl-anim-btn',
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0, duration: 1.8, ease: 'expo.out' },
          0.6
        )
        .fromTo(
          sphereRef.current,
          { autoAlpha: 0, scale: 1.04 },
          { autoAlpha: 1, scale: 1, duration: 1.4, ease: 'power3.out' },
          0
        );
    },
    { scope: containerRef }
  );

  const paragraph =
    'Lo que aprendemos construyendo webs, campañas y marcas para empresas en Perú y la región. Criterio aplicable, sin humo.';

  return (
    <section ref={containerRef} className="w-full bg-[#EFF8FD]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-8 pt-[24px] pb-0 md:pt-[40px] md:pb-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[20px] md:gap-[24px] lg:gap-[40px] items-center border-b border-[#E1E7EC] pb-[24px] md:pb-[40px]">

          {/* COLUMNA IZQUIERDA */}
          <div className="md:col-span-6 flex flex-col items-start">

            {/* Pretitle */}
            <div className="mb-3">
              <span className="bl-anim-pretitle invisible text-[14px]/[18px] md:text-[16px]/[22px] uppercase underline decoration-[1px] decoration-[#969EB3] [text-underline-offset:2px] text-[#969EB3] font-normal inline-block">
                BLOG
              </span>
            </div>

            {/* Título */}
            <h1 className="mb-[16px] md:mb-[20px] !text-[36px] !leading-[40px] md:!text-[52px] md:!leading-[58px] lg:!text-[64px] lg:!leading-[72px]">
              <span className="bl-blur-word invisible inline-block">Notas</span>{' '}
              <span className="bl-blur-word invisible inline-block">sobre</span>{' '}
              <span className="bl-blur-word invisible inline-block">diseño,</span>{' '}
              <span className="bl-blur-word invisible inline-block">tecnología</span>{' '}
              <span className="bl-blur-word invisible inline-block">y</span>{' '}
              <span className="bl-blur-word invisible inline-block font-accent italic font-light">
                crecimiento
              </span>{' '}
              <span className="bl-blur-word invisible inline-block font-accent italic font-light">
                digital
              </span>
            </h1>

            {/* Párrafo */}
            <p className="text-[14px] md:text-[16px] text-[#485157] mb-[24px] md:mb-6 flex flex-wrap content-start gap-x-[6px] max-w-[600px]">
              {paragraph.split(' ').map((word, index) => (
                <span
                  key={`bl-p-${index}`}
                  className="bl-blur-paragraph-word invisible inline-block"
                >
                  {word}
                </span>
              ))}
            </p>

            {/* Botones */}
            <div className="bl-anim-btn invisible flex flex-col sm:flex-row gap-[20px] w-full sm:w-auto">
              {/* Baja al listado de notas de esta misma página: flecha recta
                  hacia abajo, que es literalmente lo que hace el botón. */}
              <Link
                href="#ultimas-publicaciones"
                className="inline-flex items-center justify-center gap-3 px-[20px] py-[16px] rounded-[8px] bg-[#141821] text-white text-[16px] font-semibold hover:bg-opacity-90 transition-colors"
              >
                Últimas publicaciones
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

              <Link
                href="/servicios"
                className="inline-flex items-center justify-center gap-3 px-[20px] py-[16px] rounded-[8px] border border-[#D0D7DD] bg-[#EFF8FD] text-[16px] font-semibold text-[#141821] hover:bg-white transition-colors"
              >
                Ver servicios
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.05317 5.80864L16.6169 14.568L16.7007 7.14383L17.6984 7.09145L17.5946 16.2833L8.40276 16.1794L8.47766 15.1832L15.9018 15.267L7.33812 6.50772L8.05317 5.80864Z" fill="currentColor" />
                </svg>
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA: foto horizontal de portada del blog */}
          <div className="md:col-span-6">
            <div
              ref={sphereRef}
              className="invisible relative aspect-[16/10] w-full overflow-hidden rounded-[16px] bg-[#E1EDF4] lg:aspect-auto lg:h-[380px]"
            >
              <Image
                src="/blog/blog-portada.webp"
                alt="Equipo de Valhu Group trabajando en proyectos digitales"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
