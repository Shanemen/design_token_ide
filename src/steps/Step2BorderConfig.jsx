import { useContext } from "react";
import { ThemeContext } from "../theme";
import Input from "../shared/Input";

const BORDER_COMPONENTS = [
  { id: "Card", desc: "Content card border", defaultOn: true },
  { id: "Divider", desc: "Visual separator line", defaultOn: true },
  { id: "Button", desc: "Outline / ghost variants", defaultOn: true },
  { id: "Avatar", desc: "Profile image border", defaultOn: false },
];

export default function Step2BorderConfig({ state, dispatch, onBack }) {
  const t = useContext(ThemeContext);
  const update = (key, value) => dispatch({ type: "SET_FIELD", key, value });
  const borderComps = state.borderComponents || {};
  const defaultWidth = state.borderWidth || "1";
  const bc = state.borderColor || "#222233";

  const toggle = (compId) => {
    dispatch({
      type: "SET_FIELD",
      key: "borderComponents",
      value: { ...borderComps, [compId]: !borderComps[compId] },
    });
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: t.gap.md, marginBottom: t.space.lg }}>
        <span style={{ fontSize: t.font.xl, color: t.accent, opacity: 0.7 }}>▭</span>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: t.font.lg,
            fontWeight: 600,
            color: t.text,
          }}>Border</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: t.font.sm,
            color: t.dim,
          }}>Default: {defaultWidth}px · <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: bc, verticalAlign: "middle" }} /> (set in Design Tokens)</div>
        </div>
        <button
          onClick={onBack}
          style={{
            background: "transparent",
            border: `1px solid ${t.border}`,
            color: t.dim,
            fontSize: t.font.sm,
            fontFamily: "'JetBrains Mono', monospace",
            cursor: "pointer",
            padding: `${t.space.sm}px ${t.space.md}px`,
            borderRadius: t.radius.md,
            transition: "all 0.15s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.dim; }}
        >← Back</button>
      </div>

      {/* Default values */}
      <div style={{ display: "flex", gap: t.gap.md, flexWrap: "wrap", marginBottom: t.gap.lg }}>
        <Input label="Border Width (px)" value={state.borderWidth} onChange={v => update("borderWidth", v)} mono small />
      </div>
      <div style={{ marginBottom: t.space.lg }}>
        <label style={{
          display: "block",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: t.font.sm,
          color: t.label,
          marginBottom: t.gap.sm,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}>Border Color</label>
        <div style={{ display: "flex", gap: t.gap.sm, flexWrap: "wrap" }}>
          {[
            { key: "bg", label: "bg" },
            { key: "surface", label: "surface" },
            { key: "textPrimary", label: "text 1°" },
            { key: "textSecondary", label: "text 2°" },
            { key: "accent", label: "accent" },
            { key: "warning", label: "warning" },
            { key: "success", label: "success" },
          ].map(role => {
            const val = (state.colors || {})[role.key] || "";
            return (
              <div
                key={role.key}
                onClick={() => update("borderColor", val)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: t.gap.xs,
                  cursor: "pointer",
                  padding: t.space.xs,
                  borderRadius: t.radius.sm,
                  border: state.borderColor === val ? `2px solid ${t.accent}` : "2px solid transparent",
                  background: state.borderColor === val ? `${t.accent}15` : "transparent",
                }}
              >
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: val,
                  border: `1px solid ${t.border}`,
                }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: t.font.xxs,
                  color: t.dim,
                  maxWidth: 48,
                  textAlign: "center",
                  lineHeight: 1.2,
                }}>{role.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Per-component toggles */}
      <label style={{
        display: "block",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: t.font.sm,
        color: t.label,
        marginBottom: t.space.md,
        textTransform: "uppercase",
        letterSpacing: 1.5,
      }}>Show Border On</label>

      {BORDER_COMPONENTS.map(({ id, desc, defaultOn }) => {
        const isOn = borderComps[id] !== undefined ? borderComps[id] : defaultOn;
        return (
          <div
            key={id}
            onClick={() => toggle(id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: t.gap.md,
              marginBottom: t.gap.sm,
              padding: `${t.font.xs}px ${t.font.md}px`,
              borderRadius: t.radius.md,
              background: isOn ? `${t.accent}08` : "transparent",
              border: `1px solid ${isOn ? t.accent + "30" : t.border}`,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            <div style={{
              width: 18, height: 18, borderRadius: t.radius.sm - 2,
              border: `2px solid ${isOn ? t.accent : t.dim + "50"}`,
              background: isOn ? t.accent : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
              flexShrink: 0,
            }}>
              {isOn && <span style={{ color: "#fff", fontSize: t.font.sm, fontWeight: 700 }}>✓</span>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: t.font.base,
                fontWeight: 500,
                color: t.text,
              }}>{id}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: t.font.xs,
                color: t.dim,
              }}>{desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
