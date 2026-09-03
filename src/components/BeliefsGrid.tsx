"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { SITE_CONTENT } from "@/data/siteData";
import AnimatedTitle from "@/components/AnimatedTitle";
import LiveText from "@/components/LiveText";

interface BeliefsGridProps {
  lang: "en" | "de";
  onBookVisit: () => void;
}

function NotchedCard({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative w-full h-[290px] sm:h-[320px] md:h-[340px] p-6 sm:p-8 flex flex-col justify-center items-center text-center transition-all duration-500 hover:scale-[1.02] ${
        className || ""
      }`}
    >
      {/* SVG Notched Frosted Background */}
      <div
        className="absolute inset-0 z-0 overflow-hidden backdrop-blur-md bg-white/[0.08] shadow-2xl transition-all duration-300 group-hover:bg-white/[0.12]"
        style={{ clipPath: "url(#notched-bento-card)" }}
      />

      {/* SVG Outline with Inward Concave Architectural Notches */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10 stroke-white/25 group-hover:stroke-white/40 transition-colors"
        viewBox="0 0 100 140"
        preserveAspectRatio="none"
      >
        <path
          d="M 8 0 L 38 0 C 42 10, 58 10, 62 0 L 92 0 Q 100 0 100 8 L 100 132 Q 100 140 92 140 L 62 140 C 58 130, 42 130, 38 140 L 8 140 Q 0 140 0 132 L 0 8 Q 0 0 8 0 Z"
          strokeWidth="1.2"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Card Typography & Inner Content */}
      <div className="relative z-20 flex flex-col justify-center items-center space-y-3 sm:space-y-4 max-w-[210px] sm:max-w-[230px]">
        <AnimatedTitle
          as="h3"
          className="font-editorial italic text-lg sm:text-xl md:text-2xl text-white font-normal uppercase leading-snug tracking-wide drop-shadow-md"
          yOffset={25}
        >
          {title}
        </AnimatedTitle>
        <LiveText
          text={description}
          className="text-xs sm:text-[13px] text-white/80 font-sans font-light leading-relaxed"
          delay={0.1}
          stagger={0.03}
        />
        {children}
      </div>
    </div>
  );
}

export default function BeliefsGrid({ lang, onBookVisit }: BeliefsGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const t = SITE_CONTENT[lang].beliefs;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Intro split animation
      if (introRef.current) {
        gsap.fromTo(
          introRef.current.querySelectorAll(".animate-intro"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 75%",
              end: "top 35%",
              scrub: 0.8,
            },
          }
        );
      }

      // Frosted Bento Cards staggered reveal
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".bento-item");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bentoRef.current,
              start: "top 70%",
              end: "bottom 80%",
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <div
      id="beliefs"
      ref={containerRef}
      className="relative w-full bg-[#0c0d0e] border-t border-white/5 overflow-hidden"
    >
      {/* SECTION PART 1: Architectural Split Manifesto matching user annotated screenshot */}
      <div
        ref={introRef}
        className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col lg:flex-row items-stretch overflow-hidden border-b border-white/5"
      >
        {/* 1. Left Side: Full-Height Architectural Render (50% Width on Desktop) */}
        <div className="relative w-full lg:w-1/2 h-[50vh] sm:h-[60vh] lg:h-auto min-h-[420px] lg:min-h-screen overflow-hidden">
          <Image
            src="/images/beliefs-intro-v2.jpg"
            alt="Elyse Inspired Living Sanctuary"
            fill
            priority
            className="object-cover object-center scale-105 transition-transform duration-1000"
          />
          {/* Subtle darkening for contrast */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* 2. Right Side: Deep Black Background with Aligned Content (50% Width on Desktop) */}
        <div className="relative w-full lg:w-1/2 bg-[#0c0d0e] flex flex-col justify-between py-12 sm:py-16 lg:py-20 px-8 sm:px-12 lg:px-16 xl:px-20 min-h-[380px] lg:min-h-screen">
          {/* Top: (OUR BELIEFS) Tag - Aligned on vertical guide line */}
          <div className="pt-2">
            <AnimatedTitle
              as="span"
              className="font-editorial italic text-sm sm:text-base tracking-[0.14em] text-white/90 block"
              yOffset={20}
            >
              {t.tag}
            </AnimatedTitle>
          </div>

          {/* Bottom: Paragraph & [ BOOK A VISIT ] Button - Aligned on same vertical guide line */}
          <div className="pb-4 space-y-6 max-w-md">
            <LiveText
              text={t.subHeadline}
              className="text-xs sm:text-[13px] md:text-sm text-[#9aa0a6] leading-relaxed font-sans font-light"
              delay={0.1}
              stagger={0.03}
            />

            <div>
              <button
                onClick={onBookVisit}
                className="bg-white text-black hover:bg-neutral-200 transition-all px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase shadow-xl cursor-pointer"
              >
                {t.cta}
              </button>
            </div>
          </div>
        </div>

        {/* 3. Immense Overlapping Title: Spanning across the 50% split boundary (Image + Dark side) */}
        <div className="absolute z-20 top-[28%] sm:top-[30%] lg:top-[32%] left-6 sm:left-12 lg:left-[31vw] xl:left-[33vw] pointer-events-none select-none max-w-[92vw] lg:max-w-[65vw]">
          <AnimatedTitle
            as="h2"
            className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6.2rem] 2xl:text-[7rem] font-normal uppercase text-white leading-[0.88] tracking-[0.03em] drop-shadow-[0_12px_28px_rgba(0,0,0,0.95)] text-left"
            yOffset={60}
            duration={0.95}
          >
            <span className="block">
              {lang === "de" ? "EINE VISION VON" : "A VISION OF"}
            </span>
            <span className="block mt-1 sm:mt-2">
              {lang === "de" ? "INSPIRIERTEM WOHNEN" : "INSPIRED LIVING"}
            </span>
          </AnimatedTitle>
        </div>
      </div>

      {/* SECTION PART 2: Pinned Frosted Architectural Bento Grid matching user screenshot */}
      <div
        ref={bentoRef}
        className="relative w-full min-h-screen py-16 sm:py-24 md:py-28 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col justify-center items-center overflow-hidden"
      >
        {/* SVG ClipPath Definition for Notched Architectural Cards */}
        <svg width="0" height="0" className="absolute pointer-events-none">
          <defs>
            <clipPath id="notched-bento-card" clipPathUnits="objectBoundingBox">
              <path d="M 0.08 0 L 0.38 0 C 0.42 0.07, 0.58 0.07, 0.62 0 L 0.92 0 Q 1 0 1 0.06 L 1 0.94 Q 1 1 0.92 1 L 0.62 1 C 0.58 0.93, 0.42 0.93, 0.38 1 L 0.08 1 Q 0 1 0 0.94 L 0 0.06 Q 0 0 0.08 0 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* Full-bleed background living room render */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/beliefs-interior-v2.jpg"
            alt="Elyse Residence Interior Architecture"
            fill
            className="object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Bento Content Layout: Exact 4-Column / 2-Row Matrix matching user screenshot */}
        <div ref={cardsRef} className="relative z-10 max-w-[1440px] w-full mx-auto">
          {/* Main Grid: 12 columns, 2 primary rows on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-6 sm:gap-x-8 gap-y-10 lg:gap-y-16 items-start">
            
            {/* ROW 1 - ITEM 1: Card 1 (Holistic Well-Being) -> Col 1 to 3 */}
            <div className="bento-item lg:col-span-3 relative">
              <NotchedCard
                title={t.pillars[0].title}
                description={t.pillars[0].description}
              />
              {/* Number (1) placed near bottom-right */}
              <span className="hidden lg:block absolute -right-3 bottom-3 font-mono text-xs text-white/70 tracking-widest">
                {t.pillars[0].numberStr}
              </span>
            </div>

            {/* ROW 1 - ITEM 2: Card 2 (Discretion & Exclusivity) -> Col 4 to 6 */}
            <div className="bento-item lg:col-span-3 relative">
              <NotchedCard
                title={t.pillars[1].title}
                description={t.pillars[1].description}
              >
                {/* Minimalist Abstract Line Art Silhouette matching reference */}
                <div className="pt-2 flex justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                  <svg
                    width="54"
                    height="64"
                    viewBox="0 0 100 120"
                    fill="none"
                    stroke="currentColor"
                    className="text-white/80"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M50 15 C30 25, 20 45, 35 65 C45 80, 75 75, 55 95 C45 105, 35 110, 50 115" />
                    <path d="M45 25 C65 35, 75 55, 60 75 C50 90, 25 85, 45 105" />
                  </svg>
                </div>
              </NotchedCard>
              {/* Number (2) placed near bottom-right */}
              <span className="hidden lg:block absolute -right-3 bottom-3 font-mono text-xs text-white/70 tracking-widest">
                {t.pillars[1].numberStr}
              </span>
            </div>

            {/* ROW 1 - EMPTY SPACE: Col 7 to 9 (Shows the background wall & fluted wood) */}
            <div className="hidden lg:block lg:col-span-3" aria-hidden="true" />

            {/* ROW 1 - ITEM 6: Top-Right Philosophy Text -> Col 10 to 12 */}
            <div className="bento-item lg:col-span-3 flex flex-col justify-start space-y-6 text-right max-w-sm ml-auto pt-2">
              <LiveText
                text={t.narrative1}
                className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-sans font-light"
                delay={0.1}
                stagger={0.03}
              />
              <LiveText
                text={t.narrative2}
                className="text-xs sm:text-[13px] text-white/70 leading-relaxed font-sans font-light"
                delay={0.25}
                stagger={0.03}
              />
            </div>

            {/* ROW 2 - ITEM 3: Card 3 (Cultural Enrichment) -> Col 1 to 3 */}
            <div className="bento-item lg:col-span-3 relative">
              <NotchedCard
                title={t.pillars[2].title}
                description={t.pillars[2].description}
              />
              {/* Number (3) placed at bottom-left */}
              <span className="hidden lg:block absolute left-2 -bottom-7 font-mono text-xs text-white/70 tracking-widest">
                {t.pillars[2].numberStr}
              </span>
            </div>

            {/* ROW 2 - EMPTY SPACE: Col 4 to 6 (Shows the sofa & living room) */}
            <div className="hidden lg:block lg:col-span-3" aria-hidden="true" />

            {/* ROW 2 - ITEM 4: Card 4 (Community & Connection) -> Col 7 to 9 */}
            <div className="bento-item lg:col-span-3 relative">
              <NotchedCard
                title={t.pillars[3].title}
                description={t.pillars[3].description}
              />
              {/* Number (4) placed at bottom-center */}
              <span className="hidden lg:block absolute left-1/2 -translate-x-1/2 -bottom-7 font-mono text-xs text-white/70 tracking-widest">
                {t.pillars[3].numberStr}
              </span>
            </div>

            {/* ROW 2 - ITEM 5: Card 5 (Sustainable Elegance) -> Col 10 to 12 */}
            <div className="bento-item lg:col-span-3 relative">
              <NotchedCard
                title={t.pillars[4].title}
                description={t.pillars[4].description}
              />
              {/* Number (5) placed at bottom-center */}
              <span className="hidden lg:block absolute left-1/2 -translate-x-1/2 -bottom-7 font-mono text-xs text-white/70 tracking-widest">
                {t.pillars[4].numberStr}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
