import { useState } from "react";

export default function MotionPreview({ tokens, theme }) {
  const t = theme;
  const [replayKey, setReplayKey] = useState(0);

  const dur = parseInt(tokens.defaultDuration) || 300;
  const easing = tokens.easingStyle === "spring" ? "cubic-bezier(0.34, 1.56, 0.64, 1)"
    : tokens.easingStyle === "ease-out" ? "cubic-bezier(0.22, 1, 0.36, 1)"
    : tokens.easingStyle === "ease-in-out" ? "cubic-bezier(0.45, 0, 0.55, 1)"
    : "linear";
  const radius = parseInt(tokens.borderRadius) || 8;

  const colors = tokens.colorMode !== "light-only" ? tokens.darkColors : tokens.lightColors;
  const accent = colors.find(c => c.name.toLowerCase().includes("accent"))?.value || "#E8734A";

  const sectionLabel = (label) => (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10,
      color: t.accent,
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: 14,
      opacity: 0.7,
    }}>{label}</div>
  );

  return (
    <div style={{ padding: "28px", height: "100%", overflow: "auto", boxSizing: "border-box" }}>
      <style>{`
        @keyframes motionFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes motionSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes motionScaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes motionClipReveal { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0 0 0 0); } }
      `}</style>

      {/* Global settings */}
      <div style={{ marginBottom: 28 }}>
        {sectionLabel("Motion Settings")}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: t.dim,
          lineHeight: 2,
        }}>
          <div>Level: <span style={{ color: t.text }}>{tokens.motionLevel}</span></div>
          <div>Easing: <span style={{ color: t.text }}>{tokens.easingStyle}</span></div>
          <div>Duration: <span style={{ color: t.text }}>{tokens.defaultDuration}ms</span></div>
        </div>
      </div>

      {/* Page Load Demo */}
      {tokens.motionLevel !== "none" && (
        <div style={{ marginBottom: 28 }}>
          {sectionLabel("Page Load Animation")}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: t.dim }}>
              {tokens.pageLoadAnimation ? tokens.pageLoadStyle : "off"}
            </span>
            <button
              onClick={() => setReplayKey(k => k + 1)}
              style={{
                padding: "5px 12px",
                borderRadius: radius,
                border: `1px solid ${t.border}`,
                background: "transparent",
                color: t.dim,
                fontSize: 11,
                fontFamily: "'JetBrains Mono', monospace",
                cursor: "pointer",
              }}
            >{"\u25B6"} replay</button>
          </div>
          {tokens.pageLoadAnimation && (
            <div key={replayKey} style={{ display: "flex", gap: 10 }}>
              {[0, 1, 2, 3].map(i => {
                const animName = tokens.pageLoadStyle === "slide-up" ? "motionSlideUp"
                  : tokens.pageLoadStyle === "scale-in" ? "motionScaleIn"
                  : tokens.pageLoadStyle === "clip-reveal" ? "motionClipReveal"
                  : "motionFadeIn";
                return (
                  <div key={i} style={{
                    flex: 1,
                    height: 48,
                    borderRadius: Math.max(radius - 2, 2),
                    background: `${accent}${25 + i * 18}`,
                    animation: `${animName} ${dur}ms ${easing} ${i * dur * 0.15}ms both`,
                  }} />
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Hover Demo */}
      {tokens.hoverEffects && (
        <div style={{ marginBottom: 28 }}>
          {sectionLabel("Hover Effects")}
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: t.dim, marginBottom: 12, display: "block" }}>
            {tokens.hoverStyle || "opacity + lift"}
          </span>
          <div style={{ display: "flex", gap: 10 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                flex: 1,
                height: 60,
                borderRadius: radius,
                background: t.surface,
                border: `1px solid ${t.border}`,
                cursor: "pointer",
                transition: `all ${dur}ms ${easing}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: t.dim,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.opacity = "0.85";
                e.currentTarget.style.borderColor = accent;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.borderColor = t.border;
              }}
              >hover me</div>
            ))}
          </div>
        </div>
      )}

      {/* Page Transition */}
      {tokens.pageTransition !== "none" && (
        <div style={{ marginBottom: 28 }}>
          {sectionLabel("Page Transition")}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: t.dim,
          }}>
            Style: <span style={{ color: t.text }}>{tokens.pageTransition}</span>
          </div>
        </div>
      )}
    </div>
  );
}
