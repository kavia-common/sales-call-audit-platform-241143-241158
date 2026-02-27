import React, { useState } from "react";
import { Card } from "../components/Card";
import { Tabs } from "../components/Tabs";

// PUBLIC_INTERFACE
export default function AnalyticsPage() {
  /** Analytics page placeholder with executive-friendly section tabs and cards. */
  const [tab, setTab] = useState("trends");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card title="Analytics" meta="Trends and insights (charts to be integrated later)">
        <Tabs
          tabs={[
            { key: "trends", label: "Trends" },
            { key: "risk", label: "Risk" },
            { key: "agents", label: "Agents" },
          ]}
          activeKey={tab}
          onChange={setTab}
        />

        <div className="hr" />

        {tab === "trends" && (
          <div className="helper">
            Trendlines for audit score and high-risk volume. Intended for chart integration (e.g., SVG/Canvas) without
            heavy libraries.
          </div>
        )}

        {tab === "risk" && (
          <div className="helper">
            Risk distribution by category and finding severity. Add breakdown tables and drilldowns to calls.
          </div>
        )}

        {tab === "agents" && (
          <div className="helper">
            Agent-level coaching insights. Combine talk ratio, interruption patterns, and disclosure completeness.
          </div>
        )}
      </Card>

      <div className="grid">
        <div className="col4">
          <Card title="Score movement" meta="Last 30 days">
            <div className="kpiValue">+1.6</div>
            <div className="kpiSub">Average score delta</div>
          </Card>
        </div>
        <div className="col4">
          <Card title="High-risk share" meta="Last 30 days">
            <div className="kpiValue">7.3%</div>
            <div className="kpiSub">Calls flagged as high risk</div>
          </Card>
        </div>
        <div className="col4">
          <Card title="Disclosure completeness" meta="Estimated">
            <div className="kpiValue">92%</div>
            <div className="kpiSub">Based on audit checklist coverage</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
