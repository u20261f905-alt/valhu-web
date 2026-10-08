'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * Banner de consentimiento de cookies.
 *
 * Google Tag Manager (y con él Analytics, Clarity y lo que agregues después)
 * NO se carga hasta que la persona acepta. Esa es la parte importante: tener
 * la política escrita no basta, el script no debe ejecutarse antes del "sí".
 *
 * La decisión se guarda en el navegador de cada visitante, así que el banner
 * aparece una sola vez por dispositivo.
 */

const GTM_ID = 'GTM-WPHXV986';
const CLAVE = 'valhu-cookies';

type Decision = 'aceptado' | 'rechazado';

/* ------------------------------------------------------------------ */

function leerDecision(): Decision | null {
  try {
    const valor = window.localStorage.getItem(CLAVE);
    return valor === 'aceptado' || valor === 'rechazado' ? valor : null;
  } catch {
    // Navegación privada o almacenamiento bloqueado: preguntamos de nuevo.
    return null;
  }
}

function guardarDecision(decision: Decision) {
  try {
    window.localStorage.setItem(CLAVE, decision);
  } catch {
    // Si no se puede guardar, la medición vale solo para esta visita.
  }
}

/**
 * Modo de consentimiento de Google. Declara que, por defecto, nada está
 * permitido; cuando la persona acepta, se actualiza. Hay que declararlo
 * ANTES de cargar el contenedor para que las etiquetas lo respeten.
 */
function prepararDataLayer() {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];

  function gtag(...args: unknown[]) {
    w.dataLayer!.push(args);
  }

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
  });

  return gtag;
}

function cargarGtm() {
  const w = window as unknown as { __valhuGtm?: boolean };
  if (w.__valhuGtm) return;
  w.__valhuGtm = true;

  const gtag = prepararDataLayer();

  gtag('consent', 'update', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
  });

  (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

/* ------------------------------------------------------------------ */

export default function ConsentimientoCookies() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const decision = leerDecision();

    if (decision === 'aceptado') {
      cargarGtm();
      return;
    }

    if (decision === null) setVisible(true);
  }, []);

  const aceptar = useCallback(() => {
    guardarDecision('aceptado');
    setVisible(false);
    cargarGtm();
  }, []);

  const rechazar = useCallback(() => {
    guardarDecision('rechazado');
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 md:px-8 md:pb-6"
    >
      <div className="mx-auto flex max-w-[1220px] flex-col gap-[16px] rounded-[16px] border border-[#E1E7EC] bg-white p-[20px] shadow-[0_12px_32px_rgba(20,24,33,0.12)] md:flex-row md:items-center md:justify-between md:gap-[24px] md:p-[24px]">
        <p className="bg-transparent text-[14px] leading-[20px] text-[#485157]">
          Usamos cookies propias y de terceros para entender cómo se usa el
          sitio y mejorar lo que hacemos. Puedes aceptarlas o seguir sin ellas.{' '}
          <Link
            href="/legales/politica-de-cookies"
            className="underline underline-offset-2 transition-colors hover:text-[#141821]"
          >
            Ver la política de cookies
          </Link>
          .
        </p>

        <div className="flex shrink-0 flex-col gap-[12px] sm:flex-row">
          <button
            type="button"
            onClick={rechazar}
            className="inline-flex items-center justify-center rounded-[8px] border border-[#D0D5DD] bg-[#EFF8FD] px-[20px] py-[12px] text-[14px] font-semibold text-[#141821] transition-colors hover:bg-white"
          >
            Solo lo necesario
          </button>

          <button
            type="button"
            onClick={aceptar}
            className="inline-flex items-center justify-center rounded-[8px] bg-[#141821] px-[20px] py-[12px] text-[14px] font-semibold text-white transition-colors hover:bg-[#2b3240]"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
