"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Bed, Maximize2, Tag, Check, ArrowRight } from "lucide-react";
import { ProjectData } from "@/data/siteData";
import { useScrollLock } from "@/components/SmoothScrollProvider";

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onBookVisit: () => void;
  lang?: "en" | "de";
}

export default function ProjectModal({
  project,
  onClose,
  onBookVisit,
  lang = "en",
}: ProjectModalProps) {
  const isOpen = Boolean(project);
  useScrollLock(isOpen);

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

  if (!project) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-lg animate-in fade-in duration-300"
    >
      {/* Modal Card */}
      <div
        data-lenis-prevent
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#141518] dark:bg-[#141518] bg-white border border-[#2a2c33] dark:border-[#2a2c33] border-black/10 rounded-2xl shadow-2xl overflow-y-auto no-scrollbar flex flex-col text-[#ededed] dark:text-[#ededed] text-[#121316] overscroll-contain transition-colors duration-300"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer"
          aria-label="Close Project Details"
        >
          <X size={18} />
        </button>

        {/* Hero Image in Modal */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 flex-shrink-0 bg-neutral-900">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141518] via-black/30 to-transparent" />

          {/* Title Overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/70 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">
              {project.category}
            </span>
            <h2 className="text-2xl sm:text-4xl font-editorial text-white tracking-wide mt-2">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Key Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-[#26282d] dark:border-[#26282d] border-black/10 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 dark:bg-white/5 bg-black/5 border border-white/10 dark:border-white/10 border-black/10 flex items-center justify-center text-white/70 dark:text-white/70 text-neutral-600">
                <Maximize2 size={16} />
              </div>
              <div>
                <div className="text-[10px] font-mono text-white/50 dark:text-white/50 text-neutral-500 uppercase">
                  {lang === "en" ? "Total Area" : "Gesamtfläche"}
                </div>
                <div className="text-sm font-semibold text-white dark:text-white text-neutral-900">{project.area}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 dark:bg-white/5 bg-black/5 border border-white/10 dark:border-white/10 border-black/10 flex items-center justify-center text-white/70 dark:text-white/70 text-neutral-600">
                <Bed size={16} />
              </div>
              <div>
                <div className="text-[10px] font-mono text-white/50 dark:text-white/50 text-neutral-500 uppercase">
                  {lang === "en" ? "Layout" : "Aufteilung"}
                </div>
                <div className="text-sm font-semibold text-white dark:text-white text-neutral-900">{project.bedrooms}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="w-8 h-8 rounded-full bg-white/5 dark:bg-white/5 bg-black/5 border border-white/10 dark:border-white/10 border-black/10 flex items-center justify-center text-white/70 dark:text-white/70 text-neutral-600">
                <Tag size={16} />
              </div>
              <div>
                <div className="text-[10px] font-mono text-white/50 dark:text-white/50 text-neutral-500 uppercase">
                  {lang === "en" ? "Price Valuation" : "Preissegment"}
                </div>
                <div className="text-sm font-semibold text-white dark:text-white text-neutral-900">{project.price}</div>
              </div>
            </div>
          </div>

          {/* Overview & Description */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-white/60 dark:text-white/60 text-neutral-500">
              {lang === "en" ? "(ARCHITECTURAL NARRATIVE)" : "(ARCHITEKTONISCHES KONZEPT)"}
            </h3>
            <p className="text-sm text-[#9aa0a6] dark:text-[#9aa0a6] text-neutral-600 leading-relaxed font-sans-clean">
              {project.description}
            </p>
          </div>

          {/* Architectural Key Features */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-white/60 dark:text-white/60 text-neutral-500">
              {lang === "en" ? "(DISTINGUISHED SPECIFICATIONS)" : "(AUSSTATTUNGSMERKMALE)"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] dark:bg-white/[0.03] bg-neutral-50 border border-white/5 dark:border-white/5 border-black/8"
                >
                  <div className="w-4 h-4 rounded-full bg-white/10 dark:bg-white/10 bg-black/10 flex items-center justify-center text-white/80 dark:text-white/80 text-neutral-700 shrink-0">
                    <Check size={10} />
                  </div>
                  <span className="text-xs text-[#ededed] dark:text-[#ededed] text-neutral-800 font-sans-clean">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#26282d] dark:border-[#26282d] border-black/10">
            <div className="text-xs text-white/60 dark:text-white/60 text-neutral-600">
              {lang === "en"
                ? "Private showings arranged exclusively by appointment."
                : "Private Besichtigungen ausschließlich nach Vereinbarung."}
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="btn-pill-outline w-full sm:w-auto !py-2.5 !text-xs"
              >
                {lang === "en" ? "CLOSE" : "SCHLIEẞEN"}
              </button>
              <button
                onClick={() => {
                  onClose();
                  onBookVisit();
                }}
                className="btn-pill-white w-full sm:w-auto !py-2.5 !text-xs flex items-center gap-1.5"
              >
                <span>{lang === "en" ? "REQUEST PRIVATE VIEWING" : "FÜHRUNG ANFRAGEN"}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
