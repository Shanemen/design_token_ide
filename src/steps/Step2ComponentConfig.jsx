import { useContext } from "react";
import { ThemeContext } from "../theme";
import { ATOMIC_COMPONENTS, BLOCK_COMPONENTS, FIXED_COMPONENTS } from "./componentDefs";
import Pill from "../shared/Pill";
import Input from "../shared/Input";
import TextArea from "../shared/TextArea";

export default function Step2ComponentConfig({ componentId, config, onChange, onBack }) {
  const t = useContext(ThemeContext);
  const allComponents = [...ATOMIC_COMPONENTS, ...BLOCK_COMPONENTS, ...FIXED_COMPONENTS];
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
        fontSize: t.font.sm,
        color: t.label,
        marginBottom: t.gap.sm,
        textTransform: "uppercase",
        letterSpacing: 1.5,
      }}>{field.label}</label>
    );

    switch (field.type) {
      case "pill":
        return (
          <div key={field.key} style={{ marginBottom: t.gap.lg }}>
            {fieldLabel}
            <div style={{ display: "flex", gap: t.gap.sm, flexWrap: "wrap" }}>
              {field.options.map(opt => (
                <Pill key={opt} label={opt} active={config[field.key] === opt} onClick={() => updateField(field.key, opt)} />
              ))}
            </div>
          </div>
        );
      case "multi-pill":
        return (
          <div key={field.key} style={{ marginBottom: t.gap.lg }}>
            {fieldLabel}
            <div style={{ display: "flex", gap: t.gap.sm, flexWrap: "wrap" }}>
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
          <div key={field.key} style={{ marginBottom: t.gap.lg }}>
            {fieldLabel}
            <div style={{ display: "flex", gap: t.gap.sm, flexWrap: "wrap" }}>
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
                  marginTop: t.gap.sm,
                  padding: `${t.gap.sm}px ${t.space.md}px`,
                  borderRadius: t.radius.sm,
                  background: selected.canAI ? "#22c55e10" : `${t.accent}08`,
                  border: `1px solid ${selected.canAI ? "#22c55e20" : t.accent + "20"}`,
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: t.font.xs,
                    fontWeight: 500,
                    padding: `2px ${t.gap.sm}px`,
                    borderRadius: t.radius.sm - 2,
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
          <div key={field.key} style={{ marginBottom: t.gap.lg }}>
            {fieldLabel}
            <div style={{ display: "flex", gap: t.gap.sm }}>
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


  return (
    <div>
      {/* Component header with close button */}
      <div style={{ display: "flex", alignItems: "center", gap: t.gap.md, marginBottom: t.space.lg }}>
        <span style={{ fontSize: t.font.xl, color: t.accent, opacity: 0.7 }}>{compDef.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: t.font.lg,
            fontWeight: 600,
            color: t.text,
          }}>{compDef.label}</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: t.font.sm,
            color: t.dim,
          }}>{compDef.desc}</div>
        </div>
        <button
          onClick={onBack}
          style={{
            background: "transparent",
            border: `1px solid ${t.border}`,
            color: t.dim,
            fontSize: t.font.sm,
            fontFamily: "'JetBrains Mono', monospace",
            cursor: "pointer",
            padding: `${t.space.sm}px ${t.space.md}px`,
            borderRadius: t.radius.md,
            transition: "all 0.15s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.dim; }}
        >← Back</button>
      </div>

      {/* Config fields */}
      {compDef.fields.map(renderField)}

      {/* Layout inspiration for blocks */}

    </div>
  );
}
