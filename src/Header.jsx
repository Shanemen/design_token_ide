import { useContext, useState } from "react";
import { ThemeContext } from "./theme";

export default function Header({ projectName, onProjectNameChange, activeTab, onTabChange, mode, onModeToggle }) {
  const t = useContext(ThemeContext);
  const [hovered, setHovered] = useState(null);
  const [pressed, setPressed] = useState(null);

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: `${t.space.md}px ${t.space.xl}px`,
      borderBottom: `1px solid ${t.border}`,
      background: t.surface,
    }}>
      {/* Left: brand + project name */}
      <div style={{ display: "flex", alignItems: "center", gap: t.gap.md }}>
        <button
          onClick={() => onTabChange("editor")}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: t.font.sm,
            color: t.accent,
            letterSpacing: 3,
            textTransform: "uppercase",
            opacity: 0.7,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Design Token IDE
        </button>
        <span style={{ color: t.border, fontSize: t.font.md }}>·</span>
        <input
          value={projectName}
          onChange={e => onProjectNameChange(e.target.value)}
          placeholder="Project Name"
          style={{
            padding: `${t.space.xs}px ${t.gap.sm}px`,
            background: "none",
            border: `1px solid ${t.border}`,
            borderRadius: t.radius.sm,
            color: t.text,
            fontSize: t.font.base,
            fontWeight: 500,
            fontFamily: "'Space Grotesk', sans-serif",
            outline: "none",
            width: 160,
            transition: "border-color 0.2s",
          }}
          onFocus={e => e.target.style.borderColor = t.focusBorder}
          onBlur={e => e.target.style.borderColor = t.border}
        />
      </div>
      {/* Right: tabs + theme toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: t.gap.xs }}>
        {[
          { id: "about", label: "About" },
          { id: "feedback", label: "Feedback" },
        ].map(tab => {
          const isActive = activeTab === tab.id;
          const isHovered = hovered === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(isActive ? "editor" : tab.id)}
              onMouseEnter={() => setHovered(tab.id)}
              onMouseLeave={() => { setHovered(null); setPressed(null); }}
              onMouseDown={() => setPressed(tab.id)}
              onMouseUp={() => setPressed(null)}
              style={{
                padding: `${t.space.sm}px ${t.space.md}px`,
                borderRadius: t.radius.sm,
                border: "none",
                background: isActive ? t.pillActiveBg : isHovered ? `${t.dim}10` : "transparent",
                color: isActive ? t.accent : isHovered ? t.text : t.dim,
                fontSize: t.font.sm + 1,
                fontFamily: "'JetBrains Mono', monospace",
                cursor: "pointer",
                transition: "background 0.15s, color 0.15s, transform 0.1s",
                transform: pressed === tab.id ? "scale(0.95)" : "none",
              }}
            >
              {tab.label}
            </button>
          );
        })}
        <button
          onClick={onModeToggle}
          onMouseEnter={() => setHovered("mode")}
          onMouseLeave={() => { setHovered(null); setPressed(null); }}
          onMouseDown={() => setPressed("mode")}
          onMouseUp={() => setPressed(null)}
          style={{
            padding: `${t.space.sm}px ${t.space.md}px`,
            borderRadius: t.radius.full,
            border: `1px solid ${hovered === "mode" ? t.pillActiveBorder : t.border}`,
            background: hovered === "mode" ? t.pillActiveBg : t.surface,
            color: hovered === "mode" ? t.pillActiveText : t.dim,
            fontSize: t.font.sm + 1,
            fontFamily: "'JetBrains Mono', monospace",
            cursor: "pointer",
            transition: "background 0.15s, color 0.15s, border-color 0.15s, transform 0.1s",
            marginLeft: t.gap.sm,
            transform: pressed === "mode" ? "scale(0.95)" : "none",
          }}
        >
          {mode === "light" ? "☽ Dark" : "☀ Light"}
        </button>
      </div>
    </div>
  );
}
