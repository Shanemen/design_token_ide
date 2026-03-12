import { useState } from "react";

export default function ComponentPreview({ componentId, config, tokens, theme }) {
  const t = theme;
  const [hoverDemo, setHoverDemo] = useState(false);

  // Extract user tokens
  const hFont = tokens.headingFont || "Space Grotesk";
  const bFont = tokens.bodyFont || "JetBrains Mono";
  const radius = parseInt(tokens.borderRadius) || 8;
  const bw = parseInt(tokens.borderWidth) || 1;
  const spacings = tokens.spacingScales.split("/").map(s => parseInt(s.trim())).filter(Boolean);
  const densityMul = tokens.density === "airy" ? 1.5 : tokens.density === "compact" ? 0.7 : 1;

  // Get user accent color
  const isPrimaryDark = tokens.colorMode !== "light-only";
  const colors = isPrimaryDark ? tokens.darkColors : tokens.lightColors;
  const accent = colors.find(c => c.name.toLowerCase().includes("accent"))?.value || "#E8734A";
  const textPrimary = colors.find(c => c.name.toLowerCase().includes("primary"))?.value || "#E8E8ED";

  const dur = parseInt(tokens.defaultDuration) || 300;
  const easing = tokens.easingStyle === "spring" ? "cubic-bezier(0.34, 1.56, 0.64, 1)"
    : tokens.easingStyle === "ease-out" ? "cubic-bezier(0.22, 1, 0.36, 1)"
    : tokens.easingStyle === "ease-in-out" ? "cubic-bezier(0.45, 0, 0.55, 1)"
    : "linear";

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

  const subLabel = (label) => (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 9,
      color: t.dim,
      opacity: 0.5,
      marginBottom: 10,
      letterSpacing: 1,
      textTransform: "uppercase",
    }}>{label}</div>
  );

  const renderButton = () => {
    const variants = config.variants || ["primary", "secondary", "ghost"];
    const sizes = config.sizes || ["sm", "md", "lg"];
    const sizeMap = { sm: { px: Math.round(10 * densityMul), py: Math.round(6 * densityMul), fs: 12 }, md: { px: Math.round(16 * densityMul), py: Math.round(8 * densityMul), fs: 13 }, lg: { px: Math.round(24 * densityMul), py: Math.round(12 * densityMul), fs: 15 } };

    return (
      <div>
        {sectionLabel(`Button \u2014 ${componentId}`)}
        {sizes.map(size => (
          <div key={size} style={{ marginBottom: 16 }}>
            {subLabel(`Size: ${size}`)}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              {variants.includes("primary") && (
                <button style={{
                  padding: `${sizeMap[size].py}px ${sizeMap[size].px}px`,
                  borderRadius: radius, border: "none", background: accent,
                  color: "#fff", fontFamily: `'${bFont}', monospace`, fontSize: sizeMap[size].fs,
                  fontWeight: 500, cursor: "pointer", transition: `all ${dur}ms ${easing}`,
                }}>Primary</button>
              )}
              {variants.includes("secondary") && (
                <button style={{
                  padding: `${sizeMap[size].py}px ${sizeMap[size].px}px`,
                  borderRadius: radius, border: `${bw}px solid ${t.border}`, background: "transparent",
                  color: t.text, fontFamily: `'${bFont}', monospace`, fontSize: sizeMap[size].fs, cursor: "pointer",
                }}>Secondary</button>
              )}
              {variants.includes("ghost") && (
                <button style={{
                  padding: `${sizeMap[size].py}px ${sizeMap[size].px}px`,
                  borderRadius: radius, border: "none", background: "transparent",
                  color: accent, fontFamily: `'${bFont}', monospace`, fontSize: sizeMap[size].fs, cursor: "pointer",
                }}>Ghost</button>
              )}
              {/* Disabled */}
              <button disabled style={{
                padding: `${sizeMap[size].py}px ${sizeMap[size].px}px`,
                borderRadius: radius, border: "none", background: `${t.dim}20`,
                color: `${t.dim}60`, fontFamily: `'${bFont}', monospace`, fontSize: sizeMap[size].fs,
                cursor: "not-allowed",
              }}>Disabled</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCard = () => {
    const isHorizontal = config.orientation === "horizontal";
    const ratio = config.thumbnailRatio || "16:9";
    const ratioMap = { "16:9": 56.25, "4:3": 75, "3:2": 66.67, "1:1": 100 };
    const horizontalWidthMap = { "16:9": "45%", "4:3": "40%", "3:2": "42%", "1:1": "35%" };

    return (
      <div>
        {sectionLabel("Card")}
        <div style={{ display: "flex", gap: 12, flexDirection: isHorizontal ? "column" : "row" }}>
          {[1, 2].map(n => (
            <div
              key={n}
              onMouseEnter={() => setHoverDemo(n)}
              onMouseLeave={() => setHoverDemo(false)}
              style={{
                flex: 1,
                display: isHorizontal ? "flex" : "block",
                padding: Math.round((spacings[1] || 16) * densityMul),
                background: t.surface,
                borderRadius: radius,
                border: `${bw}px solid ${t.border}`,
                cursor: "pointer",
                transition: `all ${dur}ms ${easing}`,
                transform: hoverDemo === n && config.hoverEffect ? "translateY(-2px)" : "none",
              }}
            >
              <div style={{
                width: isHorizontal ? (horizontalWidthMap[ratio] || "40%") : "100%",
                paddingBottom: isHorizontal ? 0 : `${ratioMap[ratio] * 0.4}%`,
                height: isHorizontal ? "auto" : undefined,
                alignSelf: isHorizontal ? "stretch" : undefined,
                borderRadius: Math.max(radius - 4, 2),
                background: `${accent}18`,
                marginBottom: isHorizontal ? 0 : spacings[0] || 8,
                marginRight: isHorizontal ? 12 : 0,
                flexShrink: 0,
              }} />
              <div>
                <div style={{
                  fontFamily: `'${hFont}', sans-serif`, fontSize: 15, fontWeight: 600,
                  color: t.text, marginBottom: 4,
                }}>Card {n}</div>
                <div style={{
                  fontFamily: `'${bFont}', monospace`, fontSize: 12, color: t.dim,
                }}>Caption text</div>
              </div>
            </div>
          ))}
        </div>
        {subLabel(`${config.orientation || "vertical"} \u00b7 ${ratio} \u00b7 hover: ${config.hoverEffect ? "on" : "off"}`)}
      </div>
    );
  };

  // D1: Navbar — "centered" uses column layout (logo on top, links below);
  // all other layouts use row with gap: 16 between logo and links
  const renderNavbar = () => (
    <div>
      {sectionLabel("Navbar")}
      <div style={{
        display: "flex",
        ...(config.layout === "centered"
          ? { flexDirection: "column", alignItems: "center", gap: 8 }
          : { justifyContent: "space-between", alignItems: "center", gap: 16 }),
        padding: `${Math.round((spacings[0] || 8) * densityMul)}px ${Math.round((spacings[1] || 16) * densityMul)}px`,
        background: config.transparent ? "transparent" : t.surface,
        borderRadius: radius,
        border: `${bw}px solid ${t.border}`,
      }}>
        {config.layout !== "hamburger-only" && (
          <div style={{ fontFamily: `'${hFont}', sans-serif`, fontSize: 15, fontWeight: 600, color: t.text }}>Logo</div>
        )}
        {config.layout === "hamburger-only" ? (
          <div style={{ fontSize: 18, color: t.dim }}>{"\u2630"}</div>
        ) : (
          <div style={{ display: "flex", gap: 16 }}>
            {["Home", "About", "Contact"].map(item => (
              <span key={item} style={{ fontFamily: `'${bFont}', monospace`, fontSize: 12, color: t.dim }}>{item}</span>
            ))}
          </div>
        )}
      </div>
      {subLabel(`${config.layout || "logo-left"} \u00b7 sticky: ${config.sticky ? "yes" : "no"} \u00b7 transparent: ${config.transparent ? "yes" : "no"}`)}
    </div>
  );

  // D2: Hero — layout-aware rendering based on Layout Inspiration card names
  const renderHero = () => {
    const layout = config.layout || "Centered Classic";
    const basePad = Math.round((spacings[2] || 32) * densityMul);
    const baseBox = {
      background: t.surface,
      borderRadius: radius,
      border: `${bw}px solid ${t.border}`,
    };

    const titleStyle = {
      fontFamily: `'${hFont}', sans-serif`,
      fontWeight: 700,
      color: t.text,
    };

    const subtitleStyle = {
      fontFamily: `'${bFont}', monospace`,
      fontSize: 14,
      color: t.dim,
    };

    const ctaButton = (label = "Get Started") => (
      <button style={{
        padding: "10px 24px",
        borderRadius: radius,
        border: "none",
        background: accent,
        color: "#fff",
        fontFamily: `'${bFont}', monospace`,
        fontSize: 13,
        cursor: "pointer",
      }}>{label}</button>
    );

    const renderHeroContent = () => {
      switch (layout) {
        case "Split Screen":
          return (
            <div style={{ ...baseBox, padding: basePad, display: "flex", gap: 24, alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ ...titleStyle, fontSize: 28, marginBottom: 8 }}>Hero Title</div>
                <div style={{ ...subtitleStyle, marginBottom: 16 }}>Subtitle text goes here</div>
                {ctaButton()}
              </div>
              <div style={{
                flex: 1,
                height: 120,
                borderRadius: Math.max(radius - 4, 2),
                background: `${accent}20`,
              }} />
            </div>
          );

        case "Full Bleed Sections":
          return (
            <div style={{
              ...baseBox,
              padding: basePad * 1.5,
              background: t.text,
              textAlign: "center",
              borderRadius: 0,
            }}>
              <div style={{ ...titleStyle, fontSize: 28, color: t.surface || t.bg || "#0A0A0F", marginBottom: 8 }}>Hero Title</div>
              <div style={{ ...subtitleStyle, color: `${t.surface || t.bg || "#0A0A0F"}99`, marginBottom: 16 }}>Subtitle text goes here</div>
              <button style={{
                padding: "10px 24px",
                borderRadius: radius,
                border: `2px solid ${t.surface || t.bg || "#0A0A0F"}`,
                background: "transparent",
                color: t.surface || t.bg || "#0A0A0F",
                fontFamily: `'${bFont}', monospace`,
                fontSize: 13,
                cursor: "pointer",
              }}>Get Started</button>
            </div>
          );

        case "Giant Typography":
          return (
            <div style={{ ...baseBox, padding: basePad, textAlign: "center" }}>
              <div style={{ ...titleStyle, fontSize: 48, lineHeight: 1.1, marginBottom: 12 }}>Hero Title</div>
              <div style={{ ...subtitleStyle, marginBottom: 16 }}>Subtitle text goes here</div>
            </div>
          );

        case "Whitespace Canvas":
          return (
            <div style={{ ...baseBox, padding: basePad * 2, textAlign: "center" }}>
              <div style={{ ...titleStyle, fontSize: 28, marginBottom: 8 }}>Hero Title</div>
              <div style={{ ...subtitleStyle, marginBottom: 16 }}>Subtitle text goes here</div>
              {ctaButton()}
            </div>
          );

        case "Single Element Focus":
          return (
            <div style={{
              ...baseBox,
              padding: basePad * 1.5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <button style={{
                padding: "16px 48px",
                borderRadius: radius,
                border: "none",
                background: accent,
                color: "#fff",
                fontFamily: `'${bFont}', monospace`,
                fontSize: 18,
                fontWeight: 600,
                cursor: "pointer",
              }}>Get Started</button>
            </div>
          );

        case "Centered Classic":
        default:
          return (
            <div style={{ ...baseBox, padding: basePad, textAlign: "center" }}>
              <div style={{ ...titleStyle, fontSize: 28, marginBottom: 8 }}>Hero Title</div>
              <div style={{ ...subtitleStyle, marginBottom: 16 }}>Subtitle text goes here</div>
              {ctaButton()}
            </div>
          );
      }
    };

    return (
      <div>
        {sectionLabel("Hero")}
        {renderHeroContent()}
        {config.layout && subLabel(`Layout: ${config.layout}`)}
        {config.visualType && subLabel(`Visual: ${config.visualType}`)}
      </div>
    );
  };

  const renderDivider = () => {
    const styleMap = {
      line: { borderBottom: `1px solid ${t.border}` },
      dashed: { borderBottom: `1px dashed ${t.border}` },
      dot: { borderBottom: `2px dotted ${t.border}` },
      space: { height: 24 },
    };
    return (
      <div>
        {sectionLabel("Divider")}
        {["line", "dashed", "dot", "space"].map(s => {
          const isSelected = s === config.style;
          return (
            <div key={s} style={{
              marginBottom: 16,
              opacity: isSelected ? 1 : 0.3,
              padding: isSelected ? "8px 10px" : undefined,
              background: isSelected ? `${accent}10` : undefined,
              border: isSelected ? `1px solid ${accent}30` : "1px solid transparent",
              borderRadius: isSelected ? radius : undefined,
            }}>
              {subLabel(s)}
              <div style={{ ...styleMap[s], marginBottom: 8 }} />
            </div>
          );
        })}
      </div>
    );
  };

  const renderBadge = () => (
    <div>
      {sectionLabel("Badge / Tag")}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["Default", "Success", "Warning", "Error"].map(label => (
          <span key={label} style={{
            padding: "4px 10px",
            borderRadius: 12,
            fontSize: 11,
            fontFamily: `'${bFont}', monospace`,
            ...(config.variant === "outline" ? {
              border: `1px solid ${accent}`,
              color: accent,
              background: "transparent",
            } : {
              border: "none",
              color: "#fff",
              background: accent,
            }),
          }}>{label}</span>
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        {subLabel(`variant: ${config.variant || "filled"}`)}
      </div>
    </div>
  );

  const renderAvatar = () => {
    const shapeRadius = config.shape === "circle" ? "50%" : config.shape === "rounded-square" ? radius : 0;
    return (
      <div>
        {sectionLabel("Avatar")}
        <div style={{ display: "flex", gap: 12 }}>
          {["sm", "md", "lg"].map((size, i) => {
            const px = [32, 44, 60][i];
            return (
              <div key={size} style={{
                width: px, height: px,
                borderRadius: shapeRadius,
                background: `${accent}30`,
                border: `${bw}px solid ${t.border}`,
                filter: config.filter === "grayscale" ? "grayscale(1)" : config.filter === "b&w" ? "grayscale(1) contrast(1.2)" : "none",
              }} />
            );
          })}
        </div>
        {subLabel(`${config.shape || "circle"} \u00b7 ${config.filter || "color"}`)}
      </div>
    );
  };

  const renderGallery = () => {
    const cols = parseInt(config.columns) || 3;
    const isScroll = config.style === "horizontal-scroll";
    const isMasonry = config.style === "masonry";
    const masonryHeights = [80, 120, 60, 100, 140, 70, 110, 90];
    return (
      <div>
        {sectionLabel("Gallery / Grid")}
        {isMasonry ? (
          <div style={{
            columnCount: cols,
            columnGap: 8,
          }}>
            {Array.from({ length: cols * 2 }, (_, i) => (
              <div key={i} style={{
                height: masonryHeights[i % masonryHeights.length],
                borderRadius: radius,
                background: `${accent}${15 + (i % 4) * 8}`,
                border: `${bw}px solid ${t.border}`,
                marginBottom: 8,
                breakInside: "avoid",
              }} />
            ))}
          </div>
        ) : (
          <div style={{
            display: isScroll ? "flex" : "grid",
            gridTemplateColumns: isScroll ? undefined : `repeat(${cols}, 1fr)`,
            gap: 8,
            overflowX: isScroll ? "auto" : undefined,
          }}>
            {Array.from({ length: cols * 2 }, (_, i) => (
              <div key={i} style={{
                minWidth: isScroll ? 120 : undefined,
                height: 60,
                borderRadius: radius,
                background: `${accent}${15 + (i % 4) * 8}`,
                border: `${bw}px solid ${t.border}`,
              }} />
            ))}
          </div>
        )}
        {subLabel(`${cols} cols \u00b7 ${config.style || "grid"}`)}
      </div>
    );
  };

  const renderFooter = () => {
    const footerPad = Math.round((spacings[1] || 16) * densityMul);
    const footerBox = {
      padding: footerPad,
      background: t.surface,
      borderRadius: radius,
      border: `${bw}px solid ${t.border}`,
    };

    const renderMultiColumnBody = () => (
      <div style={{ display: "flex", gap: 24 }}>
        {["Product", "Company", "Resources"].map(col => (
          <div key={col} style={{ flex: 1 }}>
            <div style={{ fontFamily: `'${hFont}', sans-serif`, fontSize: 12, fontWeight: 600, color: t.text, marginBottom: 8 }}>{col}</div>
            {["Link 1", "Link 2", "Link 3"].map(link => (
              <div key={link} style={{ fontFamily: `'${bFont}', monospace`, fontSize: 11, color: t.dim, marginBottom: 4 }}>{link}</div>
            ))}
          </div>
        ))}
      </div>
    );

    const renderNewsletterRow = () => (
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        marginTop: footerPad,
        paddingTop: footerPad,
        borderTop: `${bw}px solid ${t.border}`,
      }}>
        <div style={{ fontFamily: `'${hFont}', sans-serif`, fontSize: 11, fontWeight: 600, color: t.text, whiteSpace: "nowrap" }}>Newsletter</div>
        <div style={{
          flex: 1, padding: "6px 10px",
          background: t.bg || "#0A0A0F",
          border: `${bw}px solid ${t.border}`,
          borderRadius: radius,
          fontFamily: `'${bFont}', monospace`,
          fontSize: 11, color: t.dim,
        }}>your@email.com</div>
        <button style={{
          padding: "6px 14px", borderRadius: radius, border: "none",
          background: accent, color: "#fff",
          fontFamily: `'${bFont}', monospace`, fontSize: 11, cursor: "pointer",
        }}>Subscribe</button>
      </div>
    );

    return (
      <div>
        {sectionLabel("Footer")}
        <div style={footerBox}>
          {config.structure === "simple" ? (
            <div style={{ textAlign: "center", fontFamily: `'${bFont}', monospace`, fontSize: 12, color: t.dim }}>
              &copy; 2026 Company Name
            </div>
          ) : config.structure === "minimal" ? (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: `'${bFont}', monospace`, fontSize: 12, color: t.dim }}>
                &copy; 2026 Company Name
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                {["Twitter", "GitHub", "LinkedIn"].map(s => (
                  <span key={s} style={{ fontFamily: `'${bFont}', monospace`, fontSize: 11, color: t.dim }}>{s}</span>
                ))}
              </div>
            </div>
          ) : (
            <>
              {renderMultiColumnBody()}
              {config.hasNewsletter && renderNewsletterRow()}
            </>
          )}
        </div>
        {subLabel(`${config.structure || "multi-column"} \u00b7 newsletter: ${config.hasNewsletter ? "yes" : "no"}`)}
      </div>
    );
  };

  const renderCTA = () => (
    <div>
      {sectionLabel("CTA Section")}
      <div style={{
        padding: Math.round((spacings[2] || 32) * densityMul),
        background: t.surface,
        borderRadius: radius,
        border: `${bw}px solid ${t.border}`,
        textAlign: config.structure === "centered" ? "center" : "left",
        display: config.structure === "left-text-right-button" ? "flex" : "block",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div>
          <div style={{ fontFamily: `'${hFont}', sans-serif`, fontSize: 20, fontWeight: 600, color: t.text, marginBottom: 6 }}>
            Ready to get started?
          </div>
          <div style={{ fontFamily: `'${bFont}', monospace`, fontSize: 13, color: t.dim }}>
            Join thousands of happy users today.
          </div>
        </div>
        <button style={{
          marginTop: config.structure === "left-text-right-button" ? 0 : 16,
          padding: "10px 24px",
          borderRadius: radius,
          border: "none",
          background: accent,
          color: "#fff",
          fontFamily: `'${bFont}', monospace`,
          fontSize: 13,
          cursor: "pointer",
        }}>Sign Up Free</button>
      </div>
    </div>
  );

  // D3: Section — variant-aware rendering
  const renderSection = () => {
    const variant = config.variant || "centered";
    const basePad = Math.round((spacings[2] || 32) * densityMul);
    const baseBox = {
      background: t.surface,
      borderRadius: radius,
      border: `${bw}px solid ${t.border}`,
    };

    const titleEl = (
      <div style={{ fontFamily: `'${hFont}', sans-serif`, fontSize: 18, fontWeight: 600, color: t.text, marginBottom: 8 }}>
        Section Title
      </div>
    );

    const textEl = (
      <div style={{ fontFamily: `'${bFont}', monospace`, fontSize: 13, color: t.dim, lineHeight: 1.6 }}>
        Section content goes here. This demonstrates the default section layout with your design tokens applied.
      </div>
    );

    const imagePlaceholder = (
      <div style={{
        flex: 1,
        minHeight: 100,
        borderRadius: Math.max(radius - 4, 2),
        background: `${accent}20`,
      }} />
    );

    const renderSectionContent = () => {
      switch (variant) {
        case "left-image":
          return (
            <div style={{ ...baseBox, padding: basePad, display: "flex", gap: 24, alignItems: "center" }}>
              {imagePlaceholder}
              <div style={{ flex: 1 }}>
                {titleEl}
                {textEl}
              </div>
            </div>
          );

        case "right-image":
          return (
            <div style={{ ...baseBox, padding: basePad, display: "flex", gap: 24, alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                {titleEl}
                {textEl}
              </div>
              {imagePlaceholder}
            </div>
          );

        case "full-width":
          return (
            <div style={{
              ...baseBox,
              padding: basePad * 1.25,
              borderRadius: 0,
              textAlign: "left",
            }}>
              {titleEl}
              {textEl}
            </div>
          );

        case "centered":
        default:
          return (
            <div style={{ ...baseBox, padding: basePad }}>
              {titleEl}
              {textEl}
            </div>
          );
      }
    };

    return (
      <div>
        {sectionLabel("Section")}
        {renderSectionContent()}
        {config.variant && subLabel(`variant: ${config.variant}`)}
        {config.layout && subLabel(`layout: ${config.layout}`)}
      </div>
    );
  };

  const renderText = () => (
    <div>
      {sectionLabel("Text Component")}
      {tokens.typeLevels.map((lv, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          {subLabel(lv.name || "\u2014")}
          <span style={{
            fontFamily: `'${lv.font === "heading" ? hFont : bFont}', sans-serif`,
            fontSize: `${lv.size || 16}px`,
            fontWeight: lv.weight || 400,
            lineHeight: lv.lineHeight || 1.5,
            color: t.text,
          }}>The quick brown fox</span>
        </div>
      ))}
    </div>
  );

  const renderIcon = () => {
    const sw = parseFloat(config.weight) || 1.5;
    const iconSvgs = [
      // Menu (hamburger)
      <svg key="menu" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>,
      // X (close)
      <svg key="x" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>,
      // Arrow right
      <svg key="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>,
      // Heart
      <svg key="heart" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
      </svg>,
      // Settings (gear)
      <svg key="settings" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>,
      // Search
      <svg key="search" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>,
    ];

    return (
      <div>
        {sectionLabel("Icon")}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: t.dim,
          lineHeight: 1.8,
        }}>
          <div>Source: <span style={{ color: t.text }}>{config.source || "library"}</span></div>
          {config.source === "library" && <div>Library: <span style={{ color: t.text }}>{config.library || "Lucide"}</span></div>}
          <div>Style: <span style={{ color: t.text }}>{config.style || "outline"}</span></div>
          <div>Weight: <span style={{ color: t.text }}>{config.weight || "1.5"}</span></div>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          {iconSvgs.map((icon, i) => (
            <span key={i} style={{
              width: 36, height: 36,
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: radius,
              border: `${bw}px solid ${t.border}`,
              color: t.text,
            }}>{icon}</span>
          ))}
        </div>
      </div>
    );
  };

  const renderers = {
    Button: renderButton,
    Text: renderText,
    Divider: renderDivider,
    Badge: renderBadge,
    Avatar: renderAvatar,
    Icon: renderIcon,
    Navbar: renderNavbar,
    Hero: renderHero,
    Section: renderSection,
    Card: renderCard,
    Gallery: renderGallery,
    Footer: renderFooter,
    CTA: renderCTA,
  };

  const render = renderers[componentId];

  return (
    <div style={{
      padding: "28px 28px",
      height: "100%",
      overflow: "auto",
      boxSizing: "border-box",
    }}>
      {render ? render() : (
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: t.dim }}>
          No preview available for {componentId}
        </div>
      )}
    </div>
  );
}
