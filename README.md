# Wahyu Patriaji — Personal Resume & Engineering Portfolio

[![Production Site](https://img.shields.io/badge/Production-patrialabs.vercel.app-0b1849?style=flat-square&logo=vercel)](https://patrialabs.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.3.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

A modern-retro personal resume and portfolio website engineered for **Wahyu Patriaji** — Full-Stack & Mobile Software Engineer at PT Sawit Sumbermas Sarana Tbk.

Deployed live to [https://patrialabs.vercel.app](https://patrialabs.vercel.app).

---

## 🛠 Technology Stack

- **Framework**: Next.js `16.3.3` (App Router, Server Components by default)
- **UI Core**: React `19.2.8`, TypeScript `5`
- **Styling**: Tailwind CSS `4`, Custom Modern Retro Design System & Tokens
- **Typography**: Next.js Google Fonts (`Bricolage Grotesque`, `DM Sans`, `Space Mono`)
- **Forms & Validation**: React Hook Form `7`, Zod `4`
- **Email Dispatch**: Server-side Nodemailer with SMTP & Rate Limiting
- **Logging**: Pino & Pino Pretty structured server logging
- **Analytics**: `@vercel/analytics`
- **Icons**: React Icons (Feather Icons `react-icons/fi`)

---

## 🏛 Architecture & SSOT (Single Source of Truth)

All resume and project details are strictly driven by JSON data files:
1. `assets/resume.json` — Experience, roles, education, contacts, and personal summary.
2. `assets/project-detail.json` — 16 enterprise web GIS, mobile, and backend systems with bilingual short descriptions, full descriptions, and detailed feature breakdowns (`general` vs `nerd`).

No portfolio information is duplicated or hardcoded inside React components.

```text
assets/*.json (SSOT)
       ↓
lib/data/ (Typed Data Accessors)
       ↓
types/ (Strict TS Interfaces)
       ↓
components/ (Isolated Client & Server Components)
       ↓
app/ (Static & Dynamic SSR/SSG Routes)
```

---

## 🌐 Multilingual (i18n)

The application natively supports **Indonesian (`id`, default)** and **English (`en`)**:
- Centralized UI translation dictionaries in `i18n/id.ts` and `i18n/en.ts`.
- Multilingual context provider with persistent localStorage syncing and zero hydration mismatches.
- Bilingual project data (`project-detail.json`) rendered reactively.

---

## 📂 Project Structure

```text
├── app/
│   ├── layout.tsx            # Global layout, Google Fonts, JSON-LD, Analytics
│   ├── globals.css           # Modern-retro theme variables, tactile shadows, patterns
│   ├── page.tsx              # Home landing page
│   ├── about/page.tsx        # Bio, engineering focus & achievements
│   ├── experience/page.tsx   # Interactive career timeline
│   ├── skills/page.tsx       # Tech stack & skill matrix
│   ├── projects/page.tsx     # Filterable project catalogue
│   ├── projects/[slug]/      # Dynamic project detail routes (SSG generated)
│   ├── contact/page.tsx      # Contact form & direct communication channels
│   ├── not-found.tsx         # Branded retro 404 page
│   ├── sitemap.ts            # Dynamic SEO sitemap
│   ├── robots.ts             # Robots crawl rules
│   └── api/contact/route.ts  # Secure SMTP contact handler with rate limiting
├── assets/
│   ├── resume.json           # SSOT: Professional resume data
│   └── project-detail.json   # SSOT: 16 project specs & features
├── components/
│   ├── ui/                   # Button, Badge, Card, SectionHeader, LanguageToggle
│   ├── layout/               # Navbar, Footer
│   ├── sections/             # Hero, Featured, Experience, Skills, Achievements, CTA
│   ├── projects/             # ProjectCard, ProjectFilter, ProjectDetailClient
│   └── contact/              # ContactForm
├── context/                  # i18n Context & Hook
├── i18n/                     # id.ts and en.ts dictionaries
├── lib/
│   ├── data/                 # SSOT accessors & helpers
│   ├── logger.ts             # Pino logger
│   └── validation/           # Zod contact schema
├── public/
│   ├── cv/                   # cv-wahyu-patriaji.pdf
│   └── project/              # Project screenshots & thumbnails
├── types/                    # TypeScript interfaces
└── .env.example              # Environment variables template
```

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/whyaji/my-resume-porto.git
cd my-resume-porto
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your SMTP credentials:
```env
NEXT_PUBLIC_SITE_URL=https://patrialabs.vercel.app
CONTACT_EMAIL=wahyupatriaji@gmail.com

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM="Wahyu Patriaji Portfolio" <no-reply@patrialabs.vercel.app>
```
*(If SMTP credentials are not set, the contact form safely logs the message in development mode without crashing).*

### 3. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🔒 Security & Performance Features

- **Strict Validation**: Zod schema validation on both client and server.
- **Rate Limiting**: Sliding window rate limiting on contact form submissions.
- **Sanitization**: Protection against Email Header Injection attacks (`\r\n`).
- **Pino Structured Logging**: Safe logs with zero credentials or secret leakage.
- **SEO & Schema**: JSON-LD Structured Data (`Person`), OpenGraph cards, dynamic sitemaps, and robots directives.

---

## 📄 License

Proprietary © 2026 Wahyu Patriaji. All rights reserved.
