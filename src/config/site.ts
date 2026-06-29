export const SITE_URL = 'https://tecnofin.io';

export const METRICS = [
  { value: "94%", label: "Faster daily and month-end reporting" },
  { value: "Day 1", label: "Full ownership, zero vendor lock-in" },
  { value: "100%", label: "Audit-ready lineage, no manual evidence" },
  { value: "0", label: "Production incidents after handover" },
] as const;

export const PRINCIPLES = [
  {
    index: "I.",
    title: "Pipelines are software",
    body: "Tested, peer-reviewed, version-controlled. Not glue, not notebooks, not screenshots of dashboards.",
  },
  {
    index: "II.",
    title: "Schema is contract",
    body: "Sources drift. We absorb that drift in the model so downstream consumers never see a broken interface.",
  },
  {
    index: "III.",
    title: "Lineage is non-negotiable",
    body: "Every column in production answers three questions: where it came from, how it was derived, who depends on it.",
  },
] as const;

// Home landing-hub index — one teaser per core section, in narrative order.
export const SECTIONS = [
  {
    index: "01",
    href: "/value",
    label: "Business Value",
    teaser: "AI gives everyone the same models. Your data is the only edge — if it's usable.",
  },
  {
    index: "02",
    href: "/expertise",
    label: "Expertise",
    teaser: "Three capabilities, each tied to a business risk you can name.",
  },
  {
    index: "03",
    href: "/dna",
    label: "How We Work",
    teaser: "Senior engineers, version-controlled assets, full ownership from day one.",
  },
  {
    index: "04",
    href: "/success-cases",
    label: "Success Cases",
    teaser: "Fragile, slow, untraceable systems turned into infrastructure teams own.",
  },
  {
    index: "05",
    href: "/contact",
    label: "Contact",
    teaser: "Begin with a build, not a deck — working proof in two weeks.",
  },
] as const;

// Business Value page — four outcomes, each the foundation an AI strategy actually runs on.
export const VALUE_OUTCOMES = [
  {
    metric: "94%",
    title: "Decisions at the speed of the question",
    before: "Reports that take hours — so the business stops asking.",
    after: "Answers in minutes, and inputs fresh enough for models to act on.",
    consequence: "Faster daily and month-end reporting frees analyst days every cycle and keeps AI features running on current data, not last week's.",
  },
  {
    metric: "Day 1",
    title: "Your data stays your edge",
    before: "Pipelines only the last vendor understands.",
    after: "Open-standard, version-controlled assets your own team owns outright.",
    consequence: "The data that makes you unique — and the IP built on top of it — never gets locked inside someone else's platform.",
  },
  {
    metric: "100%",
    title: "Inputs you can trust and prove",
    before: "Numbers no one can trace, and audits that mean weeks of manual evidence.",
    after: "Column-level lineage from source to dashboard, baked into every run.",
    consequence: "Trustworthy inputs are the difference between AI that compounds value and AI that confidently invents it — and you pass audits without a fire drill.",
  },
  {
    metric: "0",
    title: "A foundation that doesn't wobble",
    before: "Silent breakages and 3 a.m. pages when a source shifts.",
    after: "Schema contracts and quality gates that stop bad data before production.",
    consequence: "Zero pipeline-driven incidents after handover means the foundation under your reporting — and your AI — stays standing while you build on it.",
  },
] as const;

// Business Value page — the before/after ledger.
export const BEFORE_AFTER = [
  { before: "Reports measured in hours", after: "Answers measured in minutes" },
  { before: "Surprise cloud-compute bills", after: "Isolated, predictable, attributable cost" },
  { before: "Numbers no one can trace", after: "Column-level lineage, source to dashboard" },
  { before: "“Our data isn't AI-ready”", after: "A foundation models can actually trust" },
  { before: "Locked into the last vendor", after: "Owned by your team from day one" },
] as const;

// Business Value page — who in the org feels each outcome (arms the champion to sell upward).
export const STAKEHOLDERS = [
  { role: "CEO & Board", cares: "Whether the AI strategy has real ground to stand on, or just slideware." },
  { role: "CFO", cares: "Compute cost under control and a return that shows up in reporting, not promises." },
  { role: "CDO / Head of Data", cares: "Data the business trusts — and that's actually ready for models, not just dashboards." },
  { role: "Risk & Audit", cares: "Every number traceable and compliant, with evidence that produces itself." },
] as const;

// How We Work page — the engagement arc.
export const PROCESS = [
  {
    step: "01",
    phase: "The Two-Week Build",
    body: "We start with working proof on your own stack — a tested slice of your highest-risk pipeline, a lineage map of your critical tables, and a costed plan you keep.",
  },
  {
    step: "02",
    phase: "Hardening",
    body: "We extend the proof into production: schema contracts, quality gates, and compute isolation, each one tested and peer-reviewed before it ships.",
  },
  {
    step: "03",
    phase: "Handover & Ownership",
    body: "We hand over documented, version-controlled assets your team runs without us. No lock-in, no retainer dependency — the system is yours.",
  },
] as const;
