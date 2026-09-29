import type { Node } from '@markdoc/markdoc';

/**
 * Utilidades para mirar dentro del cuerpo de una nota.
 *
 * Keystatic entrega el contenido como un árbol, no como texto plano. Para
 * contar palabras, calcular el tiempo de lectura o revisar el SEO hace falta
 * recorrerlo.
 */

/** Todo el texto de la nota, sin marcas ni etiquetas. */
export function textoPlano(nodo: Node): string {
  const partes: string[] = [];

  const recorrer = (n: Node) => {
    if (n.type === 'text' && typeof n.attributes?.content === 'string') {
      partes.push(n.attributes.content);
    }
    for (const hijo of n.children ?? []) recorrer(hijo);
  };

  recorrer(nodo);
  return partes.join(' ').replace(/\s+/g, ' ').trim();
}

/** El texto del primer párrafo, que es donde conviene nombrar la búsqueda. */
export function primerParrafo(nodo: Node): string {
  for (const hijo of nodo.children ?? []) {
    if (hijo.type === 'paragraph') return textoPlano(hijo);
  }
  return '';
}

/** Los subtítulos de la nota, en orden. */
export function subtitulos(nodo: Node): string[] {
  const encontrados: string[] = [];

  const recorrer = (n: Node) => {
    if (n.type === 'heading') encontrados.push(textoPlano(n));
    for (const hijo of n.children ?? []) recorrer(hijo);
  };

  recorrer(nodo);
  return encontrados;
}

/** Cuántas palabras tiene la nota. */
export function contarPalabras(nodo: Node): number {
  const texto = textoPlano(nodo);
  return texto ? texto.split(/\s+/).length : 0;
}

/**
 * Tiempo de lectura en minutos, redondeado hacia arriba.
 * Se calcula sobre 200 palabras por minuto, que es el promedio habitual.
 */
export function minutosDeLectura(nodo: Node): number {
  return Math.max(1, Math.ceil(contarPalabras(nodo) / 200));
}
