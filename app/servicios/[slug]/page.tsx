import Image from 'next/image';
import Link from 'next/link';

type Service = {
  title: string;
  description: string;
  image: string;
  tags: string[];
};

const services: Record<string, Service> = {
  'diseno-ux-ui': {
    title: 'Diseño UX/UI',
    description: 'Investigamos y diseñamos experiencias digitales claras, útiles y preparadas para crecer.',
    image: '/home/ux-design/diseno-ux-ui.webp',
    tags: ['Investigación', 'UX/UI', 'Prototipado'],
  },
  branding: {
    title: 'Branding',
    description: 'Construimos identidades de marca que conectan con las personas y diferencian tu negocio.',
    image: '/home/branding/branding-design.webp',
    tags: ['Estrategia', 'Identidad visual', 'Tono de voz'],
  },
};

export default async function ServicioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services[slug];

  if (!service) {
    return (
      <main className="mx-auto max-w-[1220px] px-4 py-24 text-center md:px-8">
        <h1 className="mb-4 text-[36px] leading-[40px] md:text-[48px] md:leading-[56px]">
          Servicio no encontrado
        </h1>
        <p className="mb-6 text-[#525866]">Este servicio todavía no está disponible.</p>
        <Link href="/" className="text-[#141821] underline underline-offset-4">
          Volver al inicio
        </Link>
      </main>
    );
  }

  return (
    <main>
      <section className="bg-[#EFF8FD] py-16">
        <div className="mx-auto max-w-[1220px] px-4 md:px-8">
          <Link href="/" className="mb-6 inline-block text-[#141821] underline underline-offset-4">
            ← Volver al inicio
          </Link>
          <h1 className="mb-4">{service.title}</h1>
          <p className="max-w-[700px] text-[#525866]">{service.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {service.tags.map((tag) => (
              <span key={tag} className="rounded-[8px] border border-[#D0D5DD] bg-white px-4 py-2 text-[14px]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#F5F6F9] py-10">
        <div className="mx-auto max-w-[1220px] px-4 md:px-8">
          <div className="relative h-[360px] overflow-hidden rounded-[16px] md:h-[560px]">
            <Image src={service.image} alt={service.title} fill priority className="object-cover" />
          </div>
        </div>
      </section>
    </main>
  );
}
