import TokensPreview from "./TokensPreview";
import ComponentPreview from "./ComponentPreview";

export default function PreviewRouter({ state, openSections, theme }) {
  // Only switch to focused component preview when user clicks a specific component in Step 2
  if (state.activeComponent) {
    return (
      <ComponentPreview
        componentId={state.activeComponent}
        config={state.components[state.activeComponent] || {}}
        tokens={state}
        theme={theme}
      />
    );
  }

  // Default: always show full design library preview (typography + colors + spacing + micro + components + motion)
  return (
    <TokensPreview
      tokens={state}
      openSections={openSections}
      selectedLayout={state.selectedLayout}
      theme={theme}
    />
  );
}
