export const ATOMIC_COMPONENTS = [
  { id: "Button", label: "Button", icon: "▣", desc: "Primary action element",
    fields: [
      { key: "variants", type: "multi-pill", options: ["primary", "secondary", "ghost"], label: "Variants" },
      { key: "sizes", type: "multi-pill", options: ["sm", "md", "lg"], label: "Sizes" },
    ]
  },
  { id: "Text", label: "Text Block", icon: "T", desc: "Paragraph and quote styles",
    fields: [
      { key: "variants", type: "multi-pill", options: ["paragraph", "paragraph-sm", "blockquote"], label: "Variants" },
      { key: "quoteStyle", type: "pill", options: ["border-left", "large-italic", "centered"], label: "Quote Style", showIf: (config) => (config.variants || []).includes("blockquote") },
    ]
  },
  { id: "Divider", label: "Divider", icon: "—", desc: "Visual separator",
    fields: [
      { key: "style", type: "pill", options: ["line", "dashed", "dot", "space"], label: "Style" },
    ]
  },
  { id: "Badge", label: "Badge / Tag", icon: "◉", desc: "Status indicator",
    fields: [
      { key: "variant", type: "pill", options: ["filled", "outline"], label: "Variant" },
    ]
  },
  { id: "Avatar", label: "Avatar", icon: "◐", desc: "User profile image",
    fields: [
      { key: "shape", type: "pill", options: ["circle", "rounded-square", "square"], label: "Shape" },
      { key: "filter", type: "pill", options: ["color", "grayscale", "b&w"], label: "Filter" },
    ]
  },
  { id: "Icon", label: "Icon", icon: "✦", desc: "Icon system",
    fields: [
      { key: "source", type: "pill", options: ["library", "custom-ai ⚑", "custom-hand ⚑"], label: "Source" },
      { key: "library", type: "pill", options: ["Lucide", "Heroicons", "Phosphor", "Feather"], label: "Library", showIf: (config) => config.source === "library" },
      { key: "style", type: "pill", options: ["outline", "filled", "duotone"], label: "Style" },
      { key: "weight", type: "input", label: "Stroke Weight", placeholder: "1.5", mono: true, small: true },
    ]
  },
];

export const BLOCK_COMPONENTS = [
  { id: "Card", label: "Card", icon: "▢", desc: "Content card",
    fields: [
      { key: "orientation", type: "pill", options: ["vertical", "horizontal"], label: "Orientation" },
      { key: "thumbnailRatio", type: "pill", options: ["16:9", "4:3", "3:2", "1:1"], label: "Thumbnail Ratio" },
      { key: "hoverEffect", type: "bool", label: "Hover effect?" },
    ]
  },
  { id: "Gallery", label: "Gallery / Grid", icon: "▦", desc: "Grid layout",
    fields: [
      { key: "columns", type: "pill", options: ["2", "3", "4"], label: "Columns" },
      { key: "style", type: "pill", options: ["grid", "masonry", "horizontal-scroll"], label: "Style" },
    ]
  },
];

export const FIXED_COMPONENTS = [
  { id: "Navbar", label: "Navbar", icon: "▔", desc: "Navigation bar",
    fields: [
      { key: "layout", type: "pill", options: ["logo-left", "centered", "hamburger-only"], label: "Layout" },
      { key: "transparent", type: "bool", label: "Transparent background?" },
    ]
  },
  { id: "Hero", label: "Hero", icon: "◆", desc: "Hero section", hasVisualAsset: true,
    fields: [
      { key: "visualType", type: "pill-flagged", options: [
        { id: "illustration", canAI: false },
        { id: "3d-render", canAI: false },
        { id: "photography", canAI: false },
        { id: "abstract-graphic", canAI: true },
        { id: "animation", canAI: true },
        { id: "none", canAI: true },
      ], label: "Visual Type" },
      { key: "visualNotes", type: "textarea", label: "Visual Notes", placeholder: "Describe the hero visual style..." },
    ]
  },
  { id: "Footer", label: "Footer", icon: "▁", desc: "Page footer",
    fields: [
      { key: "structure", type: "pill", options: ["simple", "multi-column", "multi-column-newsletter"], label: "Structure" },
      { key: "hasNewsletter", type: "bool", label: "Newsletter signup?" },
    ]
  },
  { id: "CTA", label: "CTA Section", icon: "◈", desc: "Call to action",
    fields: [
      { key: "structure", type: "pill", options: ["centered", "left-text-right-button", "with-background"], label: "Structure" },
    ]
  },
];

// Layout inspiration data — preserved for future standalone Sections step
export const LAYOUT_IDEAS = [
  {
    category: "Classic",
    items: [
      { name: "Single Column", desc: "centered single column, great for blogs and long reads", sketch: "┃  ████████  ┃" },
      { name: "Split Screen", desc: "50/50 split, one side fixed one scrolls", sketch: "┃████ ┃ ████┃" },
      { name: "Grid Cards", desc: "equal-width card grid, for portfolios and listings", sketch: "┃██ ██ ██┃" },
      { name: "Sidebar + Content", desc: "side nav + main content area", sketch: "┃██┃████████┃" },
    ],
  },
  {
    category: "Editorial",
    items: [
      { name: "Magazine Spread", desc: "large image + offset text, magazine-like feel", sketch: "┃██████      ┃\n┃    ████████┃" },
      { name: "Text Wrap", desc: "text flows around images, narrative feel", sketch: "┃████ ██████┃\n┃████ ██████┃" },
      { name: "Pull Quote", desc: "enlarged key quotes break reading rhythm", sketch: "┃  ████████  ┃\n┃    ██████  ┃" },
      { name: "Column Shift", desc: "content shifts between 2-3 columns, asymmetric but rhythmic", sketch: "┃████        ┃\n┃    ████████┃" },
    ],
  },
  {
    category: "Artistic",
    items: [
      { name: "Overlapping Layers", desc: "elements overlap with depth, collage-like", sketch: "┃  ████      ┃\n┃    ██████  ┃" },
      { name: "Broken Grid", desc: "intentionally breaking the grid, elements bleed out", sketch: "┃██          ┃\n┃      ██████┃" },
      { name: "Diagonal Flow", desc: "content along diagonals, guiding the eye", sketch: "┃██          ┃\n┃    ████    ┃\n┃        ████┃" },
      { name: "Scattered / Organic", desc: "freeform placement like items on a desk, composed chaos", sketch: "┃  ██    ██  ┃\n┃██    ██    ┃" },
      { name: "Full Bleed Sections", desc: "alternating full-width and narrow sections", sketch: "┃████████████┃\n┃  ████████  ┃" },
    ],
  },
  {
    category: "Immersive",
    items: [
      { name: "Scroll-Driven Story", desc: "scroll-driven narrative, each viewport is a scene", sketch: "┃  [scene 1] ┃\n┃  [scene 2] ┃" },
      { name: "Parallax Layers", desc: "foreground and background move at different speeds", sketch: "┃bg ▒▒▒▒▒▒▒▒ ┃\n┃fg ████████ ┃" },
      { name: "Horizontal Scroll", desc: "horizontal scrolling, like a gallery or storyboard", sketch: "┃██ → ██ → ██┃" },
      { name: "Sticky Reveal", desc: "sticky header with content sliding in from below", sketch: "┃  TITLE     ┃\n┃  ↑ content ┃" },
    ],
  },
  {
    category: "Minimal",
    items: [
      { name: "Giant Typography", desc: "oversized type IS the layout, almost no images", sketch: "┃ AAAA       ┃\n┃      BBBBB ┃" },
      { name: "Whitespace Canvas", desc: "generous whitespace, every element feels precious", sketch: "┃            ┃\n┃    ██      ┃\n┃            ┃" },
      { name: "Single Element Focus", desc: "one focal point per screen, extremely restrained", sketch: "┃            ┃\n┃     ██     ┃\n┃            ┃" },
    ],
  },
];
