'use client';

import { useState } from 'react';

/**
 * Suscripción del footer. Usa la misma cuenta de Web3Forms que el formulario
 * de contacto, con otro asunto para distinguir los correos en la bandeja.
 */
export default function SuscripcionFooter() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [botcheck, setBotcheck] = useState('');
  const [estado, setEstado] = useState<'inicial' | 'enviando' | 'listo'>(
    'inicial'
  );
  const [error, setError] = useState<string | null>(null);

  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault();

    if (!correoValido || nombre.trim().length < 2) {
      setError('Déjanos tu nombre y un correo válido.');
      return;
    }

    const clave = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!clave) {
      setError(
        'La suscripción todavía no está conectada. Escríbenos a info@valhugroup.com.'
      );
      return;
    }

    setEstado('enviando');
    setError(null);

    try {
      const respuesta = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: clave,
          subject: `Nueva suscripción · ${nombre.trim()}`,
          from_name: 'Web Valhu Group',
          botcheck,
          Nombre: nombre.trim(),
          Correo: correo.trim(),
          Origen: 'Suscripción del footer',
        }),
      });

      if (!respuesta.ok) throw new Error('respuesta no ok');

      setEstado('listo');
      setNombre('');
      setCorreo('');
    } catch {
      setEstado('inicial');
      setError('No pudimos registrarte. Inténtalo de nuevo en un momento.');
    }
  }

  if (estado === 'listo') {
    return (
      <p
        role="status"
        className="w-full max-w-[320px] rounded-[8px] border border-[#D0D5DD] bg-white px-[16px] py-[14px] text-[14px] leading-[20px] text-[#141821]"
      >
        Listo, quedaste suscrito. Te escribiremos cuando publiquemos algo que
        valga la pena.
      </p>
    );
  }

  const estiloInput =
    'w-full px-[16px] py-[12px] rounded-[8px] bg-white border border-[#E4E7EC] outline-none focus:border-[#141821] text-[14px] transition-colors placeholder:text-[#98A2B3]';

  return (
    <form
      onSubmit={enviar}
      noValidate
      className="flex flex-col gap-[16px] w-full max-w-[320px]"
    >
      {/* Trampa para bots: invisible para personas, irresistible para scripts. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        checked={botcheck === 'on'}
        onChange={(e) => setBotcheck(e.target.checked ? 'on' : '')}
      />

      <label className="sr-only" htmlFor="suscripcion-nombre">
        Nombre completo
      </label>
      <input
        id="suscripcion-nombre"
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Ingresa tu nombre completo"
        className={estiloInput}
      />

      <label className="sr-only" htmlFor="suscripcion-correo">
        Correo electrónico
      </label>
      <input
        id="suscripcion-correo"
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="Ingresa tu correo electrónico"
        className={estiloInput}
      />

      {error ? (
        <p role="alert" className="text-[13px] leading-[18px] text-[#B42318]">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={estado === 'enviando'}
        className="w-fit px-[24px] py-[12px] rounded-[8px] bg-[#141821] text-white font-medium transition-colors hover:bg-[#2b3240] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {estado === 'enviando' ? 'Enviando…' : 'Suscribirme'}
      </button>
    </form>
  );
}
