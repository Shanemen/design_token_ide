import { useState, useReducer, useEffect } from "react";
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
import Step3Motion from "./steps/Step3Motion";
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

  const t = themes[mode];

  // Persist state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const toggle = (key) => setOpenSections(s => ({ ...s, [key]: !s[key] }));
  const toggleSub = (key) => setOpenSub(s => ({ ...s, [key]: !s[key] }));

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
          padding: activeTab === "editor" ? "24px 20px 80px" : "40px 20px 80px",
          boxSizing: "border-box",
        }}>
          {activeTab === "about" && <AboutTab />}
          {activeTab === "feedback" && <FeedbackTab />}

          {activeTab === "editor" && (<>
            {/* Step 0: Visual Direction */}
            <Section number={0} title="Visual Direction" subtitle="视觉方向 (optional)" isOpen={openSections["step-0"]} onToggle={() => toggle("step-0")}>
              <Step0VisualDirection state={state} dispatch={dispatch} />
            </Section>

            {/* Step 1: Design Tokens */}
            <Section number={1} title="Design Tokens" subtitle="原子级设计决策" isOpen={openSections["step-1"]} onToggle={() => toggle("step-1")}>
              <Step1DesignTokens state={state} dispatch={dispatch} openSub={openSub} toggleSub={toggleSub} />
            </Section>

            {/* Step 2: Components */}
            <Section number={2} title="Components" subtitle="零件" isOpen={openSections["step-2"]} onToggle={() => toggle("step-2")}>
              <Step2Components activeComponent={state.activeComponent} components={state.components} dispatch={dispatch} />
            </Section>

            {/* Step 3: Motion */}
            <Section number={3} title="Motion" subtitle="动效" isOpen={openSections["step-3"]} onToggle={() => toggle("step-3")}>
              <Step3Motion state={state} dispatch={dispatch} />
            </Section>

            {/* Step 4: Responsive */}
            <Section number={4} title="Responsive" subtitle="响应式 + 状态" isOpen={openSections["step-4"]} onToggle={() => toggle("step-4")}>
              <Step4Responsive state={state} dispatch={dispatch} />
            </Section>

            {/* Step 5: Constraints */}
            <Section number={5} title="Constraints" subtitle="不做什么" isOpen={openSections["step-5"]} onToggle={() => toggle("step-5")}>
              <Step5Constraints state={state} dispatch={dispatch} />
            </Section>

            {/* Generate Components */}
            <div style={{
              marginTop: 24,
              padding: 20,
              background: t.surface,
              borderRadius: 12,
              border: `1px solid ${t.border}`,
            }}>
              <button
                onClick={handleGenerate}
                disabled={generating}
                style={{
                  width: "100%",
                  padding: "12px 0",
                  borderRadius: 8,
                  border: "none",
                  background: generated ? t.successBg : t.accent,
                  color: generated ? t.successText : t.accentText,
                  fontSize: 14,
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
                fontSize: 10,
                color: t.faint,
                marginTop: 10,
                textAlign: "center",
                lineHeight: 1.6,
              }}>
                TypeScript + CSS Variables
                <br />
                tokens.css · tokens.ts · Text · Button · Card · Section
              </div>
            </div>
          </>)}
        </div>{/* end left panel */}

        {/* Right Panel - Live Preview */}
        {activeTab === "editor" && (
        <div style={{
          width: "60%",
          borderLeft: `1px solid ${t.border}`,
          padding: 20,
          overflowY: "auto",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: t.accent,
              letterSpacing: 2,
              textTransform: "uppercase",
              opacity: 0.7,
            }}>
              {state.activeComponent ? `Component: ${state.activeComponent}` : "Live Preview"}
            </div>
            {state.activeComponent && (
              <button
                onClick={() => dispatch({ type: "SET_ACTIVE_COMPONENT", component: null })}
                style={{
                  padding: "4px 10px",
                  borderRadius: 12,
                  border: `1px solid ${t.border}`,
                  background: "transparent",
                  color: t.dim,
                  fontSize: 11,
                  fontFamily: "'JetBrains Mono', monospace",
                  cursor: "pointer",
                }}
              >
                back to overview
              </button>
            )}
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <PreviewRouter
              state={state}
              openSections={openSections}
              theme={t}
            />
          </div>
        </div>
        )}
      </div>{/* end two-column */}
    </div>
    </ThemeContext.Provider>
  );
}
