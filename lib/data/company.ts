import companyRaw from "@/assets/company.json";
import type {
  CompanyProfile,
  LocalizedText,
  LocalizedTextList,
} from "@/types/company";
import type { Locale } from "@/types/project";

export const companyData = companyRaw as CompanyProfile;

/** Picks the active language out of a bilingual field, falling back to English. */
export function pick(value: LocalizedText, locale: Locale): string {
  return (locale === "id" ? value.id : value.en) || value.en;
}

export function pickList(value: LocalizedTextList, locale: Locale): string[] {
  return (locale === "id" ? value.id : value.en) || value.en;
}

export function getCompany(): CompanyProfile {
  return companyData;
}
