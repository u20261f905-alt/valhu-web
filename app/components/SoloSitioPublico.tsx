'use client';

import { usePathname } from 'next/navigation';

/** Rutas que se dibujan solas, sin el navbar ni el footer del sitio. */
const HERRAMIENTAS = ['/keystatic', '/seo'];

/**
 * Oculta lo que envuelve cuando estamos dentro de una herramienta interna.
 *
 * El editor de contenidos trae su propia interfaz completa: mostrar encima el
 * navbar y el footer del sitio público lo haría confuso y ocuparía espacio de
 * trabajo.
 */
export default function SoloSitioPublico({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (HERRAMIENTAS.some((ruta) => pathname?.startsWith(ruta))) return null;

  return <>{children}</>;
}
