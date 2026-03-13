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
      { key: "library", type: "pill", options: ["Lucide", "Heroicons", "Phosphor", "Feather", "Tabler"], label: "Library", showIf: (config) => config.source === "library" },
      { key: "style", type: "pill", options: ["outline", "filled", "duotone"], label: "Style" },
      { key: "weight", type: "input", label: "Stroke Weight", placeholder: "1.5", mono: true, small: true },
    ]
  },
];

export const BLOCK_COMPONENTS = [
  { id: "Navbar", label: "Navbar", icon: "▔", desc: "Navigation bar", hasLayout: true,
    layouts: ["经典结构", "Minimal 极简"],
    fields: [
      { key: "layout", type: "pill", options: ["logo-left", "centered", "hamburger-only"], label: "Layout" },
      { key: "sticky", type: "bool", label: "Sticky?" },
      { key: "transparent", type: "bool", label: "Transparent background?" },
    ]
  },
  { id: "Hero", label: "Hero", icon: "◆", desc: "Hero section", hasLayout: true, hasVisualAsset: true,
    layouts: ["经典结构", "Editorial 编辑式", "Artistic 艺术感", "Immersive 沉浸式", "Minimal 极简"],
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
  { id: "Section", label: "Section", icon: "▭", desc: "Content section", hasLayout: true, hasVisualAsset: true,
    layouts: null, // all layouts available
    fields: [
      { key: "variant", type: "pill", options: ["centered", "left-image", "right-image", "full-width"], label: "Default Variant" },
    ]
  },
  { id: "Card", label: "Card", icon: "▢", desc: "Content card", hasLayout: true,
    layouts: ["经典结构", "Minimal 极简"],
    fields: [
      { key: "orientation", type: "pill", options: ["vertical", "horizontal"], label: "Orientation" },
      { key: "thumbnailRatio", type: "pill", options: ["16:9", "4:3", "3:2", "1:1"], label: "Thumbnail Ratio" },
      { key: "hoverEffect", type: "bool", label: "Hover effect?" },
    ]
  },
  { id: "Gallery", label: "Gallery / Grid", icon: "▦", desc: "Grid layout", hasLayout: true,
    layouts: ["经典结构", "Artistic 艺术感", "Minimal 极简"],
    fields: [
      { key: "columns", type: "pill", options: ["2", "3", "4"], label: "Columns" },
      { key: "style", type: "pill", options: ["grid", "masonry", "horizontal-scroll"], label: "Style" },
    ]
  },
  { id: "Footer", label: "Footer", icon: "▁", desc: "Page footer", hasLayout: true,
    layouts: ["经典结构", "Minimal 极简"],
    fields: [
      { key: "structure", type: "pill", options: ["simple", "multi-column", "multi-column-newsletter"], label: "Structure" },
      { key: "hasNewsletter", type: "bool", label: "Newsletter signup?" },
    ]
  },
  { id: "CTA", label: "CTA Section", icon: "◈", desc: "Call to action", hasLayout: true,
    layouts: ["经典结构", "Minimal 极简", "Artistic 艺术感"],
    fields: [
      { key: "structure", type: "pill", options: ["centered", "left-text-right-button", "with-background"], label: "Structure" },
    ]
  },
];

// Layout inspiration data (extracted from existing code)
export const LAYOUT_IDEAS = [
  {
    category: "经典结构",
    items: [
      { name: "Single Column", desc: "一栏居中，阅读感强，适合博客和长文", sketch: "┃  ████████  ┃" },
      { name: "Split Screen", desc: "左右对半，一侧固定一侧滚动", sketch: "┃████ ┃ ████┃" },
      { name: "Grid Cards", desc: "等宽卡片网格排列，适合作品集和列表", sketch: "┃██ ██ ██┃" },
      { name: "Sidebar + Content", desc: "侧边导航 + 主内容区", sketch: "┃██┃████████┃" },
    ],
  },
  {
    category: "Editorial 编辑式",
    items: [
      { name: "Magazine Spread", desc: "大图 + 文字错落排版，像杂志翻页的感觉", sketch: "┃██████      ┃\n┃    ████████┃" },
      { name: "Text Wrap", desc: "文字环绕图片流动，有叙事感", sketch: "┃████ ██████┃\n┃████ ██████┃" },
      { name: "Pull Quote", desc: "关键引文放大突出，打断阅读节奏制造停顿", sketch: "┃  ████████  ┃\n┃    ██████  ┃" },
      { name: "Column Shift", desc: "内容在2-3栏间交替偏移，不对称但有韵律", sketch: "┃████        ┃\n┃    ████████┃" },
    ],
  },
  {
    category: "Artistic 艺术感",
    items: [
      { name: "Overlapping Layers", desc: "元素互相叠加，有纵深感和层次感，像拼贴", sketch: "┃  ████      ┃\n┃    ██████  ┃" },
      { name: "Broken Grid", desc: "故意打破网格，元素出格、出血，张力十足", sketch: "┃██          ┃\n┃      ██████┃" },
      { name: "Diagonal Flow", desc: "内容沿对角线排列，视线被引导斜向移动", sketch: "┃██          ┃\n┃    ████    ┃\n┃        ████┃" },
      { name: "Scattered / Organic", desc: "像桌面上随意放置的物件，自由但有构图", sketch: "┃  ██    ██  ┃\n┃██    ██    ┃" },
      { name: "Full Bleed Sections", desc: "内容区交替全宽和窄宽，呼吸感很强", sketch: "┃████████████┃\n┃  ████████  ┃" },
    ],
  },
  {
    category: "Immersive 沉浸式",
    items: [
      { name: "Scroll-Driven Story", desc: "滚动驱动叙事，每个视口是一个场景", sketch: "┃  [scene 1] ┃\n┃  [scene 2] ┃" },
      { name: "Parallax Layers", desc: "前景和背景以不同速度移动，制造深度", sketch: "┃bg ▒▒▒▒▒▒▒▒ ┃\n┃fg ████████ ┃" },
      { name: "Horizontal Scroll", desc: "横向滚动，像画廊或电影分镜", sketch: "┃██ → ██ → ██┃" },
      { name: "Sticky Reveal", desc: "标题固定，内容从下方滑入替换", sketch: "┃  TITLE     ┃\n┃  ↑ content ┃" },
    ],
  },
  {
    category: "Minimal 极简",
    items: [
      { name: "Giant Typography", desc: "超大文字本身就是布局，几乎没有图片", sketch: "┃ AAAA       ┃\n┃      BBBBB ┃" },
      { name: "Whitespace Canvas", desc: "大量留白，内容像放在画布上，每个元素都珍贵", sketch: "┃            ┃\n┃    ██      ┃\n┃            ┃" },
      { name: "Single Element Focus", desc: "每屏只有一个焦点元素，极度克制", sketch: "┃            ┃\n┃     ██     ┃\n┃            ┃" },
    ],
  },
];
