import { getEmpresa, type Post, type PostListItem } from './contenido';
import type { Faq } from './home-defaults';

/**
 * Datos estructurados (schema.org).
 *
 * Es información que la página lleva escondida para que Google entienda qué
 * es cada cosa: que Valhu Group es una organización, que esto es un
 * artículo con autor y fecha, que eso de abajo son preguntas frecuentes.
 *
 * Todo sale de contenido que ya existe en el editor. No hay que escribir
 * nada dos veces.
 */

const sitio = process.env.NEXT_PUBLIC_SITE_URL ?? '';

/** Convierte una ruta del sitio en dirección completa. */
const absoluta = (ruta: string) => (sitio ? new URL(ruta, sitio).toString() : ruta);

/* ------------------------------------------------------------------ */
/*  La empresa                                                         */
/* ------------------------------------------------------------------ */

export async function schemaOrganizacion() {
  const e = await getEmpresa();
  if (!e?.name) return null;

  const enlaces = (e.socials ?? []).filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: e.name,
    ...(e.legalName ? { legalName: e.legalName } : {}),
    ...(e.description ? { description: e.description } : {}),
    ...(sitio ? { url: sitio } : {}),
    ...(e.logo ? { logo: absoluta(e.logo) } : {}),
    ...(enlaces.length > 0 ? { sameAs: enlaces } : {}),
    ...(e.email || e.phone
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            ...(e.email ? { email: e.email } : {}),
            ...(e.phone ? { telephone: e.phone } : {}),
          },
        }
      : {}),
    ...(e.city || e.country
      ? {
          address: {
            '@type': 'PostalAddress',
            ...(e.city ? { addressLocality: e.city } : {}),
            ...(e.country ? { addressCountry: e.country } : {}),
          },
        }
      : {}),
  };
}

/* ------------------------------------------------------------------ */
/*  Preguntas frecuentes                                               */
/* ------------------------------------------------------------------ */

/**
 * Las preguntas del home, declaradas para que Google pueda mostrarlas
 * desplegables dentro del resultado de búsqueda.
 */
export function schemaPreguntas(faqs: Faq[]) {
  if (faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

/* ------------------------------------------------------------------ */
/*  Una nota del blog                                                  */
/* ------------------------------------------------------------------ */

export async function schemaNota(post: Post) {
  const e = await getEmpresa();

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seo_title || post.title,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    ...(post.cover_image_url ? { image: absoluta(post.cover_image_url) } : {}),
    ...(post.published_at ? { datePublished: post.published_at } : {}),
    ...(post.published_at ? { dateModified: post.published_at } : {}),
    author: { '@type': 'Organization', name: post.author_name },
    publisher: {
      '@type': 'Organization',
      name: e?.name || post.author_name,
      ...(e?.logo ? { logo: { '@type': 'ImageObject', url: absoluta(e.logo) } } : {}),
    },
    mainEntityOfPage: absoluta(`/blog/${post.slug}`),
    ...(post.category ? { articleSection: post.category } : {}),
  };
}

/** La ruta de migas: Inicio › Blog › la nota. */
export function schemaMigas(post: PostListItem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: absoluta('/') },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluta('/blog') },
      { '@type': 'ListItem', position: 3, name: post.title },
    ],
  };
}
