'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="w-full bg-[#EFF8FD] sticky top-0 z-50">
      <div className="max-w-[1220px] mx-auto px-4 md:px-8 py-[20px] flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.svg" 
            alt="Valhu Logo" 
            width={120} 
            height={30} 
            priority
            className="w-[120px] h-[30px] object-contain"
          />
        </Link>

        {/* NAVEGACIÓN DESKTOP */}
        <nav className="hidden md:flex items-center gap-[40px]">
          <Link 
            href="#inicio" 
            className="text-[16px] leading-[22px] text-[#141821] font-normal transition-all hover:font-semibold"
          >
            Inicio
          </Link>
          <Link 
            href="#nosotros" 
            className="text-[16px] leading-[22px] text-[#141821] font-normal transition-all hover:font-semibold"
          >
            Nosotros
          </Link>

          {/* SERVICIOS CON DESPLEGABLE DESKTOP */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button 
              className="flex items-center gap-1.5 text-[16px] leading-[22px] text-[#141821] font-normal transition-all hover:font-semibold focus:outline-none"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              Servicios
              <svg 
                className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* PANEL DROPDOWN DESKTOP */}
            {isServicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[240px] bg-white rounded-xl shadow-lg border border-gray-100 p-2 transition-all z-50">
                <Link
                  href="#web-design"
                  className="block px-4 py-2.5 rounded-lg hover:bg-[#EFF8FD] text-[#141821] text-[14px] leading-[22px] font-normal transition-all hover:font-semibold"
                >
                  Diseño y desarrollo web
                </Link>
                <Link
                  href="#meta-ads"
                  className="block px-4 py-2.5 rounded-lg hover:bg-[#EFF8FD] text-[#141821] text-[14px] leading-[22px] font-normal transition-all hover:font-semibold"
                >
                  Meta Ads
                </Link>
                <Link
                  href="#ux-design"
                  className="block px-4 py-2.5 rounded-lg hover:bg-[#EFF8FD] text-[#141821] text-[14px] leading-[22px] font-normal transition-all hover:font-semibold"
                >
                  Diseño UX
                </Link>
                <Link
                  href="#branding"
                  className="block px-4 py-2.5 rounded-lg hover:bg-[#EFF8FD] text-[#141821] text-[14px] leading-[22px] font-normal transition-all hover:font-semibold"
                >
                  Branding
                </Link>
              </div>
            )}
          </div>

          <Link 
            href="#blog" 
            className="text-[16px] leading-[22px] text-[#141821] font-normal transition-all hover:font-semibold"
          >
            Blog
          </Link>

          {/* BOTÓN CTA */}
          <Link 
            href="#agenda" 
            className="bg-[#141821] text-white rounded-[8px] p-[16px] text-[16px] leading-[22px] font-medium hover:bg-opacity-90 transition-all text-center inline-block"
          >
            Agenda una reunión
          </Link>
        </nav>

        {/* BOTÓN MENÚ HAMBURGUESA (MOBILE) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
          aria-label="Abrir Menú"
        >
          <span className={`block w-6 h-[2px] bg-[#141821] transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
          <span className={`block w-6 h-[2px] bg-[#141821] transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-[2px] bg-[#141821] transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
        </button>

      </div>

      {/* DESPLEGABLE MOBILE */}
      {isOpen && (
        <nav className="md:hidden bg-[#EFF8FD] px-6 pb-6 pt-2 flex flex-col space-y-4 border-b border-gray-200/40">
          <Link 
            href="#inicio" 
            onClick={() => setIsOpen(false)} 
            className="text-[16px] leading-[22px] text-[#141821] font-normal transition-all hover:font-semibold"
          >
            Inicio
          </Link>
          <Link 
            href="#nosotros" 
            onClick={() => setIsOpen(false)} 
            className="text-[16px] leading-[22px] text-[#141821] font-normal transition-all hover:font-semibold"
          >
            Nosotros
          </Link>

          {/* ACORDEÓN DE SERVICIOS MOBILE */}
          <div className="flex flex-col">
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center justify-between text-[16px] leading-[22px] text-[#141821] font-normal transition-all hover:font-semibold w-full text-left"
            >
              Servicios
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isServicesOpen && (
              <div className="pl-4 pt-2 flex flex-col space-y-2">
                <Link
                  href="#web-design"
                  onClick={() => setIsOpen(false)}
                  className="text-[14px] leading-[22px] text-[#141821]/80 font-normal transition-all hover:font-semibold"
                >
                  Diseño y desarrollo web
                </Link>
                <Link
                  href="#meta-ads"
                  onClick={() => setIsOpen(false)}
                  className="text-[14px] leading-[22px] text-[#141821]/80 font-normal transition-all hover:font-semibold"
                >
                  Meta Ads
                </Link>
                <Link
                  href="#ux-design"
                  onClick={() => setIsOpen(false)}
                  className="text-[14px] leading-[22px] text-[#141821]/80 font-normal transition-all hover:font-semibold"
                >
                  Diseño UX
                </Link>
                <Link
                  href="#branding"
                  onClick={() => setIsOpen(false)}
                  className="text-[14px] leading-[22px] text-[#141821]/80 font-normal transition-all hover:font-semibold"
                >
                  Branding
                </Link>
              </div>
            )}
          </div>

          <Link 
            href="#blog" 
            onClick={() => setIsOpen(false)} 
            className="text-[16px] leading-[22px] text-[#141821] font-normal transition-all hover:font-semibold"
          >
            Blog
          </Link>
          <Link 
            href="#agenda" 
            onClick={() => setIsOpen(false)}
            className="bg-[#141821] text-white rounded-[8px] p-[16px] text-[16px] leading-[22px] font-medium text-center transition-all hover:bg-opacity-90"
          >
            Agenda una reunión
          </Link>
        </nav>
      )}
    </header>
  );
}