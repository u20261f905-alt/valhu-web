/**
 * Tipos y contenido por defecto del home.
 *
 * Vive aparte de lib/site-content.ts (que hace las consultas) porque los
 * componentes del navegador importan de aquí: así no arrastran el cliente
 * de Supabase al bundle que descarga el visitante.
 *
 * Los valores por defecto son EXACTAMENTE el texto que estaba escrito a
 * mano en cada componente. Si la base no responde o alguien deja un campo
 * vacío, la web se ve igual que siempre.
 *
 * Formato:  *acento*  y  **negrita**
 */

export type HeroContent = {
  pretitle: string;
  title: string;
  paragraph: string;
  buttonText: string;
  buttonHref: string;
};

export type ServiceCard = {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
};

export type ServicesContent = {
  title: string;
  paragraph: string;
  cards: {
    web: ServiceCard;
    ads: ServiceCard;
    ux: ServiceCard;
    branding: ServiceCard;
  };
};

export type AboutContent = {
  title: string;
  intro: string;
  bottomLeft: string;
  bottomRight: string;
  buttonText: string;
  buttonHref: string;
};

export type FaqContent = {
  title: string;
  buttonText: string;
  buttonHref: string;
};

export type CtaContent = {
  titleLine1: string;
  titleHighlighted: string;
  description: string;
  buttonText: string;
  buttonLink: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type HomeContent = {
  hero: HeroContent;
  services: ServicesContent;
  about: AboutContent;
  faq: FaqContent;
  cta: CtaContent;
  faqs: Faq[];
};

/* ------------------------------------------------------------------ */

export const HERO_POR_DEFECTO: HeroContent = {
  pretitle: 'VALHU GROUP',
  title: 'Sumérgete en nuestro mundo de *tecnología,* *marketing* e *innovación.*',
  paragraph:
    'Somos una agencia motivada por la **disrupción, creatividad y resultados.**',
  buttonText: 'Ver servicios',
  buttonHref: '#servicios',
};

export const SERVICES_POR_DEFECTO: ServicesContent = {
  title: 'Nuestros Servicios',
  paragraph:
    'Estructuramos nuestra oferta para acompañarte en cada fase digital de tu negocio. Desde la concepción de tu marca hasta la conquista del mercado.',
  cards: {
    web: {
      title: 'Diseño y desarrollo *Web*',
      description:
        'Diseñamos y desarrollamos sitios web a medida, rápidos y seguros. Enfocados en la experiencia de usuario, la escalabilidad y funcionalidad impecable.',
      buttonText: 'Ver proyectos',
      buttonHref: '/servicios/diseno-desarrollo-web',
    },
    ads: {
      title: 'Performance *Ads*',
      description:
        'Gestionamos campañas publicitarias digitales en **Google Ads y Meta Ads** orientadas exclusivamente a resultados, maximizando tu retorno de inversión (ROI) y captación de clientes.',
      buttonText: 'Ver resultados',
      buttonHref: '/servicios/meta-ads',
    },
    ux: {
      title: 'Diseño *UX*',
      description:
        'Investigamos y creamos experiencias digitales para Saas, apps y webs de startups/empresas.',
      buttonText: 'Ver proyectos',
      buttonHref: '/servicios/diseno-ux-ui',
    },
    branding: {
      title: 'Branding',
      description:
        'Desarrollamos la identidad visual, el tono de voz y la personalidad de tu marca',
      buttonText: 'Ver proyectos',
      buttonHref: '/servicios/branding',
    },
  },
};

export const ABOUT_POR_DEFECTO: AboutContent = {
  title: 'El motor de tu *transformación* *digital*',
  intro:
    'En **Valhu Group**, no solo construimos productos digitales; construimos ecosistemas de innovación diseñados para escalar. Somos un **grupo de agencias estratégicas** unidas por una visión clara: **cerrar la brecha entre la ambición de negocio y la ejecución tecnológica.**',
  bottomLeft:
    'Somos el puente entre la **innovación creativa** y el **éxito comercial**. Al integrar el diseño con estrategias tecnológicas de alto impacto,',
  bottomRight:
    'permitimos que las empresas se enfoquen en su crecimiento mientras nosotros gestionamos la complejidad de su **presencia digital.**',
  buttonText: 'Más sobre Valhu Group',
  buttonHref: '/nosotros',
};

export const FAQ_POR_DEFECTO: FaqContent = {
  title: '¿Tienes *preguntas?*',
  buttonText: 'Contáctanos',
  buttonHref: '#contacto',
};

export const CTA_POR_DEFECTO: CtaContent = {
  titleLine1: '¿Listo para transformar tu idea en',
  titleHighlighted: 'resultados reales?',
  description:
    'Analicemos tu proyecto y descubre como podemos ayudarte a escalar.',
  buttonText: 'Agendar reunión',
  buttonLink: '#contacto',
};

export const FAQS_POR_DEFECTO: Faq[] = [
  {
    id: 'defecto-1',
    question: '¿Cuál es la diferencia entre Valhu Design y Valhu Media?',
    answer:
      'Valhu Design se enfoca en la estrategia, branding y la experiencia de usuario (UX/UI). Valhu Media se encarga de materializar esa estrategia mediante el desarrollo tecnológico y la ejecución de campañas de marketing para hacer crecer y generar ventas a tu negocio.',
  },
  {
    id: 'defecto-2',
    question: '¿Puedo contratar a ambas agencias para un mismo proyecto?',
    answer:
      '¡Totalmente! De hecho, es lo que recomendamos. Al integrar el diseño estratégico con la tecnología de alto impacto, aseguramos una transición fluida desde la conceptualización de tu producto hasta su escalabilidad comercial.',
  },
  {
    id: 'defecto-3',
    question: '¿Cómo miden el éxito de sus servicios de Performance Digital?',
    answer:
      'Nuestra gestión se basa en datos. Utilizamos analítica avanzada para monitorear cada campaña (Google Ads, Meta Ads) con el objetivo principal de maximizar tu retorno de inversión (ROI) y aumentar la captación de clientes de manera eficiente.',
  },
  {
    id: 'defecto-4',
    question: '¿Trabajan con startups desde cero?',
    answer:
      'Sí, tenemos experiencia ayudando a startups a definir su MVP (Producto Mínimo Viable), validar conceptos y construir su presencia digital desde la etapa inicial, asegurando que tengan bases sólidas para crecer.',
  },
];

export const CATEGORIAS_POR_DEFECTO = [
  'Desarrollo web',
  'Diseño web',
  'Diseño UX/UI',
  'Branding',
  'Performance',
  'Tecnología',
];

/* ------------------------------------------------------------------ */
/*  Imágenes editables                                                 */
/* ------------------------------------------------------------------ */

/** Una imagen del sitio con su texto alternativo, tal como sale del editor. */
export type Ranura = { src: string | null; alt: string } | null | undefined;

/** Todas las ranuras de imagen del home. */
export type Imagenes =
  | Partial<
      Record<
        | 'portada'
        | 'webUno'
        | 'webDos'
        | 'webTres'
        | 'webCuatro'
        | 'adsEstadisticas'
        | 'adsGrafico'
        | 'ux'
        | 'branding'
        | 'nosotrosUno'
        | 'nosotrosDos',
        Ranura
      >
    >
  | null
  | undefined;

/**
 * La imagen que toca dibujar.
 *
 * Si la ranura está vacía se usa la que traía la web, para que quitar una
 * imagen sin querer no deje un hueco en la página.
 */
export function laImagen(ranura: Ranura, srcPorDefecto: string, altPorDefecto: string) {
  return {
    src: ranura?.src || srcPorDefecto,
    alt: ranura?.alt || altPorDefecto,
  };
}
