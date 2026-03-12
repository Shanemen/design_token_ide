import { useContext } from "react";

// Placeholder building blocks that use the user's design tokens
function NavBar({ hFont, bFont, textPrimary, textSecondary, spacing }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: spacing[1] || 16 }}>
      <span style={{ fontFamily: `'${hFont}', sans-serif`, fontSize: 14, fontWeight: 600, color: textPrimary }}>Logo</span>
      <div style={{ display: "flex", gap: spacing[0] || 8 }}>
        {["About", "Work", "Contact"].map(item => (
          <span key={item} style={{ fontFamily: `'${bFont}', monospace`, fontSize: 10, color: textSecondary }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function HeroBlock({ hFont, bFont, textPrimary, textSecondary, accent, spacing, radius, headingSize, style }) {
  return (
    <div style={style}>
      <div style={{
        fontFamily: `'${hFont}', sans-serif`,
        fontSize: Math.min(headingSize, 28),
        fontWeight: 700,
        lineHeight: 1.1,
        color: textPrimary,
        marginBottom: spacing[0] || 8,
      }}>Design with intent</div>
      <div style={{
        fontFamily: `'${bFont}', monospace`,
        fontSize: 11,
        lineHeight: 1.6,
        color: textSecondary,
        marginBottom: spacing[1] || 16,
      }}>A preview of your design tokens working together.</div>
      <button style={{
        padding: `${Math.max((spacing[0] || 8) / 2, 4)}px ${spacing[0] || 8}px`,
        borderRadius: radius,
        border: "none",
        background: accent,
        color: "#fff",
        fontFamily: `'${bFont}', monospace`,
        fontSize: 10,
        cursor: "pointer",
      }}>Get Started</button>
    </div>
  );
}

function CardBlock({ hFont, bFont, surface, textPrimary, textSecondary, accent, radius, bw, bc, style }) {
  return (
    <div style={{
      padding: 12,
      background: surface,
      borderRadius: radius,
      border: `${bw}px solid ${bc}`,
      ...style,
    }}>
      <div style={{
        width: "100%",
        height: 32,
        borderRadius: Math.max(radius - 3, 2),
        background: `${accent}18`,
        marginBottom: 8,
      }} />
      <div style={{ fontFamily: `'${hFont}', sans-serif`, fontSize: 11, fontWeight: 600, color: textPrimary, marginBottom: 2 }}>Card Title</div>
      <div style={{ fontFamily: `'${bFont}', monospace`, fontSize: 9, color: textSecondary }}>Caption text</div>
    </div>
  );
}

function ImagePlaceholder({ accent, radius, style }) {
  return (
    <div style={{
      background: `${accent}20`,
      borderRadius: radius,
      minHeight: 60,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...style,
    }}>
      <span style={{ fontSize: 16, opacity: 0.3 }}>◻</span>
    </div>
  );
}

function TextBlock({ bFont, textSecondary, lines = 3, style }) {
  return (
    <div style={style}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} style={{
          height: 6,
          background: textSecondary,
          opacity: 0.15,
          borderRadius: 3,
          marginBottom: 5,
          width: i === lines - 1 ? "60%" : "100%",
        }} />
      ))}
    </div>
  );
}

function QuoteBlock({ hFont, textPrimary, accent, style }) {
  return (
    <div style={{
      padding: "16px 20px",
      borderLeft: `3px solid ${accent}`,
      ...style,
    }}>
      <div style={{
        fontFamily: `'${hFont}', sans-serif`,
        fontSize: 16,
        fontWeight: 500,
        fontStyle: "italic",
        color: textPrimary,
        lineHeight: 1.4,
      }}>"Design is not just what it looks like — design is how it works."</div>
    </div>
  );
}

function SidebarBlock({ bFont, textSecondary, accent, surface, radius, bw, bc, style }) {
  return (
    <div style={{
      padding: 12,
      background: surface,
      borderRadius: radius,
      border: `${bw}px solid ${bc}`,
      ...style,
    }}>
      {["Nav Item 1", "Nav Item 2", "Nav Item 3", "Nav Item 4"].map((item, i) => (
        <div key={i} style={{
          fontFamily: `'${bFont}', monospace`,
          fontSize: 9,
          color: i === 0 ? accent : textSecondary,
          padding: "6px 0",
          borderBottom: i < 3 ? `1px solid ${bc}` : "none",
        }}>{item}</div>
      ))}
    </div>
  );
}

// Layout implementations
const layouts = {
  "Single Column": (p) => (
    <div style={{ maxWidth: "65%", margin: "0 auto" }}>
      <NavBar {...p} />
      <HeroBlock {...p} />
      <div style={{ marginTop: p.spacing[1] || 16 }}>
        <TextBlock {...p} lines={4} />
      </div>
      <div style={{ marginTop: p.spacing[1] || 16 }}>
        <ImagePlaceholder {...p} style={{ height: 80 }} />
      </div>
      <div style={{ marginTop: p.spacing[1] || 16 }}>
        <TextBlock {...p} lines={3} />
      </div>
    </div>
  ),

  "Split Screen": (p) => (
    <div>
      <NavBar {...p} />
      <div style={{ display: "flex", gap: 2, marginTop: p.spacing[0] || 8 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <HeroBlock {...p} />
        </div>
        <div style={{ flex: 1 }}>
          <ImagePlaceholder {...p} style={{ height: "100%", minHeight: 140 }} />
        </div>
      </div>
    </div>
  ),

  "Grid Cards": (p) => (
    <div>
      <NavBar {...p} />
      <HeroBlock {...p} style={{ marginBottom: p.spacing[1] || 16, textAlign: "center" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: p.spacing[0] || 8 }}>
        {[1, 2, 3, 4, 5, 6].map(n => (
          <CardBlock key={n} {...p} />
        ))}
      </div>
    </div>
  ),

  "Sidebar + Content": (p) => (
    <div>
      <NavBar {...p} />
      <div style={{ display: "flex", gap: p.spacing[1] || 16, marginTop: p.spacing[0] || 8 }}>
        <SidebarBlock {...p} style={{ width: 100, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <HeroBlock {...p} />
          <div style={{ marginTop: p.spacing[1] || 16 }}>
            <TextBlock {...p} lines={4} />
          </div>
          <div style={{ display: "flex", gap: p.spacing[0] || 8, marginTop: p.spacing[1] || 16 }}>
            <CardBlock {...p} style={{ flex: 1 }} />
            <CardBlock {...p} style={{ flex: 1 }} />
          </div>
        </div>
      </div>
    </div>
  ),

  "Magazine Spread": (p) => (
    <div>
      <NavBar {...p} />
      <ImagePlaceholder {...p} style={{ height: 100, marginBottom: p.spacing[1] || 16 }} />
      <div style={{ display: "flex", gap: p.spacing[1] || 16 }}>
        <div style={{ flex: 2 }}>
          <div style={{
            fontFamily: `'${p.hFont}', sans-serif`,
            fontSize: 22,
            fontWeight: 700,
            color: p.textPrimary,
            lineHeight: 1.2,
            marginBottom: p.spacing[0] || 8,
          }}>Editorial Layout</div>
          <TextBlock {...p} lines={5} />
        </div>
        <div style={{ flex: 1 }}>
          <ImagePlaceholder {...p} style={{ height: 120 }} />
        </div>
      </div>
      <div style={{ display: "flex", gap: p.spacing[1] || 16, marginTop: p.spacing[1] || 16 }}>
        <div style={{ flex: 1 }}>
          <ImagePlaceholder {...p} style={{ height: 80 }} />
        </div>
        <div style={{ flex: 2 }}>
          <TextBlock {...p} lines={4} />
        </div>
      </div>
    </div>
  ),

  "Text Wrap": (p) => (
    <div>
      <NavBar {...p} />
      <HeroBlock {...p} style={{ marginBottom: p.spacing[1] || 16 }} />
      <div style={{ position: "relative" }}>
        <ImagePlaceholder {...p} style={{ width: "40%", height: 90, float: "left", marginRight: p.spacing[1] || 16, marginBottom: p.spacing[0] || 8 }} />
        <TextBlock {...p} lines={8} />
      </div>
      <div style={{ clear: "both", marginTop: p.spacing[1] || 16 }}>
        <TextBlock {...p} lines={3} />
      </div>
    </div>
  ),

  "Pull Quote": (p) => (
    <div style={{ maxWidth: "80%", margin: "0 auto" }}>
      <NavBar {...p} />
      <HeroBlock {...p} style={{ marginBottom: p.spacing[1] || 16 }} />
      <TextBlock {...p} lines={3} />
      <QuoteBlock {...p} style={{ margin: `${p.spacing[2] || 32}px 0` }} />
      <TextBlock {...p} lines={4} />
    </div>
  ),

  "Column Shift": (p) => (
    <div>
      <NavBar {...p} />
      <div style={{ width: "60%", marginBottom: p.spacing[2] || 32 }}>
        <HeroBlock {...p} />
      </div>
      <div style={{ width: "70%", marginLeft: "30%", marginBottom: p.spacing[2] || 32 }}>
        <ImagePlaceholder {...p} style={{ height: 80, marginBottom: p.spacing[0] || 8 }} />
        <TextBlock {...p} lines={3} />
      </div>
      <div style={{ width: "55%", marginBottom: p.spacing[2] || 32 }}>
        <TextBlock {...p} lines={4} />
      </div>
      <div style={{ width: "65%", marginLeft: "35%" }}>
        <CardBlock {...p} />
      </div>
    </div>
  ),

  "Overlapping Layers": (p) => (
    <div>
      <NavBar {...p} />
      <div style={{ position: "relative", height: 260, marginTop: p.spacing[1] || 16 }}>
        <ImagePlaceholder {...p} style={{
          position: "absolute", top: 0, left: 0, width: "55%", height: 140,
          zIndex: 1,
        }} />
        <CardBlock {...p} style={{
          position: "absolute", top: 50, right: 0, width: "55%",
          zIndex: 2,
          boxShadow: `0 4px 20px ${p.bg}60`,
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: "10%", width: "50%",
          zIndex: 3,
          padding: 12,
          background: p.accent,
          borderRadius: p.radius,
        }}>
          <div style={{ fontFamily: `'${p.hFont}', sans-serif`, fontSize: 13, fontWeight: 600, color: "#fff" }}>Layered Content</div>
          <div style={{ fontFamily: `'${p.bFont}', monospace`, fontSize: 9, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>Elements overlap with depth</div>
        </div>
      </div>
    </div>
  ),

  "Broken Grid": (p) => (
    <div>
      <NavBar {...p} />
      <div style={{ position: "relative", minHeight: 280, marginTop: p.spacing[0] || 8 }}>
        <div style={{
          position: "absolute", top: 0, left: "-5%", width: "60%",
        }}>
          <HeroBlock {...p} />
        </div>
        <ImagePlaceholder {...p} style={{
          position: "absolute", top: 20, right: "-3%", width: "45%", height: 100,
        }} />
        <CardBlock {...p} style={{
          position: "absolute", top: 140, left: "15%", width: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: 0, right: "5%", width: "40%",
        }}>
          <TextBlock {...p} lines={3} />
        </div>
      </div>
    </div>
  ),

  "Diagonal Flow": (p) => (
    <div>
      <NavBar {...p} />
      <div style={{ position: "relative", minHeight: 300, marginTop: p.spacing[0] || 8 }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "45%" }}>
          <HeroBlock {...p} />
        </div>
        <ImagePlaceholder {...p} style={{
          position: "absolute", top: 80, left: "25%", width: "40%", height: 70,
        }} />
        <CardBlock {...p} style={{
          position: "absolute", top: 170, left: "45%", width: "50%",
        }} />
        <div style={{
          position: "absolute", top: 260, right: 0, width: "35%",
        }}>
          <TextBlock {...p} lines={2} />
        </div>
      </div>
    </div>
  ),

  "Scattered / Organic": (p) => (
    <div>
      <NavBar {...p} />
      <div style={{ position: "relative", minHeight: 280, marginTop: p.spacing[0] || 8 }}>
        <CardBlock {...p} style={{
          position: "absolute", top: 0, left: "5%", width: "35%",
          transform: "rotate(-2deg)",
        }} />
        <ImagePlaceholder {...p} style={{
          position: "absolute", top: 10, right: "8%", width: "30%", height: 70,
          transform: "rotate(1.5deg)",
        }} />
        <CardBlock {...p} style={{
          position: "absolute", top: 110, left: "25%", width: "40%",
          transform: "rotate(1deg)",
        }} />
        <div style={{
          position: "absolute", top: 90, right: "3%", width: "25%",
          transform: "rotate(-1deg)",
        }}>
          <TextBlock {...p} lines={3} />
        </div>
        <ImagePlaceholder {...p} style={{
          position: "absolute", bottom: 0, left: "10%", width: "25%", height: 60,
          transform: "rotate(2deg)",
        }} />
        <CardBlock {...p} style={{
          position: "absolute", bottom: 10, right: "15%", width: "30%",
          transform: "rotate(-1.5deg)",
        }} />
      </div>
    </div>
  ),

  "Full Bleed Sections": (p) => (
    <div style={{ margin: "-20px -20px" }}>
      <div style={{ padding: "16px 20px" }}>
        <NavBar {...p} />
      </div>
      <div style={{ background: `${p.accent}12`, padding: "24px 20px" }}>
        <HeroBlock {...p} />
      </div>
      <div style={{ maxWidth: "70%", margin: "0 auto", padding: `${p.spacing[2] || 32}px 20px` }}>
        <TextBlock {...p} lines={4} />
      </div>
      <div style={{ background: p.surface, padding: "20px", borderTop: `${p.bw}px solid ${p.bc}`, borderBottom: `${p.bw}px solid ${p.bc}` }}>
        <div style={{ display: "flex", gap: p.spacing[0] || 8 }}>
          <CardBlock {...p} style={{ flex: 1 }} />
          <CardBlock {...p} style={{ flex: 1 }} />
          <CardBlock {...p} style={{ flex: 1 }} />
        </div>
      </div>
      <div style={{ maxWidth: "70%", margin: "0 auto", padding: `${p.spacing[2] || 32}px 20px` }}>
        <TextBlock {...p} lines={3} />
      </div>
    </div>
  ),

  "Scroll-Driven Story": (p) => (
    <div style={{ margin: "-20px -20px" }}>
      {[
        { label: "Scene 1", content: <HeroBlock {...p} /> },
        { label: "Scene 2", content: <><ImagePlaceholder {...p} style={{ height: 60, marginBottom: 12 }} /><TextBlock {...p} lines={2} /></> },
        { label: "Scene 3", content: <><CardBlock {...p} style={{ marginBottom: 12 }} /><TextBlock {...p} lines={2} /></> },
      ].map((scene, i) => (
        <div key={i} style={{
          padding: 20,
          minHeight: 130,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: i % 2 === 0 ? "transparent" : p.surface,
          borderBottom: `${p.bw}px solid ${p.bc}`,
        }}>
          <div style={{
            fontFamily: `'${p.bFont}', monospace`,
            fontSize: 8,
            color: p.accent,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
            opacity: 0.6,
          }}>{scene.label}</div>
          {scene.content}
        </div>
      ))}
    </div>
  ),

  "Parallax Layers": (p) => (
    <div>
      <NavBar {...p} />
      <div style={{ position: "relative", minHeight: 250, marginTop: p.spacing[0] || 8 }}>
        {/* Background layer */}
        <div style={{
          position: "absolute", inset: 0,
          background: `${p.accent}08`,
          borderRadius: p.radius,
        }}>
          <div style={{
            position: "absolute", top: "20%", left: "10%", width: 40, height: 40,
            borderRadius: "50%", background: `${p.accent}15`,
          }} />
          <div style={{
            position: "absolute", top: "50%", right: "15%", width: 60, height: 60,
            borderRadius: "50%", background: `${p.accent}10`,
          }} />
          <div style={{
            position: "absolute", bottom: "15%", left: "40%", width: 80, height: 30,
            borderRadius: p.radius, background: `${p.accent}08`,
          }} />
        </div>
        {/* Foreground layer */}
        <div style={{ position: "relative", zIndex: 2, padding: 20 }}>
          <HeroBlock {...p} style={{ marginBottom: p.spacing[2] || 32 }} />
          <div style={{ display: "flex", gap: p.spacing[0] || 8 }}>
            <CardBlock {...p} style={{ flex: 1 }} />
            <CardBlock {...p} style={{ flex: 1 }} />
          </div>
        </div>
      </div>
    </div>
  ),

  "Horizontal Scroll": (p) => (
    <div>
      <NavBar {...p} />
      <HeroBlock {...p} style={{ marginBottom: p.spacing[1] || 16 }} />
      <div style={{
        display: "flex",
        gap: p.spacing[1] || 16,
        overflowX: "auto",
        paddingBottom: 8,
        marginLeft: -4,
        paddingLeft: 4,
      }}>
        {[1, 2, 3, 4, 5].map(n => (
          <div key={n} style={{ minWidth: 120, flexShrink: 0 }}>
            <ImagePlaceholder {...p} style={{ height: 80, marginBottom: 8 }} />
            <div style={{ fontFamily: `'${p.hFont}', sans-serif`, fontSize: 11, fontWeight: 600, color: p.textPrimary }}>Slide {n}</div>
            <div style={{ fontFamily: `'${p.bFont}', monospace`, fontSize: 9, color: p.textSecondary }}>Gallery item</div>
          </div>
        ))}
      </div>
    </div>
  ),

  "Sticky Reveal": (p) => (
    <div style={{ margin: "-20px -20px" }}>
      <div style={{
        position: "sticky",
        top: 0,
        background: p.bg,
        padding: "16px 20px",
        borderBottom: `${p.bw}px solid ${p.bc}`,
        zIndex: 10,
      }}>
        <div style={{
          fontFamily: `'${p.hFont}', sans-serif`,
          fontSize: 20,
          fontWeight: 700,
          color: p.textPrimary,
        }}>Sticky Title</div>
        <div style={{
          fontFamily: `'${p.bFont}', monospace`,
          fontSize: 10,
          color: p.textSecondary,
          marginTop: 4,
        }}>Content slides beneath this fixed header</div>
      </div>
      {[1, 2, 3].map(n => (
        <div key={n} style={{
          padding: "24px 20px",
          borderBottom: `${p.bw}px solid ${p.bc}`,
        }}>
          <div style={{ display: "flex", gap: p.spacing[1] || 16 }}>
            <ImagePlaceholder {...p} style={{ width: 80, height: 80, flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: `'${p.hFont}', sans-serif`, fontSize: 13, fontWeight: 600, color: p.textPrimary, marginBottom: 6 }}>Section {n}</div>
              <TextBlock {...p} lines={3} />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),

  "Giant Typography": (p) => (
    <div>
      <NavBar {...p} />
      <div style={{ marginTop: p.spacing[2] || 32 }}>
        <div style={{
          fontFamily: `'${p.hFont}', sans-serif`,
          fontSize: 48,
          fontWeight: 700,
          lineHeight: 0.95,
          color: p.textPrimary,
          marginBottom: p.spacing[1] || 16,
        }}>Think<br />bigger.</div>
        <div style={{
          fontFamily: `'${p.bFont}', monospace`,
          fontSize: 11,
          color: p.textSecondary,
          maxWidth: "50%",
          lineHeight: 1.6,
          marginBottom: p.spacing[2] || 32,
        }}>Typography as the primary visual element.</div>
        <div style={{
          fontFamily: `'${p.hFont}', sans-serif`,
          fontSize: 28,
          fontWeight: 300,
          color: `${p.textPrimary}80`,
          lineHeight: 1.2,
        }}>Less is more,<br />more or less.</div>
      </div>
    </div>
  ),

  "Whitespace Canvas": (p) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
      <NavBar {...p} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: `${p.spacing[2] || 32}px 0` }}>
        <div style={{
          fontFamily: `'${p.hFont}', sans-serif`,
          fontSize: 22,
          fontWeight: 600,
          color: p.textPrimary,
          marginBottom: p.spacing[1] || 16,
        }}>Breathe.</div>
        <div style={{
          fontFamily: `'${p.bFont}', monospace`,
          fontSize: 11,
          color: p.textSecondary,
          maxWidth: 200,
          lineHeight: 1.6,
        }}>Every element earns its place on the canvas.</div>
      </div>
    </div>
  ),

  "Single Element Focus": (p) => (
    <div style={{ display: "flex", flexDirection: "column", minHeight: 300 }}>
      <NavBar {...p} />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CardBlock {...p} style={{ width: "50%", textAlign: "center" }} />
      </div>
    </div>
  ),
};

export default function LayoutPreview({ selectedLayout, tokens }) {
  const {
    headingFont, bodyFont, typeLevels,
    colorMode, darkColors, lightColors,
    borderRadius, borderWidth, borderColor,
    spacingScales,
  } = tokens;

  const hFont = headingFont || "Space Grotesk";
  const bFont = bodyFont || "JetBrains Mono";
  const headingSize = parseInt(typeLevels[0]?.size) || 48;

  // Pick colors based on mode
  const colors = colorMode === "light-only" ? lightColors : darkColors;
  const bg = colors.find(c => c.name.toLowerCase().includes("background"))?.value || "#0A0A0F";
  const surface = colors.find(c => c.name.toLowerCase().includes("surface"))?.value || "#141419";
  const textPrimary = colors.find(c => c.name.toLowerCase().includes("primary"))?.value || "#E8E8ED";
  const textSecondary = colors.find(c => c.name.toLowerCase().includes("secondary"))?.value || "#8A8A9A";
  const accent = colors.find(c => c.name.toLowerCase().includes("accent"))?.value || "#E8734A";

  const radius = parseInt(borderRadius) || 8;
  const bw = parseInt(borderWidth) || 1;
  const bc = borderColor || "#222233";
  const spacing = spacingScales.split("/").map(s => parseInt(s.trim())).filter(Boolean);

  const props = {
    hFont, bFont, headingSize,
    bg, surface, textPrimary, textSecondary, accent,
    radius, bw, bc, spacing,
  };

  const renderLayout = layouts[selectedLayout];

  if (!selectedLayout) {
    return (
      <div style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: textSecondary,
        fontFamily: `'${bFont}', monospace`,
        fontSize: 12,
        opacity: 0.5,
        gap: 12,
      }}>
        <span style={{ fontSize: 32 }}>◻</span>
        <span>选择一个 Layout 查看预览</span>
      </div>
    );
  }

  if (!renderLayout) {
    return (
      <div style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: textSecondary,
        fontFamily: `'${bFont}', monospace`,
        fontSize: 12,
        opacity: 0.5,
      }}>
        Preview not available for "{selectedLayout}"
      </div>
    );
  }

  return (
    <div style={{
      background: bg,
      borderRadius: radius,
      border: `${bw}px solid ${bc}`,
      padding: 20,
      height: "100%",
      overflow: "auto",
      boxSizing: "border-box",
    }}>
      {renderLayout(props)}
    </div>
  );
}
