import domain1 from "./domain_1.json";
import domain2 from "./domain_2.json";
import domain3 from "./domain_3.json";
import domain4 from "./domain_4.json";
import domain5 from "./domain_5.json";
import domain6 from "./domain_6.json";
import domain7 from "./domain_7.json";
import domain8 from "./domain_8.json";
import domain9 from "./domain_9.json";
import domain10 from "./domain_10.json";
import domain11 from "./domain_11.json";
import domain12 from "./domain_12.json";
import domain13 from "./domain_13.json";
import v2Data from "./v2_questions.json";
import v3Data from "./v3_questions.json";
import v4Data from "./v4_questions.json";
import { Question } from "@/types/utbk-ukppu";

export const domain1Questions = domain1 as Question[];
export const domain2Questions = domain2 as Question[];
export const domain3Questions = domain3 as Question[];
export const domain4Questions = domain4 as Question[];
export const domain5Questions = domain5 as Question[];
export const domain6Questions = domain6 as Question[];
export const domain7Questions = domain7 as Question[];
export const domain8Questions = domain8 as Question[];
export const domain9Questions = domain9 as Question[];
export const domain10Questions = domain10 as Question[];
export const domain11Questions = domain11 as Question[];
export const domain12Questions = domain12 as Question[];
export const domain13Questions = domain13 as Question[];

const v1Questions: Question[] = [
  ...domain1Questions,
  ...domain2Questions,
  ...domain3Questions,
  ...domain4Questions,
  ...domain5Questions,
  ...domain6Questions,
  ...domain7Questions,
  ...domain8Questions,
  ...domain9Questions,
  ...domain10Questions,
  ...domain11Questions,
  ...domain12Questions,
  ...domain13Questions,
];

const v2Questions = v2Data as Question[];
const v3Questions = v3Data as Question[];
const v4Questions = v4Data as Question[];

/**
 * ─────────────────────────────────────────────────────────────────
 * QUESTION VERSION REGISTRY — Single source of truth
 *
 * To add a new version:
 *   1. Import the JSON file above (e.g. import v4Data from "./v4_questions.json")
 *   2. Cast it:   const v4Questions = v4Data as Question[]
 *   3. Add a new entry to QUESTION_VERSIONS below
 *   4. Done — everything else updates automatically
 * ─────────────────────────────────────────────────────────────────
 */
export interface QuestionVersionMeta {
  /** Unique version key stored in UserSession */
  id: string;
  /** Short label shown in badges and buttons, e.g. "V3" */
  label: string;
  /** Full human-readable name, e.g. "Paket V3 (Terbaru)" */
  name: string;
  /** Small badge text shown next to the name in the modal, e.g. "Terbaru" | "Arsip" | "Klasik" */
  badge: string;
  /** Whether the badge should use the accent (emerald) colour */
  isDefault?: boolean;
  /** One-line description shown in the version card */
  description: string;
  /** Sub-description / detail line */
  detail: string;
  /** The actual question array */
  questions: Question[];
}

export const QUESTION_VERSIONS: QuestionVersionMeta[] = [
  // ── add newest versions at the TOP of this array ──────────────
  {
    id: "v4",
    label: "V4",
    name: "Paket V4 (Terbaru)",
    badge: "Default",
    isDefault: true,
    description: "40 Soal HOTS • 5 Opsi (A–E) • Skenario Lebih Panjang & Dilematis",
    detail: "Fokus kuat pada Kode Etik HIMPSI & kisi-kisi UKPPU. Skenario narasi 150–300 kata.",
    questions: v4Questions,
  },
  {
    id: "v3",
    label: "V3",
    name: "Paket V3",
    badge: "Arsip",
    isDefault: false,
    description: "40 Soal HOTS • 5 Opsi (A–E) • Semua terlihat benar",
    detail: "Dilematis SJT versi sebelumnya. Bobot lebih banyak di Domain 4–10.",
    questions: v3Questions,
  },
  {
    id: "v2",
    label: "V2",
    name: "Paket V2",
    badge: "Arsip",
    isDefault: false,
    description: "40 Soal HOTS • 5 Opsi (A–E)",
    detail: "Skenario kasus panjang & SJT dilematis versi sebelumnya.",
    questions: v2Questions,
  },
  {
    id: "v1",
    label: "V1",
    name: "Paket V1 (Klasik)",
    badge: "Bank Arsip",
    isDefault: false,
    description: "610 Soal Lengkap • 4 Opsi (A–D)",
    detail: "Bank soal komprehensif mencakup 13 domain secara luas.",
    questions: v1Questions,
  },
];

/** The default/latest version id (first entry in QUESTION_VERSIONS with isDefault) */
export const LATEST_VERSION: string =
  QUESTION_VERSIONS.find((v) => v.isDefault)?.id ?? QUESTION_VERSIONS[0].id;

/** Returns the QuestionVersionMeta for a given id, or the default if not found */
export function getVersionMeta(id?: string): QuestionVersionMeta {
  return QUESTION_VERSIONS.find((v) => v.id === id) ?? QUESTION_VERSIONS[0];
}

/** Returns the questions for the given version id */
export function getQuestionsByVersion(id?: string): Question[] {
  return getVersionMeta(id).questions;
}

/** Returns the next version in the cycle (wraps around) */
export function getNextVersion(currentId?: string): QuestionVersionMeta {
  const idx = QUESTION_VERSIONS.findIndex((v) => v.id === currentId);
  const nextIdx = (idx + 1) % QUESTION_VERSIONS.length;
  return QUESTION_VERSIONS[nextIdx];
}

// Default exported allQuestions points to newest version
export const allQuestions: Question[] = getVersionMeta(LATEST_VERSION).questions;

// Map questions by unique indicator full ID e.g. "D1-1.1", "D2-1.2", etc.
export const questionsByIndicator: Record<string, Question[]> = {};

allQuestions.forEach((q) => {
  const fullId = q.indicatorFullId || `D${q.domainId}-${q.indicatorId}`;
  if (!questionsByIndicator[fullId]) {
    questionsByIndicator[fullId] = [];
  }
  questionsByIndicator[fullId].push(q);
});
