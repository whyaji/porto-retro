import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { I18nProvider } from "@/context/i18n-context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
  weight: ["400", "500", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-spacemono",
  display: "swap",
  weight: ["400", "700"],
});

export const viewport: Viewport = {
  themeColor: "#0B1849",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://patrialabs.vercel.app"),
  title: {
    default: "Wahyu Patriaji | Full-Stack & Mobile Software Engineer",
    template: "%s | Wahyu Patriaji",
  },
  description:
    "Professional portfolio and resume of Wahyu Patriaji — Full-Stack & Mobile Software Engineer at PT Sawit Sumbermas Sarana Tbk. Specializing in Node.js, Hono, React, React Native, Flutter, and Geospatial GIS applications.",
  keywords: [
    "Wahyu Patriaji",
    "PatriaLabs",
    "Software Engineer",
    "Full-Stack Developer",
    "Mobile Developer",
    "React",
    "Next.js",
    "Flutter",
    "React Native",
    "Hono",
    "GIS",
    "Leaflet",
    "MapLibre",
    "Indonesia Programmer",
  ],
  authors: [{ name: "Wahyu Patriaji", url: "https://patrialabs.vercel.app" }],
  creator: "Wahyu Patriaji",
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: "https://patrialabs.vercel.app",
    siteName: "Wahyu Patriaji Portfolio",
    title: "Wahyu Patriaji | Full-Stack & Mobile Software Engineer",
    description:
      "Explore software systems, web GIS platforms, and cross-platform mobile apps engineered by Wahyu Patriaji.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wahyu Patriaji | Full-Stack & Mobile Software Engineer",
    description:
      "Full-Stack & Mobile Software Engineer specializing in scalable web, backend, and cross-platform mobile apps.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Wahyu Patriaji",
    jobTitle: "Full-Stack & Mobile Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "PT Sawit Sumbermas Sarana, Tbk.",
    },
    url: "https://patrialabs.vercel.app",
    sameAs: [
      "https://github.com/whyaji",
      "https://linkedin.com/in/wahyupatriaji",
    ],
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "University Of Muhammadiyah Malang",
      },
      {
        "@type": "EducationalOrganization",
        name: "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
      },
    ],
    knowsAbout: [
      "TypeScript",
      "React.js",
      "Next.js",
      "Flutter",
      "React Native",
      "Node.js",
      "Hono",
      "Geospatial GIS",
      "Redis",
      "MySQL",
      "Drizzle ORM",
    ],
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bricolageGrotesque.variable} ${dmSans.variable} ${spaceMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--surface)] text-[var(--navy)] bg-noise">
        <I18nProvider>
            <Navbar />
            <main className="flex-1 w-full flex flex-col">{children}</main>
            <Footer />
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
