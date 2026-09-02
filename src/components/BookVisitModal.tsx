"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, User, Mail, Phone, Home, CheckCircle2 } from "lucide-react";

interface BookVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: "en" | "de";
}

export default function BookVisitModal({
  isOpen,
  onClose,
  lang = "en",
}: BookVisitModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    residenceType: "Lumière Grand Residence",
    date: "",
    timeSlot: "14:00 - 16:00",
    specialRequests: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md transition-all animate-in fade-in duration-300">
      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-[#141518] border border-[#2a2c33] rounded-2xl shadow-2xl p-6 sm:p-8 text-[#ededed] overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
          aria-label="Close Modal"
        >
          <X size={16} />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-mono">
                {lang === "en" ? "(PRIVATE APPOINTMENT)" : "(PRIVATER TERMIN)"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial tracking-wide text-white mt-1">
                {lang === "en" ? "Reserve a Private Tour" : "Private Führung reservieren"}
              </h2>
              <p className="text-xs sm:text-sm text-[#9aa0a6] mt-2 font-sans-clean leading-relaxed">
                {lang === "en"
                  ? "Experience the architectural harmony of Elyse Residence in person. Our private concierge will host a tailored walkthrough."
                  : "Erleben Sie die architektonische Harmonie der Elyse Residence persönlich. Unser Concierge führt Sie exklusiv."}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1">
                    {lang === "en" ? "Full Name" : "Vollständiger Name"}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      required
                      type="text"
                      placeholder="Lord Harrison"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#1c1d22] border border-[#2d3039] rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-white/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1">
                    {lang === "en" ? "Email Address" : "E-Mail-Adresse"}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      required
                      type="email"
                      placeholder="harrison@elyse.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#1c1d22] border border-[#2d3039] rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-white/50 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1">
                    {lang === "en" ? "Phone Number" : "Telefonnummer"}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      required
                      type="tel"
                      placeholder="+1 (555) 019-2834"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#1c1d22] border border-[#2d3039] rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-white/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1">
                    {lang === "en" ? "Residence Interest" : "Bevorzugte Residenz"}
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <select
                      value={formData.residenceType}
                      onChange={(e) => setFormData({ ...formData, residenceType: e.target.value })}
                      className="w-full bg-[#1c1d22] border border-[#2d3039] rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-white/50 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="Lumière Grand Residence">Lumière Grand Residence (5 Bed / 5,600 sq ft)</option>
                      <option value="Lumière Master Duplex">Lumière Master Duplex (4 Bed / 3,850 sq ft)</option>
                      <option value="Lumière Salon Residence">Lumière Salon Residence (3 Bed / 3,100 sq ft)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1">
                    {lang === "en" ? "Preferred Date" : "Wunschdatum"}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      required
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#1c1d22] border border-[#2d3039] rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-white/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/60 mb-1">
                    {lang === "en" ? "Preferred Time Slot" : "Zeitfenster"}
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full bg-[#1c1d22] border border-[#2d3039] rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-white/50 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="10:00 - 12:00">Morning (10:00 - 12:00)</option>
                      <option value="14:00 - 16:00">Afternoon (14:00 - 16:00)</option>
                      <option value="17:00 - 19:00 (Sunset)">Sunset Walkthrough (17:00 - 19:00)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full btn-pill-white !py-3 !text-xs tracking-wider uppercase font-semibold"
                >
                  {lang === "en" ? "CONFIRM VISIT REQUEST" : "TERMINANFRAGE BESTÄTIGEN"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-editorial text-white">
              {lang === "en" ? "Appointment Requested" : "Termin angefragt"}
            </h3>
            <p className="text-xs text-[#9aa0a6] max-w-md mx-auto leading-relaxed">
              {lang === "en"
                ? `Thank you, ${formData.name || "valued guest"}. Our Elyse concierge team will verify your chosen date and coordinate private gate security access.`
                : `Vielen Dank. Unser Concierge-Team wird Ihren Termin bestätigen.`}
            </p>
            <button
              onClick={resetAndClose}
              className="btn-pill-white !px-6 !py-2.5 !text-xs mt-4"
            >
              {lang === "en" ? "RETURN TO RESIDENCE" : "ZURÜCK ZUR SEITE"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
