"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SITE_CONTENT } from "@/data/siteData";

interface BeliefsGridProps {
  lang: "en" | "de";
  onBookVisit: () => void;
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

      // Frosted Bento Cards staggered parallax floating reveal
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.94 },
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
      {/* SECTION PART 1: Split Manifesto Intro matching frame 10 */}
      <div
        ref={introRef}
        className="relative max-w-[1400px] w-full mx-auto px-6 sm:px-10 md:px-14 py-24 sm:py-32"
      >
        {/* Top Right Tag */}
        <div className="flex justify-end mb-8">
          <span className="font-editorial italic text-xs sm:text-sm tracking-widest text-white/70 animate-intro">
            {t.tag}
          </span>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Architectural Living Render */}
          <div className="lg:col-span-7 relative h-[360px] sm:h-[480px] md:h-[540px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-intro">
            <Image
              src="/images/beliefs-interior.jpg"
              alt="Elyse Inspired Living Room"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/25" />

            {/* Immense Overlay Title spanning across */}
            <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10 pointer-events-none">
              <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-wide uppercase text-center drop-shadow-2xl leading-tight">
                {t.headline}
              </h2>
            </div>
          </div>

          {/* Right: Subheadline & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pl-8">
            <p className="text-xs sm:text-sm text-[#9aa0a6] leading-relaxed font-sans-clean animate-intro">
              {t.subHeadline}
            </p>

            <div className="pt-2 animate-intro">
              <button onClick={onBookVisit} className="btn-pill-white">
                {t.cta}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION PART 2: Pinned 5-Card Frosted Bento Grid matching frame 14 */}
      <div
        ref={bentoRef}
        className="relative w-full min-h-screen py-20 sm:py-28 px-4 sm:px-8 md:px-12 flex flex-col justify-center items-center overflow-hidden"
      >
        {/* Full-bleed background living room render */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/beliefs-interior.jpg"
            alt="Elyse Residence Interior Texture"
            fill
            className="object-cover object-center brightness-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d0e]/80 via-black/40 to-[#0c0d0e]/90" />
        </div>

        {/* Bento Content Layout */}
        <div className="relative z-10 max-w-[1400px] w-full mx-auto">
          {/* Top Right Philosophy Text */}
          <div className="flex justify-end mb-8 sm:mb-12">
            <div className="max-w-md text-right space-y-3 bg-black/40 backdrop-blur-md p-5 rounded-2xl border border-white/10">
              <p className="text-xs sm:text-sm text-[#ededed] leading-relaxed font-sans-clean">
                {t.narrative1}
              </p>
              <p className="text-[11px] sm:text-xs text-[#9aa0a6] leading-relaxed font-sans-clean">
                {t.narrative2}
              </p>
            </div>
          </div>

          {/* 5 Frosted Glass Cards Matrix matching video frame 14 */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6"
          >
            {/* Card 1: Holistic Well-Being */}
            <div className="group relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[280px] sm:min-h-[340px] frosted-belief-card transition-all duration-300 hover:border-white/40 hover:-translate-y-1">
              <div className="space-y-4">
                <h3 className="font-editorial italic text-xl sm:text-2xl text-white font-normal leading-tight">
                  {t.pillars[0].title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#ededed]/80 font-sans-clean leading-relaxed">
                  {t.pillars[0].description}
                </p>
              </div>
              <div className="pt-6 flex justify-between items-end border-t border-white/10">
                <span className="text-xs font-editorial italic text-white/60">
                  {t.pillars[0].numberStr}
                </span>
              </div>
            </div>

            {/* Card 2: Discretion & Exclusivity (with Line Art) */}
            <div className="group relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[280px] sm:min-h-[340px] frosted-belief-card transition-all duration-300 hover:border-white/40 hover:-translate-y-1">
              <div className="space-y-4">
                <h3 className="font-editorial italic text-xl sm:text-2xl text-white font-normal leading-tight">
                  {t.pillars[1].title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#ededed]/80 font-sans-clean leading-relaxed">
                  {t.pillars[1].description}
                </p>

                {/* Minimalist Abstract Line Art Silhouette matching video */}
                <div className="py-2 flex justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                  <svg
                    width="64"
                    height="72"
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
              </div>
              <div className="pt-6 flex justify-between items-end border-t border-white/10">
                <span className="text-xs font-editorial italic text-white/60">
                  {t.pillars[1].numberStr}
                </span>
              </div>
            </div>

            {/* Card 3: Cultural Enrichment */}
            <div className="group relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[280px] sm:min-h-[340px] frosted-belief-card transition-all duration-300 hover:border-white/40 hover:-translate-y-1">
              <div className="space-y-4">
                <h3 className="font-editorial italic text-xl sm:text-2xl text-white font-normal leading-tight">
                  {t.pillars[2].title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#ededed]/80 font-sans-clean leading-relaxed">
                  {t.pillars[2].description}
                </p>
              </div>
              <div className="pt-6 flex justify-between items-end border-t border-white/10">
                <span className="text-xs font-editorial italic text-white/60">
                  {t.pillars[2].numberStr}
                </span>
              </div>
            </div>

            {/* Card 4: Community & Connection */}
            <div className="group relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[280px] sm:min-h-[340px] frosted-belief-card transition-all duration-300 hover:border-white/40 hover:-translate-y-1">
              <div className="space-y-4">
                <h3 className="font-editorial italic text-xl sm:text-2xl text-white font-normal leading-tight">
                  {t.pillars[3].title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#ededed]/80 font-sans-clean leading-relaxed">
                  {t.pillars[3].description}
                </p>
              </div>
              <div className="pt-6 flex justify-between items-end border-t border-white/10">
                <span className="text-xs font-editorial italic text-white/60">
                  {t.pillars[3].numberStr}
                </span>
              </div>
            </div>

            {/* Card 5: Sustainable Elegance */}
            <div className="group relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[280px] sm:min-h-[340px] frosted-belief-card transition-all duration-300 hover:border-white/40 hover:-translate-y-1">
              <div className="space-y-4">
                <h3 className="font-editorial italic text-xl sm:text-2xl text-white font-normal leading-tight">
                  {t.pillars[4].title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#ededed]/80 font-sans-clean leading-relaxed">
                  {t.pillars[4].description}
                </p>
              </div>
              <div className="pt-6 flex justify-between items-end border-t border-white/10">
                <span className="text-xs font-editorial italic text-white/60">
                  {t.pillars[4].numberStr}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
