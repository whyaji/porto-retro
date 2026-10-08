import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  {
    title: "Contact",
    description:
      "Get in touch with Wahyu Patriaji for collaboration, opportunities, or project inquiries. Email, phone, LinkedIn, and GitHub contact details.",
    path: "/contact",
  },
  {
    title: "Contact",
    description:
      "Start a project with Patriaworks. Send a brief and get a written scope and estimate back — plus direct email, phone, LinkedIn, and GitHub.",
    path: "/contact",
  }
);

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
