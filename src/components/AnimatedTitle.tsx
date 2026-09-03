"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface AnimatedTitleProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "div";
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
}

export default function AnimatedTitle({
  children,
  as: Component = "h2",
  className = "",
  delay = 0,
  yOffset = 50,
  duration = 0.85,
}: AnimatedTitleProps) {
  const elRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(el, {
        y: yOffset,
        opacity: 0,
        willChange: "transform, opacity",
      });

      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          end: "bottom 8%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, yOffset, duration]);

  return React.createElement(
    Component,
    {
      ref: elRef,
      className,
    },
    children
  );
}
