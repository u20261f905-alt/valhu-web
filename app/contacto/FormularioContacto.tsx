"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Formulario de contacto por pasos.
 *
 * Pregunta de a poco en vez de mostrar un muro de campos: la primera
 * pantalla pide solo nombre y correo, que es el compromiso más bajo
 * posible, y a partir de ahí quien escribe ya está dentro.
 *
 * Los envíos salen a Web3Forms, que los reenvía al correo del equipo. No
 * hay base de datos ni servidor propio que mantener.
 */

export type Presupuesto = { soles: string; dolares: string };

export type TextosFormulario = {
  intro: string;
  nota: string;
  presupuestos: Presupuesto[];
  exitoTitulo: string;
  exitoTexto: string;
};

const PERFILES = [
  "Soy un emprendedor",
  "Soy una empresa",
  "Soy un ecommerce",
  "Soy una startup",
  "Otros",
];

/** La opción que abre un campo para escribir con sus palabras. */
const OTROS = "Otros";

const INTERESES = [
  "Diseño y desarrollo web",
  "Performance Ads (Google y Meta)",
  "Diseño UX/UI",
  "Branding",
  "Otros",
];

const PERFORMANCE = "Performance Ads (Google y Meta)";

/**
 * Cuando el único servicio marcado es Performance Ads, el presupuesto no es
 * el de un proyecto cerrado sino la inversión mensual en pauta, así que la
 * pregunta y los rangos cambian.
 */
const PRESUPUESTOS_PAUTA = [
  { soles: "S/ 1,000 - S/ 3,400", dolares: "$300 - $999" },
  { soles: "S/ 3,400 - S/ 6,800", dolares: "$1,000 - $1,999" },
  { soles: "S/ 6,800 - S/ 17,000", dolares: "$2,000 - $4,999" },
  { soles: "S/ 17,000 a más", dolares: "$5,000 a más" },
];

const PASOS = ["Tus datos", "Perfil", "Proyecto", "Empresa", "Presupuesto"];
const TOTAL_PASOS = PASOS.length;

/* ------------------------------------------------------------------ */
/*  Piezas de interfaz                                                 */
/* ------------------------------------------------------------------ */

const claseCampo =
  "w-full rounded-[8px] border border-[#D0D5DD] bg-white px-[16px] py-[14px] text-[15px] text-[#141821] outline-none transition-colors placeholder:text-[#9AA4AE] focus:border-[#1B3F7D]";

const clasePrimario =
  "inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#141821] px-[24px] py-[14px] text-[15px] font-semibold text-white transition-colors hover:bg-[#2b3240] disabled:cursor-not-allowed disabled:opacity-40";

const claseSecundario =
  "inline-flex items-center justify-center rounded-[8px] border border-[#D0D5DD] bg-transparent px-[22px] py-[14px] text-[15px] font-medium text-[#141821] transition-colors hover:bg-white";

function Pregunta({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-[18px] bg-transparent text-[17px] leading-[25px] text-[#141821] md:text-[19px] md:leading-[28px]">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */

export default function FormularioContacto({
  textos,
  encabezado,
}: {
  textos: TextosFormulario;
  encabezado?: React.ReactNode;
}) {
  const [paso, setPaso] = useState(1);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    perfil: "",
    perfilOtro: "",
    intereses: [] as string[],
    interesOtro: "",
    descripcion: "",
    empresa: "",
    enlace: "",
    presupuesto: "",
    // Trampa para robots: una persona nunca la ve ni la llena.
    botcheck: "",
  });

  const set = <K extends keyof typeof datos>(k: K, v: (typeof datos)[K]) =>
    setDatos((d) => ({ ...d, [k]: v }));

  const alternarInteres = (valor: string) =>
    setDatos((d) => ({
      ...d,
      intereses: d.intereses.includes(valor)
        ? d.intereses.filter((i) => i !== valor)
        : [...d.intereses, valor],
      // Los rangos del paso 5 dependen de lo que se marque aquí, así que
      // limpiamos la elección previa para no enviar un rango que ya no existe.
      presupuesto: "",
    }));

  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo.trim());

  const puedeSeguir =
    (paso === 1 && datos.nombre.trim().length > 1 && correoValido) ||
    (paso === 2 &&
      datos.perfil !== "" &&
      (datos.perfil !== OTROS || datos.perfilOtro.trim().length > 1)) ||
    (paso === 3 &&
      datos.intereses.length > 0 &&
      (!datos.intereses.includes(OTROS) ||
        datos.interesOtro.trim().length > 1) &&
      datos.descripcion.trim().length > 10) ||
    (paso === 4 && datos.empresa.trim().length > 10) ||
    (paso === 5 && datos.presupuesto !== "");

  // Solo pauta: ni web, ni branding, ni UX. Entonces preguntamos por la
  // inversión mensual en medios en lugar del presupuesto del proyecto.
  const soloPauta =
    datos.intereses.length === 1 && datos.intereses[0] === PERFORMANCE;

  const opcionesPresupuesto = soloPauta
    ? PRESUPUESTOS_PAUTA
    : textos.presupuestos;

  /**
   * Lo que se manda al correo. Cuando eligieron "Otros", vale más lo que
   * escribieron que la etiqueta genérica, así que va junto a ella.
   */
  const perfilParaEnviar =
    datos.perfil === OTROS ? `Otros: ${datos.perfilOtro.trim()}` : datos.perfil;

  const interesesParaEnviar = datos.intereses
    .map((i) => (i === OTROS ? `Otros: ${datos.interesOtro.trim()}` : i))
    .join(", ");

  async function enviar() {
    const clave = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!clave) {
      setError(
        "El formulario todavía no está conectado. Escríbenos a info@valhugroup.com mientras tanto.",
      );
      return;
    }

    setEnviando(true);
    setError(null);

    try {
      const respuesta = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: clave,
          subject: `Nuevo proyecto · ${datos.nombre}`,
          from_name: "Web Valhu Group",
          botcheck: datos.botcheck,
          Nombre: datos.nombre,
          Correo: datos.correo,
          Perfil: perfilParaEnviar,
          "Le interesa": interesesParaEnviar,
          "Sobre el proyecto": datos.descripcion,
          "Sobre la empresa": datos.empresa,
          "Web o app": datos.enlace || "—",
          [soloPauta ? "Inversión mensual en pauta" : "Presupuesto"]:
            datos.presupuesto,
        }),
      });

      if (!respuesta.ok) throw new Error("respuesta no ok");

      setEnviado(true);
    } catch {
      setError(
        "No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos a info@valhugroup.com.",
      );
    } finally {
      setEnviando(false);
    }
  }

  /* ---------------- pantalla final ---------------- */

  if (enviado) {
    // Sin la introducción: ya escribieron, pedirles detalle no viene al caso.
    return (
      <div className="rounded-[16px] border border-[#E1E7EC] bg-white px-[28px] py-[44px] text-center">
        <div className="mx-auto mb-[18px] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#E3F3E8]">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#256B3C"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 className="mb-[12px] !text-[28px] !leading-[34px] md:!text-[34px] md:!leading-[41px]">
          {textos.exitoTitulo}
        </h2>

        <p className="mx-auto mb-[26px] max-w-[420px] bg-transparent text-[15px] leading-[23px] text-[#525866]">
          {textos.exitoTexto}
        </p>

        <Link href="/" className={claseSecundario}>
          Volver al inicio
        </Link>
      </div>
    );
  }

  /* ---------------- formulario ---------------- */

  return (
    <>
      {encabezado}

      <div className="rounded-[16px] border border-[#E1E7EC] bg-white p-[24px] md:p-[32px]">
        {/* Progreso: un punto por paso, unidos por la línea del recorrido. */}
        <div className="mb-[24px] flex justify-center">
          <ol className="inline-flex items-center">
            {PASOS.map((nombre, i) => {
              const n = i + 1;
              const hecho = n < paso;
              const actual = n === paso;

              return (
                <li key={nombre} className="flex items-center">
                  {i > 0 ? (
                    <span
                      aria-hidden="true"
                      className={`mx-[7px] h-[2px] w-[20px] rounded-full transition-colors duration-300 md:w-[28px] ${
                        hecho || actual ? "bg-[#1B3F7D]" : "bg-[#E1E7EC]"
                      }`}
                    />
                  ) : null}

                  <span
                    aria-current={actual ? "step" : undefined}
                    title={nombre}
                    className={`flex h-[28px] w-[28px] items-center justify-center rounded-full transition-colors duration-300 ${
                      hecho
                        ? "bg-[#E1EDF4] text-[#1B3F7D]"
                        : actual
                          ? "bg-[#1B3F7D] text-white ring-[4px] ring-[#1B3F7D]/15"
                          : "bg-[#EDF3F7] text-[#C3CDD6]"
                    }`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="sr-only">{nombre}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Trampa para robots */}
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          checked={datos.botcheck !== ""}
          onChange={(e) => set("botcheck", e.target.checked ? "si" : "")}
        />

        {paso === 1 ? (
          <>
            <Pregunta>Para empezar, ¿cómo te llamas?</Pregunta>

            <div className="flex flex-col gap-[14px]">
              <input
                type="text"
                value={datos.nombre}
                onChange={(e) => set("nombre", e.target.value)}
                placeholder="Ingresa tus nombres y apellidos"
                className={claseCampo}
                autoFocus
              />
              <div>
                <input
                  type="email"
                  value={datos.correo}
                  onChange={(e) => set("correo", e.target.value)}
                  placeholder="Ingresa tu correo electrónico"
                  className={claseCampo}
                />
                {datos.correo.length > 4 && !correoValido ? (
                  <p className="mt-[7px] bg-transparent text-[13px] text-[#A03030]">
                    Revisa el correo, parece que le falta algo.
                  </p>
                ) : null}
              </div>
            </div>
          </>
        ) : null}

        {paso === 2 ? (
          <>
            <Pregunta>¿Quién nos escribe?</Pregunta>

            <div className="flex flex-col gap-[10px]">
              {PERFILES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => set("perfil", p)}
                  className={`rounded-[8px] border px-[18px] py-[15px] text-left text-[15px] transition-colors ${
                    datos.perfil === p
                      ? "border-[#1B3F7D] bg-[#E1EDF4] font-medium text-[#141821]"
                      : "border-[#D0D5DD] bg-transparent text-[#3A4450] hover:bg-[#F6FAFD]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {datos.perfil === OTROS ? (
              <input
                type="text"
                value={datos.perfilOtro}
                onChange={(e) => set("perfilOtro", e.target.value)}
                placeholder="Especifica…"
                autoFocus
                className={`${claseCampo} mt-[10px]`}
              />
            ) : null}
          </>
        ) : null}

        {paso === 3 ? (
          <>
            <Pregunta>¿En qué estás interesado?</Pregunta>

            <div className="mb-[20px] flex flex-col gap-[8px]">
              {INTERESES.map((i) => {
                const activo = datos.intereses.includes(i);

                return (
                  <label
                    key={i}
                    className={`flex cursor-pointer items-center gap-[12px] rounded-[8px] border px-[16px] py-[13px] text-[15px] transition-colors ${
                      activo
                        ? "border-[#1B3F7D] bg-[#E1EDF4] text-[#141821]"
                        : "border-[#D0D5DD] text-[#3A4450] hover:bg-[#F6FAFD]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={activo}
                      onChange={() => alternarInteres(i)}
                      className="h-[17px] w-[17px] accent-[#1B3F7D]"
                    />
                    {i}
                  </label>
                );
              })}
            </div>

            {datos.intereses.includes(OTROS) ? (
              <input
                type="text"
                value={datos.interesOtro}
                onChange={(e) => set("interesOtro", e.target.value)}
                placeholder="Especifica qué necesitas…"
                className={`${claseCampo} mb-[20px]`}
              />
            ) : null}

            <textarea
              value={datos.descripcion}
              onChange={(e) => set("descripcion", e.target.value)}
              rows={5}
              placeholder="Describe tu proyecto brevemente, siendo específico con el objetivo y lo que deseas recibir…"
              className={`${claseCampo} resize-y`}
            />
          </>
        ) : null}

        {paso === 4 ? (
          <>
            <Pregunta>Cuéntanos de tu empresa</Pregunta>

            <p className="mb-[16px] bg-transparent text-[14px] leading-[21px] text-[#77828C]">
              ¿De qué país son? ¿Cómo se llama? ¿En qué rubro se desempeña y qué
              productos o servicios ofrecen?
            </p>

            <div className="flex flex-col gap-[14px]">
              <textarea
                value={datos.empresa}
                onChange={(e) => set("empresa", e.target.value)}
                rows={5}
                placeholder="Ingresa aquí tu respuesta"
                className={`${claseCampo} resize-y`}
                autoFocus
              />
              <input
                type="text"
                value={datos.enlace}
                onChange={(e) => set("enlace", e.target.value)}
                placeholder="Enlace de tu web o app (opcional)"
                className={claseCampo}
              />
            </div>
          </>
        ) : null}

        {paso === 5 ? (
          <>
            <Pregunta>
              {soloPauta
                ? "¿Cuánto planeas invertir al mes en pauta digital?"
                : "¿Cuál es tu presupuesto para este proyecto?"}
            </Pregunta>

            <div className="flex flex-col gap-[10px]">
              {opcionesPresupuesto.map((p) => {
                const valor = `${p.soles} · ${p.dolares}`;
                const activo = datos.presupuesto === valor;

                return (
                  <button
                    key={valor}
                    type="button"
                    onClick={() => set("presupuesto", valor)}
                    className={`flex items-center justify-between gap-3 rounded-[8px] border px-[18px] py-[15px] text-left transition-colors ${
                      activo
                        ? "border-[#1B3F7D] bg-[#E1EDF4]"
                        : "border-[#D0D5DD] hover:bg-[#F6FAFD]"
                    }`}
                  >
                    <span
                      className={`text-[15px] ${activo ? "font-medium text-[#141821]" : "text-[#3A4450]"}`}
                    >
                      {p.soles}
                    </span>
                    <span className="shrink-0 text-[14px] text-[#77828C]">
                      {p.dolares}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        ) : null}

        {error ? (
          <p
            role="alert"
            className="mt-[18px] rounded-[8px] bg-[#FDECEC] px-[15px] py-[12px] text-[14px] leading-[21px] text-[#A03030]"
          >
            {error}
          </p>
        ) : null}

        {/* Navegación */}
        <div className="mt-[28px] flex items-center justify-between gap-[12px]">
          {paso > 1 ? (
            <button
              type="button"
              onClick={() => setPaso((p) => p - 1)}
              className={claseSecundario}
            >
              Volver
            </button>
          ) : (
            <span />
          )}

          {paso < TOTAL_PASOS ? (
            <button
              type="button"
              onClick={() => setPaso((p) => p + 1)}
              disabled={!puedeSeguir}
              className={clasePrimario}
            >
              Continuar
            </button>
          ) : (
            <button
              type="button"
              onClick={enviar}
              disabled={!puedeSeguir || enviando}
              className={clasePrimario}
            >
              {enviando ? "Enviando…" : "Enviar"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
