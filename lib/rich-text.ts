/**
 * Formato de texto para los contenidos editables del sitio.
 *
 * Quien escribe desde el panel marca el texto así:
 *
 *   *palabra*    → tipografía cursiva de acento (PP Editorial New)
 *   **palabra**  → negrita
 *
 * Es el mismo criterio en todas las secciones del home, para que el
 * equipo aprenda una sola convención.
 *
 * Este archivo no importa nada: lo usan tanto el servidor como el
 * navegador.
 */

export type Trozo = {
  texto: string;
  negrita?: boolean;
  acento?: boolean;
};

/**
 * Parte un texto en trozos según sus marcas de formato.
 *
 * "Hola **mundo** y *chau*" →
 *   [{texto:'Hola '}, {texto:'mundo', negrita:true},
 *    {texto:' y '},   {texto:'chau',  acento:true}]
 */
export function parseRico(entrada: string): Trozo[] {
  if (!entrada) return [];

  const trozos: Trozo[] = [];
  // El doble asterisco va primero para que no lo capture el simple.
  const patron = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;

  let ultimo = 0;
  let coincidencia: RegExpExecArray | null;

  while ((coincidencia = patron.exec(entrada)) !== null) {
    if (coincidencia.index > ultimo) {
      trozos.push({ texto: entrada.slice(ultimo, coincidencia.index) });
    }

    if (coincidencia[1] !== undefined) {
      trozos.push({ texto: coincidencia[1], negrita: true });
    } else {
      trozos.push({ texto: coincidencia[2], acento: true });
    }

    ultimo = patron.lastIndex;
  }

  if (ultimo < entrada.length) {
    trozos.push({ texto: entrada.slice(ultimo) });
  }

  return trozos;
}

/** Quita las marcas de formato. Útil para contar caracteres o para el SEO. */
export function textoPlano(entrada: string): string {
  return parseRico(entrada)
    .map((t) => t.texto)
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}
