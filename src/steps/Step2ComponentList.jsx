import { useContext } from "react";
import { ThemeContext } from "../theme";
import { ATOMIC_COMPONENTS, BLOCK_COMPONENTS, FIXED_COMPONENTS } from "./componentDefs";

export default function Step2ComponentList({ onSelect, state, dispatch }) {
  const t = useContext(ThemeContext);

  const GroupLabel = ({ label }) => (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: t.font.xs,
      color: t.accent,
      opacity: 0.5,
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: t.gap.sm,
      marginTop: t.gap.lg,
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
          padding: `${t.font.md}px ${t.gap.lg}px`,
          borderRadius: t.radius.md + 2,
          border: `1px solid ${isVisited ? t.pillActiveBorder : t.border}`,
          background: isVisited ? t.pillActiveBg : t.inputBg,
          cursor: "pointer",
          textAlign: "left",
          transition: "all 0.15s",
          display: "flex",
          alignItems: "center",
          gap: t.gap.md,
          position: "relative",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = t.pillActiveBorder; e.currentTarget.style.background = t.pillActiveBg; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = isVisited ? t.pillActiveBorder : t.border; e.currentTarget.style.background = isVisited ? t.pillActiveBg : t.inputBg; }}
      >
        <span style={{
          fontSize: t.font.lg + 1,
          color: t.accent,
          opacity: 0.7,
          width: 28,
          textAlign: "center",
        }}>{comp.icon}</span>
        <div>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: t.font.md,
            fontWeight: 500,
            color: t.text,
          }}>{comp.label}</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: t.font.sm,
            color: t.dim,
            marginTop: 2,
          }}>{comp.desc}</div>
        </div>
        {isVisited && (
          <span style={{
            position: "absolute",
            top: t.gap.sm,
            right: t.font.xs,
            fontFamily: "system-ui, sans-serif",
            fontSize: t.font.sm + 1,
            color: t.accent,
            lineHeight: 1,
          }}>✓</span>
        )}
      </button>
    );
  };

  return (
    <div>
      <GroupLabel label="Atomic Components" />
      <div style={{ display: "flex", gap: t.gap.sm, flexWrap: "wrap" }}>
        {ATOMIC_COMPONENTS.map(c => <ComponentCard key={c.id} comp={c} />)}
      </div>

      {/* Border Radius + Border — two separate cards */}
      <div style={{ display: "flex", gap: t.gap.sm, flexWrap: "wrap", marginTop: t.gap.sm }}>
        <ComponentCard comp={{ id: "BorderRadius", label: "Border Radius", icon: "◰", desc: "Per-component radius" }} />
        <ComponentCard comp={{ id: "Border", label: "Border", icon: "▭", desc: "Per-component border toggle" }} />
      </div>

      <GroupLabel label="Block Components" />
      <div style={{ display: "flex", gap: t.gap.sm, flexWrap: "wrap" }}>
        {BLOCK_COMPONENTS.map(c => <ComponentCard key={c.id} comp={c} />)}
      </div>
      <GroupLabel label="Fixed (every page)" />
      <div style={{ display: "flex", gap: t.gap.sm, flexWrap: "wrap", marginBottom: t.gap.sm }}>
        {FIXED_COMPONENTS.map(c => <ComponentCard key={c.id} comp={c} />)}
      </div>
    </div>
  );
}
