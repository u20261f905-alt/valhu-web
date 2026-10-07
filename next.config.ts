import type { NextConfig } from "next";

/**
 * El sitio se publica como archivos estáticos en Cloudflare.
 *
 * Para eso el build se corre con BUILD_ESTATICO=true, que activa tres cosas:
 *
 *  1. `output: 'export'`, que escribe el sitio entero en la carpeta `out/`.
 *  2. `images.unoptimized`, porque el optimizador de next/image necesita un
 *     servidor ejecutándose y aquí no hay ninguno. Las imágenes ya se exportan
 *     en WebP y al tamaño correcto, así que no se pierde nada.
 *  3. Un `pageExtensions` reducido, que deja fuera del build los archivos
 *     terminados en `.dev.tsx` / `.dev.ts`: el editor de contenidos y la
 *     herramienta de SEO, que solo tienen sentido en tu computadora.
 *
 * Sin esa variable, `npm run dev` y `npm run build` se comportan como siempre
 * y el editor sigue disponible en /keystatic.
 */
const estatico = process.env.BUILD_ESTATICO === "true";

const nextConfig: NextConfig = {
  ...(estatico ? { output: "export" as const } : {}),

  /** El botón flotante de Next en desarrollo estorba al revisar el diseño. */
  devIndicators: false,

  pageExtensions: estatico
    ? ["tsx", "ts", "jsx", "js"]
    : ["dev.tsx", "dev.ts", "tsx", "ts", "jsx", "js"],

  images: {
    unoptimized: estatico,

    /**
     * Dominios externos permitidos para next/image. Hoy no se usa ninguno,
     * pero si en el futuro traes imágenes de otro servicio, agrégalo aquí.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
