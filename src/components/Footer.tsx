"use client";

import React, { useState } from "react";
import AnimatedTitle from "@/components/AnimatedTitle";
import LiveText from "@/components/LiveText";

interface FooterProps {
  lang: "en" | "de";
  onNavigateSection: (sectionId: string) => void;
  onBookVisit: () => void;
}

export default function Footer({
  lang,
  onNavigateSection,
  onBookVisit,
}: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const isEn = lang === "en";

  const scrollToTop = () => {
    onNavigateSection("hero");
  };

  return (
    <footer className="relative w-full bg-[#08090a] text-[#ededed] border-t border-white/10 overflow-hidden select-none">
      {/* 1. TOP VIP REGISTRY / NEWSLETTER STRIP */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 py-16 sm:py-20 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Private Registry Headline */}
          <div className="lg:col-span-6 space-y-3">
            <AnimatedTitle
              as="span"
              className="font-editorial italic text-xs sm:text-sm tracking-widest text-white/60 block"
              yOffset={20}
            >
              {isEn ? "(PRIVATE REGISTRY)" : "(PRIVATES REGISTER)"}
            </AnimatedTitle>
            <AnimatedTitle
              as="h3"
              className="font-editorial text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-tight tracking-wide"
              yOffset={35}
              delay={0.1}
            >
              {isEn
                ? "Receive Off-Market Architectural Releases & Private Portfolios."
                : "Erhalten Sie vertrauliche Exposés und Off-Market-Veröffentlichungen."}
            </AnimatedTitle>
            <LiveText
              text={
                isEn
                  ? "Join our invitation-only journal detailing bespoke finishes, floorplan previews, and private viewing receptions."
                  : "Treten Sie unserem exklusiven Journal bei für Einblicke in Maßanfertigungen, Grundrisse und private Empfänge."
              }
              className="text-xs sm:text-[13px] text-[#9aa0a6] font-sans font-light leading-relaxed max-w-lg"
              delay={0.15}
              stagger={0.03}
            />
          </div>

          {/* Right: Elegant Email Input Form */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {subscribed ? (
              <div className="p-4 rounded-xl bg-white/5 border border-white/20 text-center">
                <p className="font-editorial italic text-sm text-white">
                  {isEn
                    ? "Thank you. You have been registered for private correspondence."
                    : "Vielen Dank. Sie wurden für die private Korrespondenz registriert."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    isEn ? "Enter your email address..." : "Ihre E-Mail-Adresse..."
                  }
                  required
                  className="flex-1 bg-white/[0.04] border border-white/15 focus:border-white/50 rounded-full px-6 py-3.5 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="bg-white text-black hover:bg-neutral-200 transition-all px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase shrink-0 shadow-lg cursor-pointer"
                >
                  {isEn ? "JOIN REGISTRY" : "BEITRETEN"}
                </button>
              </form>
            )}
            <div className="mt-3 flex items-center justify-between text-[11px] text-white/40 px-2 font-sans font-light">
              <span>{isEn ? "Discretion assured · Zero spam" : "Diskretion garantiert · Kein Spam"}</span>
              <span>{isEn ? "Encrypted & Confidential" : "Verschlüsselt & vertraulich"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN 4-COLUMN FOOTER NAVIGATION */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Col 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <button
              onClick={() => onNavigateSection("hero")}
              className="text-left group"
              aria-label="Elyse Home"
            >
              <span className="font-editorial text-3xl sm:text-4xl text-white tracking-[0.14em] block">
                ELYSE
              </span>
              <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase block mt-1">
                RESIDENCE · LUXURY LIVING
              </span>
            </button>

            <p className="text-xs sm:text-[13px] text-[#9aa0a6] leading-relaxed font-sans font-light max-w-sm">
              {isEn
                ? "A harmonious sanctuary crafted at the intersection of timeless architecture, holistic wellness, and discreet exclusivity."
                : "Ein harmonisches Refugium an der Schnittstelle von zeitloser Architektur, ganzheitlicher Wellness und diskreter Exklusivität."}
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>LEED Platinum Certified · WELL Gold</span>
              </div>
            </div>
          </div>

          {/* Col 2: Section Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-editorial italic text-xs tracking-widest text-white/60 block uppercase">
              {isEn ? "(EXPERIENCE)" : "(ERLEBNIS)"}
            </span>
            <ul className="space-y-2.5 text-xs sm:text-[13px] font-sans font-light text-[#9aa0a6]">
              <li>
                <button
                  onClick={() => onNavigateSection("hero")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {isEn ? "01 / Overview & Skyframe" : "01 / Übersicht & Skyframe"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection("about")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {isEn ? "02 / The Brand Manifesto" : "02 / Das Marken-Manifest"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection("projects")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {isEn ? "03 / Residence Portfolio" : "03 / Residenzen-Portfolio"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection("beliefs")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {isEn ? "04 / Architectural Pillars" : "04 / Architektonische Säulen"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection("amenities")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {isEn ? "05 / Wellness Sanctuary" : "05 / Wellness-Refugium"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection("zoom-out-showcase")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {isEn ? "06 / Complete Portfolio Grid" : "06 / Vollständiges Portfolio"}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Concierge & Sales Gallery (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-editorial italic text-xs tracking-widest text-white/60 block uppercase">
              {isEn ? "(INQUIRIES)" : "(ANFRAGEN)"}
            </span>
            <div className="space-y-3 text-xs sm:text-[13px] font-sans font-light text-[#9aa0a6] leading-relaxed">
              <div>
                <p className="text-white/90 font-medium">
                  {isEn ? "Private Sales Gallery" : "Private Verkaufsgalerie"}
                </p>
                <p>740 Park Avenue / Avenue Montaigne</p>
                <p>Private Suite 2400</p>
              </div>

              <div>
                <p className="text-white/90 font-medium">{isEn ? "Direct Line" : "Direktkontakt"}</p>
                <p className="font-mono text-white/80">+1 (212) 555-0194</p>
                <p className="font-mono text-white/80">+49 30 8920 140</p>
              </div>

              <div>
                <p className="text-white/90 font-medium">Concierge</p>
                <a
                  href="mailto:residences@elyse-living.com"
                  className="text-white hover:underline underline-offset-4 transition-colors"
                >
                  residences@elyse-living.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Private Consultation Action (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-editorial italic text-xs tracking-widest text-white/60 block uppercase">
              {isEn ? "(VISIT)" : "(BESUCH)"}
            </span>
            <div className="space-y-4">
              <p className="text-xs text-[#9aa0a6] leading-relaxed font-sans font-light">
                {isEn
                  ? "Schedule a bespoke walkthrough with our private residential curator."
                  : "Vereinbaren Sie einen individuellen Rundgang mit unserem Kurator."}
              </p>
              <button
                onClick={onBookVisit}
                className="w-full bg-white text-black hover:bg-neutral-200 transition-all py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-center shadow-lg cursor-pointer"
              >
                {isEn ? "BOOK A VISIT" : "BESICHTIGUNG"}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. GHOSTED ARCHITECTURAL WATERMARK */}
      <div className="relative w-full overflow-hidden select-none pointer-events-none text-center -my-4 sm:-my-6 lg:-my-8 opacity-40">
        <span className="font-editorial text-[16vw] font-normal text-white/[0.04] tracking-[0.14em] leading-none uppercase inline-block">
          ELYSE
        </span>
      </div>

      {/* 4. BOTTOM BAR / COPYRIGHT & COMPLIANCE */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-white/50 font-sans font-light">
        {/* Left: Copyright */}
        <div>
          <span>© 2026 ELYSE LUXURY RESIDENCE HOLDINGS. {isEn ? "ALL RIGHTS RESERVED." : "ALLE RECHTE VORBEHALTEN."}</span>
        </div>

        {/* Center: Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-[10px] text-white/40">
          <span className="hover:text-white/80 cursor-pointer transition-colors">
            {isEn ? "PRIVACY POLICY" : "DATENSCHUTZ"}
          </span>
          <span>·</span>
          <span className="hover:text-white/80 cursor-pointer transition-colors">
            {isEn ? "TERMS OF RESIDENCE" : "NUTZUNGSBEDINGUNGEN"}
          </span>
          <span>·</span>
          <span className="hover:text-white/80 cursor-pointer transition-colors">
            {isEn ? "ARCHITECTURAL SPECIFICATIONS" : "BAUSPEZIFIKATIONEN"}
          </span>
          <span>·</span>
          <span className="hover:text-white/80 cursor-pointer transition-colors">
            {isEn ? "IMPRINT" : "IMPRESSUM"}
          </span>
        </div>

        {/* Right: Smooth Back to Top */}
        <div>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-1.5 font-mono text-[11px] text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <span>{isEn ? "BACK TO TOP" : "NACH OBEN"}</span>
            <span className="transition-transform duration-300 group-hover:-translate-y-1">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
