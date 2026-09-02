"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/context/i18n-context";
import { resumeData, getWhatsAppUrl } from "@/lib/data/resume";
import {
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiMail,
  FiPhone,
  FiArrowUp,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export const Footer: React.FC = () => {
  const { t } = useI18n();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[var(--navy)] text-[var(--surface)] border-t-4 border-[var(--gold)] mt-16">
      {/* Top Banner / Ticker */}
      <div className="border-b border-[var(--surface)]/20 py-3 px-4 sm:px-8 bg-[var(--navy-dark)] text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--gold)]"></span>
            <span className="text-[var(--gold)] font-bold">
              {t.footer.systemTag}
            </span>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-white/80 hover:text-[var(--gold)] transition-colors cursor-pointer text-xs font-mono font-bold"
          >
            <span>{t.footer.backToTop}</span>
            <FiArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[var(--gold)] text-[var(--navy)] border border-[var(--surface)] flex items-center justify-center font-mono font-black text-sm">
                WP
              </div>
              <span className="font-display font-black text-xl text-white tracking-tight">
                {resumeData.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed max-w-md">
              {resumeData.summary}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={resumeData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[var(--navy-light)] border border-[var(--surface)]/30 text-white hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors"
                aria-label="GitHub Profile"
              >
                <FiGithub className="w-4 h-4" />
              </a>
              <a
                href={resumeData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[var(--navy-light)] border border-[var(--surface)]/30 text-white hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <FiLinkedin className="w-4 h-4" />
              </a>
              <a
                href={resumeData.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[var(--navy-light)] border border-[var(--surface)]/30 text-white hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors"
                aria-label="Instagram Profile"
              >
                <FiInstagram className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[var(--navy-light)] border border-[var(--surface)]/30 text-white hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors"
                aria-label="Chat on WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${resumeData.contact.email}`}
                className="p-2 bg-[var(--navy-light)] border border-[var(--surface)]/30 text-white hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors"
                aria-label="Send Email"
              >
                <FiMail className="w-4 h-4" />
              </a>
              <a
                href={`tel:${resumeData.contact.phone}`}
                className="p-2 bg-[var(--navy-light)] border border-[var(--surface)]/30 text-white hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors"
                aria-label="Call Phone"
              >
                <FiPhone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-[var(--gold)] uppercase tracking-wider border-b border-[var(--surface)]/20 pb-1">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono text-white/80">
              <li>
                <Link
                  href="/"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  &gt; {t.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  &gt; {t.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href="/experience"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  &gt; {t.nav.experience}
                </Link>
              </li>
              <li>
                <Link
                  href="/skills"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  &gt; {t.nav.skills}
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  &gt; {t.nav.projects}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  &gt; {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-[var(--gold)] uppercase tracking-wider border-b border-[var(--surface)]/20 pb-1">
              Contact Specs
            </h4>
            <div className="space-y-2 text-xs font-mono text-white/80">
              <div>
                <span className="text-white/40 block text-[10px]">EMAIL</span>
                <a
                  href={`mailto:${resumeData.contact.email}`}
                  className="hover:text-[var(--gold)] underline transition-colors"
                >
                  {resumeData.contact.email}
                </a>
              </div>
              <div>
                <span className="text-white/40 block text-[10px]">
                  PHONE / WA
                </span>
                <a
                  href={`tel:${resumeData.contact.phone}`}
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  {resumeData.contact.phone}
                </a>
              </div>
              <div>
                <span className="text-white/40 block text-[10px]">
                  CURRENT ROLE
                </span>
                <span className="text-white">{resumeData.title}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--surface)]/20 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60">
          <div>
            © {new Date().getFullYear()} {resumeData.name}. {t.footer.rights}
          </div>
          <div>{t.footer.sourceCodeNote}</div>
        </div>
      </div>
    </footer>
  );
};
