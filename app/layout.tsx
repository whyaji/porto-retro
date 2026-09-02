import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { I18nProvider } from "@/context/i18n-context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  AUTHOR_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  getFacebookMeta,
  getPersonJsonLd,
  getWebSiteJsonLd,
  OG_IMAGE,
  SEO_KEYWORDS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
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
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${AUTHOR_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  category: "technology",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "id-ID": SITE_URL,
      "en-US": SITE_URL,
    },
  },
  icons: {
    icon: [
      { url: "/icon64.png", sizes: "64x64", type: "image/png" },
      { url: "/icon256.png", sizes: "256x256", type: "image/png" },
    ],
    apple: [{ url: "/icon256.png", sizes: "256x256", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description:
      "Explore software systems, web GIS platforms, and cross-platform mobile apps engineered by Wahyu Patriaji.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description:
      "Full-Stack & Mobile Software Engineer specializing in scalable web, backend, and cross-platform mobile apps.",
    images: [OG_IMAGE.url],
  },
  other: getFacebookMeta(),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = [getPersonJsonLd(), getWebSiteJsonLd()];

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
