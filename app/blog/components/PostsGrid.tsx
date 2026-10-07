'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import PostCard from './PostCard';
import { formatPostDate, toIsoDate } from '@/lib/format';
import type { PostListItem } from '@/lib/contenido';

gsap.registerPlugin(ScrollTrigger);

/**
 * Listado de notas: una destacada arriba y el resto en grilla.
 * Las animaciones siguen el mismo lenguaje del Home (entrada desde abajo con
 * stagger al llegar al viewport).
 */
export default function PostsGrid({ posts }: { posts: PostListItem[] }) {
  const containerRef = useRef<HTMLElement>(null);

  // La destacada es la marcada como featured; si no hay ninguna, la más reciente.
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const rest = featured ? posts.filter((post) => post.slug !== featured.slug) : posts;

  useGSAP(
    () => {
      if (!posts.length) return;

      gsap.fromTo(
        '.blog-featured',
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.blog-featured',
            start: 'top 85%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.blog-card',
        { autoAlpha: 0, y: 70 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.blog-grid',
            start: 'top 85%',
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // Las imágenes de next/image cargan después del montaje y mueven el
      // layout: recalculamos los puntos de disparo una vez que todo cargó.
      const handleLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', handleLoad);
      if (document.readyState === 'complete') ScrollTrigger.refresh();

      return () => window.removeEventListener('load', handleLoad);
    },
    { scope: containerRef, dependencies: [posts.length] }
  );

  return (
    <section ref={containerRef} className="w-full bg-[#EFF8FD] pt-[24px] md:pt-[32px] lg:pt-[48px] pb-[40px] md:pb-[48px] lg:pb-[64px]">
      <div className="mx-auto max-w-[1220px] px-4 md:px-8">

        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* NOTA DESTACADA */}
            {featured ? <FeaturedPost post={featured} /> : null}

            {/* RESTO DE NOTAS */}
            {rest.length > 0 ? (
              <>
                <h2
                  id="ultimas-publicaciones"
                  className="mb-[24px] mt-[48px] scroll-mt-[100px] text-[24px] leading-[32px] md:text-[28px] md:leading-[36px]"
                >
                  Últimas <span className="font-accent italic font-light">publicaciones</span>
                </h2>

                <div className="blog-grid grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function FeaturedPost({ post }: { post: PostListItem }) {
  return (
    <article className="blog-featured invisible">
      <Link
        href={`/blog/${post.slug}`}
        className="group grid grid-cols-1 items-stretch gap-[20px] rounded-[16px] border border-[#E1E7EC] bg-white p-[16px] transition-colors hover:border-[#D0D5DD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141821] lg:grid-cols-12"
      >
        {/* Portada */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px] bg-[#BBD0E0] lg:col-span-7 lg:aspect-auto lg:min-h-[380px]">
          {post.cover_image_url ? (
            <Image
              src={post.cover_image_url}
              alt={post.cover_image_alt ?? post.title}
              fill
              priority
              sizes="(min-width: 1024px) 700px, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#BBD0E0] to-[#1B3F7D]" />
          )}
        </div>

        {/* Contenido */}
        <div className="flex flex-col justify-center py-[8px] lg:col-span-5 lg:pr-[16px]">
          <div className="mb-[16px] flex flex-wrap items-center gap-2">
            <span className="rounded-[8px] bg-[#E8EEF7] px-[10px] py-[6px] text-[12px] leading-[16px] text-[#1B3F7D]">
              Destacada
            </span>

            <span className="rounded-[8px] bg-[#F1F6FA] px-[10px] py-[6px] text-[12px] leading-[16px] text-[#6B7A88]">
              {post.category}
            </span>
          </div>

          <h2 className="mb-[16px] text-[24px] leading-[30px] md:text-[32px] md:leading-[40px]">
            {post.title}
          </h2>

          {post.excerpt ? (
            <p className="mb-[24px] bg-transparent text-[14px] leading-[20px] text-[#525866] md:text-[16px]">
              {post.excerpt}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] leading-[16px] text-[#77828C]">
            <time dateTime={toIsoDate(post.published_at)}>
              {formatPostDate(post.published_at)}
            </time>

            {post.reading_minutes ? (
              <>
                <span aria-hidden="true">·</span>
                <span>{post.reading_minutes} min de lectura</span>
              </>
            ) : null}
          </div>

          <span className="mt-[24px] inline-flex items-center gap-2 text-[16px] font-semibold text-[#141821]">
            Leer la nota
            <span
              aria-hidden="true"
              className="inline-flex transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.05317 5.80864L16.6169 14.568L16.7007 7.14383L17.6984 7.09145L17.5946 16.2833L8.40276 16.1794L8.47766 15.1832L15.9018 15.267L7.33812 6.50772L8.05317 5.80864Z" fill="currentColor" />
              </svg>
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}

/* ------------------------------------------------------------------ */

function EmptyState() {
  return (
    <div className="rounded-[16px] border border-dashed border-[#B8C4CC] bg-[#E6F1F7] px-6 py-[64px] text-center">
      <h2 className="mb-3 text-[24px] leading-[32px]">
        Todavía no hay notas <span className="font-accent italic font-light">publicadas</span>
      </h2>

      <p className="mx-auto max-w-[520px] bg-transparent text-[14px] leading-[20px] text-[#525866] md:text-[16px]">
        Estamos preparando los primeros contenidos. Mientras tanto, puedes
        escribirnos y conversamos sobre tu proyecto.
      </p>

      <Link
        href="/#contacto"
        className="mt-[24px] inline-flex items-center justify-center gap-3 rounded-[8px] bg-[#141821] px-[20px] py-[16px] text-[16px] font-semibold text-white transition-colors hover:bg-[#2b3240]"
      >
        Agenda una reunión
      </Link>
    </div>
  );
}
