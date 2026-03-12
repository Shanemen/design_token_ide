import { useContext } from "react";
import { ThemeContext } from "../theme";

export default function TypeRow({ level, onChange, onRemove }) {
  const t = useContext(ThemeContext);
  const inputStyle = {
    padding: "8px 10px",
    background: t.inputBg,
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    color: t.text,
    fontSize: 13,
    fontFamily: "'JetBrains Mono', monospace",
    outline: "none",
    textAlign: "center",
  };
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 10,
    }}>
      <input
        value={level.name}
        onChange={e => onChange({ ...level, name: e.target.value })}
        placeholder="名称"
        style={{ ...inputStyle, width: 100, fontFamily: "'Space Grotesk', sans-serif", textAlign: "left" }}
      />
      <input value={level.size} onChange={e => onChange({ ...level, size: e.target.value })} placeholder="px" style={{ ...inputStyle, width: 56 }} />
      <input value={level.weight} onChange={e => onChange({ ...level, weight: e.target.value })} placeholder="wt" style={{ ...inputStyle, width: 56 }} />
      <input value={level.lineHeight} onChange={e => onChange({ ...level, lineHeight: e.target.value })} placeholder="lh" style={{ ...inputStyle, width: 56 }} />
      <select
        value={level.font}
        onChange={e => onChange({ ...level, font: e.target.value })}
        style={{
          padding: "8px 10px",
          background: t.selectBg,
          border: `1px solid ${t.selectBorder}`,
          borderRadius: 6,
          color: t.selectText,
          fontSize: 12,
          fontFamily: "'JetBrains Mono', monospace",
          outline: "none",
        }}
      >
        <option value="heading">heading</option>
        <option value="body">body</option>
      </select>
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
