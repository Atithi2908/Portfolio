"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { profileData } from "@/data/profile";
import { Terminal, Mail, Menu, X, ArrowUpRight, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "#" },
    { label: "Education", href: "#education" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Competitive", href: "#achievements" },
    { label: "Interests", href: "#interests" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0c0a09]/80 backdrop-blur-md border-b border-[#2b2520] shadow-lg shadow-black/60 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand identity */}
        <a
          href="#"
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-[#1c1714] border border-[#3d332a] flex items-center justify-center overflow-hidden relative group-hover:border-[#D4A373]/60 transition-all">
            <Image
              src="/avatar.png"
              alt={profileData.name}
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-mono font-bold text-sm tracking-tight text-white flex items-center gap-2">
              <span>{profileData.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-pulse"></span>
            </div>
            <p className="text-[11px] font-mono text-[#a89f91]">
              Backend &amp; AI Engineer
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#171310]/80 border border-[#332b23] rounded-full px-4 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-medium text-[#c4b9aa] hover:text-white hover:bg-[#28211b] rounded-full transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button & Socials */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-1.5 border-r border-[#332b23] pr-3">
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#a89f91] hover:text-white hover:bg-[#241d17] rounded-lg transition-all"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#a89f91] hover:text-white hover:bg-[#241d17] rounded-lg transition-all"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Resume View in New Tab CTA */}
          <a
            href={profileData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono font-medium px-3.5 py-2 rounded-lg bg-[#1a140f] border border-[#3d332a] text-[#d6cdbf] hover:border-[#D4A373]/60 hover:text-white transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Resume</span>
          </a>

          {/* Let's Connect Link to #contact */}
          <a
            href="#contact"
            className="flex items-center gap-1.5 text-xs font-mono font-medium px-4 py-2 rounded-lg bg-[#211a14] border border-[#D4A373]/50 text-[#E6CCB2] hover:bg-[#D4A373]/20 hover:border-[#D4A373] transition-all shadow-sm shadow-[#D4A373]/10"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D4A373]" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-[#a89f91] hover:text-white md:hidden rounded-lg bg-[#1a1511] border border-[#332b23]"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#332b23] bg-[#0f0c0a]/95 backdrop-blur-xl px-4 py-4 space-y-2 mt-3 animate-in fade-in">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-[#c4b9aa] hover:text-[#D4A373] hover:bg-[#1a140f] rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[#2b2520] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a89f91] hover:text-white p-2"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a89f91] hover:text-white p-2"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={profileData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-mono text-[#d6cdbf] bg-[#1a140f] border border-[#3d332a] px-3 py-1.5 rounded-md flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Resume</span>
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-mono text-[#D4A373] bg-[#D4A373]/10 border border-[#D4A373]/30 px-3.5 py-1.5 rounded-md"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
