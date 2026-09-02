"use client";

import React from "react";
import { useI18n } from "@/context/i18n-context";
import { resumeData, getWhatsAppUrl } from "@/lib/data/resume";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiDownload,
  FiClock,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          number="05"
          badge={t.contact.badge}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Info Card */}
            <div className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-6 sm:p-8 space-y-6">
              <h3 className="font-display font-extrabold text-xl text-[var(--navy)] pb-3 border-b-2 border-[var(--navy)]">
                {t.contact.directContact}
              </h3>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-start gap-3 p-3 bg-[var(--surface-light)] border border-[var(--navy)]/20">
                  <FiMail className="w-4 h-4 text-[var(--green)] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[var(--navy)]/50 block text-[10px]">
                      EMAIL ADDRESS
                    </span>
                    <a
                      href={`mailto:${resumeData.contact.email}`}
                      className="font-bold text-[var(--navy)] hover:text-[var(--green)] underline"
                    >
                      {resumeData.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[var(--surface-light)] border border-[var(--navy)]/20">
                  <FiPhone className="w-4 h-4 text-[var(--green)] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[var(--navy)]/50 block text-[10px]">
                      PHONE / WHATSAPP
                    </span>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[var(--navy)] hover:text-[var(--green)]"
                    >
                      {resumeData.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[var(--surface-light)] border border-[var(--navy)]/20">
                  <FiMapPin className="w-4 h-4 text-[var(--green)] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[var(--navy)]/50 block text-[10px]">
                      {t.contact.location}
                    </span>
                    <span className="font-bold text-[var(--navy)]">
                      {t.contact.locationValue}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[var(--surface-light)] border border-[var(--navy)]/20">
                  <FiClock className="w-4 h-4 text-[var(--green)] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[var(--navy)]/50 block text-[10px]">
                      TIMEZONE / RESPONSE
                    </span>
                    <span className="font-bold text-[var(--navy)]">
                      UTC+7 (WIB) — 24h Response SLA
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <span className="font-mono text-[10px] font-bold text-[var(--navy)]/60 uppercase block mb-2">
                  {"//"} {t.contact.socialLinks}:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <Button
                    href={resumeData.contact.github}
                    external
                    variant="outline"
                    size="sm"
                    fullWidth
                    leftIcon={<FiGithub className="w-3.5 h-3.5" />}
                  >
                    GitHub
                  </Button>
                  <Button
                    href={resumeData.contact.linkedin}
                    external
                    variant="outline"
                    size="sm"
                    fullWidth
                    leftIcon={<FiLinkedin className="w-3.5 h-3.5" />}
                  >
                    LinkedIn
                  </Button>
                  <Button
                    href={resumeData.contact.instagram}
                    external
                    variant="outline"
                    size="sm"
                    fullWidth
                    leftIcon={<FiInstagram className="w-3.5 h-3.5" />}
                  >
                    Instagram
                  </Button>
                  <Button
                    href={getWhatsAppUrl()}
                    external
                    variant="outline"
                    size="sm"
                    fullWidth
                    leftIcon={<FaWhatsapp className="w-3.5 h-3.5" />}
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>

              {/* CV Download button */}
              <div className="pt-2 border-t border-[var(--navy)]/10">
                <Button
                  href="/cv/cv-wahyu-patriaji.pdf"
                  external
                  variant="gold"
                  size="md"
                  fullWidth
                  leftIcon={<FiDownload className="w-4 h-4" />}
                >
                  {t.hero.downloadCV}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
