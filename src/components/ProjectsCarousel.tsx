"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SITE_CONTENT, ProjectData } from "@/data/siteData";

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

  const t = SITE_CONTENT[lang].projects;

  const scrollToStep = useCallback((stepIndex: number) => {
    const trigger = ScrollTrigger.getById("projects-carousel-trigger");
    if (!trigger) return;
    const progress = stepIndex === 1 ? 0 : stepIndex === 2 ? 0.5 : 1;
    const targetScroll = trigger.start + progress * (trigger.end - trigger.start);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, []);

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

      const cards = Array.from(track.children) as HTMLElement[];

      // Initial state: Project 0 is fully assembled and centered
      gsap.set(p0TitleChars, {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotationZ: 0,
        rotationY: 0,
        filter: "blur(0px)",
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

      // Position track so Card 0 is centered initially
      gsap.set(track, { x: step });

      // Initial card opacity
      if (cards[0]) gsap.set(cards[0], { filter: "brightness(1)", opacity: 1 });
      if (cards[1]) gsap.set(cards[1], { filter: "brightness(0.55)", opacity: 0.55 });
      if (cards[2]) gsap.set(cards[2], { filter: "brightness(0.55)", opacity: 0.55 });

      // Master Timeline with generous resting plateaus
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "projects-carousel-trigger",
          trigger: containerRef.current,
          start: "top top",
          end: "+=280%",
          pin: true,
          scrub: 0.8,
          snap: {
            snapTo: [0, 0.5, 1],
            duration: 0.45,
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
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

      // --- 1. Track Movement (+step to -step) ---
      tl.to(
        track,
        {
          x: -step,
          duration: 1.0,
          ease: "none",
        },
        0
      );

      // --- 2. Card Visual Focus ---
      if (cards[0]) {
        tl.to(cards[0], { filter: "brightness(0.55)", opacity: 0.55, duration: 0.22, ease: "power1.out" }, 0.16);
      }
      if (cards[1]) {
        tl.to(cards[1], { filter: "brightness(1)", opacity: 1, duration: 0.22, ease: "power1.in" }, 0.26);
        tl.to(cards[1], { filter: "brightness(0.55)", opacity: 0.55, duration: 0.22, ease: "power1.out" }, 0.56);
      }
      if (cards[2]) {
        tl.to(cards[2], { filter: "brightness(1)", opacity: 1, duration: 0.22, ease: "power1.in" }, 0.74);
      }

      // --- 3. Phase 1: Project 0 Leaves Center -> Spiral Out (0.16 to 0.36) ---
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
          duration: 0.20,
          ease: "power2.in",
        },
        0.16
      );

      // --- 4. Phase 1: Project 1 Enters Center -> Spiral In (0.28 to 0.48) ---
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
        0.28
      );

      // --- 5. Phase 2: Project 1 Leaves Center -> Spiral Out (0.54 to 0.74) ---
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
          duration: 0.20,
          ease: "power2.in",
        },
        0.54
      );

      // --- 6. Phase 2: Project 2 Enters Center -> Spiral In (0.72 to 0.92) ---
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
        0.72
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
      className="relative w-full h-screen h-[100dvh] max-h-screen bg-[#0c0d0e] flex flex-col justify-between overflow-hidden select-none py-6 sm:py-8"
    >
      {/* 1. TOP HEADER BAR: (OUR PROJECTS) on Left, (1)  (2)  (3) on Right */}
      <div className="relative z-40 w-full px-8 sm:px-12 md:px-16 flex items-center justify-between shrink-0">
        <span className="font-editorial italic text-sm sm:text-base tracking-[0.14em] text-white/90">
          {t.tag}
        </span>

        {/* Step Indicators */}
        <div className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-editorial tracking-widest">
          {[1, 2, 3].map((step) => (
            <button
              key={step}
              onClick={() => scrollToStep(step)}
              className={`transition-all duration-300 py-1 ${
                activeStep === step
                  ? "text-white font-bold scale-105"
                  : "text-white/40 hover:text-white/75"
              }`}
            >
              ({step})
            </button>
          ))}
        </div>
      </div>

      {/* 2. CENTER STAGE: Fixed Middle Active Area */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center overflow-hidden my-auto py-1">
        {/* FIXED MIDDLE ACTIVE HEADLINE STAGE: Both lines strictly centered with each other and middle card */}
        <div className="absolute top-[8%] sm:top-[9%] lg:top-[10%] left-0 right-0 z-30 flex justify-center pointer-events-none select-none px-4">
          <div className="max-w-[92vw] sm:max-w-[560px] md:max-w-[620px] lg:max-w-[680px] w-full text-center relative h-[100px] sm:h-[130px] md:h-[150px]">
            {t.items.map((project, idx) => {
              const [l1, l2] = project.headlineParts || [project.title, ""];
              const isActive = activeStep === idx + 1;
              return (
                <div
                  key={project.id}
                  className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-300 ${
                    isActive
                      ? "opacity-100 visible"
                      : "opacity-0 invisible pointer-events-none"
                  }`}
                >
                  <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-normal tracking-[0.04em] text-white uppercase leading-[0.88] drop-shadow-[0_12px_24px_rgba(0,0,0,0.95)] text-center w-full">
                    <span className="block text-center w-full">
                      {renderLineChars(l1, `p${idx}-title-char`)}
                    </span>
                    <span className="block text-center w-full -mt-1 sm:-mt-2">
                      {renderLineChars(l2, `p${idx}-title-char`)}
                    </span>
                  </h2>
                </div>
              );
            })}
          </div>
        </div>

        {/* Horizontal Track: Seamless shifting between active and side positions */}
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
              className="relative cursor-pointer flex-shrink-0 shadow-2xl bg-[#141518] w-[72vw] sm:w-[46vw] md:w-[34vw] lg:w-[30vw] max-w-[420px] h-[46vh] sm:h-[50vh] max-h-[460px] min-h-[280px]"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority={idx === 1}
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. FIXED MIDDLE BOTTOM CONTENT STAGE: Crisp, razor-sharp paragraph alignment */}
      <div className="relative z-20 w-full px-6 flex items-center justify-center shrink-0">
        <div className="max-w-[440px] w-full flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 text-center sm:text-left">
          {/* Clean Description Stage: Perfectly aligned, zero jumbling */}
          <div className="relative w-full max-w-xs sm:max-w-sm min-h-[48px] flex items-center overflow-hidden">
            {t.items.map((project, idx) => (
              <p
                key={project.id}
                className={`absolute inset-0 flex items-center text-xs sm:text-[13px] text-[#9aa0a6] leading-relaxed font-sans font-light transition-all duration-500 ${
                  activeStep === idx + 1
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 translate-y-2 invisible pointer-events-none"
                }`}
              >
                {project.subtitle || project.description}
              </p>
            ))}
          </div>

          <button
            onClick={() => onSelectProject(activeProject)}
            className="bg-white text-black hover:bg-neutral-200 transition-all px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase shrink-0 shadow-xl cursor-pointer"
          >
            {t.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
