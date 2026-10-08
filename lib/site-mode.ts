export type SiteMode = "personal" | "company";

/**
 * Resolves the active site mode from `NEXT_PUBLIC_SITE_MODE`.
 *
 * The `NEXT_PUBLIC_` prefix matters: resume/company data is imported into
 * `"use client"` components, so the value is inlined into the browser bundle
 * at build time. Unknown or missing values fall back to "personal" so a typo
 * can never take the site down.
 */
const rawMode = process.env.NEXT_PUBLIC_SITE_MODE;

export const SITE_MODE: SiteMode = rawMode === "company" ? "company" : "personal";

export const IS_COMPANY_MODE = SITE_MODE === "company";

export const IS_PERSONAL_MODE = !IS_COMPANY_MODE;
