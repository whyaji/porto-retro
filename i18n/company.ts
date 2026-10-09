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
 * (regardless of mode) so the `t` object stays honest to its declared type.
 * Personal pages simply never read them.
 */
export interface CompanyOnlyTranslations {
  nav: {
    products: string;
    ai: string;
  };
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
  products: {
    badge: string;
    title: string;
    subtitle: string;
    viewAll: string;
    homeNote: string;
    statusLegendTitle: string;
    statusLive: string;
    statusInProgress: string;
    statusPlanned: string;
    statusLabel: string;
    problemLabel: string;
    usersLabel: string;
    featuresLabel: string;
    aiLabel: string;
    noAi: string;
    openProduct: string;
    workNote: string;
  };
  ai: {
    badge: string;
    title: string;
    subtitle: string;
    intro: string[];
    todayTitle: string;
    todayItems: string[];
    plannedTitle: string;
    plannedItems: string[];
    principlesTitle: string;
    principlesItems: string[];
    statusNote: string;
    disclaimer: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
    productsLink: string;
    aboutTitle: string;
    aboutBody: string;
  };
}

/** Personal dictionary ∪ company-only keys. */
export type Translations = BaseTranslations & CompanyOnlyTranslations;

/** Partial rewrites applied only when `NEXT_PUBLIC_SITE_MODE=company`. */
export type TranslationsOverride = DeepPartial<BaseTranslations>;

const enCompanyOnly: CompanyOnlyTranslations = {
  nav: {
    products: "Products",
    ai: "AI",
  },
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
  products: {
    badge: "PRODUCTS",
    title: "Our Own Products",
    subtitle:
      "Client systems live under Work. Our own products live here, each shown with its current development status.",
    viewAll: "See All Products",
    homeNote:
      "Alongside client work, we are building products of our own, and we add AI-powered features to them only where a language model is the right tool. See how we approach AI.",
    statusLegendTitle: "DEVELOPMENT STATUS",
    statusLive: "Live: runs in production today.",
    statusInProgress: "In development: being built, nothing shipped yet.",
    statusPlanned: "Planned: concept only, not built.",
    statusLabel: "STATUS",
    problemLabel: "PROBLEM IT SOLVES",
    usersLabel: "INTENDED USERS",
    featuresLabel: "CORE FUNCTIONALITY",
    aiLabel: "ROLE OF AI",
    noAi: "No AI in this product: it runs on ordinary code.",
    openProduct: "Open Product",
    workNote:
      "Client work is a separate track. The 16 systems we scoped and shipped for clients are listed under Work.",
  },
  ai: {
    badge: "AI",
    title: "How We Approach AI",
    subtitle:
      "What runs in production today, and the architecture we plan for AI-powered features.",
    intro: [
      "Patriaworks is building AI features for its own products, starting with document summarization and information extraction. This page separates two states on purpose: the engineering that already runs, and the AI work that is still planned.",
      "Nothing here claims a live AI product. The AI integration described below is a build plan, and this page gets updated when the first endpoint ships.",
    ],
    todayTitle: "In Production Today",
    todayItems: [
      "Zod schema validation on the client and on the server for every contact submission.",
      "A rate-limited, Turnstile-protected contact API, with structured logs that carry no credentials or message contents.",
      "Offline-first mobile capture with background sync, shipped in Android field apps.",
      "Face detection for attendance in CMP Tracker Mobile, released on Google Play.",
      "No large language model runs in any Patriaworks product today. That is the honest starting point.",
    ],
    plannedTitle: "Planned: AI Integration",
    plannedItems: [
      "Server-side calls to an AI provider API (e.g. Anthropic) from a Next.js route handler. The API key lives in an environment variable and is never bundled for the browser.",
      "Request validation with Zod, payload size limits, timeouts, retries with backoff, and a per-user rate limit on every AI endpoint.",
      "Structured outputs and tool use, so the model returns typed fields that a schema checks before anything is stored.",
      "Retrieval over the customer's own documents, with no document contents written to logs and no customer data used for model training.",
      "A review screen for consequential values, because a summary that gets a number wrong can cost more than the typing it saved.",
      "Token budgets and per-feature cost monitoring before launch, plus an evaluation set we run whenever a prompt changes.",
    ],
    principlesTitle: "Security, Privacy, and Reliability",
    principlesItems: [
      "We process only the fields a feature needs, and our logs stay free of document contents and secrets.",
      "SMTP, Turnstile, and future AI provider credentials stay in environment variables on the server, never in the browser bundle.",
      "A person reviews any output that feeds a real decision.",
      "Rate limits, timeouts, and API errors return a clear message and a retry path instead of a blank screen.",
    ],
    statusNote:
      "Status: not implemented yet. The environment variables, tests, and deployment steps for the first endpoint are documented in the repository before any AI endpoint goes live.",
    disclaimer:
      "Patriaworks is an independent company. Mentioning AI providers means we plan to use a public AI API. It is not a partnership, an affiliation, or an endorsement.",
    ctaTitle: "Have documents or workflows worth automating?",
    ctaText:
      "Send a brief describing the documents and the fields you need extracted. We will tell you plainly whether a language model is the right tool, and what it would cost to run.",
    ctaButton: "Send a Brief",
    productsLink: "See Our Products",
    aboutTitle: "Where This Is Going",
    aboutBody:
      "Two tracks run side by side. Client systems are the steady work, and on top of them we are building products of our own. The first AI direction is a document assistant that summarizes and extracts information with an AI API, aimed at research, certification, and operations teams. It has not launched. The AI page shows what runs today and what is still a plan.",
  },
};

const idCompanyOnly: CompanyOnlyTranslations = {
  nav: {
    products: "Produk",
    ai: "AI",
  },
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
  products: {
    badge: "PRODUK",
    title: "Produk Kami Sendiri",
    subtitle:
      "Sistem klien ada di halaman Karya. Produk kami sendiri ada di sini, masing-masing dengan status pengembangannya saat ini.",
    viewAll: "Lihat Semua Produk",
    homeNote:
      "Selain mengerjakan proyek klien, kami membangun produk kami sendiri, dan menambahkan fitur bertenaga AI hanya bila model bahasa memang alat yang tepat. Lihat cara kami mendekati AI.",
    statusLegendTitle: "STATUS PENGEMBANGAN",
    statusLive: "Live: berjalan di produksi hari ini.",
    statusInProgress: "Dikembangkan: sedang dibangun, belum ada yang dikirim.",
    statusPlanned: "Direncanakan: baru konsep, belum dibangun.",
    statusLabel: "STATUS",
    problemLabel: "MASALAH YANG DISELESAIKAN",
    usersLabel: "PENGGUNA YANG DITUJU",
    featuresLabel: "FUNGSI UTAMA",
    aiLabel: "PERAN AI",
    noAi: "Tanpa AI di produk ini: semuanya berjalan dengan kode biasa.",
    openProduct: "Buka Produk",
    workNote:
      "Pekerjaan klien jalur terpisah. 16 sistem yang kami petakan dan kirim untuk klien terdaftar di halaman Karya.",
  },
  ai: {
    badge: "AI",
    title: "Cara Kami Mendekati AI",
    subtitle:
      "Apa yang berjalan di produksi hari ini, dan arsitektur yang kami rencanakan untuk fitur bertenaga AI.",
    intro: [
      "Patriaworks sedang membangun fitur AI untuk produknya sendiri, dimulai dari ringkasan dokumen dan ekstraksi informasi. Halaman ini sengaja memisahkan dua keadaan: rekayasa yang sudah berjalan, dan pekerjaan AI yang masih berupa rencana.",
      "Tidak ada satu pun di halaman ini yang mengklaim produk AI yang sudah berjalan. Integrasi AI di bawah ini adalah rencana pembangunan, dan halaman ini diperbarui begitu endpoint pertama dikirim.",
    ],
    todayTitle: "Sudah Berjalan di Produksi",
    todayItems: [
      "Validasi skema Zod di sisi klien dan sisi server untuk setiap pengiriman formulir kontak.",
      "API kontak dengan rate limit dan perlindungan Turnstile, beserta log terstruktur yang tidak memuat kredensial atau isi pesan.",
      "Input data offline-first dengan sinkronisasi di latar belakang, sudah dikirim pada aplikasi lapangan Android.",
      "Deteksi wajah untuk absensi di CMP Tracker Mobile, sudah dirilis di Google Play.",
      "Belum ada model bahasa besar yang berjalan di produk Patriaworks mana pun. Itu titik awal yang jujur.",
    ],
    plannedTitle: "Rencana: Integrasi AI",
    plannedItems: [
      "Panggilan sisi server ke API penyedia AI (misalnya Anthropic) dari route handler Next.js. Kunci API disimpan di environment variable dan tidak pernah masuk ke bundel browser.",
      "Validasi request dengan Zod, batas ukuran payload, timeout, retry dengan backoff, dan rate limit per pengguna di setiap endpoint AI.",
      "Structured outputs dan tool use supaya model mengembalikan field bertipe yang diperiksa skema sebelum sesuatu disimpan.",
      "Retrieval atas dokumen milik pelanggan sendiri, tanpa isi dokumen masuk ke log dan tanpa data pelanggan dipakai untuk pelatihan model.",
      "Layar tinjau untuk nilai penting, karena ringkasan yang salah soal sebuah angka bisa lebih mahal daripada pekerjaan mengetik yang dihemat.",
      "Anggaran token dan pemantauan biaya per fitur sebelum rilis, serta satu set evaluasi yang dijalankan setiap kali prompt berubah.",
    ],
    principlesTitle: "Keamanan, Privasi, dan Keandalan",
    principlesItems: [
      "Kami hanya memproses field yang dibutuhkan sebuah fitur, dan log kami tetap bersih dari isi dokumen serta rahasia.",
      "SMTP, Turnstile, dan kredensial penyedia AI kelak tetap berada di environment variable di server, tidak pernah di bundel browser.",
      "Ada tinjauan manusia untuk setiap output yang dipakai mengambil keputusan nyata.",
      "Rate limit, timeout, dan error API mengembalikan pesan serta jalur coba ulang, bukan layar kosong.",
    ],
    statusNote:
      "Status: belum diimplementasikan. Environment variable, pengujian, dan langkah deployment untuk endpoint pertama didokumentasikan di repositori sebelum endpoint AI mana pun aktif.",
    disclaimer:
      "Patriaworks adalah perusahaan independen. Menyebut penyedia AI berarti kami berniat memakai API AI publik. Ini bukan kemitraan, afiliasi, atau endorsement.",
    ctaTitle: "Punya dokumen atau alur kerja yang layak diotomasi?",
    ctaText:
      "Kirim brief yang menjelaskan dokumennya dan field apa yang Anda butuhkan. Kami akan menjawab dengan jujur apakah model bahasa alat yang tepat, dan berapa biaya menjalankannya.",
    ctaButton: "Kirim Brief",
    productsLink: "Lihat Produk Kami",
    aboutTitle: "Ke Mana Arah Ini",
    aboutBody:
      "Dua jalur berjalan berdampingan. Sistem klien adalah pekerjaan yang tetap, dan di atasnya kami membangun produk kami sendiri. Arah AI pertama adalah asisten dokumen yang merangkum dan mengekstrak informasi dengan API AI, ditujukan untuk tim riset, sertifikasi, dan operasional. Arah ini belum diluncurkan. Halaman AI menunjukkan apa yang berjalan hari ini dan apa yang masih rencana.",
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
      "Patriaworks is a small software house led by Wahyu Patriaji. We take on geospatial platforms, offline-first field apps, and the internal tools that hold a business together, scoped, built, and shipped by the person who answered your first message. Alongside that client work we build products of our own, and we are adding AI-powered features to them where a language model genuinely helps.",
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
      "Underneath that is the unglamorous half of software: schema validation, background queues, deploy pipelines, query tuning, and documentation. It is the half that decides whether a system is still running two years from now.",
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
      "Systems we scoped, built, and shipped: the web platforms, the mobile apps, and the backends behind them.",
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
      "Tell us what the system has to do. You get a written scope and an estimate back. No discovery fee, no retainer required to talk.",
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
      "Patriaworks adalah software house kecil yang dipimpin Wahyu Patriaji. Kami menangani platform geospasial, aplikasi lapangan offline-first, dan alat internal yang menyatukan sebuah bisnis, dipetakan, dibangun, dan dikirim oleh orang yang membalas pesan pertama Anda. Selain pekerjaan klien itu, kami juga membangun produk kami sendiri, dan sedang menambahkan fitur bertenaga AI ke produk tersebut bila model bahasa memang membantu.",
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
      "Di balik itu ada bagian software yang tidak menarik: validasi skema, antrean latar belakang, pipeline deployment, optimalisasi query, dan dokumentasi. Bagian itulah yang menentukan apakah sebuah sistem masih berjalan dua tahun dari sekarang.",
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
      "Sistem yang kami petakan, bangun, dan kirim: platform web, aplikasi mobile, dan backend di baliknya.",
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
      "Ceritakan apa yang harus bisa dilakukan sistemnya. Anda akan menerima cakupan kerja dan estimasi tertulis. Tanpa biaya diskusi awal, tanpa retainer untuk sekadar berdiskusi.",
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
