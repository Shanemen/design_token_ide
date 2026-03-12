import { useState } from "react";

export default function TokensPreview({ tokens, openSections, selectedLayout, theme }) {
  const [replayKey, setReplayKey] = useState(0);
  const [hoverDemo, setHoverDemo] = useState(false);

  // IDE theme (for chrome/labels)
  const t = theme;

  // Progressive preview: check which steps have been visited
  const visited = tokens.visitedSections || {};
  const hasAnyVisited = Object.keys(visited).length > 0;

  // If no sections visited, show empty state
  if (!hasAnyVisited) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        height: "100%", opacity: 0.5, textAlign: "center", padding: 40,
      }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: t.dim, marginBottom: 8 }}>
          Open a step on the left to start
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: t.faint }}>
          Your design library will build up here as you configure tokens
        </div>
      </div>
    );
  }

  // User tokens
  const hFont = tokens.headingFont || "Space Grotesk";
  const bFont = tokens.bodyFont || "JetBrains Mono";

  const darkColors = tokens.darkColors || [];
  const lightColors = tokens.lightColors || [];

  const darkBg = darkColors.find(c => c.name.toLowerCase().includes("background"))?.value || "#0A0A0F";
  const darkSurface = darkColors.find(c => c.name.toLowerCase().includes("surface"))?.value || "#141419";
  const darkTextPrimary = darkColors.find(c => c.name.toLowerCase().includes("primary"))?.value || "#E8E8ED";
  const darkTextSecondary = darkColors.find(c => c.name.toLowerCase().includes("secondary"))?.value || "#8A8A9A";
  const darkAccent = darkColors.find(c => c.name.toLowerCase().includes("accent"))?.value || "#E8734A";

  const lightBg = lightColors.find(c => c.name.toLowerCase().includes("background"))?.value || "#FAFAFA";
  const lightSurface = lightColors.find(c => c.name.toLowerCase().includes("surface"))?.value || "#F0F0F5";
  const lightTextPrimary = lightColors.find(c => c.name.toLowerCase().includes("primary"))?.value || "#1A1A2E";
  const lightTextSecondary = lightColors.find(c => c.name.toLowerCase().includes("secondary"))?.value || "#6B7094";
  const lightAccent = lightColors.find(c => c.name.toLowerCase().includes("accent"))?.value || "#E8734A";

  // Pick "primary" color set based on user's color mode
  const isPrimaryDark = tokens.colorMode !== "light-only";
  const bg = isPrimaryDark ? darkBg : lightBg;
  const surface = isPrimaryDark ? darkSurface : lightSurface;
  const textPrimary = isPrimaryDark ? darkTextPrimary : lightTextPrimary;
  const textSecondary = isPrimaryDark ? darkTextSecondary : lightTextSecondary;
  const accent = isPrimaryDark ? darkAccent : lightAccent;

  const densityMul = tokens.density === "airy" ? 1.5 : tokens.density === "compact" ? 0.7 : 1;

  const radius = parseInt(tokens.borderRadius) || 8;
  const bw = parseInt(tokens.borderWidth) || 1;
  const bc = tokens.borderColor || "#222233";
  const spacings = tokens.spacingScales.split("/").map(s => parseInt(s.trim())).filter(Boolean);

  const dur = parseInt(tokens.defaultDuration) || 300;
  const easing = tokens.easingStyle === "spring" ? "cubic-bezier(0.34, 1.56, 0.64, 1)"
    : tokens.easingStyle === "ease-out" ? "cubic-bezier(0.22, 1, 0.36, 1)"
    : tokens.easingStyle === "ease-in-out" ? "cubic-bezier(0.45, 0, 0.55, 1)"
    : "linear";

  const googleFonts = [hFont, bFont]
    .filter(f => f && !["JetBrains Mono", "Space Grotesk"].includes(f))
    .map(f => f.replace(/ /g, "+")).join("&family=");

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

  // Highlight when Step 1 (tokens) is open — all token sections belong to step-1
  const highlightStyle = (sectionKey) => ({
    marginBottom: 28,
    padding: openSections[sectionKey] ? 16 : 0,
    borderRadius: 12,
    border: openSections[sectionKey] ? `1.5px solid ${t.accent}30` : "1.5px solid transparent",
    background: openSections[sectionKey] ? `${t.accent}08` : "transparent",
    transition: "all 0.3s ease",
  });

  return (
    <div style={{
      padding: "28px 28px",
      height: "100%",
      overflow: "auto",
      boxSizing: "border-box",
    }}>
      {googleFonts && (
        <link href={`https://fonts.googleapis.com/css2?family=${googleFonts}&display=swap`} rel="stylesheet" />
      )}
      <style>{`
        @keyframes previewFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* -- Typography -- */}
      {visited["step-1"] && <div style={{ animation: "previewFadeIn 0.4s ease" }}>
      <div style={highlightStyle("step-1")}>
        {sectionLabel("Typography")}
        <div style={{
          background: darkBg,
          borderRadius: radius,
          padding: "20px 24px",
          border: `1px solid ${darkSurface}`,
        }}>
          {tokens.typeLevels.map((lv, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              padding: "10px 0",
              borderBottom: i < tokens.typeLevels.length - 1 ? `1px solid ${darkSurface}` : "none",
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: darkTextSecondary,
                minWidth: 56,
                opacity: 0.5,
              }}>{lv.name || "\u2014"}</span>
              <span style={{
                fontFamily: `'${lv.font === "heading" ? hFont : bFont}', sans-serif`,
                fontSize: `${lv.size || 16}px`,
                fontWeight: lv.weight || 400,
                lineHeight: lv.lineHeight || 1.5,
                color: darkTextPrimary,
              }}>
                The quick brown fox
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* -- Colors -- */}
      <div style={highlightStyle("step-1")}>
        {sectionLabel("Colors")}
        <div style={{ display: "flex", gap: 12 }}>
          {/* Dark palette */}
          {(tokens.colorMode === "dark-only" || tokens.colorMode === "dual") && (
          <div style={{
            flex: 1,
            padding: 16,
            background: darkBg,
            borderRadius: radius,
            border: `1px solid ${darkSurface}`,
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: darkTextSecondary,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 12,
              opacity: 0.5,
            }}>Dark</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {darkColors.map((c, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{
                    width: 40, height: 40,
                    borderRadius: Math.max(radius - 2, 4),
                    background: c.value,
                    border: `1px solid ${darkSurface}`,
                  }} />
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 8,
                    color: darkTextSecondary,
                    opacity: 0.6,
                    textAlign: "center",
                    maxWidth: 48,
                    lineHeight: 1.3,
                  }}>{c.name || "\u2014"}</span>
                </div>
              ))}
            </div>
          </div>
          )}
          {/* Light palette */}
          {(tokens.colorMode === "light-only" || tokens.colorMode === "dual") && (
          <div style={{
            flex: 1,
            padding: 16,
            background: lightBg,
            borderRadius: radius,
            border: "1px solid #E0E0E0",
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: lightTextSecondary,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 12,
              opacity: 0.5,
            }}>Light</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {lightColors.map((c, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{
                    width: 40, height: 40,
                    borderRadius: Math.max(radius - 2, 4),
                    background: c.value,
                    border: "1px solid #E0E0E0",
                  }} />
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 8,
                    color: lightTextSecondary,
                    opacity: 0.6,
                    textAlign: "center",
                    maxWidth: 48,
                    lineHeight: 1.3,
                  }}>{c.name || "\u2014"}</span>
                </div>
              ))}
            </div>
          </div>
          )}
        </div>
      </div>

      {/* -- Spacing Scale -- */}
      <div style={highlightStyle("step-1")}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          {sectionLabel("Spacing Scale")}
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: t.dim,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            opacity: 0.5,
          }}>DENSITY: {(tokens.density || "balanced").toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
          {spacings.map((sp, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{
                width: Math.min(Math.round(sp * densityMul), 64),
                height: Math.min(Math.round(sp * densityMul), 64),
                borderRadius: Math.min(radius, 4),
                background: accent,
                opacity: 0.25 + (i * 0.18),
              }} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: t.dim,
              }}>{Math.round(sp * densityMul)}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* -- Micro Details -- */}
      <div style={highlightStyle("step-1")}>
        {sectionLabel("Micro Details")}
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 48, height: 48,
              borderRadius: radius,
              background: t.surface,
              border: `${bw}px solid ${t.border}`,
            }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.dim }}>
              r:{tokens.borderRadius}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 48, height: 48,
              borderRadius: radius,
              background: t.surface,
              border: `${bw}px solid ${t.border}`,
              boxShadow: tokens.shadowLevels.includes("md")
                ? "0 4px 12px rgba(0,0,0,0.12)" : tokens.shadowLevels.includes("sm")
                ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
            }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.dim }}>
              shadow
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 48, height: 48,
              borderRadius: radius,
              background: accent,
            }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.dim }}>
              accent
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 48, height: 48,
              borderRadius: 0,
              background: t.surface,
              border: `${bw}px solid ${t.border}`,
            }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.dim }}>
              r:0 ref
            </span>
          </div>
        </div>
      </div>

      </div>}

      {/* -- Components -- */}
      {visited["step-2"] && <div style={{ animation: "previewFadeIn 0.4s ease" }}>
      <div style={highlightStyle("step-2")}>
        {sectionLabel("Components")}

        {/* Buttons */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.dim, opacity: 0.5, marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>
            Button
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <button style={{
              padding: `${Math.round((spacings[0] || 8) * densityMul)}px ${Math.round((spacings[1] || 16) * densityMul)}px`,
              borderRadius: radius,
              border: "none",
              background: accent,
              color: "#fff",
              fontFamily: `'${bFont}', monospace`,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              transition: `all ${dur}ms ${easing}`,
            }}>Primary</button>
            <button style={{
              padding: `${Math.round((spacings[0] || 8) * densityMul)}px ${Math.round((spacings[1] || 16) * densityMul)}px`,
              borderRadius: radius,
              border: `${bw}px solid ${t.border}`,
              background: "transparent",
              color: t.text,
              fontFamily: `'${bFont}', monospace`,
              fontSize: 13,
              cursor: "pointer",
            }}>Secondary</button>
            <button style={{
              padding: `${Math.round((spacings[0] || 8) * densityMul)}px ${Math.round((spacings[1] || 16) * densityMul)}px`,
              borderRadius: radius,
              border: "none",
              background: "transparent",
              color: accent,
              fontFamily: `'${bFont}', monospace`,
              fontSize: 13,
              cursor: "pointer",
            }}>Ghost</button>
            <button disabled style={{
              padding: `${Math.round((spacings[0] || 8) * densityMul)}px ${Math.round((spacings[1] || 16) * densityMul)}px`,
              borderRadius: radius,
              border: "none",
              background: `${t.dim}20`,
              color: `${t.dim}60`,
              fontFamily: `'${bFont}', monospace`,
              fontSize: 13,
              cursor: "not-allowed",
            }}>Disabled</button>
          </div>
        </div>

        {/* Card */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.dim, opacity: 0.5, marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>
            Card
          </div>
          <div style={{ display: "flex", gap: Math.round((spacings[1] || 12) * densityMul) }}>
            {[1, 2].map(n => (
              <div
                key={n}
                onMouseEnter={() => setHoverDemo(n)}
                onMouseLeave={() => setHoverDemo(false)}
                style={{
                  flex: 1,
                  padding: Math.round((spacings[1] || 16) * densityMul),
                  background: t.surface,
                  borderRadius: radius,
                  border: `${bw}px solid ${t.border}`,
                  cursor: "pointer",
                  transition: `all ${dur}ms ${easing}`,
                  transform: hoverDemo === n && tokens.hoverEffects ? "translateY(-2px)" : "none",
                }}
              >
                <div style={{
                  width: "100%",
                  height: 40,
                  borderRadius: Math.max(radius - 4, 2),
                  background: `${accent}18`,
                  marginBottom: spacings[0] || 8,
                }} />
                <div style={{
                  fontFamily: `'${hFont}', sans-serif`,
                  fontSize: 15,
                  fontWeight: 600,
                  color: t.text,
                  marginBottom: 4,
                }}>Card {n}</div>
                <div style={{
                  fontFamily: `'${bFont}', monospace`,
                  fontSize: 12,
                  color: t.dim,
                }}>Caption text</div>
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.dim, opacity: 0.5, marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>
            Input
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{
              flex: 1,
              padding: `${Math.round((spacings[0] || 8) * densityMul)}px ${Math.round((spacings[0] || 8) * 1.5 * densityMul)}px`,
              background: t.bg,
              border: `${bw}px solid ${t.border}`,
              borderRadius: radius,
              fontFamily: `'${bFont}', monospace`,
              fontSize: 13,
              color: t.dim,
              opacity: 0.6,
            }}>Placeholder text...</div>
            <div style={{
              flex: 1,
              padding: `${Math.round((spacings[0] || 8) * densityMul)}px ${Math.round((spacings[0] || 8) * 1.5 * densityMul)}px`,
              background: t.bg,
              border: `${bw}px solid ${accent}60`,
              borderRadius: radius,
              fontFamily: `'${bFont}', monospace`,
              fontSize: 13,
              color: t.text,
            }}>Focused input</div>
          </div>
        </div>
      </div>

      </div>}

      {/* -- Motion -- */}
      {visited["step-3"] && <div style={{ animation: "previewFadeIn 0.4s ease" }}>
      <div style={highlightStyle("step-3")}>
        {sectionLabel("Motion")}
        <style>{`
          @keyframes libFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes libSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes libScaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        `}</style>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: t.dim, opacity: 0.5, marginBottom: 10 }}>
              {tokens.motionLevel.toUpperCase()} · {tokens.easingStyle} · {tokens.defaultDuration}ms
            </div>
            {tokens.motionLevel !== "none" && (
              <div key={replayKey} style={{ display: "flex", gap: 8 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: 44,
                    height: 30,
                    borderRadius: Math.max(radius - 2, 2),
                    background: `${accent}${30 + i * 25}`,
                    animation: `${tokens.pageLoadStyle === "slide-up" ? "libSlideUp" : tokens.pageLoadStyle === "scale-in" ? "libScaleIn" : "libFadeIn"} ${dur}ms ${easing} ${i * dur * 0.2}ms both`,
                  }} />
                ))}
              </div>
            )}
            {tokens.motionLevel === "none" && (
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: t.dim,
                opacity: 0.4,
              }}>No animations</div>
            )}
          </div>
          {tokens.motionLevel !== "none" && (
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
            >▶ replay</button>
          )}
        </div>
      </div>
      </div>}

      {/* -- Layout -- */}
      {visited["step-1"] && selectedLayout && (
        <div style={{ animation: "previewFadeIn 0.4s ease" }}>
        <div style={highlightStyle("step-1")}>
          {sectionLabel(`Layout: ${selectedLayout}`)}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: t.dim,
            opacity: 0.5,
            lineHeight: 1.6,
          }}>
            Layout pattern applied to generated components.
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
