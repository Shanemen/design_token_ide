import { useContext } from "react";
import { ThemeContext } from "../theme";
import Input from "../shared/Input";

const RADIUS_COMPONENTS = ["Button", "Badge", "Avatar", "Card"];

export default function Step2RadiusConfig({ state, dispatch, onBack }) {
  const t = useContext(ThemeContext);
  const overrides = state.radiusOverrides || {};
  const defaultRadius = state.borderRadius || "8";

  const setOverride = (compId, value) => {
    dispatch({ type: "SET_FIELD", key: "radiusOverrides", value: { ...overrides, [compId]: value } });
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <span style={{ fontSize: 22, color: t.accent, opacity: 0.7 }}>◰</span>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 17,
            fontWeight: 600,
            color: t.text,
          }}>Border Radius</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: t.dim,
          }}>Default: {defaultRadius}px (set in Design Tokens)</div>
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

      {/* Default value */}
      <div style={{ marginBottom: 20 }}>
        <Input label="Default Radius (px)" value={state.borderRadius} onChange={v => dispatch({ type: "SET_FIELD", key: "borderRadius", value: v })} mono small />
      </div>

      {/* Per-component overrides */}
      <label style={{
        display: "block",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        color: t.label,
        marginBottom: 12,
        textTransform: "uppercase",
        letterSpacing: 1.5,
      }}>Component Overrides</label>

      {RADIUS_COMPONENTS.map(compId => (
        <div key={compId} style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 10,
          padding: "8px 12px",
          borderRadius: 8,
          background: overrides[compId] ? `${t.accent}08` : "transparent",
          border: `1px solid ${overrides[compId] ? t.accent + "30" : t.border}`,
        }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            color: t.text,
            minWidth: 70,
          }}>{compId}</span>
          <input
            value={overrides[compId] || ""}
            onChange={e => setOverride(compId, e.target.value)}
            placeholder={defaultRadius}
            style={{
              width: 60,
              padding: "4px 8px",
              borderRadius: 6,
              border: `1px solid ${t.border}`,
              background: t.inputBg,
              color: t.text,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              textAlign: "center",
            }}
          />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.dim,
            opacity: 0.5,
          }}>px {!overrides[compId] && "· default"}</span>
        </div>
      ))}
    </div>
  );
}
