import type { MetadataRoute } from 'next';

/**
 * Instrucciones para los buscadores.
 *
 * Se abre todo el sitio menos las herramientas internas, y se le señala
 * dónde está el mapa del sitio.
 */

const sitio = process.env.NEXT_PUBLIC_SITE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/keystatic', '/keystatic/', '/api/', '/seo'],
    },
    ...(sitio ? { sitemap: new URL('/sitemap.xml', sitio).toString(), host: sitio } : {}),
  };
}
