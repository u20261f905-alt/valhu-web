import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { EDITOR_HABILITADO } from '@/lib/editor-habilitado';
import KeystaticApp from './keystatic';

export const metadata: Metadata = {
  title: 'Editor de contenidos | Valhu Group',
  robots: { index: false, follow: false },
};

/**
 * El editor se dibuja entero desde el layout, y las rutas de adentro no
 * aportan nada: así lo espera Keystatic, que maneja su propia navegación.
 */
export default function KeystaticLayout() {
  if (!EDITOR_HABILITADO) notFound();

  return <KeystaticApp />;
}
