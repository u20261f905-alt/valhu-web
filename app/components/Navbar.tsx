'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';

const SERVICIOS = [
  { href: '/servicios/diseno-desarrollo-web', label: 'Diseño y desarrollo web' },
  { href: '/servicios/meta-ads', label: 'Meta Ads' },
  { href: '/servicios/diseno-ux-ui', label: 'Diseño UX' },
  { href: '/servicios/branding', label: 'Branding' },
];

// Separación visual entre el navbar y el panel del dropdown.
// El "puente" invisible ocupa exactamente este espacio.
const DROPDOWN_GAP = 40;
const DROPDOWN_WIDTH = 300;

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Posición calculada a partir del botón "Servicios".
  // triggerBottom = borde inferior del botón (donde arranca el puente)
  // left = centro horizontal del botón (botón, puente y dropdown comparten este centro)
  const [pos, setPos] = useState({ triggerBottom: 0, left: 0 });

  const triggerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Calcula dónde debe aparecer el dropdown, centrado bajo el botón "Servicios"
  const updatePosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      triggerBottom: rect.bottom,
      left: rect.left + rect.width / 2, // centro del botón
    });
  }, []);

  // Abre el dropdown cancelando cualquier cierre pendiente
  const openServices = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    updatePosition();
    setIsServicesOpen(true);
  }, [updatePosition]);

  // Cierra con un pequeño retardo, para poder mover el mouse
  // desde el botón hasta el panel sin que se cierre en el camino
  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setIsServicesOpen(false), 120);
  }, []);

  // Mientras esté abierto, seguimos la posición en scroll y resize
  useEffect(() => {
    if (!isServicesOpen) return;

    const handle = () => updatePosition();
    window.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('resize', handle);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsServicesOpen(false);
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('scroll', handle);
      window.removeEventListener('resize', handle);
      window.removeEventListener('keydown', handleKey);
    };
  }, [isServicesOpen, updatePosition]);

  // Limpieza del timer al desmontar
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  // ---- DROPDOWN + PUENTE (se montan en el body, NO dentro del header) ----
  // El puente es un div invisible que cubre exactamente el espacio (DROPDOWN_GAP)
  // entre el botón y el panel. Al tener onMouseEnter/onMouseLeave igual que el
  // botón y el panel, el hover queda "conectado" sin huecos: el mouse nunca pasa
  // por una zona sin listener mientras baja del botón al dropdown.
  const dropdown =
    isServicesOpen
      ? createPortal(
          <>
            {/* Puente invisible: mismo ancho/centro que el panel */}
            <div
              onMouseEnter={openServices}
              onMouseLeave={scheduleClose}
              style={{
                position: 'fixed',
                top: pos.triggerBottom,
                left: pos.left,
                width: DROPDOWN_WIDTH,
                height: DROPDOWN_GAP,
                transform: 'translateX(-50%)',
              }}
              className="z-[100]"
            />

            {/* Panel del dropdown, separado del navbar por DROPDOWN_GAP */}
            <div
              role="menu"
              onMouseEnter={openServices}
              onMouseLeave={scheduleClose}
              style={{
                position: 'fixed',
                top: pos.triggerBottom + DROPDOWN_GAP,
                left: pos.left,
                width: DROPDOWN_WIDTH,
                transform: 'translateX(-50%)',
              }}
              className="
                z-[100]
                p-2
                rounded-[14px]
                bg-white/40
                backdrop-blur-xl
                backdrop-saturate-150
                border border-white/60
                shadow-[0_12px_35px_rgba(20,24,33,0.12)]
              "
            >
              {SERVICIOS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsServicesOpen(false)}
                  className="
                    block
                    px-4
                    py-2.5
                    rounded-lg
                    text-[#141821]
                    text-[14px]
                    leading-[22px]
                    font-normal
                    transition-all
                    hover:bg-white/40
                    hover:font-semibold
                  "
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </>,
          document.body
        )
      : null;

  return (
    <>
      <header
        className={`w-full sticky top-0 z-50 transition-all duration-700 ease-out
          bg-[#EFF8FD]/60 backdrop-blur
          ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        <div className="max-w-[1220px] mx-auto px-4 md:px-8 py-[20px] flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Valhu Logo"
              width={120}
              height={30}
              priority
              className="w-[120px] h-[30px] object-contain"
            />
          </Link>

          {/* NAVEGACIÓN DESKTOP */}
          <nav className="hidden md:flex items-center gap-[40px]">

            {/* INICIO */}
            <Link
              href="/"
              className="text-[16px] leading-[22px] text-[#141821] font-normal transition-all hover:font-semibold"
            >
              Inicio
            </Link>

            {/* NOSOTROS */}
            <Link
              href="/nosotros"
              className="text-[16px] leading-[22px] text-[#141821] font-normal transition-all hover:font-semibold"
            >
              Nosotros
            </Link>

            {/* SERVICIOS */}
            <div
              ref={triggerRef}
              className="relative py-2"
              onMouseEnter={openServices}
              onMouseLeave={scheduleClose}
            >
              {/* El texto lleva a la página de servicios; la flecha solo
                  abre y cierra la lista. Así quien busca el panorama
                  completo entra, y quien va a un servicio concreto lo
                  elige, sin que un gesto pise al otro. */}
              <div className="flex items-center gap-1.5">
                <Link
                  href="/servicios"
                  className="text-[16px] leading-[22px] text-[#141821] font-normal transition-all hover:font-semibold"
                  onClick={() => setIsServicesOpen(false)}
                >
                  Servicios
                </Link>

                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={isServicesOpen}
                  aria-label={isServicesOpen ? 'Cerrar lista de servicios' : 'Ver lista de servicios'}
                  className="flex items-center text-[#141821] focus:outline-none"
                  onClick={() =>
                    isServicesOpen ? setIsServicesOpen(false) : openServices()
                  }
                >
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isServicesOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* BLOG */}
            <Link
              href="/blog"
              className="text-[16px] leading-[22px] text-[#141821] font-normal transition-all hover:font-semibold"
            >
              Blog
            </Link>

            {/* CTA */}
            <Link
              href="/contacto"
              className="bg-[#141821] text-white rounded-[8px] p-[16px] text-[16px] leading-[22px] font-medium hover:bg-opacity-90 transition-all text-center inline-block"
            >
              Agenda una reunión
            </Link>
          </nav>

          {/* BOTÓN MENÚ HAMBURGUESA MOBILE */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
            aria-label="Abrir Menú"
          >
            <span
              className={`block w-6 h-[2px] bg-[#141821] transition-transform duration-300 ${
                isOpen ? 'rotate-45 translate-y-[8px]' : ''
              }`}
            />

            <span
              className={`block w-6 h-[2px] bg-[#141821] transition-opacity duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />

            <span
              className={`block w-6 h-[2px] bg-[#141821] transition-transform duration-300 ${
                isOpen ? '-rotate-45 -translate-y-[8px]' : ''
              }`}
            />
          </button>
        </div>

        {/* MENÚ MOBILE */}
        {isOpen && (
          <nav className="md:hidden bg-[#EFF8FD]/80 backdrop-blur px-6 pb-6 pt-2 flex flex-col space-y-4 shadow-lg">

            {/* INICIO */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-[16px] leading-[22px] text-[#141821] font-normal transition-all hover:font-semibold"
            >
              Inicio
            </Link>

            {/* NOSOTROS */}
            <Link
              href="/nosotros"
              onClick={() => setIsOpen(false)}
              className="text-[16px] leading-[22px] text-[#141821] font-normal transition-all hover:font-semibold"
            >
              Nosotros
            </Link>

            {/* SERVICIOS MOBILE */}
            <div className="flex flex-col">

              {/* Igual que en escritorio: el nombre lleva a la página y la
                  flecha despliega. En el móvil, además, cada zona táctil
                  queda bien separada de la otra. */}
              <div className="flex items-center justify-between">
                <Link
                  href="/servicios"
                  onClick={() => setIsOpen(false)}
                  className="text-[16px] leading-[22px] text-[#141821] font-normal transition-all hover:font-semibold"
                >
                  Servicios
                </Link>

                <button
                  type="button"
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  aria-expanded={isMobileServicesOpen}
                  aria-label={isMobileServicesOpen ? 'Cerrar lista de servicios' : 'Ver lista de servicios'}
                  className="flex items-center justify-end py-1 pl-6 text-[#141821]"
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isMobileServicesOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {isMobileServicesOpen && (
                <div className="pl-4 pt-2 flex flex-col space-y-2">
                  {SERVICIOS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-[14px] leading-[22px] text-[#141821]/80 font-normal transition-all hover:font-semibold"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* BLOG */}
            <Link
              href="/blog"
              onClick={() => setIsOpen(false)}
              className="text-[16px] leading-[22px] text-[#141821] font-normal transition-all hover:font-semibold"
            >
              Blog
            </Link>

            {/* CTA MOBILE */}
            <Link
              href="/contacto"
              onClick={() => setIsOpen(false)}
              className="bg-[#141821] text-white rounded-[8px] p-[16px] text-[16px] leading-[22px] font-medium text-center transition-all hover:bg-opacity-90"
            >
              Agenda una reunión
            </Link>

          </nav>
        )}

        {/* LÍNEA INFERIOR */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#EFF8FD]/50 pointer-events-none" />

      </header>

      {/* El dropdown vive fuera del header, en el body */}
      {dropdown}
    </>
  );
}
