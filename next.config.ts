import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Dominios externos permitidos para next/image.
     *
     * Las portadas del blog pueden vivir en Supabase Storage. Si en el futuro
     * usas imágenes de otro servicio (Cloudinary, Unsplash, etc.), agrega aquí
     * su dominio; de lo contrario next/image las rechaza.
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
