import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import PostHeader from '../components/PostHeader';
import PostBody from '../components/PostBody';
import PostCard from '../components/PostCard';
import Cta from '@/app/components/Cta';
import ScrollTilt from '@/app/components/ScrollTilt';
import DatosEstructurados from '@/app/components/DatosEstructurados';
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from '@/lib/contenido';
import { schemaMigas, schemaNota } from '@/lib/schema';

/**
 * La nota se genera durante el build a partir de su archivo en content/notas.
 */

/** Permite servir notas creadas después del último build. */
export const dynamicParams = true;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Nota no encontrada | Valhu Group' };
  }

  const title = post.seo_title ?? `${post.title} | Valhu Group`;
  const description = post.seo_description ?? post.excerpt ?? undefined;

  // Lo que se ve al compartir en redes puede diferir de lo que ve Google.
  const tituloRedes = post.og_title ?? title;
  const descripcionRedes = post.og_description ?? description;
  const imagenRedes = post.og_image_url ?? post.cover_image_url;

  return {
    title,
    description,
    // Si la nota está marcada como oculta, se le pide a Google que no la indexe.
    robots: post.noindex ? { index: false, follow: false } : undefined,
    alternates: post.canonical_url ? { canonical: post.canonical_url } : undefined,
    openGraph: {
      title: tituloRedes,
      description: descripcionRedes,
      type: 'article',
      publishedTime: post.published_at ?? undefined,
      authors: [post.author_name],
      images: imagenRedes ? [imagenRedes] : undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const related = await getRelatedPosts(post.slug, post.category, 3);

  // Le declaramos a Google que esto es un artículo, con su autor y su
  // fecha, y en qué punto del sitio está.
  const articulo = await schemaNota(post);

  return (
    <main className="w-full">
      <DatosEstructurados datos={articulo} />
      <DatosEstructurados datos={schemaMigas(post)} />

      <PostHeader
        title={post.title}
        category={post.category}
        authorName={post.author_name}
        authorRole={post.author_role}
        publishedAt={post.published_at}
        readingMinutes={post.reading_minutes}
        coverImageUrl={post.cover_image_url}
        coverImageAlt={post.cover_image_alt}
      />

      {/* CUERPO DE LA NOTA */}
      <article className="w-full bg-[#EFF8FD]">
        <div className="mx-auto max-w-[1220px] px-4 pb-[48px] md:px-8">
          <div className="mx-auto max-w-[760px]">

            {post.excerpt ? (
              <p className="mb-[32px] border-l-[3px] border-[#1B3F7D] bg-transparent pl-[20px] text-[17px] leading-[28px] text-[#2C3642] md:text-[19px] md:leading-[32px]">
                {post.excerpt}
              </p>
            ) : null}

            <PostBody content={post.content} />

            {/* Tags */}
            {post.tags && post.tags.length > 0 ? (
              <div className="mt-[40px] flex flex-wrap gap-[10px] border-t border-[#E1E7EC] pt-[24px]">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[8px] border border-[#D0D5DD] bg-[#EFF8FD] px-[14px] py-[8px] text-[13px] leading-[18px] text-[#4D687B]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            {/* Volver */}
            <div className="mt-[32px]">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[15px] leading-[22px] text-[#525866] transition-colors hover:text-[#141821]"
              >
                <span aria-hidden="true">←</span>
                Ver todas las notas
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* NOTAS RELACIONADAS */}
      {related.length > 0 ? (
        <section className="w-full bg-[#EFF8FD] py-[48px]">
          <div className="mx-auto max-w-[1220px] px-4 md:px-8">
            <h2 className="mb-[24px] text-[24px] leading-[32px] md:text-[28px] md:leading-[36px]">
              Sigue <span className="font-accent italic font-light">leyendo</span>
            </h2>

            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <PostCard key={item.slug} post={item} animated={false} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ScrollTilt from={16} to={-10} perspective={1100}>
        <Cta />
      </ScrollTilt>
    </main>
  );
}
