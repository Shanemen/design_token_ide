import { useContext } from "react";
import { ThemeContext } from "../theme";

export default function Input({ label, value, onChange, placeholder, mono, small }) {
  const t = useContext(ThemeContext);
  return (
    <div style={{ marginBottom: t.space.md }}>
      {label && (
        <label style={{
          display: "block",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: t.font.sm,
          color: t.label,
          marginBottom: t.space.sm,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}>
          {label}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: small ? 120 : "100%",
          padding: `${t.space.md}px ${t.space.md}px`,
          background: t.inputBg,
          border: `1px solid ${t.border}`,
          borderRadius: t.radius.sm,
          color: t.text,
          fontSize: t.font.md,
          fontFamily: mono ? "'JetBrains Mono', monospace" : "'Space Grotesk', sans-serif",
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.2s",
        }}
        onFocus={e => e.target.style.borderColor = t.focusBorder}
        onBlur={e => e.target.style.borderColor = t.blurBorder}
      />
    </div>
  );
}
