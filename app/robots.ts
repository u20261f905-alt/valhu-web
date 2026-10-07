import type { MetadataRoute } from 'next';

/**
 * Instrucciones para los buscadores.
 *
 * Se abre el sitio público entero y se cierran las herramientas internas,
 * que no tienen por qué aparecer en Google. El sitemap se declara aquí para
 * que lo encuentren sin que nadie lo envíe a mano.
 */

/**
 * El sitio se publica como archivos estáticos: este archivo se escribe una
 * vez, durante el build, en lugar de calcularse en cada visita.
 */
export const dynamic = 'force-static';

const sitio = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/keystatic', '/seo', '/api/'],
      },
    ],
    sitemap: new URL('/sitemap.xml', sitio).toString(),
    host: sitio,
  };
}
