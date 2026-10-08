import { enTranslations } from "@/i18n/en";
import { idTranslations } from "@/i18n/id";
import type { SiteMode } from "@/lib/site-mode";

type BaseTranslations = typeof enTranslations;

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends readonly unknown[]
    ? T[K]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

/**
 * Keys that only exist in company mode. They are merged into every dictionary
 * (regardless of mode) so the `t` object stays honest to its declared type —
 * personal pages simply never read them.
 */
export interface CompanyOnlyTranslations {
  services: {
    badge: string;
    title: string;
    subtitle: string;
  };
  engagements: {
    label: string;
    title: string;
  };
  projects: {
    viewAll: string;
  };
}

/** Personal dictionary ∪ company-only keys. */
export type Translations = BaseTranslations & CompanyOnlyTranslations;

/** Partial rewrites applied only when `NEXT_PUBLIC_SITE_MODE=company`. */
export type TranslationsOverride = DeepPartial<BaseTranslations>;

const enCompanyOnly: CompanyOnlyTranslations = {
  services: {
    badge: "SERVICES",
    title: "What We Do",
    subtitle:
      "Five ways the studio takes on work. Pick the one that matches the problem you are trying to solve.",
  },
  engagements: {
    label: "// WAYS TO ENGAGE",
    title: "Engagement Models",
  },
  projects: {
    viewAll: "View All Work",
  },
};

const idCompanyOnly: CompanyOnlyTranslations = {
  services: {
    badge: "LAYANAN",
    title: "Apa yang Kami Kerjakan",
    subtitle:
      "Lima cara studio ini menangani pekerjaan. Pilih yang paling cocok dengan masalah yang ingin Anda selesaikan.",
  },
  engagements: {
    label: "// CARA BEKERJA SAMA",
    title: "Model Kerja Sama",
  },
  projects: {
    viewAll: "Lihat Semua Karya",
  },
};

const enCompanyOverrides: TranslationsOverride = {
  nav: {
    experience: "Process",
    skills: "Capabilities",
    projects: "Work",
    downloadCV: "Start a Project",
    availableForWork: "Currently accepting projects",
  },
  hero: {
    badge: "Independent Software House",
    greeting: "Independent software house",
    tagline:
      "Web, mobile, and backend systems built around how your operation actually works.",
    subtagline:
      "Patriaworks is a small software house led by Wahyu Patriaji. We take on geospatial platforms, offline-first field apps, and the internal tools that hold a business together — scoped, built, and shipped by the person who answered your first message.",
    viewProjects: "See Our Work",
    contactMe: "Start a Project",
    downloadCV: "How We Work",
    statusBadge: "Taking on new projects",
  },
  about: {
    title: "About Patriaworks",
    subtitle: "Who we are, what we build, and how the studio is set up",
    summaryTitle: "The Studio",
    backgroundTitle: "What We're Good At",
    backgroundP1:
      "The work sits where geospatial data, field operations, and internal business systems meet: mapping and spatial analysis, offline-first mobile capture, single sign-on across internal tools, and the APIs connecting all of it.",
    backgroundP2:
      "Underneath that is the unglamorous half of software — schema validation, background queues, deploy pipelines, query tuning, and documentation. It is the half that decides whether a system is still running two years from now.",
  },
  experience: {
    title: "How We Work",
    subtitle:
      "A fixed path from the first call to long-term support, plus the ways you can engage the studio.",
  },
  skills: {
    title: "Capabilities",
    subtitle:
      "The stack we ship with, and the part of the problem each layer of it solves.",
  },
  projects: {
    title: "Selected Work",
    subtitle:
      "Systems we scoped, built, and shipped — the web platforms, the mobile apps, and the backends behind them.",
  },
  achievements: {
    title: "Shipped & Running",
    subtitle:
      "What is actually in production today, and the problem each of it was built to solve.",
  },
  trustedBy: {
    title: "Clients & Collaborations",
    subtitle:
      "Companies, institutions, and research groups whose operations run on our systems",
  },
  testimonials: {
    title: "Word From Partners",
    subtitle: "Feedback from the people we built alongside",
  },
  contact: {
    title: "Start a Project",
    subtitle:
      "Tell us what the system has to do. You get a written scope and an estimate back — no discovery fee, no retainer required to talk.",
    formTitle: "Send a Brief",
    subjectPlaceholder: "Project brief, retainer, or something else",
    submitBtn: "Send Brief",
    successMessage:
      "Brief received. We reply by email within one business day.",
    errorMessage:
      "Could not send the brief. Please try again, or email us directly.",
  },
};

const idCompanyOverrides: TranslationsOverride = {
  nav: {
    experience: "Proses",
    skills: "Kapabilitas",
    projects: "Karya",
    downloadCV: "Mulai Proyek",
    availableForWork: "Sedang menerima proyek",
  },
  hero: {
    badge: "Software House Independen",
    greeting: "Software house independen",
    tagline:
      "Sistem web, mobile, dan backend yang dibangun mengikuti cara kerja operasi Anda yang sebenarnya.",
    subtagline:
      "Patriaworks adalah software house kecil yang dipimpin Wahyu Patriaji. Kami menangani platform geospasial, aplikasi lapangan offline-first, dan alat internal yang menyatukan sebuah bisnis — dipetakan, dibangun, dan dikirim oleh orang yang membalas pesan pertama Anda.",
    viewProjects: "Lihat Karya Kami",
    contactMe: "Mulai Proyek",
    downloadCV: "Cara Kami Bekerja",
    statusBadge: "Sedang menerima proyek baru",
  },
  about: {
    title: "Tentang Patriaworks",
    subtitle: "Siapa kami, apa yang kami bangun, dan bagaimana studio ini dijalankan",
    summaryTitle: "Studio",
    backgroundTitle: "Yang Kami Kuasai",
    backgroundP1:
      "Pekerjaan kami berada di persimpangan data geospasial, operasi lapangan, dan sistem bisnis internal: pemetaan serta analisis spasial, input data mobile offline-first, single sign-on untuk alat internal, dan API yang menghubungkan semuanya.",
    backgroundP2:
      "Di balik itu ada bagian software yang tidak menarik — validasi skema, antrean latar belakang, pipeline deployment, optimalisasi query, dan dokumentasi. Bagian itulah yang menentukan apakah sebuah sistem masih berjalan dua tahun dari sekarang.",
  },
  experience: {
    title: "Cara Kami Bekerja",
    subtitle:
      "Alur tetap dari panggilan pertama sampai dukungan jangka panjang, plus cara Anda bisa bekerja bersama studio ini.",
  },
  skills: {
    title: "Kapabilitas",
    subtitle:
      "Teknologi yang kami pakai untuk mengirim, dan bagian masalah yang diselesaikan tiap lapisannya.",
  },
  projects: {
    title: "Karya Terpilih",
    subtitle:
      "Sistem yang kami petakan, bangun, dan kirim — platform web, aplikasi mobile, dan backend di baliknya.",
  },
  achievements: {
    title: "Sudah Dikirim & Berjalan",
    subtitle:
      "Apa yang benar-benar berjalan di produksi hari ini, dan masalah apa yang memang dibuat untuk menyelesaikannya.",
  },
  trustedBy: {
    title: "Klien & Kolaborasi",
    subtitle:
      "Perusahaan, institusi, dan kelompok riset yang operasinya berjalan di sistem kami",
  },
  testimonials: {
    title: "Kata Mitra",
    subtitle: "Masukan dari orang-orang yang membangun bersama kami",
  },
  contact: {
    title: "Mulai Proyek",
    subtitle:
      "Ceritakan apa yang harus bisa dilakukan sistemnya. Anda akan menerima cakupan kerja dan estimasi tertulis — tanpa biaya diskusi awal, tanpa retainer untuk sekadar berdiskusi.",
    formTitle: "Kirim Brief",
    subjectPlaceholder: "Brief proyek, retainer, atau hal lain",
    submitBtn: "Kirim Brief",
    successMessage:
      "Brief sudah kami terima. Kami akan membalas melalui email dalam satu hari kerja.",
    errorMessage:
      "Brief gagal terkirim. Silakan coba lagi, atau kirim langsung ke email kami.",
  },
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Recursive merge. Objects are merged key by key, arrays and scalars are
 * replaced, so a partial override never mutates the personal dictionary.
 */
function deepMerge<T>(base: T, patch: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(patch)) {
    return (patch === undefined ? base : patch) as T;
  }

  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    result[key] =
      key in base
        ? deepMerge((base as Record<string, unknown>)[key], value)
        : value;
  }
  return result as T;
}

/**
 * Builds the translation dictionary for the active site mode.
 * Company-only groups are always present; personal copy is only rewritten
 * when the site is running in company mode.
 */
export function resolveTranslations(
  mode: SiteMode,
  locale: "id" | "en"
): Translations {
  const base = locale === "id" ? idTranslations : enTranslations;
  const withOnly = deepMerge(base, locale === "id" ? idCompanyOnly : enCompanyOnly);

  if (mode !== "company") {
    return withOnly as Translations;
  }

  return deepMerge(
    withOnly,
    locale === "id" ? idCompanyOverrides : enCompanyOverrides
  ) as Translations;
}
