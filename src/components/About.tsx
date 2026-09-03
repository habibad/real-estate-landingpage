"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { SITE_CONTENT } from "@/data/siteData";
import AnimatedTitle from "@/components/AnimatedTitle";
import LiveText from "@/components/LiveText";

interface AboutProps {
  lang: "en" | "de";
  onLearnMore: () => void;
}

export default function About({ lang, onLearnMore }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  const t = SITE_CONTENT[lang].about;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 3D Height expansion and upward glide animation when scrolling from Hero into About
      if (imageCardRef.current) {
        gsap.fromTo(
          imageCardRef.current,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            transformOrigin: "bottom center",
            rotationX: 22,
            rotationY: -3,
            z: -80,
            y: 90,
            scale: 0.92,
            opacity: 0,
            filter: "brightness(0.75)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            transformOrigin: "bottom center",
            rotationX: 0,
            rotationY: 0,
            z: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            filter: "brightness(1)",
            duration: 1.35,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 72%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

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
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 sm:py-32 md:py-40 bg-[var(--bg-main)] flex items-center overflow-hidden border-t border-black/5 dark:border-white/5 transition-colors duration-300"
    >
      <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-10 md:px-14">
        {/* Main 3-Column Split Layout matching video frames 00-01 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Tag and Editorial Headline */}
          <div className="md:col-span-4 flex flex-col justify-between h-full space-y-12">
            <AnimatedTitle
              as="span"
              className="font-editorial italic text-xs sm:text-sm tracking-widest text-neutral-500 dark:text-white/70 block"
              yOffset={25}
            >
              {t.tag}
            </AnimatedTitle>

            <AnimatedTitle
              as="h2"
              className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-normal tracking-wide text-neutral-900 dark:text-white uppercase leading-[1.08] drop-shadow-sm"
              delay={0.12}
            >
              {t.headline.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </AnimatedTitle>
          </div>

          {/* Center Column: Vertical Architectural Render with 3D Expansion & Parallax */}
          <div
            ref={imageContainerRef}
            className="md:col-span-4 flex justify-center items-center py-4 [perspective:1200px]"
          >
            <div
              ref={imageCardRef}
              className="relative w-full max-w-[340px] sm:max-w-[380px] h-[480px] sm:h-[560px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-black/10 dark:border-white/15 bg-white dark:bg-[#16171a] will-change-transform [transform-style:preserve-3d]"
            >
              <div ref={imageInnerRef} className="relative w-full h-[120%] -top-[10%]">
                <Image
                  src="/images/about-living-v2.jpg"
                  alt="Elyse Residence Minimalist Living Room"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/50 via-transparent to-white/5 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Descriptive Manifesto & CTA */}
          <div className="md:col-span-4 flex flex-col justify-center space-y-6 lg:pl-4">
            <LiveText
              text={t.paragraph1}
              className="text-sm sm:text-base text-neutral-700 dark:text-[#9aa0a6] leading-relaxed font-sans-clean"
              delay={0.1}
              stagger={0.03}
            />

            <LiveText
              text={t.paragraph2}
              className="text-sm sm:text-base text-neutral-700 dark:text-[#9aa0a6] leading-relaxed font-sans-clean"
              delay={0.25}
              stagger={0.03}
            />

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
