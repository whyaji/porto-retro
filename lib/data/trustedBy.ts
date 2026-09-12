import trustedByDataRaw from "@/assets/trusted-by.json";
import type { TrustedByItem } from "@/types/social-proof";

export const trustedByData: TrustedByItem[] = trustedByDataRaw as TrustedByItem[];

export function getTrustedBy(): TrustedByItem[] {
  return trustedByData;
}
