/**
 * Utilidades de SEO.
 */

/**
 * Devuelve el enlace canónico de una página, pero SOLO si el dominio del sitio
 * está configurado en NEXT_PUBLIC_SITE_URL.
 *
 * ¿Por qué la condición? Sin esa variable Next.js asume localhost, y publicar
 * un canónico apuntando a localhost es peor que no tener ninguno: le estaría
 * diciendo a Google que la versión "oficial" de la página es una que no existe.
 * Mientras la variable no esté puesta, simplemente no se emite la etiqueta.
 *
 * Uso:
 *   export const metadata: Metadata = {
 *     title: '...',
 *     alternates: canonical('/servicios/meta-ads'),
 *   };
 */
export function canonical(path: string) {
  if (!process.env.NEXT_PUBLIC_SITE_URL) return undefined;
  return { canonical: path };
}
