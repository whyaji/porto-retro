import type { ContactInfo } from "@/types/resume";

export interface LocalizedText {
  id: string;
  en: string;
}

export interface LocalizedTextList {
  id: string[];
  en: string[];
}

export interface CompanyStat {
  /** Icon key, resolved to a react-icons glyph in the hero. */
  id: string;
  overline: LocalizedText;
  value: LocalizedText;
  caption: LocalizedText;
}

export interface CardRow {
  label: LocalizedText;
  value: LocalizedText;
}

export interface CardMetric {
  value: string;
  label: LocalizedText;
}

export interface CompanyProfileCard {
  label: LocalizedText;
  rows: CardRow[];
  focusLabel: LocalizedText;
  focus: string[];
  metricsLabel: LocalizedText;
  metrics: CardMetric[];
}

export interface ServiceItem {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  points: LocalizedTextList;
}

export interface ProcessStep {
  id: string;
  step: string;
  title: LocalizedText;
  description: LocalizedText;
  deliverable: LocalizedText;
}

export interface EngagementModel {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  points: LocalizedTextList;
}

export interface DeliveryProof {
  id: string;
  label: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  tag: LocalizedText;
}

export interface CompanyProfile {
  name: string;
  initials: string;
  /** Short positioning line used where the personal site shows a job title. */
  role: LocalizedText;
  location: LocalizedText;
  /** Long studio blurb (footer, about sidebar). */
  summary: LocalizedText;
  /** About page opening paragraphs. */
  intro: LocalizedTextList;
  founder: string;
  contact: ContactInfo;
  ticker: LocalizedTextList;
  stats: CompanyStat[];
  card: CompanyProfileCard;
  services: ServiceItem[];
  process: ProcessStep[];
  engagements: EngagementModel[];
  proofs: DeliveryProof[];
}
