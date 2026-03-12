export const STORAGE_KEY = "design-token-template";

export const defaultState = {
  projectName: "",
  // 1. Spacing & Layout
  spacingUnit: "8",
  spacingScales: "8 / 16 / 32 / 64",
  maxContentWidth: "1200",
  gridColumns: "12",
  layoutNotes: "",
  selectedLayout: "",
  // 2. Typography
  headingFont: "",
  bodyFont: "",
  typeLevels: [
    { name: "Display", size: "48", weight: "700", lineHeight: "1.1", font: "heading" },
    { name: "Heading", size: "28", weight: "600", lineHeight: "1.2", font: "heading" },
    { name: "Body", size: "16", weight: "400", lineHeight: "1.6", font: "body" },
    { name: "Caption", size: "13", weight: "400", lineHeight: "1.5", font: "body" },
  ],
  // 3. Color
  colorMode: "dual",
  darkColors: [
    { name: "Background", value: "#0A0A0F", usage: "主背景" },
    { name: "Surface", value: "#141419", usage: "卡片/容器背景" },
    { name: "Text Primary", value: "#E8E8ED", usage: "标题和主要文字" },
    { name: "Text Secondary", value: "#8A8A9A", usage: "正文和次要文字" },
    { name: "Accent", value: "#E8734A", usage: "CTA按钮、链接、强调" },
  ],
  lightColors: [
    { name: "Background", value: "#FAFAFA", usage: "主背景" },
    { name: "Surface", value: "#FFFFFF", usage: "卡片/容器背景" },
    { name: "Text Primary", value: "#1A1A2E", usage: "标题和主要文字" },
    { name: "Text Secondary", value: "#6B7094", usage: "正文和次要文字" },
    { name: "Accent", value: "#E8734A", usage: "CTA按钮、链接、强调" },
  ],
  // 4. Micro-Detail
  borderRadius: "8",
  borderWidth: "1",
  borderColor: "#222233",
  shadowLevels: "none / sm / md",
  // 5. Visual Assets & Texture
  heroVisual: "illustration",
  heroStyle: "",
  sectionIllustrations: false,
  sectionIllustrationNotes: "",
  imageStyle: "color",
  imageTreatment: "",
  iconSource: "library",
  iconLibrary: "Lucide",
  iconStyle: "outline",
  iconWeight: "1.5",
  cardThumbnailRatio: "16:9",
  cardThumbnailEffect: "",
  bgDecorations: "none",
  bgDecorationNotes: "",
  sectionDivider: "whitespace",
  avatarShape: "circle",
  avatarFilter: "color",
  logoTreatment: "",
  decorations: "",
  // 6. Motion Design
  motionLevel: "subtle",
  easingStyle: "ease-out",
  defaultDuration: "300",
  pageLoadAnimation: true,
  pageLoadStyle: "stagger-fade",
  scrollAnimation: false,
  scrollAnimationStyle: "",
  hoverEffects: true,
  hoverStyle: "opacity + lift",
  pageTransition: "none",
  microInteractions: "",
  motionNotes: "",
  // 7. Don't List
  dontList: "不用渐变\n不用投影超过2层\n不用超过2种字体\n不用纯黑 #000",
  // 8. Responsive
  breakpoints: "640 / 768 / 1024 / 1280",
  mobileFirst: true,
  // 9. States
  states: "default / hover / active / disabled / loading / empty",

  // Progressive preview: track which steps the user has visited
  visitedSections: {},

  // NEW: Step 0 Visual Direction
  moodboardLinks: [],
  toneDescription: "",
  visualAssetDirection: "mixed",

  // NEW: Step 1 density
  density: "balanced",

  // NEW: Step 2 Components
  activeComponent: null,
  components: {
    Button: { variants: ["primary", "secondary", "ghost"], sizes: ["sm", "md", "lg"] },
    Text: { notes: "" },
    Divider: { style: "line" },
    Badge: { variant: "filled" },
    Avatar: { shape: "circle", filter: "color" },
    Icon: { source: "library", library: "Lucide", style: "outline", weight: "1.5" },
    Navbar: { layout: "", sticky: true, transparent: false },
    Hero: { layout: "", visualType: "illustration", visualNotes: "" },
    Section: { layout: "", variant: "centered" },
    Card: { orientation: "vertical", thumbnailRatio: "16:9", hoverEffect: true },
    Gallery: { columns: 3, style: "grid" },
    Footer: { structure: "multi-column", hasNewsletter: false },
    CTA: { structure: "centered" },
  },
};
