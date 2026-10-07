import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import PostBody from '@/app/blog/components/PostBody';
import { getPaginaLegal, getPaginasLegales } from '@/lib/contenido';
import { formatPostDate, toIsoDate } from '@/lib/format';

/**
 * Páginas legales (privacidad, cookies, términos).
 *
 * El texto se escribe en el editor, en Legal → Páginas legales, y se dibuja
 * con la misma tipografía del blog para no duplicar estilos.
 */

export async function generateStaticParams() {
  const paginas = await getPaginasLegales();
  return paginas.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pagina = await getPaginaLegal(slug);

  if (!pagina) return {};

  return {
    title: `${pagina.title} | Valhu Group`,
    description: pagina.resumen ?? undefined,
    alternates: process.env.NEXT_PUBLIC_SITE_URL
      ? { canonical: `/legales/${slug}` }
      : undefined,
  };
}

export default async function PaginaLegal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pagina = await getPaginaLegal(slug);

  if (!pagina) notFound();

  const otras = (await getPaginasLegales()).filter((p) => p.slug !== slug);

  return (
    <main className="w-full bg-[#EFF8FD]">
      <div className="mx-auto max-w-[1220px] px-4 pt-[24px] pb-[48px] md:px-8 md:pt-[40px]">
        <div className="mx-auto max-w-[760px]">
          <Link
            href="/"
            className="mb-[16px] inline-flex items-center gap-2 text-[14px] leading-[20px] text-[#525866] transition-colors hover:text-[#141821]"
          >
            <span aria-hidden="true">←</span>
            Volver al inicio
          </Link>

          <h1 className="mb-[12px] !text-[32px] !leading-[38px] md:!text-[44px] md:!leading-[52px]">
            {pagina.title}
          </h1>

          {pagina.updatedAt ? (
            <p className="mb-[32px] text-[14px] leading-[20px] text-[#77828C]">
              Última actualización:{' '}
              <time dateTime={toIsoDate(pagina.updatedAt)}>
                {formatPostDate(pagina.updatedAt)}
              </time>
            </p>
          ) : null}

          <PostBody content={pagina.content} />

          {otras.length > 0 ? (
            <div className="mt-[40px] flex flex-wrap gap-[10px] border-t border-[#E1E7EC] pt-[24px]">
              {otras.map((otra) => (
                <Link
                  key={otra.slug}
                  href={`/legales/${otra.slug}`}
                  className="rounded-[8px] border border-[#D0D5DD] bg-[#EFF8FD] px-[14px] py-[8px] text-[13px] leading-[18px] text-[#4D687B] transition-colors hover:bg-white hover:text-[#141821]"
                >
                  {otra.title}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
