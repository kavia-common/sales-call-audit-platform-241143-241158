import React from "react";
import { Card } from "../components/Card";

// PUBLIC_INTERFACE
export default function SettingsPage() {
  /** Settings placeholder page (no backend in scope). */
  return (
    <div className="grid">
      <div className="col12">
        <Card title="Settings" meta="Placeholder">
          <div className="helper" style={{ marginBottom: 12 }}>
            Add workspace configuration, audit templates, and user preferences when backend/auth are available.
          </div>

          <div className="grid" style={{ gap: 16 }}>
            <div className="col6">
              <div style={{ padding: 14, border: "1px solid var(--op-border)", borderRadius: 12 }}>
                <div style={{ fontWeight: 950, marginBottom: 6 }}>API base URL</div>
                <div className="mono">{process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || "—"}</div>
                <div className="helper" style={{ marginTop: 8 }}>
                  Configure <span className="mono">REACT_APP_API_BASE</span> or{" "}
                  <span className="mono">REACT_APP_BACKEND_URL</span> to enable live API mode.
                </div>
              </div>
            </div>

            <div className="col6">
              <div style={{ padding: 14, border: "1px solid var(--op-border)", borderRadius: 12 }}>
                <div style={{ fontWeight: 950, marginBottom: 6 }}>Environment</div>
                <div className="mono">{process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || "development"}</div>
                <div className="helper" style={{ marginTop: 8 }}>
                  This app is desktop-first and uses a mock fallback when API is not configured.
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
