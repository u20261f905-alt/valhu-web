'use client';

import { useState } from 'react';

/**
 * Botones para compartir la nota.
 *
 * Instagram no permite publicar un enlace desde la web (su API no expone un
 * "share url"), así que en su lugar ofrecemos copiar el enlace: es lo que la
 * persona necesita para pegarlo en una historia o en su bio.
 */
export default function CompartirNota({
  url,
  titulo,
}: {
  url: string;
  titulo: string;
}) {
  const [copiado, setCopiado] = useState(false);

  const codificada = encodeURIComponent(url);
  const tituloCodificado = encodeURIComponent(titulo);

  const redes = [
    {
      nombre: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${codificada}`,
      icono: (
        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.33-.04-1.55-.14-2.84-.14C12 2 10.5 3.66 10.5 6.7v2.8H8v4h2.5V22H14v-8.5Z" />
      ),
    },
    {
      nombre: 'X',
      href: `https://twitter.com/intent/tweet?url=${codificada}&text=${tituloCodificado}`,
      icono: (
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231ZM17.083 19.77h1.833L7.084 4.126H5.117Z" />
      ),
    },
    {
      nombre: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${codificada}`,
      icono: (
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.65h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.5 4.76 5.75V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.19 1.45-2.19 2.96V21h-4V9Z" />
      ),
    },
    {
      nombre: 'WhatsApp',
      href: `https://wa.me/?text=${tituloCodificado}%20${codificada}`,
      icono: (
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.17-1.36a9.93 9.93 0 0 0 4.87 1.24h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2Zm5.84 14.22c-.25.7-1.44 1.33-2 1.42-.51.08-1.16.11-1.87-.12a17 17 0 0 1-1.7-.63c-2.98-1.29-4.93-4.29-5.08-4.49-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.04-2.49.27-.3.6-.37.79-.37h.57c.18 0 .43-.7.67.51.25.6.84 2.07.91 2.22.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.3 2.36 1.45.3.15.47.13.65-.08.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.72.81 2.01.96.3.15.5.22.57.35.07.12.07.72-.18 1.42Z" />
      ),
    },
  ];

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2000);
    } catch {
      setCopiado(false);
    }
  };

  const estiloBoton =
    'inline-flex h-[40px] w-[40px] items-center justify-center rounded-[8px] border border-[#D0D5DD] bg-[#EFF8FD] text-[#4D687B] transition-colors hover:bg-white hover:text-[#141821] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141821]';

  return (
    <div className="mt-[32px] flex flex-wrap items-center gap-[12px]">
      <span className="text-[14px] leading-[20px] text-[#77828C]">
        Compartir
      </span>

      {redes.map((red) => (
        <a
          key={red.nombre}
          href={red.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Compartir en ${red.nombre}`}
          title={`Compartir en ${red.nombre}`}
          className={estiloBoton}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            {red.icono}
          </svg>
        </a>
      ))}

      {/* Instagram no acepta enlaces compartidos desde la web: copiar el
          enlace es la forma real de llevarlo a una historia o a la bio. */}
      <button
        type="button"
        onClick={copiar}
        aria-label="Copiar enlace de la nota"
        title="Copiar enlace"
        className={estiloBoton}
      >
        {copiado ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        )}
      </button>

      <span aria-live="polite" className="sr-only">
        {copiado ? 'Enlace copiado' : ''}
      </span>
    </div>
  );
}
