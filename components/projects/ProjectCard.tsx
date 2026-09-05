"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectMeta } from "@/types/project";
import { useI18n } from "@/context/i18n-context";
import { Badge } from "@/components/ui/Badge";
import { FiExternalLink, FiArrowRight, FiLayers, FiImage } from "react-icons/fi";

interface ProjectCardProps {
  project: ProjectMeta;
  featured?: boolean;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  featured = false,
  className = "",
}) => {
  const { locale, t } = useI18n();

  const shortDesc =
    project.short_description?.[locale] ||
    project.short_description?.en ||
    project.short_description?.id ||
    "";

  const categoryLabel = {
    web: "Web & GIS",
    mobile: "Mobile App",
    system: "System / API",
  }[project.category];

  return (
    <article
      className={`group bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow transition-all duration-200 flex flex-col justify-between overflow-hidden hover:-translate-y-1 hover:retro-shadow-lg ${
        featured ? "md:col-span-2 lg:col-span-2" : ""
      } ${className}`}
    >
      <div>
        {/* Card Header Bar */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--navy)] text-[var(--surface)] border-b-2 border-[var(--navy)] text-xs font-mono">
          <div className="flex items-center gap-2 truncate">
            <span className="text-[var(--gold)] font-bold">{"//"} {project.id}</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80 uppercase text-[10px] tracking-wider">
              {categoryLabel}
            </span>
          </div>
          {project.link && (
            <span className="flex items-center gap-1 text-[10px] text-[#27c93f] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f] inline-block animate-pulse"></span>
              LIVE
            </span>
          )}
        </div>

        {/* Thumbnail (16:9 ratio) */}
        {project.thumbnail ? (
          <div className="relative w-full aspect-video bg-[var(--navy-dark)] overflow-hidden border-b-2 border-[var(--navy)]">
            <Image
              src={project.thumbnail}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/80 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
            {project.images && project.images.length > 1 && (
              <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-[var(--navy)]/90 backdrop-blur-xs text-[var(--gold)] border border-[var(--navy)] text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-sm">
                <FiImage className="w-3 h-3 text-[var(--green)]" />
                <span>{project.images.length} SHOTS</span>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full aspect-video bg-[var(--surface-light)] border-b-2 border-[var(--navy)] flex items-center justify-center p-4">
            <div className="flex items-center gap-2 text-[var(--navy)]/40 font-mono text-xs">
              <FiLayers className="w-4 h-4" />
              <span>ENTERPRISE ARCHITECTURE // PROPRIETARY</span>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-6">
          <div className="mb-3">
            <Link
              href={`/projects/${project.slug}`}
              className="block group-hover:text-[var(--green)] transition-colors focus:outline-none"
            >
              <h3 className="text-lg sm:text-xl font-extrabold text-[var(--navy)] font-display tracking-tight leading-snug">
                {project.name}
              </h3>
            </Link>
            <p className="mt-2 text-xs sm:text-sm text-[var(--navy)]/80 font-sans leading-relaxed line-clamp-2">
              {shortDesc}
            </p>
          </div>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.techStack.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="surface" size="sm">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 5 && (
              <Badge variant="outline" size="sm">
                +{project.techStack.length - 5}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-5 sm:p-6 pt-0 mt-auto flex items-center justify-between gap-3 border-t border-[var(--navy)]/10">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--navy)] hover:text-[var(--green)] transition-colors group-hover:translate-x-0.5"
        >
          <span>{t.projects.viewDetail}</span>
          <FiArrowRight className="w-3.5 h-3.5" />
        </Link>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[var(--green)] hover:underline"
            aria-label={`Visit live site for ${project.name}`}
          >
            <span>{t.projects.visitLive}</span>
            <FiExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </article>
  );
};
