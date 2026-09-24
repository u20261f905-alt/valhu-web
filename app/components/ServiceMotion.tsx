'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Shares the home page's motion timings while leaving server-rendered content visible. */
export default function ServiceMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const splits: SplitText[] = [];
      const sections = root.current?.querySelectorAll('section');
      sections?.forEach((section, index) => {
        const trigger = index === 0 ? {} : {
          scrollTrigger: { trigger: section, start: 'top 75%', once: true },
        };
        const text = Array.from(section.querySelectorAll('h1, h2, p'))
          .filter(element => !element.closest('article'));
        const pretitle = index === 0 ? text.shift() : undefined;
        if (pretitle) gsap.fromTo(pretitle, { autoAlpha: 0, y: 20 }, {
          autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out',
        });
        const split = SplitText.create(text, { type: 'words', tag: 'span', aria: 'auto' });
        splits.push(split);
        const textTween = gsap.fromTo(split.words,
          { autoAlpha: 0, filter: 'blur(10px)', y: 10 },
          { autoAlpha: 1, filter: 'blur(0px)', y: 0, duration: 0.4,
            stagger: 0.015, ease: 'power2.out', delay: index === 0 ? 0.15 : 0, ...trigger });

        section.querySelectorAll('article, [data-service-media]').forEach((card, i) => {
          const heroMedia = index === 0 && card.hasAttribute('data-service-media');
          gsap.fromTo(card,
            heroMedia ? { autoAlpha: 0, scale: 1.2 } : card.hasAttribute('data-service-media')
              ? { autoAlpha: 0, x: i % 2 === 0 ? -80 : 80 } : { autoAlpha: 0, y: 70 },
            { autoAlpha: 1, scale: 1, x: 0, y: 0, duration: heroMedia ? 1.6 : card.hasAttribute('data-service-media') ? 1.4 : 1.2,
              ease: 'power3.out',
              ...(heroMedia ? {} : {
                delay: card.hasAttribute('data-service-media') ? 0 : (i % 3) * 0.25,
                scrollTrigger: { trigger: card.hasAttribute('data-service-media') ? card : card.parentElement,
                  start: card.hasAttribute('data-service-media') ? 'top 65%' : 'top 85%', once: true },
              }),
            });
          if (heroMedia) {
            gsap.to(card, { y: -18, duration: 1.8, delay: Math.max(2.4, textTween.totalDuration()),
              repeat: -1, yoyo: true, ease: 'sine.inOut' });
          }
        });

        section.querySelectorAll('a').forEach(button => {
          gsap.fromTo(button, { autoAlpha: 0, y: 60 }, {
            autoAlpha: 1, y: 0, duration: 1.8, ease: 'expo.out',
            delay: index === 0 ? 0.6 : 0,
            ...(index === 0 ? {} : { scrollTrigger: { trigger: section, start: 'top 70%', once: true } }),
          });
        });

        const tags = section.querySelectorAll('.rounded-full:not([data-service-media])');
        if (tags.length) gsap.fromTo(tags, { autoAlpha: 0, y: 26 }, {
          autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: tags[0], start: 'top 90%', once: true },
        });
      });
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh);
      document.fonts.ready.then(() => { if (root.current) refresh(); });
      return () => {
        window.removeEventListener('load', refresh);
        splits.forEach(split => split.revert());
      };
    });
    return () => media.revert();
  }, { scope: root });

  return <div ref={root} className="overflow-x-clip">{children}</div>;
}
