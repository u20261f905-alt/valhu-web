import type { MetadataRoute } from 'next';

import { getPublishedPosts, getSeoPagina, type ClavePagina } from '@/lib/contenido';

/**
 * El mapa del sitio que lee Google.
 *
 * Se arma solo: publicas una nota y aparece aquí sin que nadie toque nada.
 * Las páginas marcadas como "Ocultar de Google" en el editor quedan fuera,
 * porque no tiene sentido pedirle a Google que visite algo que le estamos
 * pidiendo que no indexe.
 */

const sitio = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const PAGINAS: { ruta: string; clave: ClavePagina; prioridad: number }[] = [
  { ruta: '/', clave: 'home', prioridad: 1 },
  { ruta: '/servicios/diseno-desarrollo-web', clave: 'web', prioridad: 0.9 },
  { ruta: '/servicios/meta-ads', clave: 'ads', prioridad: 0.9 },
  { ruta: '/servicios/diseno-ux-ui', clave: 'uxui', prioridad: 0.9 },
  { ruta: '/servicios/branding', clave: 'branding', prioridad: 0.9 },
  { ruta: '/nosotros', clave: 'nosotros', prioridad: 0.7 },
  { ruta: '/blog', clave: 'blog', prioridad: 0.8 },
  { ruta: '/contacto', clave: 'contacto', prioridad: 0.9 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ahora = new Date();

  const fijas = await Promise.all(
    PAGINAS.map(async (p) => {
      const seo = await getSeoPagina(p.clave);
      if (seo?.noindex) return null;

      return {
        url: new URL(p.ruta, sitio).toString(),
        lastModified: ahora,
        changeFrequency: 'monthly' as const,
        priority: p.prioridad,
      };
    })
  );

  const notas = await getPublishedPosts();

  const delBlog = notas.map((nota) => ({
    url: new URL(`/blog/${nota.slug}`, sitio).toString(),
    lastModified: nota.published_at ? new Date(nota.published_at) : ahora,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...fijas.filter((p) => p !== null), ...delBlog];
}
