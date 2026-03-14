import { useContext } from "react";
import { ThemeContext } from "../theme";
import Input from "../shared/Input";
import Pill from "../shared/Pill";

export default function Step4Responsive({ state, dispatch }) {
  const t = useContext(ThemeContext);
  const update = (key, value) => dispatch({ type: "SET_FIELD", key, value });

  return (
    <div>
      <Input label="Breakpoints (px)" value={state.breakpoints} onChange={v => update("breakpoints", v)} placeholder="640 / 768 / 1024 / 1280" mono />
      <div style={{ marginBottom: t.gap.lg }}>
        <label style={{
          display: "block",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: t.font.sm,
          color: t.label,
          marginBottom: t.gap.sm,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}>Strategy</label>
        <div style={{ display: "flex", gap: t.gap.sm }}>
          <Pill label="mobile-first" active={state.mobileFirst} onClick={() => update("mobileFirst", true)} />
          <Pill label="desktop-first" active={!state.mobileFirst} onClick={() => update("mobileFirst", false)} />
        </div>
      </div>

      {/* Component States */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: t.font.xs,
        color: t.accent,
        opacity: 0.5,
        letterSpacing: 2,
        textTransform: "uppercase",
        marginBottom: t.gap.md,
        marginTop: t.space.xl,
      }}>Component States</div>
      <Input value={state.states} onChange={v => update("states", v)} placeholder="default / hover / active / disabled / loading / empty" mono />
    </div>
  );
}
