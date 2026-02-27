import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { listCalls, listCategories } from "../api/callsApi";
import { Badge } from "../components/Badge";
import { Card } from "../components/Card";
import { FiltersBar } from "../components/FiltersBar";
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
export default function CallsPage() {
  /** Calls list page with filters and row navigation to call detail. */
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const [categories, setCategories] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const query = params.get("q") || "";
  const categoryId = params.get("categoryId") || "";
  const risk = params.get("risk") || "";

  useEffect(() => {
    let alive = true;
    listCategories().then((c) => {
      if (!alive) return;
      setCategories(c);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      try {
        const data = await listCalls({ query, categoryId, risk });
        if (!alive) return;
        setRows(data);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [query, categoryId, risk]);

  const cols = useMemo(
    () => [
      { key: "id", header: "Call ID", render: (r) => <span className="mono">{r.id}</span> },
      { key: "title", header: "Title" },
      { key: "categoryId", header: "Category" },
      { key: "agent", header: "Agent" },
      { key: "customer", header: "Customer" },
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

  function updateParam(key, value) {
    const next = new URLSearchParams(params.toString());
    if (!value) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card
        title="Filters"
        meta="Search across ID, title, agent, and customer"
        right={
          <button
            className="btn"
            type="button"
            onClick={() => {
              setParams(new URLSearchParams(), { replace: true });
            }}
          >
            Clear
          </button>
        }
      >
        <FiltersBar
          right={
            <div className="helper">
              {loading ? "Loading…" : `${rows.length} result${rows.length === 1 ? "" : "s"}`}
            </div>
          }
        >
          <div className="field" style={{ minWidth: 320 }}>
            <div className="label">Search</div>
            <input
              className="input"
              value={query}
              placeholder="e.g., CAL-10023, Ava, ACME…"
              onChange={(e) => updateParam("q", e.target.value)}
            />
          </div>

          <div className="field" style={{ minWidth: 220 }}>
            <div className="label">Category</div>
            <select className="select" value={categoryId} onChange={(e) => updateParam("categoryId", e.target.value)}>
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="field" style={{ minWidth: 180 }}>
            <div className="label">Risk</div>
            <select className="select" value={risk} onChange={(e) => updateParam("risk", e.target.value)}>
              <option value="">All risk levels</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </FiltersBar>
      </Card>

      <Card title="Calls" meta="Click a row to open the audit detail view">
        <Table
          columns={cols}
          rows={rows}
          onRowClick={(r) => navigate(`/calls/${encodeURIComponent(r.id)}`)}
          emptyLabel={loading ? "Loading…" : "No calls found for the selected filters."}
        />
      </Card>
    </div>
  );
}
