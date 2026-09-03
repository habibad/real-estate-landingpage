"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Only enable on desktop with pointer
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      gsap.to(dot, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const ticker = () => {
      pos.x += (mouse.x - pos.x) * 0.18;
      pos.y += (mouse.y - pos.y) * 0.18;

      gsap.set(ring, {
        x: pos.x,
        y: pos.y,
      });
    };

    gsap.ticker.add(ticker);
    window.addEventListener("mousemove", onMouseMove);

    // Track hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.closest("[data-cursor-hover]") ||
        target.tagName === "BUTTON" ||
        target.tagName === "A"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      gsap.ticker.remove(ticker);
    };
  }, [isVisible]);

  return (
    <>
      {/* Inner precise dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 mix-blend-difference ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isHovered ? "scale-150" : "scale-100"}`}
      />
      {/* Outer smooth tracking ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isVisible ? "opacity-70" : "opacity-0"
        } ${
          isHovered
            ? "w-12 h-12 bg-white/10 dark:bg-white/10 bg-black/5 border border-white/40 dark:border-white/40 border-black/30 backdrop-blur-[1px] scale-110"
            : "w-8 h-8 border border-white/25 dark:border-white/25 border-black/25 scale-100"
        }`}
      />
    </>
  );
}
