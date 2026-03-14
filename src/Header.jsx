import { useContext } from "react";
import { ThemeContext } from "./theme";

export default function Header({ projectName, onProjectNameChange, activeTab, onTabChange, mode, onModeToggle }) {
  const t = useContext(ThemeContext);

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
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(activeTab === tab.id ? "editor" : tab.id)}
            style={{
              padding: `${t.space.sm}px ${t.space.md}px`,
              borderRadius: t.radius.sm,
              border: "none",
              background: activeTab === tab.id ? `${t.accent}12` : "transparent",
              color: activeTab === tab.id ? t.accent : t.dim,
              fontSize: t.font.sm + 1,
              fontFamily: "'JetBrains Mono', monospace",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {tab.label}
          </button>
        ))}
        <button
          onClick={onModeToggle}
          style={{
            padding: `${t.space.sm}px ${t.space.md}px`,
            borderRadius: t.radius.full,
            border: `1px solid ${t.border}`,
            background: t.surface,
            color: t.dim,
            fontSize: t.font.sm + 1,
            fontFamily: "'JetBrains Mono', monospace",
            cursor: "pointer",
            transition: "all 0.2s",
            marginLeft: t.gap.sm,
          }}
        >
          {mode === "light" ? "☽ Dark" : "☀ Light"}
        </button>
      </div>
    </div>
  );
}
