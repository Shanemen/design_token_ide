import { useState, useEffect, useRef } from "react";

export default function TokensPreview({ tokens, openSections, selectedLayout, theme, scrollTarget }) {
  const [replayKey, setReplayKey] = useState(0);
  const [hoverDemo, setHoverDemo] = useState(false);
  const scrollRef = useRef(null);

  // IDE theme (for chrome/labels)
  const t = theme;

  // Progressive preview: check which sub-sections have been visited
  const visited = tokens.visitedSections || {};
  const hasAnyVisited = Object.keys(visited).length > 0;

  // Auto-scroll when user opens a section on the left
  useEffect(() => {
    if (!scrollTarget || !scrollRef.current) return;
    const key = scrollTarget.key;
    setTimeout(() => {
      const el = scrollRef.current?.querySelector(`[data-section="${key}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  }, [scrollTarget]);

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

  const subLabel = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 9, color: t.dim, opacity: 0.5,
    marginBottom: 10, letterSpacing: 1, textTransform: "uppercase",
  };

  const sectionWrap = { marginBottom: 28 };
  const comp = tokens.components || {};
  const pad = spacings[0] || 8;
  const pad2 = spacings[1] || 16;

  return (
    <div ref={scrollRef} style={{
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

      {/* -- Colors -- */}
      {visited["colors"] && (
      <div data-section="colors" style={{ animation: "previewFadeIn 0.4s ease", ...sectionWrap }}>
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
      )}

      {/* -- Typography -- */}
      {visited["typography"] && (
      <div data-section="typography" style={{ animation: "previewFadeIn 0.4s ease", ...sectionWrap }}>
        {sectionLabel("Typography")}
        <div style={{
          background: bg,
          borderRadius: radius,
          padding: "20px 24px",
          border: `1px solid ${surface}`,
        }}>
          {tokens.typeLevels.map((lv, i) => {
            const isHeading = /display|heading|title|^h[1-6]$/i.test(lv.name);
            const font = isHeading ? hFont : bFont;
            return (
              <div key={i} style={{
                display: "flex",
                alignItems: "baseline",
                gap: 16,
                padding: "10px 0",
                borderBottom: i < tokens.typeLevels.length - 1 ? `1px solid ${surface}` : "none",
              }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: textSecondary,
                  minWidth: 56,
                  opacity: 0.5,
                }}>{lv.name || "\u2014"}</span>
                <span style={{
                  fontFamily: `'${font}', sans-serif`,
                  fontSize: `${lv.size || 16}px`,
                  fontWeight: lv.weight || 400,
                  lineHeight: lv.lineHeight || 1.5,
                  color: textPrimary,
                }}>
                  The quick brown fox
                </span>
              </div>
            );
          })}
        </div>
      </div>
      )}

      {/* -- Spacing Scale -- */}
      {visited["spacing"] && (
      <div data-section="spacing" style={{ animation: "previewFadeIn 0.4s ease", ...sectionWrap }}>
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
      )}

      {/* -- Micro Details -- */}
      {visited["micro"] && (
      <div data-section="micro" style={{ animation: "previewFadeIn 0.4s ease", ...sectionWrap }}>
        {sectionLabel("Micro Details")}
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 48, height: 48,
              borderRadius: radius,
              background: t.surface,
              border: `${bw}px solid ${bc}`,
            }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.dim }}>
              r:{tokens.borderRadius} · {bc}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 48, height: 48,
              borderRadius: radius,
              background: t.surface,
              border: `${bw}px solid ${bc}`,
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
              border: `${bw}px solid ${bc}`,
            }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.dim }}>
              r:0 ref
            </span>
          </div>
        </div>
      </div>
      )}

      {/* -- Components -- */}
      {visited["step-2"] && (
      <div data-section="step-2" style={{ animation: "previewFadeIn 0.4s ease", ...sectionWrap }}>
        {sectionLabel("Components")}

        {/* Button — reads variants & sizes from config */}
        <div style={{ marginBottom: 20 }}>
          <div style={subLabel}>Button</div>
          {(comp.Button?.sizes || ["md"]).map(size => {
            const scale = size === "sm" ? 0.8 : size === "lg" ? 1.2 : 1;
            return (
              <div key={size} style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.dim, minWidth: 20, opacity: 0.4 }}>{size}</span>
                {(comp.Button?.variants || ["primary", "secondary", "ghost"]).map(v => (
                  <button key={v} style={{
                    padding: `${Math.round(pad * densityMul * scale)}px ${Math.round(pad2 * densityMul * scale)}px`,
                    borderRadius: radius,
                    fontFamily: `'${bFont}', monospace`,
                    fontSize: Math.round(13 * scale),
                    cursor: "pointer",
                    transition: `all ${dur}ms ${easing}`,
                    ...(v === "primary" ? { background: accent, color: "#fff", border: "none", fontWeight: 500 }
                      : v === "secondary" ? { background: "transparent", color: t.text, border: `${bw}px solid ${t.border}` }
                      : { background: "transparent", color: accent, border: "none" }),
                  }}>{v.charAt(0).toUpperCase() + v.slice(1)}</button>
                ))}
              </div>
            );
          })}
        </div>

        {/* Text Block — paragraph & quote */}
        <div style={{ marginBottom: 20 }}>
          <div style={subLabel}>Text Block</div>
          {(comp.Text?.variants || ["paragraph"]).includes("paragraph") && (
            <div style={{
              fontFamily: `'${bFont}', sans-serif`,
              fontSize: 14,
              lineHeight: 1.7,
              color: t.text,
              marginBottom: 12,
            }}>
              A paragraph of body text that demonstrates your typography choices. Good design systems define consistent text blocks for content-heavy pages.
            </div>
          )}
          {(comp.Text?.variants || []).includes("paragraph-sm") && (
            <div style={{
              fontFamily: `'${bFont}', sans-serif`,
              fontSize: 12,
              lineHeight: 1.6,
              color: t.dim,
              marginBottom: 12,
            }}>
              A smaller paragraph for captions, footnotes, or supplementary information.
            </div>
          )}
          {(comp.Text?.variants || []).includes("blockquote") && (
            <div style={{
              ...(comp.Text?.quoteStyle === "large-italic" ? {
                fontFamily: `'${hFont}', sans-serif`,
                fontSize: 20,
                fontStyle: "italic",
                fontWeight: 500,
                color: t.text,
                padding: "12px 0",
              } : comp.Text?.quoteStyle === "centered" ? {
                fontFamily: `'${hFont}', sans-serif`,
                fontSize: 16,
                fontStyle: "italic",
                color: t.text,
                textAlign: "center",
                padding: "16px 24px",
              } : {
                fontFamily: `'${bFont}', sans-serif`,
                fontSize: 14,
                lineHeight: 1.7,
                color: t.text,
                borderLeft: `3px solid ${accent}`,
                paddingLeft: 16,
              }),
            }}>
              "Design is not just what it looks like — design is how it works."
            </div>
          )}
        </div>

        {/* Divider — reads style from config */}
        <div style={{ marginBottom: 20 }}>
          <div style={subLabel}>Divider · {comp.Divider?.style || "line"}</div>
          {(comp.Divider?.style) === "space" ? (
            <div style={{
              height: 24,
              border: `1px dashed ${t.dim}30`,
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.dim, opacity: 0.4 }}>
                24px whitespace
              </span>
            </div>
          ) : (
            <div style={{
              borderTop: (comp.Divider?.style || "line") === "dashed" ? `${bw}px dashed ${bc}`
                : (comp.Divider?.style) === "dot" ? `${bw}px dotted ${bc}`
                : `${bw}px solid ${bc}`,
            }} />
          )}
        </div>

        {/* Badge — reads variant from config */}
        <div style={{ marginBottom: 20 }}>
          <div style={subLabel}>Badge · {comp.Badge?.variant || "filled"}</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["New", "Beta", "Pro"].map(label => (
              <span key={label} style={{
                padding: `2px ${Math.round(pad * 0.8)}px`,
                borderRadius: Math.min(radius, 12),
                fontFamily: `'${bFont}', monospace`,
                fontSize: 11,
                fontWeight: 500,
                ...(comp.Badge?.variant === "outline"
                  ? { background: "transparent", color: accent, border: `1px solid ${accent}` }
                  : { background: `${accent}20`, color: accent, border: "1px solid transparent" }),
              }}>{label}</span>
            ))}
          </div>
        </div>

        {/* Avatar — reads shape & filter from config */}
        <div style={{ marginBottom: 20 }}>
          <div style={subLabel}>Avatar · {comp.Avatar?.shape || "circle"}</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {[32, 40, 48].map(s => (
              <div key={s} style={{
                width: s, height: s,
                borderRadius: (comp.Avatar?.shape || "circle") === "circle" ? "50%"
                  : (comp.Avatar?.shape) === "rounded-square" ? Math.max(radius, 6) : 0,
                background: `${accent}25`,
                border: `${bw}px solid ${t.border}`,
                filter: (comp.Avatar?.filter) === "grayscale" ? "grayscale(1)"
                  : (comp.Avatar?.filter) === "b&w" ? "grayscale(1) contrast(1.2)" : "none",
              }} />
            ))}
          </div>
        </div>

        {/* Card — reads orientation & hover from config */}
        <div style={{ marginBottom: 20 }}>
          <div style={subLabel}>Card · {comp.Card?.orientation || "vertical"}</div>
          <div style={{ display: "flex", gap: Math.round(pad2 * densityMul) }}>
            {[1, 2].map(n => {
              const isHoriz = (comp.Card?.orientation) === "horizontal";
              return (
                <div
                  key={n}
                  onMouseEnter={() => setHoverDemo(n)}
                  onMouseLeave={() => setHoverDemo(false)}
                  style={{
                    display: isHoriz ? "flex" : "block",
                    gap: isHoriz ? 12 : 0,
                    flex: 1,
                    padding: Math.round(pad2 * densityMul),
                    background: t.surface,
                    borderRadius: radius,
                    border: `${bw}px solid ${t.border}`,
                    cursor: "pointer",
                    transition: `all ${dur}ms ${easing}`,
                    transform: hoverDemo === n && (comp.Card?.hoverEffect !== false) ? "translateY(-2px)" : "none",
                  }}
                >
                  <div style={{
                    width: isHoriz ? 80 : "100%",
                    height: isHoriz ? 60 : 40,
                    borderRadius: Math.max(radius - 4, 2),
                    background: `${accent}18`,
                    marginBottom: isHoriz ? 0 : (pad || 8),
                    flexShrink: 0,
                  }} />
                  <div>
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
                </div>
              );
            })}
          </div>
        </div>

        {/* Input */}
        <div>
          <div style={subLabel}>Input</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{
              flex: 1,
              padding: `${Math.round(pad * densityMul)}px ${Math.round(pad * 1.5 * densityMul)}px`,
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
              padding: `${Math.round(pad * densityMul)}px ${Math.round(pad * 1.5 * densityMul)}px`,
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
      )}

      {/* -- Motion -- */}
      {visited["step-3"] && (
      <div data-section="step-3" style={{ animation: "previewFadeIn 0.4s ease", ...sectionWrap }}>
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
      )}

      {/* -- Layout -- */}
      {selectedLayout && (
      <div data-section="layout" style={{ animation: "previewFadeIn 0.4s ease", ...sectionWrap }}>
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
      )}
    </div>
  );
}
