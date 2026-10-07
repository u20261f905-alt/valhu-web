import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * Página 404 del sitio.
 *
 * Mantiene el navbar y el footer (los pone el layout) y el mismo lenguaje
 * visual que el 404 del blog, para que un enlace roto no saque a la persona
 * del sitio.
 */

export const metadata: Metadata = {
  title: 'Página no encontrada | Valhu Group',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="w-full bg-[#EFF8FD]">
      <div className="mx-auto flex min-h-[520px] max-w-[1220px] flex-col items-start justify-center px-4 py-[64px] md:px-8">
        <span className="mb-3 text-[14px]/[18px] uppercase underline decoration-[1px] decoration-[#969EB3] [text-underline-offset:2px] text-[#969EB3] md:text-[16px]/[22px]">
          ERROR 404
        </span>

        <h1 className="mb-[16px] max-w-[760px] !text-[32px] !leading-[38px] md:!text-[52px] md:!leading-[60px]">
          Esta página no <span className="font-accent italic font-light">existe</span>
        </h1>

        <p className="mb-[24px] max-w-[560px] bg-transparent text-[14px] leading-[20px] text-[#485157] md:text-[16px]">
          Puede que la hayamos movido o que el enlace esté mal escrito. Desde
          aquí puedes volver al inicio, ver lo que hacemos o escribirnos
          directamente.
        </p>

        <div className="flex w-full flex-col gap-[20px] sm:w-auto sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 rounded-[8px] bg-[#141821] px-[20px] py-[16px] text-[16px] font-semibold text-white transition-colors hover:bg-[#2b3240]"
          >
            Volver al inicio
          </Link>

          <Link
            href="/servicios"
            className="inline-flex items-center justify-center gap-3 rounded-[8px] border border-[#D0D7DD] bg-[#EFF8FD] px-[20px] py-[16px] text-[16px] font-semibold text-[#141821] transition-colors hover:bg-white"
          >
            Ver servicios
          </Link>

          <Link
            href="/contacto"
            className="inline-flex items-center justify-center gap-3 rounded-[8px] border border-[#D0D7DD] bg-[#EFF8FD] px-[20px] py-[16px] text-[16px] font-semibold text-[#141821] transition-colors hover:bg-white"
          >
            Escríbenos
          </Link>
        </div>
      </div>
    </main>
  );
}
