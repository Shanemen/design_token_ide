import { useContext } from "react";
import { ThemeContext } from "../theme";
import Step2ComponentList from "./Step2ComponentList";
import Step2ComponentConfig from "./Step2ComponentConfig";

export default function Step2Components({ activeComponent, components, dispatch }) {
  const t = useContext(ThemeContext);

  if (activeComponent) {
    return (
      <Step2ComponentConfig
        componentId={activeComponent}
        config={components[activeComponent] || {}}
        onChange={(config) => dispatch({ type: "UPDATE_COMPONENT", component: activeComponent, config })}
        onBack={() => dispatch({ type: "SET_ACTIVE_COMPONENT", component: null })}
      />
    );
  }

  return (
    <Step2ComponentList
      onSelect={(id) => dispatch({ type: "SET_ACTIVE_COMPONENT", component: id })}
    />
  );
}
