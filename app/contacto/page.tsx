import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getFormulario } from "@/lib/contenido";
import { metadatosDePagina } from "@/lib/metadatos";
import FormularioContacto from "./FormularioContacto";

/**
 * Página de contacto.
 *
 * Se dibuja sin el menú del sitio: quien llegó hasta aquí ya decidió
 * escribirnos, y cada enlace de salida es una oportunidad de distraerse.
 * Queda solo el logo y una salida clara hacia el inicio.
 */

export async function generateMetadata(): Promise<Metadata> {
  return metadatosDePagina("contacto", "/contacto");
}

export default async function ContactoPage() {
  const textos = await getFormulario();

  return (
    <div className="flex min-h-screen flex-col bg-[#EFF8FD]">
      {/* Cabecera mínima */}
      <header className="flex items-center justify-between px-4 py-[18px] md:px-8">
        <Link
          href="/"
          aria-label="Valhu Group — ir al inicio"
          className="inline-flex"
        >
          <Image
            src="/logo.svg"
            alt="Valhu Group"
            width={118}
            height={26}
            priority
          />
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-[8px] border border-[#D0D5DD] bg-transparent px-[16px] py-[10px] text-[14px] font-medium text-[#141821] transition-colors hover:bg-white"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Volver al inicio
        </Link>
      </header>

      {/* El formulario queda centrado en la pantalla, sea cual sea su alto */}
      <main className="flex flex-1 items-center justify-center px-4 py-[32px] md:px-8">
        <div className="w-full max-w-[620px]">
          <FormularioContacto
            textos={textos}
            encabezado={
              <>
                <div className="mb-[26px] text-center">
                  <h1 className="mb-[12px] !text-[28px] !leading-[34px] md:!text-[34px] md:!leading-[41px]">
                    Cuéntanos de tu proyecto
                  </h1>

                  <p className="mx-auto max-w-[520px] bg-transparent text-[15px] leading-[23px] text-[#525866]">
                    {textos.intro}
                  </p>

                  {textos.nota ? (
                    <p className="mx-auto mt-[10px] max-w-[460px] bg-transparent font-accent text-[15px] italic leading-[22px] text-[#1B3F7D]">
                      {textos.nota}
                    </p>
                  ) : null}
                </div>
              </>
            }
          />

          <p className="mt-[18px] bg-transparent text-center text-[13px] leading-[20px] text-[#77828C]">
            ¿Prefieres escribirnos directo?{" "}
            <a
              href="mailto:info@valhugroup.com"
              className="text-[#1B3F7D] underline underline-offset-[3px]"
            >
              info@valhugroup.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
