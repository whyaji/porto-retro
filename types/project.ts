export type Locale = "id" | "en";

export interface LocalizedString {
  id: string;
  en: string;
}

export interface LocalizedList {
  id: string[];
  en: string[];
}

export interface ProjectFeatures {
  general: LocalizedList;
  nerd: LocalizedList;
}

export interface ProjectDetail {
  id: string;
  name: string;
  link: string | null;
  thumbnail: string | null;
  images: string[];
  short_description: LocalizedString;
  description: LocalizedString;
  features: ProjectFeatures;
}

export type ProjectCategory = "all" | "web" | "mobile" | "system";

export interface ProjectMeta {
  id: string;
  slug: string;
  name: string;
  category: "web" | "mobile" | "system";
  techStack: string[];
  link: string | null;
  thumbnail: string | null;
  images: string[];
  short_description: LocalizedString;
  description: LocalizedString;
  features: ProjectFeatures;
}
