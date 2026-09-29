# Editor de contenidos — Guía de uso

Con este editor puedes cambiar los textos del home y escribir notas del blog
sin tocar código. Está en **/keystatic**.

No hay base de datos ni contraseñas: todo el contenido son archivos dentro del
proyecto. Lo que escribes queda guardado junto al código, con su historial de
cambios.

A la izquierda están las secciones:

```
BLOG
  Notas
  Categorías

HOME
  Portada
  Servicios
  Nosotros
  Preguntas frecuentes
  Contacto
```

---

## Cómo se guarda

Depende de dónde estés trabajando.

**En tu computadora** (`localhost:3000/keystatic`) el editor escribe directo en
los archivos del proyecto. Lo vas a ver en tu editor de código como cambios en
la carpeta `content`. Para que esos cambios lleguen a la web publicada hay que
subirlos con un commit, como cualquier otro cambio.

**En la web publicada** hace falta conectar una app de GitHub. Mientras no se
haga, el editor solo funciona en tu computadora. Está explicado al final.

---

## Home

Cada bloque de la página principal es su propia pantalla, en el mismo orden en
que se ven al bajar por la web.

**Portada** — El texto pequeño de arriba, el título grande, el párrafo y el
botón.

**Servicios** — El título y párrafo de la sección, más las cuatro tarjetas
(Diseño y desarrollo web, Performance Ads, Diseño UX, Branding). Cada tarjeta
tiene su propio título, descripción y botón.

**Nosotros** — El título, el párrafo introductorio, los dos párrafos de abajo
y el botón.

**Preguntas frecuentes** — El título y el botón del bloque, y debajo la lista
de preguntas. Arrastra para cambiar el orden; la primera se muestra abierta en
la web. La casilla de cada pregunta te deja ocultarla sin borrarla.

Ten en cuenta que este bloque no sale solo en el home: también aparece al
final de las páginas de servicios.

**Contacto** — El bloque final que se repite en varias páginas: primera línea
del título, segunda línea (sale en cursiva), párrafo y botón.

### Dar formato dentro de un texto

En los títulos y párrafos del home puedes usar dos marcas:

| Escribes | Sale |
|---|---|
| `*una palabra*` | En cursiva, con la tipografía editorial |
| `**una palabra**` | En negrita |

Son las mismas de siempre: si ves un título con una palabra en cursiva, así
está escrita.

> Si dejas un campo vacío, ese texto vuelve al valor original de la web. No se
> queda en blanco: es una red de seguridad para que la página nunca se vea
> rota.

---

## Notas del blog

### Escribir una nota

En **Notas** → **New entry**.

**Título** — Lo primero que ve el lector y lo que sale en Google. La URL se
arma sola a partir de él; puedes editarla con el lápiz que aparece al lado.

> No cambies la URL de una nota ya publicada: romperías el enlace que la gente
> ya tiene.

**Resumen** — Dos líneas que aparecen en el listado del blog y arriba de la
nota. Es lo que decide si alguien entra a leer.

**Contenido** — Es un editor de verdad: selecciona texto y usa la barra de
formato para subtítulos, negrita, cursiva, listas, enlaces y citas. También
funcionan los atajos de siempre (Ctrl+B para negrita) y escribir `## ` al
inicio de una línea para hacer un subtítulo.

**Imagen de portada** — Súbela desde tu computadora. Escribe también qué se ve
en la imagen: sirve para Google y para quien usa lector de pantalla.

**Categoría** — Elige una de la lista. Se administran en **Categorías**, en la
misma barra de la izquierda: ahí puedes crear, renombrar y borrar. El campo
*Orden* define en qué posición aparece cada una.

Si borras una categoría, las notas que ya la tenían asignada la conservan.

**Etiquetas** — Se agregan una por una con el botón de añadir.

**Estado** — *Borrador* o *Publicada*. Solo las publicadas salen en la web.

**Nota destacada** — Sale grande arriba del blog. Debería estar marcada en una
sola nota; si marcas varias, se muestra la más reciente.

**Fecha de publicación** — Determina el orden del blog.

---

## SEO

Cada nota tiene un bloque **SEO** con estos campos:

**Búsqueda objetivo** — La frase que quieres que la gente escriba en Google
para llegar a esta nota. Por ejemplo *"rediseño de web para clínicas"*, no solo
*"web"*. Es la base del puntaje de la pantalla de revisión.

**Título y descripción para Google** — Si los dejas vacíos se usan el título y
el resumen de la nota. Llénalos solo si quieres un texto distinto en el
buscador.

**Título, descripción e imagen al compartir** — Cómo se ve la nota en WhatsApp,
LinkedIn o Facebook. Vacíos, se usan los de Google y la portada.

**URL canónica** — Solo si este mismo contenido existe en otra dirección y
quieres indicarle a Google cuál es la oficial.

**Ocultar esta nota de Google** — La nota sigue visible para quien tenga el
enlace, pero se le pide a los buscadores que no la incluyan. Con esto activado
no posiciona en absoluto.

### La pantalla de revisión

En **/seo** tienes la tabla de todas las notas con su puntaje de 0 a 100 y qué
le falta a cada una. Se revisa después de escribir, no mientras escribes.

Son ocho comprobaciones, ordenadas por lo que más pesa:

| Comprobación | Peso |
|---|---|
| La búsqueda aparece en el título | 20 |
| Aparece en la URL | 15 |
| Aparece en la descripción | 15 |
| Aparece en el primer párrafo | 15 |
| Aparece en algún subtítulo | 10 |
| La nota tiene al menos 600 palabras | 10 |
| La nota está dividida en subtítulos | 10 |
| La portada tiene descripción con la búsqueda | 5 |

Una nota sin búsqueda objetivo no se puede evaluar: aparece listada pero sin
puntaje.

> No persigas el 100. Arriba de 60 la nota ya está bien armada; forzar la
> frase donde no encaja se nota al leer y no ayuda.

Esta pantalla solo se ve mientras trabajas en tu computadora. Para tenerla
también en la web publicada hay que poner `NEXT_PUBLIC_MOSTRAR_SEO=1` en las
variables de entorno del hosting.

---

## Editar desde la web publicada

Mientras no se configure, el editor funciona solo en tu computadora. Para
abrirlo en `tusitio.com/keystatic` hay que conectar una app de GitHub:

1. Con el proyecto corriendo en tu computadora, entra a `/keystatic` y sigue el
   asistente de conexión con GitHub que aparece ahí.
2. Copia las tres claves que te da (`KEYSTATIC_GITHUB_CLIENT_ID`,
   `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`) a las variables de
   entorno de tu hosting.
3. Agrega también `NEXT_PUBLIC_KEYSTATIC_MODO=github`.

A partir de ahí, cada vez que alguien guarde en el editor se crea un commit en
el repositorio y la web se reconstruye sola. Quien edite necesita cuenta de
GitHub con acceso al proyecto.

---

## Preguntas frecuentes

**Guardé y no cambia en la web.** En tu computadora, el cambio queda en los
archivos y se ve al recargar. En la web publicada, hay que subir los cambios
con un commit.

**Cambié un texto del home y volvió al anterior.** Probablemente lo dejaste
vacío. Los campos en blanco vuelven al texto original a propósito.

**No veo el puntaje de una nota en /seo.** Le falta la búsqueda objetivo.

**¿Dónde quedaron mis notas?** En `content/notas`, como archivos de texto. Los
puedes abrir con cualquier editor si algún día lo necesitas: no están
encerradas en ningún sistema.

**¿Cuánto debe medir una nota?** No hay regla, pero entre 600 y 1200 palabras
suele funcionar bien.
