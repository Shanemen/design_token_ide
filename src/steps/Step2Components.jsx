import { useContext } from "react";
import { ThemeContext } from "../theme";
import Step2ComponentList from "./Step2ComponentList";
import Step2ComponentConfig from "./Step2ComponentConfig";
import Step2RadiusConfig from "./Step2RadiusConfig";
import Step2BorderConfig from "./Step2BorderConfig";

export default function Step2Components({ activeComponent, components, dispatch, state, scrollToSection }) {
  const t = useContext(ThemeContext);
  const onBack = () => dispatch({ type: "SET_ACTIVE_COMPONENT", component: null });

  if (activeComponent === "BorderRadius") {
    return <Step2RadiusConfig state={state} dispatch={dispatch} onBack={onBack} scrollToSection={scrollToSection} />;
  }

  if (activeComponent === "Border") {
    return <Step2BorderConfig state={state} dispatch={dispatch} onBack={onBack} scrollToSection={scrollToSection} />;
  }

  if (activeComponent) {
    return (
      <Step2ComponentConfig
        componentId={activeComponent}
        config={components[activeComponent] || {}}
        onChange={(config) => {
          dispatch({ type: "UPDATE_COMPONENT", component: activeComponent, config });
          scrollToSection?.(`comp-${activeComponent}`);
        }}
        onBack={onBack}
      />
    );
  }

  return (
    <Step2ComponentList
      onSelect={(id) => {
        dispatch({ type: "SET_ACTIVE_COMPONENT", component: id });
        dispatch({ type: "MARK_VISITED", key: `comp-${id}` });
      }}
      state={state}
      dispatch={dispatch}
    />
  );
}
