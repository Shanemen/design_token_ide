import { useContext } from "react";
import { ThemeContext } from "../theme";

export default function FeedbackTab() {
  const t = useContext(ThemeContext);
  return (
    <div style={{
      maxWidth: 680,
      margin: "0 auto",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 13,
      color: t.muted,
      lineHeight: 2,
    }}>
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 22,
        fontWeight: 600,
        color: t.text,
        marginBottom: 24,
      }}>Feedback</div>

      <p style={{ margin: "0 0 20px 0" }}>
        This tool is open source and actively evolving. Your feedback shapes what gets built next.
      </p>

      <div style={{
        padding: "20px",
        background: t.surface,
        borderRadius: 8,
        border: `1px solid ${t.border}`,
        marginBottom: 16,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
                gap: 12,
                alignItems: "flex-start",
                textDecoration: "none",
                padding: "12px 14px",
                borderRadius: 8,
                border: `1px solid ${t.border}`,
                transition: "all 0.15s",
                background: t.bg,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; }}
            >
              <span style={{ color: t.accent, fontSize: 14, flexShrink: 0, paddingTop: 1 }}>{item.icon}</span>
              <div>
                <div style={{ color: t.text, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 14 }}>{item.title}</div>
                <div style={{ color: t.dim, fontSize: 12, marginTop: 2 }}>{item.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: 24,
        padding: "16px",
        borderRadius: 8,
        background: `${t.accent}08`,
        border: `1px solid ${t.accent}15`,
        color: t.dim,
        fontSize: 12,
        lineHeight: 1.8,
      }}>
        Built by <span style={{ color: t.text }}>Sicong</span> with Claude. Designed to bridge the gap between design intent and AI-generated code.
      </div>
    </div>
  );
}
