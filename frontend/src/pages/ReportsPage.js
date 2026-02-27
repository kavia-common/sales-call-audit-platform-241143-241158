import React, { useState } from "react";
import { Card } from "../components/Card";
import { Tabs } from "../components/Tabs";

// PUBLIC_INTERFACE
export default function ReportsPage() {
  /** Reports page placeholder with section tabs. */
  const [tab, setTab] = useState("remediation");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card title="Reports" meta="Generate and review audit outputs (backend integration pending)">
        <Tabs
          tabs={[
            { key: "remediation", label: "Remediation" },
            { key: "compliance", label: "Compliance" },
            { key: "quality", label: "Quality" },
          ]}
          activeKey={tab}
          onChange={setTab}
        />

        <div className="hr" />

        {tab === "remediation" && (
          <div className="helper">
            Track open items, owners, and due dates. This UI is ready to be wired to /reports endpoints when available.
          </div>
        )}

        {tab === "compliance" && (
          <div className="helper">
            Compliance summaries by category, agent, and risk severity. Add export + drilldowns once backend exists.
          </div>
        )}

        {tab === "quality" && (
          <div className="helper">
            Quality insights (talk ratio, objection handling, next step clarity). Intended for executive-ready review.
          </div>
        )}
      </Card>

      <div className="grid">
        <div className="col6">
          <Card title="Scheduled exports" meta="PDF / CSV">
            <div className="helper">Not configured. Add export jobs and S3/email delivery in a future iteration.</div>
          </Card>
        </div>
        <div className="col6">
          <Card title="Audit templates" meta="Disclosure / suitability scripts">
            <div className="helper">Store templates and track changes to ensure consistent coverage across audits.</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
