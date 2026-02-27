import React from "react";
import "../App.css";

// PUBLIC_INTERFACE
export function Tabs({ tabs, activeKey, onChange }) {
  /** A simple, accessible tab switcher (button-based) for in-section navigation. */
  return (
    <div className="tabs" role="tablist" aria-label="Section tabs">
      {tabs.map((t) => {
        const active = t.key === activeKey;
        return (
          <button
            key={t.key}
            type="button"
            className={`tab ${active ? "tabActive" : ""}`}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.key)}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
