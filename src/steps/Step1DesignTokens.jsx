import { useContext } from "react";
import { ThemeContext } from "../theme";
import Section from "../shared/Section";
import Input from "../shared/Input";
import ColorRow from "../shared/ColorRow";
import TypeRow from "../shared/TypeRow";
import Pill from "../shared/Pill";
import AddButton from "../shared/AddButton";

export default function Step1DesignTokens({ state, dispatch, openSub, toggleSub }) {
  const t = useContext(ThemeContext);
  const update = (key, value) => dispatch({ type: "SET_FIELD", key, value });

  const updateColor = (idx, color) => {
    dispatch({ type: "UPDATE_COLOR", index: idx, color });
  };
  const addColor = () => {
    dispatch({ type: "ADD_COLOR" });
  };
  const removeColor = (idx) => {
    dispatch({ type: "REMOVE_COLOR", index: idx });
  };
  const updateType = (idx, level) => {
    dispatch({ type: "UPDATE_TYPE_LEVEL", index: idx, level });
  };

  return (
    <>
      {/* Colors — single palette */}
      <Section number="1a" title="Colors" subtitle="调色板" isOpen={openSub.colors} onToggle={() => toggleSub("colors")} nested>
        {(state.colors || []).map((c, i) => (
          <ColorRow
            key={i}
            color={c}
            onChange={v => updateColor(i, v)}
            onRemove={() => removeColor(i)}
          />
        ))}
        <AddButton label="Add Color" onClick={addColor} />
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
