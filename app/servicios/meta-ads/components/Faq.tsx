'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface FaqItemData {
  question: string;
  answer: string;
}

/**
 * FAQ específico de la página "Meta Ads".
 *
 * NOTA: en el Figma original, las respuestas de este bloque estaban copiadas
 * del FAQ del Home y no correspondían a las preguntas (además había una
 * pregunta duplicada y la marca aparecía como "Marketeros Agencia" en vez de
 * "Valhu"). Las respuestas de abajo fueron redactadas para responder
 * correctamente a cada pregunta — revisar con el cliente antes de publicar.
 */
const faqData: FaqItemData[] = [
  {
    question: '¿Qué es Meta Ads y cómo puede ayudar a mi empresa a conseguir clientes?',
    answer:
      'Meta Ads es la plataforma publicitaria de Facebook e Instagram que te permite mostrar tus productos o servicios a la audiencia exacta que buscas, segmentada por intereses, comportamiento y ubicación. Bien gestionada, genera clientes potenciales y ventas de forma constante y medible.',
  },
  {
    question: '¿Cuánto cuesta invertir en Meta Ads y cuál es el presupuesto mínimo?',
    answer:
      'El presupuesto es flexible y se adapta a tus objetivos: puedes empezar con montos bajos para validar tu oferta e ir escalando la inversión conforme las campañas muestran resultados. En la primera reunión analizamos tu caso y te recomendamos el presupuesto ideal para alcanzar tus metas.',
  },
  {
    question: '¿Cuánto tiempo tarda en ver resultados una campaña de Meta Ads?',
    answer:
      'Los primeros datos y aprendizajes suelen verse desde la primera o segunda semana, mientras el algoritmo optimiza la entrega. Los resultados más sólidos en ventas o leads normalmente se consolidan entre la semana 4 y 6, con optimización continua durante todo el proceso.',
  },
  {
    question: '¿Qué tipo de empresas se benefician más de Meta Ads?',
    answer:
      'Funciona muy bien para ecommerce, negocios B2B y empresas de servicios que buscan generar leads o ventas directas. Adaptamos la estrategia y el tipo de campaña (conversión, mensajes, tráfico) según el modelo de negocio y el objetivo de cada cliente.',
  },
  {
    question: '¿Cómo mide Valhu los resultados de Meta Ads?',
    answer:
      'Nuestra gestión se basa en datos. Utilizamos analítica avanzada para monitorear cada campaña con el objetivo principal de maximizar tu retorno de inversión (ROI) y aumentar la captación de clientes de manera eficiente.',
  },
];

// Subcomponente para manejar la animación de GSAP por cada ítem individual
function FaqItem({
  item,
  isOpen,
  onClick,
}: {
  item: FaqItemData;
  isOpen: boolean;
  onClick: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      gsap.to(contentRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.inOut',
      });
    }
  }, [isOpen]);

  return (
    <div className="faq-item bg-transparent overflow-hidden">
      <button
        onClick={onClick}
        className="w-full p-[24px] flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none bg-transparent"
      >
        <span className="text-[18px] font-semibold leading-[22px] text-[#141821]">
          {item.question}
        </span>

        <div
          className={`shrink-0 w-[24px] h-[24px] flex items-center justify-center text-[#141821] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
        </div>
      </button>

      <div ref={contentRef} className="h-0 opacity-0 overflow-hidden">
        <div className="px-[24px] pb-[24px] bg-transparent">
          <p className="text-[14px] md:text-[16px] font-normal leading-[20px] text-[#485157]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.ma-faq-blur-word',
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
        '.ma-faq-btn',
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>('.faq-item').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0.15, filter: 'blur(8px)', y: 24 },
          {
            autoAlpha: 1,
            filter: 'blur(0px)',
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              end: 'top 60%',
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="faq" className="w-full pt-0 pb-[48px] bg-[#EFF8FD]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[40px] items-start">

          <div className="lg:col-span-5 flex flex-col items-start">
            <h2 className="text-[36px] md:text-[48px] leading-[44px] md:leading-[56px] font-medium text-[#141821] flex flex-wrap gap-x-[10px]">
              <span className="ma-faq-blur-word invisible inline-block">¿Tienes</span>
              <span className="ma-faq-blur-word invisible inline-block font-accent italic font-light">
                preguntas?
              </span>
            </h2>

            <div className="ma-faq-btn invisible mt-[24px]">
              <Link
                href="#contacto"
                className="inline-flex items-center justify-between gap-3 px-[20px] py-[16px] rounded-[8px] border border-[#D0D5DD] bg-[#EFF8FD] text-[#141821] text-[16px] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141821] transition-colors"
              >
                Contáctanos
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-[24px]">
            {faqData.map((item, index) => (
              <FaqItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
