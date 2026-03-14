import { useContext } from "react";
import { ThemeContext } from "../theme";

export default function Section({ number, title, subtitle, children, isOpen, onToggle, nested }) {
  const t = useContext(ThemeContext);
  return (
    <div style={{
      marginBottom: t.space.md,
      background: isOpen ? t.surface : "transparent",
      borderRadius: t.radius.lg,
      border: isOpen ? `1px solid ${t.border}` : "1px solid transparent",
      transition: "all 0.2s ease",
    }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: t.gap.md,
          padding: `${t.space.lg}px ${t.space.lg + 2}px`,
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: t.font.sm + 1,
          color: t.accent,
          opacity: 0.8,
          minWidth: t.space.xl,
        }}>
          {String(number).padStart(2, "0")}
        </span>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: t.font.lg,
          fontWeight: 500,
          color: t.text,
          flex: 1,
        }}>
          {title}
        </span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: t.font.sm,
          color: t.dim,
          marginRight: t.gap.sm,
        }}>
          {subtitle}
        </span>
        <span style={{
          color: t.dim,
          fontSize: t.font.lg + 1,
          transition: "transform 0.2s",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        }}>
          ▾
        </span>
      </button>
      {isOpen && (
        <div style={{ padding: nested ? `${t.space.xs}px ${t.gap.lg}px ${t.space.lg}px 36px` : `${t.space.xs}px ${t.space.lg + 2}px ${t.space.xl}px 60px` }}>
          {children}
        </div>
      )}
    </div>
  );
}
