"use client";

import React, { useState } from "react";
import SmoothScrollProvider, { useLenis } from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Metrics from "@/components/Metrics";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import BeliefsGrid from "@/components/BeliefsGrid";
import Amenities from "@/components/Amenities";
import ZoomOutGrid from "@/components/ZoomOutGrid";
import Footer from "@/components/Footer";
import BookVisitModal from "@/components/BookVisitModal";
import ProjectModal from "@/components/ProjectModal";
import NavigationDrawer from "@/components/NavigationDrawer";
import { ProjectData } from "@/data/siteData";

function MainContent() {
  const [lang, setLang] = useState<"en" | "de">("en");
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const { scrollTo } = useLenis();

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      scrollTo(el);
    }
  };

  const handleScrollDownFromHero = () => {
    handleNavigateSection("about");
  };

  const handleLearnMoreManifesto = () => {
    handleNavigateSection("projects");
  };

  const handleLearnMoreAmenities = () => {
    handleNavigateSection("zoom-out-showcase");
  };

  return (
    <main className="relative bg-[#0c0d0e] dark:bg-[#0c0d0e] bg-[#f9f8f6] min-h-screen text-[#ededed] dark:text-[#ededed] text-[#121316] selection:bg-neutral-800 selection:text-white transition-colors duration-300">
      {/* Luxury Custom Cursor */}
      <CustomCursor />

      {/* Global Navigation Header */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onBookVisit={() => setIsBookModalOpen(true)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onNavigateHome={() => handleNavigateSection("hero")}
      />

      {/* SECTION 1: Global Hero Frame */}
      <Hero
        lang={lang}
        onBookVisit={() => setIsBookModalOpen(true)}
        onScrollDown={handleScrollDownFromHero}
      />

      {/* SECTION 2: About / Brand Manifesto */}
      <About
        lang={lang}
        onLearnMore={handleLearnMoreManifesto}
      />

      {/* SECTION 3: Dynamic Numeric Metrics (Scroll-Scrubbed Counter) */}
      <Metrics lang={lang} />

      {/* SECTION 4: Our Projects Horizontal Carousel / Split Slider */}
      <ProjectsCarousel
        lang={lang}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* SECTION 5: Our Beliefs & Bento Philosophy Grid */}
      <BeliefsGrid
        lang={lang}
        onBookVisit={() => setIsBookModalOpen(true)}
      />

      {/* SECTION 6: Wellness-Centered Amenities */}
      <Amenities
        lang={lang}
        onLearnMore={handleLearnMoreAmenities}
      />

      {/* SECTION 7: Multi-Tile Portfolio Grid Zoom-Out Outro Showcase (00:18 - 00:23) */}
      <ZoomOutGrid
        lang={lang}
        onSelectProject={(project) => setSelectedProject(project)}
        onBookVisit={() => setIsBookModalOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* SECTION 8: Architectural Luxury Footer */}
      <Footer
        lang={lang}
        onNavigateSection={handleNavigateSection}
        onBookVisit={() => setIsBookModalOpen(true)}
      />

      {/* Interactive Modals and Drawers */}
      <BookVisitModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        lang={lang}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onBookVisit={() => setIsBookModalOpen(true)}
        lang={lang}
      />

      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={handleNavigateSection}
        onBookVisit={() => setIsBookModalOpen(true)}
        lang={lang}
        setLang={setLang}
      />
    </main>
  );
}

export default function Home() {
  return (
    <SmoothScrollProvider>
      <MainContent />
    </SmoothScrollProvider>
  );
}
