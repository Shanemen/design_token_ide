import { useContext } from "react";
import { ThemeContext } from "../theme";

export default function TextArea({ label, value, onChange, placeholder, rows = 4 }) {
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
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: "100%",
          padding: "10px 14px",
          background: t.inputBg,
          border: `1px solid ${t.border}`,
          borderRadius: 6,
          color: t.text,
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          outline: "none",
          resize: "vertical",
          boxSizing: "border-box",
          lineHeight: 1.7,
        }}
        onFocus={e => e.target.style.borderColor = t.focusBorder}
        onBlur={e => e.target.style.borderColor = t.blurBorder}
      />
    </div>
  );
}
