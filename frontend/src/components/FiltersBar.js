import React from "react";
import "../App.css";

// PUBLIC_INTERFACE
export function FiltersBar({ children, right }) {
  /** Consistent wrapper for page-level filters aligned with card/table sections. */
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-end", justifyContent: "space-between" }}>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-end", flexWrap: "wrap" }}>{children}</div>
      {right ? <div>{right}</div> : null}
    </div>
  );
}
