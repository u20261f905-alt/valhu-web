'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { formatPostDate, toIsoDate } from '@/lib/format';

type Props = {
  title: string;
  category: string;
  authorName: string;
  authorRole: string | null;
  publishedAt: string | null;
  readingMinutes: number | null;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
};

/**
 * Cabecera de la nota: migas, título animado palabra por palabra (misma técnica
 * que el Hero y las internas) y portada.
 */
export default function PostHeader({
  title,
  category,
  authorName,
  authorRole,
  publishedAt,
  readingMinutes,
  coverImageUrl,
  coverImageAlt,
}: Props) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        '.post-anim-top',
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        0
      )
        .fromTo(
          '.post-blur-word',
          { autoAlpha: 0, filter: 'blur(10px)', y: 10 },
          {
            autoAlpha: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.4,
            stagger: 0.015,
            ease: 'power2.out',
          },
          0.15
        )
        .fromTo(
          '.post-anim-meta',
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          0.35
        )
        .fromTo(
          '.post-anim-cover',
          { autoAlpha: 0, scale: 1.04 },
          { autoAlpha: 1, scale: 1, duration: 1.4, ease: 'power3.out' },
          0.3
        );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="w-full bg-[#EFF8FD]">
      {/* Mismo ancho de columna que el cuerpo de la nota (760px), para que
          migas, título, autoría y portada queden alineados con el texto. */}
      <div className="mx-auto max-w-[1220px] px-4 pt-[24px] pb-0 md:px-8 md:pt-[40px]">
        <div className="mx-auto max-w-[760px]">

        {/* Migas + categoría */}
        <div className="post-anim-top invisible mb-[16px] flex flex-wrap items-center gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[14px] leading-[20px] text-[#525866] transition-colors hover:text-[#141821]"
          >
            <span aria-hidden="true">←</span>
            Volver al blog
          </Link>

          <span aria-hidden="true" className="text-[#C3CDD6]">
            /
          </span>

          <span className="rounded-[8px] bg-[#D1E4F2] px-[10px] py-[6px] text-[12px] leading-[16px] text-[#4D687B]">
            {category}
          </span>
        </div>

        {/* Título */}
        <h1 className="mb-[20px] !text-[32px] !leading-[38px] md:!text-[44px] md:!leading-[52px]">
          {title.split(' ').map((word, index) => (
            <span key={`post-title-${index}`} className="post-blur-word invisible inline-block">
              {word}
              {index < title.split(' ').length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>

        {/* Autoría y datos de lectura */}
        <div className="post-anim-meta invisible mb-[32px] flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] leading-[18px] text-[#77828C] md:text-[14px]">
          <span className="text-[#141821]">{authorName}</span>

          {authorRole ? (
            <>
              <span aria-hidden="true">·</span>
              <span>{authorRole}</span>
            </>
          ) : null}

          {publishedAt ? (
            <>
              <span aria-hidden="true">·</span>
              <time dateTime={toIsoDate(publishedAt)}>{formatPostDate(publishedAt)}</time>
            </>
          ) : null}

          {readingMinutes ? (
            <>
              <span aria-hidden="true">·</span>
              <span>{readingMinutes} min de lectura</span>
            </>
          ) : null}
        </div>

        {/* Portada */}
        {coverImageUrl ? (
          <div className="post-anim-cover invisible relative aspect-[16/9] w-full overflow-hidden rounded-[16px] bg-[#BBD0E0]">
            <Image
              src={coverImageUrl}
              alt={coverImageAlt ?? title}
              fill
              priority
              sizes="(min-width: 828px) 760px, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
        </div>
      </div>
    </section>
  );
}
