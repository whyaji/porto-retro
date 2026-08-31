"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectMeta } from "@/types/project";
import { useI18n } from "@/context/i18n-context";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  FiArrowLeft,
  FiArrowRight,
  FiExternalLink,
  FiCpu,
  FiCheckCircle,
  FiLayers,
  FiImage,
} from "react-icons/fi";

interface ProjectDetailClientProps {
  project: ProjectMeta;
  prevProject: ProjectMeta | null;
  nextProject: ProjectMeta | null;
}

export const ProjectDetailClient: React.FC<ProjectDetailClientProps> = ({
  project,
  prevProject,
  nextProject,
}) => {
  const { locale, t } = useI18n();

  const title = project.name;
  const shortDesc =
    project.short_description?.[locale] ||
    project.short_description?.en ||
    project.short_description?.id ||
    "";

  const fullDesc =
    project.description?.[locale] ||
    project.description?.en ||
    project.description?.id ||
    "";

  const generalFeatures =
    project.features?.general?.[locale] ||
    project.features?.general?.en ||
    project.features?.general?.id ||
    [];

  const nerdFeatures =
    project.features?.nerd?.[locale] ||
    project.features?.nerd?.en ||
    project.features?.nerd?.id ||
    [];

  return (
    <div className="w-full py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[var(--navy)] hover:text-[var(--green)] transition-colors px-3 py-1.5 bg-[var(--surface-light)] border border-[var(--navy)] retro-shadow-sm"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            <span>{t.projects.details.backToProjects}</span>
          </Link>
        </div>

        {/* Project Header Banner */}
        <div className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-6 sm:p-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-[var(--navy)]">
            <div className="flex items-center gap-2 font-mono text-xs">
              <Badge variant="navy" size="md">
                SYS_ID: {project.id}
              </Badge>
              <Badge variant="gold" size="md">
                {project.category.toUpperCase()}
              </Badge>
            </div>

            {project.link && (
              <Button
                href={project.link}
                external
                variant="secondary"
                size="sm"
                rightIcon={<FiExternalLink className="w-3.5 h-3.5" />}
              >
                {t.projects.details.liveDemo}
              </Button>
            )}
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-display text-[var(--navy)] tracking-tight">
              {title}
            </h1>
            <p className="text-base sm:text-lg text-[var(--green)] font-mono font-semibold">
              {shortDesc}
            </p>
          </div>

          <div className="border-t border-[var(--navy)]/10 pt-4">
            <span className="font-mono text-xs font-bold text-[var(--navy)] uppercase tracking-wider block mb-2">
              {"//"} {t.projects.details.technologiesTitle}:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="surface" size="md" className="font-bold">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content: Overview & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Descriptions & General Features */}
          <div className="lg:col-span-7 space-y-8">
            {/* Overview */}
            <div className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b-2 border-[var(--navy)]">
                <FiLayers className="w-5 h-5 text-[var(--green)]" />
                <h2 className="font-display font-extrabold text-xl text-[var(--navy)]">
                  {t.projects.details.overviewTitle}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[var(--navy)]/90 font-sans leading-relaxed">
                {fullDesc}
              </p>
            </div>

            {/* General Features */}
            {generalFeatures.length > 0 && (
              <div className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b-2 border-[var(--navy)]">
                  <FiCheckCircle className="w-5 h-5 text-[var(--green)]" />
                  <h2 className="font-display font-extrabold text-xl text-[var(--navy)]">
                    {t.projects.details.featuresGeneralTitle}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {generalFeatures.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-[var(--navy)]/90 font-sans leading-relaxed"
                    >
                      <span className="w-5 h-5 bg-[var(--green-muted)] text-[var(--green)] border border-[var(--green)] flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Nerd Architecture Features */}
          <div className="lg:col-span-5 space-y-8">
            {nerdFeatures.length > 0 && (
              <div className="bg-[var(--navy-dark)] text-[var(--surface)] border-2 border-[var(--navy)] retro-shadow-lg p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b-2 border-[var(--gold)]">
                  <FiCpu className="w-5 h-5 text-[var(--gold)]" />
                  <h2 className="font-display font-extrabold text-lg sm:text-xl text-white">
                    {t.projects.details.featuresNerdTitle}
                  </h2>
                </div>
                <p className="text-xs font-mono text-[var(--gold)]">
                  {"// DEEP_TECH_SPECS & INTEGRATION"}
                </p>
                <ul className="space-y-3">
                  {nerdFeatures.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm font-mono text-white/90 leading-relaxed bg-[var(--navy)] p-2.5 border border-white/15"
                    >
                      <span className="text-[var(--gold)] font-bold shrink-0">&gt;</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Gallery / Screenshots (if images exist) */}
        {project.images && project.images.length > 0 && (
          <div className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b-2 border-[var(--navy)]">
              <FiImage className="w-5 h-5 text-[var(--green)]" />
              <h2 className="font-display font-extrabold text-xl text-[var(--navy)]">
                {t.projects.details.galleryTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-full h-64 sm:h-80 border-2 border-[var(--navy)] overflow-hidden bg-[var(--navy-dark)]"
                >
                  <Image
                    src={img}
                    alt={`${project.name} preview ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Pagination Navigation */}
        <div className="border-t-2 border-[var(--navy)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-2 p-3 bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow-sm hover:bg-[var(--surface-light)] transition-colors font-bold text-[var(--navy)]"
            >
              <FiArrowLeft className="w-4 h-4" />
              <div className="text-left">
                <span className="text-[10px] text-[var(--navy)]/50 block">PREVIOUS</span>
                <span className="truncate max-w-[200px] block">{prevProject.name}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-end gap-2 p-3 bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow-sm hover:bg-[var(--surface-light)] transition-colors font-bold text-[var(--navy)]"
            >
              <div className="text-right">
                <span className="text-[10px] text-[var(--navy)]/50 block">NEXT</span>
                <span className="truncate max-w-[200px] block">{nextProject.name}</span>
              </div>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};
