import Link from 'next/link';
import Image from 'next/image';

const heroButtonClass =
  'inline-flex items-center justify-between w-full sm:w-auto gap-3 px-[20px] py-[16px] rounded-[8px] border border-[#D0D5DD] bg-[#EFF8FD] text-[#141821] text-[16px] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141821] transition-colors';

const performanceButtonClass =
  'inline-flex items-center justify-between w-full sm:w-auto gap-3 px-[20px] py-[16px] rounded-[8px] border border-[#3366C0] bg-transparent text-white text-[16px] hover:bg-white/10 transition-colors relative z-10';

const secondaryButtonClass =
  'inline-flex items-center justify-between w-full sm:w-auto gap-3 px-[20px] py-[16px] rounded-[8px] bg-transparent text-white text-[16px] transition-colors relative z-10';

function ArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.05317 5.80864L16.6169 14.568L16.7007 7.14383L17.6984 7.09145L17.5946 16.2833L8.40276 16.1794L8.47766 15.1832L15.9018 15.267L7.33812 6.50772L8.05317 5.80864Z" fill="currentColor"/>
    </svg>
  );
}

export default function Services() {
  return (
    <section id="servicios" className="w-full py-[60px] bg-[#EFF8FD]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-8">

        {/* ENCABEZADO */}
        <div className="text-center mb-[36px]">
          <h2 className="text-[40px] md:text-[48px] font-medium text-[#141821] mb-[20px]">
            Nuestros Servicios
          </h2>
          <p className="text-[16px] text-[#525866] max-w-[600px] mx-auto leading-[20px]">
            Estructuramos nuestra oferta para acompañarte en cada fase digital de tu negocio.
            Desde la concepción de tu marca hasta la conquista del mercado.
          </p>
        </div>

        {/* GRID BENTO CON GAP DE 20px */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">

          {/* TARJETA 1 — Diseño y desarrollo web */}
          {/* Se eliminó pr-[30px] aquí para que la caja interior pegue a la derecha */}
          <div className="relative overflow-hidden bg-[#E1EDF4] rounded-[16px] pt-[30px] pl-[30px] flex flex-col justify-between">
            
            {/* Texto y Botón (se le agregó el pr-[30px] para mantener su margen) */}
            <div className="shrink-0 pr-[30px]">
              <h3 className="text-[24px] leading-[28px] font-normal text-[#141821]">
                Diseño y desarrollo <span className="font-accent italic font-light">Web</span>
              </h3>
              <p className="mt-4 text-[16px] leading-[20px] text-[#525866] w-full bg-transparent">
                Diseñamos y desarrollamos sitios web a medida, rápidos y seguros.
                Enfocados en la experiencia de usuario, la escalabilidad y funcionalidad impecable.
              </p>
              <div className="mt-4">
                <Link href="#" className={heroButtonClass}>
                  Ver proyectos
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.05317 5.80864L16.6169 14.568L16.7007 7.14383L17.6984 7.09145L17.5946 16.2833L8.40276 16.1794L8.47766 15.1832L15.9018 15.267L7.33812 6.50772L8.05317 5.80864Z" fill="#141821"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Caja interior perfectamente pegada a la derecha */}
            <div className="mt-[40px] mb-[30px] w-full bg-[#BBD0E0] rounded-l-[16px] p-[16px] lg:p-[30px] lg:pb-[40px] overflow-hidden relative flex">
              
              <div className="w-full flex flex-col items-start">
                {/* Etiquetas / Tags alineados a la izquierda */}
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

                {/* Grid de Imágenes alineado a la izquierda (para que se corte en la derecha) */}
                <div className="grid grid-cols-[repeat(2,280px)] gap-[22px] justify-start">
                  <div className="w-[280px] h-[205px] rounded-[16px] overflow-hidden relative">
                    <Image src="/services/web-design/bithon-1.png" alt="Bithon" fill className="object-cover" />
                  </div>
                  <div className="w-[280px] h-[205px] rounded-[16px] overflow-hidden relative"> 
                    <Image src="/services/web-design/2-en-1.png" alt="2 en 1" fill className="object-cover" />
                  </div>
                  <div className="w-[280px] h-[205px] rounded-[16px] overflow-hidden relative">
                    <Image src="/services/web-design/indie-uy.png" alt="Indie Uy" fill className="object-cover" />
                  </div>
                  <div className="w-[280px] h-[205px] rounded-[16px] overflow-hidden relative">
                    <Image src="/services/web-design/yo-busco.png" alt="Yo Busco" fill className="object-cover" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/diseno-ux-ui.webp"
                    alt="Diseño UX ilustración"
                    fill
                    quality={95}
                    sizes="220px"
                    className="object-contain object-bottom"
                  />
                </div>
              </div>

              {/* Branding */}
              <div className="bg-[#423517] rounded-[16px] pt-[24px] px-[24px] pb-[24px] text-white flex flex-col justify-between relative overflow-hidden h-full">
                <div className="relative z-10 flex flex-col">
                  {/* Título Branding: Peso normal */}
                  <h4 className="text-[24px] leading-[28px] font-normal text-white mb-[16px]">Branding</h4>
                  <p className="text-[16px] font-manrope font-normal text-[#C2B799] w-full leading-[20px] mb-[16px] bg-transparent">
                    Desarrollamos la identidad visual, el tono de voz y la personalidad de tu marca
                  </p>
                  <div>
                    <a
                      href="#"
                      style={{ borderColor: '#6F5910' }}
                      className={secondaryButtonClass + " border"}
                    >
                      Ver proyectos
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.05317 5.80864L16.6169 14.568L16.7007 7.14383L17.6984 7.09145L17.5946 16.2833L8.40276 16.1794L8.47766 15.1832L15.9018 15.267L7.33812 6.50772L8.05317 5.80864Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Ilustración de Figma */}
                <div className="absolute -bottom-[15px] left-1/2 -translate-x-1/2 w-[270px] h-[235px] pointer-events-none">
                  <Image
                    src="/services/branding/branding-design.webp"
                    alt="Branding ilustración"
                    fill
                    quality={95}
                    sizes="220px"
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
