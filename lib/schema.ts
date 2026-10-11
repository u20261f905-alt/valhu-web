import { getEmpresa, type Post, type PostListItem } from './contenido';
import type { Faq } from './home-defaults';
import { textoPlano } from './rich-text';

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
      // Google lee esto tal cual, así que van sin las marcas de formato.
      acceptedAnswer: { '@type': 'Answer', text: textoPlano(f.answer) },
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

/* ------------------------------------------------------------------ */
/*  Una página de servicio                                             */
/* ------------------------------------------------------------------ */

/**
 * Declara que la página describe un servicio: cuál es, quién lo presta y
 * en qué zona. Sin esto Google tiene que deducirlo del texto.
 */
export async function schemaServicio({
  nombre,
  descripcion,
  ruta,
  tipo,
}: {
  nombre: string;
  descripcion: string;
  ruta: string;
  /** Categoría de schema.org, p. ej. 'WebDesign' o 'Branding'. */
  tipo?: string;
}) {
  const e = await getEmpresa();

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: nombre,
    description: descripcion,
    ...(tipo ? { serviceType: tipo } : {}),
    url: absoluta(ruta),
    provider: {
      '@type': 'Organization',
      name: e?.name || 'Valhu Group',
      ...(sitio ? { url: sitio } : {}),
    },
    areaServed: {
      '@type': 'Country',
      name: e?.country || 'Perú',
    },
    ...(e?.email || e?.phone
      ? {
          availableChannel: {
            '@type': 'ServiceChannel',
            serviceUrl: absoluta('/contacto'),
          },
        }
      : {}),
  };
}

/* ------------------------------------------------------------------ */
/*  Migas de cualquier página                                          */
/* ------------------------------------------------------------------ */

/**
 * Ruta de navegación genérica. Se le pasan los escalones en orden; el
 * último va sin enlace porque es la página actual.
 *
 *   schemaRuta([{ nombre: 'Inicio', ruta: '/' },
 *               { nombre: 'Servicios', ruta: '/servicios' },
 *               { nombre: 'Diseño y desarrollo web' }])
 */
export function schemaRuta(pasos: { nombre: string; ruta?: string }[]) {
  if (pasos.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: pasos.map((paso, indice) => ({
      '@type': 'ListItem',
      position: indice + 1,
      name: paso.nombre,
      ...(paso.ruta ? { item: absoluta(paso.ruta) } : {}),
    })),
  };
}
