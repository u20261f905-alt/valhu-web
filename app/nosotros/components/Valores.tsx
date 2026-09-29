'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const VALORES = [
  {
    numero: '01',
    titulo: 'Estrategia antes que estética',
    texto:
      'Una web bonita que no vende es un gasto. Cada decisión de diseño responde primero a un objetivo de negocio y recién después a una preferencia visual.',
  },
  {
    numero: '02',
    titulo: 'Criterio técnico, no atajos',
    texto:
      'Construimos sobre bases que aguantan: velocidad, seguridad y capacidad de crecer. Lo que se entrega rápido y mal se termina pagando dos veces.',
  },
  {
    numero: '03',
    titulo: 'Medimos lo que importa',
    texto:
      'Definimos desde el inicio qué significa que el proyecto funcione y cómo se va a medir. Las decisiones se discuten con datos, no con opiniones.',
  },
  {
    numero: '04',
    titulo: 'Socios, no proveedores',
    texto:
      'Nos involucramos en el negocio, no solo en el entregable. Si algo no le conviene al cliente, lo decimos aunque signifique vender menos.',
  },
];

export default function Valores() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.vl-blur-word',
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

      gsap.fromTo(
        '.vl-card',
        { autoAlpha: 0, y: 70 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.vl-grid',
            start: 'top 85%',
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="w-full bg-[#EFF8FD] py-[48px]">
      <div className="mx-auto max-w-[1220px] px-4 md:px-8">

        <div className="mx-auto mb-[32px] max-w-[820px] text-center">
          <h2 className="text-[28px] leading-[34px] md:text-[48px] md:leading-[56px]">
            {['Cómo', 'pensamos', 'antes', 'de'].map((word, i) => (
              <span key={`vl-t-${i}`} className="vl-blur-word invisible inline-block">
                {word}&nbsp;
              </span>
            ))}
            <span className="vl-blur-word invisible inline-block font-accent italic font-light">
              construir
            </span>
          </h2>
        </div>

        <div className="vl-grid grid grid-cols-1 gap-[20px] md:grid-cols-2">
          {VALORES.map((valor) => (
            <article
              key={valor.numero}
              className="vl-card invisible rounded-[16px] border border-[#D0D5DD] bg-white/35 p-[28px] md:p-[36px]"
            >
              <p className="mb-[32px] bg-transparent font-accent text-[28px] leading-[32px] text-[#1B3F7D] md:mb-[40px]">
                {valor.numero}
              </p>

              <h3 className="mb-[12px] text-[18px] leading-[26px] md:text-[24px] md:leading-[32px]">
                {valor.titulo}
              </h3>

              <p className="bg-transparent text-[14px] leading-[22px] text-[#525866] md:text-[16px] md:leading-[24px]">
                {valor.texto}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
