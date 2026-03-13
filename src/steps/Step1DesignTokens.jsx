import { useContext } from "react";
import { ThemeContext } from "../theme";
import Section from "../shared/Section";
import Input from "../shared/Input";
import TextArea from "../shared/TextArea";
import ColorRow from "../shared/ColorRow";
import TypeRow from "../shared/TypeRow";
import Pill from "../shared/Pill";
import AddButton from "../shared/AddButton";

export default function Step1DesignTokens({ state, dispatch, openSub, toggleSub }) {
  const t = useContext(ThemeContext);
  const update = (key, value) => dispatch({ type: "SET_FIELD", key, value });

  const updateColor = (palette, idx, color) => {
    dispatch({ type: "UPDATE_COLOR", palette, index: idx, color });
  };
  const addColor = (palette) => {
    dispatch({ type: "ADD_COLOR", palette });
  };
  const removeColor = (palette, idx) => {
    dispatch({ type: "REMOVE_COLOR", palette, index: idx });
  };
  const updateType = (idx, level) => {
    dispatch({ type: "UPDATE_TYPE_LEVEL", index: idx, level });
  };

  const subLabel = (text) => (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10,
      color: t.accent,
      opacity: 0.5,
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: 12,
    }}>{text}</div>
  );

  return (
    <>
      {/* Colors */}
      <Section number="1a" title="Colors" subtitle="调色板" isOpen={openSub.colors} onToggle={() => toggleSub("colors")} nested>
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
            {state.colorMode === "dual" && subLabel("Dark Palette")}
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
            {state.colorMode === "dual" && subLabel("Light Palette")}
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
      <Section number="1c" title="Spacing & Layout" subtitle="间距与布局" isOpen={openSub.spacing} onToggle={() => toggleSub("spacing")} nested>
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

      {/* Micro-Details */}
      <Section number="1d" title="Micro-Details" subtitle="圆角 / 边框 / 阴影" isOpen={openSub.micro} onToggle={() => toggleSub("micro")} nested>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Input label="Border Radius (px)" value={state.borderRadius} onChange={v => update("borderRadius", v)} mono small />
          <Input label="Border Width (px)" value={state.borderWidth} onChange={v => update("borderWidth", v)} mono small />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{
            display: "block",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: t.label,
            marginBottom: 8,
            textTransform: "uppercase",
            letterSpacing: 1.5,
          }}>Border Color</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[...state.darkColors, ...state.lightColors].filter((c, i, arr) => arr.findIndex(x => x.value === c.value) === i).map((c, i) => (
              <div
                key={i}
                onClick={() => update("borderColor", c.value)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  cursor: "pointer",
                  padding: 4,
                  borderRadius: 6,
                  border: state.borderColor === c.value ? `2px solid ${t.accent}` : "2px solid transparent",
                  background: state.borderColor === c.value ? `${t.accent}15` : "transparent",
                }}
              >
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: c.value,
                  border: `1px solid ${t.border}`,
                }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 8,
                  color: t.dim,
                  maxWidth: 48,
                  textAlign: "center",
                  lineHeight: 1.2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>{c.name || c.value}</span>
              </div>
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
          }}>Shadow Levels</label>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["none", "sm", "md", "lg"].map(level => {
              const levels = (state.shadowLevels || "").split("/").map(s => s.trim()).filter(Boolean);
              const active = levels.includes(level);
              return (
                <Pill
                  key={level}
                  label={level}
                  active={active}
                  onClick={() => {
                    const next = active ? levels.filter(l => l !== level) : [...levels, level];
                    update("shadowLevels", next.join(" / "));
                  }}
                />
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
