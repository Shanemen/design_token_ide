export function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.key]: action.value };
    case "SET_STATE":
      return { ...state, ...action.payload };
    case "UPDATE_COLOR": {
      return { ...state, colors: { ...state.colors, [action.key]: action.value } };
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
  // Migrate colors to fixed role object
  if (Array.isArray(saved.colors)) {
    // Old format: array of { name, value, usage }
    const find = (kw) => saved.colors.find(c => c.name.toLowerCase().includes(kw))?.value;
    merged.colors = {
      bg: find("background") || defaults.colors.bg,
      surface: find("surface") || defaults.colors.surface,
      textPrimary: find("primary") || defaults.colors.textPrimary,
      textSecondary: find("secondary") || defaults.colors.textSecondary,
      accent: find("accent") || defaults.colors.accent,
      warning: defaults.colors.warning,
      success: defaults.colors.success,
    };
  } else if (Array.isArray(saved.darkColors) && !saved.colors) {
    const find = (kw) => saved.darkColors.find(c => c.name.toLowerCase().includes(kw))?.value;
    merged.colors = {
      bg: find("background") || defaults.colors.bg,
      surface: find("surface") || defaults.colors.surface,
      textPrimary: find("primary") || defaults.colors.textPrimary,
      textSecondary: find("secondary") || defaults.colors.textSecondary,
      accent: find("accent") || defaults.colors.accent,
      warning: defaults.colors.warning,
      success: defaults.colors.success,
    };
  } else if (saved.colors && typeof saved.colors === "object") {
    merged.colors = { ...defaults.colors, ...saved.colors };
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
