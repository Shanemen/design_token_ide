import { useContext } from "react";
import { ThemeContext } from "../theme";
import Section from "../shared/Section";
import Input from "../shared/Input";
import ColorRow from "../shared/ColorRow";
import TypeRow from "../shared/TypeRow";
import Pill from "../shared/Pill";
import AddButton from "../shared/AddButton";
import { DENSITY_PRESETS, MAX_WIDTH_OPTIONS, SEMANTIC_LABELS } from "../spacingPresets";

const COLOR_ROLES = [
  { key: "bg", label: "Page background", desc: "页面底色、section 背景" },
  { key: "surface", label: "Surface", desc: "Card / Navbar / Footer / 输入框背景" },
  { key: "textPrimary", label: "Text primary", desc: "标题、导航链接、按钮文字" },
  { key: "textSecondary", label: "Text secondary", desc: "正文、副标题、placeholder" },
  { key: "accent", label: "Accent", desc: "CTA 按钮、链接、Badge、选中状态" },
  { key: "warning", label: "Warning", desc: "警告提示背景和文字" },
  { key: "success", label: "Success", desc: "成功提示背景和文字" },
];

export default function Step1DesignTokens({ state, dispatch, openSub, toggleSub }) {
  const t = useContext(ThemeContext);
  const update = (key, value) => dispatch({ type: "SET_FIELD", key, value });

  const updateType = (idx, level) => {
    dispatch({ type: "UPDATE_TYPE_LEVEL", index: idx, level });
  };

  return (
    <>
      {/* Colors — fixed semantic roles */}
      <Section number="1a" title="Colors" subtitle="调色板" isOpen={openSub.colors} onToggle={() => toggleSub("colors")} nested>
        {COLOR_ROLES.map(role => (
          <ColorRow
            key={role.key}
            label={role.label}
            description={role.desc}
            value={(state.colors || {})[role.key] || ""}
            onChange={v => dispatch({ type: "UPDATE_COLOR", key: role.key, value: v })}
          />
        ))}
      </Section>

      {/* Typography */}
      <Section number="1b" title="Typography" subtitle="文字层级" isOpen={openSub.typography} onToggle={() => toggleSub("typography")} nested>
        <div style={{ display: "flex", gap: t.gap.md, flexWrap: "wrap", marginBottom: t.font.lg + 1 }}>
          <Input label="Heading Font" value={state.headingFont} onChange={v => update("headingFont", v)} placeholder="e.g. Syne, Playfair Display" />
          <Input label="Body Font" value={state.bodyFont} onChange={v => update("bodyFont", v)} placeholder="e.g. JetBrains Mono, Inter" />
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: t.font.sm,
          color: t.dim,
          marginBottom: t.font.xs,
          display: "flex",
          gap: t.gap.sm,
          paddingRight: 26,
        }}>
          <span style={{ flex: "1 1 80px" }}>NAME</span>
          <span style={{ flex: "0 0 50px", textAlign: "center" }}>SIZE</span>
          <span style={{ flex: "0 0 50px", textAlign: "center" }}>WEIGHT</span>
          <span style={{ flex: "0 0 50px", textAlign: "center" }}>L-H</span>
        </div>
        {state.typeLevels.map((lv, i) => (
          <TypeRow
            key={i}
            level={lv}
            onChange={v => updateType(i, v)}
            onRemove={() => update("typeLevels", state.typeLevels.filter((_, j) => j !== i))}
          />
        ))}
        <AddButton label="Add Level" onClick={() => update("typeLevels", [...state.typeLevels, { name: "", size: "", weight: "400", lineHeight: "1.5", font: "body" }])} />
      </Section>

      {/* Spacing */}
      <Section number="1c" title="Spacing" subtitle="间距" isOpen={openSub.spacing} onToggle={() => toggleSub("spacing")} nested>
        {/* Density — required, pick one */}
        <div style={{ marginBottom: t.space.lg }}>
          <label style={{
            display: "block",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: t.font.sm,
            color: t.label,
            marginBottom: t.gap.sm,
            textTransform: "uppercase",
            letterSpacing: 1.5,
          }}>Density</label>
          <div style={{ display: "flex", gap: t.gap.sm }}>
            {Object.entries(DENSITY_PRESETS).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => update("density", key)}
                style={{
                  flex: 1,
                  padding: `${t.font.xs}px ${t.space.md}px`,
                  borderRadius: t.radius.md,
                  border: state.density === key ? `1px solid ${t.pillActiveBorder}` : `1px solid ${t.pillBorder}`,
                  background: state.density === key ? t.pillActiveBg : "transparent",
                  color: state.density === key ? t.pillActiveText : t.pillText,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: t.font.base, fontWeight: 600, marginBottom: 2 }}>
                  {preset.label}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: t.font.xs, opacity: 0.7 }}>
                  {preset.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Derived spacing scale — read-only reference */}
        {(() => {
          const preset = DENSITY_PRESETS[state.density || "balanced"];
          return (
            <div style={{ marginBottom: t.space.lg }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: t.font.xxs,
                color: t.dim,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                marginBottom: t.space.sm,
                opacity: 0.6,
              }}>DERIVED SPACING</div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: `2px ${t.gap.lg}px`,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: t.font.xs,
                color: t.dim,
                opacity: 0.7,
              }}>
                {SEMANTIC_LABELS.map(({ key, css, label }) => (
                  <div key={key} style={{ display: "flex", justifyContent: "space-between", padding: "2px 0" }}>
                    <span style={{ opacity: 0.6 }}>{label}</span>
                    <span>{preset.semantic[key]}px</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Max Content Width — required, pick one */}
        <div style={{ marginBottom: t.gap.lg }}>
          <label style={{
            display: "block",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: t.font.sm,
            color: t.label,
            marginBottom: t.gap.sm,
            textTransform: "uppercase",
            letterSpacing: 1.5,
          }}>Max Content Width</label>
          <div style={{ display: "flex", gap: t.gap.sm }}>
            {MAX_WIDTH_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => update("maxContentWidth", opt.value)}
                style={{
                  flex: 1,
                  padding: `${t.font.xs}px ${t.space.md}px`,
                  borderRadius: t.radius.md,
                  border: state.maxContentWidth === opt.value ? `1px solid ${t.pillActiveBorder}` : `1px solid ${t.pillBorder}`,
                  background: state.maxContentWidth === opt.value ? t.pillActiveBg : "transparent",
                  color: state.maxContentWidth === opt.value ? t.pillActiveText : t.pillText,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: t.font.base, fontWeight: 600, marginBottom: 2 }}>
                  {opt.label}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: t.font.xs, opacity: 0.7 }}>
                  {opt.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
