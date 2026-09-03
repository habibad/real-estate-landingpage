"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { SITE_CONTENT, ProjectData } from "@/data/siteData";
import AnimatedTitle from "@/components/AnimatedTitle";
import LiveText from "@/components/LiveText";

interface ZoomOutGridProps {
  lang: "en" | "de";
  onSelectProject: (project: ProjectData) => void;
  onBookVisit: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export default function ZoomOutGrid({
  lang,
  onSelectProject,
  onBookVisit,
  onNavigateSection,
}: ZoomOutGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridWrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const t = SITE_CONTENT[lang];

  useEffect(() => {
    if (!containerRef.current || !gridWrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Pinned GSAP ScrollTrigger timeline that executes the exact zoom-out sequence from video 00:18-00:23
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 1.2,
        },
      });

      // Scale down from full-screen (center tile in focus) to complete 3x3 portfolio grid
      tl.fromTo(
        gridWrapperRef.current,
        {
          scale: 2.8,
          y: 0,
        },
        {
          scale: 1,
          y: 0,
          ease: "power2.inOut",
        }
      ).fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, ease: "power2.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <div
      id="zoom-out-showcase"
      ref={containerRef}
      className="relative w-full h-screen min-h-screen bg-[var(--bg-main)] flex flex-col justify-between items-center overflow-hidden py-8 sm:py-12 border-t border-black/5 dark:border-white/5 select-none transition-colors duration-300"
    >
      {/* Top Tag & Header */}
      <div
        ref={headerRef}
        className="relative z-30 max-w-[1400px] w-full mx-auto px-6 flex items-center justify-between pointer-events-auto"
      >
        <div className="flex items-center gap-3">
          <AnimatedTitle
            as="span"
            className="font-editorial italic text-sm sm:text-base tracking-widest text-neutral-500 dark:text-white/70 block"
            yOffset={20}
          >
            {t.zoomOut.tag}
          </AnimatedTitle>
        </div>

        <div className="text-xs sm:text-sm text-neutral-500 dark:text-white/50 font-mono tracking-widest uppercase hidden md:block">
          <LiveText text={t.zoomOut.instruction} delay={0.1} stagger={0.03} />
        </div>

        <button onClick={onBookVisit} className="btn-pill-white tracking-wider">
          {t.beliefs.cta}
        </button>
      </div>

      {/* 3x3 Multi-Canvas Grid Container with Zoom-out Transformation */}
      <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden">
        <div
          ref={gridWrapperRef}
          className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-5 w-[1400px] max-w-[95vw] h-[820px] max-h-[85vh] p-2"
          style={{ transformOrigin: "center center" }}
        >
          {/* ================= ROW 1 ================= */}

          {/* [0,0] Top-Left: Lumière Lounge */}
          <div
            onClick={() => onSelectProject(t.projects.items[0])}
            className="group relative rounded-2xl overflow-hidden bg-[#16171a] border border-white/10 shadow-2xl cursor-pointer transition-all duration-300 hover:border-white/40 hover:scale-[1.02]"
          >
            <Image
              src="/images/project-lounge-v2.jpg"
              alt="Lumière Lounge"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-3 left-4 text-[10px] font-mono tracking-widest text-white/80 uppercase">
              (01) LOUNGE SALON
            </div>
          </div>

          {/* [0,1] Top-Center: Beliefs Frosted Glass Showcase */}
          <div
            onClick={() => onNavigateSection("beliefs")}
            className="group relative rounded-2xl overflow-hidden bg-[#16171a] border border-white/10 shadow-2xl cursor-pointer transition-all duration-300 hover:border-white/40 hover:scale-[1.02]"
          >
            <Image
              src="/images/beliefs-interior-v2.jpg"
              alt="Beliefs Philosophy"
              fill
              className="object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-black/35 flex items-center justify-center p-4">
              <div className="frosted-belief-card rounded-xl p-4 text-center max-w-[80%]">
                <span className="font-editorial italic text-base sm:text-lg text-white block">
                  SUSTAINABLE ELEGANCE
                </span>
                <span className="text-[10px] text-white/70 font-sans-clean block mt-1">
                  Luxury that respects our environment
                </span>
              </div>
            </div>
            <div className="absolute bottom-3 left-4 text-[10px] font-mono tracking-widest text-white/80 uppercase">
              (02) PHILOSOPHY
            </div>
          </div>

          {/* [0,2] Top-Right: 150k sq ft Metric */}
          <div
            onClick={() => onNavigateSection("metrics")}
            className="group relative rounded-2xl overflow-hidden bg-[#16171a] border border-white/10 shadow-2xl cursor-pointer p-6 flex flex-col justify-between transition-all duration-300 hover:border-white/40 hover:scale-[1.02]"
          >
            <div className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
              (METRIC MATRIX)
            </div>
            <div>
              <div className="font-editorial text-5xl sm:text-6xl text-white font-normal leading-none">
                150k
              </div>
              <div className="text-[11px] text-[#9aa0a6] mt-2 font-sans-clean">
                of meticulously designed living space.
              </div>
            </div>
            <div className="text-[10px] font-editorial italic text-white/60">
              (03) RESIDENCE SCALE
            </div>
          </div>

          {/* ================= ROW 2 ================= */}

          {/* [1,0] Middle-Left: Duplex Master Bedroom */}
          <div
            onClick={() => onSelectProject(t.projects.items[1])}
            className="group relative rounded-2xl overflow-hidden bg-[#16171a] border border-white/10 shadow-2xl cursor-pointer transition-all duration-300 hover:border-white/40 hover:scale-[1.02]"
          >
            <Image
              src="/images/project-bedroom-v2.jpg"
              alt="Master Bedroom"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors" />
            <div className="absolute bottom-3 left-4 text-[10px] font-mono tracking-widest text-white/80 uppercase">
              (04) MASTER DUPLEX
            </div>
          </div>

          {/* [1,1] CENTER HERO TILE: Full Architectural Dusk Villa with ELYSE Branding */}
          <div
            onClick={() => onNavigateSection("hero")}
            className="group relative rounded-2xl overflow-hidden bg-[#16171a] border-2 border-white/30 shadow-2xl cursor-pointer flex flex-col justify-between p-4 sm:p-6 transition-all duration-300 hover:border-white/70 hover:scale-[1.02] ring-2 ring-white/10"
          >
            <Image
              src="/images/hero-villa-v2.jpg"
              alt="Elyse Hero Villa"
              fill
              className="object-cover brightness-95 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

            {/* Inner Mini Navbar in Tile */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-2">
              <span className="font-editorial text-xs tracking-widest text-white font-bold">
                ELYSE
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-white/60">EN — DE</span>
                <span className="text-[9px] bg-white text-black px-2 py-0.5 rounded-full font-bold">
                  VISIT
                </span>
              </div>
            </div>

            {/* Immense Serif Brand Center */}
            <div className="relative z-10 my-auto text-center py-4">
              <span className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-[0.1em] drop-shadow-2xl">
                ELYSE
              </span>
            </div>

            {/* Bottom Sub-info */}
            <div className="relative z-10 flex items-end justify-between text-[10px] text-white/70">
              <span className="font-editorial italic">HOLISTIC LUXURY</span>
              <span className="font-mono text-[9px] uppercase tracking-widest">
                SCROLL &uarr;
              </span>
            </div>
          </div>

          {/* [1,2] Middle-Right: About Minimalist Living Room */}
          <div
            onClick={() => onNavigateSection("about")}
            className="group relative rounded-2xl overflow-hidden bg-[#16171a] border border-white/10 shadow-2xl cursor-pointer transition-all duration-300 hover:border-white/40 hover:scale-[1.02]"
          >
            <Image
              src="/images/about-living-v2.jpg"
              alt="About Elyse"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors" />
            <div className="absolute bottom-3 left-4 text-[10px] font-mono tracking-widest text-white/80 uppercase">
              (05) MANIFESTO LIVING
            </div>
          </div>

          {/* ================= ROW 3 ================= */}

          {/* [2,0] Bottom-Left: Architectural Floorplan Blueprint Wireframe */}
          <div
            onClick={() => onSelectProject(t.projects.items[2])}
            className="group relative rounded-2xl overflow-hidden bg-[#131417] border border-white/10 shadow-2xl cursor-pointer p-4 flex flex-col justify-between transition-all duration-300 hover:border-white/40 hover:scale-[1.02]"
          >
            <div className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
              (ARCHITECTURAL BLUEPRINT)
            </div>

            {/* Clean SVG Blueprint Floorplan Vector */}
            <div className="my-auto py-1 opacity-70 group-hover:opacity-100 transition-opacity">
              <svg
                viewBox="0 0 200 120"
                className="w-full h-auto stroke-white/60 fill-none text-[8px] font-mono"
                strokeWidth="1"
              >
                <rect x="10" y="10" width="180" height="100" strokeDasharray="3 3" />
                <rect x="20" y="20" width="70" height="80" />
                <rect x="100" y="20" width="80" height="40" />
                <rect x="100" y="70" width="80" height="30" />
                <text x="35" y="65" fill="#ffffff" stroke="none">
                  BEDROOM
                </text>
                <text x="115" y="45" fill="#ffffff" stroke="none">
                  WARDROBE
                </text>
                <text x="115" y="90" fill="#ffffff" stroke="none">
                  TERRACE
                </text>
              </svg>
            </div>

            <div className="text-[10px] font-editorial italic text-white/60">
              (06) DUPLEX BLUEPRINT
            </div>
          </div>

          {/* [2,1] Bottom-Center: Wellness Gym & Atrium */}
          <div
            onClick={() => onNavigateSection("amenities")}
            className="group relative rounded-2xl overflow-hidden bg-[#16171a] border border-white/10 shadow-2xl cursor-pointer transition-all duration-300 hover:border-white/40 hover:scale-[1.02]"
          >
            <Image
              src="/images/amenities-gym-v2.jpg"
              alt="Wellness Gym"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-3 left-4 text-[10px] font-mono tracking-widest text-white/80 uppercase">
              (07) WELLNESS GYM & ATRIUM
            </div>
          </div>

          {/* [2,2] Bottom-Right: Sunset Terrace & Pool */}
          <div
            onClick={() => onBookVisit()}
            className="group relative rounded-2xl overflow-hidden bg-[#16171a] border border-white/10 shadow-2xl cursor-pointer transition-all duration-300 hover:border-white/40 hover:scale-[1.02]"
          >
            <Image
              src="/images/pool-terrace-v2.jpg"
              alt="Terrace and Pool"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors" />
            <div className="absolute bottom-3 left-4 text-[10px] font-mono tracking-widest text-white/80 uppercase">
              (08) PRIVATE TERRACE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
