import type { Metadata } from 'next';

import WebDesignBanner from './components/WebDesignBanner';
import PortfolioSlider from './components/PortfolioSlider';
import ServicesShowcase from './components/ServicesShowcase';
import Cta from '@/app/components/Cta';
import Faq from '@/app/components/Faq';
import ScrollTilt from '@/app/components/ScrollTilt';
import { metadatosDePagina } from '@/lib/metadatos';

/** Los metadatos se escriben en el editor, en SEO → SEO por página. */
export async function generateMetadata(): Promise<Metadata> {
  return metadatosDePagina('web', '/servicios/diseno-desarrollo-web');
}

export default function DisenoDesarrolloWebPage() {
  return (
    <main className="w-full">
      <WebDesignBanner />
      <PortfolioSlider />
      <ServicesShowcase />

      {/* Mismo efecto que el CTA del Home: entra inclinado, se endereza al
          pasar por el centro de la pantalla y se vuelve a inclinar al salir. */}
      <ScrollTilt from={16} to={-10} perspective={1100}>
        <Cta />
      </ScrollTilt>

      <Faq />
    </main>
  );
}
