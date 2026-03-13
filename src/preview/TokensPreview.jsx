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
              const ratio = comp.Card?.thumbnailRatio || "16:9";
              const [rw, rh] = ratio.split(":").map(Number);
              const thumbPct = `${(rh / rw) * 100}%`;
              return (
                <div
                  key={n}
                  onMouseEnter={() => setHoverDemo(n)}
                  onMouseLeave={() => setHoverDemo(false)}
                  style={{
                    display: isHoriz ? "flex" : "block",
                    gap: isHoriz ? Math.round(pad2 * densityMul) : 0,
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
                  {isHoriz ? (
                    <div style={{
                      width: 100,
                      height: Math.round(100 * (rh / rw)),
                      borderRadius: Math.max(radius - 4, 2),
                      background: `${accent}18`,
                      flexShrink: 0,
                    }} />
                  ) : (
                    <div style={{
                      width: "100%",
                      paddingBottom: thumbPct,
                      borderRadius: Math.max(radius - 4, 2),
                      background: `${accent}18`,
                      marginBottom: pad || 8,
                    }} />
                  )}
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
        <div style={{ marginBottom: 20 }}>
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

        {/* Icon — library, style, weight */}
        <div style={{ marginBottom: 20 }}>
          <div style={subLabel}>Icon · {comp.Icon?.library || "Lucide"} · {comp.Icon?.style || "outline"}</div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {/* Render placeholder icons using SVG */}
            {[
              /* home */ "M3 12l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z",
              /* search */ "M11 3a8 8 0 100 16 8 8 0 000-16zM21 21l-4.35-4.35",
              /* heart */ "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z",
              /* star */ "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z",
              /* settings */ "M12 15a3 3 0 100-6 3 3 0 000 6z",
            ].map((d, i) => (
              <svg key={i} width="24" height="24" viewBox="0 0 24 24"
                fill={(comp.Icon?.style) === "filled" ? accent : "none"}
                stroke={(comp.Icon?.style) === "filled" ? "none" : t.text}
                strokeWidth={parseFloat(comp.Icon?.weight) || 1.5}
                strokeLinecap="round" strokeLinejoin="round"
              >
                <path d={d} />
              </svg>
            ))}
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.dim, opacity: 0.4 }}>
              stroke: {comp.Icon?.weight || "1.5"}
            </span>
          </div>
        </div>

        {/* Navbar */}
        <div style={{ marginBottom: 20 }}>
          <div style={subLabel}>Navbar · {comp.Navbar?.layout || "logo-left"}</div>
          <div style={{
            display: "flex",
            alignItems: (comp.Navbar?.layout) === "centered" ? "center" : "center",
            flexDirection: (comp.Navbar?.layout) === "centered" ? "column" : "row",
            justifyContent: (comp.Navbar?.layout) === "centered" ? "center" : "space-between",
            gap: (comp.Navbar?.layout) === "centered" ? 8 : 0,
            padding: `${Math.round(pad * densityMul)}px ${Math.round(pad2 * densityMul)}px`,
            background: comp.Navbar?.transparent ? "transparent" : surface,
            borderRadius: radius,
            border: `${bw}px solid ${bc}`,
          }}>
            {(comp.Navbar?.layout) === "hamburger-only" ? (<>
              <div style={{ fontFamily: `'${hFont}', sans-serif`, fontSize: 14, fontWeight: 600, color: textPrimary }}>Logo</div>
              <div style={{ fontSize: 18, color: textPrimary, cursor: "pointer" }}>☰</div>
            </>) : (<>
              <div style={{ fontFamily: `'${hFont}', sans-serif`, fontSize: 14, fontWeight: 600, color: textPrimary }}>Logo</div>
              <div style={{ display: "flex", gap: Math.round(pad2 * densityMul), alignItems: "center" }}>
                {["Home", "About", "Work", "Contact"].map(item => (
                  <span key={item} style={{ fontFamily: `'${bFont}', sans-serif`, fontSize: 12, color: textSecondary, cursor: "pointer" }}>{item}</span>
                ))}
                <span style={{
                  padding: `${Math.round(pad * 0.5 * densityMul)}px ${Math.round(pad * densityMul)}px`,
                  background: accent, color: "#fff", borderRadius: radius, fontSize: 11,
                  fontFamily: `'${bFont}', sans-serif`, fontWeight: 500,
                }}>CTA</span>
              </div>
            </>)}
          </div>
        </div>

        {/* Hero */}
        <div style={{ marginBottom: 20 }}>
          <div style={subLabel}>Hero · {comp.Hero?.visualType || "illustration"}</div>
          <div style={{
            background: bg,
            borderRadius: radius,
            border: `${bw}px solid ${bc}`,
            padding: Math.round(pad2 * 1.5 * densityMul),
            display: "flex",
            gap: Math.round(pad2 * densityMul),
            alignItems: "center",
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: `'${hFont}', sans-serif`,
                fontSize: 22,
                fontWeight: 700,
                color: textPrimary,
                lineHeight: 1.2,
                marginBottom: 8,
              }}>Build something amazing</div>
              <div style={{
                fontFamily: `'${bFont}', sans-serif`,
                fontSize: 13,
                color: textSecondary,
                lineHeight: 1.6,
                marginBottom: 12,
              }}>A short tagline that describes what this product does and why it matters.</div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{
                  padding: `${Math.round(pad * densityMul)}px ${Math.round(pad2 * densityMul)}px`,
                  background: accent, color: "#fff", borderRadius: radius, fontSize: 12,
                  fontFamily: `'${bFont}', sans-serif`, fontWeight: 500,
                }}>Get Started</span>
                <span style={{
                  padding: `${Math.round(pad * densityMul)}px ${Math.round(pad2 * densityMul)}px`,
                  border: `${bw}px solid ${textSecondary}40`, color: textSecondary, borderRadius: radius, fontSize: 12,
                  fontFamily: `'${bFont}', sans-serif`,
                }}>Learn More</span>
              </div>
            </div>
            <div style={{
              width: 120, height: 90,
              borderRadius: radius,
              background: `${accent}15`,
              border: `1px dashed ${accent}40`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: accent, opacity: 0.6 }}>
                {(comp.Hero?.visualType || "illustration").replace("-", " ")}
              </span>
            </div>
          </div>
        </div>

        {/* Section */}
        <div style={{ marginBottom: 20 }}>
          <div style={subLabel}>Section · {comp.Section?.variant || "centered"}</div>
          <div style={{
            background: surface,
            borderRadius: radius,
            border: `${bw}px solid ${bc}`,
            padding: Math.round(pad2 * densityMul),
            display: "flex",
            flexDirection: (comp.Section?.variant === "left-image" || comp.Section?.variant === "right-image") ? "row" : "column",
            alignItems: (comp.Section?.variant === "centered" || comp.Section?.variant === "full-width") ? "center" : "flex-start",
            gap: Math.round(pad2 * densityMul),
            textAlign: (comp.Section?.variant === "centered") ? "center" : "left",
          }}>
            {(comp.Section?.variant === "left-image") && (
              <div style={{
                width: 80, height: 60, borderRadius: radius,
                background: `${accent}15`, flexShrink: 0,
              }} />
            )}
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: `'${hFont}', sans-serif`, fontSize: 16, fontWeight: 600,
                color: textPrimary, marginBottom: 6,
              }}>Section Title</div>
              <div style={{
                fontFamily: `'${bFont}', sans-serif`, fontSize: 12, color: textSecondary,
                lineHeight: 1.6, maxWidth: (comp.Section?.variant === "centered") ? 300 : "none",
                margin: (comp.Section?.variant === "centered") ? "0 auto" : 0,
              }}>A brief description of this section's content. It provides context and guides the reader.</div>
            </div>
            {(comp.Section?.variant === "right-image") && (
              <div style={{
                width: 80, height: 60, borderRadius: radius,
                background: `${accent}15`, flexShrink: 0,
              }} />
            )}
          </div>
        </div>

        {/* Gallery */}
        <div style={{ marginBottom: 20 }}>
          <div style={subLabel}>Gallery · {comp.Gallery?.style || "grid"} · {comp.Gallery?.columns || 3} cols</div>
          {(comp.Gallery?.style === "horizontal-scroll") ? (
            <div style={{
              display: "flex",
              gap: Math.round(pad * densityMul),
              overflowX: "auto",
              paddingBottom: 4,
            }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{
                  width: 120, height: 90,
                  borderRadius: radius,
                  background: `${accent}${10 + (i % 3) * 5}`,
                  border: `${bw}px solid ${bc}`,
                  flexShrink: 0,
                }} />
              ))}
            </div>
          ) : (comp.Gallery?.style === "masonry") ? (
            <div style={{
              columnCount: parseInt(comp.Gallery?.columns || 3),
              columnGap: Math.round(pad * densityMul),
            }}>
              {Array.from({ length: parseInt(comp.Gallery?.columns || 3) * 2 }).map((_, i) => (
                <div key={i} style={{
                  height: [100, 140, 80, 120, 160, 90][i % 6],
                  borderRadius: radius,
                  background: `${accent}${10 + (i % 3) * 5}`,
                  border: `${bw}px solid ${bc}`,
                  marginBottom: Math.round(pad * densityMul),
                  breakInside: "avoid",
                }} />
              ))}
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: `repeat(${comp.Gallery?.columns || 3}, 1fr)`,
              gap: Math.round(pad * densityMul),
            }}>
              {Array.from({ length: parseInt(comp.Gallery?.columns || 3) * 2 }).map((_, i) => (
                <div key={i} style={{
                  aspectRatio: "4/3",
                  borderRadius: radius,
                  background: `${accent}${10 + (i % 3) * 5}`,
                  border: `${bw}px solid ${bc}`,
                }} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ marginBottom: 20 }}>
          <div style={subLabel}>Footer · {comp.Footer?.structure || "multi-column"}</div>
          <div style={{
            background: bg,
            borderRadius: radius,
            border: `${bw}px solid ${bc}`,
            padding: Math.round(pad2 * densityMul),
          }}>
            {(comp.Footer?.structure === "simple") ? (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: `'${hFont}', sans-serif`, fontSize: 13, fontWeight: 600, color: textPrimary }}>Logo</span>
                <span style={{ fontFamily: `'${bFont}', sans-serif`, fontSize: 11, color: textSecondary }}>© 2026 Company. All rights reserved.</span>
              </div>
            ) : (<>
              <div style={{ display: "flex", gap: Math.round(pad2 * 2 * densityMul), marginBottom: 16 }}>
                {["Product", "Company", "Resources"].map(col => (
                  <div key={col} style={{ flex: 1 }}>
                    <div style={{ fontFamily: `'${bFont}', sans-serif`, fontSize: 11, fontWeight: 600, color: textPrimary, marginBottom: 8 }}>{col}</div>
                    {["Link 1", "Link 2", "Link 3"].map(link => (
                      <div key={link} style={{ fontFamily: `'${bFont}', sans-serif`, fontSize: 11, color: textSecondary, marginBottom: 4, cursor: "pointer" }}>{link}</div>
                    ))}
                  </div>
                ))}
              </div>
              {comp.Footer?.hasNewsletter && (
                <div style={{
                  display: "flex", gap: 8, marginBottom: 12,
                }}>
                  <div style={{
                    flex: 1, padding: `${Math.round(pad * 0.6 * densityMul)}px ${Math.round(pad * densityMul)}px`,
                    border: `${bw}px solid ${textSecondary}30`, borderRadius: radius,
                    fontFamily: `'${bFont}', sans-serif`, fontSize: 11, color: textSecondary,
                  }}>Enter your email</div>
                  <span style={{
                    padding: `${Math.round(pad * 0.6 * densityMul)}px ${Math.round(pad * densityMul)}px`,
                    background: accent, color: "#fff", borderRadius: radius, fontSize: 11,
                    fontFamily: `'${bFont}', sans-serif`, fontWeight: 500,
                  }}>Subscribe</span>
                </div>
              )}
              <div style={{
                borderTop: `1px solid ${textSecondary}20`, paddingTop: 10,
                fontFamily: `'${bFont}', sans-serif`, fontSize: 10, color: textSecondary, opacity: 0.6,
              }}>© 2026 Company. All rights reserved.</div>
            </>)}
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginBottom: 20 }}>
          <div style={subLabel}>CTA · {comp.CTA?.structure || "centered"}</div>
          <div style={{
            background: (comp.CTA?.structure === "with-background") ? accent : surface,
            borderRadius: radius,
            border: `${bw}px solid ${(comp.CTA?.structure === "with-background") ? accent : bc}`,
            padding: Math.round(pad2 * 1.5 * densityMul),
            display: "flex",
            flexDirection: (comp.CTA?.structure === "left-text-right-button") ? "row" : "column",
            alignItems: "center",
            justifyContent: (comp.CTA?.structure === "left-text-right-button") ? "space-between" : "center",
            textAlign: (comp.CTA?.structure === "left-text-right-button") ? "left" : "center",
            gap: 12,
          }}>
            <div>
              <div style={{
                fontFamily: `'${hFont}', sans-serif`, fontSize: 17, fontWeight: 700,
                color: (comp.CTA?.structure === "with-background") ? "#fff" : textPrimary,
                marginBottom: 4,
              }}>Ready to get started?</div>
              <div style={{
                fontFamily: `'${bFont}', sans-serif`, fontSize: 12,
                color: (comp.CTA?.structure === "with-background") ? "#ffffffcc" : textSecondary,
              }}>Join thousands of happy customers today.</div>
            </div>
            <span style={{
              padding: `${Math.round(pad * densityMul)}px ${Math.round(pad2 * densityMul)}px`,
              background: (comp.CTA?.structure === "with-background") ? "#fff" : accent,
              color: (comp.CTA?.structure === "with-background") ? accent : "#fff",
              borderRadius: radius, fontSize: 12,
              fontFamily: `'${bFont}', sans-serif`, fontWeight: 500,
              flexShrink: 0,
            }}>Sign Up Free</span>
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
