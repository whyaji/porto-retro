"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/context/i18n-context";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { Button } from "@/components/ui/Button";
import { FiMenu, FiX, FiDownload, FiTerminal } from "react-icons/fi";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  if (pathname.startsWith("/utbk-ukppu") || pathname.startsWith("/app/utbk-ukppu")) {
    return null;
  }


  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/experience", label: t.nav.experience },
    { href: "/skills", label: t.nav.skills },
    { href: "/projects", label: t.nav.projects },
    { href: "/contact", label: t.nav.contact },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[var(--surface)]/95 backdrop-blur-md border-b-2 border-[var(--navy)] shadow-lg"
          : "bg-[var(--surface)] border-b-2 border-[var(--navy)]"
      }`}
    >
      {/* Top Microbar */}
      <div className="hidden md:flex items-center justify-between px-4 lg:px-8 py-1.5 bg-[var(--navy)] text-[var(--surface)] text-[11px] font-mono border-b border-[var(--surface)]/20">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#27c93f] inline-block animate-pulse"></span>
            <span className="text-[var(--gold)] font-bold tracking-wider">PATRIALABS</span>
          </span>
          <span className="text-white/30">|</span>
          <span className="text-white/90">{t.nav.availableForWork}</span>
        </div>
        <div className="flex items-center gap-2 text-white/70">
          <span>Wahyu Patriaji</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none"
          aria-label="Wahyu Patriaji — PatriaLabs Homepage"
        >
          <div className="w-9 h-9 bg-[var(--navy)] text-[var(--gold)] border-2 border-[var(--navy)] flex items-center justify-center font-mono font-black text-base retro-shadow-sm group-hover:bg-[var(--navy-light)] transition-all">
            <FiTerminal className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-lg sm:text-xl text-[var(--navy)] tracking-tight leading-none group-hover:text-[var(--green)] transition-colors">
              WAHYU PATRIAJI
            </span>
            <span className="font-mono text-[10px] font-bold text-[var(--green)] tracking-wider uppercase mt-0.5">
              Full-Stack & Mobile Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1 lg:gap-2"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-xs lg:text-sm font-bold font-mono transition-colors ${
                  active
                    ? "bg-[var(--navy)] text-[var(--surface)] border border-[var(--navy)] retro-shadow-sm"
                    : "text-[var(--navy)] hover:bg-[var(--surface-dark)] hover:text-[var(--navy)] border border-transparent"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions (Language Toggle & CV Download) */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle />
          <Button
            href="/cv/cv-wahyu-patriaji.pdf"
            external
            variant="gold"
            size="sm"
            leftIcon={<FiDownload className="w-3.5 h-3.5" />}
          >
            {t.nav.downloadCV}
          </Button>
        </div>

        {/* Mobile Menu Toggle & Language */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 border-2 border-[var(--navy)] bg-[var(--surface-light)] text-[var(--navy)] retro-shadow-sm focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-[var(--navy)] bg-[var(--surface)] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200 shadow-xl">
          <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 text-sm font-bold font-mono border-2 border-[var(--navy)] ${
                    active
                      ? "bg-[var(--navy)] text-[var(--surface)] retro-shadow-sm"
                      : "bg-[var(--surface-light)] text-[var(--navy)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-2">
            <Button
              href="/cv/cv-wahyu-patriaji.pdf"
              external
              variant="gold"
              size="md"
              fullWidth
              leftIcon={<FiDownload className="w-4 h-4" />}
            >
              {t.nav.downloadCV}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
