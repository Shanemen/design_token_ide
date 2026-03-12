import { useContext } from "react";
import { ThemeContext } from "./theme";

export default function Header({ projectName, onProjectNameChange, activeTab, onTabChange, mode, onModeToggle }) {
  const t = useContext(ThemeContext);

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 24px",
      borderBottom: `1px solid ${t.border}`,
      background: t.surface,
    }}>
      {/* Left: brand + project name */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={() => onTabChange("editor")}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
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
        <span style={{ color: t.border, fontSize: 14 }}>·</span>
        <input
          value={projectName}
          onChange={e => onProjectNameChange(e.target.value)}
          placeholder="Project Name"
          style={{
            padding: "4px 8px",
            background: "none",
            border: `1px solid ${t.border}`,
            borderRadius: 6,
            color: t.text,
            fontSize: 13,
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
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {[
          { id: "about", label: "About" },
          { id: "feedback", label: "Feedback" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(activeTab === tab.id ? "editor" : tab.id)}
            style={{
              padding: "5px 12px",
              borderRadius: 6,
              border: "none",
              background: activeTab === tab.id ? `${t.accent}12` : "transparent",
              color: activeTab === tab.id ? t.accent : t.dim,
              fontSize: 12,
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
            padding: "5px 12px",
            borderRadius: 20,
            border: `1px solid ${t.border}`,
            background: t.surface,
            color: t.dim,
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            cursor: "pointer",
            transition: "all 0.2s",
            marginLeft: 8,
          }}
        >
          {mode === "light" ? "☽ Dark" : "☀ Light"}
        </button>
      </div>
    </div>
  );
}
