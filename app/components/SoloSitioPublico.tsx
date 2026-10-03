'use client';

import { usePathname } from 'next/navigation';

/** Rutas que se dibujan solas, sin el navbar ni el footer del sitio. */
const HERRAMIENTAS = ['/keystatic', '/seo', '/contacto'];

/**
 * Oculta lo que envuelve en las pantallas que se dibujan solas.
 *
 * El editor de contenidos trae su propia interfaz completa. Y el formulario
 * de contacto se deja sin menú a propósito: quien llegó hasta ahí ya decidió
 * escribirnos, y cada enlace de salida es una oportunidad de distraerse.
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
