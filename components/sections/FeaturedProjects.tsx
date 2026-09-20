"use client";

import React from "react";
import { useI18n } from "@/context/i18n-context";
import { getFeaturedProjects } from "@/lib/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";

export const FeaturedProjects: React.FC = () => {
  const { t } = useI18n();
  const featured = getFeaturedProjects();

  return (
    <section className="w-full py-16 md:py-24 border-b-2 border-[var(--navy)] bg-[var(--surface-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <SectionHeader
            number="01"
            title={t.projects.title}
            subtitle={t.projects.subtitle}
            className="mb-0 md:mb-0"
          />
          <Button
            href="/projects"
            variant="outline"
            size="md"
            rightIcon={<FiArrowRight className="w-4 h-4" />}
          >
            {t.nav.projects} (16 Total)
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured={idx === 0}
              className={idx === 7 ? "hidden lg:block" : ""}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            href="/projects"
            variant="primary"
            size="lg"
            rightIcon={<FiArrowRight className="w-4 h-4" />}
          >
            Explore Complete Project Catalog
          </Button>
        </div>
      </div>
    </section>
  );
};
