import type { Metadata } from "next";

import "./globals.css";

import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

import SoloSitioPublico from "./components/SoloSitioPublico";
import DatosEstructurados from "./components/DatosEstructurados";

import { getAjustes } from "@/lib/contenido";
import { schemaOrganizacion } from "@/lib/schema";

/**
 * Dominio del sitio. Next.js lo usa para resolver las URLs absolutas de las
 * imágenes que se ven al compartir un enlace en redes (og:image).
 *
 * En producción define NEXT_PUBLIC_SITE_URL con el dominio real
 * (ej. https://valhugroup.com). Sin esa variable Next.js asume localhost y las
 * previsualizaciones al compartir salen rotas.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * Título y descripción de respaldo: los usa cualquier página que no tenga
 * los suyos escritos en el editor.
 */
export async function generateMetadata(): Promise<Metadata> {
  const ajustes = await getAjustes();

  return {
    metadataBase: new URL(siteUrl),
    title: ajustes?.siteName
      ? `${ajustes.siteName} | Agencia de Innovación & UX Design`
      : "Valhu Group | Agencia de Innovación & UX Design",
    description:
      ajustes?.defaultDescription ||
      "Sumérgete en nuestro mundo de tecnología, marketing e innovación.",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // La ficha de la empresa viaja en todas las páginas: así Google la
  // reconoce como la misma organización en cualquier punto de entrada.
  const organizacion = await schemaOrganizacion();

  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased bg-[#EFF8FD] text-[#141821]">
       <DatosEstructurados datos={organizacion} />

       {/* El editor de contenidos (/keystatic) y la revisión de SEO tienen
           su propia interfaz, así que el navbar, el footer y el degradado
           inferior solo se muestran en el sitio público. */}
       <SoloSitioPublico>
        <Navbar />
       </SoloSitioPublico>

        {children}

       <SoloSitioPublico>
        <Footer />

        <div className="bottom-page-blur" aria-hidden="true">
         <div className="blur-layer blur-layer-1" />
         <div className="blur-layer blur-layer-2" />
         <div className="blur-layer blur-layer-3" />
         <div className="blur-layer blur-layer-4" />
        </div>
       </SoloSitioPublico>
      </body>
    </html>
  );
}
