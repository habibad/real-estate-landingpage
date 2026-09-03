"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface LiveTextProps {
  text?: string | string[];
  children?: React.ReactNode;
  as?: "p" | "span" | "div" | "h2" | "h3";
  className?: string;
  delay?: number;
  stagger?: number;
  showCursor?: boolean;
}

export default function LiveText({
  text,
  children,
  as: Component = "p",
  className = "",
  delay = 0.05,
  stagger = 0.035,
  showCursor = true,
}: LiveTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Extract text from text prop or string children
  const rawText =
    typeof text === "string"
      ? text
      : Array.isArray(text)
      ? text.join(" ")
      : typeof children === "string"
      ? children
      : "";

  const words = React.useMemo(() => rawText.split(/\s+/).filter(Boolean), [rawText]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || words.length === 0) return;

    const wordEls = container.querySelectorAll<HTMLElement>(".live-word");
    const cursor = cursorRef.current;

    const ctx = gsap.context(() => {
      // Set initial hidden state
      gsap.set(wordEls, {
        opacity: 0,
        y: 6,
      });
      if (cursor) {
        gsap.set(cursor, { opacity: 0 });
      }

      const tl = gsap.timeline({
        paused: true,
        onStart: () => {
          setIsTypingComplete(false);
          if (cursor) gsap.set(cursor, { opacity: 1 });
        },
        onComplete: () => {
          setIsTypingComplete(true);
          if (cursor) {
            gsap.to(cursor, { opacity: 0, duration: 0.35, delay: 0.2 });
          }
        },
        onReverseComplete: () => {
          setIsTypingComplete(false);
          if (cursor) gsap.set(cursor, { opacity: 0 });
        },
      });

      tl.to(wordEls, {
        opacity: 1,
        y: 0,
        duration: 0.16,
        stagger: stagger,
        ease: "power2.out",
        delay: delay,
      });

      ScrollTrigger.create({
        trigger: container,
        start: "top 88%",
        end: "bottom 10%",
        onEnter: () => {
          tl.timeScale(1).play();
        },
        onLeave: () => {
          tl.timeScale(2.5).reverse();
        },
        onEnterBack: () => {
          tl.timeScale(1).play();
        },
        onLeaveBack: () => {
          tl.timeScale(2.5).reverse();
        },
      });
    }, container);

    return () => ctx.revert();
  }, [words, delay, stagger]);

  if (!rawText && children) {
    return React.createElement(Component, { className }, children);
  }

  return React.createElement(
    Component,
    {
      ref: containerRef,
      className: `${className} relative`,
    },
    <>
      {words.map((word, idx) => (
        <span
          key={idx}
          className="live-word inline-block will-change-transform"
          style={{ opacity: 0 }}
        >
          {word}&nbsp;
        </span>
      ))}
      {showCursor && (
        <span
          ref={cursorRef}
          className={`inline-block w-[2px] h-[0.95em] bg-white/80 ml-0.5 translate-y-[1px] align-middle transition-opacity duration-200 ${
            isTypingComplete ? "opacity-0" : "animate-pulse"
          }`}
          aria-hidden="true"
        />
      )}
    </>
  );
}
