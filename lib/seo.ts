import type { Metadata } from "next";
import { getSiteIdentity } from "@/lib/data/site";
import { companyData } from "@/lib/data/company";
import { IS_COMPANY_MODE } from "@/lib/site-mode";
import type { ProjectMeta } from "@/types/project";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://patriaworks.my.id";

const PERSON = {
  siteName: "Wahyu Patriaji — PatriaWorks",
  authorName: "Wahyu Patriaji",
  title: "Wahyu Patriaji | Full-Stack Software Engineer",
  description:
    "Software Engineering Portfolio of Wahyu Patriaji (PatriaWorks). Full-Stack & Mobile Engineer building web, mobile, and distributed backend systems.",
  ogDescription:
    "Explore software systems, web GIS platforms, and cross-platform mobile apps engineered by Wahyu Patriaji.",
  twitterDescription:
    "Full-Stack & Mobile Software Engineer specializing in scalable web, backend, and cross-platform mobile apps.",
  keywords: [
    "Wahyu Patriaji",
    "PatriaWorks",
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
  ],
  ogAlt: "Wahyu Patriaji — Full-Stack & Mobile Software Engineer | PatriaWorks",
} as const;

const COMPANY = {
  siteName: "Patriaworks — Software House",
  authorName: "Patriaworks",
  title: "Patriaworks | Custom Web, Mobile & Backend Systems",
  description:
    "Patriaworks is an independent software house building web platforms, offline-first field apps, and backend systems for operations that have outgrown spreadsheets and off-the-shelf tools.",
  ogDescription:
    "Custom software from Patriaworks: web GIS platforms, offline-first field apps, SSO, and the backends that keep operations running.",
  twitterDescription:
    "Independent software house building custom web platforms, field mobile apps, and backend systems for real operations.",
  keywords: [
    "Patriaworks",
    "Software House Indonesia",
    "Custom Software Development",
    "Web GIS Development",
    "Mobile App Development",
    "Backend Development",
    "Node.js",
    "React",
    "Flutter",
    "Systems Integration",
    "Legacy Modernization",
    "Portfolio",
  ],
  ogAlt: "Patriaworks — Independent Software House | Custom Web & Mobile Systems",
} as const;

const ACTIVE = IS_COMPANY_MODE ? COMPANY : PERSON;

export const SITE_NAME = ACTIVE.siteName;
export const AUTHOR_NAME = ACTIVE.authorName;

export const DEFAULT_TITLE = ACTIVE.title;
export const DEFAULT_DESCRIPTION = ACTIVE.description;
export const OG_DESCRIPTION = ACTIVE.ogDescription;
export const TWITTER_DESCRIPTION = ACTIVE.twitterDescription;

export const SEO_KEYWORDS = ACTIVE.keywords;

export const OG_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: ACTIVE.ogAlt,
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

type PageCopy = {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
  images?: NonNullable<Metadata["openGraph"]>["images"];
};

/**
 * Resolves page metadata for the active site mode, so the personal resume and
 * the company site never ship each other's copy.
 */
export function pageMetadata(personal: PageCopy, company: PageCopy): Metadata {
  return createPageMetadata(IS_COMPANY_MODE ? company : personal);
}

function getSocialProfiles(): string[] {
  const { github, linkedin, instagram } = getSiteIdentity("en").contact;
  return [github, linkedin, instagram];
}

export function getPersonJsonLd() {
  const identity = getSiteIdentity("en");

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: identity.name,
    jobTitle: "Full-Stack & Mobile Software Engineer",
    description: DEFAULT_DESCRIPTION,
    image: absoluteUrl(OG_IMAGE.url),
    url: SITE_URL,
    email: identity.contact.email,
    telephone: identity.contact.phone,
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

export function getOrganizationJsonLd() {
  const identity = getSiteIdentity("en");

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: companyData.name,
    alternateName: "PatriaWorks",
    description: DEFAULT_DESCRIPTION,
    image: absoluteUrl(OG_IMAGE.url),
    url: SITE_URL,
    email: identity.contact.email,
    telephone: identity.contact.phone,
    founder: {
      "@type": "Person",
      name: companyData.founder,
      url: SITE_URL,
      sameAs: getSocialProfiles(),
    },
    areaServed: "Indonesia",
    sameAs: getSocialProfiles(),
    knowsAbout: [
      "Custom Web Development",
      "Web GIS",
      "Mobile Application Development",
      "Backend Development",
      "Systems Integration",
      "Single Sign-On",
      "Legacy Modernization",
    ],
  };
}

/** Structured data for the identity the site is currently speaking as. */
export function getPrimaryJsonLd() {
  return IS_COMPANY_MODE ? getOrganizationJsonLd() : getPersonJsonLd();
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: "PatriaWorks",
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: ["id-ID", "en-US"],
    publisher: {
      "@id": IS_COMPANY_MODE ? `${SITE_URL}/#organization` : `${SITE_URL}/#person`,
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
      "@type": IS_COMPANY_MODE ? "Organization" : "Person",
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    keywords: project.techStack.join(", "),
  };
}
