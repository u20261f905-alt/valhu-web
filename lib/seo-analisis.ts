/**
 * Análisis de SEO al estilo RankMath.
 *
 * Revisa si la palabra clave elegida aparece donde importa y devuelve una
 * lista de comprobaciones en lenguaje claro, más un puntaje de 0 a 100.
 *
 * Los pesos son los mismos de siempre; lo que cambió es de dónde sale el
 * texto: antes se leía de una cadena de Markdown y ahora del árbol que
 * entrega el editor.
 */

export type Comprobacion = {
  id: string;
  texto: string;
  cumple: boolean;
  /** Cuánto pesa en el puntaje */
  peso: number;
  /** Qué hacer si no cumple */
  consejo: string;
};

export type Analisis = {
  puntaje: number;
  nivel: 'sin-keyword' | 'malo' | 'regular' | 'bueno' | 'excelente';
  comprobaciones: Comprobacion[];
};

/** Normaliza para comparar sin tildes ni mayúsculas. */
function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

function contiene(donde: string, que: string): boolean {
  if (!que.trim()) return false;
  return normalizar(donde).includes(normalizar(que.trim()));
}

export type EntradaAnalisis = {
  keyword: string;
  title: string;
  slug: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  coverAlt: string;
  /** Todo el texto de la nota, ya sin marcas. */
  textoCompleto: string;
  primerParrafo: string;
  subtitulos: string[];
  palabras: number;
};

export function analizarSeo(entrada: EntradaAnalisis): Analisis {
  const {
    keyword,
    title,
    slug,
    excerpt,
    seoTitle,
    seoDescription,
    coverAlt,
    primerParrafo,
    subtitulos,
    palabras,
  } = entrada;

  if (!keyword.trim()) {
    return { puntaje: 0, nivel: 'sin-keyword', comprobaciones: [] };
  }

  const tituloGoogle = seoTitle || title;
  const descripcionGoogle = seoDescription || excerpt;

  const comprobaciones: Comprobacion[] = [
    {
      id: 'titulo',
      texto: 'La keyword aparece en el título',
      cumple: contiene(tituloGoogle, keyword),
      peso: 20,
      consejo: 'Incluye la búsqueda en el título, de preferencia al inicio.',
    },
    {
      id: 'url',
      texto: 'La keyword aparece en la URL',
      cumple: contiene(slug.replace(/-/g, ' '), keyword),
      peso: 15,
      consejo: 'Ajusta la URL para que contenga la búsqueda principal.',
    },
    {
      id: 'descripcion',
      texto: 'La keyword aparece en la descripción',
      cumple: contiene(descripcionGoogle, keyword),
      peso: 15,
      consejo: 'Menciona la búsqueda en la descripción que verá la gente en Google.',
    },
    {
      id: 'primer-parrafo',
      texto: 'La keyword aparece en el primer párrafo',
      cumple: contiene(primerParrafo, keyword),
      peso: 15,
      consejo: 'Nómbrala en las primeras líneas: confirma de qué trata la nota.',
    },
    {
      id: 'subtitulos',
      texto: 'La keyword aparece en algún subtítulo',
      cumple: subtitulos.some((s) => contiene(s, keyword)),
      peso: 10,
      consejo: 'Usa la búsqueda (o una variante) en al menos un subtítulo.',
    },
    {
      id: 'imagen',
      texto: 'La portada tiene descripción con la keyword',
      cumple: contiene(coverAlt, keyword),
      peso: 5,
      consejo: 'Describe la imagen incluyendo la búsqueda principal.',
    },
    {
      id: 'largo',
      texto: 'La nota tiene al menos 600 palabras',
      cumple: palabras >= 600,
      peso: 10,
      consejo: `Vas en ${palabras} palabras. Los textos cortos rinden menos en búsqueda.`,
    },
    {
      id: 'subtitulos-hay',
      texto: 'La nota está dividida en subtítulos',
      cumple: subtitulos.length >= 2,
      peso: 10,
      consejo: 'Divide el texto con subtítulos: se lee mejor y Google lo entiende mejor.',
    },
  ];

  const puntaje = comprobaciones.reduce((t, c) => t + (c.cumple ? c.peso : 0), 0);

  const nivel: Analisis['nivel'] =
    puntaje >= 85 ? 'excelente' : puntaje >= 60 ? 'bueno' : puntaje >= 35 ? 'regular' : 'malo';

  return { puntaje, nivel, comprobaciones };
}
