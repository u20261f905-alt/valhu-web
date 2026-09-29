import type { Metadata } from 'next';

import ServiceLanding from '@/app/components/ServiceLanding';
import { metadatosDePagina } from '@/lib/metadatos';

/** Los metadatos se escriben en el editor, en SEO → SEO por página. */
export async function generateMetadata(): Promise<Metadata> {
  return metadatosDePagina('branding', '/servicios/branding');
}

export default function BrandingPage() {
  return (
    <ServiceLanding
      variant="branding"
      eyebrow="Branding"
      title="Construimos marcas que no pasan"
      accent="inadvertidas."
      description="Definimos una identidad visual y verbal coherente para que tu marca conecte, se diferencie y crezca con claridad."
    />
  );
}
