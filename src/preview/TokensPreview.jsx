import { useState, useEffect, useRef } from "react";
import { getSpacing } from "../spacingPresets";

export default function TokensPreview({ tokens, openSections, selectedLayout, theme, scrollTarget }) {
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

  const colors = tokens.colors || {};
  const bg = colors.bg || "#FAFAFA";
  const surface = colors.surface || "#FFFFFF";
  const textPrimary = colors.textPrimary || "#1A1A2E";
  const textSecondary = colors.textSecondary || "#6B7280";
  const accent = colors.accent || "#E8734A";
  const warning = colors.warning || "#F59E0B";
  const success = colors.success || "#10B981";

  const sp = getSpacing(tokens.density).semantic;

  const defaultRadius = parseInt(tokens.borderRadius) || 8;
  const bw = parseInt(tokens.borderWidth) || 1;
  const bc = tokens.borderColor || "#222233";
  const borderComps = tokens.borderComponents || {};
  const radiusOverrides = tokens.radiusOverrides || {};
  // Returns radius for a component — uses override if set, otherwise default
  const r = (compId) => parseInt(radiusOverrides[compId]) || defaultRadius;
  // Whether a component has border enabled
  const hasBorder = (compId) => !!borderComps[compId];
  // Returns border string for a component
  const b = (compId) => hasBorder(compId) ? `${bw}px solid ${bc}` : "none";
  // Alias for backward compat in non-component contexts
  const radius = defaultRadius;


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

  const compLabel = (name, desc) => (
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 14 }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        color: t.accent,
        letterSpacing: 2,
        textTransform: "uppercase",
        opacity: 0.7,
      }}>{name}</div>
      {desc && <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9,
        color: t.dim,
        letterSpacing: 1.5,
        textTransform: "uppercase",
        opacity: 0.5,
      }}>{desc}</span>}
    </div>
  );

  const previewGap = 28;
  const sectionWrap = { marginBottom: previewGap };
  const comp = tokens.components || {};

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
        <div style={{
          padding: 16,
          background: t.surface,
          borderRadius: 10,
          border: `1px solid ${t.border}`,
        }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { key: "bg", label: "bg", value: bg },
              { key: "surface", label: "surface", value: surface },
              { key: "textPrimary", label: "text 1°", value: textPrimary },
              { key: "textSecondary", label: "text 2°", value: textSecondary },
              { key: "accent", label: "accent", value: accent },
              { key: "warning", label: "warning", value: warning },
              { key: "success", label: "success", value: success },
            ].map(c => (
              <div key={c.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{
                  width: 40, height: 40,
                  borderRadius: 6,
                  background: c.value,
                  border: `1px solid ${t.border}`,
                }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 8,
                  color: t.dim,
                  opacity: 0.6,
                  textAlign: "center",
                  maxWidth: 48,
                  lineHeight: 1.3,
                }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}

      {/* -- Typography -- */}
      {visited["typography"] && (
      <div data-section="typography" style={{ animation: "previewFadeIn 0.4s ease", ...sectionWrap }}>
        {sectionLabel("Typography")}
        <div style={{
          background: t.surface,
          borderRadius: 10,
          padding: "20px 24px",
          border: `1px solid ${t.border}`,
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
                borderBottom: i < tokens.typeLevels.length - 1 ? `1px solid ${t.border}` : "none",
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

      {/* -- Spacing — visual scenarios -- */}
      {visited["spacing"] && (
      <div data-section="spacing" style={{ animation: "previewFadeIn 0.4s ease", ...sectionWrap }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 14 }}>
          {sectionLabel("Spacing")}
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: t.dim,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            opacity: 0.5,
          }}>{(tokens.density || "balanced").toUpperCase()}</span>
        </div>

        <div style={{
          display: "flex", flexDirection: "column", gap: 16,
          padding: 16,
          background: t.surface,
          borderRadius: 10,
          border: `1px solid ${t.border}`,
        }}>
          {/* Button inline padding */}
          <div>
            <div style={subLabel}>INLINE PADDING (BUTTON)</div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{
                padding: `${sp.inlineY}px ${sp.inlineX}px`,
                background: accent,
                color: "#fff",
                borderRadius: radius,
                fontFamily: `'${bFont}', sans-serif`,
                fontSize: 13,
                fontWeight: 500,
              }}>Button</div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.dim, opacity: 0.5 }}>
                {sp.inlineY}px / {sp.inlineX}px
              </span>
            </div>
          </div>

          {/* Card content padding */}
          <div>
            <div style={subLabel}>CONTENT PADDING (CARD)</div>
            <div style={{
              padding: sp.content,
              background: bg,
              borderRadius: radius,
              border: `1px solid ${t.border}`,
              display: "flex", flexDirection: "column", gap: sp.element,
            }}>
              <div style={{ fontFamily: `'${hFont}', sans-serif`, fontSize: 14, fontWeight: 600, color: textPrimary }}>Card Title</div>
              <div style={{ fontFamily: `'${bFont}', sans-serif`, fontSize: 12, color: textSecondary }}>Body text inside card</div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.dim, opacity: 0.5, marginTop: 2 }}>
                content: {sp.content}px · element gap: {sp.element}px
              </span>
            </div>
          </div>

          {/* Block gap (cards side by side) */}
          <div>
            <div style={subLabel}>BLOCK GAP (BETWEEN CARDS)</div>
            <div style={{ display: "flex", gap: sp.block }}>
              {[1, 2, 3].map(n => (
                <div key={n} style={{
                  flex: 1,
                  padding: sp.content,
                  background: bg,
                  borderRadius: radius,
                  border: `1px solid ${t.border}`,
                  textAlign: "center",
                }}>
                  <div style={{ fontFamily: `'${bFont}', sans-serif`, fontSize: 11, color: textSecondary }}>Card {n}</div>
                </div>
              ))}
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.dim, opacity: 0.5, marginTop: 4, display: "block" }}>
              block gap: {sp.block}px
            </span>
          </div>

          {/* Section spacing */}
          <div>
            <div style={subLabel}>SECTION SPACING</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{
                padding: `${sp.element}px ${sp.page}px`,
                background: bg,
                borderRadius: radius,
                border: `1px solid ${t.border}`,
                textAlign: "center",
              }}>
                <div style={{ fontFamily: `'${hFont}', sans-serif`, fontSize: 13, fontWeight: 600, color: textPrimary }}>Section A</div>
              </div>
              {/* Dimension line between sections */}
              <div style={{
                height: sp.section,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}>
                {/* Vertical dashed line */}
                <div style={{
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  bottom: 0,
                  borderLeft: `1px dashed ${t.dim}55`,
                }} />
                {/* Label */}
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  color: t.dim,
                  opacity: 0.6,
                  background: t.surface,
                  padding: "2px 6px",
                  borderRadius: 3,
                  position: "relative",
                }}>{sp.section}px</span>
              </div>
              <div style={{
                padding: `${sp.element}px ${sp.page}px`,
                background: bg,
                borderRadius: radius,
                border: `1px solid ${t.border}`,
                textAlign: "center",
              }}>
                <div style={{ fontFamily: `'${hFont}', sans-serif`, fontSize: 13, fontWeight: 600, color: textPrimary }}>Section B</div>
              </div>
            </div>
          </div>

          {/* Page padding + max width */}
          <div>
            <div style={subLabel}>PAGE PADDING · MAX WIDTH</div>
            <div style={{
              background: `${t.border}33`,
              borderRadius: radius,
              padding: `${sp.element}px ${sp.page}px`,
              display: "flex",
              justifyContent: "center",
            }}>
              <div style={{
                width: "100%",
                maxWidth: tokens.maxContentWidth === "full" ? "100%" : `${Math.min(parseInt(tokens.maxContentWidth) || 1200, 280)}px`,
                background: bg,
                borderRadius: Math.max(radius - 4, 2),
                border: `1px solid ${t.border}`,
                padding: `${sp.element}px ${sp.block}px`,
                textAlign: "center",
              }}>
                <div style={{ fontFamily: `'${bFont}', sans-serif`, fontSize: 11, color: textSecondary }}>Content area</div>
              </div>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.dim, opacity: 0.5, marginTop: 4, display: "block" }}>
              page padding: {sp.page}px · max-width: {tokens.maxContentWidth === "full" ? "100%" : tokens.maxContentWidth + "px"}
            </span>
          </div>
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
              background: surface,
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
              background: surface,
              border: `${bw}px solid ${bc}`,
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
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
              background: surface,
              border: `${bw}px solid ${bc}`,
            }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.dim }}>
              r:0 ref
            </span>
          </div>
        </div>
      </div>
      )}

      {/* -- Components (progressive: each appears when user configures it) -- */}

      {visited["comp-Button"] && (
      <div data-section="comp-Button" style={{ animation: "previewFadeIn 0.4s ease", ...sectionWrap }}>
        {/* Button — reads variants & sizes from config */}
        <div style={{ marginBottom: previewGap }}>
          {compLabel("Button")}
          {(comp.Button?.sizes || ["md"]).map(size => {
            const scale = size === "sm" ? 0.8 : size === "lg" ? 1.2 : 1;
            return (
              <div key={size} style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: t.dim, minWidth: 20, opacity: 0.4 }}>{size}</span>
                {(comp.Button?.variants || ["primary", "secondary", "ghost"]).map(v => (
                  <button key={v} style={{
                    padding: `${Math.round(sp.inlineY * scale)}px ${Math.round(sp.inlineX * scale)}px`,
                    borderRadius: r("Button"),
                    fontFamily: `'${bFont}', monospace`,
                    fontSize: Math.round(13 * scale),
                    cursor: "pointer",
                    transition: `all ${dur}ms ${easing}`,
                    ...(v === "primary" ? { background: accent, color: "#fff", border: "none", fontWeight: 500 }
                      : v === "secondary" ? { background: "transparent", color: textPrimary, border: hasBorder("Button") ? `${bw}px solid ${bc}` : "none" }
                      : { background: "transparent", color: accent, border: "none" }),
                  }}>{v.charAt(0).toUpperCase() + v.slice(1)}</button>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      )}

      {visited["comp-Text"] && (
      <div data-section="comp-Text" style={{ animation: "previewFadeIn 0.4s ease", ...sectionWrap }}>
        {/* Text Block — paragraph & quote */}
        <div style={{ marginBottom: previewGap }}>
          {compLabel("Text Block")}
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
      </div>
      )}

      {visited["comp-Divider"] && (
      <div data-section="comp-Divider" style={{ animation: "previewFadeIn 0.4s ease", ...sectionWrap }}>
        {/* Divider — reads style from config */}
        <div style={{ marginBottom: previewGap, minHeight: 48 }}>
          {compLabel("Divider", comp.Divider?.style || "line")}
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
      </div>
      )}

      {visited["comp-Badge"] && (
      <div data-section="comp-Badge" style={{ animation: "previewFadeIn 0.4s ease", ...sectionWrap }}>
        {/* Badge — reads variant from config */}
        <div style={{ marginBottom: previewGap, minHeight: 48 }}>
          {compLabel("Badge", comp.Badge?.variant || "filled")}
          <div style={{ display: "flex", gap: 8 }}>
            {["New", "Beta", "Pro"].map(label => (
              <span key={label} style={{
                padding: `2px ${Math.round(sp.inlineY * 0.8)}px`,
                borderRadius: Math.min(r("Badge"), 12),
                fontFamily: `'${bFont}', monospace`,
                fontSize: 11,
                fontWeight: 500,
                ...(comp.Badge?.variant === "outline"
                  ? { background: "transparent", color: accent, border: hasBorder("Badge") ? `1px solid ${accent}` : "none" }
                  : { background: `${accent}20`, color: accent, border: "1px solid transparent" }),
              }}>{label}</span>
            ))}
          </div>
        </div>
      </div>
      )}

      {visited["comp-Avatar"] && (
      <div data-section="comp-Avatar" style={{ animation: "previewFadeIn 0.4s ease", ...sectionWrap }}>
        {/* Avatar — reads shape & filter from config */}
        <div style={{ marginBottom: previewGap, minHeight: 48 }}>
          {compLabel("Avatar", comp.Avatar?.shape || "circle")}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {[32, 40, 48].map(s => (
              <div key={s} style={{
                width: s, height: s,
                borderRadius: (comp.Avatar?.shape || "circle") === "circle" ? "50%"
                  : (comp.Avatar?.shape) === "rounded-square" ? Math.max(hasBorder("Avatar") ? radius : 4, 6) : 0,
                background: `${accent}25`,
                border: hasBorder("Avatar") ? `${bw}px solid ${bc}` : "none",
                filter: (comp.Avatar?.filter) === "grayscale" ? "grayscale(1)"
                  : (comp.Avatar?.filter) === "b&w" ? "grayscale(1) contrast(1.2)" : "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden",
              }}>
                <svg width={Math.round(s * 0.55)} height={Math.round(s * 0.55)} viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M20 21a8 8 0 00-16 0" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}

      {visited["comp-Card"] && (
      <div data-section="comp-Card" style={{ animation: "previewFadeIn 0.4s ease", ...sectionWrap }}>
        {/* Card — reads orientation & hover from config */}
        <div style={{ marginBottom: previewGap }}>
          {compLabel("Card", comp.Card?.orientation || "vertical")}
          <div style={{ display: "flex", gap: sp.block }}>
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
                    gap: isHoriz ? sp.block : 0,
                    flex: 1,
                    padding: sp.content,
                    background: t.surface,
                    borderRadius: r("Card"),
                    border: hasBorder("Card") ? `${bw}px solid ${t.border}` : "none",
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
                      marginBottom: sp.element,
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
      </div>
      )}

      {visited["comp-Icon"] && (
      <div data-section="comp-Icon" style={{ animation: "previewFadeIn 0.4s ease", ...sectionWrap }}>
        {/* Icon — library, style, weight */}
        <div style={{ marginBottom: previewGap }}>
          {compLabel("Icon", `${comp.Icon?.library || "Lucide"} · ${comp.Icon?.style || "outline"} · stroke: ${parseFloat(comp.Icon?.weight) || 1.5}`)}
          {(() => {
            const lib = comp.Icon?.library || "Lucide";
            const style = comp.Icon?.style || "outline";
            const sw = parseFloat(comp.Icon?.weight) || 1.5;
            const isFilled = style === "filled";
            const isDuotone = style === "duotone";
            // Different icon paths per library to show visual distinction
            const iconSets = {
              Lucide: [
                "M3 12l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z",
                "M11 3a8 8 0 100 16 8 8 0 000-16zM21 21l-4.35-4.35",
                "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z",
                "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z",
                "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
              ],
              Heroicons: [
                "M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0l8.955 8.955M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
                "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
                "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
                "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
                "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
              ],
              Phosphor: [
                "M3 12.5l9-9 9 9M5 11v8.5a1.5 1.5 0 001.5 1.5h4V16h3v5h4a1.5 1.5 0 001.5-1.5V11",
                "M10.5 3a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM21 21l-4.5-4.5",
                "M12 21C12 21 3 13.5 3 8.25A4.5 4.5 0 017.5 3.75c1.74 0 3.27.96 4.5 2.5 1.23-1.54 2.76-2.5 4.5-2.5A4.5 4.5 0 0121 8.25C21 13.5 12 21 12 21z",
                "M12 2l2.94 6.04L21.5 9l-5 4.58L18 20l-6-3.5L6 20l1.5-6.42-5-4.58 6.56-.96L12 2z",
                "M3 5.5A1.5 1.5 0 014.5 4h15A1.5 1.5 0 0121 5.5v13a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 18.5v-13zM3 8l9 5.5L21 8",
              ],
              Feather: [
                "M3 12l9-8 9 8M5 10v9a1 1 0 001 1h3v-5h6v5h3a1 1 0 001-1v-9",
                "M11 3a8 8 0 100 16 8 8 0 000-16zM21 21l-4.35-4.35",
                "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z",
                "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z",
                "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
              ],
            };
            const paths = iconSets[lib] || iconSets.Lucide;
            const names = ["home", "search", "heart", "star", "mail"];
            return (
              <div>
                <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 12 }}>
                  {paths.map((d, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                      <svg width="24" height="24" viewBox="0 0 24 24"
                        fill={isFilled ? textPrimary : isDuotone ? `${textPrimary}20` : "none"}
                        stroke={isFilled ? textPrimary : isDuotone ? "none" : textPrimary}
                        strokeWidth={isFilled ? sw * 0.75 : sw}
                        strokeLinecap="round" strokeLinejoin="round"
                      >
                        <path d={d} />
                        {isDuotone && <path d={d} fill="none" stroke={textPrimary} strokeWidth={sw} />}
                      </svg>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: t.dim, opacity: 0.4 }}>{names[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
      )}

      {visited["comp-Navbar"] && (
      <div data-section="comp-Navbar" style={{ animation: "previewFadeIn 0.4s ease", ...sectionWrap }}>
        {/* Navbar */}
        <div style={{ marginBottom: previewGap }}>
          {compLabel("Navbar", comp.Navbar?.layout || "logo-left")}
          <div style={{
            display: "flex",
            alignItems: (comp.Navbar?.layout) === "centered" ? "center" : "center",
            flexDirection: (comp.Navbar?.layout) === "centered" ? "column" : "row",
            justifyContent: (comp.Navbar?.layout) === "centered" ? "center" : "space-between",
            gap: (comp.Navbar?.layout) === "centered" ? 8 : 0,
            padding: `${sp.inlineY}px ${sp.inlineX}px`,
            background: comp.Navbar?.transparent ? "transparent" : surface,
            borderRadius: r("Navbar"),
            border: b("Navbar"),
          }}>
            {(comp.Navbar?.layout) === "hamburger-only" ? (<>
              <div style={{ fontFamily: `'${hFont}', sans-serif`, fontSize: 14, fontWeight: 600, color: textPrimary }}>Logo</div>
              <div style={{ fontSize: 18, color: textPrimary, cursor: "pointer" }}>☰</div>
            </>) : (<>
              <div style={{ fontFamily: `'${hFont}', sans-serif`, fontSize: 14, fontWeight: 600, color: textPrimary }}>Logo</div>
              <div style={{ display: "flex", gap: sp.block, alignItems: "center" }}>
                {["Home", "About", "Work", "Contact"].map(item => (
                  <span key={item} style={{ fontFamily: `'${bFont}', sans-serif`, fontSize: 12, color: textSecondary, cursor: "pointer" }}>{item}</span>
                ))}
                <span style={{
                  padding: `${Math.round(sp.inlineY * 0.5)}px ${sp.inlineX}px`,
                  background: accent, color: "#fff", borderRadius: radius, fontSize: 11,
                  fontFamily: `'${bFont}', sans-serif`, fontWeight: 500,
                }}>CTA</span>
              </div>
            </>)}
          </div>
        </div>
      </div>
      )}

      {visited["comp-Hero"] && (
      <div data-section="comp-Hero" style={{ animation: "previewFadeIn 0.4s ease", ...sectionWrap }}>
        {/* Hero */}
        <div style={{ marginBottom: previewGap }}>
          {compLabel("Hero", comp.Hero?.visualType || "illustration")}
          <div style={{
            background: bg,
            borderRadius: r("Hero"),
            border: b("Hero"),
            padding: sp.content,
            display: "flex",
            gap: sp.block,
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
                  padding: `${sp.inlineY}px ${sp.inlineX}px`,
                  background: accent, color: "#fff", borderRadius: radius, fontSize: 12,
                  fontFamily: `'${bFont}', sans-serif`, fontWeight: 500,
                }}>Get Started</span>
                <span style={{
                  padding: `${sp.inlineY}px ${sp.inlineX}px`,
                  border: `${bw}px solid ${textSecondary}40`, color: textSecondary, borderRadius: radius, fontSize: 12,
                  fontFamily: `'${bFont}', sans-serif`,
                }}>Learn More</span>
              </div>
            </div>
            {(() => {
              const vt = comp.Hero?.visualType || "illustration";
              if (vt === "none") return null;
              // Different placeholder SVGs per visual type
              const visualSvg = {
                "illustration": <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.5"><path d="M8 36c4-8 8-20 16-20s8 12 16 20" /><circle cx="36" cy="12" r="4" /></svg>,
                "3d-render": <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.5"><path d="M24 6l16 9v18l-16 9-16-9V15z" /><path d="M24 6v18m0 18V24m16-9L24 24M8 15l16 9" /></svg>,
                "photography": <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.5"><rect x="4" y="8" width="40" height="32" rx="2" /><path d="M4 32l10-10 8 8 8-12 14 14" /><circle cx="14" cy="18" r="3" /></svg>,
                "abstract-graphic": <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.5"><circle cx="20" cy="20" r="12" /><circle cx="32" cy="28" r="10" /><rect x="8" y="30" width="14" height="14" rx="2" /></svg>,
                "animation": <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.5"><circle cx="24" cy="24" r="18" /><polygon points="20,14 36,24 20,34" fill={`${accent}30`} /></svg>,
              };
              return (
                <div style={{
                  width: 120, height: 90,
                  borderRadius: radius,
                  background: `${accent}15`,
                  border: `1px dashed ${accent}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {visualSvg[vt] || <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: accent, opacity: 0.6 }}>{vt}</span>}
                </div>
              );
            })()}
          </div>
          {comp.Hero?.visualNotes && (
            <div style={{
              fontFamily: `'${bFont}', sans-serif`,
              fontSize: 10,
              fontStyle: "italic",
              color: textSecondary,
              opacity: 0.7,
              marginTop: 6,
            }}>{comp.Hero.visualNotes}</div>
          )}
        </div>
      </div>
      )}

      {visited["comp-Gallery"] && (
      <div data-section="comp-Gallery" style={{ animation: "previewFadeIn 0.4s ease", ...sectionWrap }}>
        {/* Gallery */}
        <div style={{ marginBottom: previewGap }}>
          {compLabel("Gallery", `${comp.Gallery?.style || "grid"} · ${comp.Gallery?.columns || 3} cols`)}
          {(comp.Gallery?.style === "horizontal-scroll") ? (
            <div style={{
              display: "flex",
              gap: sp.block,
              overflowX: "auto",
              paddingBottom: 4,
            }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{
                  width: 120, height: 90,
                  borderRadius: r("Gallery"),
                  background: `${accent}${10 + (i % 3) * 5}`,
                  border: b("Gallery"),
                  flexShrink: 0,
                }} />
              ))}
            </div>
          ) : (comp.Gallery?.style === "masonry") ? (
            <div style={{
              columnCount: parseInt(comp.Gallery?.columns || 3),
              columnGap: sp.block,
            }}>
              {Array.from({ length: parseInt(comp.Gallery?.columns || 3) * 2 }).map((_, i) => (
                <div key={i} style={{
                  height: [100, 140, 80, 120, 160, 90][i % 6],
                  borderRadius: r("Gallery"),
                  background: `${accent}${10 + (i % 3) * 5}`,
                  border: b("Gallery"),
                  marginBottom: sp.block,
                  breakInside: "avoid",
                }} />
              ))}
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: `repeat(${comp.Gallery?.columns || 3}, 1fr)`,
              gap: sp.block,
            }}>
              {Array.from({ length: parseInt(comp.Gallery?.columns || 3) * 2 }).map((_, i) => (
                <div key={i} style={{
                  aspectRatio: "4/3",
                  borderRadius: r("Gallery"),
                  background: `${accent}${10 + (i % 3) * 5}`,
                  border: b("Gallery"),
                }} />
              ))}
            </div>
          )}
        </div>
      </div>
      )}


      {visited["comp-Footer"] && (
      <div data-section="comp-Footer" style={{ animation: "previewFadeIn 0.4s ease", ...sectionWrap }}>
        {/* Footer */}
        <div style={{ marginBottom: previewGap }}>
          {compLabel("Footer", comp.Footer?.structure || "multi-column")}
          <div style={{
            background: bg,
            borderRadius: r("Footer"),
            border: b("Footer"),
            padding: sp.content,
          }}>
            {(comp.Footer?.structure === "simple") ? (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: `'${hFont}', sans-serif`, fontSize: 13, fontWeight: 600, color: textPrimary }}>Logo</span>
                <span style={{ fontFamily: `'${bFont}', sans-serif`, fontSize: 11, color: textSecondary }}>© 2026 Company. All rights reserved.</span>
              </div>
            ) : (<>
              <div style={{ display: "flex", gap: sp.content, marginBottom: 16 }}>
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
                    flex: 1, padding: `${Math.round(sp.inlineY * 0.6)}px ${sp.inlineX}px`,
                    border: `${bw}px solid ${textSecondary}30`, borderRadius: radius,
                    fontFamily: `'${bFont}', sans-serif`, fontSize: 11, color: textSecondary,
                  }}>Enter your email</div>
                  <span style={{
                    padding: `${Math.round(sp.inlineY * 0.6)}px ${sp.inlineX}px`,
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
      </div>
      )}

      {visited["comp-CTA"] && (
      <div data-section="comp-CTA" style={{ animation: "previewFadeIn 0.4s ease", ...sectionWrap }}>
        {/* CTA */}
        <div style={{ marginBottom: previewGap }}>
          {compLabel("CTA", comp.CTA?.structure || "centered")}
          <div style={{
            background: (comp.CTA?.structure === "with-background") ? accent : surface,
            borderRadius: r("CTA"),
            border: hasBorder("CTA") ? `${bw}px solid ${(comp.CTA?.structure === "with-background") ? accent : bc}` : "none",
            padding: sp.content,
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
              padding: `${sp.inlineY}px ${sp.inlineX}px`,
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
