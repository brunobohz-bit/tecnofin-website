export const SITE_URL = 'https://tecnofin.io';

export const METRICS = [
  { value: "94%", label: "Average reporting-latency reduction" },
  { value: "2.0", label: "Data Vault discipline, end-to-end" },
  { value: "100%", label: "Column-level lineage coverage" },
  { value: "0", label: "Pipeline-driven incidents post-handover" },
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
