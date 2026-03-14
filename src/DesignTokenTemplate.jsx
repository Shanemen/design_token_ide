import { useState, useReducer, useEffect, useRef } from "react";
import { themes, ThemeContext } from "./theme";
import { defaultState, STORAGE_KEY } from "./state/defaultState";
import { reducer, migrateState } from "./state/reducer";
import { generateAndDownload } from "./generateComponents";

import Header from "./Header";
import AboutTab from "./tabs/AboutTab";
import FeedbackTab from "./tabs/FeedbackTab";

import Section from "./shared/Section";
import Step0VisualDirection from "./steps/Step0VisualDirection";
import Step1DesignTokens from "./steps/Step1DesignTokens";
import Step2Components from "./steps/Step2Components";
import Step4Responsive from "./steps/Step4Responsive";
import Step5Constraints from "./steps/Step5Constraints";

import PreviewRouter from "./preview/PreviewRouter";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return migrateState(JSON.parse(raw), defaultState);
  } catch {}
  return defaultState;
}

export default function DesignTokenTemplate() {
  const [state, dispatch] = useReducer(reducer, null, loadState);
  const [openSections, setOpenSections] = useState({});
  const [openSub, setOpenSub] = useState({});
  const [mode, setMode] = useState("light");
  const [activeTab, setActiveTab] = useState("editor");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const scrollCounterRef = useRef(0);
  const [scrollTarget, setScrollTarget] = useState(null);

  const t = themes[mode];

  // Persist state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Scroll preview when a component is selected
  useEffect(() => {
    if (state.activeComponent) {
      scrollCounterRef.current += 1;
      setScrollTarget({ key: `comp-${state.activeComponent}`, counter: scrollCounterRef.current });
    }
  }, [state.activeComponent]);

  const toggle = (key) => {
    setOpenSections(s => {
      const willOpen = !s[key];
      if (willOpen) {
        dispatch({ type: "MARK_VISITED", key });
        scrollCounterRef.current += 1;
        setScrollTarget({ key, counter: scrollCounterRef.current });
      }
      return { ...s, [key]: willOpen };
    });
  };
  const toggleSub = (key) => {
    setOpenSub(s => {
      const willOpen = !s[key];
      if (willOpen) {
        dispatch({ type: "MARK_VISITED", key });
        scrollCounterRef.current += 1;
        setScrollTarget({ key, counter: scrollCounterRef.current });
      }
      return { ...s, [key]: willOpen };
    });
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      await generateAndDownload(state);
      setGenerated(true);
      setTimeout(() => setGenerated(false), 2500);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <ThemeContext.Provider value={t}>
    <div style={{
      minHeight: "100vh",
      background: t.bg,
      color: t.text,
      fontFamily: "'Space Grotesk', sans-serif",
      transition: "background 0.3s, color 0.3s",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <Header
        projectName={state.projectName}
        onProjectNameChange={v => dispatch({ type: "SET_FIELD", key: "projectName", value: v })}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        mode={mode}
        onModeToggle={() => setMode(m => m === "light" ? "dark" : "light")}
      />

      {/* Two-column layout */}
      <div style={{
        display: "flex",
        height: "calc(100vh - 49px)",
      }}>
        {/* Left Panel */}
        <div style={{
          width: activeTab === "editor" ? "40%" : "100%",
          overflowY: "auto",
          padding: activeTab === "editor" ? `${t.space.xl}px ${t.space.lg}px ${t.space.xxl}px` : `40px ${t.space.lg}px ${t.space.xxl}px`,
          boxSizing: "border-box",
        }}>
          {activeTab === "about" && <AboutTab />}
          {activeTab === "feedback" && <FeedbackTab />}

          {activeTab === "editor" && (<>
            {/* Step 1: Design Tokens */}
            <Section number={1} title="Design Tokens" subtitle="atomic design decisions" isOpen={openSections["step-1"]} onToggle={() => toggle("step-1")}>
              <Step1DesignTokens state={state} dispatch={dispatch} openSub={openSub} toggleSub={toggleSub} />
            </Section>

            {/* Step 2: Components */}
            <Section number={2} title="Components" subtitle="parts" isOpen={openSections["step-2"]} onToggle={() => toggle("step-2")}>
              <Step2Components activeComponent={state.activeComponent} components={state.components} dispatch={dispatch} state={state} />
            </Section>

            {/* Step 3: Responsive */}
            <Section number={3} title="Responsive" subtitle="responsive + states" isOpen={openSections["step-3"]} onToggle={() => toggle("step-3")}>
              <Step4Responsive state={state} dispatch={dispatch} />
            </Section>

            {/* Step 4: Constraints */}
            <Section number={4} title="Constraints" subtitle="what not to do" isOpen={openSections["step-4"]} onToggle={() => toggle("step-4")}>
              <Step5Constraints state={state} dispatch={dispatch} />
            </Section>

            {/* Generate Components */}
            <div style={{
              marginTop: t.space.xl,
              padding: t.space.lg,
              background: t.surface,
              borderRadius: t.radius.lg,
              border: `1px solid ${t.border}`,
            }}>
              <button
                onClick={handleGenerate}
                disabled={generating}
                style={{
                  width: "100%",
                  padding: `${t.space.md}px 0`,
                  borderRadius: t.radius.md,
                  border: "none",
                  background: generated ? t.successBg : t.accent,
                  color: generated ? t.successText : t.accentText,
                  fontSize: t.font.md,
                  fontWeight: 600,
                  fontFamily: "'Space Grotesk', sans-serif",
                  cursor: generating ? "wait" : "pointer",
                  transition: "all 0.2s",
                  letterSpacing: 0.5,
                  opacity: generating ? 0.7 : 1,
                }}
              >
                {generated ? "✓ Downloaded" : generating ? "Generating…" : "Generate Component API"}
              </button>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: t.font.xs,
                color: t.faint,
                marginTop: t.gap.sm + 2,
                textAlign: "center",
                lineHeight: 1.6,
              }}>
                CLAUDE.md + TypeScript + CSS Variables
                <br />
                tokens · primitives · blocks · sections
              </div>
            </div>
          </>)}
        </div>{/* end left panel */}

        {/* Right Panel - Live Preview */}
        {activeTab === "editor" && (
        <div style={{
          width: "60%",
          borderLeft: `1px solid ${t.border}`,
          padding: t.space.lg,
          overflowY: "auto",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: t.gap.lg,
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: t.font.sm,
              color: t.accent,
              letterSpacing: 2,
              textTransform: "uppercase",
              opacity: 0.7,
            }}>
              Design System
            </div>
            <button
              onClick={() => {
                if (confirm("Reset all tokens to defaults?")) {
                  dispatch({ type: "SET_STATE", payload: defaultState });
                  setOpenSections({});
                  setOpenSub({});
                }
              }}
              style={{
                padding: `${t.space.xs}px ${t.gap.sm + 2}px`,
                borderRadius: t.radius.lg,
                border: `1px solid ${t.border}`,
                background: "transparent",
                color: t.dim,
                fontSize: t.font.sm,
                fontFamily: "'JetBrains Mono', monospace",
                cursor: "pointer",
              }}
            >
              reset
            </button>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <PreviewRouter
              state={state}
              openSections={openSections}
              theme={t}
              scrollTarget={scrollTarget}
            />
          </div>
        </div>
        )}
      </div>{/* end two-column */}
    </div>
    </ThemeContext.Provider>
  );
}
