'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import AnimatedRichText from '@/app/components/AnimatedRichText';

gsap.registerPlugin(ScrollTrigger);

/**
 * Cuerpo de contenido de la página de Diseño y Desarrollo Web.
 *
 * Sigue la estructura definida en Figma ("Interna diseño y desarrollo web").
 * Cada sección tiene su propia forma —dos columnas, cuadrícula, tarjetas,
 * bloque oscuro— porque con nueve secciones del mismo formato la página se
 * leía como un muro de texto.
 *
 * Los encabezados están escritos en modo descriptivo, con la búsqueda
 * dentro, salvo el de cierre, que es el remate emocional de la página.
 *
 * Las tres imágenes todavía no existen: quedan como marcos vacíos con el
 * color de fondo de las tarjetas, listos para recibir el <Image />.
 */

/* ------------------------------------------------------------------ */
/*  Piezas sueltas                                                     */
/* ------------------------------------------------------------------ */

/** La parte del título que va en la tipografía de acento. */
function Acento({ children }: { children: React.ReactNode }) {
  return <span className="font-accent italic font-light">{children}</span>;
}

/** Fragmento resaltado dentro de un párrafo. */
function Fuerte({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-[#141821]">{children}</strong>;
}

/**
 * Título de sección.
 *
 * El texto lleva las marcas de siempre: *acento* en la tipografía en
 * cursiva. Se parte en palabras para que GSAP las revele una por una,
 * igual que en el resto del sitio.
 */
function Titulo({
  texto,
  prefijo,
  className = '',
}: {
  texto: string;
  prefijo: string;
  className?: string;
}) {
  return (
    <h2
      className={`flex flex-wrap content-start gap-x-[10px] text-[28px] leading-[34px] text-[#141821] md:text-[38px] md:leading-[44px] lg:text-[48px] lg:leading-[56px] ${className}`}
    >
      <AnimatedRichText texto={texto} claseAnimacion="vw-palabra" prefijo={prefijo} />
    </h2>
  );
}

function Parrafo({ children }: { children: React.ReactNode }) {
  return (
    <p className="vw-fade invisible text-[15px] leading-[24px] text-[#485157] md:text-[16px] md:leading-[26px]">
      {children}
    </p>
  );
}

/** Contenedor de sección. Cada una abre solo su espacio superior. */
function Seccion({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`vw-seccion w-full bg-[#EFF8FD] pt-[40px] pb-0 md:pt-[48px] lg:pt-[64px] ${className}`}
    >
      <div className="mx-auto max-w-[1220px] px-4 md:px-8">{children}</div>
    </section>
  );
}

/** Flecha diagonal de los enlaces de tarjeta. */
function FlechaDiagonal() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="9 7 17 7 17 15" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Datos                                                              */
/* ------------------------------------------------------------------ */

const INCLUYE = [
  {
    numero: '01',
    titulo: <>Tienes <Acento>todos los accesos</Acento></>,
    texto:
      'El dominio se registra a tu nombre desde el primer día. Al terminar recibes el código completo y las credenciales de todo lo que compone tu web. Es tuya, sin intermediarios.',
  },
  {
    numero: '02',
    titulo: <><Acento>Editas tu contenido</Acento> sin romper nada</>,
    texto:
      'Entregamos un panel hecho a la medida de tu contenido. Cambias textos, imágenes y productos sin tocar código y sin descuadrar el diseño.',
  },
  {
    numero: '03',
    titulo: <>Tu web sale <Acento>lista para Google</Acento></>,
    texto:
      'La estructura, las URLs, los metadatos y la velocidad se trabajan durante el desarrollo, no como un servicio aparte que se contrata después.',
  },
  {
    numero: '04',
    titulo: <><Acento>Te acompañamos</Acento> después de publicar</>,
    texto:
      'Una reunión de capacitación del panel y treinta días de acompañamiento con el sitio ya en marcha.',
  },
];

/** Iconos de las tarjetas de proyecto. Trazo de 1.4, como el resto del sitio. */
const ICONOS = {
  landing: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="7" y1="13" x2="14" y2="13" />
      <line x1="7" y1="16.5" x2="11" y2="16.5" />
    </>
  ),
  corporativa: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="3" y1="8" x2="21" y2="8" />
      <rect x="6" y="11" width="6" height="6" rx="1" />
      <line x1="14.5" y1="12" x2="18" y2="12" />
      <line x1="14.5" y1="15" x2="18" y2="15" />
    </>
  ),
  ecommerce: (
    <>
      <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.4a2 2 0 0 0 2-1.5L20.5 8H6" />
      <circle cx="9.5" cy="19" r="1.3" />
      <circle cx="17" cy="19" r="1.3" />
    </>
  ),
  software: (
    <>
      <polyline points="9 8 5 12 9 16" />
      <polyline points="15 8 19 12 15 16" />
    </>
  ),
};

const PROYECTOS = [
  {
    icono: ICONOS.landing,
    titulo: 'Diseño de landing pages para campañas',
    texto:
      'Una página con un solo objetivo, que la persona deje sus datos o compre. Es lo que necesitas si vas a invertir en pauta, y el proyecto más rápido de entregar.',
  },
  {
    icono: ICONOS.corporativa,
    titulo: 'Diseño de páginas web corporativas',
    texto:
      'Tu sitio institucional, entre cinco y diez páginas, con blog y formularios conectados a tu correo. Para muchos clientes es el primer contacto real con tu empresa.',
  },
  {
    icono: ICONOS.ecommerce,
    titulo: 'Desarrollo de tiendas online y ecommerce',
    texto:
      'Catálogo, carrito y pasarela de pago con Culqi, Mercado Pago, Izipay o Niubiz. Administras productos, stock y recibes pedidos desde un solo lugar.',
  },
  {
    icono: ICONOS.software,
    titulo: 'Desarrollo de software a medida',
    texto:
      'Plataformas, paneles internos y sistemas que tu operación necesita y ningún producto estándar resuelve. Se diseñan y construyen según tu flujo de trabajo.',
  },
];

const PROCESO = [
  {
    titulo: 'Una especialista a cargo de tu proyecto',
    texto:
      'De la primera reunión a la entrega, con un product designer que supervisa a detalle las etapas de diseño y programación del proyecto.',
  },
  {
    titulo: 'Sabes qué recibes antes de empezar',
    texto:
      'De la investigación inicial sale un alcance cerrado, una dirección de diseño y un cronograma por etapas. Nada queda sujeto a interpretación.',
  },
  {
    titulo: 'Ves tu web funcionando, no una imagen de ella',
    texto:
      'Revisas tu web real en el navegador, con sus animaciones y su comportamiento en celular. Navegas por ella antes de que esté terminada.',
  },
  {
    titulo: 'Construimos y entregamos',
    texto:
      'Completamos funcionalidades, optimizamos y probamos en dispositivos reales. Sigues el avance en un enlace privado durante todo el proceso.',
  },
];

/* ------------------------------------------------------------------ */
/*  Contenido                                                          */
/* ------------------------------------------------------------------ */

export default function ContenidoServicioWeb() {
  const contenedorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Una línea de tiempo por sección, disparada cuando entra en pantalla.
      // Misma gramática que el resto del sitio: las palabras del título se
      // revelan desenfocadas una por una y el contenido entra con un
      // fundido corto desde abajo.
      gsap.utils.toArray<HTMLElement>('.vw-seccion').forEach((seccion) => {
        const palabras = seccion.querySelectorAll('.vw-palabra');
        const bloques = seccion.querySelectorAll('.vw-fade');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: seccion,
            start: 'top 80%',
            once: true,
          },
        });

        if (palabras.length > 0) {
          tl.fromTo(
            palabras,
            { autoAlpha: 0, filter: 'blur(10px)', y: 10 },
            {
              autoAlpha: 1,
              filter: 'blur(0px)',
              y: 0,
              duration: 0.4,
              stagger: 0.015,
              ease: 'power2.out',
            },
            0
          );
        }

        if (bloques.length > 0) {
          tl.fromTo(
            bloques,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: 'power3.out',
            },
            palabras.length > 0 ? 0.15 : 0
          );
        }
      });
    },
    { scope: contenedorRef }
  );

  return (
    <div ref={contenedorRef}>
      {/* 1 · El problema del mercado. Título a la izquierda, texto a la
             derecha: rompe el bloque a todo el ancho, que es lo que cansa. */}
      <Seccion>
        <div className="grid grid-cols-1 items-center gap-[24px] lg:grid-cols-[1fr_1.1fr] lg:gap-[80px]">
          <Titulo
            texto="Por qué tantas páginas web terminan siendo *iguales*"
            prefijo="vw-t1"
          />

          <div className="flex flex-col gap-[16px]">
            <Parrafo>
              <Fuerte>La mayoría de páginas web del mercado parten de una plantilla</Fuerte>, se
              arman con los mismos bloques y terminan compitiendo con una propuesta visual que no
              distingue a nadie. Cambian el logo y los colores; la estructura es la misma.
            </Parrafo>
            <Parrafo>
              Para nosotros, cada proyecto de diseño y desarrollo web empieza con investigación. Tu
              negocio, a quién le hablas, qué hacen tus competidores y qué funciona en tu categoría.{' '}
              <Fuerte>El resultado se construye sobre esa información, no sobre una plantilla.</Fuerte>
            </Parrafo>
            <Parrafo>
              Lo que recibes es una{' '}
              <Fuerte>herramienta que realmente te permite cumplir tus objetivos</Fuerte>, con un
              diseño propio de tu marca, animaciones e interacciones pensadas desde el inicio,
              construido sobre tecnología que carga rápido y entregado con un panel que puedes
              administrar tú.
            </Parrafo>
          </div>
        </div>
      </Seccion>

      {/* 2 · Conversión. Bloque oscuro: corta el ritmo del fondo claro. */}
      <Seccion>
        <div className="overflow-hidden rounded-[16px] bg-[#141821]">
          <div className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-[1fr_1fr]">
            <div className="flex flex-col justify-center gap-[16px] p-[32px] md:p-[48px] lg:py-[56px] lg:pr-0">
              <h2 className="flex flex-wrap content-start gap-x-[10px] text-[28px] leading-[34px] text-white md:text-[34px] md:leading-[40px] lg:text-[40px] lg:leading-[48px]">
                <AnimatedRichText
                  texto="Diseño web pensado para *convertir*"
                  claseAnimacion="vw-palabra"
                  prefijo="vw-t2"
                  claseNegrita="font-semibold text-white"
                />
              </h2>

              <p className="vw-fade invisible text-[15px] leading-[24px] text-[#C3CBD4] md:text-[16px] md:leading-[26px]">
                Definimos qué tiene que pasar antes que cómo se ve,{' '}
                <strong className="font-semibold text-white">
                  que te escriban, que agenden, que compren.
                </strong>{' '}
                Cada sección responde a esa decisión. Cada botón está donde está por una razón.
              </p>

              <p className="vw-fade invisible text-[15px] leading-[24px] text-[#C3CBD4] md:text-[16px] md:leading-[26px]">
                Y lo entregamos medido. Tu web sale conectada a analítica desde el primer día.{' '}
                <strong className="font-semibold text-white">
                  Sabes cuánta gente llega, por dónde se va y qué funciona,
                </strong>{' '}
                para que las decisiones sobre tu web dejen de tomarse a ciegas.
              </p>

              <div className="vw-fade invisible mt-[8px]">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-[10px] rounded-[8px] border border-[#3A4350] px-[20px] py-[16px] text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-[#141821]"
                >
                  Agendar reunión
                  <FlechaDiagonal />
                </Link>
              </div>
            </div>

            {/* El mockup desborda el borde de la tarjeta, como en el diseño.
                overflow-hidden en el contenedor padre recorta lo que sobra. */}
            <div className="vw-fade invisible relative h-[260px] p-[24px] md:h-[340px] lg:h-full lg:min-h-[460px] lg:p-[64px]">
              <Image
                src="/services/diseno-desarrollo-web/mockup-indie.webp"
                alt="Ecommerce Indie desarrollado por Valhu Group, visto en una laptop"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>
      </Seccion>

      {/* 3 · Qué incluye. Título centrado y cuadrícula de dos por dos. */}
      <Seccion>
        <Titulo
          texto="Qué incluye el servicio de diseño y desarrollo *web*"
          prefijo="vw-t3"
          className="mx-auto mb-[32px] max-w-[760px] justify-center text-center md:mb-[40px]"
        />

        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
          {INCLUYE.map((item) => (
            <div
              key={item.numero}
              className="vw-fade invisible rounded-[16px] bg-[#E6F3FA] p-[24px] transition-colors duration-200 hover:bg-[#EFF8FD]"
            >
              <span className="font-accent text-[26px] font-light italic leading-none text-[#141821] md:text-[30px]">
                {item.numero}
              </span>

              <h3 className="mt-[12px] text-[18px] leading-[24px] text-[#141821] md:text-[20px] md:leading-[26px]">
                {item.titulo}
              </h3>

              <p className="mt-[12px] text-[15px] leading-[23px] text-[#485157]">{item.texto}</p>
            </div>
          ))}
        </div>
      </Seccion>

      {/* 4 · Tipos de proyecto. Cuatro tarjetas con icono y enlace propio. */}
      <Seccion>
        <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-4">
          {PROYECTOS.map((p) => (
            <div
              key={p.titulo}
              className="vw-fade invisible flex flex-col rounded-[16px] border border-[#C8E5F5] bg-white p-[24px] transition-shadow duration-200 hover:shadow-[0_84px_23px_0_rgba(0,0,0,0.00),0_54px_21px_0_rgba(0,0,0,0.01),0_30px_18px_0_rgba(0,0,0,0.02),0_13px_13px_0_rgba(0,0,0,0.03),0_3px_7px_0_rgba(0,0,0,0.04)]"
            >
              <span className="mb-[20px] inline-flex h-[44px] w-[44px] items-center justify-center rounded-[10px] bg-[#E1EDF4] text-[#1B3F7D]">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {p.icono}
                </svg>
              </span>

              <h3 className="text-[24px] leading-[28px] font-medium tracking-[-1.2px] text-[#141821]">
                {p.titulo}
              </h3>

              <p className="mt-[16px] grow text-[14px] leading-[22px] text-[#485157]">{p.texto}</p>

              <Link
                href="/contacto"
                className="mt-[16px] inline-flex items-center justify-between gap-[10px] text-[14px] font-semibold text-[#141821] transition-colors hover:text-[#1B3F7D]"
              >
                Solicitar una cotización
                <FlechaDiagonal />
              </Link>
            </div>
          ))}
        </div>
      </Seccion>

      {/* 5 · Proceso. Lista a la izquierda, imagen a la derecha. */}
      <Seccion id="proceso">
        <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-[1fr_1fr] lg:gap-[40px]">
          <div>
            <Titulo
              texto="Nuestro proceso de *diseño y desarrollo web*"
              prefijo="vw-t5"
              className="mb-[24px]"
            />

            <div className="border-t border-[#D8E6F0]">
              {PROCESO.map((paso) => (
                <div key={paso.titulo} className="vw-fade invisible border-b border-[#D8E6F0] py-[20px]">
                  <h3 className="text-[17px] leading-[22px] font-semibold text-[#141821] md:text-[18px]">
                    {paso.titulo}
                  </h3>
                  <p className="mt-[6px] text-[14px] leading-[22px] text-[#485157]">{paso.texto}</p>
                </div>
              ))}
            </div>

            <p className="vw-fade invisible mt-[20px] text-[14px] leading-[22px] text-[#485157]">
              Una landing puede estar lista en una o dos semanas con el contenido listo. Una web de
              varias páginas o un ecommerce toma más, y el cronograma lo definimos en la primera
              reunión.
            </p>
          </div>

          <div className="vw-fade invisible relative aspect-square overflow-hidden rounded-[16px] lg:aspect-auto lg:min-h-[560px]">
            <Image
              src="/services/diseno-desarrollo-web/proceso-laptop.webp"
              alt="Web de D&F Ingenieros y Arquitectos vista en una laptop"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Seccion>

      {/* 6 · Tecnología. Imagen a la izquierda, texto a la derecha: invierte
             el orden del bloque anterior para que no se repita la forma. */}
      <Seccion>
        <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-[1fr_1fr] lg:gap-[56px]">
          <div className="vw-fade invisible relative order-2 aspect-[5/4] overflow-hidden rounded-[16px] lg:order-1 lg:aspect-auto lg:min-h-[440px]">
            <Image
              src="/services/diseno-desarrollo-web/tecnologia-panel.webp"
              alt="Panel de administración de contenidos de una web desarrollada por Valhu Group"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-left-top"
            />
          </div>

          <div className="order-1 flex flex-col gap-[16px] lg:order-2">
            <Titulo texto="La tecnología detrás de tu *página web*" prefijo="vw-t6" />

            <Parrafo>
              Construimos con{' '}
              <Fuerte>código nativo, y te brindamos un panel completamente administrable.</Fuerte>{' '}
              Eso nos permite llevar el diseño hasta donde lo imaginamos, sin recortarlo para que
              entre en lo que una herramienta permite, y mantiene la web ligera porque solo carga lo
              que tu proyecto realmente usa.
            </Parrafo>

            <Parrafo>
              La otra mitad de la velocidad está en dónde vive tu sitio. La mayoría de las webs se
              alojan en servidores compartidos, una máquina en un solo lugar respondiendo a cientos
              de sitios a la vez. El tuyo se publica en una red global y carga igual de rápido desde
              Lima que desde Madrid.
            </Parrafo>

            <Parrafo>
              Eso cambia también lo que pagas normalmente con un hosting por una web. Al inicio tus
              costos de infraestructura son prácticamente nulos, y si el proyecto crece hasta
              necesitar más capacidad siguen siendo notablemente bajos. Lo conversamos antes de
              empezar.
            </Parrafo>
          </div>
        </div>
      </Seccion>

      {/* 7 · Cierre. Único encabezado sin keyword: es el remate. */}
      <Seccion>
        <div className="grid grid-cols-1 items-center gap-[24px] lg:grid-cols-[1fr_1.1fr] lg:gap-[80px]">
          <Titulo texto="Nuestra web es la *mejor prueba*" prefijo="vw-t7" />

          <div className="flex flex-col gap-[16px]">
            <Parrafo>
              Este sitio lo{' '}
              <Fuerte>diseñamos y desarrollamos nosotros.</Fuerte> Las animaciones que ves, la
              velocidad con la que cargó esta página y el panel desde el que editamos este texto son
              el mismo trabajo que recibirás.
            </Parrafo>

            <Parrafo>
              Llena nuestro formulario, solicita un presupuesto y conversemos del panorama completo
              para tu proyecto.
            </Parrafo>

            <div className="vw-fade invisible">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-[10px] text-[15px] font-semibold text-[#141821] transition-colors hover:text-[#1B3F7D]"
              >
                Solicitar cotización
                <FlechaDiagonal />
              </Link>
            </div>
          </div>
        </div>
      </Seccion>
    </div>
  );
}
