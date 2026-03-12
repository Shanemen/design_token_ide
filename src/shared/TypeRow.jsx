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
    minWidth: 0,
    boxSizing: "border-box",
  };
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 10,
      width: "100%",
    }}>
      <input
        value={level.name}
        onChange={e => onChange({ ...level, name: e.target.value })}
        placeholder="名称"
        style={{ ...inputStyle, flex: "1 1 80px", fontFamily: "'Space Grotesk', sans-serif", textAlign: "left" }}
      />
      <input value={level.size} onChange={e => onChange({ ...level, size: e.target.value })} placeholder="px" style={{ ...inputStyle, flex: "0 0 50px" }} />
      <input value={level.weight} onChange={e => onChange({ ...level, weight: e.target.value })} placeholder="wt" style={{ ...inputStyle, flex: "0 0 50px" }} />
      <input value={level.lineHeight} onChange={e => onChange({ ...level, lineHeight: e.target.value })} placeholder="lh" style={{ ...inputStyle, flex: "0 0 50px" }} />
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
