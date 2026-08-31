"use client";

import React, { useState, useMemo } from "react";
import type { ProjectMeta, ProjectCategory } from "@/types/project";
import { useI18n } from "@/context/i18n-context";
import { ProjectCard } from "./ProjectCard";
import { FiSearch, FiFilter } from "react-icons/fi";

interface ProjectFilterProps {
  projects: ProjectMeta[];
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({ projects }) => {
  const { t, locale } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: "all", label: t.projects.filterAll },
    { id: "web", label: t.projects.filterWeb },
    { id: "mobile", label: t.projects.filterMobile },
    { id: "system", label: t.projects.filterSystem },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category check
      if (selectedCategory !== "all" && project.category !== selectedCategory) {
        return false;
      }

      // Search query check
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const nameMatch = project.name.toLowerCase().includes(q);
      const idMatch = project.id.toLowerCase().includes(q);
      const techMatch = project.techStack.some((tech) =>
        tech.toLowerCase().includes(q)
      );
      const descMatch = (
        project.short_description?.[locale] ||
        project.short_description?.en ||
        ""
      )
        .toLowerCase()
        .includes(q);

      return nameMatch || idMatch || techMatch || descMatch;
    });
  }, [projects, selectedCategory, searchQuery, locale]);

  return (
    <div className="space-y-8">
      {/* Filter and Search Bar Controls */}
      <div className="bg-[var(--card)] p-4 sm:p-5 border-2 border-[var(--navy)] retro-shadow space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4">
        {/* Category Tabs */}
        <div
          className="flex flex-wrap items-center gap-1.5 font-mono text-xs"
          role="tablist"
          aria-label="Project categories"
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 font-bold border-2 border-[var(--navy)] transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[var(--navy)] text-[var(--surface)] retro-shadow-sm"
                    : "bg-[var(--surface-light)] text-[var(--navy)] hover:bg-[var(--surface)]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--navy)]/50">
            <FiSearch className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.projects.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 bg-[var(--surface-light)] border-2 border-[var(--navy)] text-xs sm:text-sm font-mono text-[var(--navy)] placeholder-[var(--navy)]/40 focus:bg-white focus:outline-none"
            aria-label="Search projects"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs font-mono text-[var(--navy)]/50 hover:text-[var(--navy)] cursor-pointer"
            >
              CLEAR
            </button>
          )}
        </div>
      </div>

      {/* Results Count & Active Status */}
      <div className="flex items-center justify-between text-xs font-mono text-[var(--navy)]/70 px-1">
        <div className="flex items-center gap-2">
          <FiFilter className="w-3.5 h-3.5 text-[var(--green)]" />
          <span>
            SHOWING <strong className="text-[var(--navy)]">{filteredProjects.length}</strong> OF{" "}
            <strong>{projects.length}</strong> PROJECTS
          </span>
        </div>
      </div>

      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="bg-[var(--card)] border-2 border-dashed border-[var(--navy)] p-12 text-center space-y-3">
          <p className="font-mono text-sm text-[var(--navy)]/80">
            {t.projects.noProjectsFound}
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="text-xs font-mono font-bold text-[var(--green)] underline cursor-pointer"
          >
            RESET ALL FILTERS
          </button>
        </div>
      )}
    </div>
  );
};
