import Image from 'next/image';
import Link from 'next/link';

import { formatPostDate, toIsoDate } from '@/lib/format';
import type { PostListItem } from '@/lib/contenido';

/**
 * Tarjeta de nota usada en el listado del blog y en las notas relacionadas.
 *
 * `animated` controla si la tarjeta arranca oculta esperando a GSAP. En el
 * listado sí (la anima PostsGrid); en bloques sin animación se pasa false para
 * que se vea de entrada.
 */
export default function PostCard({
  post,
  animated = true,
}: {
  post: PostListItem;
  animated?: boolean;
}) {
  return (
    <article className={`blog-card h-full ${animated ? 'invisible' : ''}`}>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col rounded-[16px] border border-[#E1E7EC] bg-white p-[16px] transition-colors hover:border-[#D0D5DD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141821]"
      >
        {/* Portada */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px] bg-[#BBD0E0]">
          {post.cover_image_url ? (
            <Image
              src={post.cover_image_url}
              alt={post.cover_image_alt ?? post.title}
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#BBD0E0] to-[#1B3F7D]" />
          )}
        </div>

        {/* Contenido */}
        <div className="flex flex-1 flex-col pt-[20px]">
          <div className="mb-[16px] flex flex-wrap items-center gap-2">
            <span className="rounded-[8px] bg-[#F1F6FA] px-[10px] py-[6px] text-[12px] leading-[16px] text-[#6B7A88]">
              {post.category}
            </span>

            {post.reading_minutes ? (
              <span className="text-[12px] leading-[16px] text-[#77828C]">
                {post.reading_minutes} min de lectura
              </span>
            ) : null}
          </div>

          <h3 className="mb-[12px] text-[18px] leading-[26px] md:text-[20px] md:leading-[28px] text-[#141821]">
            {post.title}
          </h3>

          {post.excerpt ? (
            <p className="mb-[20px] line-clamp-3 bg-transparent text-[14px] leading-[20px] text-[#525866]">
              {post.excerpt}
            </p>
          ) : null}

          <div className="mt-auto flex items-center justify-between gap-3 pt-[4px]">
            <time
              dateTime={toIsoDate(post.published_at)}
              className="text-[12px] leading-[16px] text-[#77828C]"
            >
              {formatPostDate(post.published_at)}
            </time>

            <span
              aria-hidden="true"
              className="inline-flex text-[#141821] transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.05317 5.80864L16.6169 14.568L16.7007 7.14383L17.6984 7.09145L17.5946 16.2833L8.40276 16.1794L8.47766 15.1832L15.9018 15.267L7.33812 6.50772L8.05317 5.80864Z" fill="currentColor" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
