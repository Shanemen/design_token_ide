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
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <span style={{ fontSize: 22, color: t.accent, opacity: 0.7 }}>▭</span>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 17,
            fontWeight: 600,
            color: t.text,
          }}>Border</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: t.dim,
          }}>Default: {defaultWidth}px · <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: bc, verticalAlign: "middle" }} /> (set in Design Tokens)</div>
        </div>
        <button
          onClick={onBack}
          style={{
            background: "transparent",
            border: `1px solid ${t.border}`,
            color: t.dim,
            fontSize: 11,
            fontFamily: "'JetBrains Mono', monospace",
            cursor: "pointer",
            padding: "5px 12px",
            borderRadius: 8,
            transition: "all 0.15s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.dim; }}
        >← Back</button>
      </div>

      {/* Default values */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        <Input label="Border Width (px)" value={state.borderWidth} onChange={v => update("borderWidth", v)} mono small />
      </div>
      <div style={{ marginBottom: 20 }}>
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
          {(state.colors || []).map((c, i) => (
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

      {/* Per-component toggles */}
      <label style={{
        display: "block",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        color: t.label,
        marginBottom: 12,
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
              gap: 12,
              marginBottom: 8,
              padding: "10px 14px",
              borderRadius: 8,
              background: isOn ? `${t.accent}08` : "transparent",
              border: `1px solid ${isOn ? t.accent + "30" : t.border}`,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            <div style={{
              width: 18, height: 18, borderRadius: 4,
              border: `2px solid ${isOn ? t.accent : t.dim + "50"}`,
              background: isOn ? t.accent : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
              flexShrink: 0,
            }}>
              {isOn && <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: t.text,
              }}>{id}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: t.dim,
              }}>{desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
