export function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.key]: action.value };
    case "SET_STATE":
      return { ...state, ...action.payload };
    case "UPDATE_COLOR": {
      const key = action.palette === "dark" ? "darkColors" : "lightColors";
      const next = [...state[key]];
      next[action.index] = action.color;
      return { ...state, [key]: next };
    }
    case "ADD_COLOR": {
      const key = action.palette === "dark" ? "darkColors" : "lightColors";
      return { ...state, [key]: [...state[key], { name: "", value: "#333344", usage: "" }] };
    }
    case "REMOVE_COLOR": {
      const key = action.palette === "dark" ? "darkColors" : "lightColors";
      return { ...state, [key]: state[key].filter((_, j) => j !== action.index) };
    }
    case "UPDATE_TYPE_LEVEL": {
      const next = [...state.typeLevels];
      next[action.index] = action.level;
      return { ...state, typeLevels: next };
    }
    case "SET_ACTIVE_COMPONENT":
      return { ...state, activeComponent: action.component };
    case "MARK_VISITED":
      return { ...state, visitedSections: { ...state.visitedSections, [action.key]: true } };
    case "UPDATE_COMPONENT": {
      return {
        ...state,
        components: {
          ...state.components,
          [action.component]: { ...state.components[action.component], ...action.config },
        },
      };
    }
    default:
      return state;
  }
}

export function migrateState(saved, defaults) {
  // Deep merge: keep saved values, fill in missing fields from defaults
  const merged = { ...defaults, ...saved };
  // Ensure components sub-object has all keys
  if (defaults.components) {
    merged.components = { ...defaults.components, ...(saved.components || {}) };
    for (const key of Object.keys(defaults.components)) {
      merged.components[key] = { ...defaults.components[key], ...(merged.components[key] || {}) };
    }
  }
  // Ensure arrays are preserved from saved if they exist
  if (saved.darkColors) merged.darkColors = saved.darkColors;
  if (saved.lightColors) merged.lightColors = saved.lightColors;
  if (saved.typeLevels) merged.typeLevels = saved.typeLevels;
  if (saved.moodboardLinks) merged.moodboardLinks = saved.moodboardLinks;
  // Reset visitedSections for users migrating from before progressive preview
  if (!saved.visitedSections) merged.visitedSections = {};
  return merged;
}
