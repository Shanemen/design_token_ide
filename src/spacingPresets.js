// Spacing presets derived from density choice.
// Each density defines semantic spacing tokens used across all components.

export const DENSITY_PRESETS = {
  compact: {
    label: "Compact",
    desc: "信息密集，适合工具型产品",
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
    desc: "适中，大部分网站的默认选择",
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
    desc: "大量留白，适合品牌站和作品集",
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
  { value: "960", label: "960px", desc: "博客、阅读型内容" },
  { value: "1200", label: "1200px", desc: "大部分网站的默认选择" },
  { value: "1440", label: "1440px", desc: "信息密集型、dashboard" },
  { value: "full", label: "Full width", desc: "全宽，沉浸式体验" },
];

// Semantic token names and their descriptions for reference tables
export const SEMANTIC_LABELS = [
  { key: "inlineY", css: "--space-inline-y", label: "组件内部 padding (Y)" },
  { key: "inlineX", css: "--space-inline-x", label: "组件内部 padding (X)" },
  { key: "content", css: "--space-content", label: "卡片 / Section 内边距" },
  { key: "element", css: "--space-element", label: "元素间 gap" },
  { key: "block", css: "--space-block", label: "组件间 gap" },
  { key: "section", css: "--space-section", label: "Section 间距" },
  { key: "page", css: "--space-page", label: "页面边距" },
];

export function getSpacing(density) {
  return DENSITY_PRESETS[density || "balanced"];
}
