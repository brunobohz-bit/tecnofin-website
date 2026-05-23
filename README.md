# Tecnofin Corporate Website

A performance-tuned, zero-JS static corporate website built with Astro 5, Tailwind CSS v4, and a content-layer architecture designed for safe, automated content updates.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Architecture Overview](#architecture-overview)
3. [Directory Structure](#directory-structure)
4. [Site Routes](#site-routes)
5. [Design System](#design-system)
6. [Content Layer — Editing Guide](#content-layer--editing-guide)
7. [Adding New Pages](#adding-new-pages)
8. [Adding Expertise Subpages](#adding-expertise-subpages)
9. [Local Development](#local-development)
10. [Deployment](#deployment)
11. [Agent & LLM Rules](#agent--llm-rules)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro 5.x](https://astro.build) — static site generation, zero client-side JS by default |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) — configured via CSS variables, no `tailwind.config.js` |
| Typography plugin | `@tailwindcss/typography` — drives the `prose` utility classes used in content areas |
| Content layer | Astro's built-in Content Layer API with `glob` loader — validates Markdown frontmatter via Zod |
| MDX support | `@astrojs/mdx` — allows JSX/HTML components inside Markdown files (used in expertise subpages) |
| Fonts | Google Fonts: **Newsreader** (serif, headings) and **Inter** (sans-serif, body) |
| Package manager | npm |

---

## Architecture Overview

The codebase uses a strict two-zone separation:

### Content Zone — `src/content/pages/`
Flat Markdown (`.md`) and MDX (`.mdx`) files containing only raw copy. This is the only layer that should be edited for content changes. Frontmatter is validated against a Zod schema — invalid keys or missing required fields will cause the build to fail, preventing broken content from reaching production.

### Structural Zone — `src/layouts/`, `src/pages/`, `src/styles/`
Templates, routing, and design tokens. These files define how content is displayed and should only be modified when changing the site's layout, navigation, or visual design — not when updating copy.

This separation means content can be safely updated without any risk of introducing layout or styling regressions.

---

## Directory Structure

```
├── README.md                          # This file
├── AGENT.md                           # Hard rules for automated tools
├── package.json                       # Dependency and script definitions
├── astro.config.mjs                   # Astro + Tailwind v4 (Vite) configuration
├── Tecnofin LOGO.png                  # Original logo asset
│
├── public/                            # Served as-is at the root URL
│   ├── favicon.svg                    # Browser tab icon
│   ├── logo.png                       # Logo used in the site header
│   └── llms.txt                       # Machine-readable company profile for LLM crawlers
│
└── src/
    ├── content.config.ts              # Content collection schema (Zod validation)
    │
    ├── content/
    │   └── pages/                     # ✏️  CONTENT ZONE — edit these files for copy changes
    │       ├── home.md
    │       ├── expertise.md           # Expertise overview page intro
    │       ├── expertise-warehousing.md
    │       ├── expertise-vault.md
    │       ├── expertise-governance.md
    │       ├── dna.md
    │       ├── contact.md
    │       └── success-cases.md
    │
    ├── layouts/
    │   └── BaseLayout.astro           # Global HTML shell: <head>, nav, footer
    │
    ├── pages/                         # Astro file-based routing
    │   ├── index.astro                # → /
    │   ├── dna.astro                  # → /dna
    │   ├── contact.astro              # → /contact
    │   ├── success-cases.astro        # → /success-cases
    │   └── expertise/
    │       ├── index.astro            # → /expertise
    │       ├── data-warehousing.astro # → /expertise/data-warehousing
    │       ├── data-vault.astro       # → /expertise/data-vault
    │       └── data-governance.astro  # → /expertise/data-governance
    │
    └── styles/
        └── global.css                 # Tailwind v4 theme tokens and base styles
```

---

## Site Routes

| URL | Source file | Description |
|---|---|---|
| `/` | `src/pages/index.astro` | Homepage — hero and editorial split |
| `/expertise` | `src/pages/expertise/index.astro` | Capabilities overview with cards |
| `/expertise/data-warehousing` | `src/pages/expertise/data-warehousing.astro` | Full detail: warehousing |
| `/expertise/data-vault` | `src/pages/expertise/data-vault.astro` | Full detail: Data Vault 2.0 |
| `/expertise/data-governance` | `src/pages/expertise/data-governance.astro` | Full detail: governance |
| `/dna` | `src/pages/dna.astro` | Corporate values and philosophy |
| `/success-cases` | `src/pages/success-cases.astro` | Client case study cards |
| `/contact` | `src/pages/contact.astro` | Contact form (Formspree) |

---

## Design System

All design tokens are defined as CSS variables in `src/styles/global.css`. Do not hardcode color or font values anywhere else.

### Color Tokens

| Token | Value | Usage |
|---|---|---|
| `--color-cream` | `#FAF9F6` | Page background |
| `--color-ink` | `#111111` | Primary text, buttons |
| `--color-border-subtle` | `#E5E5E0` | Dividers, card borders |
| `--color-muted-gray` | `#666666` | Secondary text, labels |

### Font Tokens

| Token | Typeface | Usage |
|---|---|---|
| `--font-serif` | Newsreader, Merriweather, Georgia | Headings, hero text, pull quotes |
| `--font-sans` | Inter, system-ui | Body copy, labels, navigation |

### Typography Conventions

- All uppercase labels use `text-xs uppercase tracking-widest font-semibold`
- Section indices (01, 02, 03) use `font-serif text-border-subtle`
- Content areas use Tailwind's `prose prose-neutral` utility class
- Italic subtitles use `font-serif italic text-muted-gray`

---

## Content Layer — Editing Guide

### How it works

Every page has a corresponding Markdown file in `src/content/pages/`. Each file requires a frontmatter block with `title` and `description`. These values are validated at build time — the build will fail if either is missing or not a string.

```markdown
---
title: "Your Page Title"
description: "A one-sentence summary used in <meta> tags."
---

Your page body content in Markdown goes here.
```

### Editing existing page copy

Open the relevant `.md` file in `src/content/pages/` and edit the body. Markdown formatting (headings, bold, lists, links) is fully supported. Save the file — in development the page hot-reloads instantly.

### Content file map

| Page | Content file |
|---|---|
| Home | `src/content/pages/home.md` |
| Expertise overview | `src/content/pages/expertise.md` |
| Warehousing subpage | `src/content/pages/expertise-warehousing.md` |
| Data Vault subpage | `src/content/pages/expertise-vault.md` |
| Governance subpage | `src/content/pages/expertise-governance.md` |
| DNA / Philosophy | `src/content/pages/dna.md` |
| Success Cases (intro) | `src/content/pages/success-cases.md` |
| Contact | `src/content/pages/contact.md` |

### Success Cases cards

The case study cards on `/success-cases` are not driven by Markdown — they live as a `cases` array directly in `src/pages/success-cases.astro`. Each object has the following shape:

```js
{
  index: "01",           // Display number
  client: "Client Name",
  industry: "Finance",
  challenge: "One sentence describing the problem.",
  result: "One sentence describing the measurable outcome.",
  tags: ["Tag A", "Tag B"],
}
```

Add, remove, or edit entries in that array to manage case cards.

---

## Adding New Pages

To add a new top-level page (e.g., `/team`):

**1. Create the content file:**

```
src/content/pages/team.md
```

```markdown
---
title: "Our Team"
description: "Meet the engineers behind Tecnofin."
---

Body copy goes here.
```

**2. Create the route file:**

```
src/pages/team.astro
```

```astro
---
import { getEntry, render } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';

const pageContent = await getEntry('pages', 'team');
if (!pageContent) throw new Error("Unable to locate team.md in content layer.");
const { Content } = await render(pageContent);
---

<BaseLayout title={pageContent.data.title} description={pageContent.data.description}>
  <!-- Your layout here -->
  <section class="max-w-3xl mx-auto px-6 py-16">
    <h1 class="text-3xl md:text-5xl font-serif">{pageContent.data.title}</h1>
    <div class="prose prose-neutral mt-8 text-muted-gray">
      <Content />
    </div>
  </section>
</BaseLayout>
```

**3. Add it to the navigation** in `src/layouts/BaseLayout.astro`:

```html
<a href="/team" class="hover:text-ink transition-colors">Team</a>
```

---

## Adding Expertise Subpages

To add a new capability under `/expertise`:

**1. Create the content file:**

```
src/content/pages/expertise-yourslug.md
```

**2. Create the route file:**

```
src/pages/expertise/yourslug.astro
```

Use one of the existing subpage files (`data-warehousing.astro`) as a template. Update the `getEntry` key to match your new content file slug and the capability number accordingly.

**3. Add a card to the overview** in `src/pages/expertise/index.astro` by adding an entry to the `capabilities` array at the top of the frontmatter block.

---

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Install dependencies
npm install

# Start the development server (hot-reload enabled)
npm run dev
# → http://localhost:4321

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## Deployment

### Hosting

The site is hosted on **Netlify** with automatic deployment from the `main` branch of this GitHub repository.

- **Live URL:** [musical-meerkat-5b3be9.netlify.app](https://musical-meerkat-5b3be9.netlify.app)
- **GitHub repo:** [github.com/brunobohz-bit/tecnofin-website](https://github.com/brunobohz-bit/tecnofin-website)
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Deploy workflow

Every push to `main` triggers an automatic Netlify rebuild. No manual action is required. A typical deploy completes in under 60 seconds.

### Contact form

The contact form on `/contact` posts to Formspree. Replace the placeholder endpoint in `src/pages/contact.astro` with your real Formspree form ID before going live:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Create a free account at [formspree.io](https://formspree.io) to get a form ID.

---

## Agent & LLM Rules

This project uses a two-zone architecture specifically to allow automated tools to safely update content without touching layout or build configuration.

### Authorized zone (free to edit)

```
src/content/pages/*.md
src/content/pages/*.mdx
```

### Off-limits zone (do not modify without explicit human instruction)

```
src/layouts/
src/pages/
src/styles/
src/content.config.ts
astro.config.mjs
package.json
package-lock.json
```

### Content rules

- All content must follow the **Editorial Tech** design tone: high-contrast, data-centric, no decorative language or emojis.
- Frontmatter keys `title` and `description` are required on every content file. Do not add or remove keys from the frontmatter schema.
- When adding success case entries, edit only the `cases` array in `src/pages/success-cases.astro`.
- Never embed Tailwind classes or inline styles inside Markdown files.

See `AGENT.md` for the hard constraint list enforced at runtime.
