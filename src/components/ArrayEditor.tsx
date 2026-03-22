"use client";
import { ToneDefinition } from "@/data/tones";
import ImageEditor from "./ImageEditor";

interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "textarea" | "image";
}

interface ArrayEditorProps {
  items: Record<string, unknown>[];
  fields: FieldConfig[];
  onUpdate: (items: Record<string, unknown>[]) => void;
  tone: ToneDefinition;
  maxItems?: number;
  itemLabel?: string;
  userId?: string;
  imagePromptBuilder?: (item: Record<string, unknown>, fieldKey: string) => string;
}

export default function ArrayEditor({
  items,
  fields,
  onUpdate,
  tone,
  maxItems = 10,
  itemLabel = "Item",
  userId,
  imagePromptBuilder,
}: ArrayEditorProps) {
  function updateItem(index: number, key: string, value: string) {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: value };
    onUpdate(updated);
  }

  function removeItem(index: number) {
    onUpdate(items.filter((_, i) => i !== index));
  }

  function addItem() {
    if (items.length >= maxItems) return;
    const blank: Record<string, unknown> = {};
    fields.forEach((f) => (blank[f.key] = ""));
    onUpdate([...items, blank]);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 12px",
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    color: "#E2E8F0",
    fontSize: 13,
    outline: "none",
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            padding: "12px 14px",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600 }}>
              {itemLabel} {idx + 1}
            </span>
            <button
              onClick={() => removeItem(idx)}
              style={{
                background: "none",
                border: "none",
                color: "#EF4444",
                fontSize: 16,
                cursor: "pointer",
                padding: "2px 6px",
                borderRadius: 4,
              }}
              title="Remove"
            >
              ×
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {fields.map((field) => (
              <div key={field.key}>
                <label
                  style={{
                    fontSize: 11,
                    color: "#64748B",
                    fontWeight: 500,
                    display: "block",
                    marginBottom: 3,
                  }}
                >
                  {field.label}
                </label>
                {field.type === "image" && userId ? (
                  <ImageEditor
                    value={(item[field.key] as string) || ""}
                    onChange={(val) => updateItem(idx, field.key, val)}
                    userId={userId}
                    autoPrompt={
                      imagePromptBuilder
                        ? imagePromptBuilder(item, field.key)
                        : `${field.label} image`
                    }
                    gradient={tone.gradient}
                    radius={tone.radius}
                    aspectRatio="16/9"
                    height={120}
                  />
                ) : field.type === "textarea" ? (
                  <textarea
                    value={(item[field.key] as string) || ""}
                    onChange={(e) => updateItem(idx, field.key, e.target.value)}
                    rows={2}
                    style={{ ...inputStyle, resize: "none" }}
                  />
                ) : (
                  <input
                    type="text"
                    value={(item[field.key] as string) || ""}
                    onChange={(e) => updateItem(idx, field.key, e.target.value)}
                    style={inputStyle}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      {items.length < maxItems && (
        <button
          onClick={addItem}
          style={{
            background: "none",
            border: `1px dashed ${tone.primary}`,
            borderRadius: "8px",
            color: tone.primary,
            fontSize: 13,
            fontWeight: 600,
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          + Add {itemLabel}
        </button>
      )}
    </div>
  );
}
