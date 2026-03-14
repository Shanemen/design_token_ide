import { useContext } from "react";
import { ThemeContext } from "../theme";

export default function FeedbackTab() {
  const t = useContext(ThemeContext);
  return (
    <div style={{
      maxWidth: 680,
      margin: "0 auto",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: t.font.base,
      color: t.muted,
      lineHeight: 2,
    }}>
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: t.font.xl,
        fontWeight: 600,
        color: t.text,
        marginBottom: t.space.xl,
      }}>Feedback</div>

      <p style={{ margin: `0 0 ${t.space.lg}px 0` }}>
        This tool is open source and actively evolving. Your feedback shapes what gets built next.
      </p>

      <div style={{
        padding: t.space.lg,
        background: t.surface,
        borderRadius: t.radius.md,
        border: `1px solid ${t.border}`,
        marginBottom: t.gap.lg,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: t.gap.lg }}>
          {[
            {
              icon: "→",
              title: "Report a bug or request a feature",
              desc: "Open an issue on GitHub",
              href: "https://github.com/Shanemen/design_token_ide/issues",
            },
            {
              icon: "→",
              title: "View the source code",
              desc: "GitHub repository",
              href: "https://github.com/Shanemen/design_token_ide",
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                gap: t.gap.md,
                alignItems: "flex-start",
                textDecoration: "none",
                padding: `${t.space.md}px ${t.space.md}px`,
                borderRadius: t.radius.md,
                border: `1px solid ${t.border}`,
                transition: "all 0.15s",
                background: t.bg,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; }}
            >
              <span style={{ color: t.accent, fontSize: t.font.md, flexShrink: 0, paddingTop: 1 }}>{item.icon}</span>
              <div>
                <div style={{ color: t.text, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: t.font.md }}>{item.title}</div>
                <div style={{ color: t.dim, fontSize: t.font.sm + 1, marginTop: 2 }}>{item.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: t.space.xl,
        padding: t.gap.lg,
        borderRadius: t.radius.md,
        background: `${t.accent}08`,
        border: `1px solid ${t.accent}15`,
        color: t.dim,
        fontSize: t.font.sm + 1,
        lineHeight: 1.8,
      }}>
        Built by <span style={{ color: t.text }}>Sicong</span> with Claude. Designed to bridge the gap between design intent and AI-generated code.
      </div>
    </div>
  );
}
