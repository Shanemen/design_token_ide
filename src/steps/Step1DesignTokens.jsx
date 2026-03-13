import { useContext } from "react";
import { ThemeContext } from "../theme";
import Section from "../shared/Section";
import Input from "../shared/Input";
import ColorRow from "../shared/ColorRow";
import TypeRow from "../shared/TypeRow";
import Pill from "../shared/Pill";
import AddButton from "../shared/AddButton";

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
          gap: 8,
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
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Input label="Base Unit (px)" value={state.spacingUnit} onChange={v => update("spacingUnit", v)} mono small />
          <Input label="Max Width (px)" value={state.maxContentWidth} onChange={v => update("maxContentWidth", v)} mono small />
          <Input label="Grid Columns" value={state.gridColumns} onChange={v => update("gridColumns", v)} mono small />
        </div>
        <Input label="Spacing Scales" value={state.spacingScales} onChange={v => update("spacingScales", v)} placeholder="8 / 16 / 32 / 64" mono />

        {/* Density */}
        <div style={{ marginBottom: 16 }}>
          <label style={{
            display: "block",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: t.label,
            marginBottom: 8,
            textTransform: "uppercase",
            letterSpacing: 1.5,
          }}>Density</label>
          <div style={{ display: "flex", gap: 8 }}>
            <Pill label="airy" active={state.density === "airy"} onClick={() => update("density", "airy")} />
            <Pill label="balanced" active={state.density === "balanced"} onClick={() => update("density", "balanced")} />
            <Pill label="compact" active={state.density === "compact"} onClick={() => update("density", "compact")} />
          </div>
        </div>
      </Section>
    </>
  );
}
