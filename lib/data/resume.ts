import resumeDataRaw from "@/assets/resume.json";
import type { ResumeData } from "@/types/resume";

export const resumeData: ResumeData = resumeDataRaw as ResumeData;

export function getResume(): ResumeData {
  return resumeData;
}

export function getExperiences() {
  return resumeData.experience;
}

export function getEducations() {
  return resumeData.education;
}

export function getContactInfo() {
  return resumeData.contact;
}

export interface SkillCategory {
  id: string;
  name: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  skills: {
    name: string;
    highlight?: boolean;
    tag?: string;
  }[];
}

/**
 * Categorized skills strictly derived from source data (resume.json & project-detail.json)
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: {
      id: "Frontend & Web GIS",
      en: "Frontend & Web GIS",
    },
    description: {
      id: "Pengembangan antarmuka web interaktif, visualisasi spasial, dan pengelolaan state reaktif.",
      en: "Interactive web UI development, spatial visualization, and reactive state management.",
    },
    skills: [
      { name: "React.js", highlight: true },
      { name: "Next.js", highlight: true },
      { name: "TypeScript", highlight: true },
      { name: "Tailwind CSS", highlight: true },
      { name: "Redux Toolkit" },
      { name: "Zustand" },
      { name: "Chakra UI" },
      { name: "Leaflet (GIS)", highlight: true },
      { name: "MapLibre GL", highlight: true },
      { name: "Turf.js" },
    ],
  },
  {
    id: "backend",
    name: {
      id: "Backend & API Architecture",
      en: "Backend & API Architecture",
    },
    description: {
      id: "Desain RESTful API terdistribusi, validasi skema ketat, dan integrasi enterprise SSO.",
      en: "Distributed RESTful API design, strict schema validation, and enterprise SSO integration.",
    },
    skills: [
      { name: "Node.js", highlight: true },
      { name: "HonoJS", highlight: true },
      { name: "Laravel / PHP" },
      { name: "Zod Schema", highlight: true },
      { name: "Drizzle ORM", highlight: true },
      { name: "SSO Authentication", highlight: true },
      { name: "Midtrans Payment Gateway" },
      { name: "Puppeteer & ExcelJS" },
    ],
  },
  {
    id: "mobile",
    name: {
      id: "Mobile Development (Cross-Platform)",
      en: "Mobile Development (Cross-Platform)",
    },
    description: {
      id: "Aplikasi mobile offline-first dengan sinkronisasi otomatis, tracking GPS presisi tinggi, dan AI deteksi wajah.",
      en: "Offline-first mobile applications with automatic synchronization, high-precision GPS tracking, and AI face detection.",
    },
    skills: [
      { name: "Flutter", highlight: true },
      { name: "React Native", highlight: true },
      { name: "Android Native / Kotlin" },
      { name: "Riverpod / Bloc" },
      { name: "Offline Vector Tile & SQLite / Hive", highlight: true },
      { name: "Geolocator GPS Engine" },
      { name: "Camera & Image Compression" },
      { name: "Google Play Store Release", highlight: true },
    ],
  },
  {
    id: "database",
    name: {
      id: "Database, Caching & Queue",
      en: "Database, Caching & Queue",
    },
    description: {
      id: "Manajemen relasional dengan pengindeksan spasial dan pemrosesan antrean data skala besar.",
      en: "Relational database management with spatial indexing and high-throughput background queue processing.",
    },
    skills: [
      { name: "MySQL / Relational DB", highlight: true },
      { name: "Spatial Indexing" },
      { name: "Redis Caching", highlight: true },
      { name: "BullMQ Job Queue", highlight: true },
      { name: "Offline-to-Online Sync", highlight: true },
    ],
  },
  {
    id: "devops",
    name: {
      id: "Deployment & Infrastructure",
      en: "Deployment & Infrastructure",
    },
    description: {
      id: "Manajemen hosting server VPS, pipeline rilis Play Store, dan pemeliharaan aplikasi produksi.",
      en: "VPS server hosting management, Play Store release lifecycle, and production application maintenance.",
    },
    skills: [
      { name: "VPS Management (Cloudpanel)", highlight: true },
      { name: "Google Play Console" },
      { name: "Linux Server" },
      { name: "Monorepo Architecture" },
      { name: "Vercel Deployment" },
      { name: "Git & GitHub", highlight: true },
    ],
  },
];
