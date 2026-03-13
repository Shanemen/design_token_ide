export function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.key]: action.value };
    case "SET_STATE":
      return { ...state, ...action.payload };
    case "UPDATE_COLOR": {
      const next = [...state.colors];
      next[action.index] = action.color;
      return { ...state, colors: next };
    }
    case "ADD_COLOR": {
      return { ...state, colors: [...state.colors, { name: "", value: "#333344", usage: "" }] };
    }
    case "REMOVE_COLOR": {
      return { ...state, colors: state.colors.filter((_, j) => j !== action.index) };
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
  // Migrate old dual-mode colors to single palette
  if (saved.darkColors && !saved.colors) {
    merged.colors = saved.darkColors;
  } else if (saved.colors) {
    merged.colors = saved.colors;
  }
  if (saved.typeLevels) merged.typeLevels = saved.typeLevels;
  if (saved.moodboardLinks) merged.moodboardLinks = saved.moodboardLinks;
  // Migrate old borderAppliesTo to new borderComponents + radiusOverrides
  if (saved.borderAppliesTo && !saved.borderComponents) {
    const bc = {};
    for (const id of saved.borderAppliesTo) {
      bc[id] = true;
    }
    merged.borderComponents = bc;
  }
  if (saved.borderComponents) merged.borderComponents = saved.borderComponents;
  if (saved.radiusOverrides) merged.radiusOverrides = saved.radiusOverrides;
  // Clean up removed fields
  delete merged.shadowLevels;
  delete merged.borderAppliesTo;
  // Reset visitedSections for users migrating from before progressive preview
  if (!saved.visitedSections) merged.visitedSections = {};
  return merged;
}
