import React from "react";
import { profileData } from "@/data/profile";
import { Terminal, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export const Footer = () => {
  return (
    <footer className="border-t border-[#2e251e] bg-[#12100e] py-10 text-[#a89b8a] font-mono text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Identity */}
        <div className="flex items-center gap-2 text-white font-semibold">
          <Terminal className="w-4 h-4 text-[#D4A373]" />
          <span>{profileData.name} — {profileData.role}</span>
        </div>

        {/* Right Socials & Back to Top */}
        <div className="flex items-center gap-4">
          <a
            href={profileData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D4A373] transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={profileData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D4A373] transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="p-2 rounded-lg bg-[#1a140f] border border-[#382d24] hover:border-[#D4A373]/50 hover:text-white transition-all ml-2"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#D4A373]" />
          </a>
        </div>

      </div>
    </footer>
  );
};
