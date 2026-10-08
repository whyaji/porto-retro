import type { Metadata } from "next";
import { getAllProjects } from "@/lib/data/projects";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { ProjectsPageHeader } from "@/components/projects/ProjectsPageHeader";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  {
    title: "Projects & Systems Catalogue",
    description:
      "Explore 16 production web GIS platforms, cross-platform mobile apps, and distributed backend systems designed and built by Wahyu Patriaji.",
    path: "/projects",
  },
  {
    title: "Selected Work",
    description:
      "Systems built by Patriaworks: web GIS platforms, offline-first field apps, SSO services, and backend systems running in production.",
    path: "/projects",
  }
);

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ProjectsPageHeader />

        <ProjectFilter projects={projects} />
      </div>

      <div className="mt-16">
        <ContactCTA />
      </div>
    </div>
  );
}
