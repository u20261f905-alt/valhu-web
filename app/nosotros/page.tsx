import type { Metadata } from 'next';

import { metadatosDePagina } from '@/lib/metadatos';

import NosotrosBanner from './components/NosotrosBanner';
import Manifiesto from './components/Manifiesto';
import Valores from './components/Valores';
import Proceso from './components/Proceso';
import Cta from '@/app/components/Cta';
import Faq from '@/app/components/Faq';
import ScrollTilt from '@/app/components/ScrollTilt';

/** Los metadatos se escriben en el editor, en SEO → SEO por página. */
export async function generateMetadata(): Promise<Metadata> {
  return metadatosDePagina('nosotros', '/nosotros');
}

export default function NosotrosPage() {
  return (
    <main className="w-full">
      <NosotrosBanner />

      <Manifiesto />

      <Valores />

      <Proceso />

      <Faq />

      {/* Mismo efecto que el CTA del Home: entra inclinado y se endereza. */}
      <ScrollTilt from={16} to={-10} perspective={1100}>
        <Cta />
      </ScrollTilt>
    </main>
  );
}
