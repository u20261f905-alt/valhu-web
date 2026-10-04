import { createReader } from '@keystatic/core/reader';
import type { Node } from '@markdoc/markdoc';

import config from '../keystatic.config';
import {
  contarPalabras,
  minutosDeLectura,
  primerParrafo,
  subtitulos,
  textoPlano,
} from './markdoc-texto';
import type { EntradaAnalisis } from './seo-analisis';
import {
  ABOUT_POR_DEFECTO,
  CATEGORIAS_POR_DEFECTO,
  CTA_POR_DEFECTO,
  FAQ_POR_DEFECTO,
  FAQS_POR_DEFECTO,
  HERO_POR_DEFECTO,
  SERVICES_POR_DEFECTO,
  type HomeContent,
} from './home-defaults';

/**
 * Capa de datos del sitio.
 *
 * Todo el contenido vive como archivos dentro del repositorio y lo lee
 * Keystatic. No hay base de datos ni llamadas de red: en el build ya está
 * todo resuelto, así que la web publicada no depende de ningún servicio.
 *
 * Los tipos que salen de aquí son los mismos que usaban los componentes
 * cuando el contenido estaba en Supabase, para no tocar nada del diseño.
 */

const reader = createReader(process.cwd(), config);

/* ================================================================== */
/*  Tipos                                                             */
/* ================================================================== */

export type PostListItem = {
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  category: string;
  tags: string[] | null;
  author_name: string;
  author_role: string | null;
  reading_minutes: number | null;
  featured: boolean;
  published_at: string | null;
};

export type Post = PostListItem & {
  /** El cuerpo ya parseado. Lo dibuja PostBody. */
  content: Node;
  seo_title: string | null;
  seo_description: string | null;
  focus_keyword: string | null;
  canonical_url: string | null;
  noindex: boolean;
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
};

/* ================================================================== */
/*  Ayudas internas                                                   */
/* ================================================================== */

/** Convierte "" en null, para que los componentes sigan viendo lo mismo. */
const oNulo = (v: string | null | undefined): string | null => {
  const t = (v ?? '').trim();
  return t === '' ? null : t;
};

/** Nombre visible de una categoría a partir de su slug. */
async function nombreDeCategoria(slug: string | null): Promise<string> {
  if (!slug) return '';
  const cat = await reader.collections.categorias.read(slug);
  return cat?.name ?? slug;
}

type EntradaNota = NonNullable<
  Awaited<ReturnType<typeof reader.collections.notas.read>>
>;

/**
 * El cuerpo de la nota.
 *
 * Según cómo se haya leído la entrada, Keystatic entrega el contenido ya
 * resuelto o como una función que hay que llamar. Esto acepta las dos.
 */
async function cuerpoDe(nota: EntradaNota): Promise<Node> {
  const contenido = nota.content;
  const resuelto = typeof contenido === 'function' ? await contenido() : contenido;
  return resuelto.node;
}

async function aListItem(slug: string, nota: EntradaNota): Promise<PostListItem> {
  const cuerpo = await cuerpoDe(nota);

  return {
    slug,
    title: nota.title,
    excerpt: oNulo(nota.excerpt),
    cover_image_url: oNulo(nota.coverImage),
    cover_image_alt: oNulo(nota.coverImageAlt),
    category: await nombreDeCategoria(nota.category),
    tags: [...(nota.tags ?? [])],
    author_name: nota.authorName || 'Valhu Group',
    author_role: oNulo(nota.authorRole),
    reading_minutes: minutosDeLectura(cuerpo),
    featured: nota.featured,
    published_at: nota.publishedAt ?? null,
  };
}

/** Publicadas, de la más reciente a la más antigua. */
async function publicadasOrdenadas() {
  const todas = await reader.collections.notas.all();

  return todas
    .filter((n) => n.entry.status === 'published')
    .sort((a, b) => (b.entry.publishedAt ?? '').localeCompare(a.entry.publishedAt ?? ''));
}

/* ================================================================== */
/*  Blog                                                              */
/* ================================================================== */

export async function getPublishedPosts(): Promise<PostListItem[]> {
  const notas = await publicadasOrdenadas();
  return Promise.all(notas.map((n) => aListItem(n.slug, n.entry)));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const nota = await reader.collections.notas.read(slug);
  if (!nota || nota.status !== 'published') return null;

  const base = await aListItem(slug, nota);

  return {
    ...base,
    content: await cuerpoDe(nota),
    seo_title: oNulo(nota.seo.seoTitle),
    seo_description: oNulo(nota.seo.seoDescription),
    focus_keyword: oNulo(nota.seo.focusKeyword),
    canonical_url: oNulo(nota.seo.canonicalUrl),
    noindex: nota.seo.noindex,
    og_title: oNulo(nota.seo.ogTitle),
    og_description: oNulo(nota.seo.ogDescription),
    og_image_url: oNulo(nota.seo.ogImage),
  };
}

/**
 * Notas relacionadas: primero las de la misma categoría, y si no alcanzan,
 * se completan con las más recientes.
 */
export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 2
): Promise<PostListItem[]> {
  const todas = await getPublishedPosts();
  const otras = todas.filter((p) => p.slug !== currentSlug);

  const mismas = otras.filter((p) => p.category === category);
  const relacionadas = mismas.slice(0, limit);

  for (const post of otras) {
    if (relacionadas.length >= limit) break;
    if (relacionadas.some((r) => r.slug === post.slug)) continue;
    relacionadas.push(post);
  }

  return relacionadas;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const notas = await publicadasOrdenadas();
  return notas.map((n) => n.slug);
}

/* ================================================================== */
/*  Home                                                              */
/* ================================================================== */

/**
 * Si un texto quedó vacío se usa el original del sitio, igual que antes:
 * una página nunca se muestra con un hueco en blanco.
 */
function conRespaldo<T extends Record<string, unknown>>(
  guardado: Partial<T> | null | undefined,
  defecto: T
): T {
  if (!guardado || typeof guardado !== 'object') return defecto;

  const resultado = { ...defecto };

  for (const clave of Object.keys(defecto) as (keyof T)[]) {
    const valor = guardado[clave];

    if (typeof valor === 'string') {
      if (valor.trim() !== '') resultado[clave] = valor as T[keyof T];
    } else if (valor && typeof valor === 'object' && !Array.isArray(valor)) {
      resultado[clave] = conRespaldo(
        valor as Record<string, unknown>,
        defecto[clave] as Record<string, unknown>
      ) as T[keyof T];
    }
  }

  return resultado;
}

export async function getHomeContent(): Promise<HomeContent> {
  const [portada, servicios, nosotros, preguntas, contacto] = await Promise.all([
    reader.singletons.portada.read(),
    reader.singletons.servicios.read(),
    reader.singletons.nosotros.read(),
    reader.singletons.preguntas.read(),
    reader.singletons.contacto.read(),
  ]);

  const visibles = (preguntas?.items ?? [])
    .filter((f) => f.active)
    .map((f, i) => ({ id: `faq-${i}`, question: f.question, answer: f.answer }));

  return {
    hero: conRespaldo(portada, HERO_POR_DEFECTO),
    services: conRespaldo(servicios as never, SERVICES_POR_DEFECTO),
    about: conRespaldo(nosotros, ABOUT_POR_DEFECTO),
    faq: conRespaldo(preguntas as never, FAQ_POR_DEFECTO),
    cta: conRespaldo(contacto, CTA_POR_DEFECTO),
    faqs: visibles.length > 0 ? visibles : FAQS_POR_DEFECTO,
  };
}

/** Nombres de las categorías, en el orden configurado. */
export async function getCategorias(): Promise<string[]> {
  const cats = await reader.collections.categorias.all();
  if (cats.length === 0) return CATEGORIAS_POR_DEFECTO;

  return cats
    .sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0))
    .map((c) => c.entry.name);
}

/* ================================================================== */
/*  Revisión de SEO                                                   */
/* ================================================================== */

export type NotaParaSeo = {
  slug: string;
  title: string;
  status: 'draft' | 'published';
  entrada: EntradaAnalisis;
};

/**
 * Todas las notas con lo que necesita el análisis de SEO, incluidas las que
 * todavía están en borrador: revisarlas antes de publicar es justamente el
 * momento en que sirve.
 */
export async function getNotasParaSeo(): Promise<NotaParaSeo[]> {
  const todas = await reader.collections.notas.all();

  const notas = await Promise.all(
    todas.map(async ({ slug, entry }) => {
      const cuerpo = await cuerpoDe(entry);

      return {
        slug,
        title: entry.title,
        status: entry.status as 'draft' | 'published',
        entrada: {
          keyword: entry.seo.focusKeyword ?? '',
          title: entry.title,
          slug,
          excerpt: entry.excerpt ?? '',
          seoTitle: entry.seo.seoTitle ?? '',
          seoDescription: entry.seo.seoDescription ?? '',
          coverAlt: entry.coverImageAlt ?? '',
          textoCompleto: textoPlano(cuerpo),
          primerParrafo: primerParrafo(cuerpo),
          subtitulos: subtitulos(cuerpo),
          palabras: contarPalabras(cuerpo),
        },
      };
    })
  );

  return notas.sort((a, b) => a.title.localeCompare(b.title));
}

/* ================================================================== */
/*  Ajustes, empresa e imágenes                                       */
/* ================================================================== */

export type ClavePagina =
  | 'home'
  | 'blog'
  | 'nosotros'
  | 'contacto'
  | 'servicios'
  | 'web'
  | 'ads'
  | 'uxui'
  | 'branding';

export async function getAjustes() {
  return reader.singletons.ajustes.read();
}

export async function getEmpresa() {
  return reader.singletons.empresa.read();
}

/** Los metadatos que el equipo escribió para una página concreta. */
export async function getSeoPagina(clave: ClavePagina) {
  const todas = await reader.singletons.seoPaginas.read();
  return todas?.[clave] ?? null;
}

/** Las imágenes del home, con su texto alternativo. */
export async function getImagenes() {
  return reader.singletons.imagenes.read();
}

/** Textos y rangos de presupuesto del formulario de contacto. */
export async function getFormulario() {
  const guardado = await reader.singletons.formulario.read();

  return {
    intro: guardado?.intro ?? '',
    nota: guardado?.nota ?? '',
    presupuestos: (guardado?.presupuestos ?? []).map((p) => ({
      soles: p.soles,
      dolares: p.dolares,
    })),
    exitoTitulo: guardado?.exitoTitulo || 'Recibimos tu mensaje',
    exitoTexto:
      guardado?.exitoTexto ||
      'Te respondemos dentro de las siguientes 48 horas al correo que nos dejaste.',
  };
}
