I want you to **completely build a production-ready personal resume and portfolio website for Wahyu Patriaji** using the existing Next.js project.

The final website will be deployed to:

**https://patrialabs.vercel.app**

This is not just a simple portfolio landing page. Build it as a **premium, modern, retro, distinctive software engineer portfolio** with excellent UI/UX, animation, performance, SEO, multilingual support, security, and maintainable architecture.

---

# 1. Existing Technology Stack

The project already uses:

- Next.js `16.3.3`
- React `19.2.8`
- TypeScript
- Tailwind CSS `4`
- React Hook Form
- Zod
- TanStack React Query
- Nodemailer
- Pino
- Pino Pretty
- React Icons
- Vercel Analytics
- GSAP
- Anime.js
- Locomotive Scroll

Existing `package.json` is the source of truth for the current technology stack.

### Important

**Do not replace Next.js, React, Tailwind, or the existing architecture.**

Prefer the existing dependencies.

Do not add another library when an existing dependency can already solve the problem.

Avoid unnecessary dependencies.

In particular, do not blindly use all animation libraries simultaneously.

Choose the most appropriate animation solution from the existing stack.

For example:

- GSAP for advanced timeline/scroll animations
- Locomotive Scroll only if it provides real UX value
- Anime.js only when it provides functionality that GSAP does not reasonably cover

Avoid using three animation systems for the same UI.

---

# 2. First Step — Inspect Everything

Before writing code:

1. Inspect the existing project structure.
2. Read `package.json`.
3. Read:
   - `assets/resume.json`
   - `assets/project-detail.json`

4. Inspect existing components, styles, and configuration.
5. Determine the current Next.js architecture.
6. Preserve useful existing code instead of unnecessarily rewriting everything.

Then design the architecture before implementation.

---

# 3. Content SSOT

The portfolio content must use:

`assets/resume.json`

and

`assets/project-detail.json`

as the **Single Source of Truth**.

Do not duplicate portfolio information inside React components.

For example, do NOT hardcode:

```ts
const experiences = [...]
```

inside components if the information already exists in `resume.json`.

Instead:

```text
JSON data
   ↓
data/content layer
   ↓
typed models
   ↓
components
   ↓
pages
```

Create appropriate TypeScript types/interfaces for the JSON structures.

### Critical Rule

**Never invent information.**

Do not fabricate:

- Companies
- Job positions
- Dates
- Responsibilities
- Technologies
- Projects
- Achievements
- Education
- Statistics
- Client information
- Project results

Only use information available in the source data.

---

# 4. Multilingual Architecture

The website must support:

- Indonesian (`id`)
- English (`en`)

Indonesian should be the default language.

Use a maintainable i18n architecture.

Do not scatter translated strings throughout components.

Separate:

### Portfolio data

From:

### UI translations

For example:

```text
content/
  resume
  projects

i18n/
  id
  en
```

The resume/project source data should remain structured and reusable.

If the JSON contains only Indonesian content, create a translation mechanism rather than duplicating the entire application.

All UI elements must support both languages:

- Navigation
- Buttons
- Labels
- Section titles
- Contact form
- Error messages
- Success messages
- Footer
- Metadata
- Accessibility labels

---

# 5. Website Architecture

Create a polished portfolio with at least:

## Home

- Hero
- Introduction
- Current role
- Key technologies
- Featured projects
- Experience overview
- Achievements
- Contact CTA

## About

- Professional introduction
- Background
- Career overview
- Personal professional positioning

## Experience

- Interactive timeline
- Company
- Position
- Duration
- Responsibilities
- Technologies

## Skills

Organize technologies into meaningful categories based only on the source data.

Examples:

- Frontend
- Backend
- Mobile
- Database
- Infrastructure
- Tools

## Projects

Create:

- Featured project section
- Project cards
- Technology badges
- Project category
- Project links
- GitHub links where available
- Live/demo links where available

## Project Details

Use dynamic routes:

```text
/projects/[slug]
```

Project detail pages must be generated from:

`assets/project-detail.json`

Each project detail page should have:

- Project overview
- Problem/context
- Responsibilities
- Technologies
- Features
- Images/screenshots where available
- Links
- Navigation to previous/next projects

Do not display sections when their data does not exist.

## Education / Achievements

Display relevant information from `resume.json`.

## Contact

Create a professional contact form.

## 404

Create a custom branded 404 page.

---

# 6. Visual Design

The visual direction should feel:

**Premium + Technical + Elegant + Modern + Distinctive + Retro**

Avoid:

- Generic portfolio templates
- Excessive gradients
- Excessive glassmorphism
- Overly rounded cards everywhere
- Excessive shadows
- Random decorative elements
- Generic AI-generated layouts

The website should look like a portfolio belonging to a serious software engineer.

Use strong typography, whitespace, grid systems, hierarchy, and intentional interactions.

## Typography & Modern Retro Visual Identity

The website should use a **Modern Retro** visual direction.

Do not make the typography look like a generic modern SaaS website.

The goal is to combine:

**Retro character + modern usability + developer/technical identity.**

### Primary Display Font

Use:

**Bricolage Grotesque**

Use it for:

- Hero headline
- Main headings
- Section headings
- Large project titles
- Important visual statements

Use bold/extra-bold weights selectively.

The typography can be slightly playful and expressive while remaining professional.

### Primary Body Font

Use:

**DM Sans**

Use it for:

- Body text
- Navigation
- Buttons
- Forms
- Resume content
- Project descriptions
- Metadata

Prioritize readability.

### Technical Accent Font

Use:

**Space Mono**

Use it sparingly for:

- Project numbers
- Dates
- Technology labels
- Small metadata
- Technical tags
- Version-like labels
- Decorative developer-oriented elements

Do not use Space Mono for large paragraphs.

---

## Modern Retro Typography Principles

The typography should feel:

**Bold + Playful + Editorial + Technical + Nostalgic**

Avoid:

- Generic Inter-only typography
- Corporate SaaS typography
- Excessive futuristic fonts
- Cyberpunk typography
- Pixel fonts everywhere
- Handwritten fonts
- Excessive font combinations

Use typography as part of the visual identity.

Large headings can have unconventional sizing, line breaks, or positioning where it improves the composition.

However, readability must always take priority.

---

## Font Loading

Use Next.js `next/font`.

Do not load fonts through external CSS imports when `next/font` can be used.

Only load the font weights actually required.

Optimize font loading and avoid unnecessary font variants.

Ensure both Indonesian and English text render correctly.

---

## Modern Retro Art Direction

The typography should work together with the existing palette:

Navy:
`#0B1849`

Green:
`#124D1C`

Gold:
`#E4B028`

Off-white:
`#EBEDE3`

Use the palette intentionally rather than applying all colors everywhere.

The visual language should take inspiration from:

- 70s/80s editorial design
- Early personal computers
- Vintage technical manuals
- Retro print layouts
- Old computer interfaces
- Swiss/editorial typography
- Early web aesthetics

But reinterpret these references using modern web design principles.

Do NOT create an actual old-fashioned website.

It should be:

**Modern first, retro second.**

---

## Visual Elements

Consider subtle use of:

- Oversized typography
- Offset text
- Editorial grids
- Thick borders
- Thin technical lines
- Numbered sections
- Small monospace labels
- Vintage-inspired badges
- Geometric shapes
- Grain/noise texture
- Halftone-inspired patterns
- Dashed borders
- Retro-inspired cards
- Offset shadows
- Asymmetric layouts
- Marquee-style elements

These should be subtle and intentional.

Avoid turning the website into a gimmicky 80s theme.

---

## UI Details

Prefer:

- Strong borders
- Slightly unconventional card layouts
- Hard/offset shadows where appropriate
- Controlled corner radius rather than rounded-everything UI
- Editorial spacing
- Large typography
- High contrast
- Interesting section transitions
- Small micro-interactions

Avoid excessive:

- Glassmorphism
- Blur effects
- Floating gradient blobs
- Neon glow
- 3D effects
- Excessive rounded cards
- Generic gradient backgrounds

---

## Animation Direction

Animation should also follow the modern-retro identity.

Use:

- Smooth slide transitions
- Text reveal
- Slight positional offsets
- Marquee movement
- Hover distortions where appropriate
- Scroll-based editorial transitions
- Subtle image movement
- Mechanical/physical-feeling interactions

Animations should feel **intentional and tactile**, rather than overly futuristic.

Respect:

`prefers-reduced-motion`

---

## Overall Design Goal

The final visual identity should communicate:

**"A modern software engineer with a strong technical background and a distinctive retro-inspired personal brand."**

It should feel like a combination of:

**Modern portfolio**

- **Retro editorial design**
- **Developer culture**
- **Personal branding**

The final result must remain professional enough to be used as a real CV/portfolio for job applications.

---

# 7. Color System

Use these colors as the primary design system.

### Navy

`#0B1849`

### Green

`#124D1C`

### Gold

`#E4B028`

### Grey / Off-white

`#EBEDE3`

RGB:

```text
Navy  = rgb(11, 24, 73)
Green = rgb(18, 77, 28)
Gold  = rgb(228, 176, 40)
Grey  = rgb(235, 237, 227)
```

Create centralized CSS variables/design tokens.

Do not scatter hex values throughout components.

Example concept:

```text
--color-navy
--color-green
--color-gold
--color-surface
```

---

# 8. Animation & Interaction

The portfolio should have smooth, sophisticated animations.

Use animation intentionally.

Possible interactions:

- Hero entrance animation
- Scroll reveal
- Project card hover
- Image parallax
- Text reveal
- Timeline animation
- Navigation transition
- Page transition
- Button micro-interactions
- Magnetic/interactive elements where appropriate

However:

**Do not over-animate the website.**

Animation should improve UX.

Use GPU-friendly transforms where possible.

Avoid animations that negatively affect performance.

Respect:

```css
prefers-reduced-motion
```

---

# 9. Responsive Design

The website must work properly on:

- Small mobile
- Large mobile
- Tablet
- Laptop
- Desktop
- Large desktop

Do not simply shrink the desktop design.

Design responsive layouts intentionally.

Pay particular attention to:

- Navigation
- Hero
- Typography
- Project cards
- Timeline
- Contact form
- Project detail pages
- Images
- Horizontal overflow

There must be no accidental horizontal scrolling.

---

# 10. SEO

Implement comprehensive SEO.

Include:

- Page-specific title
- Page-specific description
- Canonical URL
- Open Graph
- Twitter/X metadata
- `robots.txt`
- `sitemap.xml`
- `hreflang`
- Proper `lang` attribute
- Semantic HTML
- Correct heading hierarchy
- SEO-friendly URLs
- JSON-LD structured data

Use appropriate schemas such as:

- Person
- WebSite
- WebPage
- SoftwareSourceCode / CreativeWork where appropriate

Production URL:

```text
https://patrialabs.vercel.app
```

SEO must work correctly for both:

```text
id
en
```

Project detail pages must have dynamic metadata based on the project.

---

# 11. Performance

Optimize the application for production.

Target Lighthouse:

- Performance ≥ 90
- Accessibility ≥ 90
- Best Practices ≥ 90
- SEO ≥ 90

Follow:

- Server Components by default
- Client Components only when needed
- Proper image optimization
- Lazy loading
- Dynamic imports where appropriate
- Minimize client-side JavaScript
- Avoid unnecessary React state
- Avoid unnecessary re-renders
- Optimize animation
- Optimize fonts
- Prevent layout shift
- Avoid blocking resources

Do not turn the entire application into a Client Component just to make animations work.

Keep interactive/animated components isolated.

---

# 12. Accessibility

Follow accessibility best practices.

Include:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Accessible buttons
- Accessible links
- Proper labels
- Form accessibility
- Correct heading hierarchy
- Screen-reader-friendly content
- Sufficient contrast
- Reduced-motion support

Do not use ARIA attributes unnecessarily.

---

# 13. Contact Form

Create a fully functional contact form using:

- React Hook Form
- Zod
- Next.js server-side functionality
- Nodemailer
- SMTP

Form fields:

- Name
- Email
- Subject
- Message

On successful submission, send the message to:

**[wahyupatriaji@gmail.com](mailto:wahyupatriaji@gmail.com)**

The SMTP implementation must run server-side.

Never expose SMTP credentials to the browser.

---

# 14. Contact Form Security

Implement:

- Client validation
- Server validation
- Zod schema shared where appropriate
- Input length limits
- Email validation
- Sanitization
- Email header injection protection
- Spam protection
- Rate limiting where practical
- Proper HTTP status codes
- Safe error responses

Do not trust client-side validation.

Server-side validation is mandatory.

Do not return internal SMTP errors directly to the client.

---

# 15. Environment Variables

Create:

```text
.env.example
```

Include every required environment variable.

For example:

```env
NEXT_PUBLIC_SITE_URL=https://patrialabs.vercel.app

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=

CONTACT_EMAIL=wahyupatriaji@gmail.com
```

Use names appropriate for the final implementation.

Important:

- Never commit real credentials.
- Never expose server secrets with `NEXT_PUBLIC_`.
- Never hardcode SMTP credentials.
- `.env.example` must contain placeholders only.

---

# 16. Logging

The project already has:

- Pino
- Pino Pretty

Use Pino as the application's logging solution.

Create a reusable logger.

Development:

- Human-readable logs

Production:

- Structured logs

Log useful events such as:

- Contact form submission
- Contact form validation failure
- SMTP failure
- Unexpected server errors

Never log:

- Passwords
- SMTP credentials
- API keys
- Authentication tokens
- Sensitive user information

Avoid random `console.log`.

---

# 17. Analytics

Use the existing:

`@vercel/analytics`

Integrate it appropriately.

Do not create unnecessary custom analytics infrastructure.

---

# 18. React Query

The project already includes:

`@tanstack/react-query`

Do not use React Query unnecessarily.

For static portfolio content, prefer server-side/static data access.

Use React Query only where client-side asynchronous state actually benefits from it.

Do not introduce unnecessary client-side fetching for local JSON content.

---

# 19. Code Architecture

Follow strong engineering principles:

- SSOT
- DRY
- SOLID where appropriate
- Separation of concerns
- Reusable components
- Strong TypeScript typing
- Clear naming
- Small focused functions
- Centralized configuration
- Centralized design tokens
- Centralized translations
- Centralized validation
- Centralized logging

Recommended conceptual structure:

```text
app/
components/
  ui/
  layout/
  sections/
  projects/
  contact/
data/
lib/
  logger/
  mail/
  validation/
  seo/
types/
i18n/
public/
assets/
```

Adapt the exact structure to the existing project rather than blindly following this structure.

---

# 20. Type Safety

Use TypeScript strictly.

Create types for:

- Resume
- Experience
- Project
- Project detail
- Skills
- Education
- Achievement
- Translation data
- Contact form

Avoid:

```ts
any;
```

unless there is a legitimate technical reason.

Validate external/untrusted data where appropriate.

---

# 21. Error Handling

Implement proper error handling.

The application should gracefully handle:

- Invalid contact form input
- SMTP failure
- Missing project
- Invalid project slug
- Missing data
- Unexpected server errors

Create appropriate:

- Loading states
- Error states
- Empty states
- Success states

Do not expose internal implementation details to users.

---

# 22. Vercel Compatibility

The application must be fully compatible with Vercel.

Avoid relying on:

- Local persistent filesystem
- Long-running background processes
- Server state that assumes a persistent Node process

SMTP functionality must work correctly within the Vercel deployment model.

All configuration must use environment variables.

---

# 23. Documentation

Create/update:

`README.md`

Include:

- Project overview
- Technology stack
- Architecture
- Folder structure
- Development setup
- Environment variables
- SMTP setup
- Running locally
- Build
- Production deployment
- Vercel configuration
- Updating resume data
- Updating project data
- Adding translations
- Adding projects

---

# 24. Final Validation

Before finishing, actually validate the project.

Run:

```bash
npm run lint
npm run build
```

Also verify:

- No TypeScript errors
- No ESLint errors
- No build errors
- No obvious console errors
- No broken routes
- No broken images
- No broken links
- No hydration errors
- No exposed secrets
- No unnecessary dependencies

Test:

- Mobile
- Tablet
- Desktop
- ID language
- EN language
- Contact form
- Project detail pages
- 404 page

---

# 25. Definition of Done

Do not consider the task finished merely because the UI exists.

The task is complete only when the application is:

**Designed**

- **Implemented**
- **Responsive**
- **Multilingual**
- **SEO-ready**
- **Accessible**
- **Performant**
- **Secure**
- **Functional**
- **Vercel-ready**
- **Maintainable**

The final result should feel like a **high-end personal brand portfolio for a professional Full-Stack & Mobile Software Engineer**, not a generic generated portfolio.

Start by inspecting the existing project and JSON files. Then make the implementation decisions based on the actual project structure and available data before modifying the code.
