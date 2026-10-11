import type { Metadata } from 'next';

import WebDesignBanner from './components/WebDesignBanner';
import PortfolioSlider from './components/PortfolioSlider';
import ContenidoServicioWeb from './components/ContenidoServicioWeb';
import Cta from '@/app/components/Cta';
import Faq from '@/app/components/Faq';
import ScrollTilt from '@/app/components/ScrollTilt';
import DatosEstructurados from '@/app/components/DatosEstructurados';
import { metadatosDePagina } from '@/lib/metadatos';
import { schemaPreguntas, schemaRuta, schemaServicio } from '@/lib/schema';

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
      'Una landing o una web inicial pueden estar listas en una o dos semanas. En una web con varias páginas, un ecommerce o un proyecto con funcionalidades a medida el tiempo puede extenderse. En la reunión inicial definimos qué necesitas realmente y recién ahí te damos un cronograma por etapas.',
  },
  {
    id: 'web-2',
    question: '¿Podré actualizar el contenido yo mismo?',
    answer:
      'Sí. Entregamos un panel donde cambias textos, imágenes, productos o publicaciones del blog sin tocar código ni depender de nosotros. Incluye una reunión de capacitación para que tu equipo lo use desde el primer día.',
  },
  {
    id: 'web-3',
    question: '¿El dominio y los accesos quedan a mi nombre?',
    answer:
      'Sí, desde el primer día. El dominio se registra a tu nombre y al entregar el proyecto recibes el código completo junto con las credenciales de todo lo que compone tu web.',
  },
  {
    id: 'web-4',
    question: '¿Voy a tener que pagar hosting todos los meses?',
    answer:
      'Tu web no vive en un hosting tradicional que alquilas para mantenerla encendida. Se publica sobre una red global donde, al inicio, tus costos de infraestructura son prácticamente nulos. Si el proyecto crece y necesita más capacidad siguen siendo muy bajos, y lo sabes desde antes de empezar.',
  },
  {
    id: 'web-5',
    question: '¿Trabajan con empresas fuera de Perú?',
    answer:
      'Sí. Trabajamos desde Lima con clientes en otros países y el proceso es el mismo, con reuniones por videollamada y seguimiento en un enlace privado durante todo el proyecto.',
  },
  {
    id: 'web-6',
    question: '¿Qué pasa después de entregar el proyecto?',
    answer:
      'Incluimos una reunión de capacitación del panel y treinta días de acompañamiento para resolver ajustes y dudas. Después puedes seguir con un plan de mantenimiento mensual o quedarte con la web funcionando por tu cuenta, es tuya con el código y los accesos completos.',
  },
];

export default async function DisenoDesarrolloWebPage() {
  // Lo que la página le declara a Google: qué servicio es, dónde está
  // parada dentro del sitio y cuáles son sus preguntas frecuentes.
  const servicio = await schemaServicio({
    nombre: 'Diseño y desarrollo web',
    descripcion:
      'Diseño y desarrollo de sitios web a medida: páginas corporativas, ecommerce y landing pages, rápidas, seguras y pensadas para convertir.',
    ruta: '/servicios/diseno-desarrollo-web',
    tipo: 'WebDesign',
  });

  const ruta = schemaRuta([
    { nombre: 'Inicio', ruta: '/' },
    { nombre: 'Servicios', ruta: '/servicios' },
    { nombre: 'Diseño y desarrollo web' },
  ]);

  return (
    <main className="w-full">
      <DatosEstructurados datos={servicio} />
      <DatosEstructurados datos={ruta} />
      <DatosEstructurados datos={schemaPreguntas(FAQS_WEB)} />

      <WebDesignBanner />
      <PortfolioSlider />
      <ContenidoServicioWeb />

      {/* Mismo efecto que el CTA del Home: entra inclinado, se endereza al
          pasar por el centro de la pantalla y se vuelve a inclinar al salir. */}
      <ScrollTilt from={16} to={-10} perspective={1100}>
        <Cta
          esfera="/services/diseno-desarrollo-web/skyblue-sphere.webp"
          titleLine1="¿Listo para transformar tus objetivos en"
        />
      </ScrollTilt>

      <Faq items={FAQS_WEB} />
    </main>
  );
}
