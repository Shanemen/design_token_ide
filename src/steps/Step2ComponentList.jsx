import { useContext } from "react";
import { ThemeContext } from "../theme";
import { ATOMIC_COMPONENTS, BLOCK_COMPONENTS, FIXED_COMPONENTS } from "./componentDefs";

export default function Step2ComponentList({ onSelect, state, dispatch }) {
  const t = useContext(ThemeContext);

  const GroupLabel = ({ label }) => (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10,
      color: t.accent,
      opacity: 0.5,
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: 10,
      marginTop: 16,
    }}>{label}</div>
  );

  const visited = state.visitedSections || {};

  const ComponentCard = ({ comp }) => {
    const isVisited = !!visited[`comp-${comp.id}`];
    return (
      <button
        onClick={() => onSelect(comp.id)}
        style={{
          flex: "1 1 calc(50% - 6px)",
          minWidth: 160,
          padding: "14px 16px",
          borderRadius: 10,
          border: `1px solid ${t.border}`,
          background: t.inputBg,
          cursor: "pointer",
          textAlign: "left",
          transition: "all 0.15s",
          display: "flex",
          alignItems: "center",
          gap: 12,
          position: "relative",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent + "50"; e.currentTarget.style.background = t.accent + "08"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.background = t.inputBg; }}
      >
        <span style={{
          fontSize: 18,
          color: t.accent,
          opacity: 0.7,
          width: 28,
          textAlign: "center",
        }}>{comp.icon}</span>
        <div>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: t.text,
          }}>{comp.label}</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: t.dim,
            marginTop: 2,
          }}>{comp.desc}</div>
        </div>
        {isVisited && (
          <span style={{
            position: "absolute",
            top: 8,
            right: 10,
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: t.accent,
            opacity: 0.7,
          }} />
        )}
      </button>
    );
  };

  return (
    <div>
      <GroupLabel label="Atomic Components" />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {ATOMIC_COMPONENTS.map(c => <ComponentCard key={c.id} comp={c} />)}
      </div>

      {/* Border Radius + Border — two separate cards */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
        <ComponentCard comp={{ id: "BorderRadius", label: "Border Radius", icon: "◰", desc: "Per-component radius" }} />
        <ComponentCard comp={{ id: "Border", label: "Border", icon: "▭", desc: "Per-component border toggle" }} />
      </div>

      <GroupLabel label="Block Components" />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {BLOCK_COMPONENTS.map(c => <ComponentCard key={c.id} comp={c} />)}
      </div>
      <GroupLabel label="Fixed (every page)" />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
        {FIXED_COMPONENTS.map(c => <ComponentCard key={c.id} comp={c} />)}
      </div>
    </div>
  );
}
