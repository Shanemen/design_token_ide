import { useContext } from "react";
import { ThemeContext } from "../theme";

export default function Input({ label, value, onChange, placeholder, mono, small }) {
  const t = useContext(ThemeContext);
  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <label style={{
          display: "block",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: t.label,
          marginBottom: 6,
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
          padding: "10px 14px",
          background: t.inputBg,
          border: `1px solid ${t.border}`,
          borderRadius: 6,
          color: t.text,
          fontSize: 14,
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
