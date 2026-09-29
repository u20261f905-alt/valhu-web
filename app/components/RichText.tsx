import { Fragment } from 'react';

import { parseRico } from '@/lib/rich-text';

/**
 * Versión sin animación de AnimatedRichText.
 *
 * Se usa donde el texto no se revela palabra por palabra (por ejemplo los
 * títulos y descripciones dentro de las tarjetas de servicios, que se
 * animan como bloque completo). Respeta las mismas marcas:
 *
 *   *palabra*    → tipografía de acento
 *   **palabra**  → negrita
 */
export default function RichText({
  texto,
  claseNegrita = 'font-semibold',
  claseAcento = 'font-accent italic font-light',
}: {
  texto: string;
  claseNegrita?: string;
  claseAcento?: string;
}) {
  const trozos = parseRico(texto);

  return (
    <>
      {trozos.map((trozo, i) => {
        if (trozo.negrita) {
          return (
            <strong key={i} className={claseNegrita}>
              {trozo.texto}
            </strong>
          );
        }

        if (trozo.acento) {
          return (
            <span key={i} className={claseAcento}>
              {trozo.texto}
            </span>
          );
        }

        return <Fragment key={i}>{trozo.texto}</Fragment>;
      })}
    </>
  );
}
