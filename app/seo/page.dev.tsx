import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getNotasParaSeo } from '@/lib/contenido';
import { analizarSeo, type Analisis } from '@/lib/seo-analisis';

/**
 * Revisión de SEO de todo el blog.
 *
 * Una tabla con cada nota, su puntaje y qué le falta. Está pensada para
 * revisarla después de escribir, no mientras escribes.
 *
 * Solo se muestra mientras trabajas en tu computadora. Para tenerla también
 * en la web publicada hay que poner NEXT_PUBLIC_MOSTRAR_SEO=1.
 */

export const metadata: Metadata = {
  title: 'Revisión de SEO | Valhu Group',
  robots: { index: false, follow: false },
};

const VISIBLE =
  process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_MOSTRAR_SEO === '1';

function colorDelNivel(nivel: Analisis['nivel']) {
  switch (nivel) {
    case 'excelente':
      return { fondo: '#E3F3E8', texto: '#256B3C', etiqueta: 'Excelente' };
    case 'bueno':
      return { fondo: '#E8F1E4', texto: '#3D6B2B', etiqueta: 'Bueno' };
    case 'regular':
      return { fondo: '#FBF1DD', texto: '#8A6220', etiqueta: 'Regular' };
    case 'malo':
      return { fondo: '#FDECEC', texto: '#A03030', etiqueta: 'Flojo' };
    default:
      return { fondo: '#EEF2F5', texto: '#77828C', etiqueta: 'Sin búsqueda objetivo' };
  }
}

export default async function RevisionSeoPage() {
  if (!VISIBLE) notFound();

  const notas = await getNotasParaSeo();
  const analizadas = notas.map((n) => ({ ...n, analisis: analizarSeo(n.entrada) }));

  const conKeyword = analizadas.filter((n) => n.analisis.nivel !== 'sin-keyword');
  const promedio =
    conKeyword.length > 0
      ? Math.round(
          conKeyword.reduce((t, n) => t + n.analisis.puntaje, 0) / conKeyword.length
        )
      : null;

  return (
    <main className="min-h-screen bg-[#F4F7FA] px-4 py-[40px] md:px-8">
      <div className="mx-auto max-w-[900px]">
        <div className="mb-[28px] flex flex-wrap items-end justify-between gap-[16px]">
          <div>
            <h1 className="mb-[6px] !text-[28px] !leading-[34px]">Revisión de SEO</h1>
            <p className="max-w-[560px] bg-transparent text-[14px] leading-[21px] text-[#525866]">
              El estado de cada nota del blog. Para que una nota se pueda
              evaluar tiene que tener una búsqueda objetivo escrita en su
              pestaña de SEO.
            </p>
          </div>

          {promedio !== null ? (
            <div className="rounded-[12px] border border-[#E1E7EC] bg-white px-[18px] py-[12px] text-center">
              <span className="block text-[26px] font-semibold leading-[30px] text-[#141821]">
                {promedio}
              </span>
              <span className="block text-[12px] text-[#77828C]">promedio</span>
            </div>
          ) : null}
        </div>

        {analizadas.length === 0 ? (
          <p className="rounded-[16px] border border-[#E1E7EC] bg-white px-[20px] py-[36px] text-center text-[14px] text-[#77828C]">
            Todavía no hay notas.
          </p>
        ) : null}

        <div className="flex flex-col gap-[14px]">
          {analizadas.map((nota) => {
            const { analisis } = nota;
            const color = colorDelNivel(analisis.nivel);
            const fallan = analisis.comprobaciones.filter((c) => !c.cumple);

            return (
              <article
                key={nota.slug}
                className="rounded-[16px] border border-[#E1E7EC] bg-white p-[20px]"
              >
                <div className="mb-[12px] flex flex-wrap items-start justify-between gap-[12px]">
                  <div className="min-w-[240px] flex-1">
                    <h2 className="mb-[4px] !text-[16px] !leading-[22px] font-semibold">
                      {nota.title}
                    </h2>
                    <p className="bg-transparent text-[12px] leading-[18px] text-[#77828C]">
                      /blog/{nota.slug}
                      {nota.status === 'draft' ? ' · borrador' : ''}
                      {nota.entrada.keyword ? ` · "${nota.entrada.keyword}"` : ''}
                      {` · ${nota.entrada.palabras} palabras`}
                    </p>
                  </div>

                  <span
                    className="shrink-0 rounded-[8px] px-[12px] py-[7px] text-[13px] font-semibold"
                    style={{ backgroundColor: color.fondo, color: color.texto }}
                  >
                    {analisis.nivel === 'sin-keyword'
                      ? color.etiqueta
                      : `${analisis.puntaje} / 100 · ${color.etiqueta}`}
                  </span>
                </div>

                {analisis.nivel === 'sin-keyword' ? (
                  <p className="bg-transparent text-[13px] leading-[20px] text-[#77828C]">
                    Escribe la búsqueda objetivo en el editor, dentro del bloque
                    de SEO de esta nota, y aquí aparecerá su puntaje.
                  </p>
                ) : fallan.length === 0 ? (
                  <p className="bg-transparent text-[13px] leading-[20px] text-[#256B3C]">
                    Cumple las ocho comprobaciones. No hay nada que corregir.
                  </p>
                ) : (
                  <ul className="flex flex-col gap-[7px]">
                    {fallan.map((c) => (
                      <li
                        key={c.id}
                        className="bg-transparent text-[13px] leading-[19px] text-[#525866]"
                      >
                        <span className="font-medium text-[#141821]">{c.texto}</span>
                        {' — '}
                        {c.consejo}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>

        <p className="mt-[24px] bg-transparent text-[13px] leading-[20px] text-[#77828C]">
          Las notas se editan en{' '}
          <Link href="/keystatic" className="text-[#1B3F7D] underline underline-offset-[3px]">
            el editor de contenidos
          </Link>
          . Después de guardar, recarga esta página para ver el puntaje nuevo.
        </p>
      </div>
    </main>
  );
}
