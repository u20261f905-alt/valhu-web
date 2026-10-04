'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import AnimatedRichText from './AnimatedRichText';
import { HERO_POR_DEFECTO, type HeroContent, laImagen, type Ranura } from '@/lib/home-defaults';

export default function Hero({
  content = HERO_POR_DEFECTO,
  imagen,
}: {
  content?: HeroContent;
  imagen?: Ranura;
}) {
  const esfera = laImagen(imagen, '/hero-sphere.png', 'Valhu 3D Sphere');

  const containerRef = useRef<HTMLElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. VALHU GROUP (Inicia en el segundo 0)
    tl.fromTo('.anim-pretitle',
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      0
    )

    // 2. TÍTULO Y PÁRRAFO (Inicia en el segundo 0.15, justo después de que arranca VALHU GROUP)
    .fromTo(['.blur-word', '.blur-paragraph-word'],
      { autoAlpha: 0, filter: 'blur(10px)', y: 10 },
      { autoAlpha: 1, filter: 'blur(0px)', y: 0, duration: 0.4, stagger: 0.015, ease: 'power2.out' },
      0.15 // <-- Tiempo absoluto: arranca rápido, sin esperar a que termine nada
    )

    // 3. BOTÓN (Arranca en el segundo 0.6)
  .fromTo('.anim-btn',
    { autoAlpha: 0, y: 60 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1.8, // Reducido un poco para evitar el avance microscópico
      ease: 'expo.out',
        // <-- ESTA ES LA MAGIA: Activa la GPU para un movimiento sub-pixel perfecto
    },
    0.6
  )

    // 4. ESFERA: Aparece al mismo tiempo que todo (en el 0), de grande (1.2) a normal (1). ¡Sin blur!
    .fromTo(sphereRef.current,
      { autoAlpha: 0, scale: 1.2 },
      { autoAlpha: 1, scale: 1, duration: 1.6, ease: 'power3.out' },
      0 // <-- Empieza en el segundo 0
    )

    // 5. Flotación infinita (inicia en cuanto termina de encogerse la esfera)
    .add(() => {
      gsap.to(sphereRef.current, {
        y: -18,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }, { scope: containerRef, dependencies: [content] });

  return (
    <section ref={containerRef} className="w-full pt-[24px] pb-[24px] md:pt-[40px] md:pb-[40px]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-[40px] items-center">

        {/* COLUMNA IZQUIERDA */}
        <div className="lg:col-span-7 flex flex-col items-start">

          {/* VALHU GROUP: 14px/18px en mobile, 16px/22px desde md */}
          <div className="mb-3">
            <span className="anim-pretitle invisible text-[14px]/[18px] md:text-[16px]/[22px] tracking-normal uppercase underline decoration-[1px] decoration-[#969EB3] [text-underline-offset:2px] text-[#969EB3] font-normal inline-block">
              {content.pretitle}
            </span>
          </div>

          {/* Título H1: 36px/40px en mobile, 64px/72px desde md.
              Se fuerza con "!" porque globals.css define el tamaño de h1 en @layer base. */}
          <h1 className="mb-[16px] md:mb-[20px] !text-[36px] !leading-[40px] md:!text-[64px] md:!leading-[72px]">
            <AnimatedRichText
              texto={content.title}
              claseAnimacion="blur-word"
              prefijo="hero-t"
              separador="espacio"
              claseAcento="font-accent"
            />
          </h1>

          {/* Párrafo: 14px en mobile, 16px desde md */}
          <p className="text-[14px] md:text-[16px] text-[#525866] mb-[16px] md:mb-6 flex flex-wrap content-start gap-x-[6px]">
            <AnimatedRichText
              texto={content.paragraph}
              claseAnimacion="blur-paragraph-word"
              prefijo="hero-p"
            />
          </p>

          {/* Botón: en mobile texto 14px/18px y padding 12px en las 4 direcciones.
              Desde md vuelve al tamaño original (16px, padding 20px/16px). */}
          <div className="anim-btn invisible">
            <Link
              href={content.buttonHref}
              className="inline-flex items-center gap-3 px-[12px] py-[12px] md:px-[20px] md:py-[16px] rounded-[8px] border border-[#D0D5DD] bg-[#EFF8FD] text-[14px]/[18px] md:text-[16px] text-[#141821] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141821] transition-colors"
            >
              {content.buttonText}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="-scale-y-100" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.05317 5.80864L16.6169 14.568L16.7007 7.14383L17.6984 7.09145L17.5946 16.2833L8.40276 16.1794L8.47766 15.1832L15.9018 15.267L7.33812 6.50772L8.05317 5.80864Z" fill="#141821"/>
              </svg>
            </Link>
          </div>

        </div>

        {/* COLUMNA DERECHA */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div
            ref={sphereRef}
            className="relative w-full max-w-[440px] aspect-square invisible"
          >
            <Image
              src={esfera.src}
              alt={esfera.alt}
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
