import type { LocalizedText, LocalizedTextList } from "@/types/company";

/**
 * Development status of a product. The website must show this honestly:
 * `live` means it runs in production today, `in-development` means work has
 * started but nothing ships yet, `planned` means concept only.
 */
export type ProductStatus = "live" | "in-development" | "planned";

export interface ProductEntry {
  /** Stable id used as React key and anchor. */
  id: string;
  /** Product name. Descriptive names only, never a branded name we do not own. */
  name: LocalizedText;
  /** One line: what the product does. */
  tagline: LocalizedText;
  /** The user problem the product addresses. */
  problem: LocalizedText;
  /** Intended users, phrased as an audience, never as claimed customers. */
  users: LocalizedText;
  /** Core functionality. */
  features: LocalizedTextList;
  status: ProductStatus;
  /** Honest status note: where it runs, or what is still missing. */
  statusNote: LocalizedText;
  /** How AI is used. `null` when the product has no AI component. */
  aiRole: LocalizedText | null;
  /** Demo or product link. `null` when no link exists yet. */
  link: string | null;
  /** Technology involved. Planned stacks are prefixed with "Planned:". */
  tech: string[];
}
