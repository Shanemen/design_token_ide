import { useContext } from "react";
import { ThemeContext } from "../theme";
import { ATOMIC_COMPONENTS, BLOCK_COMPONENTS, LAYOUT_IDEAS } from "./componentDefs";
import Pill from "../shared/Pill";
import Input from "../shared/Input";
import TextArea from "../shared/TextArea";

export default function Step2ComponentConfig({ componentId, config, onChange, onBack }) {
  const t = useContext(ThemeContext);
  const allComponents = [...ATOMIC_COMPONENTS, ...BLOCK_COMPONENTS];
  const compDef = allComponents.find(c => c.id === componentId);
  if (!compDef) return null;

  const updateField = (key, value) => {
    onChange({ ...config, [key]: value });
  };

  // Render a field based on its type
  const renderField = (field) => {
    // Handle conditional visibility
    if (field.showIf && !field.showIf(config)) return null;

    const fieldLabel = (
      <label style={{
        display: "block",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        color: t.label,
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: 1.5,
      }}>{field.label}</label>
    );

    switch (field.type) {
      case "pill":
        return (
          <div key={field.key} style={{ marginBottom: 16 }}>
            {fieldLabel}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {field.options.map(opt => (
                <Pill key={opt} label={opt} active={config[field.key] === opt} onClick={() => updateField(field.key, opt)} />
              ))}
            </div>
          </div>
        );
      case "multi-pill":
        return (
          <div key={field.key} style={{ marginBottom: 16 }}>
            {fieldLabel}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {field.options.map(opt => {
                const arr = config[field.key] || [];
                const isActive = arr.includes(opt);
                return (
                  <Pill key={opt} label={opt} active={isActive} onClick={() => {
                    updateField(field.key, isActive ? arr.filter(v => v !== opt) : [...arr, opt]);
                  }} />
                );
              })}
            </div>
          </div>
        );
      case "pill-flagged":
        return (
          <div key={field.key} style={{ marginBottom: 16 }}>
            {fieldLabel}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {field.options.map(opt => (
                <Pill key={opt.id} label={`${opt.id}${opt.canAI ? "" : " ⚑"}`} active={config[field.key] === opt.id} onClick={() => updateField(field.key, opt.id)} />
              ))}
            </div>
            {/* Capability hint */}
            {(() => {
              const selected = field.options.find(o => o.id === config[field.key]);
              if (!selected) return null;
              return (
                <div style={{
                  marginTop: 10,
                  padding: "8px 12px",
                  borderRadius: 6,
                  background: selected.canAI ? "#22c55e10" : `${t.accent}08`,
                  border: `1px solid ${selected.canAI ? "#22c55e20" : t.accent + "20"}`,
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    fontWeight: 500,
                    padding: "2px 8px",
                    borderRadius: 4,
                    background: selected.canAI ? "#22c55e20" : `${t.accent}20`,
                    color: selected.canAI ? "#22c55e" : t.accent,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}>
                    {selected.canAI ? "✓ CC can code" : "⚑ needs assets"}
                  </span>
                </div>
              );
            })()}
          </div>
        );
      case "bool":
        return (
          <div key={field.key} style={{ marginBottom: 16 }}>
            {fieldLabel}
            <div style={{ display: "flex", gap: 8 }}>
              <Pill label="yes" active={config[field.key] === true} onClick={() => updateField(field.key, true)} />
              <Pill label="no" active={config[field.key] === false} onClick={() => updateField(field.key, false)} />
            </div>
          </div>
        );
      case "input":
        return (
          <div key={field.key}>
            <Input label={field.label} value={config[field.key] || ""} onChange={v => updateField(field.key, v)} placeholder={field.placeholder} mono={field.mono} small={field.small} />
          </div>
        );
      case "textarea":
        return (
          <div key={field.key}>
            <TextArea label={field.label} value={config[field.key] || ""} onChange={v => updateField(field.key, v)} placeholder={field.placeholder} rows={3} />
          </div>
        );
      default:
        return null;
    }
  };

  // Layout inspiration for block components
  const renderLayoutInspiration = () => {
    if (!compDef.hasLayout) return null;
    const filtered = compDef.layoutFilter
      ? LAYOUT_IDEAS.map(cat => ({
          ...cat,
          items: cat.items.filter(item => compDef.layoutFilter.includes(item.name)),
        })).filter(cat => cat.items.length > 0)
      : LAYOUT_IDEAS;

    return (
      <div style={{ marginTop: 20 }}>
        <label style={{
          display: "block",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: t.label,
          marginBottom: 10,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}>Layout Inspiration</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((cat, ci) => (
            <div key={ci}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: t.accent,
                opacity: 0.5,
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 6,
              }}>{cat.category}</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {cat.items.map((item, ii) => {
                  const isSelected = config.layout === item.name;
                  return (
                    <button
                      key={ii}
                      onClick={() => updateField("layout", isSelected ? "" : item.name)}
                      style={{
                        flex: "1 1 calc(50% - 3px)",
                        minWidth: 180,
                        padding: "10px 12px",
                        borderRadius: 8,
                        border: `1px solid ${isSelected ? t.accent + "50" : t.border}`,
                        background: isSelected ? `${t.accent}08` : t.inputBg,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.15s",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 12,
                            fontWeight: 500,
                            color: t.text,
                            marginBottom: 3,
                          }}>
                            {item.name}
                            {isSelected && <span style={{ color: t.accent, marginLeft: 6, fontSize: 10 }}>✓</span>}
                          </div>
                          <div style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 10,
                            color: t.muted,
                            lineHeight: 1.4,
                          }}>{item.desc}</div>
                        </div>
                        <pre style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 7,
                          color: t.dim,
                          lineHeight: 1.3,
                          margin: 0,
                          flexShrink: 0,
                          opacity: 0.6,
                        }}>{item.sketch}</pre>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 12px",
          borderRadius: 6,
          border: `1px solid ${t.border}`,
          background: "transparent",
          color: t.dim,
          fontSize: 12,
          fontFamily: "'JetBrains Mono', monospace",
          cursor: "pointer",
          marginBottom: 16,
          transition: "all 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.dim; }}
      >
        ← Back to components
      </button>

      {/* Component header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <span style={{ fontSize: 22, color: t.accent, opacity: 0.7 }}>{compDef.icon}</span>
        <div>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 17,
            fontWeight: 600,
            color: t.text,
          }}>{compDef.label}</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: t.dim,
          }}>{compDef.desc}</div>
        </div>
      </div>

      {/* Config fields */}
      {compDef.fields.map(renderField)}

      {/* Layout inspiration for blocks */}
      {renderLayoutInspiration()}

      {/* General notes */}
      <div style={{ marginTop: 16 }}>
        <TextArea
          label="Notes"
          value={config.notes || ""}
          onChange={v => updateField("notes", v)}
          placeholder="Any additional notes for this component..."
          rows={3}
        />
      </div>
    </div>
  );
}
