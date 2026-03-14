// Spacing presets derived from density choice.
// Each density defines semantic spacing tokens used across all components.

export const DENSITY_PRESETS = {
  compact: {
    label: "Compact",
    desc: "dense, for data-heavy tools",
    base: 4,
    scales: [4, 8, 12, 16, 24, 32],
    semantic: {
      inlineY: 4,
      inlineX: 8,
      content: 12,
      element: 4,
      block: 8,
      section: 32,
      page: 16,
    },
  },
  balanced: {
    label: "Balanced",
    desc: "default for most websites",
    base: 8,
    scales: [8, 16, 24, 32, 48, 64],
    semantic: {
      inlineY: 8,
      inlineX: 16,
      content: 24,
      element: 8,
      block: 16,
      section: 64,
      page: 24,
    },
  },
  airy: {
    label: "Airy",
    desc: "generous whitespace, for brand sites & portfolios",
    base: 12,
    scales: [12, 24, 36, 48, 72, 96],
    semantic: {
      inlineY: 12,
      inlineX: 24,
      content: 36,
      element: 12,
      block: 24,
      section: 96,
      page: 48,
    },
  },
};

export const MAX_WIDTH_OPTIONS = [
  { value: "960", label: "960px", desc: "blogs, reading-focused content" },
  { value: "1200", label: "1200px", desc: "default for most websites" },
  { value: "1440", label: "1440px", desc: "data-dense, dashboards" },
  { value: "full", label: "Full width", desc: "full-width, immersive" },
];

// Semantic token names and their descriptions for reference tables
export const SEMANTIC_LABELS = [
  { key: "inlineY", css: "--space-inline-y", label: "inline padding (Y)" },
  { key: "inlineX", css: "--space-inline-x", label: "inline padding (X)" },
  { key: "content", css: "--space-content", label: "card / section padding" },
  { key: "element", css: "--space-element", label: "element gap" },
  { key: "block", css: "--space-block", label: "block gap" },
  { key: "section", css: "--space-section", label: "section spacing" },
  { key: "page", css: "--space-page", label: "page margin" },
];

export function getSpacing(density) {
  return DENSITY_PRESETS[density || "balanced"];
}
