import { config, collection, singleton, fields } from '@keystatic/core';

/**
 * Esquema del contenido editable de Valhu Group.
 *
 * Todo vive como archivos dentro del repositorio: las notas en Markdoc y el
 * resto en YAML. No hay base de datos.
 *
 * Convención de formato en los textos del sitio, la misma de siempre:
 *   *palabra*    se muestra en la tipografía cursiva de acento
 *   **palabra**  se muestra en negrita
 */

/* ------------------------------------------------------------------ */
/*  Dónde se guarda                                                    */
/* ------------------------------------------------------------------ */

/**
 * Dónde guarda el editor lo que escribes.
 *
 * Por defecto, en los archivos del proyecto: es lo que quieres mientras
 * trabajas en tu computadora.
 *
 * Para poder editar desde la web publicada hay que conectar una app de
 * GitHub y recién entonces poner NEXT_PUBLIC_KEYSTATIC_MODO=github junto con
 * KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET y
 * KEYSTATIC_SECRET. Mientras esa variable no exista, el proyecto compila y
 * funciona sin necesitar nada de eso.
 *
 * La variable lleva NEXT_PUBLIC_ a propósito: el editor corre mitad en el
 * servidor y mitad en el navegador, y las dos mitades tienen que estar de
 * acuerdo sobre dónde se guarda.
 */
const almacenamiento =
  process.env.NEXT_PUBLIC_KEYSTATIC_MODO === 'github'
    ? ({
        kind: 'github',
        repo: { owner: 'u20261f905-alt', name: 'valhu-web' },
      } as const)
    : ({ kind: 'local' } as const);

/* ------------------------------------------------------------------ */
/*  Piezas reutilizables                                               */
/* ------------------------------------------------------------------ */

const botón = (etiquetaTexto = 'Texto del botón', etiquetaEnlace = 'Enlace del botón') => ({
  buttonText: fields.text({ label: etiquetaTexto }),
  buttonHref: fields.text({ label: etiquetaEnlace }),
});

const imagen = (label: string, directorio: string, rutaPública: string) =>
  fields.image({
    label,
    directory: directorio,
    publicPath: rutaPública,
  });

/**
 * Una imagen del sitio con su descripción.
 *
 * El texto alternativo no es decorativo: es lo que leen Google y los
 * lectores de pantalla, así que va junto a la imagen y no en otra pantalla.
 */
const ranura = (label: string, carpeta: string) =>
  fields.object(
    {
      src: imagen('Imagen', `public${carpeta}`, carpeta),
      alt: fields.text({
        label: 'Qué se ve en la imagen',
        description: 'Descríbela en pocas palabras.',
      }),
    },
    { label }
  );

/** Los metadatos de una página del sitio. */
const seoDePagina = (label: string) =>
  fields.object(
    {
      title: fields.text({
        label: 'Título para Google',
        description: 'Entre 50 y 60 caracteres funciona bien. Vacío usa el título por defecto.',
      }),
      description: fields.text({
        label: 'Descripción para Google',
        description: 'Entre 120 y 155 caracteres. Vacía usa la descripción general del sitio.',
        multiline: true,
      }),
      ogImage: fields.image({
        label: 'Imagen al compartir',
        description: 'Vacía usa la imagen por defecto del sitio.',
        directory: 'public/seo',
        publicPath: '/seo',
      }),
      noindex: fields.checkbox({
        label: 'Ocultar de Google',
        description: 'La página sigue accesible por enlace, pero no aparece en los buscadores.',
        defaultValue: false,
      }),
    },
    { label }
  );

/* ------------------------------------------------------------------ */
/*  Configuración                                                      */
/* ------------------------------------------------------------------ */

export default config({
  storage: almacenamiento,

  ui: {
    brand: { name: 'Valhu Group' },
    navigation: {
      Blog: ['notas', 'categorias'],
      Home: ['portada', 'servicios', 'nosotros', 'preguntas', 'contacto', 'imagenes'],
      SEO: ['seoPaginas', 'ajustes', 'empresa'],
      Contacto: ['formulario'],
      Legal: ['legales'],
    },
  },

  collections: {
    /* ---------------- NOTAS DEL BLOG ---------------- */
    notas: collection({
      label: 'Notas',
      slugField: 'title',
      path: 'content/notas/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'status', 'publishedAt'],

      schema: {
        title: fields.slug({
          name: {
            label: 'Título',
            description: 'Lo primero que ve el lector y lo que sale en Google.',
            validation: { isRequired: true },
          },
          slug: {
            label: 'URL de la nota',
            description:
              'No la cambies si la nota ya está publicada: romperías el enlace que la gente ya tiene.',
          },
        }),

        excerpt: fields.text({
          label: 'Resumen',
          description:
            'Dos líneas. Aparecen en el listado del blog y arriba de la nota; es lo que decide si alguien entra a leer.',
          multiline: true,
        }),

        content: fields.markdoc({
          label: 'Contenido',
          options: {
            image: {
              directory: 'public/blog/notas',
              publicPath: '/blog/notas',
            },
          },
        }),

        /* ---- Portada ---- */
        coverImage: imagen('Imagen de portada', 'public/blog/portadas', '/blog/portadas'),
        coverImageAlt: fields.text({
          label: 'Descripción de la portada',
          description:
            'Qué se ve en la imagen. Sirve para Google y para quien usa lector de pantalla.',
        }),

        /* ---- Organización ---- */
        category: fields.relationship({
          label: 'Categoría',
          collection: 'categorias',
          description: 'Se administran en la sección Categorías.',
        }),
        tags: fields.array(fields.text({ label: 'Etiqueta' }), {
          label: 'Etiquetas',
          itemLabel: (props) => props.value,
        }),

        authorName: fields.text({ label: 'Autor', defaultValue: 'Valhu Group' }),
        authorRole: fields.text({ label: 'Rol del autor' }),

        /* ---- Publicación ---- */
        status: fields.select({
          label: 'Estado',
          options: [
            { label: 'Borrador', value: 'draft' },
            { label: 'Publicada', value: 'published' },
          ],
          defaultValue: 'draft',
        }),
        featured: fields.checkbox({
          label: 'Nota destacada',
          description: 'Sale grande arriba del blog. Debería estar marcada en una sola nota.',
          defaultValue: false,
        }),
        publishedAt: fields.date({
          label: 'Fecha de publicación',
          description: 'Determina el orden del blog.',
        }),

        /* ---- SEO ---- */
        seo: fields.object(
          {
            focusKeyword: fields.text({
              label: 'Búsqueda objetivo',
              description:
                'La frase que quieres que la gente escriba en Google para llegar a esta nota. El puntaje de la pantalla de SEO se calcula contra esto.',
            }),
            seoTitle: fields.text({
              label: 'Título para Google',
              description: 'Si lo dejas vacío se usa el título de la nota.',
            }),
            seoDescription: fields.text({
              label: 'Descripción para Google',
              description: 'Si la dejas vacía se usa el resumen de la nota.',
              multiline: true,
            }),
            ogTitle: fields.text({
              label: 'Título al compartir',
              description: 'Para WhatsApp, LinkedIn y redes. Vacío usa el de Google.',
            }),
            ogDescription: fields.text({
              label: 'Descripción al compartir',
              multiline: true,
            }),
            ogImage: imagen('Imagen al compartir', 'public/blog/social', '/blog/social'),
            canonicalUrl: fields.url({
              label: 'URL canónica',
              description:
                'Solo si este mismo contenido existe en otra dirección y quieres indicarle a Google cuál es la oficial.',
            }),
            noindex: fields.checkbox({
              label: 'Ocultar esta nota de Google',
              description:
                'Sigue visible para quien tenga el enlace, pero se le pide a los buscadores que no la incluyan.',
              defaultValue: false,
            }),
          },
          { label: 'SEO', layout: [12, 12, 12, 12, 12, 12, 12, 12] }
        ),
      },
    }),

    /* ---------------- CATEGORÍAS ---------------- */
    categorias: collection({
      label: 'Categorías',
      slugField: 'name',
      path: 'content/categorias/*',
      format: { data: 'yaml' },
      columns: ['name', 'order'],

      schema: {
        name: fields.slug({
          name: { label: 'Nombre de la categoría', validation: { isRequired: true } },
        }),
        order: fields.integer({
          label: 'Orden',
          description: 'Menor número, más arriba en el desplegable.',
          defaultValue: 1,
        }),
      },
    }),

    /* ---------------- PÁGINAS LEGALES ---------------- */
    legales: collection({
      label: 'Páginas legales',
      slugField: 'title',
      path: 'content/legales/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'updatedAt'],

      schema: {
        title: fields.slug({
          name: {
            label: 'Título',
            description: 'El nombre de la página, tal como aparece en el pie.',
            validation: { isRequired: true },
          },
          slug: {
            label: 'Dirección (slug)',
            description: 'La parte final de la URL: /legales/lo-que-escribas-aquí.',
          },
        }),

        updatedAt: fields.date({
          label: 'Última actualización',
          description: 'La fecha que se muestra al inicio del documento.',
          validation: { isRequired: true },
        }),

        resumen: fields.text({
          label: 'Resumen',
          multiline: true,
          description: 'Una o dos líneas. Se usa para Google, no se muestra en la página.',
        }),

        content: fields.markdoc({ label: 'Contenido' }),
      },
    }),
  },

  singletons: {
    /* ---------------- HOME ---------------- */
    portada: singleton({
      label: 'Portada',
      path: 'content/home/portada',
      format: { data: 'yaml' },
      schema: {
        pretitle: fields.text({ label: 'Texto pequeño de arriba' }),
        title: fields.text({ label: 'Título principal', multiline: true }),
        paragraph: fields.text({ label: 'Párrafo', multiline: true }),
        ...botón(),
      },
    }),

    servicios: singleton({
      label: 'Servicios',
      path: 'content/home/servicios',
      format: { data: 'yaml' },
      schema: {
        title: fields.text({ label: 'Título de la sección' }),
        paragraph: fields.text({ label: 'Párrafo de la sección', multiline: true }),
        cards: fields.object({
          web: fields.object(
            {
              title: fields.text({ label: 'Título' }),
              description: fields.text({ label: 'Descripción', multiline: true }),
              ...botón(),
            },
            { label: 'Diseño y desarrollo web' }
          ),
          ads: fields.object(
            {
              title: fields.text({ label: 'Título' }),
              description: fields.text({ label: 'Descripción', multiline: true }),
              ...botón(),
            },
            { label: 'Performance Ads' }
          ),
          ux: fields.object(
            {
              title: fields.text({ label: 'Título' }),
              description: fields.text({ label: 'Descripción', multiline: true }),
              ...botón(),
            },
            { label: 'Diseño UX' }
          ),
          branding: fields.object(
            {
              title: fields.text({ label: 'Título' }),
              description: fields.text({ label: 'Descripción', multiline: true }),
              ...botón(),
            },
            { label: 'Branding' }
          ),
        }),
      },
    }),

    nosotros: singleton({
      label: 'Nosotros',
      path: 'content/home/nosotros',
      format: { data: 'yaml' },
      schema: {
        title: fields.text({ label: 'Título', multiline: true }),
        intro: fields.text({ label: 'Párrafo introductorio', multiline: true }),
        bottomLeft: fields.text({ label: 'Párrafo inferior izquierdo', multiline: true }),
        bottomRight: fields.text({ label: 'Párrafo inferior derecho', multiline: true }),
        ...botón(),
      },
    }),

    preguntas: singleton({
      label: 'Preguntas frecuentes',
      path: 'content/home/preguntas',
      format: { data: 'yaml' },
      schema: {
        title: fields.text({ label: 'Título de la sección' }),
        ...botón(),
        items: fields.array(
          fields.object({
            question: fields.text({ label: 'Pregunta' }),
            answer: fields.text({ label: 'Respuesta', multiline: true }),
            active: fields.checkbox({ label: 'Visible en la web', defaultValue: true }),
          }),
          {
            label: 'Las preguntas',
            description:
              'La primera de la lista se muestra abierta. Arrastra para cambiar el orden.',
            itemLabel: (props) => props.fields.question.value || 'Pregunta sin título',
          }
        ),
      },
    }),

    contacto: singleton({
      label: 'Contacto',
      path: 'content/home/contacto',
      format: { data: 'yaml' },
      schema: {
        titleLine1: fields.text({ label: 'Primera línea del título' }),
        titleHighlighted: fields.text({ label: 'Segunda línea (sale en cursiva)' }),
        description: fields.text({ label: 'Párrafo', multiline: true }),
        buttonText: fields.text({ label: 'Texto del botón' }),
        buttonLink: fields.text({ label: 'Enlace del botón' }),
      },
    }),

    /* ---------------- IMÁGENES DEL HOME ---------------- */
    imagenes: singleton({
      label: 'Imágenes',
      path: 'content/home/imagenes',
      format: { data: 'yaml' },
      schema: {
        portada: ranura('Esfera de la portada', '/'),

        webUno: ranura('Servicios · Web · imagen 1 (arriba izquierda)', '/home/web-design'),
        webDos: ranura('Servicios · Web · imagen 2 (arriba derecha)', '/home/web-design'),
        webTres: ranura('Servicios · Web · imagen 3 (abajo izquierda)', '/home/web-design'),
        webCuatro: ranura('Servicios · Web · imagen 4 (abajo derecha)', '/home/web-design'),

        adsEstadisticas: ranura(
          'Servicios · Performance Ads · estadísticas',
          '/home/performance-ads'
        ),
        adsGrafico: ranura('Servicios · Performance Ads · gráfico', '/home/performance-ads'),

        ux: ranura('Servicios · Diseño UX', '/home/ux-design'),
        branding: ranura('Servicios · Branding', '/home/branding'),

        nosotrosUno: ranura('Nosotros · imagen grande', '/about'),
        nosotrosDos: ranura('Nosotros · imagen pequeña', '/about'),
      },
    }),

    /* ---------------- SEO DE LAS PÁGINAS ---------------- */
    seoPaginas: singleton({
      label: 'SEO por página',
      path: 'content/seo-paginas',
      format: { data: 'yaml' },
      schema: {
        home: seoDePagina('Home'),
        contacto: seoDePagina('Contacto'),
        blog: seoDePagina('Blog'),
        nosotros: seoDePagina('Nosotros'),
        servicios: seoDePagina('Servicios'),
        web: seoDePagina('Servicio · Diseño y desarrollo web'),
        ads: seoDePagina('Servicio · Meta Ads'),
        uxui: seoDePagina('Servicio · Diseño UX/UI'),
        branding: seoDePagina('Servicio · Branding'),
      },
    }),

    /* ---------------- AJUSTES GENERALES ---------------- */
    ajustes: singleton({
      label: 'Ajustes del sitio',
      path: 'content/ajustes',
      format: { data: 'yaml' },
      schema: {
        siteName: fields.text({
          label: 'Nombre del sitio',
          description: 'Se usa al final de los títulos y al compartir.',
        }),
        titleTemplate: fields.text({
          label: 'Plantilla de títulos',
          description:
            'Cómo se arma el título de cada página. %s es el título de la página. Ejemplo: "%s | Valhu Group".',
        }),
        defaultDescription: fields.text({
          label: 'Descripción por defecto',
          description: 'La que se usa cuando una página no tiene la suya.',
          multiline: true,
        }),
        defaultOgImage: fields.image({
          label: 'Imagen por defecto al compartir',
          description: 'Se recomienda 1200 × 630 píxeles.',
          directory: 'public/seo',
          publicPath: '/seo',
        }),
      },
    }),

    /* ---------------- DATOS DE LA EMPRESA ---------------- */
    empresa: singleton({
      label: 'Datos de la empresa',
      path: 'content/empresa',
      format: { data: 'yaml' },
      schema: {
        name: fields.text({ label: 'Nombre comercial' }),
        legalName: fields.text({ label: 'Razón social', description: 'Opcional.' }),
        description: fields.text({
          label: 'A qué se dedica',
          description: 'Una o dos frases. Es lo que Google usa para entender qué es Valhu Group.',
          multiline: true,
        }),
        logo: fields.image({
          label: 'Logo',
          description: 'Cuadrado o casi. Lo usa Google en su ficha de empresa.',
          directory: 'public/seo',
          publicPath: '/seo',
        }),
        email: fields.text({ label: 'Correo de contacto' }),
        phone: fields.text({ label: 'Teléfono', description: 'Con código de país: +51 …' }),
        city: fields.text({ label: 'Ciudad' }),
        country: fields.text({ label: 'País' }),
        socials: fields.array(fields.url({ label: 'Enlace' }), {
          label: 'Redes sociales',
          description:
            'Instagram, LinkedIn, Facebook… Le confirman a Google que todas son de la misma empresa.',
          itemLabel: (props) => props.value ?? 'Enlace',
        }),
      },
    }),

    /* ---------------- FORMULARIO DE CONTACTO ---------------- */
    formulario: singleton({
      label: 'Formulario',
      path: 'content/formulario',
      format: { data: 'yaml' },
      schema: {
        intro: fields.text({
          label: 'Texto de arriba',
          description: 'Lo que lee la persona antes de empezar a llenar.',
          multiline: true,
        }),
        nota: fields.text({
          label: 'Nota destacada',
          description: 'La línea en cursiva. Déjala vacía si no la quieres.',
          multiline: true,
        }),
        presupuestos: fields.array(
          fields.object({
            soles: fields.text({ label: 'En soles', description: 'Ej.: S/ 2,200 – S/ 3,700' }),
            dolares: fields.text({ label: 'En dólares', description: 'Ej.: $599 – $999' }),
          }),
          {
            label: 'Rangos de presupuesto',
            description: 'Arrastra para cambiar el orden. Se muestran de menor a mayor.',
            itemLabel: (props) =>
              `${props.fields.soles.value || '—'}  ·  ${props.fields.dolares.value || '—'}`,
          }
        ),
        exitoTitulo: fields.text({ label: 'Título al enviar' }),
        exitoTexto: fields.text({ label: 'Mensaje al enviar', multiline: true }),
      },
    }),
  },
});
