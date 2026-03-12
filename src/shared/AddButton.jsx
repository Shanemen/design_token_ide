import { useContext } from "react";
import { ThemeContext } from "../theme";

export default function AddButton({ onClick, label }) {
  const t = useContext(ThemeContext);
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        borderRadius: 6,
        border: `1px dashed ${t.borderLight}`,
        background: "transparent",
        color: t.dim,
        fontSize: 13,
        fontFamily: "'JetBrains Mono', monospace",
        cursor: "pointer",
        transition: "all 0.15s",
        marginTop: 4,
      }}
      onMouseEnter={e => { e.target.style.borderColor = t.focusBorder; e.target.style.color = t.accent; }}
      onMouseLeave={e => { e.target.style.borderColor = t.borderLight; e.target.style.color = t.dim; }}
    >
      + {label}
    </button>
  );
}
