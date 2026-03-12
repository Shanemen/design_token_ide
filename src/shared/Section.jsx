import { useContext } from "react";
import { ThemeContext } from "../theme";

export default function Section({ number, title, subtitle, children, isOpen, onToggle }) {
  const t = useContext(ThemeContext);
  return (
    <div style={{
      marginBottom: 8,
      background: isOpen ? t.surface : "transparent",
      borderRadius: 12,
      border: isOpen ? `1px solid ${t.border}` : "1px solid transparent",
      transition: "all 0.2s ease",
    }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "20px 22px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: t.accent,
          opacity: 0.8,
          minWidth: 24,
        }}>
          {String(number).padStart(2, "0")}
        </span>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 17,
          fontWeight: 500,
          color: t.text,
          flex: 1,
        }}>
          {title}
        </span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: t.dim,
          marginRight: 8,
        }}>
          {subtitle}
        </span>
        <span style={{
          color: t.dim,
          fontSize: 18,
          transition: "transform 0.2s",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        }}>
          ▾
        </span>
      </button>
      {isOpen && (
        <div style={{ padding: "4px 22px 24px 60px" }}>
          {children}
        </div>
      )}
    </div>
  );
}
