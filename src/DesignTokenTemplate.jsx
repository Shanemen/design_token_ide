import { useState, useRef, createContext, useContext } from "react";

const themes = {
  light: {
    bg: "#F5F5F7",
    surface: "#FFFFFF",
    text: "#1A1A2E",
    accent: "#D45A2A",
    accentText: "#fff",
    accentBg: "#D45A2A12",
    accentBorder: "#D45A2A",
    label: "#777",
    muted: "#666",
    dim: "#999",
    faint: "#AAA",
    border: "#E0E0E0",
    borderLight: "#D0D0D0",
    inputBg: "#FAFAFA",
    focusBorder: "#D45A2A",
    blurBorder: "#E0E0E0",
    successBg: "#e8f5e9",
    successText: "#2e7d32",
    pillBorder: "#E0E0E0",
    pillActiveBorder: "#D45A2A",
    pillActiveBg: "#D45A2A12",
    pillActiveText: "#D45A2A",
    pillText: "#888",
    selectBg: "#FAFAFA",
    selectBorder: "#E0E0E0",
    selectText: "#666",
    swatchBorder: "#D0D0D0",
    removeBtnColor: "#BBB",
  },
  dark: {
    bg: "#0A0A0F",
    surface: "#111116",
    text: "#E8E8ED",
    accent: "#E8734A",
    accentText: "#fff",
    accentBg: "#E8734A18",
    accentBorder: "#E8734A",
    label: "#666",
    muted: "#888",
    dim: "#555",
    faint: "#444",
    border: "#222233",
    borderLight: "#333",
    inputBg: "#0A0A0F",
    focusBorder: "#E8734A55",
    blurBorder: "#222233",
    successBg: "#1a3a1a",
    successText: "#4ade80",
    pillBorder: "#222233",
    pillActiveBorder: "#E8734A",
    pillActiveBg: "#E8734A18",
    pillActiveText: "#E8734A",
    pillText: "#666",
    selectBg: "#0A0A0F",
    selectBorder: "#222233",
    selectText: "#888",
    swatchBorder: "#333",
    removeBtnColor: "#444",
  },
};

const ThemeContext = createContext(themes.light);

const STORAGE_KEY = "design-token-template";

const defaultState = {
  projectName: "",
  // 1. Spacing & Layout
  spacingUnit: "8",
  spacingScales: "8 / 16 / 32 / 64",
  maxContentWidth: "1200",
  gridColumns: "12",
  layoutNotes: "",
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
};

function Section({ number, title, subtitle, children, isOpen, onToggle }) {
  const t = useContext(ThemeContext);
  return (
    <div style={{
      marginBottom: 2,
      background: isOpen ? t.surface : "transparent",
      borderRadius: 12,
      border: isOpen ? `1px solid ${t.border}` : "1px solid transparent",
      transition: "all 0.2s ease",
    }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "18px 22px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: t.accent,
          opacity: 0.8,
          minWidth: 24,
        }}>
          {String(number).padStart(2, "0")}
        </span>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 17,
          fontWeight: 500,
          color: t.text,
          flex: 1,
        }}>
          {title}
        </span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: t.dim,
          marginRight: 8,
        }}>
          {subtitle}
        </span>
        <span style={{
          color: t.dim,
          fontSize: 18,
          transition: "transform 0.2s",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        }}>
          ▾
        </span>
      </button>
      {isOpen && (
        <div style={{ padding: "4px 22px 24px 60px" }}>
          {children}
        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange, placeholder, mono, small }) {
  const t = useContext(ThemeContext);
  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <label style={{
          display: "block",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: t.label,
          marginBottom: 6,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}>
          {label}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: small ? 120 : "100%",
          padding: "10px 14px",
          background: t.inputBg,
          border: `1px solid ${t.border}`,
          borderRadius: 6,
          color: t.text,
          fontSize: 14,
          fontFamily: mono ? "'JetBrains Mono', monospace" : "'Space Grotesk', sans-serif",
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.2s",
        }}
        onFocus={e => e.target.style.borderColor = t.focusBorder}
        onBlur={e => e.target.style.borderColor = t.blurBorder}
      />
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder, rows = 4 }) {
  const t = useContext(ThemeContext);
  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <label style={{
          display: "block",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: t.label,
          marginBottom: 6,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}>
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: "100%",
          padding: "10px 14px",
          background: t.inputBg,
          border: `1px solid ${t.border}`,
          borderRadius: 6,
          color: t.text,
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          outline: "none",
          resize: "vertical",
          boxSizing: "border-box",
          lineHeight: 1.7,
        }}
        onFocus={e => e.target.style.borderColor = t.focusBorder}
        onBlur={e => e.target.style.borderColor = t.blurBorder}
      />
    </div>
  );
}

function ColorRow({ color, onChange, onRemove }) {
  const t = useContext(ThemeContext);
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 10,
      flexWrap: "wrap",
    }}>
      <div style={{ position: "relative", width: 36, height: 36, flexShrink: 0 }}>
        <div style={{
          width: 36, height: 36,
          borderRadius: 8,
          background: color.value,
          border: `1px solid ${t.swatchBorder}`,
        }} />
        <input
          type="color"
          value={color.value}
          onChange={e => onChange({ ...color, value: e.target.value })}
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: 36, height: 36,
            opacity: 0,
            cursor: "pointer",
          }}
        />
      </div>
      <input
        value={color.name}
        onChange={e => onChange({ ...color, name: e.target.value })}
        placeholder="名称"
        style={{
          width: 120,
          padding: "8px 10px",
          background: t.inputBg,
          border: `1px solid ${t.border}`,
          borderRadius: 6,
          color: t.text,
          fontSize: 13,
          fontFamily: "'Space Grotesk', sans-serif",
          outline: "none",
        }}
      />
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        color: t.label,
        minWidth: 70,
      }}>
        {color.value}
      </span>
      <input
        value={color.usage}
        onChange={e => onChange({ ...color, usage: e.target.value })}
        placeholder="用途"
        style={{
          flex: 1,
          minWidth: 100,
          padding: "8px 10px",
          background: t.inputBg,
          border: `1px solid ${t.border}`,
          borderRadius: 6,
          color: t.muted,
          fontSize: 12,
          fontFamily: "'JetBrains Mono', monospace",
          outline: "none",
        }}
      />
      <button
        onClick={onRemove}
        style={{
          background: "none",
          border: "none",
          color: t.removeBtnColor,
          fontSize: 18,
          cursor: "pointer",
          padding: "0 4px",
        }}
      >
        ×
      </button>
    </div>
  );
}

function TypeRow({ level, onChange, onRemove }) {
  const t = useContext(ThemeContext);
  const inputStyle = {
    padding: "8px 10px",
    background: t.inputBg,
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    color: t.text,
    fontSize: 13,
    fontFamily: "'JetBrains Mono', monospace",
    outline: "none",
    textAlign: "center",
  };
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 10,
      flexWrap: "wrap",
    }}>
      <input
        value={level.name}
        onChange={e => onChange({ ...level, name: e.target.value })}
        placeholder="名称"
        style={{ ...inputStyle, width: 100, fontFamily: "'Space Grotesk', sans-serif", textAlign: "left" }}
      />
      <input value={level.size} onChange={e => onChange({ ...level, size: e.target.value })} placeholder="px" style={{ ...inputStyle, width: 56 }} />
      <input value={level.weight} onChange={e => onChange({ ...level, weight: e.target.value })} placeholder="wt" style={{ ...inputStyle, width: 56 }} />
      <input value={level.lineHeight} onChange={e => onChange({ ...level, lineHeight: e.target.value })} placeholder="lh" style={{ ...inputStyle, width: 56 }} />
      <select
        value={level.font}
        onChange={e => onChange({ ...level, font: e.target.value })}
        style={{
          padding: "8px 10px",
          background: t.selectBg,
          border: `1px solid ${t.selectBorder}`,
          borderRadius: 6,
          color: t.selectText,
          fontSize: 12,
          fontFamily: "'JetBrains Mono', monospace",
          outline: "none",
        }}
      >
        <option value="heading">heading</option>
        <option value="body">body</option>
      </select>
      <button
        onClick={onRemove}
        style={{
          background: "none",
          border: "none",
          color: t.removeBtnColor,
          fontSize: 18,
          cursor: "pointer",
          padding: "0 4px",
        }}
      >
        ×
      </button>
    </div>
  );
}

function Pill({ label, active, onClick }) {
  const t = useContext(ThemeContext);
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 14px",
        borderRadius: 20,
        border: active ? `1px solid ${t.pillActiveBorder}` : `1px solid ${t.pillBorder}`,
        background: active ? t.pillActiveBg : "transparent",
        color: active ? t.pillActiveText : t.pillText,
        fontSize: 13,
        fontFamily: "'JetBrains Mono', monospace",
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );
}

function AddButton({ onClick, label }) {
  const t = useContext(ThemeContext);
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        borderRadius: 6,
        border: `1px dashed ${t.borderLight}`,
        background: "transparent",
        color: t.dim,
        fontSize: 13,
        fontFamily: "'JetBrains Mono', monospace",
        cursor: "pointer",
        transition: "all 0.15s",
        marginTop: 4,
      }}
      onMouseEnter={e => { e.target.style.borderColor = t.focusBorder; e.target.style.color = t.accent; }}
      onMouseLeave={e => { e.target.style.borderColor = t.borderLight; e.target.style.color = t.dim; }}
    >
      + {label}
    </button>
  );
}

export default function DesignTokenTemplate() {
  const [state, setState] = useState(defaultState);
  const [openSections, setOpenSections] = useState({ 1: true });
  const [exported, setExported] = useState(false);
  const [mode, setMode] = useState("light");
  const [showPreview, setShowPreview] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const outputRef = useRef(null);

  const t = themes[mode];

  const update = (key, value) => setState(s => ({ ...s, [key]: value }));
  const toggle = (n) => setOpenSections(s => ({ ...s, [n]: !s[n] }));

  const updateColor = (palette, idx, color) => {
    const key = palette === "dark" ? "darkColors" : "lightColors";
    const next = [...state[key]];
    next[idx] = color;
    update(key, next);
  };

  const addColor = (palette) => {
    const key = palette === "dark" ? "darkColors" : "lightColors";
    update(key, [...state[key], { name: "", value: "#333344", usage: "" }]);
  };

  const removeColor = (palette, idx) => {
    const key = palette === "dark" ? "darkColors" : "lightColors";
    update(key, state[key].filter((_, j) => j !== idx));
  };

  const updateType = (idx, level) => {
    const next = [...state.typeLevels];
    next[idx] = level;
    update("typeLevels", next);
  };

  const generateOutput = () => {
    const lines = [];
    lines.push(`# Design Tokens — ${state.projectName || "Untitled Project"}`);
    lines.push(`\n## Spacing & Layout`);
    lines.push(`- Base unit: ${state.spacingUnit}px`);
    lines.push(`- Scales: ${state.spacingScales}`);
    lines.push(`- Max width: ${state.maxContentWidth}px`);
    lines.push(`- Grid: ${state.gridColumns} columns`);
    if (state.layoutNotes) lines.push(`- Notes: ${state.layoutNotes}`);

    lines.push(`\n## Typography`);
    lines.push(`- Heading font: ${state.headingFont || "(未定)"}`);
    lines.push(`- Body font: ${state.bodyFont || "(未定)"}`);
    lines.push(`- Levels:`);
    state.typeLevels.forEach(t => {
      lines.push(`  - ${t.name}: ${t.size}px / ${t.weight} / ${t.lineHeight} (${t.font})`);
    });

    lines.push(`\n## Colors`);
    lines.push(`- Mode: ${state.colorMode}`);
    if (state.colorMode === "dark-only" || state.colorMode === "dual") {
      lines.push(`- Dark palette:`);
      state.darkColors.forEach(c => {
        lines.push(`  - ${c.name}: ${c.value} → ${c.usage}`);
      });
    }
    if (state.colorMode === "light-only" || state.colorMode === "dual") {
      lines.push(`- Light palette:`);
      state.lightColors.forEach(c => {
        lines.push(`  - ${c.name}: ${c.value} → ${c.usage}`);
      });
    }

    lines.push(`\n## Micro-Details`);
    lines.push(`- Border radius: ${state.borderRadius}px`);
    lines.push(`- Border: ${state.borderWidth}px ${state.borderColor}`);
    lines.push(`- Shadows: ${state.shadowLevels}`);

    lines.push(`\n## Visual Assets`);
    lines.push(`- Hero visual: ${state.heroVisual}`);
    if (state.heroStyle) lines.push(`  - Style: ${state.heroStyle}`);
    lines.push(`- Section illustrations: ${state.sectionIllustrations ? "yes" : "no"}`);
    if (state.sectionIllustrations && state.sectionIllustrationNotes) lines.push(`  - Notes: ${state.sectionIllustrationNotes}`);
    lines.push(`- Photo style: ${state.imageStyle}`);
    if (state.imageTreatment) lines.push(`  - Treatment: ${state.imageTreatment}`);
    lines.push(`- Icons: ${state.iconSource}${state.iconSource === "library" ? ` (${state.iconLibrary})` : ""} / ${state.iconStyle} / stroke ${state.iconWeight}`);
    lines.push(`- Card thumbnails: ${state.cardThumbnailRatio}`);
    if (state.cardThumbnailEffect) lines.push(`  - Effect: ${state.cardThumbnailEffect}`);
    lines.push(`- Background decorations: ${state.bgDecorations}`);
    if (state.bgDecorations !== "none" && state.bgDecorationNotes) lines.push(`  - Details: ${state.bgDecorationNotes}`);
    lines.push(`- Section divider: ${state.sectionDivider}`);
    lines.push(`- Avatar: ${state.avatarShape} / ${state.avatarFilter}`);
    if (state.logoTreatment) lines.push(`- Logo: ${state.logoTreatment}`);
    if (state.decorations) lines.push(`- Other notes: ${state.decorations}`);

    lines.push(`\n## Motion Design`);
    lines.push(`- Motion level: ${state.motionLevel}`);
    lines.push(`- Easing: ${state.easingStyle}`);
    lines.push(`- Default duration: ${state.defaultDuration}ms`);
    if (state.pageLoadAnimation) {
      lines.push(`- Page load: yes → ${state.pageLoadStyle}`);
    } else {
      lines.push(`- Page load: no`);
    }
    if (state.scrollAnimation) {
      lines.push(`- Scroll animation: yes${state.scrollAnimationStyle ? ` → ${state.scrollAnimationStyle}` : ""}`);
    } else {
      lines.push(`- Scroll animation: no`);
    }
    if (state.hoverEffects) {
      lines.push(`- Hover effects: yes → ${state.hoverStyle}`);
    } else {
      lines.push(`- Hover effects: no`);
    }
    lines.push(`- Page transitions: ${state.pageTransition}`);
    if (state.microInteractions) lines.push(`- Micro-interactions: ${state.microInteractions}`);
    if (state.motionNotes) lines.push(`- Notes: ${state.motionNotes}`);

    lines.push(`\n## Constraints (不做什么)`);
    state.dontList.split("\n").filter(Boolean).forEach(d => {
      lines.push(`- ${d}`);
    });

    lines.push(`\n## Responsive`);
    lines.push(`- Breakpoints: ${state.breakpoints}`);
    lines.push(`- Strategy: ${state.mobileFirst ? "mobile-first" : "desktop-first"}`);

    lines.push(`\n## Component States`);
    lines.push(`- ${state.states}`);

    return lines.join("\n");
  };

  const handleExport = () => {
    const output = generateOutput();
    navigator.clipboard.writeText(output).then(() => {
      setExported(true);
      setTimeout(() => setExported(false), 2000);
    }).catch(() => {
      setExported(true);
      setTimeout(() => setExported(false), 2000);
    });
  };

  return (
    <ThemeContext.Provider value={t}>
    <div style={{
      minHeight: "100vh",
      background: t.bg,
      color: t.text,
      fontFamily: "'Space Grotesk', sans-serif",
      transition: "background 0.3s, color 0.3s",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: t.accent,
              letterSpacing: 3,
              textTransform: "uppercase",
              opacity: 0.7,
            }}>
              Design Token Template
            </div>
            <button
              onClick={() => setMode(m => m === "light" ? "dark" : "light")}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                border: `1px solid ${t.border}`,
                background: t.surface,
                color: t.dim,
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {mode === "light" ? "☽ Dark" : "☀ Light"}
            </button>
          </div>
          <input
            value={state.projectName}
            onChange={e => update("projectName", e.target.value)}
            placeholder="Project Name"
            style={{
              width: "100%",
              padding: 0,
              background: "none",
              border: "none",
              color: t.text,
              fontSize: 36,
              fontWeight: 600,
              fontFamily: "'Space Grotesk', sans-serif",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: t.faint,
            marginTop: 12,
          }}>
            填完 → 复制 → 粘贴给 AI → 让它帮你建组件
          </div>
        </div>

        {/* Sections */}
        <Section number={1} title="Spacing & Layout" subtitle="间距与布局" isOpen={openSections[1]} onToggle={() => toggle(1)}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Input label="Base Unit (px)" value={state.spacingUnit} onChange={v => update("spacingUnit", v)} mono small />
            <Input label="Max Width (px)" value={state.maxContentWidth} onChange={v => update("maxContentWidth", v)} mono small />
            <Input label="Grid Columns" value={state.gridColumns} onChange={v => update("gridColumns", v)} mono small />
          </div>
          <Input label="Spacing Scales" value={state.spacingScales} onChange={v => update("spacingScales", v)} placeholder="8 / 16 / 32 / 64" mono />

          {/* Layout Inspiration */}
          <div style={{ marginBottom: 14 }}>
            <label style={{
              display: "block",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: t.label,
              marginBottom: 10,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}>Layout Inspiration — 点击添加到 notes</label>

            {(() => {
              const layoutIdeas = [
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

              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {layoutIdeas.map((cat, ci) => (
                    <div key={ci}>
                      <div style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        color: t.accent,
                        opacity: 0.5,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}>{cat.category}</div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {cat.items.map((item, ii) => (
                          <button
                            key={ii}
                            onClick={() => {
                              const addition = state.layoutNotes
                                ? `\n${item.name}: ${item.desc}`
                                : `${item.name}: ${item.desc}`;
                              update("layoutNotes", state.layoutNotes + addition);
                            }}
                            style={{
                              flex: "1 1 calc(50% - 4px)",
                              minWidth: 200,
                              padding: "12px 14px",
                              borderRadius: 8,
                              border: `1px solid ${state.layoutNotes.includes(item.name) ? t.accent + "50" : t.border}`,
                              background: state.layoutNotes.includes(item.name) ? `${t.accent}08` : t.inputBg,
                              cursor: "pointer",
                              textAlign: "left",
                              transition: "all 0.15s",
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                              <div style={{ flex: 1 }}>
                                <div style={{
                                  fontFamily: "'Space Grotesk', sans-serif",
                                  fontSize: 13,
                                  fontWeight: 500,
                                  color: t.text,
                                  marginBottom: 4,
                                }}>
                                  {item.name}
                                  {state.layoutNotes.includes(item.name) && (
                                    <span style={{ color: t.accent, marginLeft: 6, fontSize: 11 }}>✓</span>
                                  )}
                                </div>
                                <div style={{
                                  fontFamily: "'JetBrains Mono', monospace",
                                  fontSize: 11,
                                  color: t.muted,
                                  lineHeight: 1.5,
                                }}>{item.desc}</div>
                              </div>
                              <pre style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 8,
                                color: t.dim,
                                lineHeight: 1.4,
                                margin: 0,
                                flexShrink: 0,
                                opacity: 0.7,
                              }}>{item.sketch}</pre>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>

          <TextArea label="Layout Notes" value={state.layoutNotes} onChange={v => update("layoutNotes", v)} placeholder="点击上面的灵感卡片自动添加，或手动输入…" rows={4} />
        </Section>

        <Section number={2} title="Typography" subtitle="文字层级" isOpen={openSections[2]} onToggle={() => toggle(2)}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
            <Input label="Heading Font" value={state.headingFont} onChange={v => update("headingFont", v)} placeholder="e.g. Syne, Playfair Display" />
            <Input label="Body Font" value={state.bodyFont} onChange={v => update("bodyFont", v)} placeholder="e.g. JetBrains Mono, Inter" />
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: t.dim,
            marginBottom: 10,
            display: "flex",
            gap: 36,
          }}>
            <span style={{ width: 100 }}>NAME</span>
            <span style={{ width: 56, textAlign: "center" }}>SIZE</span>
            <span style={{ width: 56, textAlign: "center" }}>WEIGHT</span>
            <span style={{ width: 56, textAlign: "center" }}>L-H</span>
            <span>FONT</span>
          </div>
          {state.typeLevels.map((t, i) => (
            <TypeRow
              key={i}
              level={t}
              onChange={v => updateType(i, v)}
              onRemove={() => update("typeLevels", state.typeLevels.filter((_, j) => j !== i))}
            />
          ))}
          <AddButton label="Add Level" onClick={() => update("typeLevels", [...state.typeLevels, { name: "", size: "", weight: "400", lineHeight: "1.5", font: "body" }])} />
        </Section>

        <Section number={3} title="Colors" subtitle="调色板" isOpen={openSections[3]} onToggle={() => toggle(3)}>
          {/* Mode selector */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: "block",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: t.label,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}>Color Mode</label>
            <div style={{ display: "flex", gap: 8 }}>
              <Pill label="single (dark)" active={state.colorMode === "dark-only"} onClick={() => update("colorMode", "dark-only")} />
              <Pill label="single (light)" active={state.colorMode === "light-only"} onClick={() => update("colorMode", "light-only")} />
              <Pill label="dual (dark + light)" active={state.colorMode === "dual"} onClick={() => update("colorMode", "dual")} />
            </div>
          </div>

          {/* Dark palette */}
          {(state.colorMode === "dark-only" || state.colorMode === "dual") && (
            <div style={{ marginBottom: state.colorMode === "dual" ? 28 : 0 }}>
              {state.colorMode === "dual" && (
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: t.accent,
                  opacity: 0.5,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}>Dark Palette</div>
              )}
              {state.darkColors.map((c, i) => (
                <ColorRow
                  key={`dark-${i}`}
                  color={c}
                  onChange={v => updateColor("dark", i, v)}
                  onRemove={() => removeColor("dark", i)}
                />
              ))}
              <AddButton label="Add Color" onClick={() => addColor("dark")} />
            </div>
          )}

          {/* Light palette */}
          {(state.colorMode === "light-only" || state.colorMode === "dual") && (
            <div>
              {state.colorMode === "dual" && (
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: t.accent,
                  opacity: 0.5,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}>Light Palette</div>
              )}
              {state.lightColors.map((c, i) => (
                <ColorRow
                  key={`light-${i}`}
                  color={c}
                  onChange={v => updateColor("light", i, v)}
                  onRemove={() => removeColor("light", i)}
                />
              ))}
              <AddButton label="Add Color" onClick={() => addColor("light")} />
            </div>
          )}
        </Section>

        <Section number={4} title="Micro-Details" subtitle="圆角 / 边框 / 阴影" isOpen={openSections[4]} onToggle={() => toggle(4)}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Input label="Border Radius (px)" value={state.borderRadius} onChange={v => update("borderRadius", v)} mono small />
            <Input label="Border Width (px)" value={state.borderWidth} onChange={v => update("borderWidth", v)} mono small />
          </div>
          <Input label="Border Color" value={state.borderColor} onChange={v => update("borderColor", v)} mono />
          <Input label="Shadow Levels" value={state.shadowLevels} onChange={v => update("shadowLevels", v)} placeholder="none / sm / md / lg" mono />
        </Section>

        <Section number={5} title="Visual Assets" subtitle="视觉素材清单" isOpen={openSections[5]} onToggle={() => toggle(5)}>
          {/* Subsection label helper */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.accent,
            opacity: 0.5,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
          }}>A. Hero 主视觉</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: t.label,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}>Hero Visual Type</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { id: "illustration", canAI: false },
                { id: "3d-render", canAI: false },
                { id: "photography", canAI: false },
                { id: "abstract-graphic", canAI: true },
                { id: "animation", canAI: true },
                { id: "none", canAI: true },
              ].map(item => (
                <Pill key={item.id} label={`${item.id}${item.canAI ? "" : " ⚑"}`} active={state.heroVisual === item.id} onClick={() => update("heroVisual", item.id)} />
              ))}
            </div>

            {/* Capability hint */}
            {(() => {
              const hints = {
                "illustration": {
                  canCode: false,
                  message: "CC 无法生成插画。你需要先用 AI 工具生成好图片，再交给 CC 集成。",
                  tools: ["Midjourney", "DALL·E", "Ideogram", "Recraft"],
                  action: "生成插画 → 下载 PNG/SVG → 上传给 CC",
                },
                "3d-render": {
                  canCode: false,
                  message: "CC 无法生成 3D 资产。你需要用 3D 工具先做好，导出图片或模型文件。",
                  tools: ["Spline", "Blender", "Tripo AI", "Meshy"],
                  action: "建模/渲染 → 导出 PNG 或 GLB → 上传给 CC",
                },
                "photography": {
                  canCode: false,
                  message: "CC 无法生成照片。你需要自己拍摄或使用素材库。CC 可以帮你做裁切、滤镜、响应式适配。",
                  tools: ["Unsplash", "Pexels", "自己拍摄"],
                  action: "选好照片 → 上传给 CC 做后处理",
                },
                "abstract-graphic": {
                  canCode: true,
                  message: "CC 可以完全用代码生成（SVG / CSS / Canvas）。你只需要描述风格。",
                  tools: [],
                  action: "直接用自然语言描述你想要的效果",
                },
                "animation": {
                  canCode: true,
                  message: "CC 可以用 CSS / Framer Motion / Canvas 生成动画。描述效果即可。",
                  tools: [],
                  action: "描述动画效果和节奏",
                },
              };
              const hint = hints[state.heroVisual];
              if (!hint) return null;
              return (
                <div style={{
                  marginTop: 12,
                  padding: "12px 16px",
                  borderRadius: 8,
                  background: hint.canCode ? `${t.accent}10` : `${t.accent}08`,
                  border: `1px solid ${hint.canCode ? `${t.accent}30` : `${t.accent}20`}`,
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                  }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      fontWeight: 500,
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: hint.canCode ? "#22c55e20" : `${t.accent}20`,
                      color: hint.canCode ? "#22c55e" : t.accent,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                    }}>
                      {hint.canCode ? "✓ CC can code" : "⚑ needs assets"}
                    </span>
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: t.muted,
                    lineHeight: 1.6,
                    marginBottom: hint.tools.length > 0 ? 8 : 0,
                  }}>
                    {hint.message}
                  </div>
                  {hint.tools.length > 0 && (
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: t.dim,
                      lineHeight: 1.6,
                    }}>
                      <span style={{ color: t.label }}>推荐工具：</span> {hint.tools.join(" / ")}
                      <br />
                      <span style={{ color: t.label }}>流程：</span> {hint.action}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
          <Input label="Hero Style Notes" value={state.heroStyle} onChange={v => update("heroStyle", v)} placeholder="比如：黑色线条手绘、bubble gum 3D、极简几何…" />

          {/* Section Illustrations */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.accent,
            opacity: 0.5,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
            marginTop: 24,
          }}>B. Section 配图</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: t.label,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}>Section Illustrations?</label>
            <div style={{ display: "flex", gap: 8 }}>
              <Pill label="yes" active={state.sectionIllustrations} onClick={() => update("sectionIllustrations", true)} />
              <Pill label="no" active={!state.sectionIllustrations} onClick={() => update("sectionIllustrations", false)} />
            </div>
          </div>
          {state.sectionIllustrations && (
            <TextArea label="Notes" value={state.sectionIllustrationNotes} onChange={v => update("sectionIllustrationNotes", v)} placeholder="每个 section 都有？还是只有重点的？风格跟 hero 统一吗？" rows={2} />
          )}

          {/* Image Treatment */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.accent,
            opacity: 0.5,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
            marginTop: 24,
          }}>C. 图片处理</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: t.label,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}>Photo Style</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["color", "grayscale", "duotone", "b&w"].map(s => (
                <Pill key={s} label={s} active={state.imageStyle === s} onClick={() => update("imageStyle", s)} />
              ))}
            </div>
          </div>
          <Input label="Treatment" value={state.imageTreatment} onChange={v => update("imageTreatment", v)} placeholder="比如：有边框、圆角裁切、叠加滤镜、无处理…" />

          {/* Icons */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.accent,
            opacity: 0.5,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
            marginTop: 24,
          }}>D. 图标</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: t.label,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}>Source</label>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { id: "library", label: "library", canAI: true },
                { id: "custom-ai", label: "custom-ai ⚑", canAI: false },
                { id: "custom-hand", label: "custom-hand ⚑", canAI: false },
              ].map(item => (
                <Pill key={item.id} label={item.label} active={state.iconSource === item.id} onClick={() => update("iconSource", item.id)} />
              ))}
            </div>

            {/* Icon source hint */}
            {state.iconSource === "library" && (
              <div style={{
                marginTop: 10,
                padding: "8px 12px",
                borderRadius: 6,
                background: "#22c55e10",
                border: "1px solid #22c55e20",
              }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "#22c55e",
                }}>✓ CC 可以直接使用 npm 图标库，无需额外素材</span>
              </div>
            )}
            {(state.iconSource === "custom-ai" || state.iconSource === "custom-hand") && (
              <div style={{
                marginTop: 10,
                padding: "8px 12px",
                borderRadius: 6,
                background: `${t.accent}08`,
                border: `1px solid ${t.accent}20`,
              }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: t.muted,
                  lineHeight: 1.6,
                }}>
                  <span style={{ color: t.accent }}>⚑ needs assets</span> — {state.iconSource === "custom-ai" ? "用 AI 工具（Recraft / IconifyAI）生成 SVG，上传给 CC" : "手绘或在 Figma 里画好，导出 SVG，上传给 CC"}
                </span>
              </div>
            )}
          </div>
          {state.iconSource === "library" && (
            <Input label="Library Name" value={state.iconLibrary} onChange={v => update("iconLibrary", v)} placeholder="Lucide / Phosphor / Heroicons / Tabler" />
          )}
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: t.label,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}>Icon Style</label>
            <div style={{ display: "flex", gap: 8 }}>
              {["outline", "filled", "duotone", "custom"].map(s => (
                <Pill key={s} label={s} active={state.iconStyle === s} onClick={() => update("iconStyle", s)} />
              ))}
            </div>
          </div>
          <Input label="Stroke Weight" value={state.iconWeight} onChange={v => update("iconWeight", v)} mono small />

          {/* Card Thumbnails */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.accent,
            opacity: 0.5,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
            marginTop: 24,
          }}>E. 卡片封面</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: t.label,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}>Aspect Ratio</label>
            <div style={{ display: "flex", gap: 8 }}>
              {["16:9", "4:3", "3:2", "1:1"].map(s => (
                <Pill key={s} label={s} active={state.cardThumbnailRatio === s} onClick={() => update("cardThumbnailRatio", s)} />
              ))}
            </div>
          </div>
          <Input label="Hover / Overlay Effect" value={state.cardThumbnailEffect} onChange={v => update("cardThumbnailEffect", v)} placeholder="比如：hover 放大、叠加颜色、无效果…" />

          {/* Background Decorations */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.accent,
            opacity: 0.5,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
            marginTop: 24,
          }}>F. 背景装饰</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: t.label,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}>Background Decorations</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["none", "gradient-blobs", "noise-texture", "grid-lines", "geometric", "custom"].map(s => (
                <Pill key={s} label={s} active={state.bgDecorations === s} onClick={() => update("bgDecorations", s)} />
              ))}
            </div>
          </div>
          {state.bgDecorations !== "none" && (
            <TextArea label="Details" value={state.bgDecorationNotes} onChange={v => update("bgDecorationNotes", v)} placeholder="描述具体效果…" rows={2} />
          )}

          {/* Section Dividers */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.accent,
            opacity: 0.5,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
            marginTop: 24,
          }}>G. 分割与过渡</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: t.label,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}>Section Divider</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["whitespace", "thin-line", "thick-line", "wave-svg", "color-change", "custom"].map(s => (
                <Pill key={s} label={s} active={state.sectionDivider === s} onClick={() => update("sectionDivider", s)} />
              ))}
            </div>
          </div>

          {/* Avatars */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.accent,
            opacity: 0.5,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
            marginTop: 24,
          }}>H. 人物照片 / Avatar</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
            <div>
              <label style={{
                display: "block",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: t.label,
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}>Shape</label>
              <div style={{ display: "flex", gap: 8 }}>
                {["circle", "rounded-square", "square"].map(s => (
                  <Pill key={s} label={s} active={state.avatarShape === s} onClick={() => update("avatarShape", s)} />
                ))}
              </div>
            </div>
            <div>
              <label style={{
                display: "block",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: t.label,
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}>Filter</label>
              <div style={{ display: "flex", gap: 8 }}>
                {["color", "grayscale", "b&w"].map(s => (
                  <Pill key={s} label={s} active={state.avatarFilter === s} onClick={() => update("avatarFilter", s)} />
                ))}
              </div>
            </div>
          </div>

          {/* Logo */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.accent,
            opacity: 0.5,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
            marginTop: 24,
          }}>I. Logo 处理</div>
          <Input value={state.logoTreatment} onChange={v => update("logoTreatment", v)} placeholder="比如：合作方 logo 统一灰度处理、自己 logo 用强调色…" />

          {/* Extra notes */}
          <div style={{ marginTop: 24 }}>
            <TextArea label="Other Visual Notes" value={state.decorations} onChange={v => update("decorations", v)} placeholder="其他视觉相关的备注…" rows={2} />
          </div>
        </Section>

        <Section number={6} title="Motion Design" subtitle="动效" isOpen={openSections[6]} onToggle={() => toggle(6)}>
          {/* Overall Motion Level */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.accent,
            opacity: 0.5,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
          }}>A. 整体动效程度</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: t.label,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}>Motion Level</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["none", "subtle", "moderate", "expressive"].map(s => (
                <Pill key={s} label={s} active={state.motionLevel === s} onClick={() => update("motionLevel", s)} />
              ))}
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: t.faint,
              marginTop: 8,
              lineHeight: 1.6,
            }}>
              {state.motionLevel === "none" && "完全静态，无任何动画"}
              {state.motionLevel === "subtle" && "只有基础过渡：hover 反馈、淡入淡出"}
              {state.motionLevel === "moderate" && "页面加载动画 + 滚动触发 + hover 效果"}
              {state.motionLevel === "expressive" && "丰富动效：编排式入场、滚动驱动、复杂交互"}
            </div>
          </div>

          {/* Easing & Duration */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.accent,
            opacity: 0.5,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
            marginTop: 24,
          }}>B. 节奏与手感</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
            <div>
              <label style={{
                display: "block",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: t.label,
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}>Easing</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["ease-out", "ease-in-out", "spring", "linear"].map(s => (
                  <Pill key={s} label={s} active={state.easingStyle === s} onClick={() => update("easingStyle", s)} />
                ))}
              </div>
            </div>
          </div>
          <Input label="Default Duration (ms)" value={state.defaultDuration} onChange={v => update("defaultDuration", v)} placeholder="200 / 300 / 500" mono small />

          {/* Page Load */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.accent,
            opacity: 0.5,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
            marginTop: 24,
          }}>C. 页面加载动画</div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <Pill label="yes" active={state.pageLoadAnimation} onClick={() => update("pageLoadAnimation", true)} />
              <Pill label="no" active={!state.pageLoadAnimation} onClick={() => update("pageLoadAnimation", false)} />
            </div>
            {state.pageLoadAnimation && (
              <div>
                <label style={{
                  display: "block",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: t.label,
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                }}>Style</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["stagger-fade", "slide-up", "scale-in", "clip-reveal", "custom"].map(s => (
                    <Pill key={s} label={s} active={state.pageLoadStyle === s} onClick={() => update("pageLoadStyle", s)} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Scroll Animations */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.accent,
            opacity: 0.5,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
            marginTop: 24,
          }}>D. 滚动触发动画</div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <Pill label="yes" active={state.scrollAnimation} onClick={() => update("scrollAnimation", true)} />
              <Pill label="no" active={!state.scrollAnimation} onClick={() => update("scrollAnimation", false)} />
            </div>
            {state.scrollAnimation && (
              <Input label="Scroll Animation Style" value={state.scrollAnimationStyle} onChange={v => update("scrollAnimationStyle", v)} placeholder="比如：fade-up on enter、parallax、sticky reveal…" />
            )}
          </div>

          {/* Hover Effects */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.accent,
            opacity: 0.5,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
            marginTop: 24,
          }}>E. Hover 效果</div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <Pill label="yes" active={state.hoverEffects} onClick={() => update("hoverEffects", true)} />
              <Pill label="no" active={!state.hoverEffects} onClick={() => update("hoverEffects", false)} />
            </div>
            {state.hoverEffects && (
              <Input label="Hover Style" value={state.hoverStyle} onChange={v => update("hoverStyle", v)} placeholder="比如：opacity change、scale up、color shift、underline slide…" />
            )}
          </div>

          {/* Page Transitions */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.accent,
            opacity: 0.5,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
            marginTop: 24,
          }}>F. 页面间过渡</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: t.label,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}>Page Transition</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["none", "crossfade", "slide", "morph", "custom"].map(s => (
                <Pill key={s} label={s} active={state.pageTransition === s} onClick={() => update("pageTransition", s)} />
              ))}
            </div>
          </div>

          {/* Micro-interactions */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.accent,
            opacity: 0.5,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
            marginTop: 24,
          }}>G. 微交互</div>
          <Input value={state.microInteractions} onChange={v => update("microInteractions", v)} placeholder="比如：按钮点击缩放、toggle 弹性、input focus 发光…" />

          {/* Motion Notes */}
          <div style={{ marginTop: 24 }}>
            <TextArea label="Motion Notes" value={state.motionNotes} onChange={v => update("motionNotes", v)} placeholder="其他动效备注，比如：用 Framer Motion 还是纯 CSS…" rows={2} />
          </div>
        </Section>

        <Section number={7} title="Constraints" subtitle="不做什么" isOpen={openSections[7]} onToggle={() => toggle(7)}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: t.accent,
            opacity: 0.6,
            marginBottom: 10,
          }}>
            ← 对 AI 最重要的一节。红线越清楚，AI 越不会乱来
          </div>
          <TextArea value={state.dontList} onChange={v => update("dontList", v)} placeholder="每行一条约束…" rows={6} />
        </Section>

        <Section number={8} title="Responsive" subtitle="响应式" isOpen={openSections[8]} onToggle={() => toggle(8)}>
          <Input label="Breakpoints (px)" value={state.breakpoints} onChange={v => update("breakpoints", v)} placeholder="640 / 768 / 1024 / 1280" mono />
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: t.label,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}>Strategy</label>
            <div style={{ display: "flex", gap: 8 }}>
              <Pill label="mobile-first" active={state.mobileFirst} onClick={() => update("mobileFirst", true)} />
              <Pill label="desktop-first" active={!state.mobileFirst} onClick={() => update("mobileFirst", false)} />
            </div>
          </div>
        </Section>

        <Section number={9} title="Component States" subtitle="交互状态" isOpen={openSections[9]} onToggle={() => toggle(9)}>
          <Input value={state.states} onChange={v => update("states", v)} placeholder="default / hover / active / disabled / loading / empty" mono />
        </Section>

        {/* Live Preview */}
        <div style={{
          marginTop: 24,
          borderRadius: 12,
          border: `1px solid ${t.border}`,
          overflow: "hidden",
        }}>
          <button
            onClick={() => setShowPreview(p => !p)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 22px",
              background: t.surface,
              border: "none",
              cursor: "pointer",
            }}
          >
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 16,
              fontWeight: 500,
              color: t.text,
            }}>
              Live Preview
            </span>
            <span style={{
              color: t.dim,
              fontSize: 18,
              transition: "transform 0.2s",
              transform: showPreview ? "rotate(180deg)" : "rotate(0deg)",
            }}>▾</span>
          </button>

          {showPreview && (() => {
            const hFont = state.headingFont || "Space Grotesk";
            const bFont = state.bodyFont || "JetBrains Mono";
            const googleFonts = [hFont, bFont].filter(f => f && !["JetBrains Mono", "Space Grotesk"].includes(f)).map(f => f.replace(/ /g, "+")).join("&family=");
            const previewColors = state.colorMode === "light-only" ? state.lightColors : state.darkColors;
            const previewBg = previewColors.find(c => c.name.toLowerCase().includes("background"))?.value || "#0A0A0F";
            const previewSurface = previewColors.find(c => c.name.toLowerCase().includes("surface"))?.value || "#141419";
            const previewTextPrimary = previewColors.find(c => c.name.toLowerCase().includes("primary"))?.value || "#E8E8ED";
            const previewTextSecondary = previewColors.find(c => c.name.toLowerCase().includes("secondary"))?.value || "#8A8A9A";
            const previewAccent = previewColors.find(c => c.name.toLowerCase().includes("accent"))?.value || "#E8734A";
            // For dual mode, also extract light palette
            const lightColors = state.lightColors;
            const lightBg = lightColors.find(c => c.name.toLowerCase().includes("background"))?.value || "#FAFAFA";
            const lightSurface = lightColors.find(c => c.name.toLowerCase().includes("surface"))?.value || "#FFFFFF";
            const lightTextPrimary = lightColors.find(c => c.name.toLowerCase().includes("primary"))?.value || "#1A1A2E";
            const lightTextSecondary = lightColors.find(c => c.name.toLowerCase().includes("secondary"))?.value || "#6B7094";
            const lightAccent = lightColors.find(c => c.name.toLowerCase().includes("accent"))?.value || "#E8734A";
            const radius = parseInt(state.borderRadius) || 8;
            const bw = parseInt(state.borderWidth) || 1;
            const bc = state.borderColor || "#222233";
            const spacings = state.spacingScales.split("/").map(s => parseInt(s.trim())).filter(Boolean);
            const dur = parseInt(state.defaultDuration) || 300;
            const easing = state.easingStyle === "spring" ? "cubic-bezier(0.34, 1.56, 0.64, 1)" : state.easingStyle === "ease-out" ? "cubic-bezier(0.22, 1, 0.36, 1)" : state.easingStyle === "ease-in-out" ? "cubic-bezier(0.45, 0, 0.55, 1)" : "linear";
            const useStagger = state.pageLoadAnimation && state.pageLoadStyle === "stagger-fade";
            const useSlideUp = state.pageLoadAnimation && state.pageLoadStyle === "slide-up";
            const useScaleIn = state.pageLoadAnimation && state.pageLoadStyle === "scale-in";

            return (
              <div style={{ padding: "24px 22px", background: t.bg }}>
                {googleFonts && <link href={`https://fonts.googleapis.com/css2?family=${googleFonts}&display=swap`} rel="stylesheet" />}

                {/* Typography Preview */}
                <div style={{ marginBottom: 32 }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: t.accent,
                    opacity: 0.6,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}>Typography</div>
                  <div style={{
                    padding: 24,
                    background: previewBg,
                    borderRadius: radius,
                    border: `${bw}px solid ${bc}`,
                  }}>
                    {state.typeLevels.map((lv, i) => (
                      <div key={i} style={{
                        marginBottom: i < state.typeLevels.length - 1 ? 16 : 0,
                        display: "flex",
                        alignItems: "baseline",
                        gap: 16,
                      }}>
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10,
                          color: previewTextSecondary,
                          minWidth: 60,
                          opacity: 0.6,
                        }}>{lv.name || "—"}</span>
                        <span style={{
                          fontFamily: `'${lv.font === "heading" ? hFont : bFont}', sans-serif`,
                          fontSize: `${lv.size || 16}px`,
                          fontWeight: lv.weight || 400,
                          lineHeight: lv.lineHeight || 1.5,
                          color: previewTextPrimary,
                        }}>
                          The quick brown fox
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Palette */}
                <div style={{ marginBottom: 32 }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: t.accent,
                    opacity: 0.6,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}>Colors</div>

                  {state.colorMode === "dual" ? (
                    <div style={{ display: "flex", gap: 12 }}>
                      {/* Dark palette preview */}
                      <div style={{
                        flex: 1,
                        padding: 16,
                        background: state.darkColors.find(c => c.name.toLowerCase().includes("background"))?.value || "#0A0A0F",
                        borderRadius: radius,
                        border: `${bw}px solid ${bc}`,
                      }}>
                        <div style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 9,
                          color: state.darkColors.find(c => c.name.toLowerCase().includes("secondary"))?.value || "#8A8A9A",
                          letterSpacing: 2,
                          textTransform: "uppercase",
                          marginBottom: 12,
                          opacity: 0.7,
                        }}>Dark</div>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {state.darkColors.map((c, i) => (
                            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                              <div style={{
                                width: 40, height: 40,
                                borderRadius: Math.max(radius - 2, 2),
                                background: c.value,
                                border: `1px solid ${t.border}`,
                              }} />
                              <span style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 8,
                                color: state.darkColors.find(cc => cc.name.toLowerCase().includes("secondary"))?.value || "#8A8A9A",
                                textAlign: "center",
                                maxWidth: 48,
                                opacity: 0.8,
                              }}>{c.name || "—"}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Light palette preview */}
                      <div style={{
                        flex: 1,
                        padding: 16,
                        background: lightBg,
                        borderRadius: radius,
                        border: `${bw}px solid #E0E0E0`,
                      }}>
                        <div style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 9,
                          color: lightTextSecondary,
                          letterSpacing: 2,
                          textTransform: "uppercase",
                          marginBottom: 12,
                          opacity: 0.7,
                        }}>Light</div>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {state.lightColors.map((c, i) => (
                            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                              <div style={{
                                width: 40, height: 40,
                                borderRadius: Math.max(radius - 2, 2),
                                background: c.value,
                                border: "1px solid #E0E0E0",
                              }} />
                              <span style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 8,
                                color: lightTextSecondary,
                                textAlign: "center",
                                maxWidth: 48,
                                opacity: 0.8,
                              }}>{c.name || "—"}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {previewColors.map((c, i) => (
                        <div key={i} style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 8,
                        }}>
                          <div style={{
                            width: 56,
                            height: 56,
                            borderRadius: radius,
                            background: c.value,
                            border: `1px solid ${t.border}`,
                          }} />
                          <span style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 10,
                            color: t.dim,
                            textAlign: "center",
                            maxWidth: 64,
                          }}>{c.name || "—"}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Spacing Preview */}
                {spacings.length > 0 && (
                  <div style={{ marginBottom: 32 }}>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      color: t.accent,
                      opacity: 0.6,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      marginBottom: 16,
                    }}>Spacing Scale</div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
                      {spacings.map((sp, i) => (
                        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                          <div style={{
                            width: sp,
                            height: sp,
                            maxWidth: 80,
                            maxHeight: 80,
                            borderRadius: Math.min(radius, 4),
                            background: previewAccent,
                            opacity: 0.25 + (i * 0.18),
                          }} />
                          <span style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 10,
                            color: t.dim,
                          }}>{sp}px</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Component Preview */}
                <div style={{ marginBottom: 32 }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      color: t.accent,
                      opacity: 0.6,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                    }}>Component Preview</div>
                    {state.pageLoadAnimation && (
                      <button
                        onClick={() => setReplayKey(k => k + 1)}
                        style={{
                          padding: "4px 12px",
                          borderRadius: 12,
                          border: `1px solid ${t.border}`,
                          background: "transparent",
                          color: t.dim,
                          fontSize: 11,
                          fontFamily: "'JetBrains Mono', monospace",
                          cursor: "pointer",
                        }}
                      >
                        ▶ replay animation
                      </button>
                    )}
                  </div>

                  <style>{`
                    @keyframes previewFadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
                    @keyframes previewSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
                    @keyframes previewScaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
                    .preview-card:hover .preview-card-inner { opacity: 0.85; transform: translateY(-2px); }
                  `}</style>

                  <div key={replayKey} style={{
                    padding: 32,
                    background: previewBg,
                    borderRadius: radius,
                    border: `${bw}px solid ${bc}`,
                    display: "flex",
                    flexDirection: "column",
                    gap: spacings[2] || 32,
                  }}>
                    {/* Mini nav */}
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      animation: state.pageLoadAnimation ? `${useSlideUp ? "previewSlideUp" : useScaleIn ? "previewScaleIn" : "previewFadeIn"} ${dur}ms ${easing} both` : "none",
                    }}>
                      <span style={{
                        fontFamily: `'${hFont}', sans-serif`,
                        fontSize: 18,
                        fontWeight: 600,
                        color: previewTextPrimary,
                      }}>Logo</span>
                      <div style={{ display: "flex", gap: spacings[1] || 16 }}>
                        {["About", "Work", "Contact"].map(item => (
                          <span key={item} style={{
                            fontFamily: `'${bFont}', monospace`,
                            fontSize: 13,
                            color: previewTextSecondary,
                            cursor: "pointer",
                          }}>{item}</span>
                        ))}
                      </div>
                    </div>

                    {/* Mini hero */}
                    <div style={{
                      animation: state.pageLoadAnimation ? `${useSlideUp ? "previewSlideUp" : useScaleIn ? "previewScaleIn" : "previewFadeIn"} ${dur}ms ${easing} ${useStagger ? `${dur * 0.3}ms` : "0ms"} both` : "none",
                    }}>
                      {state.typeLevels[0] && (
                        <div style={{
                          fontFamily: `'${hFont}', sans-serif`,
                          fontSize: Math.min(parseInt(state.typeLevels[0].size) || 48, 36),
                          fontWeight: state.typeLevels[0].weight || 700,
                          lineHeight: state.typeLevels[0].lineHeight || 1.1,
                          color: previewTextPrimary,
                          marginBottom: spacings[1] || 16,
                        }}>
                          Design with intent
                        </div>
                      )}
                      <div style={{
                        fontFamily: `'${bFont}', monospace`,
                        fontSize: parseInt(state.typeLevels[2]?.size) || 16,
                        lineHeight: state.typeLevels[2]?.lineHeight || 1.6,
                        color: previewTextSecondary,
                        maxWidth: "80%",
                      }}>
                        A preview of your design tokens working together in harmony.
                      </div>
                    </div>

                    {/* Mini cards */}
                    <div style={{
                      display: "flex",
                      gap: spacings[1] || 16,
                      animation: state.pageLoadAnimation ? `${useSlideUp ? "previewSlideUp" : useScaleIn ? "previewScaleIn" : "previewFadeIn"} ${dur}ms ${easing} ${useStagger ? `${dur * 0.6}ms` : "0ms"} both` : "none",
                    }}>
                      {[1, 2].map(n => (
                        <div key={n} className="preview-card" style={{
                          flex: 1,
                          padding: spacings[1] || 16,
                          background: previewSurface,
                          borderRadius: radius,
                          border: `${bw}px solid ${bc}`,
                          cursor: "pointer",
                          transition: `all ${dur}ms ${easing}`,
                        }}>
                          <div className="preview-card-inner" style={{ transition: `all ${dur}ms ${easing}` }}>
                            <div style={{
                              width: "100%",
                              height: 48,
                              borderRadius: Math.max(radius - 4, 2),
                              background: `${previewAccent}18`,
                              marginBottom: spacings[0] || 8,
                            }} />
                            <div style={{
                              fontFamily: `'${hFont}', sans-serif`,
                              fontSize: parseInt(state.typeLevels[1]?.size) || 18,
                              fontWeight: state.typeLevels[1]?.weight || 600,
                              color: previewTextPrimary,
                              marginBottom: 4,
                            }}>Card Title {n}</div>
                            <div style={{
                              fontFamily: `'${bFont}', monospace`,
                              fontSize: parseInt(state.typeLevels[3]?.size) || 13,
                              color: previewTextSecondary,
                            }}>Caption text here</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Mini button */}
                    <div style={{
                      animation: state.pageLoadAnimation ? `${useSlideUp ? "previewSlideUp" : useScaleIn ? "previewScaleIn" : "previewFadeIn"} ${dur}ms ${easing} ${useStagger ? `${dur * 0.9}ms` : "0ms"} both` : "none",
                    }}>
                      <button style={{
                        padding: `${spacings[0] || 8}px ${spacings[1] || 16}px`,
                        borderRadius: radius,
                        border: "none",
                        background: previewAccent,
                        color: "#fff",
                        fontFamily: `'${bFont}', monospace`,
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: `all ${dur}ms ${easing}`,
                        letterSpacing: 0.5,
                      }}>Get Started</button>
                      <button style={{
                        marginLeft: spacings[0] || 8,
                        padding: `${spacings[0] || 8}px ${spacings[1] || 16}px`,
                        borderRadius: radius,
                        border: `${bw}px solid ${bc}`,
                        background: "transparent",
                        color: previewTextSecondary,
                        fontFamily: `'${bFont}', monospace`,
                        fontSize: 13,
                        cursor: "pointer",
                        transition: `all ${dur}ms ${easing}`,
                      }}>Learn More</button>
                    </div>
                  </div>
                </div>

                {/* Micro Details Preview */}
                <div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: t.accent,
                    opacity: 0.6,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}>Micro Details</div>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                    }}>
                      <div style={{
                        width: 56,
                        height: 56,
                        borderRadius: radius,
                        background: previewSurface,
                        border: `${bw}px solid ${bc}`,
                      }} />
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        color: t.dim,
                      }}>radius: {state.borderRadius}px</span>
                    </div>
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                    }}>
                      <div style={{
                        width: 56,
                        height: 56,
                        borderRadius: radius,
                        background: previewSurface,
                        border: `${bw}px solid ${bc}`,
                        boxShadow: state.shadowLevels.includes("md") ? `0 4px 12px ${previewBg}40` : state.shadowLevels.includes("sm") ? `0 2px 6px ${previewBg}30` : "none",
                      }} />
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        color: t.dim,
                      }}>shadow</span>
                    </div>
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                    }}>
                      <div style={{
                        width: 56,
                        height: 56,
                        borderRadius: radius,
                        background: previewAccent,
                      }} />
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        color: t.dim,
                      }}>accent</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Export */}
        <div style={{
          marginTop: 40,
          padding: 24,
          background: t.surface,
          borderRadius: 12,
          border: `1px solid ${t.border}`,
        }}>
          <button
            onClick={handleExport}
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: 8,
              border: "none",
              background: exported ? t.successBg : t.accent,
              color: exported ? t.successText : t.accentText,
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "'Space Grotesk', sans-serif",
              cursor: "pointer",
              transition: "all 0.2s",
              letterSpacing: 0.5,
            }}
          >
            {exported ? "✓ Copied to Clipboard" : "Export as Text → Copy to Clipboard"}
          </button>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: t.faint,
            marginTop: 12,
            textAlign: "center",
          }}>
            复制后粘贴给 Claude Code：「根据这份 token，帮我建基础组件」
          </div>
        </div>
      </div>
    </div>
    </ThemeContext.Provider>
  );
}
