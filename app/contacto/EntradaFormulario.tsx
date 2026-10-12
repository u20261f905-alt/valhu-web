'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * Entrada animada de la página de contacto.
 *
 * La página de contacto no tiene scroll: todo está en pantalla desde el
 * primer momento, así que la animación corre al cargar y no por scroll,
 * igual que los banners del resto del sitio.
 *
 * Busca dos marcas entre sus hijos:
 *   .ct-word  → palabras del título, que se revelan desenfocadas
 *   .ct-fade  → bloques que entran con un fundido corto desde abajo
 */
export default function EntradaFormulario({ children }: { children: React.ReactNode }) {
  const contenedorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const palabras = contenedorRef.current?.querySelectorAll('.ct-word');
      const bloques = contenedorRef.current?.querySelectorAll('.ct-fade');

      const tl = gsap.timeline({ delay: 0.1 });

      if (palabras && palabras.length > 0) {
        tl.fromTo(
          palabras,
          { autoAlpha: 0, filter: 'blur(10px)', y: 10 },
          {
            autoAlpha: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.4,
            stagger: 0.015,
            ease: 'power2.out',
          },
          0
        );
      }

      if (bloques && bloques.length > 0) {
        tl.fromTo(
          bloques,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
          },
          0.15
        );
      }
    },
    { scope: contenedorRef }
  );

  return <div ref={contenedorRef}>{children}</div>;
}
