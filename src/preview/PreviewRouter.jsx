import TokensPreview from "./TokensPreview";

export default function PreviewRouter({ state, openSections, theme, scrollTarget }) {
  return (
    <TokensPreview
      tokens={state}
      openSections={openSections}
      selectedLayout={state.selectedLayout}
      theme={theme}
      scrollTarget={scrollTarget}
    />
  );
}
