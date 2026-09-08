import testimonialsDataRaw from "@/assets/testimonials.json";
import type { TestimonialItem } from "@/types/social-proof";

export const testimonialsData: TestimonialItem[] = testimonialsDataRaw as TestimonialItem[];

export function getTestimonials(): TestimonialItem[] {
  return testimonialsData;
}
