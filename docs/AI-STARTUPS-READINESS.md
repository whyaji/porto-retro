# Patriaworks: AI Startups Program Readiness

Working document for the audit, positioning, AI product direction, and improvement plan
behind the changes made for an AI startups program application.

Sections 1 to 4 were written before any code change. Sections 5 to 7 were filled in after
implementation. Everything labeled "Recommendation" is a suggestion, not completed work.

---

## 1. Repository and website audit

### 1.1 Stack and architecture

- Next.js 16.3.3 (App Router), React 19.2.8, TypeScript 5, Tailwind CSS 4.
- Forms: React Hook Form 7 + Zod 4. Email: Nodemailer 9. Bot protection: next-turnstile.
  Logging: Pino. Analytics: @vercel/analytics. Deployed on Vercel at https://patriaworks.my.id.
- Dual site mode via `NEXT_PUBLIC_SITE_MODE`: `personal` (Wahyu Patriaji's resume) and
  `company` (Patriaworks studio). Production runs in `company` mode, verified on the live site
  on 2026-10-09.
- Content single source of truth: `assets/*.json` → `lib/data/*` accessors → `types/*` →
  components → pages. Bilingual (id/en) through `i18n/id.ts`, `i18n/en.ts`, and mode-specific
  overrides in `i18n/company.ts`.
- Scripts: `dev`, `build`, `start`, `lint`. There is no test script and no test framework in
  the repository.

### 1.2 Pages that exist today (company mode)

| Route                                     | Purpose                                                                                         | State                                                          |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `/`                                       | Hero, services, selected work, process, capabilities, clients, testimonial, proofs, contact CTA | Working                                                        |
| `/about`                                  | Studio summary, focus, founder contact card                                                     | Working                                                        |
| `/experience`                             | "How We Work" process and engagement models                                                     | Working                                                        |
| `/skills`                                 | Capabilities matrix by stack layer                                                              | Working                                                        |
| `/projects`, `/projects/[slug]`           | 16 client systems with detail pages, live links                                                 | Working                                                        |
| `/contact` + `/api/contact`               | Contact form with validation, rate limiting, Turnstile                                          | Working                                                        |
| `/utbk-ukppu` (alias `/app/utbk-ukppu`)   | CBT practice app for UTBK/UKPPU with question banks, sessions, scoring, import/export           | Working, deployed, but not linked from nav, footer, or sitemap |
| `/experience`, `/skills` in personal mode | Resume timeline and skill matrix                                                                | Working, unaffected                                            |

### 1.3 Contact flow

Client Zod validation, server Zod validation, header-injection sanitization, in-memory
rate limit (5 requests per minute per IP), optional Cloudflare Turnstile when
`TURNSTILE_SECRET_KEY` is set, Pino logging without credentials. Recipient defaults to
`inbox@patriaworks.my.id` in company mode.

Risk found: when SMTP variables are missing, the API returns HTTP 200 with
"Message received successfully (Dev simulation mode)". In production that is a success
response for a message that was never delivered. Fixed in this pass (section 5).

### 1.4 SEO and technical quality

- Per-mode titles, descriptions, OG and Twitter cards, canonical URLs, Organization and
  WebSite JSON-LD in company mode, sitemap, robots with `/api/` disallowed.
- No secrets in client code. `.env.local` is gitignored.
- `.env.example` still referenced `https://patrialabs.vercel.app` as the site URL and the
  personal Gmail address as `CONTACT_EMAIL`, which contradicts the deployed company site.
- `/utbk-ukppu` inherits the generic site title and is missing from the sitemap.
- Sitemap and metadata did not cover any product or AI content, because none existed.

### 1.5 Website audit against the application goals

What already supports the application:

- Real, verifiable work: 16 client systems, live Play Store links, client websites, one
  named and dated testimonial with a real role and company.
- Clear engineering narrative: process, engagement models, capability matrix.
- Working contact path to `inbox@patriaworks.my.id`.
- Honest production claims ("Shipped & Running") that match the project data.

Gaps that hurt the application:

1. No AI direction anywhere on the site. No mention of AI products, language models, or
   AI providers, while the application states an intent to build AI-powered products.
2. No Products page. Client work and products are mixed together, and the one product the
   company actually ships (the CBT practice app) is undiscoverable.
3. No Technology and AI page separating implemented engineering from planned AI
   architecture.
4. Positioning reads as a custom software agency only, which does not match an application
   describing a product company building AI solutions.
5. Home metadata and keywords carry no product or AI terms.
6. `.env.example` drift (section 1.4).

---

## 2. Recommended company positioning

Completed as copy changes (section 5). The positioning, for reference:

**One sentence.** Patriaworks is an independent software house in Indonesia that builds
operational software for businesses and is now developing its own AI-powered products with
modern AI APIs.

**Problem it solves.** Operational software usually fails because it was built for a
generic company. Patriaworks builds systems shaped around one workflow, and applies the
same engineering to its own products.

**Target customers.** Plantation and agri-tech operators, research groups, certification
bodies, and internal teams that need software their daily work can depend on. Secondary:
teams that want AI features added to documents and internal workflows without building an
AI stack from scratch.

**Product development direction.** Two tracks: client systems (already shipping, shown
under Work) and own products (shown under Products, with honest status labels).

**Role of AI.** AI is a roadmap direction, not an existing revenue line. The company plans
to add AI-powered features where a language model earns its place: document
summarization, information extraction, and answer explanations in the study tool. The site
states this as planned work.

**Call to action.** Send a project brief through `/contact`, or email
`inbox@patriaworks.my.id`.

---

## 3. Recommended primary AI product direction

### 3.1 Options compared

**Option A: document summarization and information extraction for research and
certification documents.**
Evidence in the repo: SRS Docs and Research Portal (document management, research
documentation, GeoPDF platform), LSP certification platform with strict structured data
validation, plantation reporting work. The domain is document-heavy and repetitive, and
structured extraction maps cleanly onto AI tool use and structured outputs.
Verdict: strongest evidence, clearest buyer, clear human-review step for consequential
output.

**Option B: answer explanations and practice generation inside the CBT practice app.**
Evidence in the repo: a deployed, working exam practice app with versioned question banks,
session persistence, scoring, and export.
Verdict: real product to attach the feature to, but the app has no accounts, no backend,
and no known user base, and explanation quality depends on material the app does not
contain. Good second feature, weaker first product.

**Option C: an operations assistant wired into client systems (workflow automation over
internal portals and APIs).**
Evidence: SSO, APIs, dashboards, queues already shipped.
Verdict: plausible, but each deal depends on a client's internal workflow, so it sells as
consulting rather than as a product.

### 3.2 Recommendation

Primary direction: **a document assistant that summarizes and extracts structured
information from operational documents, built for research groups, certification bodies,
and operations teams.**

- User problem: staff read long reports, minutes, and dossiers by hand and retype facts
  into structured systems.
- Target customers: the same research, certification, and plantation operations that
  already buy Patriaworks' systems.
- Solution: upload or select a document, get a summary, and get validated fields extracted
  into the system's schema, with a person confirming consequential values.
- Role of AI: summarization, classification, and extraction through structured outputs
  and tool use, orchestrated server-side.
- Why an LLM fits: the input is unstructured prose, the output is a small set of typed
  values, and rules-based parsing of arbitrary documents does not hold up.
- MVP scope, architecture, privacy, evaluation, and cost notes are in section 6 of the
  task plan; the website states the direction as "in development" with no launch date.

No AI feature was added to the live site for this pass, because there is no product
backend to attach it to yet. The plan in section 6 replaces a demo that would have been
impossible to test honestly.

---

## 4. Prioritized improvement plan

Implemented (section 5):

1. Products page with honest status labels, linked from nav, footer, and home.
2. Technology and AI page separating what runs today from what is planned, including the
   AI integration approach and a no-partnership clarification.
3. Homepage product section in company mode.
4. Company-mode nav and footer entries for Products and AI.
5. Copy updates for positioning (home metadata, keywords, company summary).
6. Sitemap entries for the new pages and the CBT app; metadata for the CBT app.
7. Contact API returns 503 instead of fake success when SMTP is missing in production.
8. `.env.example` and README corrected to the deployed domain and company inbox.
9. This document.

Recommendations, not implemented:

- Add a test framework (`vitest`) for Zod schemas, i18n merge logic, and API handlers
  before the first AI endpoint lands.
- Add `@anthropic-ai/sdk` and the AI endpoint once a product backend exists
  (section 6).
- Confirm response-time claims on the contact page against actual reply behavior.
- Verify the CBT app's question bank licensing before promoting it externally.

---

## 5. Implemented website changes

Modified files:

| File                           | Change                                                                                                                                                    |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/page.tsx`                 | Products section on the homepage in company mode; company meta description now mentions the AI product direction                                          |
| `components/layout/Navbar.tsx` | Products and AI links in company mode; desktop nav breakpoint moved from `md` to `lg` so eight links do not overflow tablet widths                        |
| `components/layout/Footer.tsx` | Products and AI links in company mode                                                                                                                     |
| `app/about/page.tsx`           | "Where This Is Going" card (company mode) linking to Products and AI                                                                                      |
| `app/about/layout.tsx`         | Company meta description mentions AI products                                                                                                             |
| `app/sitemap.ts`               | `/products`, `/ai` (company mode only) and `/utbk-ukppu` added                                                                                            |
| `app/api/contact/route.ts`     | Production without SMTP now returns HTTP 503 instead of a fake success; development keeps the simulation                                                  |
| `i18n/company.ts`              | New company-only groups `nav`, `products`, `ai` in English and Indonesian; hero subtagline adds the product and AI sentence                               |
| `assets/company.json`          | Studio summary adds the own-products sentence                                                                                                             |
| `lib/seo.ts`                   | Company description, OG and Twitter descriptions, keywords (AI terms), Organization `knowsAbout`                                                          |
| `.env.example`                 | Site URL fixed to `patriaworks.my.id`, `CONTACT_EMAIL` set to the company inbox, `SMTP_FROM` fixed, commented `ANTHROPIC_API_KEY` block marked as planned |
| `README.md`                    | Env example and structure updated for the new pages                                                                                                       |

Added files:

| File                                          | Purpose                                                                  |
| --------------------------------------------- | ------------------------------------------------------------------------ |
| `types/product.ts`                            | Product model with `ProductStatus`                                       |
| `assets/products.json`                        | SSOT product content, bilingual, with status and AI role fields          |
| `lib/data/products.ts`                        | Typed accessors                                                          |
| `app/products/page.tsx`                       | Products route, redirects to `/projects` in personal mode                |
| `components/products/ProductsPageContent.tsx` | Product cards with problem, users, features, status, AI role, tech, link |
| `app/ai/page.tsx`                             | Technology and AI route, redirects to `/` in personal mode               |
| `components/ai/AiPageContent.tsx`             | Implemented vs planned vs principles vs status note vs disclaimer        |
| `components/sections/ProductsSection.tsx`     | Homepage product section                                                 |
| `app/utbk-ukppu/layout.tsx`                   | Real page title and description for the practice app                     |
| `docs/AI-STARTUPS-READINESS.md`               | This document                                                            |

Product status shown on the site (all verifiable in the repository):

- CBT UTBK/UKPPU Practice App: **live**, runs at `/utbk-ukppu`.
- Document Summarization and Extraction Assistant: **in development**, no backend yet.
- Answer Explanations in the Practice App: **planned**, concept only.

### Follow-up pass: products feature flag and punctuation sweep

The own-products surfaces are now behind a feature flag so they can stay hidden
until they are ready to present:

- `lib/site-mode.ts` exports `IS_PRODUCTS_ENABLED`
  (`IS_COMPANY_MODE && process.env.NEXT_PUBLIC_SHOW_PRODUCTS === "true"`).
  Default is off.
- Gated surfaces: homepage `ProductsSection`, the Products link in the Navbar and
  Footer, the "See Our Products" buttons on `/about` and `/ai`, the `/products`
  page (redirects to `/` when the flag is off), and the `/products` sitemap entry.
- Nothing was removed. Setting `NEXT_PUBLIC_SHOW_PRODUCTS=true` (in `.env.local`
  or the Vercel environment) restores every surface, verified with a production
  build in both states.

Punctuation sweep across all repository text (site copy, metadata, comments,
docs, README, and the question JSON files in `assets/utbk-ukppu/`):

- The em dash character was removed from every string and replaced with a
  period, comma, colon, or pipe, depending on the sentence.
- Hyphens used as dashes (for example `word - word`) were replaced with commas
  in the question files; grammatical hyphens in compounds were kept.
- The product status badge now renders `IN DEVELOPMENT` instead of
  `IN-DEVELOPMENT` via `formatProductStatus` in `lib/data/products.ts`.
- The only file that still contains em dashes is `antislop-copywriting-skill.md`,
  where they are quoted as examples of the pattern to avoid.

---

## 6. AI integration plan (not implemented, by design)

No AI endpoint ships in this pass. There is no product backend to attach one to, and a
demo integration without a key, tests, or a real input would be a fabricated capability.
This section is the build plan for the first endpoint, in the document assistant.

**Endpoint.** `POST /api/ai/extract` in a Next.js route handler, using
`@anthropic-ai/sdk`.

**Configuration (environment variables, server side only):**

```env
ANTHROPIC_API_KEY=sk-ant-...      # never NEXT_PUBLIC_
AI_MODEL=your-model-id            # overridable per environment
AI_MAX_INPUT_TOKENS=20000         # hard cap per request
AI_RATE_LIMIT=10                  # requests per user per 10 minutes
```

All four are already documented as comments in `.env.example`. Deployment step: add them
in Vercel project settings, redeploy, then run one manual request and check Pino output.

**Request handling.**

1. Zod validates the body (document text, target schema, locale) with a size cap.
2. Per-user rate limit, then a timeout with `AbortSignal` (30s).
3. One retry with backoff for transient failures only.
4. Extraction through tool use: the tool `input_schema` mirrors the target schema, so the
   model returns typed fields; the tool input is parsed with Zod before anything is stored.
5. Errors map to explicit statuses: 400 invalid input, 429 rate limited, 503 upstream or
   timeout, each with a message the UI can render.

**Logging and privacy.** Log request id, latency, token usage, and status. Never log
document contents, extracted values, or the API key. Documents are processed for the
request only and are not persisted unless the user saves a result. Customer data is not
used for model training.

**Cost control.** `max_tokens` capped, `AI_MAX_INPUT_TOKENS` enforced before the call, a
per-user request budget, and a monthly token alert. A typical 10-page document is a few
thousand input tokens, so the per-request cost is small, which is why the cap matters more
than the price.

**Human review.** Consequential fields land in a review screen. A person confirms them
before they reach the record of truth.

**Tests (required before the endpoint goes live).** Schema validation for valid, oversized,
and malformed bodies; mocked SDK success, 429, timeout, and invalid tool input; a rate-limit
test; an assertion that no log line contains document text. CI runs with mocks only, no
live API key.

**Evaluation.** A golden set of documents with expected extracted fields, run whenever the
prompt or model changes, scored per field. Failures are reviewed by a person.

---

## 7. Test and build results

Run on 2026-10-09 in this repository:

| Check                                                                 | Result                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run lint`                                                        | PASS (exit 0, no warnings)                                                                                                                                                                                                                                                                                                                    |
| `npx tsc --noEmit`                                                    | PASS (exit 0, no errors)                                                                                                                                                                                                                                                                                                                      |
| `npm run build` with `NEXT_PUBLIC_SITE_MODE=company`                  | PASS, 37 static pages, TypeScript check passed inside the build, no size warnings                                                                                                                                                                                                                                                             |
| Route table                                                           | `/`, `/products`, `/ai`, `/utbk-ukppu`, `/projects/[slug]`, `/sitemap.xml`, `/robots.txt` all generated                                                                                                                                                                                                                                       |
| Production server smoke test                                          | 8/8 PASS: home contains `/products` and `/ai` nav links and "Our Own Products"; `/products` renders the CBT product and status legend; `/ai` renders "How We Approach AI" and the not-implemented status; `/utbk-ukppu` title is "CBT UTBK/UKPPU Practice App \| Patriaworks"; sitemap lists `/products`, `/ai`, `/utbk-ukppu`; robots.txt OK |
| `POST /api/contact` with `{}`                                         | HTTP 400 with field errors, as designed (no email sent)                                                                                                                                                                                                                                                                                       |
| `POST /api/contact` valid payload, SMTP forced empty in a test server | HTTP 503 with `{"message":"The contact channel is not configured right now. Please email us directly instead."}`, logged as `SMTP not configured in production: rejecting contact submission`. No email was dispatched                                                                                                                        |
| Rate limiting                                                         | HTTP 429 observed after repeated POSTs from one IP, cleared after the 60s window                                                                                                                                                                                                                                                              |
| Unknown route                                                         | HTTP 404                                                                                                                                                                                                                                                                                                                                      |
| Personal-mode build and runtime                                       | Build passes; `/products` returns 307 to `/projects`, `/ai` returns 307 to `/`, and the personal home page hides the Products and AI nav links                                                                                                                                                                                                |
| Secret scan                                                           | No API keys or credentials in tracked files; `.env.local` is gitignored; only `.env.example` is tracked                                                                                                                                                                                                                                       |
| Unit tests                                                            | None exist: the repository has no test script or framework (reported, not skipped silently)                                                                                                                                                                                                                                                   |

Not performed: real email delivery (the SMTP path was exercised only with SMTP disabled, so
no message reached the inbox), visual QA on physical devices, Lighthouse scoring, and
crawler rendering on the live domain.

---

## 8. Risks and missing information

- **No automated tests.** Nothing prevents a future regression in the Zod schemas or the
  i18n merge. Add a test framework before the first AI endpoint.
- **Contact delivery unverified.** Validation, rate limiting, and the new 503 path were
  exercised; actual email delivery depends on SMTP credentials configured in Vercel, which
  this environment cannot confirm. If SMTP is missing in production, the form now errors
  instead of lying, but the error needs monitoring.
- **Responsive behavior** was changed only at the nav breakpoint (md to lg, so the mobile
  drawer appears earlier). Confirmed in markup, not on devices.
- **Question bank licensing** for the CBT app is unverified. The product page links to it
  without claiming rights to the question content.
- **Production site not redeployed.** These changes are local until you build and deploy.
- **The application must match the site.** The site says no AI product is live. An
  application claiming a shipped AI feature would contradict it.
- **Not verified here:** analytics output, Open Graph image rendering, and crawler
  rendering of the new pages on the live domain.

---

## 9. Readiness assessment

Genuinely ready:

- Clear company identity on every main page: what Patriaworks is, who it serves, what it
  builds, how to contact it.
- Products visible with honest status (live / in development / planned) and real links.
- A specific, evidence-backed AI product direction instead of a generic AI promise.
- AI page separating shipped engineering from planned AI work, with a
  no-partnership statement.
- Working contact path to `inbox@patriaworks.my.id` with validation, rate limiting,
  bot protection, and honest failure behavior.
- SEO surface updated: titles, descriptions, keywords, sitemap, structured data, plus
  metadata for the practice app.
- Lint, type check, production build, and smoke tests all pass.

Needs attention before applying:

- Deploy the branch, then re-check the live site: nav links, `/products`, `/ai`, sitemap.
- Confirm SMTP, Turnstile, and analytics are configured in the production environment.
- Decide whether the CBT app is promoted externally, and check question bank rights.
- Add tests before writing the first AI endpoint (section 6).
- Keep the application answers consistent with the site: plans and directions, not claims
  of shipped AI products.
