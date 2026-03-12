import { useContext } from "react";
import { ThemeContext } from "../theme";

export default function ColorRow({ color, onChange, onRemove }) {
  const t = useContext(ThemeContext);
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 10,
      flexWrap: "wrap",
    }}>
      <div style={{ position: "relative", width: 36, height: 36, flexShrink: 0 }}>
        <div style={{
          width: 36, height: 36,
          borderRadius: 8,
          background: color.value,
          border: `1px solid ${t.swatchBorder}`,
        }} />
        <input
          type="color"
          value={color.value}
          onChange={e => onChange({ ...color, value: e.target.value })}
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: 36, height: 36,
            opacity: 0,
            cursor: "pointer",
          }}
        />
      </div>
      <input
        value={color.name}
        onChange={e => onChange({ ...color, name: e.target.value })}
        placeholder="名称"
        style={{
          width: 120,
          padding: "8px 10px",
          background: t.inputBg,
          border: `1px solid ${t.border}`,
          borderRadius: 6,
          color: t.text,
          fontSize: 13,
          fontFamily: "'Space Grotesk', sans-serif",
          outline: "none",
        }}
      />
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        color: t.label,
        minWidth: 70,
      }}>
        {color.value}
      </span>
      <input
        value={color.usage}
        onChange={e => onChange({ ...color, usage: e.target.value })}
        placeholder="用途"
        style={{
          flex: 1,
          minWidth: 100,
          padding: "8px 10px",
          background: t.inputBg,
          border: `1px solid ${t.border}`,
          borderRadius: 6,
          color: t.muted,
          fontSize: 12,
          fontFamily: "'JetBrains Mono', monospace",
          outline: "none",
        }}
      />
      <button
        onClick={onRemove}
        style={{
          background: "none",
          border: "none",
          color: t.removeBtnColor,
          fontSize: 18,
          cursor: "pointer",
          padding: "0 4px",
        }}
      >
        ×
      </button>
    </div>
  );
}
