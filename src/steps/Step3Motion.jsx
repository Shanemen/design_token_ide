import { useContext } from "react";
import { ThemeContext } from "../theme";
import Input from "../shared/Input";
import TextArea from "../shared/TextArea";
import Pill from "../shared/Pill";

export default function Step3Motion({ state, dispatch }) {
  const t = useContext(ThemeContext);
  const update = (key, value) => dispatch({ type: "SET_FIELD", key, value });

  const subLabel = (text) => (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: t.font.xs,
      color: t.accent,
      opacity: 0.5,
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: t.gap.md,
    }}>{text}</div>
  );

  return (
    <div>
      {/* A. Overall Motion Level */}
      {subLabel("A. Overall Motion Level")}
      <div style={{ marginBottom: t.gap.lg }}>
        <label style={{
          display: "block",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: t.font.sm,
          color: t.label,
          marginBottom: t.gap.sm,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}>Motion Level</label>
        <div style={{ display: "flex", gap: t.gap.sm, flexWrap: "wrap" }}>
          {["none", "subtle", "moderate", "expressive"].map(s => (
            <Pill key={s} label={s} active={state.motionLevel === s} onClick={() => update("motionLevel", s)} />
          ))}
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: t.font.sm,
          color: t.faint,
          marginTop: t.gap.sm,
          lineHeight: 1.6,
        }}>
          {state.motionLevel === "none" && "No animations at all"}
          {state.motionLevel === "subtle" && "Basic transitions only: hover feedback, fade in/out"}
          {state.motionLevel === "moderate" && "Page load animations + scroll triggers + hover effects"}
          {state.motionLevel === "expressive" && "Rich motion: orchestrated entrances, scroll-driven, complex interactions"}
        </div>
      </div>

      {/* B. Rhythm & Feel */}
      <div style={{ marginTop: t.space.xl }}>{subLabel("B. Rhythm & Feel")}</div>
      <div style={{ display: "flex", gap: t.gap.md, flexWrap: "wrap", marginBottom: t.gap.lg }}>
        <div>
          <label style={{
            display: "block",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: t.font.sm,
            color: t.label,
            marginBottom: t.gap.sm,
            textTransform: "uppercase",
            letterSpacing: 1.5,
          }}>Easing</label>
          <div style={{ display: "flex", gap: t.gap.sm, flexWrap: "wrap" }}>
            {["ease-out", "ease-in-out", "spring", "linear"].map(s => (
              <Pill key={s} label={s} active={state.easingStyle === s} onClick={() => update("easingStyle", s)} />
            ))}
          </div>
        </div>
      </div>
      <Input label="Default Duration (ms)" value={state.defaultDuration} onChange={v => update("defaultDuration", v)} placeholder="200 / 300 / 500" mono small />

      {/* C. Page Load Animation */}
      <div style={{ marginTop: t.space.xl }}>{subLabel("C. Page Load Animation")}</div>
      <div style={{ marginBottom: t.gap.lg }}>
        <div style={{ display: "flex", gap: t.gap.sm, marginBottom: t.gap.md }}>
          <Pill label="yes" active={state.pageLoadAnimation} onClick={() => update("pageLoadAnimation", true)} />
          <Pill label="no" active={!state.pageLoadAnimation} onClick={() => update("pageLoadAnimation", false)} />
        </div>
        {state.pageLoadAnimation && (
          <div>
            <label style={{
              display: "block",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: t.font.sm,
              color: t.label,
              marginBottom: t.gap.sm,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}>Style</label>
            <div style={{ display: "flex", gap: t.gap.sm, flexWrap: "wrap" }}>
              {["stagger-fade", "slide-up", "scale-in", "clip-reveal", "custom"].map(s => (
                <Pill key={s} label={s} active={state.pageLoadStyle === s} onClick={() => update("pageLoadStyle", s)} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* D. Scroll Animations */}
      <div style={{ marginTop: t.space.xl }}>{subLabel("D. Scroll Triggered")}</div>
      <div style={{ marginBottom: t.gap.lg }}>
        <div style={{ display: "flex", gap: t.gap.sm, marginBottom: t.gap.md }}>
          <Pill label="yes" active={state.scrollAnimation} onClick={() => update("scrollAnimation", true)} />
          <Pill label="no" active={!state.scrollAnimation} onClick={() => update("scrollAnimation", false)} />
        </div>
        {state.scrollAnimation && (
          <Input label="Scroll Animation Style" value={state.scrollAnimationStyle} onChange={v => update("scrollAnimationStyle", v)} placeholder="e.g. fade-up on enter, parallax, sticky reveal..." />
        )}
      </div>

      {/* E. Hover Effects */}
      <div style={{ marginTop: t.space.xl }}>{subLabel("E. Hover Effects")}</div>
      <div style={{ marginBottom: t.gap.lg }}>
        <div style={{ display: "flex", gap: t.gap.sm, marginBottom: t.gap.md }}>
          <Pill label="yes" active={state.hoverEffects} onClick={() => update("hoverEffects", true)} />
          <Pill label="no" active={!state.hoverEffects} onClick={() => update("hoverEffects", false)} />
        </div>
        {state.hoverEffects && (
          <Input label="Hover Style" value={state.hoverStyle} onChange={v => update("hoverStyle", v)} placeholder="e.g. opacity change, scale up, color shift, underline slide..." />
        )}
      </div>

      {/* F. Page Transitions */}
      <div style={{ marginTop: t.space.xl }}>{subLabel("F. Page Transition")}</div>
      <div style={{ marginBottom: t.gap.lg }}>
        <label style={{
          display: "block",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: t.font.sm,
          color: t.label,
          marginBottom: t.gap.sm,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}>Page Transition</label>
        <div style={{ display: "flex", gap: t.gap.sm, flexWrap: "wrap" }}>
          {["none", "crossfade", "slide", "morph", "custom"].map(s => (
            <Pill key={s} label={s} active={state.pageTransition === s} onClick={() => update("pageTransition", s)} />
          ))}
        </div>
      </div>

      {/* G. Micro-interactions */}
      <div style={{ marginTop: t.space.xl }}>{subLabel("G. Micro-interactions")}</div>
      <Input value={state.microInteractions} onChange={v => update("microInteractions", v)} placeholder="e.g. button click scale, toggle spring, input focus glow..." />

      {/* Motion Notes */}
      <div style={{ marginTop: t.space.xl }}>
        <TextArea label="Motion Notes" value={state.motionNotes} onChange={v => update("motionNotes", v)} placeholder="Other motion notes, e.g. Framer Motion vs pure CSS..." rows={2} />
      </div>
    </div>
  );
}
