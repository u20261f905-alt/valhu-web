import Link from "next/link";
import Image from "next/image";
import CarruselImagenes, { type Pieza } from "./CarruselImagenes";
import Cta from "./Cta";
import Faq from "./Faq";
import ServiceMotion from "./ServiceMotion";
import ScrollTilt from "./ScrollTilt";

type Props = {
  variant: "branding" | "ux";
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
};

/** FAQs propias de cada landing: evitan repetir el bloque del home. */
const FAQS_BRANDING = [
  {
    id: "branding-1",
    question: "¿Qué incluye exactamente un proyecto de branding?",
    answer:
      "Logotipo con todas sus variantes, paleta de colores, tipografías, elementos gráficos, manual de marca, tono de voz y los archivos finales en los formatos que vas a necesitar. Todo entregado listo para aplicar, no como un PDF bonito que luego nadie sabe usar.",
  },
  {
    id: "branding-2",
    question: "¿Necesito rehacer mi marca o solo actualizarla?",
    answer:
      "Depende de qué tan lejos esté tu marca actual de donde quieres llegar. A veces basta con ordenar lo que ya existe, unificar colores, limpiar el logo y definir reglas de uso, y a veces conviene partir de cero. En la primera reunión revisamos lo que tienes y te decimos con franqueza cuál de los dos caminos te conviene, aunque sea el más barato.",
  },
  {
    id: "branding-3",
    question: "¿Cuánto tiempo toma crear una identidad de marca?",
    answer:
      "Entre 3 y 5 semanas para una identidad completa. El proceso tiene etapas claras: investigación y territorio de marca, propuestas de concepto, desarrollo del sistema visual y entrega del manual. Tú apruebas al final de cada etapa, así que nunca llegas al final con una sorpresa.",
  },
  {
    id: "branding-4",
    question: "¿Puedo pedir cambios en las propuestas?",
    answer:
      "Sí, el proceso contempla rondas de ajuste en cada etapa. Lo que buscamos no es que la marca nos guste a nosotros, sino que tú puedas defenderla frente a tus clientes y tu equipo sin dudar.",
  },
];

const FAQS_UX = [
  {
    id: "ux-1",
    question: "¿Cuál es la diferencia entre UX y UI?",
    answer:
      "UX es cómo funciona: qué camino recorre el usuario, dónde se traba, qué información necesita en cada paso. UI es cómo se ve: tipografía, color, espaciado, jerarquía. Una interfaz preciosa con un flujo mal pensado no retiene usuarios, y un flujo impecable con una interfaz descuidada no genera confianza. Trabajamos las dos juntas.",
  },
  {
    id: "ux-2",
    question:
      "Tengo una startup y necesito diseñar mi MVP, ¿por dónde empezamos?",
    answer:
      "Por definir qué entra y qué no. La mayoría de MVP fracasan por querer lanzar con veinte funcionalidades a medias en lugar de tres bien resueltas. Partimos de los flujos críticos, registro, onboarding y la acción que define tu producto, y diseñamos esas pantallas primero, para que puedas salir a validar y levantar inversión sin esperar meses.",
  },
  {
    id: "ux-3",
    question: "¿Diseñan interfaces para SaaS y plataformas, no solo webs?",
    answer:
      "Sí, es gran parte de lo que hacemos. Dashboards, paneles de administración, onboarding, tablas de datos, estados vacíos y estados de error: todo lo que una web de marketing no tiene y un producto sí. Son interfaces que el usuario abre todos los días, así que se diseñan pensando en uso repetido, no en primera impresión.",
  },
  {
    id: "ux-4",
    question: "¿Necesito UX/UI si mi producto ya está funcionando?",
    answer:
      "Es justo cuando más sirve. Si tienes usuarios registrados pero pocos activan o se quedan, el problema rara vez es el tráfico: es que no entienden el valor en los primeros minutos, se pierden en el onboarding o abandonan donde hay fricción. Rediseñar la experiencia sobre lo que ya existe suele costar menos que reconstruir y mover más la aguja en retención.",
  },
  {
    id: "ux-5",
    question: "¿Qué entregan al final del proyecto?",
    answer:
      "Los flujos de usuario, los wireframes, el diseño final de cada pantalla en escritorio y móvil, y un sistema de componentes para que tu equipo de desarrollo lo implemente sin adivinar medidas ni colores. Si tu equipo es pequeño o aún no existe, podemos desarrollarlo nosotros.",
  },
];

function Title({
  children,
  center = false,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div
      className={center ? "mx-auto max-w-[820px] text-center" : "max-w-[820px]"}
    >
      <h2 className="text-[28px] leading-[34px] md:text-[38px] md:leading-[44px] lg:text-[48px] lg:leading-[56px]">
        {children}
      </h2>
    </div>
  );
}

const brandMethod = [
  [
    "01",
    "Análisis",
    "Conocemos tu negocio, audiencia, contexto y oportunidades.",
  ],
  [
    "02",
    "Estrategia",
    "Definimos posicionamiento, personalidad y concepto de marca.",
  ],
  ["03", "Diseño", "Creamos propuestas visuales alineadas a la estrategia."],
  [
    "04",
    "Validación",
    "Revisamos contigo y ajustamos hasta lograr la identidad ideal.",
  ],
];

function BrandingContent() {
  return (
    <>
      <section className="pt-0 pb-[48px] md:pb-[48px] lg:pb-[80px]">
        <div className="mx-auto max-w-[1220px] px-4 md:px-8">
          <Title center>
            Marcas estratégicas, coherentes y{" "}
            <span className="font-accent italic font-light">memorables</span>
          </Title>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              [
                "01",
                "Estrategia de marca",
                "Definimos el propósito, posicionamiento y personalidad que guiarán cada expresión de tu marca.",
              ],
              [
                "02",
                "Identidad visual",
                "Traducimos la estrategia en un sistema visual reconocible, flexible y preparado para crecer.",
              ],
            ].map(([n, t, b]) => (
              <TarjetaNumerada key={n} numero={n} titulo={t} texto={b} />
            ))}
          </div>
        </div>
      </section>

      <section className="pt-0 pb-[48px] md:pb-[48px] lg:pb-[80px]">
        <div className="mx-auto max-w-[1220px] px-4 md:px-8">
          <Title center>
            Una identidad visual sólida, coherente y{" "}
            <span className="font-accent italic font-light">adaptable</span>
          </Title>
          <div className="mt-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="relative min-h-[340px] overflow-hidden rounded-[16px] lg:col-span-7 lg:min-h-[440px]">
              <Image
                src="/services/branding/branding-identidad.webp"
                alt="Diseñadora trabajando en la identidad visual de una marca"
                fill
                sizes="(max-width: 1023px) 100vw, 661px"
                className="object-cover"
              />
            </div>
            <div className="divide-y divide-[#D0D5DD] lg:col-span-5">
              {[
                [
                  "01",
                  "Logotipo y sistema visual",
                  "Una identidad reconocible que funciona en todos los formatos.",
                ],
                [
                  "02",
                  "Manual de marca",
                  "Reglas claras para aplicar tu marca de forma consistente.",
                ],
                [
                  "03",
                  "Tono de voz",
                  "Una personalidad verbal que conecta con tu audiencia.",
                ],
                [
                  "04",
                  "Aplicaciones",
                  "Piezas preparadas para los puntos de contacto más importantes.",
                ],
              ].map(([n, t, b]) => (
                <article
                  key={n}
                  className="grid grid-cols-[44px_1fr] gap-3 py-5 first:pt-0"
                >
                  <span className="font-accent text-[22px]">{n}</span>
                  <div>
                    <h4 className="mb-1">{t}</h4>
                    <p className="text-[14px] text-[#525866]">{b}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-0 pb-[48px] md:pb-[48px] lg:pb-[80px]">
        <div className="mx-auto max-w-[1220px] px-4 md:px-8">
          <Title center>
            Nuestra{" "}
            <span className="font-accent italic font-light">metodología</span>
          </Title>
          <p className="mx-auto mt-3 max-w-[720px] text-center text-[#525866]">
            Analizamos tu negocio a fondo para construir una marca diferenciada
            y con propósito.
          </p>
          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {brandMethod.map(([n, t, b]) => (
              <article
                key={n}
                className="min-h-[220px] rounded-[16px] bg-white p-6"
              >
                <p className="mb-8 font-accent text-[28px]">{n}</p>
                <h4 className="mb-2">{t}</h4>
                <p className="text-[14px] text-[#525866]">{b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proyectos" className="pt-0 pb-[48px] md:pb-[48px] lg:pb-[80px]">
        <div className="mx-auto max-w-[1220px] px-4 md:px-8">
          <Title center>
            Nuestros{" "}
            <span className="font-accent italic font-light">proyectos</span>
          </Title>
          <p className="mx-auto mt-3 max-w-[650px] text-center text-[#525866]">
            Una muestra de marcas que hemos construido junto a nuestros
            clientes.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="relative min-h-[310px] overflow-hidden rounded-[16px] md:min-h-[390px]">
              <Image
                src="/services/branding/branding-proyecto-01.webp"
                alt="Sistema de papelería y aplicaciones de marca para Andrew Uribe"
                fill
                sizes="(max-width: 767px) 100vw, 568px"
                className="object-cover"
              />
            </div>
            <div className="relative min-h-[310px] overflow-hidden rounded-[16px] md:min-h-[390px]">
              <Image
                src="/services/branding/branding-proyecto-02.webp"
                alt="Campaña de marca aplicada en un panel publicitario exterior"
                fill
                sizes="(max-width: 767px) 100vw, 568px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pt-0 pb-[48px] md:pb-[48px] lg:pb-[80px]">
        <div className="mx-auto max-w-[1220px] px-4 md:px-8">
          <div className="grid grid-cols-1 items-stretch gap-[20px] lg:grid-cols-[45fr_55fr]">
            <div className="flex flex-col items-center justify-center rounded-[16px] bg-white p-[32px] text-center md:p-[40px]">
              <Title>
                Todo lo que{" "}
                <span className="font-accent italic font-light">recibes</span>
              </Title>

              <p className="mt-4 max-w-[430px] text-[16px] leading-[20px] text-[#485157]">
                Todos los archivos y lineamientos necesarios para aplicar tu
                marca con consistencia.
              </p>
            </div>

            <FilasDePalabras filas={ENTREGABLES} />
          </div>
        </div>
      </section>
    </>
  );
}

/** Una tarjeta numerada, el mismo formato que usa "Cómo trabajamos". */
function TarjetaNumerada({
  numero,
  titulo,
  texto,
}: {
  numero: string;
  titulo: string;
  texto: string;
}) {
  return (
    <article className="flex flex-col items-start gap-[16px] rounded-[16px] bg-white p-[24px]">
      <p className="bg-transparent font-accent text-[32px] font-light italic leading-[32px] text-[#141821]">
        {numero}
      </p>

      <h3 className="text-[24px] font-normal leading-[28px] text-[#141821]">
        {titulo}
      </h3>

      <p className="bg-transparent text-[16px] leading-[20px] text-[#485157]">
        {texto}
      </p>
    </article>
  );
}

const PARA_QUIENES = [
  [
    "01",
    "Startups",
    "Que necesitan validar, diseñar o mejorar un producto digital.",
  ],
  [
    "02",
    "Empresas",
    "Que buscan optimizar plataformas, procesos y experiencias.",
  ],
  ["03", "Equipos de producto", "Que requieren apoyo especializado en UX/UI."],
];

/**
 * Tres filas de etiquetas que se desplazan solas, en direcciones alternas.
 *
 * Cada fila repite sus palabras dos veces y se mueve media pista: al
 * reiniciar, el fotograma coincide con el anterior y el corte no se nota.
 * Los costados llevan un degradado para que las etiquetas se desvanezcan
 * en lugar de chocar contra el borde de la tarjeta.
 */
function FilasDePalabras({ filas }: { filas: string[][] }) {
  return (
    <div className="relative flex min-h-[380px] flex-col justify-center overflow-hidden rounded-[16px] border border-[#E1E7EC] bg-white py-[48px] md:py-[64px]">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[48px] bg-gradient-to-r from-white to-transparent md:w-[72px]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[48px] bg-gradient-to-l from-white to-transparent md:w-[72px]" />

      <div className="flex flex-col gap-[20px]">
        {filas.map((palabras, i) => (
          <div
            key={i}
            className="flex w-max valhu-fila"
            style={{
              animationName:
                i % 2 === 0 ? "valhu-fila-izquierda" : "valhu-fila-derecha",
              animationDuration: `${26 + i * 6}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
          >
            {[...palabras, ...palabras].map((palabra, j) => (
              <span
                key={`${palabra}-${j}`}
                aria-hidden={j >= palabras.length}
                className="mr-[20px] shrink-0 rounded-[8px] bg-[#F7FAFC] px-[20px] py-[16px] text-[15px] whitespace-nowrap text-[#141821]"
              >
                {palabra}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const ENTREGABLES = [
  ["Logotipo y variantes", "Paleta de colores", "Tipografías"],
  ["Elementos gráficos", "Manual de marca", "Tono de voz"],
  ["Plantillas para redes", "Papelería", "Archivos finales"],
];

const PROYECTOS_UX: Pieza[] = [
  {
    id: "ux-01",
    image: "/services/diseno-ux-ui/ux-01.webp",
    alt: "App de meditación: pantalla de inicio con categorías y reproductor de sesión",
  },
  {
    id: "ux-02",
    image: "/services/diseno-ux-ui/ux-02.webp",
    alt: "TextTuAr: app para crear texturas con realidad aumentada",
  },
  {
    id: "ux-03",
    image: "/services/diseno-ux-ui/ux-03.webp",
    alt: "Bithon Series: app de compra de entradas para carreras",
  },
  {
    id: "ux-04",
    image: "/services/diseno-ux-ui/ux-04.webp",
    alt: "Tarjeta Estilos: app para solicitar y administrar la tarjeta desde el celular",
  },
];

const POR_QUE = [
  [
    "01",
    "Diseño con propósito",
    "Cada decisión responde a una necesidad real del usuario y del negocio.",
  ],
  [
    "02",
    "Procesos colaborativos",
    "Trabajamos contigo durante todo el proceso de diseño.",
  ],
  [
    "03",
    "Resultados medibles",
    "Creamos experiencias que mejoran adopción, conversión y retención.",
  ],
];

function UxContent() {
  return (
    <>
      <section className="pt-0 pb-[48px] md:pb-[48px] lg:pb-[80px]">
        <div className="mx-auto max-w-[1220px] px-4 md:px-8">
          <Title center>
            ¿Para quiénes es este{" "}
            <span className="font-accent italic font-light">servicio?</span>
          </Title>

          <div className="mt-10 grid grid-cols-1 gap-[20px] md:grid-cols-3">
            {PARA_QUIENES.map(([numero, titulo, texto]) => (
              <TarjetaNumerada
                key={numero}
                numero={numero}
                titulo={titulo}
                texto={texto}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="proyectos" className="pt-0 pb-[24px] md:pb-[32px]">
        <div className="mx-auto max-w-[1220px] px-4 md:px-8">
          <Title center>
            Nuestros{" "}
            <span className="font-accent italic font-light">proyectos</span>
          </Title>
        </div>
      </section>

      {/* El carrusel va fuera del contenedor: necesita todo el ancho de la
          pantalla para que los degradados de los lados tengan sentido. */}
      <div className="pb-[48px] md:pb-[48px] lg:pb-[80px]">
        <CarruselImagenes piezas={PROYECTOS_UX} />
      </div>

      <section className="pt-0 pb-[48px] md:pb-[48px] lg:pb-[80px]">
        <div className="mx-auto max-w-[1220px] px-4 md:px-8">
          <Title center>
            ¿Por qué diseñar tu producto con{" "}
            <span className="font-accent italic font-light">Valhu?</span>
          </Title>

          <div className="mt-10 grid grid-cols-1 gap-[20px] md:grid-cols-3">
            {POR_QUE.map(([numero, titulo, texto]) => (
              <TarjetaNumerada
                key={numero}
                numero={numero}
                titulo={titulo}
                texto={texto}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function ServiceLanding({
  variant,
  eyebrow,
  title,
  accent,
  description,
}: Props) {
  // La esfera de esta página: la misma arriba, en el encabezado, y abajo
  // en el cierre, para que el cierre no se sienta prestado de otra sección.
  const esferaDeLaPagina =
    variant === "branding"
      ? "/services/branding/yellow-sphere.webp"
      : "/services/diseno-ux-ui/greenblue-sphere.webp";

  return (
    <main className="bg-[#EFF8FD]">
      <ServiceMotion key={variant}>
        <section className="w-full">
          <div className="mx-auto max-w-[1220px] px-4 pt-[24px] pb-[48px] md:px-8 md:pt-[40px] md:pb-[48px]">
            <div className="grid grid-cols-1 items-center gap-10 border-b border-[#E1E7EC] pb-[24px] md:grid-cols-12 md:gap-6 md:pb-[40px] lg:gap-10">
              <div className="md:col-span-7 flex flex-col items-start">
                <p className="mb-3 text-[14px]/[18px] md:text-[16px]/[22px] uppercase underline decoration-[1px] decoration-[#969EB3] [text-underline-offset:2px] text-[#969EB3] font-normal inline-block">
                  {eyebrow}
                </p>
                <h1 className="mb-[16px] md:mb-[20px] !text-[36px] !leading-[40px] md:!text-[52px] md:!leading-[58px] lg:!text-[64px] lg:!leading-[72px]">
                  {title}{" "}
                  <span className="font-accent italic font-light">
                    {accent}
                  </span>
                </h1>
                <p className="text-[14px] md:text-[16px] text-[#485157] mb-[24px] max-w-[600px]">
                  {description}
                </p>
                <div className="flex flex-col gap-[20px] w-full sm:w-auto sm:flex-row">
                  <Link
                    href="/contacto"
                    className="inline-flex items-center justify-center gap-3 px-[20px] py-[16px] rounded-[8px] bg-[#141821] text-white text-[16px] font-semibold transition-colors hover:bg-[#2b3240]"
                  >
                    Agenda una reunión
                  </Link>
                  <Link
                    href="#proyectos"
                    className="inline-flex items-center justify-center gap-3 px-[20px] py-[16px] rounded-[8px] border border-[#D0D7DD] bg-[#EFF8FD] text-[16px] font-semibold text-[#141821] transition-colors hover:bg-white"
                  >
                    Ver proyectos
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.05317 5.80864L16.6169 14.568L16.7007 7.14383L17.6984 7.09145L17.5946 16.2833L8.40276 16.1794L8.47766 15.1832L15.9018 15.267L7.33812 6.50772L8.05317 5.80864Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
              <div
                data-service-media
                className="relative mx-auto aspect-square w-full max-w-[430px] md:col-span-5"
              >
                <Image
                  src={esferaDeLaPagina}
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
        {variant === "branding" ? <BrandingContent /> : <UxContent />}
      </ServiceMotion>
      <ScrollTilt from={16} to={-10} perspective={1100}>
        <Cta esfera={esferaDeLaPagina} />
      </ScrollTilt>
      <Faq items={variant === "branding" ? FAQS_BRANDING : FAQS_UX} />
    </main>
  );
}
