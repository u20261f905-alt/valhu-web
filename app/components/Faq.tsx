'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

interface FaqItemData {
  question: string;
  answer: string;
}

const faqData: FaqItemData[] = [
  {
    question: '¿Cuál es la diferencia entre Valhu Design y Valhu Media?',
    answer:
      'Valhu Design se enfoca en la estrategia, branding y la experiencia de usuario (UX/UI). Valhu Media se encarga de materializar esa estrategia mediante el desarrollo tecnológico y la ejecución de campañas de marketing para hacer crecer y generar ventas a tu negocio.',
  },
  {
    question: '¿Puedo contratar a ambas agencias para un mismo proyecto?',
    answer:
      '¡Totalmente! De hecho, es lo que recomendamos. Al integrar el diseño estratégico con la tecnología de alto impacto, aseguramos una transición fluida desde la conceptualización de tu producto hasta su escalabilidad comercial.',
  },
  {
    question: '¿Cómo miden el éxito de sus servicios de Performance Digital?',
    answer:
      'Nuestra gestión se basa en datos. Utilizamos analítica avanzada para monitorear cada campaña (Google Ads, Meta Ads) con el objetivo principal de maximizar tu retorno de inversión (ROI) y aumentar la captación de clientes de manera eficiente.',
  },
  {
    question: '¿Trabajan con startups desde cero?',
    answer:
      'Sí, tenemos experiencia ayudando a startups a definir su MVP (Producto Mínimo Viable), validar conceptos y construir su presencia digital desde la etapa inicial, asegurando que tengan bases sólidas para crecer.',
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
      // GSAP anima hacia su altura natural ('auto') con un efecto elástico suave
      gsap.to(contentRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      });
    } else {
      // GSAP colapsa a 0px de altura
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.inOut',
      });
    }
  }, [isOpen]);

  return (
    <div className="bg-transparent overflow-hidden">
      {/* Cabecera de la pregunta */}
      <button
        onClick={onClick}
        className="w-full p-[24px] flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none bg-transparent"
      >
        <span className="text-[18px] font-semibold leading-[22px] text-[#141821]">
          {item.question}
        </span>

        {/* Icono animado (+ / -) */}
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

      {/* Contenedor de la respuesta animado por GSAP */}
      <div ref={contentRef} className="h-0 opacity-0 overflow-hidden">
        <div className="px-[24px] pb-[24px] bg-transparent">
          <p className="text-[16px] font-normal leading-[20px] text-[#485157]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // El primero empieza abierto

  return (
    <section id="faq" className="w-full py-[48px] bg-[#EFF8FD]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[40px] items-start">
          
          {/* COLUMNA IZQUIERDA: Título + Botón */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <h2 className="text-[36px] md:text-[48px] leading-[44px] md:leading-[56px] font-medium text-[#141821]">
              ¿Tienes <span className="font-accent italic font-light">preguntas?</span>
            </h2>

            <div className="mt-[24px]">
              <Link
                href="#contacto"
                className="inline-flex items-center justify-between gap-3 px-[20px] py-[16px] rounded-[8px] border border-[#D0D5DD] bg-[#EFF8FD] text-[#141821] text-[16px] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141821] transition-colors"
              >
                Contáctanos
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA: Lista de preguntas (sin bordes) */}
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