import { useContext } from "react";
import { ThemeContext } from "../theme";

export default function ColorRow({ label, description, value, onChange }) {
  const t = useContext(ThemeContext);
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: t.gap.md,
      marginBottom: t.gap.sm,
      padding: `${t.gap.sm}px 0`,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: t.font.base,
          fontWeight: 500,
          color: t.text,
        }}>{label}</div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: t.font.xs,
          color: t.dim,
          marginTop: 2,
          lineHeight: 1.3,
        }}>{description}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: t.gap.sm, flexShrink: 0 }}>
        <div style={{ position: "relative", width: 32, height: 32 }}>
          <div style={{
            width: 32, height: 32,
            borderRadius: t.radius.md,
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
            padding: `${t.space.sm}px ${t.gap.sm}px`,
            background: t.inputBg,
            border: `1px solid ${t.border}`,
            borderRadius: t.radius.sm,
            color: t.text,
            fontSize: t.font.sm + 1,
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
