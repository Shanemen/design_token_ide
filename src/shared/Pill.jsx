import { useContext } from "react";
import { ThemeContext } from "../theme";

export default function Pill({ label, active, onClick }) {
  const t = useContext(ThemeContext);
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 14px",
        borderRadius: 20,
        border: active ? `1px solid ${t.pillActiveBorder}` : `1px solid ${t.pillBorder}`,
        background: active ? t.pillActiveBg : "transparent",
        color: active ? t.pillActiveText : t.pillText,
        fontSize: 13,
        fontFamily: "'JetBrains Mono', monospace",
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );
}
