import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  {
    title: "CBT UTBK/UKPPU Practice App",
    description:
      "A browser-based exam simulator with versioned question packages, a timer, flagging, and result review, built by Wahyu Patriaji.",
    path: "/utbk-ukppu",
  },
  {
    title: "CBT UTBK/UKPPU Practice App",
    description:
      "A Patriaworks product: a browser-based exam simulator with versioned question packages, a timer, flagging, and result review. Sessions stay in the browser.",
    path: "/utbk-ukppu",
  }
);

export default function CbtPracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
