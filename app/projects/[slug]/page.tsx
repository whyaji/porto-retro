import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllProjects,
  getProjectBySlug,
  getAdjacentProjects,
} from "@/lib/data/projects";
import { ProjectDetailClient } from "@/components/projects/ProjectDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = `${project.name} | Wahyu Patriaji`;
  const description =
    project.short_description?.en ||
    project.short_description?.id ||
    "Detailed system architecture and features.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: project.thumbnail ? [project.thumbnail] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <ProjectDetailClient
      project={project}
      prevProject={prev}
      nextProject={next}
    />
  );
}
