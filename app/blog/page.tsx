import type { Metadata } from 'next';

import { metadatosDePagina } from '@/lib/metadatos';

import BlogBanner from './components/BlogBanner';
import PostsGrid from './components/PostsGrid';
import Cta from '@/app/components/Cta';
import ScrollTilt from '@/app/components/ScrollTilt';
import { getPublishedPosts } from '@/lib/contenido';

/**
 * El listado se regenera cada 60 segundos: al publicar una nota nueva en
 * Supabase aparece sola, sin necesidad de volver a desplegar el sitio.
 */

/** Los metadatos se escriben en el editor, en SEO → SEO por página. */
export async function generateMetadata(): Promise<Metadata> {
  return metadatosDePagina('blog', '/blog');
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="w-full">
      <BlogBanner />

      <PostsGrid posts={posts} />

      {/* Mismo efecto que el CTA del Home: entra inclinado y se endereza. */}
      <ScrollTilt from={16} to={-10} perspective={1100}>
        <Cta esfera="/services/diseno-desarrollo-web/skyblue-sphere.webp" />
      </ScrollTilt>
    </main>
  );
}
