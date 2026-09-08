import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <section id="nosotros" className="w-full py-[80px] bg-[#EFF8FD]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-8">
        
        {/* BLOQUE SUPERIOR: Título y Texto introductorio alineado abajo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] lg:gap-[60px] items-end mb-[24px]">
        {/* Título */}
         <h2 className="text-[36px] md:text-[48px] leading-[44px] md:leading-[56px] font-medium text-[#141821]">
            El motor de tu <br className="hidden md:block" />
           <span className="font-accent italic font-light">transformación digital</span>
         </h2>

        {/* Texto introductorio */}
         <p className="text-[16px] leading-[20px] text-[#525866]">
         En <strong className="text-[#141821] font-semibold">Valhu Group</strong>, no solo construimos productos digitales; construimos ecosistemas de innovación diseñados para escalar. Somos un <strong className="text-[#141821] font-semibold">grupo de agencias estratégicas</strong> unidas por una visión clara: <strong className="text-[#141821] font-semibold">cerrar la brecha entre la ambición de negocio y la ejecución tecnológica.</strong>
         </p>
        </div>

        {/* BLOQUE INFERIOR: Fotos y Contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] items-stretch">
          
          {/* Foto izquierda (img-about-1.webp con bordes de 16px) */}
          <div className="relative w-full h-[380px] lg:h-[480px] rounded-[16px] overflow-hidden">
            <Image
              src="/about/img-about-1.webp" 
              alt="Equipo de Valhu Group"
              fill
              className="object-cover rounded-[16px]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col gap-[20px]">
            {/* Foto derecha (img-about-2.webp con bordes de 16px) */}
            <div className="relative w-full h-[220px] md:h-[260px] rounded-[16px] overflow-hidden">
              <Image
                src="/about/img-about-2.webp" 
                alt="Diseño digital"
                fill
                className="object-cover rounded-[16px]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Texto en dos columnas (16px / leading-20px) + Botón del Hero */}
            <div className="flex flex-col gap-[20px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] text-[16px] leading-[20px] text-[#525866]">
                <p>
                  Somos el puente entre la <strong className="text-[#141821] font-semibold">innovación creativa</strong> y el <strong className="text-[#141821] font-semibold">éxito comercial</strong>. Al integrar el diseño con estrategias tecnológicas de alto impacto,
                </p>
                <p>
                  permitimos que las empresas se enfoquen en su crecimiento mientras nosotros gestionamos la complejidad de su <strong className="text-[#141821] font-semibold">presencia digital.</strong>
                </p>
              </div>

              {/* Botón con estilo exacto del Hero */}
              <div>
                <Link
                  href="#"
                  className="inline-flex items-center gap-3 px-[20px] py-[16px] rounded-[8px] border border-[#D0D5DD] bg-[#EFF8FD] text-[#141821] text-[16px] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141821] transition-colors"
                >
                  Más sobre Valhu Group
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.05317 5.80864L16.6169 14.568L16.7007 7.14383L17.6984 7.09145L17.5946 16.2833L8.40276 16.1794L8.47766 15.1832L15.9018 15.267L7.33812 6.50772L8.05317 5.80864Z" fill="#141821"/>
                  </svg>
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}