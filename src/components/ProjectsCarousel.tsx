"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SITE_CONTENT, ProjectData } from "@/data/siteData";
import AnimatedTitle from "@/components/AnimatedTitle";
import { useLenis } from "@/components/SmoothScrollProvider";

interface ProjectsCarouselProps {
  lang: "en" | "de";
  onSelectProject: (project: ProjectData) => void;
}

export default function ProjectsCarousel({
  lang,
  onSelectProject,
}: ProjectsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(1);
  const isNavigatingRef = useRef(false);
  const navigationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollTo: lenisScrollTo } = useLenis();

  const t = SITE_CONTENT[lang].projects;

  const scrollToStep = useCallback(
    (stepIndex: number) => {
      const trigger = ScrollTrigger.getById("projects-carousel-trigger");
      if (!trigger) return;
      const progress = stepIndex === 1 ? 0 : stepIndex === 2 ? 0.5 : 1;
      const targetScroll = trigger.start + progress * (trigger.end - trigger.start);

      isNavigatingRef.current = true;
      setActiveStep(stepIndex);

      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }

      if (lenisScrollTo) {
        lenisScrollTo(targetScroll, {
          duration: 0.95,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          onComplete: () => {
            navigationTimeoutRef.current = setTimeout(() => {
              isNavigatingRef.current = false;
            }, 80);
          },
        });
      } else {
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }

      navigationTimeoutRef.current = setTimeout(() => {
        isNavigatingRef.current = false;
      }, 1100);
    },
    [lenisScrollTo]
  );

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const calculateStep = () => {
        const cards = track.children;
        if (cards.length < 2) return 560;
        const c0 = cards[0] as HTMLElement;
        const c1 = cards[1] as HTMLElement;
        return c1.offsetLeft - c0.offsetLeft;
      };

      const step = calculateStep();

      // Spiral coordinate generator for individual title characters
      const getSpiralCoords = (
        index: number,
        total: number,
        direction: "out" | "in"
      ) => {
        const angle =
          (index / Math.max(total, 1)) * Math.PI * 4 +
          (direction === "out" ? 0.6 : -0.6);
        const radius = 50 + (index % 5) * 12;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * (radius * 0.45);
        const rotZ = (index % 2 === 0 ? 1 : -1) * (40 + (index / total) * 60);
        const rotY = (index % 2 === 0 ? 50 : -50);
        return { x, y, rotZ, rotY };
      };

      const p0TitleChars = gsap.utils.toArray<HTMLElement>(".p0-title-char");
      const p1TitleChars = gsap.utils.toArray<HTMLElement>(".p1-title-char");
      const p2TitleChars = gsap.utils.toArray<HTMLElement>(".p2-title-char");

      const p0DescWords = gsap.utils.toArray<HTMLElement>(".p0-desc-word");
      const p1DescWords = gsap.utils.toArray<HTMLElement>(".p1-desc-word");
      const p2DescWords = gsap.utils.toArray<HTMLElement>(".p2-desc-word");

      const cards = Array.from(track.children) as HTMLElement[];

      // Initial state: Project 0 is active, centered, and highlighted
      gsap.set(p0TitleChars, {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotationZ: 0,
        rotationY: 0,
        filter: "blur(0px)",
      });

      gsap.set(p0DescWords, {
        opacity: 1,
        y: 0,
      });

      // Project 1 & 2 characters start in dispersed spiral state
      p1TitleChars.forEach((el, i) => {
        const c = getSpiralCoords(i, p1TitleChars.length, "in");
        gsap.set(el, {
          opacity: 0,
          scale: 0.2,
          x: c.x,
          y: c.y,
          rotationZ: c.rotZ,
          rotationY: c.rotY,
          filter: "blur(6px)",
        });
      });

      gsap.set(p1DescWords, {
        opacity: 0,
        y: 8,
      });

      p2TitleChars.forEach((el, i) => {
        const c = getSpiralCoords(i, p2TitleChars.length, "in");
        gsap.set(el, {
          opacity: 0,
          scale: 0.2,
          x: c.x,
          y: c.y,
          rotationZ: c.rotZ,
          rotationY: c.rotY,
          filter: "blur(6px)",
        });
      });

      gsap.set(p2DescWords, {
        opacity: 0,
        y: 8,
      });

      // Position track so Card 0 is centered initially
      gsap.set(track, { x: step });

      // Initial card highlighting: Card 0 is highlighted, Card 1 & 2 are unhighlighted/dimmed
      if (cards[0]) {
        gsap.set(cards[0], {
          filter: "brightness(1) contrast(1.02)",
          opacity: 1,
          scale: 1.05,
          borderColor: "rgba(255, 255, 255, 0.4)",
        });
      }
      if (cards[1]) {
        gsap.set(cards[1], {
          filter: "brightness(0.35) contrast(0.9)",
          opacity: 0.42,
          scale: 0.92,
          borderColor: "rgba(255, 255, 255, 0.08)",
        });
      }
      if (cards[2]) {
        gsap.set(cards[2], {
          filter: "brightness(0.35) contrast(0.9)",
          opacity: 0.42,
          scale: 0.92,
          borderColor: "rgba(255, 255, 255, 0.08)",
        });
      }

      // Master Timeline directly tied to scroll scrub with buttery smooth manual control (no snap collision)
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "projects-carousel-trigger",
          trigger: containerRef.current,
          start: "top top",
          end: "+=280%",
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => {
            if (isNavigatingRef.current) return;
            const p = self.progress;
            if (p < 0.28) {
              setActiveStep(1);
            } else if (p < 0.72) {
              setActiveStep(2);
            } else {
              setActiveStep(3);
            }
          },
        },
      });

      // --- 1. Horizontal Track Movement (+step to -step) ---
      tl.to(
        track,
        {
          x: -step,
          duration: 1.0,
          ease: "none",
        },
        0
      );

      // --- 2. Phase 1: Card 0 Exits Center Stage (t: 0.12 to 0.38) ---
      // Card 0 dims and scales down proportionally
      if (cards[0]) {
        tl.to(
          cards[0],
          {
            filter: "brightness(0.35) contrast(0.9)",
            opacity: 0.42,
            scale: 0.92,
            borderColor: "rgba(255, 255, 255, 0.08)",
            duration: 0.24,
            ease: "power1.out",
          },
          0.12
        );
      }

      // Project 0 Title disperses / un-types
      tl.to(
        p0TitleChars,
        {
          x: (i) => getSpiralCoords(i, p0TitleChars.length, "out").x,
          y: (i) => getSpiralCoords(i, p0TitleChars.length, "out").y,
          rotationZ: (i) => getSpiralCoords(i, p0TitleChars.length, "out").rotZ,
          rotationY: (i) => getSpiralCoords(i, p0TitleChars.length, "out").rotY,
          scale: 0.2,
          opacity: 0,
          filter: "blur(6px)",
          stagger: 0.003,
          duration: 0.18,
          ease: "power2.in",
        },
        0.12
      );

      // Project 0 Description un-types word-by-word
      tl.to(
        p0DescWords,
        {
          opacity: 0,
          y: -6,
          stagger: 0.003,
          duration: 0.16,
          ease: "power2.in",
        },
        0.12
      );

      // --- 3. Phase 1: Card 1 Enters Center Stage (t: 0.24 to 0.50) ---
      // Card 1 brightens and scales up to full highlight
      if (cards[1]) {
        tl.to(
          cards[1],
          {
            filter: "brightness(1) contrast(1.02)",
            opacity: 1,
            scale: 1.05,
            borderColor: "rgba(255, 255, 255, 0.4)",
            duration: 0.24,
            ease: "power1.inOut",
          },
          0.26
        );
      }

      // Project 1 Title assembles into center stage
      tl.to(
        p1TitleChars,
        {
          x: 0,
          y: 0,
          rotationZ: 0,
          rotationY: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.003,
          duration: 0.20,
          ease: "power2.out",
        },
        0.26
      );

      // Project 1 Description types in word-by-word
      tl.to(
        p1DescWords,
        {
          opacity: 1,
          y: 0,
          stagger: 0.004,
          duration: 0.20,
          ease: "power2.out",
        },
        0.28
      );

      // --- 4. Phase 2: Card 1 Exits Center Stage (t: 0.54 to 0.78) ---
      // Card 1 dims down proportionally
      if (cards[1]) {
        tl.to(
          cards[1],
          {
            filter: "brightness(0.35) contrast(0.9)",
            opacity: 0.42,
            scale: 0.92,
            borderColor: "rgba(255, 255, 255, 0.08)",
            duration: 0.24,
            ease: "power1.out",
          },
          0.54
        );
      }

      // Project 1 Title disperses / un-types
      tl.to(
        p1TitleChars,
        {
          x: (i) => getSpiralCoords(i, p1TitleChars.length, "out").x,
          y: (i) => getSpiralCoords(i, p1TitleChars.length, "out").y,
          rotationZ: (i) => getSpiralCoords(i, p1TitleChars.length, "out").rotZ,
          rotationY: (i) => getSpiralCoords(i, p1TitleChars.length, "out").rotY,
          scale: 0.2,
          opacity: 0,
          filter: "blur(6px)",
          stagger: 0.003,
          duration: 0.18,
          ease: "power2.in",
        },
        0.54
      );

      // Project 1 Description un-types word-by-word
      tl.to(
        p1DescWords,
        {
          opacity: 0,
          y: -6,
          stagger: 0.003,
          duration: 0.16,
          ease: "power2.in",
        },
        0.54
      );

      // --- 5. Phase 2: Card 2 Enters Center Stage (t: 0.68 to 0.92) ---
      // Card 2 brightens and scales up to full highlight
      if (cards[2]) {
        tl.to(
          cards[2],
          {
            filter: "brightness(1) contrast(1.02)",
            opacity: 1,
            scale: 1.05,
            borderColor: "rgba(255, 255, 255, 0.4)",
            duration: 0.24,
            ease: "power1.inOut",
          },
          0.68
        );
      }

      // Project 2 Title assembles into center stage
      tl.to(
        p2TitleChars,
        {
          x: 0,
          y: 0,
          rotationZ: 0,
          rotationY: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.003,
          duration: 0.20,
          ease: "power2.out",
        },
        0.68
      );

      // Project 2 Description types in word-by-word
      tl.to(
        p2DescWords,
        {
          opacity: 1,
          y: 0,
          stagger: 0.004,
          duration: 0.20,
          ease: "power2.out",
        },
        0.70
      );

      const handleResize = () => {
        const newStep = calculateStep();
        const trigger = ScrollTrigger.getById("projects-carousel-trigger");
        const currentP = trigger ? trigger.progress : 0;
        const currentX = (1 - 2 * currentP) * newStep;
        gsap.set(track, { x: currentX });
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  // Clean character renderer with zero trailing margins to ensure absolute centering
  const renderLineChars = (text: string, charClass: string) => {
    return text.split("").map((char, i) => {
      if (char === " ") {
        return (
          <span key={i} className="inline-block w-[0.26em]">
            &nbsp;
          </span>
        );
      }
      return (
        <span
          key={i}
          className={`${charClass} inline-block will-change-transform`}
          style={{
            display: "inline-block",
            transformOrigin: "center center",
          }}
        >
          {char}
        </span>
      );
    });
  };

  const activeProject = t.items[activeStep - 1] || t.items[0];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full h-screen h-[100dvh] max-h-screen bg-[var(--bg-main)] flex flex-col justify-between overflow-hidden select-none py-6 sm:py-8 transition-colors duration-300"
    >
      {/* 1. TOP HEADER BAR: (OUR PROJECTS) on Left, (1)  (2)  (3) on Right */}
      <div className="relative z-40 w-full px-8 sm:px-12 md:px-16 flex items-center justify-between shrink-0">
        <AnimatedTitle
          as="span"
          className="font-editorial italic text-sm sm:text-base tracking-[0.14em] text-neutral-600 dark:text-white/90 block"
          yOffset={20}
        >
          {t.tag}
        </AnimatedTitle>

        {/* Step Indicators */}
        <div className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-editorial tracking-widest">
          {[1, 2, 3].map((step) => (
            <button
              key={step}
              onClick={() => scrollToStep(step)}
              className={`transition-all duration-300 py-1 cursor-pointer ${
                activeStep === step
                  ? "text-neutral-900 dark:text-white font-bold scale-105"
                  : "text-neutral-400 dark:text-white/40 hover:text-black dark:hover:text-white/75"
              }`}
            >
              ({step})
            </button>
          ))}
        </div>
      </div>

      {/* 2. CENTER STAGE: Fixed Middle Active Area */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center overflow-hidden my-auto py-1">
        {/* FIXED MIDDLE ACTIVE HEADLINE STAGE */}
        <div className="absolute top-[8%] sm:top-[9%] lg:top-[10%] left-0 right-0 z-30 flex justify-center pointer-events-none select-none px-4">
          <div className="max-w-[92vw] sm:max-w-[560px] md:max-w-[620px] lg:max-w-[680px] w-full text-center relative h-[100px] sm:h-[130px] md:h-[150px]">
            {t.items.map((project, idx) => {
              const [l1, l2] = project.headlineParts || [project.title, ""];
              return (
                <div
                  key={project.id}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
                >
                  <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-normal tracking-[0.04em] uppercase leading-[0.88] text-center w-full select-none">
                    {/* Line 1: Above the card, sits on the cream background in light mode */}
                    <span className="block text-center w-full text-neutral-900 dark:text-white drop-shadow-none dark:drop-shadow-[0_12px_24px_rgba(0,0,0,0.95)]">
                      {renderLineChars(l1, `p${idx}-title-char`)}
                    </span>
                    {/* Line 2: Over the dark card image, bright white text with deep shadow */}
                    <span className="block text-center w-full -mt-1 sm:-mt-2 text-white dark:text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                      {renderLineChars(l2, `p${idx}-title-char`)}
                    </span>
                  </h2>
                </div>
              );
            })}
          </div>
        </div>

        {/* Horizontal Track: Smooth sliding with active card highlighted in center */}
        <div
          ref={trackRef}
          className="flex items-center gap-24 sm:gap-32 md:gap-36 lg:gap-44 xl:gap-52 will-change-transform"
        >
          {t.items.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => {
                if (activeStep === idx + 1) {
                  onSelectProject(project);
                } else {
                  scrollToStep(idx + 1);
                }
              }}
              className="relative cursor-pointer flex-shrink-0 shadow-2xl bg-[#141518] dark:bg-[#141518] bg-white rounded-2xl overflow-hidden border border-white/10 dark:border-white/10 border-black/10 w-[72vw] sm:w-[46vw] md:w-[34vw] lg:w-[30vw] max-w-[420px] h-[46vh] sm:h-[50vh] max-h-[460px] min-h-[280px] transition-[border-color,box-shadow] duration-300 will-change-transform"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority={idx === 1}
                className="object-cover object-center"
              />
              {/* Top and bottom architectural vignettes to guarantee white text contrast in all modes */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/35 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. FIXED MIDDLE BOTTOM CONTENT STAGE: Live description word typing & CTA button */}
      <div className="relative z-20 w-full px-6 flex items-center justify-center shrink-0">
        <div className="max-w-[540px] w-full flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 text-center sm:text-left">
          {/* Live Description Stage: Scroll-scrubbed word typing */}
          <div className="relative w-full max-w-sm sm:max-w-md min-h-[56px] flex items-center overflow-hidden">
            {t.items.map((project, idx) => {
              const text = project.subtitle || project.description;
              const words = text.split(/\s+/).filter(Boolean);
              return (
                <div
                  key={project.id}
                  className="absolute inset-0 flex items-center pointer-events-none"
                >
                  <p className="text-sm sm:text-[15px] text-neutral-700 dark:text-[#a0a4ab] leading-relaxed font-sans font-normal">
                    {words.map((word, wIdx) => (
                      <span
                        key={wIdx}
                        className={`p${idx}-desc-word inline-block will-change-transform`}
                        style={{
                          display: "inline-block",
                          opacity: idx === 0 ? 1 : 0,
                          transform: idx === 0 ? "none" : "translateY(10px)",
                        }}
                      >
                        {word}&nbsp;
                      </span>
                    ))}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Action Button: Opens Luxury ProjectModal */}
          <div className="shrink-0">
            <button
              onClick={() => onSelectProject(activeProject)}
              className="btn-pill-white tracking-wider"
            >
              {t.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
