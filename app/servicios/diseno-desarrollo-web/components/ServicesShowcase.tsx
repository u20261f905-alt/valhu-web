'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  tag: string;
  image: string;
  alt: string;
  href: string;
}

const PROJECTS: Project[] = [
  {
    tag: 'Portal inmobiliario',
    image: '/services/diseno-desarrollo-web/portal-inmobiliario.webp',
    alt: 'Proyecto: portal inmobiliario',
    href: 'https://yobusco.pe',
  },
  {
    tag: 'Ecommerce',
    image: '/services/diseno-desarrollo-web/ecommerce-macbook.webp',
    alt: 'Proyecto: ecommerce',
    href: 'https://indie.uy',
  },
  {
    tag: 'Ecommerce',
    image: '/services/diseno-desarrollo-web/group-pinta-colors.webp',
    alt: 'Proyecto: Pinta Colors',
    href: 'https://pintacolors.pe',
  },
  {
    tag: 'B2B',
    image: '/services/diseno-desarrollo-web/fitness-extreme.webp',
    alt: 'Proyecto: Fitness Extreme',
    href: 'https://fitnessextremeperu.com',
  },
];

function ArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="-scale-y-100" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.05317 5.80864L16.6169 14.568L16.7007 7.14383L17.6984 7.09145L17.5946 16.2833L8.40276 16.1794L8.47766 15.1832L15.9018 15.267L7.33812 6.50772L8.05317 5.80864Z" fill="currentColor" />
    </svg>
  );
}

export default function ServicesShowcase() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.wd-services-blur-word',
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

      gsap.utils.toArray<HTMLElement>('.wd-project-card').forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 60 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            delay: i * 0.15,
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
      id="proyectos"
      className="w-full py-[48px] md:py-[48px] lg:py-[80px] bg-[#EFF8FD]"
    >
      <div className="max-w-[1220px] mx-auto px-4 md:px-8">
        <h2 className="mb-[40px] flex flex-wrap content-start gap-x-[10px] text-[28px] leading-[34px] text-[#141821] md:mb-[56px] md:text-[38px] md:leading-[44px] lg:text-[48px] lg:leading-[56px]">
          {['Nuestros', 'Servicios'].map((word, i) => (
            <span key={`wd-svc-${i}`} className="wd-services-blur-word invisible inline-block">
              {word}
            </span>
          ))}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
          {PROJECTS.map((project) => (
            <div
              key={project.image}
              className="wd-project-card invisible bg-white rounded-[16px] overflow-hidden flex flex-col"
            >
              <div className="relative w-full aspect-[600/380] bg-[#E1EDF4]">
                {/*
                  TODO: reemplazar por la imagen final exportada de Figma
                  (mockup "${project.tag}"), guardada en la ruta de arriba.
                */}
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="flex items-center justify-between gap-4 p-[24px]">
                <div>
                  <h3 className="text-[20px] leading-[24px] font-normal text-[#141821]">
                    Diseño y Desarrollo <span className="font-accent italic font-light">Web</span>
                  </h3>
                  <span className="inline-block mt-2 px-[12px] py-[6px] rounded-[8px] bg-[#F1F3F5] text-[13px] text-[#4D687B]">
                    {project.tag}
                  </span>
                </div>

                <Link
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 px-[16px] py-[14px] rounded-[8px] border border-[#D0D7DD] text-[14px] font-semibold text-[#141821] hover:bg-[#F1F3F5] transition-colors"
                >
                  Ver proyecto
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
