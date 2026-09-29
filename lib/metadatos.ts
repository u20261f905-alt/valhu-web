import type { Metadata } from 'next';

import { getAjustes, getSeoPagina, type ClavePagina } from './contenido';

/**
 * Arma los metadatos de una página a partir de lo que el equipo escribió en
 * el editor.
 *
 * Todo lo que quede vacío cae en lo general del sitio, y si eso también está
 * vacío, en lo que ya traía la página. Nunca sale una página sin título ni
 * sin descripción.
 */

const sitio = process.env.NEXT_PUBLIC_SITE_URL;

/**
 * Aplica la plantilla de títulos, pero sin repetir la marca.
 *
 * Si alguien escribe "Branding en Perú | Valhu Group", la plantilla dejaría
 * "Branding en Perú | Valhu Group | Valhu Group". Esto lo evita.
 */
function conPlantilla(titulo: string, plantilla: string, marca: string): string {
  if (!titulo) return titulo;
  if (!plantilla.includes('%s')) return titulo;
  if (marca && titulo.toLowerCase().includes(marca.toLowerCase())) return titulo;
  return plantilla.replace('%s', titulo);
}

export async function metadatosDePagina(
  clave: ClavePagina,
  ruta: string,
  respaldo?: { title?: string; description?: string }
): Promise<Metadata> {
  const [pagina, ajustes] = await Promise.all([getSeoPagina(clave), getAjustes()]);

  const marca = ajustes?.siteName || 'Valhu Group';
  const plantilla = ajustes?.titleTemplate || '%s';

  const tituloBase = pagina?.title || respaldo?.title || marca;
  const title = conPlantilla(tituloBase, plantilla, marca);

  const description =
    pagina?.description || ajustes?.defaultDescription || respaldo?.description || undefined;

  const imagen = pagina?.ogImage || ajustes?.defaultOgImage || undefined;

  return {
    title,
    description,

    // Sin dominio configurado no se emite canónica: una canónica que apunte
    // a localhost es peor que no tenerla.
    alternates: sitio ? { canonical: ruta } : undefined,

    robots: pagina?.noindex ? { index: false, follow: true } : undefined,

    openGraph: {
      type: 'website',
      siteName: marca,
      title,
      description,
      url: sitio ? ruta : undefined,
      images: imagen ? [{ url: imagen }] : undefined,
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imagen ? [imagen] : undefined,
    },
  };
}
