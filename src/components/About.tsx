"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SITE_CONTENT } from "@/data/siteData";

interface AboutProps {
  lang: "en" | "de";
  onLearnMore: () => void;
}

export default function About({ lang, onLearnMore }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);

  const t = SITE_CONTENT[lang].about;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax upward drift for the central image on scroll
      if (imageInnerRef.current) {
        gsap.fromTo(
          imageInnerRef.current,
          { y: 80, scale: 1.08 },
          {
            y: -60,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // Smooth subtle text parallax reveal
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0.6, y: 50 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "top 30%",
              scrub: 0.8,
            },
          }
        );
      }

      if (rightTextRef.current) {
        gsap.fromTo(
          rightTextRef.current,
          { opacity: 0.5, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "top 35%",
              scrub: 0.8,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 sm:py-32 md:py-40 bg-[#0c0d0e] flex items-center overflow-hidden border-t border-white/5"
    >
      <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-10 md:px-14">
        {/* Main 3-Column Split Layout matching video frames 00-01 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Tag and Editorial Headline */}
          <div className="md:col-span-4 flex flex-col justify-between h-full space-y-12">
            <span className="font-editorial italic text-xs sm:text-sm tracking-widest text-white/70">
              {t.tag}
            </span>

            <h2
              ref={headlineRef}
              className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-normal tracking-wide text-white uppercase leading-[1.08] drop-shadow-sm"
            >
              {t.headline.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          {/* Center Column: Vertical Architectural Render with Parallax */}
          <div
            ref={imageContainerRef}
            className="md:col-span-4 flex justify-center items-center py-4"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[480px] sm:h-[560px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#16171a]">
              <div ref={imageInnerRef} className="relative w-full h-[120%] -top-[10%]">
                <Image
                  src="/images/about-living.jpg"
                  alt="Elyse Residence Minimalist Living Room"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Descriptive Manifesto & CTA */}
          <div
            ref={rightTextRef}
            className="md:col-span-4 flex flex-col justify-center space-y-6 lg:pl-4"
          >
            <p className="text-xs sm:text-sm text-[#9aa0a6] leading-relaxed font-sans-clean">
              {t.paragraph1}
            </p>

            <p className="text-xs sm:text-sm text-[#9aa0a6] leading-relaxed font-sans-clean">
              {t.paragraph2}
            </p>

            <div className="pt-2">
              <button onClick={onLearnMore} className="btn-pill-white">
                {t.cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
