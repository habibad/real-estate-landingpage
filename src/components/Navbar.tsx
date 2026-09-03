"use client";

import React, { useState, useEffect } from "react";
import { SITE_CONTENT } from "@/data/siteData";
import ThemeToggle from "@/components/ThemeToggle";

interface NavbarProps {
  lang: "en" | "de";
  setLang: (lang: "en" | "de") => void;
  onBookVisit: () => void;
  onOpenDrawer: () => void;
  onNavigateHome: () => void;
}

export default function Navbar({
  lang,
  setLang,
  onBookVisit,
  onOpenDrawer,
  onNavigateHome,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [inProjects, setInProjects] = useState(false);
  const t = SITE_CONTENT[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check if user is viewing the pinned #projects section
      const projectsEl = document.getElementById("projects");
      if (projectsEl) {
        const rect = projectsEl.getBoundingClientRect();
        // If projects carousel is occupying the active viewport
        if (rect.top <= 60 && rect.bottom >= window.innerHeight * 0.4) {
          setInProjects(true);
        } else {
          setInProjects(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        inProjects
          ? "-translate-y-full opacity-0 pointer-events-none"
          : scrolled
          ? "translate-y-0 opacity-100 bg-[#f4f3f0]/85 dark:bg-[#0c0d0e]/80 backdrop-blur-md border-b border-black/8 dark:border-white/10 py-3 sm:py-4 shadow-sm"
          : "translate-y-0 opacity-100 bg-transparent border-b border-black/8 dark:border-white/10 py-4 sm:py-5"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-14 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={onNavigateHome}
          className="group flex items-center gap-2 text-left cursor-pointer"
          aria-label="Elyse Home"
        >
          <span className="font-editorial text-2xl sm:text-3xl tracking-[0.18em] text-neutral-900 dark:text-white transition-opacity group-hover:opacity-80">
            {t.brand}
          </span>
        </button>

        {/* Right Navigation Group */}
        <div className="flex items-center gap-3 sm:gap-5 md:gap-7">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Language Switcher */}
          <div className="flex items-center text-[11px] sm:text-xs tracking-widest font-mono select-none">
            <button
              onClick={() => setLang("en")}
              className={`transition-colors py-1 cursor-pointer ${
                lang === "en"
                  ? "text-neutral-900 dark:text-white font-semibold"
                  : "text-neutral-400 dark:text-white/40 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              EN
            </button>
            <span className="text-neutral-300 dark:text-white/20 mx-1 sm:mx-1.5">—</span>
            <button
              onClick={() => setLang("de")}
              className={`transition-colors py-1 cursor-pointer ${
                lang === "de"
                  ? "text-neutral-900 dark:text-white font-semibold"
                  : "text-neutral-400 dark:text-white/40 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              DE
            </button>
          </div>

          {/* Book A Visit Pill Button */}
          <button
            onClick={onBookVisit}
            className="btn-pill-white text-[10px] sm:text-xs tracking-wider"
          >
            {t.bookVisit}
          </button>

          {/* Minimalist Hamburger Button */}
          <button
            onClick={onOpenDrawer}
            className="group flex flex-col items-end justify-center w-8 h-8 gap-1.5 focus:outline-none p-1 cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <span className="w-5 h-[1.5px] bg-neutral-900 dark:bg-white transition-all group-hover:w-6" />
            <span className="w-3.5 h-[1.5px] bg-neutral-900 dark:bg-white transition-all group-hover:w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
