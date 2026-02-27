import React, { useEffect, useMemo, useState } from "react";
import { getDashboardSummary, listCalls } from "../api/callsApi";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Table } from "../components/Table";

function riskVariant(risk) {
  if (risk === "high") return "danger";
  if (risk === "medium") return "warn";
  return "success";
}

function formatDuration(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
}

// PUBLIC_INTERFACE
export default function DashboardPage() {
  /** Dashboard overview page (KPIs + rollups + recent calls). */
  const [summary, setSummary] = useState(null);
  const [recent, setRecent] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setError("");
        const [s, calls] = await Promise.all([getDashboardSummary(), listCalls()]);
        if (!alive) return;
        setSummary(s);
        // "Recent" = by date desc in mock; backend can provide.
        setRecent([...calls].sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 6));
      } catch (e) {
        if (!alive) return;
        setError(String(e?.message || e));
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const cols = useMemo(
    () => [
      { key: "id", header: "Call ID", render: (r) => <span className="mono">{r.id}</span> },
      { key: "title", header: "Title" },
      { key: "categoryId", header: "Category" },
      { key: "agent", header: "Agent" },
      { key: "date", header: "Date" },
      { key: "durationSec", header: "Duration", render: (r) => formatDuration(r.durationSec) },
      {
        key: "risk",
        header: "Risk",
        render: (r) => <Badge variant={riskVariant(r.risk)}>{String(r.risk).toUpperCase()}</Badge>,
      },
      { key: "score", header: "Score", render: (r) => <strong>{r.score}</strong> },
    ],
    []
  );

  if (error) {
    return (
      <div className="card">
        <div className="cardBody">
          <div style={{ fontWeight: 900, marginBottom: 8 }}>Unable to load dashboard</div>
          <div className="helper">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="grid">
        {(summary?.kpis || []).map((k) => (
          <div key={k.label} className="col3 col4">
            <Card
              title={k.label}
              meta={summary?.periodLabel || "—"}
              right={<span className="badge badgePrimary">{k.delta}</span>}
            >
              <div className="kpiValue">{k.value}</div>
              <div className="kpiSub">Compared to prior period</div>
            </Card>
          </div>
        ))}

        <div className="col8">
          <Card title="Top categories" meta="Volume and average audit score">
            <div className="grid" style={{ gap: 16 }}>
              {(summary?.topCategories || []).map((c) => (
                <div key={c.id} className="col4" style={{ gridColumn: "span 4" }}>
                  <div style={{ padding: 14, border: "1px solid var(--op-border)", borderRadius: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontWeight: 900 }}>{c.label}</div>
                      <span className="badge badgeWarn">{c.count} calls</span>
                    </div>
                    <div className="helper" style={{ marginTop: 6 }}>
                      Avg score <strong>{c.avgScore}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="col4">
          <Card title="Compliance focus" meta="What to review next">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="badge badgeDanger">High-risk disclosures</div>
              <div className="badge badgeWarn">KYC follow-ups</div>
              <div className="badge badgePrimary">Script adherence</div>
              <div className="helper" style={{ marginTop: 6 }}>
                Prioritize calls with missing disclosures and suitability concerns.
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card title="Recent calls" meta="Latest audited calls (click through from Calls list)">
        <Table columns={cols} rows={recent} emptyLabel="No recent calls found." />
      </Card>
    </div>
  );
}
