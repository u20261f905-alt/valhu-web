'use client';

import { Fragment, type ReactNode } from 'react';

import { parseRico } from '@/lib/rich-text';

/**
 * Convierte un texto con marcas de formato en palabras sueltas, cada una
 * dentro de su propio <span>, que es lo que necesitan las animaciones de
 * GSAP para revelarlas una por una.
 *
 * Reemplaza a los textos que antes estaban escritos a mano en cada
 * componente, sin cambiar ni el resultado visual ni la animación.
 */
export default function AnimatedRichText({
  texto,
  claseAnimacion,
  prefijo,
  claseNegrita = 'font-semibold text-[#141821]',
  claseAcento = 'font-accent italic font-light',
  quiebreAntesDelAcento = false,
}: {
  /** El texto con sus marcas: *acento* y **negrita** */
  texto: string;
  /** Clase que busca GSAP para animar cada palabra */
  claseAnimacion: string;
  /** Prefijo para las keys de React */
  prefijo: string;
  claseNegrita?: string;
  claseAcento?: string;
  /**
   * Obsoleto: ahora siempre se escribe un espacio real entre palabras, en
   * flex y fuera de flex. Se mantiene el prop para no tocar las llamadas
   * existentes.
   */
  separador?: 'flex' | 'espacio';
  /**
   * Inserta un salto de línea en desktop justo antes de la primera palabra
   * con acento. Lo usa la sección Nosotros para mantener su título en dos
   * líneas.
   */
  quiebreAntesDelAcento?: boolean;
}) {
  const trozos = parseRico(texto);
  const piezas: ReactNode[] = [];

  let yaQuebro = false;

  trozos.forEach((trozo, indiceTrozo) => {
    const palabras = trozo.texto.split(/\s+/).filter(Boolean);

    palabras.forEach((palabra, indicePalabra) => {
      if (quiebreAntesDelAcento && trozo.acento && !yaQuebro) {
        yaQuebro = true;
        piezas.push(
          <span
            key={`${prefijo}-quiebre`}
            className="hidden md:block basis-full h-0"
            aria-hidden="true"
          />
        );
      }

      const clases = [
        claseAnimacion,
        'invisible inline-block',
        trozo.negrita ? claseNegrita : '',
        trozo.acento ? claseAcento : '',
      ]
        .filter(Boolean)
        .join(' ');

      piezas.push(
        <Fragment key={`${prefijo}-${indiceTrozo}-${indicePalabra}`}>
          <span className={clases}>{palabra}</span>
          {/* Espacio real entre palabras. Hace falta aunque el contenedor
              sea flex y las separe visualmente con gap: sin él, el texto
              que leen Google y los lectores de pantalla queda pegado
              ("NuestrosServicios"). En un contenedor flex un nodo de texto
              con solo espacios no se renderiza, así que no altera nada. */}
          {' '}
        </Fragment>
      );
    });
  });

  return <>{piezas}</>;
}
