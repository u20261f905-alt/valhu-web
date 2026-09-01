'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const sphereRef = useRef<HTMLDivElement>(null);

  // Animación de flotación suave (1.8s)
  useGSAP(() => {
    gsap.to(sphereRef.current, {
      y: -18,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: sphereRef });

  return (
    <section className="w-full pt-[40px] pb-[40px]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[40px] items-center">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="lg:col-span-7 flex flex-col items-start">
          
          {/* VALHU GROUP */}
          <div className="mb-3">
            <span className="text-[16px] leading-[22px] tracking-normal uppercase underline decoration-[1px] decoration-[#969EB3] [text-underline-offset:2px] text-[#969EB3] font-normal inline-block">
              VALHU GROUP
            </span>
          </div>

          {/* Título H1 */}
          <h1 className="mb-6">
            Sumérgete en nuestro mundo de <span className="font-accent">tecnología</span>, <span className="font-accent">marketing</span> e <span className="font-accent">innovación</span>.
          </h1>

          {/* Párrafo con mb-6 (24px) de separación hacia el botón */}
          <p className="text-[16px] text-[#525866] mb-6">
            Somos un grupo de agencias motivadas por la{' '}
            <strong className="font-semibold text-[#141821]">
              disrupción, creatividad y resultados.
            </strong>
          </p>

          <div>
            <Link
              href="#servicios"
              className="inline-flex items-center gap-3 px-[20px] py-[16px] rounded-[8px] border border-[#D0D5DD] bg-[#EFF8FD] text-[#141821] text-[16px] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141821] transition-colors"
            >
              Ver servicios
              {/* SVG a 24x24 px tal cual lo tienes en Figma */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.05317 5.80864L16.6169 14.568L16.7007 7.14383L17.6984 7.09145L17.5946 16.2833L8.40276 16.1794L8.47766 15.1832L15.9018 15.267L7.33812 6.50772L8.05317 5.80864Z" fill="#141821"/>
              </svg>
            </Link>
          </div>

        </div>

        {/* COLUMNA DERECHA: Render 3D Flotante */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div 
            ref={sphereRef} 
            className="relative w-full max-w-[440px] aspect-square"
          >
            <Image 
              src="/hero-sphere.png"
              alt="Valhu 3D Sphere"
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