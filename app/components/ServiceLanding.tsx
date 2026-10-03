import Link from 'next/link';
import Image from 'next/image';
import Cta from './Cta';
import Faq from './Faq';
import ServiceMotion from './ServiceMotion';
import ScrollTilt from './ScrollTilt';

type Props = { variant: 'branding' | 'ux'; eyebrow: string; title: string; accent: string; description: string };

function MediaPlaceholder({ label, dark = false, className = '' }: { label: string; dark?: boolean; className?: string }) {
  return <div data-service-media className={`flex items-center justify-center overflow-hidden rounded-[16px] border border-dashed ${dark ? 'border-white/25 bg-[#141821] text-white/55' : 'border-[#B8C4CC] bg-[#E6F1F7] text-[#667085]'} ${className}`}><span className="px-4 text-center text-[13px] uppercase tracking-[0.08em]">{label}</span></div>;
}

function Title({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return <div className={center ? 'mx-auto max-w-[820px] text-center' : 'max-w-[820px]'}><h2>{children}</h2></div>;
}

const brandMethod = [
  ['01', 'Análisis', 'Conocemos tu negocio, audiencia, contexto y oportunidades.'],
  ['02', 'Estrategia', 'Definimos posicionamiento, personalidad y concepto de marca.'],
  ['03', 'Diseño', 'Creamos propuestas visuales alineadas a la estrategia.'],
  ['04', 'Validación', 'Revisamos contigo y ajustamos hasta lograr la identidad ideal.'],
];

function BrandingContent() {
  return <>
    <section className="py-[48px]"><div className="mx-auto max-w-[1220px] px-4 md:px-8">
      <Title center>Marcas estratégicas, coherentes y <span className="font-accent">memorables</span></Title>
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        {[['01','Estrategia de marca','Definimos el propósito, posicionamiento y personalidad que guiarán cada expresión de tu marca.'],['02','Identidad visual','Traducimos la estrategia en un sistema visual reconocible, flexible y preparado para crecer.']].map(([n,t,b]) => <article key={n} className="rounded-[16px] border border-[#D0D5DD] bg-white/35 p-7 md:p-9"><p className="mb-10 text-[13px] text-[#969EB3]">{n}</p><h3 className="mb-3">{t}</h3><p className="text-[#525866]">{b}</p></article>)}
      </div>
    </div></section>

    <section className="py-[48px]"><div className="mx-auto max-w-[1220px] px-4 md:px-8">
      <Title center>Una identidad visual sólida, coherente y <span className="font-accent">adaptable</span></Title>
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <MediaPlaceholder label="Espacio para imagen de identidad de marca" dark className="min-h-[340px] lg:col-span-7 lg:min-h-[440px]" />
        <div className="divide-y divide-[#D0D5DD] lg:col-span-5">{[
          ['01','Logotipo y sistema visual','Una identidad reconocible que funciona en todos los formatos.'],['02','Manual de marca','Reglas claras para aplicar tu marca de forma consistente.'],['03','Tono de voz','Una personalidad verbal que conecta con tu audiencia.'],['04','Aplicaciones','Piezas preparadas para los puntos de contacto más importantes.']
        ].map(([n,t,b]) => <article key={n} className="grid grid-cols-[44px_1fr] gap-3 py-5 first:pt-0"><span className="font-accent text-[22px]">{n}</span><div><h4 className="mb-1">{t}</h4><p className="text-[14px] text-[#525866]">{b}</p></div></article>)}</div>
      </div>
    </div></section>

    <section className="bg-white/30 py-[48px]"><div className="mx-auto max-w-[1220px] px-4 md:px-8">
      <Title center>Nuestra <span className="font-accent">metodología</span></Title><p className="mx-auto mt-3 max-w-[720px] text-center text-[#525866]">Analizamos tu negocio a fondo para construir una marca diferenciada y con propósito.</p>
      <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{brandMethod.map(([n,t,b]) => <article key={n} className="min-h-[220px] rounded-[16px] bg-white p-6"><p className="mb-8 font-accent text-[28px]">{n}</p><h4 className="mb-2">{t}</h4><p className="text-[14px] text-[#525866]">{b}</p></article>)}</div>
    </div></section>

    <section id="proyectos" className="py-[48px]"><div className="mx-auto max-w-[1220px] px-4 md:px-8">
      <Title center>Nuestros <span className="font-accent">proyectos</span></Title><p className="mx-auto mt-3 max-w-[650px] text-center text-[#525866]">Una muestra de marcas que hemos construido junto a nuestros clientes.</p>
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2"><MediaPlaceholder label="Espacio para proyecto 01" className="min-h-[310px] bg-[#F7BE00] md:min-h-[390px]"/><MediaPlaceholder label="Espacio para proyecto 02" dark className="min-h-[310px] md:min-h-[390px]"/></div>
    </div></section>

    <section className="bg-white/30 py-[48px]"><div className="mx-auto grid max-w-[1220px] grid-cols-1 gap-10 px-4 md:px-8 lg:grid-cols-12">
      <div className="lg:col-span-5"><Title>Todo lo que <span className="font-accent">recibes</span></Title><p className="mt-4 max-w-[430px] text-[#525866]">Todos los archivos y lineamientos necesarios para aplicar tu marca con consistencia.</p></div>
      <div className="flex flex-wrap content-start gap-3 lg:col-span-7">{['Logotipo y variantes','Paleta de colores','Tipografías','Elementos gráficos','Manual de marca','Tono de voz','Plantillas para redes','Papelería','Archivos finales'].map(x => <span key={x} className="rounded-[8px] border border-[#D0D5DD] bg-[#EFF8FD] px-5 py-3 text-[14px]">{x}</span>)}</div>
    </div></section>
  </>;
}

function UxContent() {
  const audience = [['01','Startups','Que necesitan validar, diseñar o mejorar un producto digital.'],['02','Empresas','Que buscan optimizar plataformas, procesos y experiencias.'],['03','Equipos de producto','Que requieren apoyo especializado en UX/UI.']];
  const reasons = [['01','Diseño con propósito','Cada decisión responde a una necesidad real del usuario y del negocio.'],['02','Procesos colaborativos','Trabajamos contigo durante todo el proceso de diseño.'],['03','Resultados medibles','Creamos experiencias que mejoran adopción, conversión y retención.']];
  return <>
    <section className="py-[48px]"><div className="mx-auto max-w-[1220px] px-4 md:px-8"><Title center>¿Para quiénes es este <span className="font-accent">servicio?</span></Title><div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">{audience.map(([n,t,b]) => <article key={n} className="min-h-[220px] rounded-[16px] border border-[#D0D5DD] bg-white/35 p-7"><p className="mb-9 font-accent text-[28px]">{n}</p><h3 className="mb-2">{t}</h3><p className="text-[#525866]">{b}</p></article>)}</div></div></section>
    <section id="proyectos" className="py-[48px]"><div className="mx-auto max-w-[1220px] px-4 md:px-8"><Title center>Nuestros <span className="font-accent">proyectos</span></Title><div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2"><MediaPlaceholder label="Espacio para proyecto UX 01" className="min-h-[280px] bg-[#F7BE00] md:min-h-[340px]"/><MediaPlaceholder label="Espacio para proyecto UX 02" dark className="min-h-[280px] md:min-h-[340px]"/><MediaPlaceholder label="Espacio para proyecto UX 03" className="min-h-[280px] bg-[#F7BE00] md:min-h-[340px]"/><MediaPlaceholder label="Espacio para proyecto UX 04" className="min-h-[280px] md:min-h-[340px]"/></div></div></section>
    <section className="bg-white/30 py-[48px]"><div className="mx-auto max-w-[1220px] px-4 md:px-8"><Title center>¿Por qué diseñar tu producto con <span className="font-accent">Valhu?</span></Title><div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">{reasons.map(([n,t,b]) => <article key={n} className="rounded-[16px] bg-white p-7"><p className="mb-8 font-accent text-[28px]">{n}</p><h3 className="mb-2">{t}</h3><p className="text-[#525866]">{b}</p></article>)}</div></div></section>
  </>;
}

export default function ServiceLanding({ variant, eyebrow, title, accent, description }: Props) {
  return <main className="bg-[#EFF8FD]">
    <ServiceMotion key={variant}>
    <section className="w-full">
      <div className="mx-auto max-w-[1220px] px-4 pt-[24px] pb-[48px] md:px-8 md:pt-[40px] md:pb-[48px]">
        <div className="grid grid-cols-1 items-center gap-10 border-b border-[#E1E7EC] pb-[24px] md:pb-[40px] lg:grid-cols-12">
          <div className="lg:col-span-7 flex flex-col items-start">
          <p className="mb-3 text-[14px]/[18px] md:text-[16px]/[22px] uppercase underline decoration-[1px] decoration-[#969EB3] [text-underline-offset:2px] text-[#969EB3] font-normal inline-block">{eyebrow}</p>
          <h1 className="mb-[16px] md:mb-[20px] !text-[36px] !leading-[40px] md:!text-[64px] md:!leading-[72px]">
            {title} <span className="font-accent italic font-light">{accent}</span>
          </h1>
          <p className="text-[14px] md:text-[16px] text-[#485157] mb-[24px] max-w-[600px]">{description}</p>
          <div className="flex flex-col gap-[20px] w-full sm:w-auto sm:flex-row">
            <Link href="/contacto" className="inline-flex items-center justify-center gap-3 px-[20px] py-[16px] rounded-[8px] bg-[#141821] text-white text-[16px] font-semibold transition-colors hover:bg-[#2b3240]">Agenda una reunión</Link>
            <Link href="#proyectos" className="inline-flex items-center justify-center gap-3 px-[20px] py-[16px] rounded-[8px] border border-[#D0D7DD] bg-[#EFF8FD] text-[16px] font-semibold text-[#141821] transition-colors hover:bg-white">
              Ver proyectos
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.05317 5.80864L16.6169 14.568L16.7007 7.14383L17.6984 7.09145L17.5946 16.2833L8.40276 16.1794L8.47766 15.1832L15.9018 15.267L7.33812 6.50772L8.05317 5.80864Z" fill="currentColor" />
              </svg>
            </Link>
          </div>
        </div>
        <div data-service-media className="relative mx-auto aspect-square w-full max-w-[430px] lg:col-span-5">
          <Image
            src={`/services/${variant === 'branding' ? 'branding' : 'diseno-ux-ui'}/skyblue-sphere.webp`}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 430px, (min-width: 480px) 430px, calc(100vw - 32px)"
            className="object-contain"
          />
        </div>
        </div>
      </div>
    </section>
    {variant === 'branding' ? <BrandingContent/> : <UxContent/>}
    </ServiceMotion>
    <ScrollTilt from={16} to={-10} perspective={1100}><Cta/></ScrollTilt><Faq/>
  </main>;
}
