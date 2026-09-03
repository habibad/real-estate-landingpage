"use client";

import React, { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

const emptySubscribe = () => () => {};

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!isClient) {
    return (
      <div
        className={`w-8 h-8 rounded-full border border-white/10 bg-white/5 opacity-0 ${className}`}
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`relative group w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden ${
        isDark
          ? "bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white/90 hover:text-white"
          : "bg-black/[0.05] hover:bg-black/[0.1] border border-black/10 text-neutral-800 hover:text-black"
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {/* Sun Icon for switching to light or while in light mode */}
        <Sun
          className={`w-4 h-4 absolute transition-all duration-400 ease-out transform ${
            isDark
              ? "opacity-0 rotate-90 scale-50 pointer-events-none"
              : "opacity-100 rotate-0 scale-100 text-amber-600"
          }`}
        />
        {/* Moon Icon for switching to dark or while in dark mode */}
        <Moon
          className={`w-3.5 h-3.5 absolute transition-all duration-400 ease-out transform ${
            isDark
              ? "opacity-100 rotate-0 scale-100 text-neutral-200"
              : "opacity-0 -rotate-90 scale-50 pointer-events-none"
          }`}
        />
      </div>
    </button>
  );
}
