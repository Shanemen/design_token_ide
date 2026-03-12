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
    const sizeMap = { sm: { px: 10, py: 6, fs: 12 }, md: { px: 16, py: 8, fs: 13 }, lg: { px: 24, py: 12, fs: 15 } };

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
                padding: spacings[1] || 16,
                background: t.surface,
                borderRadius: radius,
                border: `${bw}px solid ${t.border}`,
                cursor: "pointer",
                transition: `all ${dur}ms ${easing}`,
                transform: hoverDemo === n && config.hoverEffect ? "translateY(-2px)" : "none",
              }}
            >
              <div style={{
                width: isHorizontal ? 100 : "100%",
                paddingBottom: isHorizontal ? 0 : `${ratioMap[ratio] * 0.4}%`,
                height: isHorizontal ? 70 : undefined,
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

  const renderNavbar = () => (
    <div>
      {sectionLabel("Navbar")}
      <div style={{
        display: "flex",
        justifyContent: config.layout === "centered" ? "center" : "space-between",
        alignItems: "center",
        padding: `${spacings[0] || 8}px ${spacings[1] || 16}px`,
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

  const renderHero = () => (
    <div>
      {sectionLabel("Hero")}
      <div style={{
        padding: spacings[2] || 32,
        background: t.surface,
        borderRadius: radius,
        border: `${bw}px solid ${t.border}`,
        textAlign: "center",
      }}>
        <div style={{
          fontFamily: `'${hFont}', sans-serif`,
          fontSize: 28,
          fontWeight: 700,
          color: t.text,
          marginBottom: 8,
        }}>Hero Title</div>
        <div style={{
          fontFamily: `'${bFont}', monospace`,
          fontSize: 14,
          color: t.dim,
          marginBottom: 16,
        }}>Subtitle text goes here</div>
        <button style={{
          padding: "10px 24px",
          borderRadius: radius,
          border: "none",
          background: accent,
          color: "#fff",
          fontFamily: `'${bFont}', monospace`,
          fontSize: 13,
          cursor: "pointer",
        }}>Get Started</button>
      </div>
      {config.layout && subLabel(`Layout: ${config.layout}`)}
      {config.visualType && subLabel(`Visual: ${config.visualType}`)}
    </div>
  );

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
        {["line", "dashed", "dot", "space"].map(s => (
          <div key={s} style={{ marginBottom: 16 }}>
            {subLabel(s)}
            <div style={{ ...styleMap[s], marginBottom: 8 }} />
          </div>
        ))}
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
      {subLabel(`variant: ${config.variant || "filled"}`)}
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
    return (
      <div>
        {sectionLabel("Gallery / Grid")}
        <div style={{
          display: isScroll ? "flex" : "grid",
          gridTemplateColumns: isScroll ? undefined : `repeat(${cols}, 1fr)`,
          gap: 8,
          overflowX: isScroll ? "auto" : undefined,
        }}>
          {Array.from({ length: cols * 2 }, (_, i) => (
            <div key={i} style={{
              minWidth: isScroll ? 120 : undefined,
              height: config.style === "masonry" ? (60 + (i % 3) * 20) : 60,
              borderRadius: radius,
              background: `${accent}${15 + (i % 4) * 8}`,
              border: `${bw}px solid ${t.border}`,
            }} />
          ))}
        </div>
        {subLabel(`${cols} cols \u00b7 ${config.style || "grid"}`)}
      </div>
    );
  };

  const renderFooter = () => (
    <div>
      {sectionLabel("Footer")}
      <div style={{
        padding: spacings[1] || 16,
        background: t.surface,
        borderRadius: radius,
        border: `${bw}px solid ${t.border}`,
      }}>
        {config.structure === "simple" ? (
          <div style={{ textAlign: "center", fontFamily: `'${bFont}', monospace`, fontSize: 12, color: t.dim }}>
            &copy; 2026 Company Name
          </div>
        ) : (
          <div style={{ display: "flex", gap: 24 }}>
            {["Product", "Company", "Resources"].map(col => (
              <div key={col} style={{ flex: 1 }}>
                <div style={{ fontFamily: `'${hFont}', sans-serif`, fontSize: 12, fontWeight: 600, color: t.text, marginBottom: 8 }}>{col}</div>
                {["Link 1", "Link 2", "Link 3"].map(link => (
                  <div key={link} style={{ fontFamily: `'${bFont}', monospace`, fontSize: 11, color: t.dim, marginBottom: 4 }}>{link}</div>
                ))}
              </div>
            ))}
            {config.hasNewsletter && (
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: `'${hFont}', sans-serif`, fontSize: 12, fontWeight: 600, color: t.text, marginBottom: 8 }}>Newsletter</div>
                <div style={{
                  padding: "6px 10px",
                  background: t.bg || "#0A0A0F",
                  border: `${bw}px solid ${t.border}`,
                  borderRadius: radius,
                  fontFamily: `'${bFont}', monospace`,
                  fontSize: 11,
                  color: t.dim,
                }}>your@email.com</div>
              </div>
            )}
          </div>
        )}
      </div>
      {subLabel(`${config.structure || "multi-column"} \u00b7 newsletter: ${config.hasNewsletter ? "yes" : "no"}`)}
    </div>
  );

  const renderCTA = () => (
    <div>
      {sectionLabel("CTA Section")}
      <div style={{
        padding: spacings[2] || 32,
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

  const renderSection = () => (
    <div>
      {sectionLabel("Section")}
      <div style={{
        padding: spacings[2] || 32,
        background: t.surface,
        borderRadius: radius,
        border: `${bw}px solid ${t.border}`,
      }}>
        <div style={{ fontFamily: `'${hFont}', sans-serif`, fontSize: 18, fontWeight: 600, color: t.text, marginBottom: 8 }}>
          Section Title
        </div>
        <div style={{ fontFamily: `'${bFont}', monospace`, fontSize: 13, color: t.dim, lineHeight: 1.6 }}>
          Section content goes here. This demonstrates the default section layout with your design tokens applied.
        </div>
      </div>
      {config.variant && subLabel(`variant: ${config.variant}`)}
    </div>
  );

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

  const renderIcon = () => (
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
        {["\u2630", "\u2715", "\u2192", "\u2661", "\u2699", "\uD83D\uDD0D"].map((icon, i) => (
          <span key={i} style={{
            width: 36, height: 36,
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: radius,
            border: `${bw}px solid ${t.border}`,
            fontSize: 16,
            color: t.text,
          }}>{icon}</span>
        ))}
      </div>
    </div>
  );

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
