"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import { SITE_CONTENT } from "@/data/siteData";
import LiveText from "@/components/LiveText";

interface MetricsProps {
  lang: "en" | "de";
}

export default function Metrics({ lang }: MetricsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const t = SITE_CONTENT[lang].metrics;

  const [livingSpace, setLivingSpace] = useState(t.livingSpace.start);
  const [greenSpace, setGreenSpace] = useState(t.greenSpaces.start);
  const [residences, setResidences] = useState(t.residences.start);

  useEffect(() => {
    if (!containerRef.current) return;

    const obj = {
      space: t.livingSpace.start,
      green: t.greenSpaces.start,
      res: t.residences.start,
    };

    const ctx = gsap.context(() => {
      // Scrubbed GSAP numeric tween matching video timing
      gsap.to(obj, {
        space: t.livingSpace.end,
        green: t.greenSpaces.end,
        res: t.residences.end,
        ease: "power1.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 30%",
          scrub: 1.2,
          onUpdate: () => {
            setLivingSpace(Math.round(obj.space));
            setGreenSpace(Math.round(obj.green));
            setResidences(Math.round(obj.res));
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [lang, t]);

  return (
    <section
      id="metrics"
      ref={containerRef}
      className="relative w-full min-h-screen py-24 sm:py-36 md:py-48 bg-[#0c0d0e] flex items-center overflow-hidden border-t border-white/5"
    >
      <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-10 md:px-14">
        {/* Asymmetrical Stat Matrix matching video frame 03 */}
        <div className="relative min-h-[500px] sm:min-h-[600px] flex flex-col justify-between">
          {/* Top Row: Green spaces (center-right) and Exclusive residences (far right) */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-start">
            <div className="hidden sm:block sm:col-span-5" />

            {/* Metric: Green Spaces */}
            <div className="sm:col-span-4 space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="font-editorial text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-normal leading-none tracking-tight">
                  {greenSpace}
                </span>
                <span className="font-editorial italic text-2xl sm:text-3xl md:text-4xl text-white/80">
                  {t.greenSpaces.unit}
                </span>
              </div>
              <LiveText
                text={t.greenSpaces.label}
                className="text-xs sm:text-[13px] text-[#9aa0a6] font-sans-clean max-w-[200px] leading-relaxed"
                delay={0.1}
                stagger={0.03}
              />
            </div>

            {/* Metric: Residences */}
            <div className="sm:col-span-3 space-y-1">
              <div className="flex items-baseline">
                <span className="font-editorial text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-normal leading-none tracking-tight">
                  {residences}
                </span>
              </div>
              <LiveText
                text={t.residences.label}
                className="text-xs sm:text-[13px] text-[#9aa0a6] font-sans-clean max-w-[220px] leading-relaxed"
                delay={0.15}
                stagger={0.03}
              />
            </div>
          </div>

          {/* Middle Row: Living Space (Left Aligned) */}
          <div className="my-12 sm:my-8 max-w-lg">
            <div className="flex items-baseline gap-3">
              <span className="font-editorial text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] text-white font-normal leading-none tracking-tight">
                {livingSpace}k
              </span>
              <span className="font-editorial italic text-2xl sm:text-4xl md:text-5xl text-white/80">
                {t.livingSpace.unit}
              </span>
            </div>
            <LiveText
              text={t.livingSpace.label}
              className="text-xs sm:text-[13px] text-[#9aa0a6] font-sans-clean max-w-[260px] leading-relaxed mt-2"
              delay={0.1}
              stagger={0.03}
            />
          </div>

          {/* Bottom Row: 24/7 Concierge (Center Aligned) */}
          <div className="flex justify-center w-full pt-8">
            <div className="text-center space-y-2">
              <div className="font-editorial text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] text-white font-normal leading-none tracking-tight">
                {t.concierge.value}
              </div>
              <LiveText
                text={t.concierge.label}
                className="text-xs sm:text-[13px] text-[#9aa0a6] font-sans-clean max-w-sm mx-auto leading-relaxed"
                delay={0.1}
                stagger={0.03}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
