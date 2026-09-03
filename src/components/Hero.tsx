"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { SITE_CONTENT } from "@/data/siteData";

import AnimatedTitle from "@/components/AnimatedTitle";
import LiveText from "@/components/LiveText";

interface HeroProps {
  lang: "en" | "de";
  onBookVisit: () => void;
  onScrollDown: () => void;
}

export default function Hero({ lang, onScrollDown }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);

  const t = SITE_CONTENT[lang].hero;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Intro animations for Hero elements
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, delay: 0.2 }
      ).fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen h-screen flex flex-col justify-between overflow-hidden bg-[var(--bg-main)] pt-20 sm:pt-24 pb-8 sm:pb-12 transition-colors duration-300"
    >
      {/* Background Architectural Villa Render: Daylight for Light Mode, Dusk for Dark Mode */}
      <div className="absolute inset-0 z-0">
        {/* Light Mode: Sunlit Travertine Villa with Serene Pool & Clear Sky */}
        <div className="absolute inset-0 transition-opacity duration-700 dark:opacity-0 opacity-100">
          <Image
            src="/images/hero-villa-day.jpg"
            alt="Elyse Residence Sunlit Architecture"
            fill
            priority
            className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Subtle luxury light overlay: Soft top gradient for crisp navbar, refined bottom travertine wash for typography */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-[var(--bg-main)]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Dark Mode: Illuminated Dusk Architectural Villa */}
        <div className="absolute inset-0 transition-opacity duration-700 dark:opacity-100 opacity-0 pointer-events-none">
          <Image
            src="/images/hero-villa-v2.jpg"
            alt="Elyse Residence Dusk Architecture"
            fill
            priority
            className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Cinematic Vignette and Dark Tint Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-black/35 to-black/40" />
          <div className="absolute inset-0 bg-black/20 backdrop-brightness-95" />
        </div>
      </div>

      {/* Spacer for top padding */}
      <div className="relative z-10 w-full" />

      {/* Center & Lower Hero Content Area */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 sm:px-10 md:px-14 flex flex-col justify-end mt-auto">
        {/* Split Grid: Immense ELYSE Brand typography across bottom-left to center, sub-narrative on bottom-right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-4 sm:pb-6">
          {/* Giant Editorial Title */}
          <div className="lg:col-span-8 select-none">
            <h1
              ref={titleRef}
              className="font-editorial text-[18vw] sm:text-[15vw] lg:text-[13vw] font-normal leading-[0.82] tracking-[0.04em] text-neutral-900 dark:text-white drop-shadow-none dark:drop-shadow-2xl"
            >
              {t.brand}
            </h1>
          </div>

          {/* Right-Aligned Sub-copy Box */}
          <div className="lg:col-span-4 flex flex-col justify-end pb-2 sm:pb-4 lg:pl-6 space-y-3">
            <AnimatedTitle
              as="h2"
              className="font-editorial italic text-base sm:text-lg text-neutral-900 dark:text-white/90 tracking-wide font-normal"
              delay={0.15}
            >
              {t.tagline}
            </AnimatedTitle>
            <LiveText
              text={t.description}
              className="text-xs sm:text-[13px] text-neutral-700 dark:text-[#9aa0a6] leading-relaxed font-sans-clean max-w-md font-normal"
              delay={0.25}
              stagger={0.035}
            />
          </div>
        </div>

        {/* Centered Scroll Indicator */}
        <div className="w-full flex justify-center pt-4 sm:pt-6">
          <button
            ref={scrollIndicatorRef}
            onClick={onScrollDown}
            className="group flex flex-col items-center gap-2 text-neutral-700 dark:text-white/60 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer focus:outline-none"
            aria-label="Scroll Down to Manifesto"
          >
            <span className="text-[10px] tracking-[0.25em] font-mono uppercase text-neutral-700 dark:text-white/60 group-hover:text-neutral-900 dark:group-hover:text-white font-medium">
              {t.scroll}
            </span>
            <div className="w-[1px] h-9 bg-neutral-900/20 dark:bg-white/20 relative overflow-hidden">
              <div className="w-full h-full bg-neutral-900 dark:bg-white animate-scroll-line" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
