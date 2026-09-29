import type { Metadata } from 'next';

import Banner from './components/Banner';
import UseCases from './components/UseCases';
import StrategySection from './components/StrategySection';
import Cta from '@/app/components/Cta';
import Faq from './components/Faq';
import ScrollTilt from '@/app/components/ScrollTilt';
import { metadatosDePagina } from '@/lib/metadatos';

/** Los metadatos se escriben en el editor, en SEO → SEO por página. */
export async function generateMetadata(): Promise<Metadata> {
  return metadatosDePagina('ads', '/servicios/meta-ads');
}

export default function MetaAdsPage() {
  return (
    <main className="w-full">
      <Banner />
      <UseCases />
      <StrategySection />

      {/* Mismo efecto que el CTA del Home: entra inclinado, se endereza al
          pasar por el centro de la pantalla y se vuelve a inclinar al salir. */}
      <ScrollTilt from={16} to={-10} perspective={1100}>
        <Cta buttonText="Quiero escalar mis ventas" />
      </ScrollTilt>

      <Faq />
    </main>
  );
}
