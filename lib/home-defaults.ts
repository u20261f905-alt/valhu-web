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
  buttonHref: '/servicios',
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
      buttonText: 'Ver servicio',
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
    '**Valhu Group** es una agencia de innovación. Reunimos **diseño y desarrollo web, performance ads, UX/UI y branding** en un mismo equipo, para que tu marca, tu web y tus campañas dejen de contradecirse entre sí y empujen en la misma dirección.',
  bottomLeft:
    'Trabajamos con una idea fija. **La diferenciación no es un extra** que se agrega al final, es lo primero que definimos,',
  bottomRight:
    'y desde ahí construimos cada pieza. Cuidamos el acabado porque es lo que separa un proyecto que **funciona** de uno que además **destaca.**',
  buttonText: 'Más sobre Valhu Group',
  buttonHref: '/nosotros',
};

export const FAQ_POR_DEFECTO: FaqContent = {
  title: '¿Tienes *preguntas?*',
  buttonText: 'Contáctanos',
  buttonHref: '/contacto',
};

export const CTA_POR_DEFECTO: CtaContent = {
  titleLine1: '¿Listo para transformar tu idea en',
  titleHighlighted: 'resultados reales?',
  description:
    'Analicemos tu proyecto y descubre como podemos ayudarte a escalar.',
  buttonText: 'Agendar reunión',
  buttonLink: '/contacto',
};

export const FAQS_POR_DEFECTO: Faq[] = [
  {
    id: 'defecto-1',
    question: '¿Qué tipo de agencia es Valhu Group?',
    answer:
      'Somos una agencia de innovación. Trabajamos diseño y desarrollo web, performance ads en Google y Meta, diseño UX/UI y branding, cuatro frentes que casi siempre van juntos. Al estar todo en un mismo equipo, la marca, la web y las campañas hablan el mismo idioma.',
  },
  {
    id: 'defecto-2',
    question: '¿Puedo contratar un solo servicio o tienen que ser todos?',
    answer:
      'Puedes contratar solo uno. Hay proyectos que necesitan únicamente rediseñar la web, ordenar la marca o levantar campañas, y los tomamos así. Dicho eso, cuando un negocio parte de cero, resolver los cuatro frentes con un mismo equipo suele salir mejor que repartirlos entre proveedores distintos.',
  },
  {
    id: 'defecto-3',
    question: '¿Cómo empieza el trabajo?',
    answer:
      'Nos escribes por el formulario y te respondemos dentro de las siguientes **48 horas** para agendar una reunión. Ahí entendemos bien qué necesitas, y recién después te enviamos una cotización hecha a tu medida. No cotizamos a ciegas.',
  },
  {
    id: 'defecto-4',
    question: '¿Trabajan con marcas que recién empiezan?',
    answer:
      'Sí. Buena parte de lo que hacemos es acompañar a negocios y startups a construir su presencia digital desde cero, definiendo la marca, lanzando la primera web y empezando a traer clientes. También trabajamos con empresas que ya están andando y necesitan renovar lo que tienen.',
  },
  {
    id: 'defecto-5',
    question: '¿Trabajan con clientes fuera de Perú?',
    answer:
      'Sí, trabajamos de forma remota. Las reuniones son por videollamada y la coordinación del día a día va por correo o mensajería, con la misma dinámica que usamos con los clientes locales.',
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
