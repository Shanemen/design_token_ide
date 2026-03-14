import { useContext } from "react";
import { ThemeContext } from "../theme";

export default function TypeRow({ level, onChange, onRemove }) {
  const t = useContext(ThemeContext);
  const inputStyle = {
    padding: `${t.gap.sm}px ${t.space.md}px`,
    background: t.inputBg,
    border: `1px solid ${t.border}`,
    borderRadius: t.radius.sm,
    color: t.text,
    fontSize: t.font.base,
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
      gap: t.gap.sm,
      marginBottom: t.space.md,
      width: "100%",
    }}>
      <input
        value={level.name}
        onChange={e => onChange({ ...level, name: e.target.value })}
        placeholder="Name"
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
          fontSize: t.font.lg + 1,
          cursor: "pointer",
          padding: `0 ${t.space.xs}px`,
        }}
      >
        ×
      </button>
    </div>
  );
}
