import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllProjects,
  getProjectBySlug,
  getAdjacentProjects,
} from "@/lib/data/projects";
import { ProjectDetailClient } from "@/components/projects/ProjectDetailClient";
import {
  absoluteUrl,
  createPageMetadata,
  getProjectJsonLd,
  OG_IMAGE,
} from "@/lib/seo";

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

  const description =
    project.short_description?.en ||
    project.short_description?.id ||
    "Detailed system architecture and features.";

  const images = project.thumbnail
    ? [{ url: absoluteUrl(project.thumbnail), alt: project.name }]
    : [OG_IMAGE];

  return createPageMetadata({
    title: project.name,
    description,
    path: `/projects/${slug}`,
    ogType: "article",
    images,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(slug);
  const projectJsonLd = getProjectJsonLd(project);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <ProjectDetailClient
        project={project}
        prevProject={prev}
        nextProject={next}
      />
    </>
  );
}
