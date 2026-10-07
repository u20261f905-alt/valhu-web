# Valhu Group — sitio web

Sitio de [Valhu Group](https://valhugroup.com), agencia de innovación digital.
Construido con **Next.js 16**, **React 19**, **Tailwind CSS v4** y **GSAP**.

El contenido no vive en una base de datos: son archivos dentro de este
repositorio, gestionados con **Keystatic**. Publicar un cambio es hacer commit.

---

## Levantar el proyecto

```bash
npm install
npm run dev
```

El sitio queda en `http://localhost:3000` y el editor de contenidos en
`http://localhost:3000/keystatic`.

## Variables de entorno

Crea un archivo `.env.local` en la raíz (no se sube al repositorio):

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WEB3FORMS_KEY=tu-clave-de-web3forms
```

En producción, `NEXT_PUBLIC_SITE_URL` debe ser el dominio real
(`https://valhugroup.com`). De ahí salen el sitemap, las URLs canónicas, las
imágenes de previsualización al compartir y los botones de compartir del blog.

`NEXT_PUBLIC_WEB3FORMS_KEY` es la clave de [Web3Forms](https://web3forms.com)
que reciben el formulario de contacto y la suscripción del pie. Sin ella, los
dos avisan que no están conectados en lugar de fallar en silencio.

Opcionalmente, `NEXT_PUBLIC_KEYSTATIC_MODO=github` hace que el editor guarde
en GitHub en vez de en el disco. Solo tiene sentido en producción, y solo con
la autenticación de GitHub configurada: sin ella el editor queda cerrado a
propósito, porque si no cualquiera que escribiera la dirección entraría.

---

## Dónde se edita cada cosa

Todo el contenido está en `content/`, y se edita desde `/keystatic`:

`content/home/` tiene las secciones de la portada: portada, servicios,
nosotros, preguntas frecuentes, contacto e imágenes. `content/notas/` son las
notas del blog, en formato Markdoc, con `content/categorias/` para sus
categorías. `content/legales/` guarda la política de privacidad, la de cookies
y los términos y condiciones. `content/formulario.yaml` controla los textos y
los rangos de presupuesto del formulario de contacto. Y `content/ajustes.yaml`,
`content/empresa.yaml` y `content/seo-paginas.yaml` reúnen el SEO del sitio.

Las imágenes van en `public/`, organizadas por sección.

---

## Estructura

```
app/
  components/     Componentes compartidos (Hero, Servicios, CTA, FAQ, Footer…)
  blog/           Listado del blog y notas individuales
  servicios/      Las cuatro páginas de servicio
  nosotros/       Página de la agencia
  contacto/       Formulario de contacto en cinco pasos
  legales/        Políticas, generadas desde content/legales
  keystatic/      Editor de contenidos
  seo/            Herramienta interna de análisis SEO
  sitemap.ts      Sitemap, se arma solo con las páginas y las notas
  robots.ts       Instrucciones para buscadores
lib/
  contenido.ts    Capa de datos: lee los archivos de content/ con Keystatic
  home-defaults.ts  Textos de respaldo si falta contenido
  schema.ts       Datos estructurados para Google
```

---

## Convenciones

En los textos editables, `*palabra*` se dibuja en PP Editorial New cursiva
(el acento tipográfico de la marca) y `**palabra**` en negrita. La puntuación
va **dentro** de los asteriscos, o queda un espacio suelto antes del punto.

Las animaciones usan GSAP con ScrollTrigger y respetan
`prefers-reduced-motion`. El texto que se revela palabra por palabra se divide
en el JSX, nunca con `SplitText`: esa utilidad reescribe el HTML de nodos que
React controla y provoca errores al navegar entre páginas.

Las imágenes se exportan al doble del tamaño en que se muestran, en WebP.

---

## Build y despliegue

```bash
npm run build
npm start
```

`npm run build` compila **todas** las rutas, también las que nunca abres en
desarrollo. Córrelo antes de cada despliegue.

Antes de publicar: define las variables de entorno en el hosting, cambia la
Website URL en el panel de Web3Forms al dominio real, y completa los *Datos de
la empresa* y el *SEO por página* en el editor.
