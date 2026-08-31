import projectDetailRaw from "@/assets/project-detail.json";
import type { ProjectDetail, ProjectMeta } from "@/types/project";

const rawProjects: ProjectDetail[] = projectDetailRaw as ProjectDetail[];

/**
 * Clean asset paths: if starts with "public/", strip it for web client url
 */
export function normalizeImagePath(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith("public/")) {
    return "/" + path.slice("public/".length);
  }
  if (path.startsWith("/")) {
    return path;
  }
  return "/" + path;
}

/**
 * Infer technology stack from the project features/description for filtering & badges
 */
function extractTechStack(project: ProjectDetail): string[] {
  const nerdFeatures = project.features?.nerd?.en?.join(" ") || "";
  const generalFeatures = project.features?.general?.en?.join(" ") || "";
  const allText = `${project.name} ${nerdFeatures} ${generalFeatures} ${project.description?.en || ""}`;

  const techKeywords: { [key: string]: RegExp } = {
    "Hono": /Hono/i,
    "TypeScript": /TypeScript/i,
    "React": /React/i,
    "Next.js": /Next\.js/i,
    "Flutter": /Flutter/i,
    "React Native": /React Native/i,
    "Drizzle ORM": /Drizzle/i,
    "MySQL": /MySQL/i,
    "Redis": /Redis/i,
    "BullMQ": /BullMQ/i,
    "MapLibre": /MapLibre/i,
    "Leaflet": /Leaflet/i,
    "Turf.js": /Turf/i,
    "SQLite / Hive": /SQLite|Hive/i,
    "Riverpod / Bloc": /Riverpod|Bloc/i,
    "Puppeteer": /Puppeteer/i,
    "Chakra UI": /Chakra/i,
    "SSO": /SSO|Single Sign-On/i,
    "GPS Engine": /GPS|Geolocator/i,
    "AI Face Detection": /Face Detection|Deteksi Wajah/i,
    "Zod": /Zod/i,
  };

  const detected: string[] = [];
  for (const [tech, regex] of Object.entries(techKeywords)) {
    if (regex.test(allText)) {
      detected.push(tech);
    }
  }

  // Fallback defaults based on type
  if (detected.length === 0) {
    if (project.id.includes("mobile")) {
      detected.push("Flutter", "Mobile Architecture");
    } else {
      detected.push("TypeScript", "Node.js");
    }
  }

  return detected;
}

function inferCategory(project: ProjectDetail): "web" | "mobile" | "system" {
  const idLower = project.id.toLowerCase();
  const nameLower = project.name.toLowerCase();
  if (idLower.includes("mobile") || nameLower.includes("mobile")) {
    return "mobile";
  }
  if (
    idLower.includes("sso") ||
    idLower.includes("botwave") ||
    idLower.includes("gateway")
  ) {
    return "system";
  }
  return "web";
}

export const allProjects: ProjectMeta[] = rawProjects.map((p) => ({
  ...p,
  slug: p.id,
  category: inferCategory(p),
  techStack: extractTechStack(p),
  thumbnail: normalizeImagePath(p.thumbnail),
  images: p.images.map((img) => normalizeImagePath(img) as string),
}));

export function getAllProjects(): ProjectMeta[] {
  return allProjects;
}

export function getProjectBySlug(slug: string): ProjectMeta | undefined {
  return allProjects.find((p) => p.slug === slug || p.id === slug);
}

export function getFeaturedProjects(): ProjectMeta[] {
  // Return projects with rich content or key highlights
  const featuredIds = [
    "03-cmp-tracker",
    "01-srs-docs",
    "02-agro-srs",
    "04-cmp-tracker-mobile",
    "05-sampletrack",
    "14-sso-srs",
  ];
  return allProjects.filter((p) => featuredIds.includes(p.id));
}

export function getAdjacentProjects(currentSlug: string): {
  prev: ProjectMeta | null;
  next: ProjectMeta | null;
} {
  const index = allProjects.findIndex((p) => p.slug === currentSlug || p.id === currentSlug);
  if (index === -1) {
    return { prev: null, next: null };
  }
  const prev = index > 0 ? allProjects[index - 1] : null;
  const next = index < allProjects.length - 1 ? allProjects[index + 1] : null;
  return { prev, next };
}
