import { useContext } from "react";
import { ThemeContext } from "../theme";
import Input from "../shared/Input";
import TextArea from "../shared/TextArea";
import Pill from "../shared/Pill";
import AddButton from "../shared/AddButton";

export default function Step0VisualDirection({ state, dispatch }) {
  const t = useContext(ThemeContext);
  const update = (key, value) => dispatch({ type: "SET_FIELD", key, value });

  return (
    <div>
      {/* Mood board links */}
      <div style={{ marginBottom: t.space.lg }}>
        <label style={{
          display: "block",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: t.font.sm,
          color: t.label,
          marginBottom: t.gap.sm,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}>Reference Links / Mood Board</label>
        {(state.moodboardLinks || []).map((link, i) => (
          <div key={i} style={{ display: "flex", gap: t.gap.sm, marginBottom: t.gap.sm, alignItems: "center", flexWrap: "nowrap" }}>
            <input
              value={link.url}
              onChange={e => {
                const next = [...state.moodboardLinks];
                next[i] = { ...link, url: e.target.value };
                update("moodboardLinks", next);
              }}
              placeholder="https://..."
              style={{
                flex: 2,
                padding: `${t.gap.sm}px ${t.space.md}px`,
                background: t.inputBg,
                border: `1px solid ${t.border}`,
                borderRadius: t.radius.sm,
                color: t.text,
                fontSize: t.font.base,
                fontFamily: "'JetBrains Mono', monospace",
                outline: "none",
              }}
            />
            <input
              value={link.label}
              onChange={e => {
                const next = [...state.moodboardLinks];
                next[i] = { ...link, label: e.target.value };
                update("moodboardLinks", next);
              }}
              placeholder="Label"
              style={{
                flex: 1,
                padding: `${t.gap.sm}px ${t.space.md}px`,
                background: t.inputBg,
                border: `1px solid ${t.border}`,
                borderRadius: t.radius.sm,
                color: t.text,
                fontSize: t.font.base,
                fontFamily: "'Space Grotesk', sans-serif",
                outline: "none",
              }}
            />
            <button
              onClick={() => update("moodboardLinks", state.moodboardLinks.filter((_, j) => j !== i))}
              style={{
                background: "none",
                border: "none",
                color: t.removeBtnColor,
                fontSize: t.font.lg + 1,
                cursor: "pointer",
                padding: `0 ${t.space.xs}px`,
                flexShrink: 0,
              }}
            >×</button>
          </div>
        ))}
        <AddButton label="Add Link" onClick={() => update("moodboardLinks", [...(state.moodboardLinks || []), { url: "", label: "" }])} />
      </div>

      {/* Tone description */}
      <TextArea
        label="Overall Tone"
        value={state.toneDescription}
        onChange={v => update("toneDescription", v)}
        placeholder='e.g. "Dark, technical, restrained" or "Warm, playful, hand-crafted feel"'
        rows={3}
      />

      {/* Visual asset direction */}
      <div style={{ marginBottom: t.gap.lg }}>
        <label style={{
          display: "block",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: t.font.sm,
          color: t.label,
          marginBottom: t.gap.sm,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}>Visual Assets Direction</label>
        <div style={{ display: "flex", gap: t.gap.sm, flexWrap: "wrap" }}>
          {[
            { id: "illustration", canAI: false },
            { id: "3d-render", canAI: false },
            { id: "photography", canAI: false },
            { id: "abstract-graphic", canAI: true },
            { id: "animation", canAI: true },
            { id: "mixed", canAI: true },
          ].map(item => (
            <Pill
              key={item.id}
              label={`${item.id}${item.canAI ? " ✓" : " ⚑"}`}
              active={state.visualAssetDirection === item.id}
              onClick={() => update("visualAssetDirection", item.id)}
            />
          ))}
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: t.font.sm,
          color: t.faint,
          marginTop: t.gap.sm,
          lineHeight: 1.6,
        }}>
          ⚑ = needs external tools · ✓ = CC can generate with code
        </div>

        {/* Capability hint based on selection */}
        {(() => {
          const hints = {
            "illustration": {
              canCode: false,
              message: "CC can't generate illustrations. Use AI image tools first, then hand off to CC for integration.",
              tools: ["Midjourney", "DALL·E", "Ideogram", "Recraft"],
              action: "Generate illustration → download PNG/SVG → give to CC",
            },
            "3d-render": {
              canCode: false,
              message: "CC can't generate 3D assets. Use 3D tools first, export images or model files.",
              tools: ["Spline", "Blender", "Tripo AI", "Meshy"],
              action: "Model/render → export PNG or GLB → give to CC",
            },
            "photography": {
              canCode: false,
              message: "CC can't generate photos. Shoot your own or use stock libraries. CC can handle cropping, filters, and responsive sizing.",
              tools: ["Unsplash", "Pexels", "your own camera"],
              action: "Select photos → give to CC for post-processing",
            },
            "abstract-graphic": {
              canCode: true,
              message: "CC can fully generate with code (SVG / CSS / Canvas). Just describe the style you want.",
              tools: [],
              action: "Describe the visual effect in natural language",
            },
            "animation": {
              canCode: true,
              message: "CC can generate animations with CSS / Framer Motion / Canvas. Describe the effect and rhythm.",
              tools: [],
              action: "Describe animation effect and pacing",
            },
            "mixed": {
              canCode: null,
              message: "Mix of code-generated and external assets. CC will handle what it can; you'll provide the rest.",
              tools: [],
              action: "Specify which elements are code vs. external in your tone description above",
            },
          };
          const hint = hints[state.visualAssetDirection];
          if (!hint) return null;
          return (
            <div style={{
              marginTop: t.space.md,
              padding: `${t.space.md}px ${t.gap.lg}px`,
              borderRadius: t.radius.md,
              background: hint.canCode === true ? `${t.accent}10` : hint.canCode === false ? `${t.accent}08` : `${t.accent}06`,
              border: `1px solid ${hint.canCode === true ? `${t.accent}30` : `${t.accent}20`}`,
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: t.gap.sm,
                marginBottom: t.space.sm,
              }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: t.font.xs,
                  fontWeight: 500,
                  padding: `2px ${t.gap.sm}px`,
                  borderRadius: t.radius.sm - 2,
                  background: hint.canCode === true ? "#22c55e20" : hint.canCode === false ? `${t.accent}20` : `${t.accent}15`,
                  color: hint.canCode === true ? "#22c55e" : t.accent,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}>
                  {hint.canCode === true ? "✓ CC can code" : hint.canCode === false ? "⚑ needs assets" : "mixed approach"}
                </span>
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: t.font.sm + 1,
                color: t.muted,
                lineHeight: 1.6,
                marginBottom: hint.tools.length > 0 ? t.gap.sm : 0,
              }}>
                {hint.message}
              </div>
              {hint.tools.length > 0 && (
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: t.font.sm,
                  color: t.dim,
                  lineHeight: 1.6,
                }}>
                  <span style={{ color: t.label }}>Tools:</span> {hint.tools.join(" / ")}
                  <br />
                  <span style={{ color: t.label }}>Flow:</span> {hint.action}
                </div>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
