'use client';

import { useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

type ScrollTiltProps = {
  children: ReactNode;
  /** Ángulo inicial (cuando entra por abajo). Positivo = inclinada hacia atrás. */
  from?: number;
  /** Ángulo final (cuando sale por arriba). Negativo = inclinada hacia adelante. */
  to?: number;
  /** Profundidad de la perspectiva. Menor = efecto más exagerado. */
  perspective?: number;
  /** Suavizado del scrub: true = pegado al scroll, un número = inercia en segundos. */
  scrub?: boolean | number;
};

export default function ScrollTilt({
  children,
  from = 10,
  to = -6,
  perspective = 1400,
  scrub = 0.6,
}: ScrollTiltProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        innerRef.current,
        { rotateX: from },
        {
          rotateX: to,
          ease: 'none', // sin easing: el ángulo sigue linealmente al scroll
          scrollTrigger: {
            trigger: outerRef.current,
            // Arranca cuando el bloque asoma por abajo y termina
            // cuando sale por arriba: todo el recorrido es "scrubeable".
            start: 'top bottom',
            end: 'bottom top',
            scrub,
            invalidateOnRefresh: true,
          },
        }
      );

      const handleLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', handleLoad);
      if (document.readyState === 'complete') ScrollTrigger.refresh();

      return () => window.removeEventListener('load', handleLoad);
    },
    { scope: outerRef }
  );

  return (
    // El contenedor externo define la perspectiva. Sin esto la rotación
    // se ve plana (como un simple aplastamiento vertical) en vez de 3D.
    <div ref={outerRef} style={{ perspective: `${perspective}px` }}>
      {/* Sin transformStyle: 'preserve-3d' ni willChange: rotamos un solo
          elemento, sus hijos no necesitan espacio 3D propio, y esas dos
          propiedades crean una capa de composición que en varios
          navegadores impide hacer clic en el contenido. */}
      <div ref={innerRef}>
        {children}
      </div>
    </div>
  );
}
