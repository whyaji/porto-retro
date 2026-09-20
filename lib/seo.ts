import type { Metadata } from "next";
import { resumeData } from "@/lib/data/resume";
import type { ProjectMeta } from "@/types/project";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://patrialabs.vercel.app";

export const SITE_NAME = "Wahyu Patriaji — PatriaLabs";
export const AUTHOR_NAME = "Wahyu Patriaji";

export const DEFAULT_TITLE =
  "Wahyu Patriaji | Full-Stack & Mobile Software Engineer | PatriaLabs";

export const DEFAULT_DESCRIPTION =
  "Software Engineering Portfolio of Wahyu Patriaji (PatriaLabs). Full-Stack & Mobile Engineer building web, mobile, and distributed backend systems.";

export const SEO_KEYWORDS = [
  "Wahyu Patriaji",
  "PatriaLabs",
  "Software Engineer",
  "Full-Stack Developer",
  "Mobile Developer",
  "React",
  "Next.js",
  "Flutter",
  "React Native",
  "Hono",
  "Node.js",
  "Indonesia Programmer",
  "Portfolio",
  "Resume",
] as const;

export const OG_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Wahyu Patriaji — Full-Stack & Mobile Software Engineer | PatriaLabs",
} as const;

/** Optional — only needed for Facebook Login, Insights, or SDK features */
export const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;

export function getFacebookMeta(): Record<string, string> | undefined {
  if (!FB_APP_ID) return undefined;
  return { "fb:app_id": FB_APP_ID };
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
  images?: NonNullable<Metadata["openGraph"]>["images"];
};

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  ogType = "website",
  images,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const resolvedImages = images ?? [OG_IMAGE];
  const ogTitle = title.includes(AUTHOR_NAME)
    ? title
    : `${title} | ${AUTHOR_NAME}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      type: ogType,
      siteName: SITE_NAME,
      locale: "id_ID",
      alternateLocale: ["en_US"],
      images: resolvedImages,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: resolvedImages,
    },
    other: getFacebookMeta(),
  };
}

function getSocialProfiles(): string[] {
  const { github, linkedin, instagram } = resumeData.contact;
  return [github, linkedin, instagram];
}

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: AUTHOR_NAME,
    jobTitle: "Full-Stack & Mobile Software Engineer",
    description: DEFAULT_DESCRIPTION,
    image: absoluteUrl(OG_IMAGE.url),
    url: SITE_URL,
    email: resumeData.contact.email,
    telephone: resumeData.contact.phone,
    worksFor: {
      "@type": "Organization",
      name: "PT Sawit Sumbermas Sarana, Tbk.",
    },
    sameAs: getSocialProfiles(),
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "University Of Muhammadiyah Malang",
      },
      {
        "@type": "EducationalOrganization",
        name: "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
      },
    ],
    knowsAbout: [
      "TypeScript",
      "React.js",
      "Next.js",
      "Flutter",
      "React Native",
      "Node.js",
      "Hono",
      "Geospatial GIS",
      "Redis",
      "MySQL",
      "Drizzle ORM",
    ],
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: "PatriaLabs",
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: ["id-ID", "en-US"],
    publisher: {
      "@id": `${SITE_URL}/#person`,
    },
  };
}

export function getProjectJsonLd(project: ProjectMeta) {
  const description =
    project.short_description.en || project.short_description.id;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description,
    url: absoluteUrl(`/projects/${project.slug}`),
    image: project.thumbnail
      ? absoluteUrl(project.thumbnail)
      : absoluteUrl(OG_IMAGE.url),
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web, Android, iOS",
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    keywords: project.techStack.join(", "),
  };
}
