import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  {
    title: "About",
    description:
      "Learn about Wahyu Patriaji: background, engineering focus, education, and professional achievements as a Full-Stack & Mobile Software Engineer.",
    path: "/about",
  },
  {
    title: "About",
    description:
      "Patriaworks is an independent software house led by Wahyu Patriaji, building custom web, mobile, and backend systems for operations across Indonesia.",
    path: "/about",
  }
);

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
