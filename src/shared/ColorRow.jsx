import { useContext } from "react";
import { ThemeContext } from "../theme";

export default function ColorRow({ label, description, value, onChange }) {
  const t = useContext(ThemeContext);
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 8,
      padding: "8px 0",
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: t.text,
        }}>{label}</div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: t.dim,
          marginTop: 2,
          lineHeight: 1.3,
        }}>{description}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <div style={{ position: "relative", width: 32, height: 32 }}>
          <div style={{
            width: 32, height: 32,
            borderRadius: 8,
            background: value,
            border: `1px solid ${t.swatchBorder}`,
          }} />
          <input
            type="color"
            value={value}
            onChange={e => onChange(e.target.value)}
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: 32, height: 32,
              opacity: 0,
              cursor: "pointer",
            }}
          />
        </div>
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width: 80,
            padding: "6px 8px",
            background: t.inputBg,
            border: `1px solid ${t.border}`,
            borderRadius: 6,
            color: t.text,
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            outline: "none",
            boxSizing: "border-box",
          }}
          onFocus={e => e.target.style.borderColor = t.focusBorder}
          onBlur={e => e.target.style.borderColor = t.blurBorder}
        />
      </div>
    </div>
  );
}
