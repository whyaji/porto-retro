import { IS_COMPANY_MODE } from "@/lib/site-mode";
import { companyData, pick } from "@/lib/data/company";
import { rawResumeData } from "@/lib/data/resume";
import type { ContactInfo } from "@/types/resume";
import type { Locale } from "@/types/project";

export interface SiteIdentity {
  /** Display name of whoever the site is speaking as. */
  name: string;
  initials: string;
  /** One-line positioning: a job title in personal mode, the studio line in company mode. */
  role: string;
  summary: string;
  contact: ContactInfo;
}

const PERSONAL_INITIALS = "WP";

/**
 * Mode-aware identity used everywhere the site introduces itself: hero,
 * navbar, footer, contact page, and SEO/JSON-LD.
 */
export function getSiteIdentity(locale: Locale = "en"): SiteIdentity {
  if (IS_COMPANY_MODE) {
    return {
      name: companyData.name,
      initials: companyData.initials,
      role: pick(companyData.role, locale),
      summary: pick(companyData.summary, locale),
      contact: companyData.contact,
    };
  }

  const resume = rawResumeData[locale] || rawResumeData.en;
  return {
    name: resume.name,
    initials: PERSONAL_INITIALS,
    role: resume.title,
    summary: resume.summary,
    contact: resume.contact,
  };
}
