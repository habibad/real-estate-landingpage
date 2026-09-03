"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { SITE_CONTENT } from "@/data/siteData";
import AnimatedTitle from "@/components/AnimatedTitle";
import LiveText from "@/components/LiveText";

interface AmenitiesProps {
  lang: "en" | "de";
  onLearnMore: () => void;
}

export default function Amenities({ lang, onLearnMore }: AmenitiesProps) {
  const containerRef = useRef<HTMLElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  const t = SITE_CONTENT[lang].amenities;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Center Card (Fitness Suite): Staggered entrance & exit matching BeliefsGrid cards
      if (centerCardRef.current) {
        gsap.fromTo(
          centerCardRef.current,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "top 30%",
              scrub: 0.8,
            },
          }
        );

        gsap.to(centerCardRef.current, {
          opacity: 0,
          y: -50,
          scale: 0.96,
          ease: "power2.in",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom 55%",
            end: "bottom 10%",
            scrub: 0.8,
          },
        });
      }

      // Right Card (Sculptural Atrium): Staggered entrance & exit
      if (rightCardRef.current) {
        gsap.fromTo(
          rightCardRef.current,
          { opacity: 0, y: 70, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 65%",
              end: "top 25%",
              scrub: 0.8,
            },
          }
        );

        gsap.to(rightCardRef.current, {
          opacity: 0,
          y: -70,
          scale: 0.96,
          ease: "power2.in",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom 50%",
            end: "bottom 5%",
            scrub: 0.8,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      id="amenities"
      ref={containerRef}
      className="relative w-full min-h-screen py-24 sm:py-32 md:py-40 bg-[#0c0d0e] flex items-center overflow-hidden border-t border-white/5 select-none"
    >
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Tag, Headline, Narrative, Feature Points & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-7">
            {/* Tag */}
            <div>
              <AnimatedTitle
                as="span"
                className="font-editorial italic text-xs sm:text-sm tracking-widest text-white/70 uppercase block"
                yOffset={20}
              >
                {t.tag || "(WELLNESS & AMENITIES)"}
              </AnimatedTitle>
            </div>

            {/* Headline */}
            <AnimatedTitle
              as="h2"
              className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-white uppercase leading-[1.06] drop-shadow-md"
              yOffset={45}
              delay={0.1}
            >
              {t.headline}
            </AnimatedTitle>

            {/* Narrative Description */}
            <LiveText
              text={t.description}
              className="text-xs sm:text-[13px] md:text-sm text-[#9aa0a6] leading-relaxed font-sans font-light max-w-md"
              delay={0.15}
              stagger={0.03}
            />

            {/* Curated Amenity Highlights */}
            {t.features && (
              <div className="pt-1 space-y-2.5 border-l border-white/15 pl-4 sm:pl-5">
                {t.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-xs sm:text-[13px] text-white/80 font-sans font-light"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                    <LiveText text={feature} delay={0.25 + i * 0.08} stagger={0.025} />
                  </div>
                ))}
              </div>
            )}

            {/* CTA Button */}
            <div className="amenity-anim pt-3">
              <button
                onClick={onLearnMore}
                className="bg-white text-black hover:bg-neutral-200 transition-all px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase shadow-xl cursor-pointer"
              >
                {t.cta}
              </button>
            </div>
          </div>

          {/* Center Column: Fitness Suite Render */}
          <div
            ref={centerCardRef}
            className="lg:col-span-4 flex justify-center items-center"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[460px] sm:h-[520px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#16171a] group transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src={t.gymImage}
                alt={t.gymAlt}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center text-[10px] font-mono tracking-widest text-white/80 uppercase">
                <span>(FITNESS ATELIER)</span>
                <span className="text-white/50">01</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Walkway & Atrium Render */}
          <div
            ref={rightCardRef}
            className="lg:col-span-3 flex justify-center items-center"
          >
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] h-[420px] sm:h-[480px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#16171a] group transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src={t.corridorImage}
                alt={t.corridorAlt}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center text-[10px] font-mono tracking-widest text-white/80 uppercase">
                <span>(SCULPTURAL ATRIUM)</span>
                <span className="text-white/50">02</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
