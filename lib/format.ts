/**
 * Utilidades de formato sin dependencias.
 *
 * Viven en su propio archivo (y no en lib/posts.ts) para que los componentes
 * de cliente puedan usarlas sin arrastrar el cliente de Supabase al bundle
 * del navegador.
 */

/** Fecha legible en español: "12 de marzo de 2026". */
export function formatPostDate(value: string | null): string {
  if (!value) return '';

  return new Date(value).toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Lima',
  });
}

/** Fecha ISO para el atributo dateTime de <time>. */
export function toIsoDate(value: string | null): string | undefined {
  if (!value) return undefined;
  return new Date(value).toISOString();
}
