import Markdoc, {
  type Config,
  type Node,
  type RenderableTreeNode,
} from '@markdoc/markdoc';
import React from 'react';

/**
 * Dibuja el contenido de la nota.
 *
 * El texto se escribe en el editor y llega como un árbol, no como HTML. Cada
 * pieza se mapea a la tipografía del sitio, igual que antes, para que el
 * artículo respete el sistema de diseño.
 *
 * Se dibuja en el servidor: el lector no descarga nada de JavaScript para
 * leer la nota.
 */

/* ================================================================== */
/*  Esquema: qué componente dibuja cada pieza                          */
/* ================================================================== */

const config: Config = {
  nodes: {
    document: { render: 'Cuerpo' },
    heading: {
      render: 'Titulo',
      attributes: { level: { type: Number, required: true }, id: { type: String } },
    },
    paragraph: { render: 'Parrafo' },
    link: {
      render: 'Enlace',
      attributes: { href: { type: String, required: true }, title: { type: String } },
    },
    strong: { render: 'Fuerte' },
    em: { render: 'Enfasis' },
    list: { render: 'Lista', attributes: { ordered: { type: Boolean } } },
    item: { render: 'Item' },
    blockquote: { render: 'Cita' },
    hr: { render: 'Separador' },
    code: { render: 'CodigoEnLinea', attributes: { content: { type: String } } },
    fence: {
      render: 'BloqueDeCodigo',
      attributes: { content: { type: String }, language: { type: String } },
    },
    image: {
      render: 'Imagen',
      attributes: { src: { type: String, required: true }, alt: { type: String } },
    },
    table: { render: 'Tabla' },
    th: { render: 'Encabezado' },
    td: { render: 'Celda' },
  },
};

/* ================================================================== */
/*  Componentes                                                        */
/* ================================================================== */

type ConHijos = { children?: React.ReactNode };

const Cuerpo = ({ children }: ConHijos) => <>{children}</>;

function Titulo({ level, id, children }: ConHijos & { level: number; id?: string }) {
  if (level <= 2) {
    return (
      <h2
        id={id}
        className="mt-[40px] mb-[16px] text-[24px] leading-[32px] md:text-[32px] md:leading-[40px]"
      >
        {children}
      </h2>
    );
  }

  if (level === 3) {
    return (
      <h3
        id={id}
        className="mt-[32px] mb-[12px] text-[18px] leading-[26px] md:text-[22px] md:leading-[30px]"
      >
        {children}
      </h3>
    );
  }

  return (
    <h4
      id={id}
      className="mt-[24px] mb-[10px] text-[16px] leading-[24px] md:text-[18px] md:leading-[26px]"
    >
      {children}
    </h4>
  );
}

const Parrafo = ({ children }: ConHijos) => (
  <p className="mb-[20px] bg-transparent text-[15px] leading-[26px] text-[#3A4450] md:text-[17px] md:leading-[30px]">
    {children}
  </p>
);

const Fuerte = ({ children }: ConHijos) => (
  <strong className="font-semibold text-[#141821]">{children}</strong>
);

const Enfasis = ({ children }: ConHijos) => <em className="italic">{children}</em>;

function Enlace({ href, children }: ConHijos & { href: string }) {
  const externo = href?.startsWith('http');

  return (
    <a
      href={href}
      className="text-[#1B3F7D] underline decoration-[#9FB6D6] underline-offset-[3px] transition-colors hover:decoration-[#1B3F7D]"
      target={externo ? '_blank' : undefined}
      rel={externo ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}

function Lista({ ordered, children }: ConHijos & { ordered?: boolean }) {
  const clases = 'mb-[20px] flex flex-col gap-[10px] pl-[22px] marker:text-[#9FB6D6]';

  return ordered ? (
    <ol className={`list-decimal ${clases}`}>{children}</ol>
  ) : (
    <ul className={`list-disc ${clases}`}>{children}</ul>
  );
}

const Item = ({ children }: ConHijos) => (
  <li className="bg-transparent text-[15px] leading-[26px] text-[#3A4450] md:text-[17px] md:leading-[28px]">
    {children}
  </li>
);

const Cita = ({ children }: ConHijos) => (
  <blockquote className="mb-[24px] border-l-[3px] border-[#1B3F7D] bg-[#E1EDF4] px-[20px] py-[16px] text-[15px] leading-[26px] text-[#2C3642] md:text-[17px] md:leading-[28px]">
    {children}
  </blockquote>
);

const Separador = () => <hr className="my-[32px] border-t border-[#D8E3E9]" />;

const CodigoEnLinea = ({ content }: { content?: string }) => (
  <code className="rounded-[6px] bg-[#E1EDF4] px-[6px] py-[2px] text-[13px] text-[#1B3F7D]">
    {content}
  </code>
);

const BloqueDeCodigo = ({ content }: { content?: string }) => (
  <pre className="mb-[24px] overflow-x-auto rounded-[12px] bg-[#141821] p-[20px]">
    <code className="block overflow-x-auto text-[13px] leading-[22px] text-[#E6EEF8]">
      {content}
    </code>
  </pre>
);

const Imagen = ({ src, alt }: { src: string; alt?: string }) => (
  <span className="my-[28px] block overflow-hidden rounded-[16px]">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt={alt ?? ''} className="h-auto w-full object-cover" loading="lazy" />
  </span>
);

const Tabla = ({ children }: ConHijos) => (
  <div className="mb-[24px] overflow-x-auto">
    <table className="w-full border-collapse text-left text-[14px]">{children}</table>
  </div>
);

const Encabezado = ({ children }: ConHijos) => (
  <th className="border-b border-[#D0D5DD] px-[12px] py-[10px] font-semibold text-[#141821]">
    {children}
  </th>
);

const Celda = ({ children }: ConHijos) => (
  <td className="border-b border-[#E1E7EC] px-[12px] py-[10px] text-[#3A4450]">{children}</td>
);

const componentes = {
  Cuerpo,
  Titulo,
  Parrafo,
  Fuerte,
  Enfasis,
  Enlace,
  Lista,
  Item,
  Cita,
  Separador,
  CodigoEnLinea,
  BloqueDeCodigo,
  Imagen,
  Tabla,
  Encabezado,
  Celda,
};

/* ================================================================== */

export default function PostBody({ content }: { content: Node }) {
  const arbol: RenderableTreeNode = Markdoc.transform(content, config);

  return (
    <div className="post-body">{Markdoc.renderers.react(arbol, React, { components: componentes })}</div>
  );
}
