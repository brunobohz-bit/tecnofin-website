# Agent Instructions — Tecnofin Website

Single source of truth for AI agents working in this repo. If this file and
`README.md` ever disagree, **trust this file** — it is verified against the code.

> Last verified against the codebase: 2026-06-29.

---

## ⚠️ Mandatory protocol — read first, update last

This file is a **living document**. Every agent session that touches this repo MUST:

1. **Read this entire file before making any change.** It defines the editable
   zones, the three content collections, and the off-limits files. Do not act on
   memory or on `README.md` — start here.
2. **Update this file in the same change whenever the code drifts from it.**
   If you add/remove a route, page, content collection, or frontmatter key; rename
   a file in the index (§4); change a design token (§5); or resolve/introduce a
   known issue (§7) — edit the matching section in the **same commit**. A change
   that makes this file inaccurate is incomplete.
3. **Bump the "Last verified" date** below to the date of your change whenever you
   touch this file or confirm it still matches the code.
4. **Treat drift as a bug.** If you notice this file is wrong, fixing it is in
   scope — do not leave it stale "for later."

A code change and its documentation update here are a single unit of work.

---

## 1. What this project is

A static, **zero client-side JS** corporate website.

| Layer | Technology |
|---|---|
| Framework | Astro 5 (static site generation) |
| Styling | Tailwind CSS v4 — CSS-first, **no `tailwind.config.js`**; tokens live in `src/styles/global.css` |
| Typography | `@tailwindcss/typography` (drives `prose` classes) |
| Content | Astro Content Layer API + `glob` loader, validated by Zod (`src/content.config.ts`) |
| MDX / Sitemap | `@astrojs/mdx`, `@astrojs/sitemap` |
| Fonts | **Self-hosted** via `@fontsource` (Inter, Newsreader, Instrument Serif, JetBrains Mono) — no external DNS |
| Canonical site | `https://tecnofin.io` (`astro.config.mjs`) |

Commands: `npm run dev` (→ localhost:4321) · `npm run build` · `npm run preview`.
The build **fails** on invalid frontmatter — that is the safety net. Always run
`npm run build` after content edits.

---

## 2. Content zones — what you may edit

There are **three** content collections, each with its own schema. This is the
part most often misunderstood.

### A. `pages` collection — `src/content/pages/`
Schema: `title`, `description` (both required strings). Plain page copy.

### B. `expertise` collection — `src/content/expertise/`
Powers `/expertise` and every `/expertise/<slug>` detail page.
Schema: `title`, `description`, `capIndex`, `summary`, `tags[]`, `ctaCopy`, `order`.

### C. `successCases` collection — `src/content/success-cases/`
Powers the cards on `/success-cases`.
Schema: `index`, `client`, `industry`, `challenge`, `metric`, `metricLabel`,
`result`, `tags[]`, `order`.

**Editing rules**
- Edit only the `.md` body and the frontmatter *values*. Do **not** add, rename,
  or remove frontmatter keys — the Zod schema will reject the build.
- **Never** put Tailwind classes, inline styles, or raw HTML in Markdown.
- Tone is **"Midnight Vault" / data-centric editorial**: high-contrast, precise,
  no decorative language, no emojis.

---

## 3. Off-limits without explicit human instruction

```
src/layouts/        src/pages/         src/styles/global.css
src/config/site.ts  src/content.config.ts
astro.config.mjs    package.json       package-lock.json
```

`src/config/site.ts` holds the structural content arrays (not content collections):
`METRICS` (home proof strip), `PRINCIPLES` (now rendered on `/dna`, not home),
`SECTIONS` (home landing-hub index), `VALUE_OUTCOMES` / `BEFORE_AFTER` / `STAKEHOLDERS`
(the `/value` page), and `PROCESS` (the `/dna` engagement timeline).

---

## 4. Route & content index

| URL | Route file | Content source |
|---|---|---|
| `/` | `src/pages/index.astro` | `pages/home.md` (hero copy; body unused) + `METRICS` + `SECTIONS` in `config/site.ts` — **lean landing hub** |
| `/value` | `src/pages/value.astro` | `pages/value.md` + `VALUE_OUTCOMES` / `BEFORE_AFTER` / `STAKEHOLDERS` in `config/site.ts` — **Business Value (AI-needs-your-data narrative)** |
| `/expertise` | `src/pages/expertise/index.astro` | `pages/expertise.md` + **`expertise` collection** |
| `/expertise/<slug>` | `src/pages/expertise/[slug].astro` *(dynamic — one file for all)* | **`expertise` collection** (`data-warehousing`, `data-vault`, `data-governance`) |
| `/dna` | `src/pages/dna.astro` | `pages/dna.md` (title **"How We Work"**) + `PRINCIPLES` + `PROCESS` in `config/site.ts`. Nav label is **"How We Work"**; slug stays `/dna` |
| `/success-cases` | `src/pages/success-cases.astro` | `pages/success-cases.md` (intro) + **`successCases` collection** (cards) |
| `/contact` | `src/pages/contact.astro` | `pages/contact.md`; email is **hardcoded** in the route file (`mailto:`, no form). Right column is the custom "Two-Week Build → Value" data-graph SVG |
| `/404` | `src/pages/404.astro` | — |

Global shell (`<head>`, nav, footer) lives in `src/layouts/BaseLayout.astro`. The
`<head>` includes `ProfessionalService` **JSON-LD** (inert, not executable JS) and OG/
Twitter tags defaulting to `public/og-default.png` (a 1200×630 branded card, raster —
regenerate from an SVG via `sharp` if the brand changes). The header carries a desktop nav
plus a **pure-CSS `<details>` mobile menu** (`md:hidden`) — no JavaScript.

---

## 5. Design system — "Midnight Vault" (dark)

Tokens are defined once in `src/styles/global.css`. Never hardcode colors/fonts
elsewhere.

| Token | Value | Use |
|---|---|---|
| `--color-paper` | `#0D0B09` | Page background (near-black) |
| `--color-ink` | `#F5EFE3` | Primary text (warm cream) |
| `--color-ink-soft` | `#D8CFC0` | Body / secondary text |
| `--color-oxblood` | `#D4A84B` | Accent (amber/gold — *not* red, despite the legacy name) |
| `--color-rule` | `#2E2922` | Borders, dividers |
| `--color-muted` | `#9A8A78` | Labels, captions (lifted from `#8A7A6A` for WCAG AA on warm panels) |

Fonts: `--font-display` Instrument Serif · `--font-serif` Newsreader ·
`--font-sans` Inter · `--font-mono` JetBrains Mono.

### Motion system (pure CSS — preserves the zero-JS rule)

All motion is CSS-only and **`prefers-reduced-motion` guarded**. Shared utilities live
in `global.css`:

- `.reveal` / `.reveal-group` — scroll-reveal (fade + rise) via CSS scroll-driven
  animations (`animation-timeline: view()`). The hidden initial state sits **only** inside
  a `@supports (animation-timeline: view())` + `prefers-reduced-motion: no-preference`
  guard, so unsupported browsers and reduced-motion users see content immediately (progressive
  enhancement — never leave content stuck invisible). `.reveal-group` staggers up to 5 direct
  children via `nth-child` ranges.
- `.depth-hero` / `.depth-bloom` — static radial gold glow behind a hero headline / focal
  element (no motion; safe for everyone).
- The homepage hero's load-time "assembly" sequence (headline rise, lineage-graph draw-in via
  `stroke-dashoffset`, node pop-in, metric-strip stagger) is a **scoped `<style>` block in
  `index.astro`**, also fully reduced-motion guarded. The contact data-graph keeps its own
  scoped animation (`bv-*`).

---

## 6. How to add content

**New top-level page:** create `pages/<name>.md` (with `title`+`description`),
create `src/pages/<name>.astro` (copy `dna.astro` as the template), add it to the
`nav` array in `BaseLayout.astro`.

**New expertise capability:** add a `.md` file to `src/content/expertise/` with the
full schema (set `order` and `capIndex`). The dynamic route and the overview/footer
lists pick it up automatically — **no route file needed**.

**New success case:** add a `.md` file to `src/content/success-cases/` with the full
schema. The cards render automatically, sorted by `order`.

---

## 7. Known issues (verify/fix before relying on them)

- **Orphaned files:** `pages/expertise-warehousing.md`, `expertise-vault.md`,
  `expertise-governance.md` are **not used by any route** (the `expertise`
  collection replaced them). Editing them changes nothing on the live site.
- **Email mismatch:** contact page uses `eduardo.hernandez@tecnofin.com` while the
  footer/site use the `tecnofin.io` domain.
- **`README.md` is partially stale** (light "Editorial Tech" theme, Formspree form,
  per-page expertise routes). Prefer this file.
