import Link from 'next/link';
import Image from 'next/image';

import SuscripcionFooter from './SuscripcionFooter';

export default function Footer() {
  return (
    <footer className="w-full bg-[#EFF8FD] pt-[48px] pb-[24px]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-8">
        
        {/* LOGO SUPERIOR */}
        <div className="relative mb-[40px]">
          <Image 
            src="/logo.svg" 
            alt="Logo Valhu Group" 
            width={120} 
            height={40} 
            className="w-auto h-[32px]"
            priority
          />
        </div>

        {/* CONTENEDOR PRINCIPAL: 4 Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[40px] text-[14px] text-[#525866]">
          
          {/* COLUMNA 1: Suscripción y Redes */}
          <div className="lg:col-span-4 flex flex-col gap-[24px]">
            {/* Textos de suscripción */}
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-[16px] font-semibold text-[#141821]">Suscríbete</h3>
              <p>Para mantenerte informado</p>
            </div>

            {/* Formulario */}
            <SuscripcionFooter />

            {/* Redes Sociales */}
            <div className="flex gap-[12px]">
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@valhu.media.2026"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Valhu Group en TikTok" className="w-[40px] h-[40px] bg-white rounded-[8px] flex items-center justify-center text-[#141821] hover:bg-[#E4E7EC] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61590436420522"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Valhu Group en Facebook" className="w-[40px] h-[40px] bg-white rounded-[8px] flex items-center justify-center text-[#141821] hover:bg-[#E4E7EC] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/valhu.media/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Valhu Group en Instagram" className="w-[40px] h-[40px] bg-white rounded-[8px] flex items-center justify-center text-[#141821] hover:bg-[#E4E7EC] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* COLUMNA 2: Servicios */}
          <div className="lg:col-span-3 flex flex-col gap-[24px]">
            <Link href="/servicios" className="hover:text-[#141821] transition-colors">Servicios</Link>
            <Link href="/servicios/diseno-desarrollo-web" className="hover:text-[#141821] transition-colors">Diseño y desarrollo web</Link>
            <Link href="/servicios/meta-ads" className="hover:text-[#141821] transition-colors">Meta Ads</Link>
            <Link href="/servicios/diseno-ux-ui" className="hover:text-[#141821] transition-colors">Diseño UX</Link>
            <Link href="/servicios/branding" className="hover:text-[#141821] transition-colors">Branding</Link>
            <Link href="/nosotros" className="hover:text-[#141821] transition-colors">Nosotros</Link>
            <Link href="/blog" className="hover:text-[#141821] transition-colors">Blog</Link>
          </div>

          {/* COLUMNA 3: Legales */}
          <div className="lg:col-span-3 flex flex-col gap-[24px]">
            <Link href="/legales/politica-de-privacidad" className="hover:text-[#141821] transition-colors">
              Política de privacidad
            </Link>
            <Link href="/legales/politica-de-cookies" className="hover:text-[#141821] transition-colors">
              Política de cookies
            </Link>
            <Link href="/legales/terminos-y-condiciones" className="hover:text-[#141821] transition-colors">
              Términos y condiciones
            </Link>
          </div>

          {/* COLUMNA 4: Contacto */}
          <div className="lg:col-span-2 flex flex-col gap-[24px]">
            <span className="uppercase text-[#141821] font-semibold">ESCRÍBENOS A</span>
            <a href="mailto:info@valhugroup.com" className="hover:text-[#141821] transition-colors">
              info@valhugroup.com
            </a>
          </div>

        </div>

        {/* LÍNEA DIVISORIA Y COPYRIGHT */}
        <div className="mt-[48px] pt-[24px] border-t border-[#D0D5DD] flex flex-col md:flex-row justify-between items-center gap-[16px] text-[14px] text-[#141821]">
          <p>ValhuGroup © 2026 Todos los derechos reservados</p>
          <p>
            Desarrollado por <span className="font-semibold text-[#0057B7]">ValhuGroup</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
