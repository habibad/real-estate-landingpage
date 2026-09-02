"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SITE_CONTENT } from "@/data/siteData";

interface AmenitiesProps {
  lang: "en" | "de";
  onLearnMore: () => void;
}

export default function Amenities({ lang, onLearnMore }: AmenitiesProps) {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const centerImgRef = useRef<HTMLDivElement>(null);
  const rightImgRef = useRef<HTMLDivElement>(null);

  const t = SITE_CONTENT[lang].amenities;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered parallax reveal for the two architectural renders
      if (centerImgRef.current) {
        gsap.fromTo(
          centerImgRef.current,
          { y: 60, scale: 0.96 },
          {
            y: -30,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      if (rightImgRef.current) {
        gsap.fromTo(
          rightImgRef.current,
          { y: 100, scale: 0.98 },
          {
            y: -50,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0.6, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "top 30%",
              scrub: 0.8,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      id="amenities"
      ref={containerRef}
      className="relative w-full min-h-screen py-24 sm:py-36 md:py-48 bg-[#0c0d0e] flex items-center overflow-hidden border-t border-white/5"
    >
      <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-10 md:px-14">
        {/* 3-Column Composition matching video frame 16 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Narrative & CTA */}
          <div
            ref={leftColRef}
            className="md:col-span-4 flex flex-col justify-center space-y-8"
          >
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-white uppercase leading-[1.08]">
              {t.headline}
            </h2>

            <p className="text-xs sm:text-[13px] text-[#9aa0a6] leading-relaxed font-sans-clean max-w-sm">
              {t.description}
            </p>

            <div className="pt-2">
              <button onClick={onLearnMore} className="btn-pill-white">
                {t.cta}
              </button>
            </div>
          </div>

          {/* Center Column: Gym Fitness Studio Render */}
          <div
            ref={centerImgRef}
            className="md:col-span-4 flex justify-center items-center"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[440px] sm:h-[520px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#16171a] group">
              <Image
                src={t.gymImage}
                alt={t.gymAlt}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-[10px] font-mono tracking-widest text-white/70 uppercase">
                (FITNESS SUITE)
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Walkway & Atrium Render */}
          <div
            ref={rightImgRef}
            className="md:col-span-4 flex justify-center items-center"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[480px] sm:h-[580px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#16171a] group">
              <Image
                src={t.corridorImage}
                alt={t.corridorAlt}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-[10px] font-mono tracking-widest text-white/70 uppercase">
                (SCULPTURAL ATRIUM)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
