'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import AnimatedRichText from './AnimatedRichText';
import { ABOUT_POR_DEFECTO, type AboutContent, laImagen, type Imagenes } from '@/lib/home-defaults';

gsap.registerPlugin(ScrollTrigger);

export default function About({
  content = ABOUT_POR_DEFECTO,
  imagenes,
}: {
  content?: AboutContent;
  imagenes?: Imagenes;
}) {
  const img = {
    uno: laImagen(imagenes?.nosotrosUno, '/about/img-about-1.webp', 'Equipo de Valhu Group'),
    dos: laImagen(imagenes?.nosotrosDos, '/about/img-about-2.webp', 'Diseño digital'),
  };

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
    { scope: containerRef, dependencies: [content] }
  );

  return (
    <section
      ref={containerRef}
      id="nosotros"
      className="w-full pt-[40px] md:pt-[48px] lg:pt-[64px] pb-0 bg-[#EFF8FD]"
    >
      <div className="max-w-[1220px] mx-auto px-4 md:px-8">

        {/* BLOQUE SUPERIOR: Título y Texto introductorio alineado abajo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] items-end mb-[24px]">
          {/* Título */}
          <h2 className="text-[36px] md:text-[38px] md:leading-[44px] leading-[44px] lg:text-[48px] lg:leading-[56px] font-medium text-[#141821] flex flex-wrap content-start gap-x-[10px]">
            <AnimatedRichText
              texto={content.title}
              claseAnimacion="about-blur-word"
              prefijo="about-t"
              quiebreAntesDelAcento
            />
          </h2>

          {/* Texto introductorio: 14px en mobile, 16px desde md */}
          <p className="text-left text-[14px] md:text-[16px] leading-[20px] text-[#525866] flex flex-wrap content-start gap-x-[4px]">
            <AnimatedRichText
              texto={content.intro}
              claseAnimacion="about-blur-paragraph-word"
              prefijo="about-intro"
            />
          </p>
        </div>

        {/* BLOQUE INFERIOR: Fotos y Contenido */}
        <div className="about-bottom grid grid-cols-1 lg:grid-cols-2 gap-[20px] items-stretch">

          {/* Foto izquierda (img-about-1.webp con bordes de 16px) */}
          <div className="about-img-left invisible relative w-full h-[380px] lg:h-[480px] rounded-[16px] overflow-hidden">
            <Image
              src={img.uno.src}
              alt={img.uno.alt}
              fill
              className="object-cover rounded-[16px]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col gap-[20px]">
            {/* Foto derecha (img-about-2.webp con bordes de 16px) */}
            <div className="about-img-right invisible relative hidden lg:block w-full h-[220px] md:h-[260px] rounded-[16px] overflow-hidden">
              <Image
                src={img.dos.src}
                alt={img.dos.alt}
                fill
                className="object-cover rounded-[16px]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Texto en dos columnas + Botón del Hero */}
            <div className="flex flex-col gap-[20px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] text-left text-[14px] md:text-[16px] leading-[20px] text-[#525866]">
                <p className="flex flex-wrap content-start gap-x-[4px]">
                  <AnimatedRichText
                    texto={content.bottomLeft}
                    claseAnimacion="about-blur-bottom-word"
                    prefijo="about-bl"
                  />
                </p>
                <p className="flex flex-wrap content-start gap-x-[4px]">
                  <AnimatedRichText
                    texto={content.bottomRight}
                    claseAnimacion="about-blur-bottom-word"
                    prefijo="about-br"
                  />
                </p>
              </div>

              {/* Botón con estilo exacto del Hero */}
              <div className="about-btn invisible">
                <Link
                  href={content.buttonHref}
                  className="inline-flex items-center gap-3 px-[20px] py-[16px] rounded-[8px] border border-[#D0D5DD] bg-[#EFF8FD] text-[#141821] text-[16px] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141821] transition-colors"
                >
                  {content.buttonText}
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
