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

/** Preguntas propias de esta página: evitan repetir el FAQ del home. */
const FAQS_WEB = [
  {
    id: 'web-1',
    question: '¿Cuánto tiempo toma desarrollar una web?',
    answer:
      'Una web corporativa de 5 a 7 secciones toma entre 4 y 6 semanas desde la aprobación del diseño. Un ecommerce o un proyecto con funcionalidades a medida puede extenderse a 8 o 10. En la reunión inicial definimos el alcance real y te damos un cronograma por etapas, no una fecha suelta.',
  },
  {
    id: 'web-2',
    question: '¿Podré actualizar el contenido yo mismo?',
    answer:
      'Sí. Entregamos un panel de administración donde cambias textos, imágenes, productos o publicaciones del blog sin tocar código ni depender de nosotros. Te dejamos una sesión de capacitación grabada para que tu equipo lo use desde el primer día.',
  },
  {
    id: 'web-3',
    question: '¿La web va a estar optimizada para Google?',
    answer:
      'Desde la estructura. Trabajamos la arquitectura de URLs, los metadatos, los datos estructurados, la velocidad de carga y la versión móvil como parte del desarrollo, no como un servicio aparte que se agrega después.',
  },
  {
    id: 'web-4',
    question: '¿Qué pasa después de entregar el proyecto?',
    answer:
      'Incluimos un periodo de acompañamiento para resolver ajustes y dudas. Después puedes seguir con un plan de mantenimiento mensual o quedarte con la web funcionando por tu cuenta — es tuya, con el código y los accesos completos.',
  },
];

export default function DisenoDesarrolloWebPage() {
  return (
    <main className="w-full">
      <WebDesignBanner />
      <PortfolioSlider />
      <ServicesShowcase />

      {/* Mismo efecto que el CTA del Home: entra inclinado, se endereza al
          pasar por el centro de la pantalla y se vuelve a inclinar al salir. */}
      <ScrollTilt from={16} to={-10} perspective={1100}>
        <Cta esfera="/services/diseno-desarrollo-web/skyblue-sphere.webp" />
      </ScrollTilt>

      <Faq items={FAQS_WEB} />
    </main>
  );
}
