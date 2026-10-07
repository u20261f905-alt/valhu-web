'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import AnimatedRichText from './AnimatedRichText';
import RichText from './RichText';
import { SERVICES_POR_DEFECTO, type ServicesContent, laImagen, type Imagenes } from '@/lib/home-defaults';

gsap.registerPlugin(ScrollTrigger);

const heroButtonClass =
  'inline-flex items-center justify-between w-full sm:w-auto gap-3 px-[20px] py-[16px] rounded-[8px] border border-[#D0D5DD] bg-[#EFF8FD] text-[#141821] text-[16px] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141821] transition-colors';

const performanceButtonClass =
  'inline-flex items-center justify-between w-full sm:w-auto gap-3 px-[20px] py-[16px] rounded-[8px] border border-[#3366C0] bg-transparent text-white text-[16px] hover:bg-white/10 transition-colors relative z-10';

const secondaryButtonClass =
  'inline-flex items-center justify-between w-full sm:w-auto gap-3 px-[20px] py-[16px] rounded-[8px] bg-transparent text-white text-[16px] transition-colors relative z-10';

function ArrowIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="-scale-y-100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.05317 5.80864L16.6169 14.568L16.7007 7.14383L17.6984 7.09145L17.5946 16.2833L8.40276 16.1794L8.47766 15.1832L15.9018 15.267L7.33812 6.50772L8.05317 5.80864Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Services({
  content = SERVICES_POR_DEFECTO,
  imagenes,
}: {
  content?: ServicesContent;
  imagenes?: Imagenes;
}) {
  const img = {
    webUno: laImagen(imagenes?.webUno, '/home/web-design/bithon-1.png', 'Bithon'),
    webDos: laImagen(imagenes?.webDos, '/home/web-design/2-en-1.png', '2 en 1'),
    webTres: laImagen(imagenes?.webTres, '/home/web-design/indie-uy.png', 'Indie Uy'),
    webCuatro: laImagen(imagenes?.webCuatro, '/home/web-design/yo-busco.png', 'Yo Busco'),
    adsEstadisticas: laImagen(imagenes?.adsEstadisticas, '/home/performance-ads/performance-ads-stats.webp', 'Stats Performance Ads'),
    adsGrafico: laImagen(imagenes?.adsGrafico, '/home/performance-ads/performance-ads-chart.png', 'Chart Performance Ads'),
    ux: laImagen(imagenes?.ux, '/home/ux-design/diseno-ux-ui.webp', 'Diseño UX ilustración'),
    branding: laImagen(imagenes?.branding, '/home/branding/branding-design.webp', 'Branding ilustración'),
  };

  const containerRef = useRef<HTMLElement>(null);
  const { web, ads, ux, branding } = content.cards;

  useGSAP(
    () => {
      // TÍTULO + PÁRRAFO DE SERVICIOS
      // Misma animación que el Hero,
      // pero activada al entrar en viewport.

      gsap.fromTo(
        ['.services-blur-word', '.services-blur-paragraph-word'],
        {
          autoAlpha: 0,
          filter: 'blur(10px)',
          y: 10,
        },
        {
          autoAlpha: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 0.4,
          stagger: 0.015,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      // TARJETAS DE SERVICIOS
      // Cada tarjeta entra desde una dirección distinta al llegar al viewport.

      // 1. DISEÑO Y DESARROLLO WEB — entra desde la IZQUIERDA (suave y lenta)
      gsap.fromTo(
        '.card-web',
        { autoAlpha: 0, x: -80 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.card-web',
            start: 'top 65%',
            once: true,
          },
        }
      );

      // 2. PERFORMANCE / META ADS — entra desde la DERECHA (mismo ritmo)
      gsap.fromTo(
        '.card-ads',
        { autoAlpha: 0, x: 80 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.card-ads',
            start: 'top 65%',
            once: true,
          },
        }
      );

      // 3 y 4. DISEÑO UX y BRANDING — ambas suben desde ABAJO, pero en secuencia:
      // el stagger de 0.25s hace que primero entre UX y justo después Branding.
      // El ScrollTrigger se ancla a la tarjeta UX (no a la fila) porque en
      // tablet la fila usa display:contents y deja de tener caja medible.
      gsap.fromTo(
        ['.card-ux', '.card-branding'],
        { autoAlpha: 0, y: 70 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.25,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#ux-design',
            start: 'top 85%',
            once: true,
          },
        }
      );
      // 5. SHOWCASE INTERIOR de la tarjeta Web (tags + grilla de proyectos).
      // Entra desde la DERECHA, con su propio trigger más abajo (top 60%),
      // así aparece recién cuando el usuario sigue scrolleando después
      // de que ya entraron las tarjetas.
      gsap.fromTo(
        '.card-web-showcase',
        { autoAlpha: 0, x: 120 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.card-web-showcase',
            start: 'top 90%',
            once: true,
            invalidateOnRefresh: true,
            // markers: true, // <-- descomenta para ver el punto de disparo
          },
        }
      );

      // 6. IMÁGENES INTERIORES de la tarjeta Performance Ads.
      // Stats y chart suben JUNTOS desde abajo. El ScrollTrigger se ancla
      // a '.card-web-showcase' (y no a '.card-ads') para que ambas entren
      // exactamente al mismo tiempo que el showcase de Diseño y desarrollo Web.
      // Los valores de x (-15 y -20) reemplazan a las clases
      // -translate-x-[15px] / -translate-x-[20px] de Tailwind, porque
      // GSAP escribe su propio transform y las sobreescribiría.
      gsap.fromTo(
        '.ads-stats',
        { autoAlpha: 0, x: -15, y: 120 },
        {
          autoAlpha: 1,
          x: -15,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.card-web-showcase',
            start: 'top 90%',
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.fromTo(
        '.ads-chart',
        { autoAlpha: 0, x: -20, y: 120 },
        {
          autoAlpha: 1,
          x: -20,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.card-web-showcase',
            start: 'top 90%',
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // 7. ILUSTRACIONES de Diseño UX y Branding.
      // Entran DESPUÉS de sus tarjetas padre, en un scroll posterior.
      // Movimiento sutil y breve (solo 26px y 0.7s).
      // Los xPercent/yPercent finales reemplazan a -translate-x-[47%] y
      // -translate-y-[-12%] de Tailwind, porque GSAP pisa el transform.
      // El `y: 4` final las baja los 4px pedidos.
      gsap.fromTo(
        '.ux-illustration',
        { autoAlpha: 0, xPercent: -47, yPercent: 12, y: 30 },
        {
          autoAlpha: 1,
          xPercent: -47,
          yPercent: 12,
          y: 4,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#ux-design',
            start: 'top 42%',
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.fromTo(
        '.branding-illustration',
        { autoAlpha: 0, xPercent: -47, y: 30 },
        {
          autoAlpha: 1,
          xPercent: -47,
          y: 4,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#ux-design',
            start: 'top 42%',
            once: true,
            invalidateOnRefresh: true,
          },
          delay: 0.15,
        }
      );

      // Las imágenes de next/image cargan DESPUÉS del montaje y empujan el
      // layout, dejando los puntos de disparo calculados sobre alturas viejas.
      // Este refresh los recalcula una vez que todo terminó de cargar.
      const handleLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', handleLoad);

      // Respaldo: si la página ya estaba cargada al montar el componente,
      // el evento 'load' no vuelve a dispararse.
      if (document.readyState === 'complete') {
        ScrollTrigger.refresh();
      }

      return () => {
        window.removeEventListener('load', handleLoad);
      };
    },
    { scope: containerRef, dependencies: [content] }
  );

  return (
    <section
      ref={containerRef}
      id="servicios"
      className="w-full py-[24px] md:py-[28px] lg:py-[40px] bg-[#EFF8FD]"
    >
      <div className="max-w-[1220px] mx-auto px-4 md:px-8">

        {/* ENCABEZADO */}
        <div className="text-center mb-[16px] md:mb-[36px]">

          {/* TÍTULO: sin tamaño hardcodeado, hereda el de globals.css
              (22px/30px en mobile, 48px/56px desde md) */}
          <h2 className="font-medium text-[#141821] mb-[16px]">
            <AnimatedRichText
              texto={content.title}
              claseAnimacion="services-blur-word"
              prefijo="srv-t"
              separador="espacio"
            />
          </h2>

          {/* PÁRRAFO */}
          <p className="text-[14px] md:text-[16px] text-[#525866] max-w-[600px] mx-auto leading-[20px] flex flex-wrap justify-center gap-x-[4px]">
            <AnimatedRichText
              texto={content.paragraph}
              claseAnimacion="services-blur-paragraph-word"
              prefijo="srv-p"
            />
          </p>
        </div>

        {/* GRID BENTO CON GAP DE 20px */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">

          {/* TARJETA 1 — Diseño y desarrollo web */}
          <div className="card-web invisible relative overflow-hidden bg-[#E1EDF4] rounded-[16px] p-[30px] md:min-h-[280px] lg:pb-0 lg:pr-0 flex flex-col justify-start lg:justify-between">
            <div className="shrink-0 lg:pr-[30px]">
              <h3 className="text-[24px] leading-[28px] font-normal text-[#141821]">
                <RichText texto={web.title} />
              </h3>

              <p className="mt-4 text-[14px] md:text-[16px] leading-[20px] text-[#525866] w-full bg-transparent">
                <RichText texto={web.description} claseNegrita="font-semibold text-[#141821]" />
              </p>

              <div className="mt-4">
                <Link href={web.buttonHref} className={heroButtonClass}>
                  {web.buttonText}

                  <ArrowIcon />
                </Link>
              </div>
            </div>

            <div className="card-web-showcase invisible mt-[40px] mb-[30px] mr-[30px] w-auto rounded-[16px] bg-[#BBD0E0] p-[16px] lg:mr-0 lg:w-full lg:rounded-l-[16px] lg:rounded-r-none lg:p-[30px] lg:pb-[40px] overflow-hidden relative hidden lg:flex">
              <div className="w-full flex flex-col items-start">

                <div className="flex flex-wrap justify-start gap-2 lg:gap-3 mb-[24px]">
                  {['Páginas web corporativas', 'Ecommerce', 'Landing page'].map((tag) => (
                    <span
                      key={tag}
                      className="p-[12px] rounded-[12px] bg-[#D1E4F2] text-[14px] font-manrope font-normal text-[#4D687B] whitespace-nowrap shadow-[4px_4px_3px_0px_rgba(0,0,0,0.05)_inset]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid w-auto grid-cols-[repeat(2,230px)] gap-[14px] justify-start lg:grid-cols-[repeat(2,280px)] lg:gap-[22px]">

                  <div className="relative h-[168px] w-[230px] overflow-hidden rounded-[16px] lg:h-[205px] lg:w-[280px]">
                    <Image
                      src={img.webUno.src}
                      alt={img.webUno.alt}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="relative h-[168px] w-[230px] overflow-hidden rounded-[16px] lg:h-[205px] lg:w-[280px]">
                    <Image
                      src={img.webDos.src}
                      alt={img.webDos.alt}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="relative h-[168px] w-[230px] overflow-hidden rounded-[16px] lg:h-[205px] lg:w-[280px]">
                    <Image
                      src={img.webTres.src}
                      alt={img.webTres.alt}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="relative h-[168px] w-[230px] overflow-hidden rounded-[16px] lg:h-[205px] lg:w-[280px]">
                    <Image
                      src={img.webCuatro.src}
                      alt={img.webCuatro.alt}
                      fill
                      className="object-cover"
                    />
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="flex flex-col gap-[20px] h-full md:contents lg:flex">

            {/* TARJETA 2 — Performance Ads */}
            <div className="card-ads invisible bg-[#1B3F7D] rounded-[16px] pt-[30px] pb-[30px] px-[30px] text-white relative overflow-hidden md:min-h-[280px] lg:min-h-0 lg:pb-0 lg:h-[calc(50%-10px)] flex flex-col justify-between shrink-0">

              <div className="pr-[0px]">

                <h3 className="text-[24px] leading-[28px] font-normal text-white mb-[16px] relative z-10">
                  <RichText texto={ads.title} />
                </h3>

                <p className="text-[14px] md:text-[16px] font-manrope font-normal text-[#AEC4E6] w-full leading-[20px] mb-[16px] relative z-10 bg-transparent">
                  <RichText texto={ads.description} claseNegrita="text-white font-normal" />
                </p>

                <Link href={ads.buttonHref} className={performanceButtonClass}>
                  {ads.buttonText}
                  <ArrowIcon />
                </Link>

              </div>

              <div className="absolute bottom-0 inset-x-0 hidden lg:flex items-end justify-center gap-[0px] pointer-events-none">

                <div className="ads-stats invisible relative h-[275px] w-[370px] shrink-0 lg:h-[190px] lg:w-[260px]">
                  <Image
                    src={img.adsEstadisticas.src}
                    alt={img.adsEstadisticas.alt}
                    fill
                    className="object-contain object-bottom"
                  />
                </div>

                <div className="ads-chart invisible relative h-[275px] w-[390px] shrink-0 lg:h-[190px] lg:w-[280px]">
                  <Image
                    src={img.adsGrafico.src}
                    alt={img.adsGrafico.alt}
                    fill
                    className="object-contain object-bottom"
                  />
                </div>

              </div>
            </div>

            {/* TARJETAS 3 y 4 */}
            <div className="services-bottom-row grid grid-cols-1 sm:grid-cols-2 gap-[20px] md:contents lg:grid lg:h-[calc(50%-10px)]">

              {/* Diseño UX */}
              <div id="ux-design" className="card-ux invisible bg-[#1A3840] rounded-[16px] pt-[24px] px-[24px] pb-[24px] text-white flex flex-col justify-between relative overflow-hidden h-full md:min-h-[280px]">

                <div className="relative z-10 flex flex-col">

                  <h4 className="text-[24px] leading-[28px] font-normal text-white mb-[16px]">
                    <RichText texto={ux.title} />
                  </h4>

                  <p className="text-[14px] md:text-[16px] font-manrope font-normal text-[#9FBFC2] w-full leading-[20px] mb-[16px] bg-transparent">
                    <RichText texto={ux.description} claseNegrita="text-white font-normal" />
                  </p>

                  <div>
                    <Link
                      href={ux.buttonHref}
                      style={{ borderColor: '#477087' }}
                      className={secondaryButtonClass + ' border'}
                    >
                      {ux.buttonText}

                      <ArrowIcon />
                    </Link>
                  </div>

                </div>

                <div className="ux-illustration invisible absolute bottom-0 left-1/2 hidden h-[330px] w-[520px] pointer-events-none lg:block lg:h-[220px] lg:w-[350px]">
                  <Image
                    src={img.ux.src}
                    alt={img.ux.alt}
                    fill
                    sizes="(max-width: 1023px) 520px, 350px"
                    className="object-contain object-bottom"
                  />
                </div>

              </div>

              {/* Branding */}
              <div id="branding" className="card-branding invisible bg-[#423517] rounded-[16px] pt-[24px] px-[24px] pb-[24px] text-white flex flex-col justify-between relative overflow-hidden h-full md:min-h-[280px]">

                <div className="relative z-10 flex flex-col">

                  <h4 className="text-[24px] leading-[28px] font-normal text-white mb-[16px]">
                    <RichText texto={branding.title} />
                  </h4>

                  <p className="text-[14px] md:text-[16px] font-manrope font-normal text-[#C2B799] w-full leading-[20px] mb-[16px] bg-transparent">
                    <RichText texto={branding.description} claseNegrita="text-white font-normal" />
                  </p>

                  <div>
                    <Link
                      href={branding.buttonHref}
                      style={{ borderColor: '#6F5910' }}
                      className={secondaryButtonClass + ' border'}
                    >
                      {branding.buttonText}

                      <ArrowIcon />
                    </Link>
                  </div>

                </div>

                <div className="branding-illustration invisible absolute bottom-0 left-1/2 hidden h-[330px] w-[520px] pointer-events-none lg:block lg:h-[220px] lg:w-[350px]">
                  <Image
                    src={img.branding.src}
                    alt={img.branding.alt}
                    fill
                    sizes="(max-width: 1023px) 520px, 350px"
                    className="object-contain object-bottom"
                  />
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
