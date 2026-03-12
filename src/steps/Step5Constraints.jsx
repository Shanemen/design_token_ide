import { useContext } from "react";
import { ThemeContext } from "../theme";
import TextArea from "../shared/TextArea";

export default function Step5Constraints({ state, dispatch }) {
  const t = useContext(ThemeContext);
  const update = (key, value) => dispatch({ type: "SET_FIELD", key, value });

  return (
    <div>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        color: t.accent,
        opacity: 0.6,
        marginBottom: 10,
      }}>
        The most important step for AI. The clearer your red lines, the less AI will improvise.
      </div>
      <TextArea value={state.dontList} onChange={v => update("dontList", v)} placeholder="One constraint per line..." rows={6} />
    </div>
  );
}
