import type { Metadata } from 'next';

import Cta from '../components/Cta';
import ScrollTilt from '../components/ScrollTilt';
import Services from '../components/Services';
import { getHomeContent, getImagenes } from '@/lib/contenido';
import { metadatosDePagina } from '@/lib/metadatos';

/**
 * Página de servicios.
 *
 * Reúne las cuatro tarjetas de servicio en una dirección propia. Hasta
 * ahora solo vivían como una sección de la home, a la que se llegaba por
 * un ancla: imposible de enlazar desde fuera y de indexar por separado.
 *
 * Usa el mismo contenido que la home, así que lo que se edite en el panel
 * se ve en los dos sitios a la vez y no hay dos textos que mantener.
 */

export async function generateMetadata(): Promise<Metadata> {
  return metadatosDePagina('servicios', '/servicios');
}

export default async function ServiciosPage() {
  const [contenido, imagenes] = await Promise.all([getHomeContent(), getImagenes()]);

  return (
    <main className="min-h-screen bg-[#EFF8FD]">
      <Services content={contenido.services} imagenes={imagenes} />

      <ScrollTilt from={16} to={-10} perspective={1100}>
        <Cta
          titleLine1={contenido.cta.titleLine1}
          titleHighlighted={contenido.cta.titleHighlighted}
          description={contenido.cta.description}
          buttonText={contenido.cta.buttonText}
          buttonLink={contenido.cta.buttonLink}
        />
      </ScrollTilt>
    </main>
  );
}
