"use client";

import React, { useState, useEffect } from "react";
import { SITE_CONTENT } from "@/data/siteData";

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
          ? "translate-y-0 opacity-100 bg-[#0c0d0e]/80 backdrop-blur-md border-b border-white/10 py-3 sm:py-4"
          : "translate-y-0 opacity-100 bg-transparent border-b border-white/10 py-4 sm:py-5"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-14 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={onNavigateHome}
          className="group flex items-center gap-2 text-left"
          aria-label="Elyse Home"
        >
          <span className="font-editorial text-2xl sm:text-3xl tracking-[0.18em] text-white transition-opacity group-hover:opacity-80">
            {t.brand}
          </span>
        </button>

        {/* Right Navigation Group */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {/* Language Switcher */}
          <div className="flex items-center text-[11px] sm:text-xs tracking-widest font-mono select-none">
            <button
              onClick={() => setLang("en")}
              className={`transition-colors py-1 ${
                lang === "en"
                  ? "text-white font-semibold"
                  : "text-white/40 hover:text-white/80"
              }`}
            >
              EN
            </button>
            <span className="text-white/20 mx-1.5">—</span>
            <button
              onClick={() => setLang("de")}
              className={`transition-colors py-1 ${
                lang === "de"
                  ? "text-white font-semibold"
                  : "text-white/40 hover:text-white/80"
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
            className="group flex flex-col items-end justify-center w-8 h-8 gap-1.5 focus:outline-none p-1"
            aria-label="Open Navigation Menu"
          >
            <span className="w-5 h-[1.5px] bg-white transition-all group-hover:w-6" />
            <span className="w-3.5 h-[1.5px] bg-white transition-all group-hover:w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
