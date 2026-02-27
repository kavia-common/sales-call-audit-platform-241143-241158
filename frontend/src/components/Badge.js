import React from "react";
import "../App.css";

function badgeVariant(variant) {
  if (variant === "primary") return "badge badgePrimary";
  if (variant === "warn") return "badge badgeWarn";
  if (variant === "danger") return "badge badgeDanger";
  if (variant === "success") return "badge badgeSuccess";
  return "badge";
}

function dotColor(variant) {
  if (variant === "primary") return "#2563EB";
  if (variant === "warn") return "#F59E0B";
  if (variant === "danger") return "#EF4444";
  if (variant === "success") return "#10B981";
  return "rgba(17,24,39,0.45)";
}

// PUBLIC_INTERFACE
export function Badge({ variant = "neutral", children }) {
  /** Small status badge used for risk/compliance indicators. */
  return (
    <span className={badgeVariant(variant)}>
      <span className="badgeDot" style={{ background: dotColor(variant) }} />
      {children}
    </span>
  );
}
