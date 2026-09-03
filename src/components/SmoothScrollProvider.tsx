"use client";

import React, { useEffect, createContext, useContext, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: Record<string, unknown>) => void;
  stop: () => void;
  start: () => void;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useLenis = () => useContext(LenisContext);

let activeLocks = 0;
let unlockTimer: ReturnType<typeof setTimeout> | null = null;

export function useScrollLock(isLocked: boolean) {
  const { stop, start } = useLenis();

  useEffect(() => {
    if (!isLocked) return;

    if (unlockTimer) {
      clearTimeout(unlockTimer);
      unlockTimer = null;
    }

    activeLocks++;
    if (activeLocks === 1) {
      stop();
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      activeLocks = Math.max(0, activeLocks - 1);
      if (activeLocks === 0) {
        unlockTimer = setTimeout(() => {
          if (activeLocks === 0) {
            start();
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
          }
        }, 50);
      }
    };
  }, [isLocked, stop, start]);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with optimized luxury smooth scroll inertia
    const instance = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = instance;

    if (activeLocks > 0) {
      instance.stop();
    }

    // Connect Lenis to ScrollTrigger
    instance.on("scroll", ScrollTrigger.update);

    // Sync GSAP ticker with Lenis raf
    const updateRaf = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateRaf);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = React.useCallback(
    (target: string | HTMLElement | number, options?: Record<string, unknown>) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, {
          offset: 0,
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          ...options,
        });
      }
    },
    []
  );

  const stop = React.useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = React.useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const value = React.useMemo<LenisContextType>(
    () => ({
      get lenis() {
        return lenisRef.current;
      },
      scrollTo,
      stop,
      start,
    }),
    [scrollTo, stop, start]
  );

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}
