import { useContext } from "react";
import { ThemeContext } from "../theme";

export default function AboutTab() {
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
      }}>About This Tool</div>

      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: t.font.md + 1,
        fontWeight: 600,
        color: t.text,
        marginBottom: t.space.md,
      }}>What is this?</div>

      <p style={{ margin: `0 0 ${t.gap.lg}px 0` }}>
        This tool helps you define all your design rules before writing any code — colors, fonts, spacing, border radius, motion, and more.
        When you're done, generate a set of React components (TypeScript + CSS Variables) and drop them straight into your project.
      </p>

      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: t.font.md + 1,
        fontWeight: 600,
        color: t.text,
        marginBottom: t.space.md,
        marginTop: t.space.xl,
      }}>Why not just start coding?</div>

      <p style={{ margin: `0 0 ${t.gap.lg}px 0` }}>
        If you let AI write pages directly, it will freestyle — 13px here, 14px there,
        colors all over the place. You'll spend hours chasing inconsistencies. This tool flips the approach: <span style={{ color: t.accent }}>define the rules first, then build pages</span>.
        AI can only pick from what you've defined. Like a coffee shop menu — you can order small, medium, or large, not "173ml please."
      </p>

      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: t.font.md + 1,
        fontWeight: 600,
        color: t.text,
        marginBottom: t.space.md,
        marginTop: t.space.xl,
      }}>How to use</div>

      <div style={{
        padding: t.gap.lg,
        background: t.surface,
        borderRadius: t.radius.md,
        border: `1px solid ${t.border}`,
        marginBottom: t.gap.lg,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: t.gap.md }}>
          {[
            { step: "01", title: "Fill in tokens", desc: "Make your design decisions in the form. It doesn't have to be perfect — just get a starting point." },
            { step: "02", title: "Preview", desc: "Check the live preview on the right. See how your tokens look together. Go back and tweak if needed." },
            { step: "03", title: "Generate components", desc: "Hit Generate Components to get a set of React component files. Drop them into your project." },
            { step: "04", title: "Build pages", desc: "Build pages using the generated components. AI can only choose from what you defined — it can't go off-script." },
          ].map(item => (
            <div key={item.step} style={{ display: "flex", gap: t.gap.md, alignItems: "flex-start" }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: t.font.sm,
                color: t.accent,
                opacity: 0.7,
                minWidth: t.space.lg,
                paddingTop: 2,
              }}>{item.step}</span>
              <div>
                <span style={{ color: t.text, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>{item.title}</span>
                <span style={{ color: t.muted }}> — {item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: t.font.md + 1,
        fontWeight: 600,
        color: t.text,
        marginBottom: t.space.md,
        marginTop: t.space.xl,
      }}>Can I change things later?</div>

      <p style={{ margin: `0 0 ${t.gap.lg}px 0` }}>
        <span style={{ color: t.accent }}>Yes, anytime.</span> That's the whole point of components.
        Want to change cards from sharp to rounded corners? Just tell CC to update one line in Card.tsx.
        Every page using {'<Card>'} updates automatically — just like editing a source component in Figma.
      </p>
      <p style={{ margin: `0 0 ${t.gap.lg}px 0` }}>
        Without component abstractions, you'd have to find-and-replace across every file. Miss one spot, and your UI looks inconsistent.
      </p>

      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: t.font.md + 1,
        fontWeight: 600,
        color: t.text,
        marginBottom: t.space.md,
        marginTop: t.space.xl,
      }}>Key concepts</div>

      <div style={{
        padding: t.gap.lg,
        background: t.surface,
        borderRadius: t.radius.md,
        border: `1px solid ${t.border}`,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: t.gap.lg }}>
          {[
            {
              term: "Design Token",
              def: "The smallest unit of a design decision. A color value, a font size, a spacing value — each one is a token.",
            },
            {
              term: "Component API",
              def: "What parameters a component accepts and what options each parameter has. For example, the Text component's level prop only allows heading / body / caption. The API is a menu — it defines what you can order, and what you can't.",
            },
            {
              term: "Constraint vs Suggestion",
              def: "A document telling AI \"please use this color\" is a suggestion — AI can ignore it. A component that only accepts three colors is a constraint — AI can't bypass it. This tool generates constraints, not suggestions.",
            },
            {
              term: "Source of Truth",
              def: "The component files are the single source of truth for your design system. No separate design docs to maintain — change the component, change the system.",
            },
          ].map((item, i) => (
            <div key={i}>
              <span style={{ color: t.accent, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{item.term}</span>
              <span style={{ color: t.muted }}> — {item.def}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: t.space.xl,
        padding: `${t.space.md}px ${t.gap.lg}px`,
        borderRadius: t.radius.md,
        background: `${t.accent}08`,
        border: `1px solid ${t.accent}15`,
        color: t.dim,
        fontSize: t.font.sm + 1,
        lineHeight: 1.8,
      }}>
        <span style={{ color: t.accent }}>⚑ Flag note</span> — Options marked with ⚑ in the form mean CC can't generate them with code alone. You'll need to prepare the assets with other tools first, then hand them to CC for integration. Unmarked options CC can handle entirely.
      </div>
    </div>
  );
}
