"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import {
  Mail,
  Copy,
  Check,
  Phone,
  MapPin,
  Terminal,
} from "lucide-react";

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-[#2e251e] relative bg-[#12100e]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D4A373]/10 border border-[#D4A373]/30 text-xs font-mono text-[#D4A373]">
            <Mail className="w-3.5 h-3.5" />
            <span>07 // DIRECT CONTACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Let&apos;s Build Systems Together
          </h2>
          <p className="text-sm sm:text-base text-[#b8ad9e] max-w-2xl font-sans leading-relaxed">
            Open to discussing backend infrastructure roles, distributed systems engineering, and collaborative software projects.
          </p>
        </div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Primary Email Card */}
          <div className="p-7 rounded-2xl bg-[#140f0c] border border-[#2e251e] hover:border-[#D4A373]/40 transition-all space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#a89b8a]">Primary Email</span>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a140f] hover:bg-[#261e17] border border-[#3d332a] text-xs font-mono text-[#d6cdbf] hover:text-white transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#D4A373]" />
                      <span className="text-[#D4A373] font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#a89b8a]" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={profileData.socials.email}
                className="block text-xl sm:text-2xl font-mono font-bold text-[#E6CCB2] hover:text-white hover:underline break-all"
              >
                {profileData.email}
              </a>

              <p className="text-xs text-[#a89b8a] leading-relaxed font-sans">
                Direct inbox for technical inquiries, backend architecture roles, and engineering opportunities.
              </p>
            </div>
          </div>

          {/* Quick Details & Location Card */}
          <div className="p-7 rounded-2xl bg-[#140f0c] border border-[#2e251e] hover:border-[#D4A373]/40 transition-all space-y-4 shadow-xl flex flex-col justify-between font-mono text-xs">
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#a89b8a] block">Communication &amp; Status</span>

              <div className="flex items-center justify-between text-[#d6cdbf] pb-3 border-b border-[#231b15]">
                <span className="flex items-center gap-2.5 text-[#a89b8a]">
                  <Phone className="w-4 h-4 text-[#D4A373]" />
                  <span>Phone</span>
                </span>
                <a href={`tel:${profileData.phone}`} className="hover:text-white text-[#f5ebe0] font-bold">
                  {profileData.phone}
                </a>
              </div>

              <div className="flex items-center justify-between text-[#d6cdbf] pb-3 border-b border-[#231b15]">
                <span className="flex items-center gap-2.5 text-[#a89b8a]">
                  <MapPin className="w-4 h-4 text-[#C89666]" />
                  <span>Location</span>
                </span>
                <span className="text-[#f5ebe0]">{profileData.location}</span>
              </div>

              <div className="flex items-center justify-between text-[#d6cdbf]">
                <span className="flex items-center gap-2.5 text-[#a89b8a]">
                  <Terminal className="w-4 h-4 text-[#D4A373]" />
                  <span>Status</span>
                </span>
                <span className="text-[#E6CCB2] font-semibold">{profileData.status}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
