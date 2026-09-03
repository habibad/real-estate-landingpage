"use client";

import React, { useEffect, useRef } from "react";
import { X, ArrowUpRight, MapPin, Mail } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useScrollLock } from "@/components/SmoothScrollProvider";

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onBookVisit: () => void;
  lang?: "en" | "de";
  setLang: (lang: "en" | "de") => void;
}

export default function NavigationDrawer({
  isOpen,
  onClose,
  onNavigate,
  onBookVisit,
  lang = "en",
  setLang,
}: NavigationDrawerProps) {
  useScrollLock(isOpen);
  const drawerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!drawerRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        drawerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
      if (linksRef.current) {
        gsap.fromTo(
          linksRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out", delay: 0.1 }
        );
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const menuItems = [
    { label: lang === "en" ? "01. HERO SANCTUARY" : "01. HAUPTHAUS", target: "hero" },
    { label: lang === "en" ? "02. THE MANIFESTO" : "02. DAS MANIFEST", target: "about" },
    { label: lang === "en" ? "03. RESIDENCE METRICS" : "03. KENNZAHLEN", target: "metrics" },
    { label: lang === "en" ? "04. LUMIÈRE DUPLEX" : "04. LUMIÈRE DUPLEX", target: "projects" },
    { label: lang === "en" ? "05. CORE BELIEFS" : "05. UNSERE WERTE", target: "beliefs" },
    { label: lang === "en" ? "06. WELLNESS SUITES" : "06. WELLNESS-BEREICH", target: "amenities" },
    { label: lang === "en" ? "07. PORTFOLIO SHOWCASE" : "07. GESAMTÜBERSICHT", target: "zoom-out-showcase" },
  ];

  return (
    <div
      ref={drawerRef}
      data-lenis-prevent
      className="fixed inset-0 z-[9995] bg-[#0c0d0e]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 md:p-16 text-[#ededed] overflow-y-auto overscroll-contain no-scrollbar"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <span className="font-editorial text-2xl tracking-[0.2em] text-white">ELYSE</span>
          <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase hidden sm:inline-block">
            {lang === "en" ? "RESIDENCE & ESTATES" : "RESIDENZEN & ANWESEN"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Switcher in Drawer */}
          <div className="flex items-center text-xs tracking-wider font-mono">
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1 transition-colors ${
                lang === "en" ? "text-white font-bold" : "text-white/40 hover:text-white/70"
              }`}
            >
              EN
            </button>
            <span className="text-white/20">—</span>
            <button
              onClick={() => setLang("de")}
              className={`px-2 py-1 transition-colors ${
                lang === "de" ? "text-white font-bold" : "text-white/40 hover:text-white/70"
              }`}
            >
              DE
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white hover:bg-white/10 transition-all"
            aria-label="Close Menu"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Navigation Links */}
      <div
        ref={linksRef}
        className="my-auto py-8 grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-12"
      >
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              onClose();
              onNavigate(item.target);
            }}
            className="group text-left flex items-center justify-between py-3 border-b border-white/5 hover:border-white/30 transition-all"
          >
            <span className="text-xl sm:text-3xl md:text-4xl font-editorial tracking-wide text-white/70 group-hover:text-white group-hover:translate-x-2 transition-all">
              {item.label}
            </span>
            <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white group-hover:rotate-45 transition-all opacity-0 group-hover:opacity-100" />
          </button>
        ))}
      </div>

      {/* Footer Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 text-xs text-[#9aa0a6]">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-white font-mono text-[11px] uppercase tracking-wider">
            <MapPin size={12} />
            <span>{lang === "en" ? "Location" : "Standort"}</span>
          </div>
          <p>Königsweg 18, 80802 Munich / Zurich Sanctuary</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-white font-mono text-[11px] uppercase tracking-wider">
            <Mail size={12} />
            <span>{lang === "en" ? "Direct Concierge" : "Direktkontakt"}</span>
          </div>
          <p>concierge@elyse-residence.com</p>
        </div>

        <div className="flex sm:justify-end items-center">
          <button
            onClick={() => {
              onClose();
              onBookVisit();
            }}
            className="btn-pill-white !py-2.5 !px-5 !text-xs"
          >
            {lang === "en" ? "BOOK A VISIT" : "BESICHTIGUNG BUCHEN"}
          </button>
        </div>
      </div>
    </div>
  );
}
