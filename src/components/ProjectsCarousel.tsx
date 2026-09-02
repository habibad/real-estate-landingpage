"use client";

import React, { useRef, useEffect, useState } from "react";
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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeStep, setActiveStep] = useState(1);

  const t = SITE_CONTENT[lang].projects;

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      // Pin the section and animate horizontal glide with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            // Update active step based on progress
            const progress = self.progress;
            if (progress < 0.35) {
              setActiveStep(1);
            } else if (progress < 0.7) {
              setActiveStep(2);
            } else {
              setActiveStep(3);
            }
          },
        },
      });

      // Horizontal track translation
      tl.to(track, {
        xPercent: -66.666,
        ease: "none",
      });

      // Subtle scale and optical parallax on the big title
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          x: -30,
          opacity: 0.95,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=220%",
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <div
      id="projects"
      ref={containerRef}
      className="relative w-full h-screen min-h-screen bg-[#0c0d0e] flex flex-col justify-between overflow-hidden pt-20 sm:pt-24 pb-8 sm:pb-12 border-t border-white/5 select-none"
    >
      {/* Top Header Bar inside Carousel: Tag on Left, Step Indicators on Right */}
      <div className="relative z-20 max-w-[1400px] w-full mx-auto px-6 sm:px-10 md:px-14 flex items-center justify-between">
        <span className="font-editorial italic text-xs sm:text-sm tracking-widest text-white/70">
          {t.tag}
        </span>

        {/* Step Indicator (1)  (2)  (3) */}
        <div className="flex items-center gap-4 text-xs sm:text-sm font-editorial">
          {[1, 2, 3].map((step) => (
            <button
              key={step}
              onClick={() => onSelectProject(t.items[step - 1])}
              className={`transition-all duration-300 ${
                activeStep === step
                  ? "text-white scale-110 font-bold"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              ({step})
            </button>
          ))}
        </div>
      </div>

      {/* Floating Center Headline */}
      <div className="relative z-10 w-full text-center pointer-events-none px-4 -mb-8 sm:-mb-14">
        <h2
          ref={titleRef}
          className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-normal tracking-wide text-white uppercase leading-none drop-shadow-2xl"
        >
          {t.headline}
        </h2>
      </div>

      {/* Horizontal Slider Track Container */}
      <div className="relative z-10 w-full overflow-visible my-auto py-2">
        <div
          ref={trackRef}
          className="flex items-center gap-6 sm:gap-10 pl-[15vw] sm:pl-[25vw] md:pl-[30vw] w-[300vw] sm:w-[240vw]"
        >
          {t.items.map((project, idx) => {
            const isCenter = activeStep === idx + 1;
            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`group relative cursor-pointer flex-shrink-0 transition-all duration-500 rounded-2xl overflow-hidden shadow-2xl bg-[#16171a] border border-white/10 ${
                  isCenter
                    ? "w-[75vw] sm:w-[45vw] md:w-[35vw] h-[380px] sm:h-[480px] md:h-[520px] scale-100 opacity-100 ring-1 ring-white/20"
                    : "w-[65vw] sm:w-[40vw] md:w-[30vw] h-[340px] sm:h-[420px] md:h-[460px] scale-95 opacity-55 hover:opacity-85"
                }`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Subtle Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Bottom Card Hover Label */}
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[11px] font-mono tracking-widest text-white/80 uppercase">
                    {project.category}
                  </span>
                  <span className="text-xs text-white font-editorial italic underline underline-offset-4">
                    Explore Details &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Sub-narrative & CTA */}
      <div className="relative z-20 max-w-[1400px] w-full mx-auto px-6 sm:px-10 md:px-14 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-xs sm:text-[13px] text-[#9aa0a6] max-w-lg leading-relaxed font-sans-clean">
          {t.description}
        </p>

        <button
          onClick={() => onSelectProject(t.items[activeStep - 1] || t.items[0])}
          className="btn-pill-white shrink-0"
        >
          {t.cta}
        </button>
      </div>
    </div>
  );
}
