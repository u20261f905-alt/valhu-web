import type { Metadata } from 'next';

import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Cta from './components/Cta';
import Faq from './components/Faq';
import ScrollTilt from './components/ScrollTilt';
import DatosEstructurados from './components/DatosEstructurados';
import { getHomeContent, getImagenes } from '@/lib/contenido';
import { metadatosDePagina } from '@/lib/metadatos';
import { schemaPreguntas } from '@/lib/schema';

/** Los metadatos se escriben en el editor, en SEO → SEO por página. */
export async function generateMetadata(): Promise<Metadata> {
  return metadatosDePagina('home', '/');
}

export default async function Home() {
  const [contenido, imagenes] = await Promise.all([getHomeContent(), getImagenes()]);

  return (
    <main className="min-h-screen bg-[#EFF8FD]">
      {/* Las preguntas de abajo, declaradas para que Google pueda mostrarlas
          desplegables dentro del resultado de búsqueda. */}
      <DatosEstructurados datos={schemaPreguntas(contenido.faqs)} />

      <Hero content={contenido.hero} imagen={imagenes?.portada} />
      <Services content={contenido.services} imagenes={imagenes} />
      <About content={contenido.about} imagenes={imagenes} />
      <Faq content={contenido.faq} items={contenido.faqs} />

      {/* El banner entra inclinado, se endereza al pasar por el centro
          de la pantalla y se vuelve a inclinar al salir por arriba.
          Ángulos moderados para que no se sienta tambaleante. */}
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
