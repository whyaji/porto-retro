import type { Metadata } from "next";
import { getAllProjects } from "@/lib/data/projects";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Projects & Systems Catalogue",
  description:
    "Explore 16 production web GIS platforms, cross-platform mobile apps, and distributed backend systems designed and built by Wahyu Patriaji.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          number="01"
          badge="PORTFOLIO REPOSITORY"
          title="Project Catalog & Engineering Systems"
          subtitle="Explore 16 production systems spanning geospatial GIS platforms, offline-first mobile apps, and enterprise backends."
        />

        <ProjectFilter projects={projects} />
      </div>

      <div className="mt-16">
        <ContactCTA />
      </div>
    </div>
  );
}
