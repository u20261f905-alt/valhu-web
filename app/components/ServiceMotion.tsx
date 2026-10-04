"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Animaciones de las páginas de servicio.
 *
 * Antes los títulos y párrafos se revelaban palabra por palabra con
 * SplitText. El problema es que SplitText reescribe el HTML de esos
 * elementos por dentro, y ese HTML lo maneja React: cuando React quería
 * quitar un nodo que SplitText ya había reemplazado, la página se caía con
 * "Failed to execute 'removeChild'". Pasaba al recargar en desarrollo y,
 * peor, al navegar entre Branding y UX/UI, que comparten este componente.
 *
 * Ahora el texto entra como bloque, con el mismo desenfoque y la misma
 * curva. Se pierde el escalonado por palabra, pero nada toca el DOM de
 * React. Las secciones que sí revelan palabra por palabra (home, nosotros)
 * lo hacen partiendo el texto en el propio JSX, que es seguro.
 */
export default function ServiceMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const sections = root.current?.querySelectorAll("section");

        sections?.forEach((section, index) => {
          const trigger =
            index === 0
              ? {}
              : {
                  scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    once: true,
                  },
                };

          const text = Array.from(section.querySelectorAll("h1, h2, p")).filter(
            (element) => !element.closest("article"),
          );

          const pretitle = index === 0 ? text.shift() : undefined;
          if (pretitle) {
            gsap.fromTo(
              pretitle,
              { autoAlpha: 0, y: 20 },
              { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
            );
          }

          if (text.length) {
            gsap.fromTo(
              text,
              { autoAlpha: 0, filter: "blur(10px)", y: 10 },
              {
                autoAlpha: 1,
                filter: "blur(0px)",
                y: 0,
                duration: 0.7,
                stagger: 0.08,
                ease: "power2.out",
                delay: index === 0 ? 0.15 : 0,
                ...trigger,
              },
            );
          }

          section
            .querySelectorAll("article, [data-service-media]")
            .forEach((card, i) => {
              const esMedia = card.hasAttribute("data-service-media");
              const heroMedia = index === 0 && esMedia;

              gsap.fromTo(
                card,
                heroMedia
                  ? { autoAlpha: 0, scale: 1.2 }
                  : esMedia
                    ? { autoAlpha: 0, x: i % 2 === 0 ? -80 : 80 }
                    : { autoAlpha: 0, y: 70 },
                {
                  autoAlpha: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                  duration: heroMedia ? 1.6 : esMedia ? 1.4 : 1.2,
                  ease: "power3.out",
                  ...(heroMedia
                    ? {}
                    : {
                        delay: esMedia ? 0 : (i % 3) * 0.25,
                        scrollTrigger: {
                          trigger: esMedia ? card : card.parentElement,
                          start: esMedia ? "top 65%" : "top 85%",
                          once: true,
                        },
                      }),
                },
              );
            });

          section.querySelectorAll("a").forEach((button) => {
            gsap.fromTo(
              button,
              { autoAlpha: 0, y: 60 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 1.8,
                ease: "expo.out",
                delay: index === 0 ? 0.6 : 0,
                ...(index === 0
                  ? {}
                  : {
                      scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                        once: true,
                      },
                    }),
              },
            );
          });

          const tags = section.querySelectorAll(
            ".rounded-full:not([data-service-media])",
          );
          if (tags.length) {
            gsap.fromTo(
              tags,
              { autoAlpha: 0, y: 26 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.06,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: tags[0],
                  start: "top 90%",
                  once: true,
                },
              },
            );
          }
        });

        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        document.fonts.ready.then(() => {
          if (root.current) refresh();
        });

        return () => window.removeEventListener("load", refresh);
      });

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="overflow-x-clip">
      {children}
    </div>
  );
}
