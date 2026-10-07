"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Banner/Hero de la página interna "Meta Ads".
 * Misma técnica de animación (blur palabra por palabra + esfera con scale/alpha)
 * que app/components/Hero.tsx y la página "Diseño y Desarrollo Web", para
 * mantener consistencia entre todas las internas.
 */
export default function MetaAdsBanner() {
  const containerRef = useRef<HTMLElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".ma-anim-pretitle",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
        0,
      )
        .fromTo(
          [".ma-blur-word", ".ma-blur-paragraph-word"],
          { autoAlpha: 0, filter: "blur(10px)", y: 10 },
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 0.4,
            stagger: 0.015,
            ease: "power2.out",
          },
          0.15,
        )
        .fromTo(
          ".ma-anim-btn",
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0, duration: 1.8, ease: "expo.out" },
          0.6,
        )
        .fromTo(
          sphereRef.current,
          { autoAlpha: 0, scale: 1.2 },
          { autoAlpha: 1, scale: 1, duration: 1.6, ease: "power3.out" },
          0,
        )
        // Flotación infinita, igual que la esfera del Home (Hero.tsx) y de
        // la interna de Diseño y Desarrollo Web.
        .add(() => {
          gsap.to(sphereRef.current, {
            y: -18,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
    },
    { scope: containerRef },
  );

  const paragraph =
    "Optimizamos tu inversión publicitaria en Meta Ads mediante estrategias basadas en conversión y retorno de inversión real.";

  return (
    <section ref={containerRef} className="w-full bg-[#EFF8FD]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-8 pt-[24px] pb-[48px] md:pt-[40px] md:pb-[48px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[20px] md:gap-[24px] lg:gap-[40px] items-center border-b border-[#E1E7EC] pb-[24px] md:pb-[40px]">
          {/* COLUMNA IZQUIERDA */}
          <div className="md:col-span-7 flex flex-col items-start">
            {/* Pretitle */}
            <div className="mb-3">
              <span className="ma-anim-pretitle invisible text-[14px]/[18px] md:text-[16px]/[22px] uppercase underline decoration-[1px] decoration-[#969EB3] [text-underline-offset:2px] text-[#969EB3] font-normal inline-block">
                META ADS
              </span>
            </div>

            {/* Título */}
            <h1 className="mb-[16px] md:mb-[20px] !text-[36px] !leading-[40px] md:!text-[52px] md:!leading-[58px] lg:!text-[64px] lg:!leading-[72px]">
              <span className="ma-blur-word invisible inline-block">
                Escala
              </span>{" "}
              <span className="ma-blur-word invisible inline-block">las</span>{" "}
              <span className="ma-blur-word invisible inline-block">
                ventas
              </span>{" "}
              <span className="ma-blur-word invisible inline-block">de</span>{" "}
              <span className="ma-blur-word invisible inline-block">tu</span>{" "}
              <span className="ma-blur-word invisible inline-block">
                empresa
              </span>{" "}
              <span className="ma-blur-word invisible inline-block">con</span>{" "}
              <span className="ma-blur-word invisible inline-block font-accent italic font-light">
                Meta
              </span>{" "}
              <span className="ma-blur-word invisible inline-block font-accent italic font-light">
                Ads
              </span>
            </h1>

            {/* Párrafo */}
            <p className="text-[14px] md:text-[16px] text-[#485157] mb-[24px] md:mb-6 flex flex-wrap content-start gap-x-[6px] max-w-[600px]">
              {paragraph.split(" ").map((word, index) => (
                <span
                  key={`ma-p-${index}`}
                  className="ma-blur-paragraph-word invisible inline-block"
                >
                  {word}
                </span>
              ))}
            </p>

            {/* Botones */}
            <div className="ma-anim-btn invisible flex flex-col sm:flex-row gap-[20px] w-full sm:w-auto">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-3 px-[20px] py-[16px] rounded-[8px] bg-[#141821] text-white text-[16px] font-semibold hover:bg-opacity-90 transition-colors"
              >
                Quiero escalar mis ventas
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA: esfera decorativa (misma que la de Diseño y Desarrollo Web) */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div
              ref={sphereRef}
              className="relative w-full max-w-[440px] aspect-square invisible drop-shadow-[0_60px_60px_rgba(62,82,87,0.10)]"
            >
              <Image
                src="/services/meta-ads/blue-sphere.webp"
                alt="Render decorativo - Meta Ads"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
