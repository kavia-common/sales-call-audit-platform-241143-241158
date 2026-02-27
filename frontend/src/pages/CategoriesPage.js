import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { listCalls, listCategories } from "../api/callsApi";
import { Card } from "../components/Card";
import { Tabs } from "../components/Tabs";
import { Table } from "../components/Table";
import { Badge } from "../components/Badge";

function riskVariant(risk) {
  if (risk === "high") return "danger";
  if (risk === "medium") return "warn";
  return "success";
}

// PUBLIC_INTERFACE
export default function CategoriesPage() {
  /** Category-specific drill-down view with top tabs for category selection. */
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    let alive = true;
    async function load() {
      const c = await listCategories();
      if (!alive) return;
      setCategories(c);
    }
    load();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    let alive = true;
    async function loadCalls() {
      const data = await listCalls({ categoryId });
      if (!alive) return;
      setCalls(data);
    }
    loadCalls();
    return () => {
      alive = false;
    };
  }, [categoryId]);

  const tabs = useMemo(
    () =>
      categories.map((c) => ({
        key: c.id,
        label: c.name,
      })),
    [categories]
  );

  const active = categoryId || (tabs[0] ? tabs[0].key : "");

  const activeMeta = categories.find((c) => c.id === active);

  const cols = useMemo(
    () => [
      { key: "id", header: "Call ID", render: (r) => <span className="mono">{r.id}</span> },
      { key: "title", header: "Title" },
      { key: "agent", header: "Agent" },
      { key: "customer", header: "Customer" },
      { key: "date", header: "Date" },
      { key: "risk", header: "Risk", render: (r) => <Badge variant={riskVariant(r.risk)}>{r.risk}</Badge> },
      { key: "score", header: "Score", render: (r) => <strong>{r.score}</strong> },
    ],
    []
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card
        title="Category performance"
        meta={activeMeta?.description || "Compare script adherence, disclosures, and risk signals across categories."}
      >
        <Tabs
          tabs={tabs}
          activeKey={active}
          onChange={(k) => {
            navigate(`/categories/${encodeURIComponent(k)}`);
          }}
        />
      </Card>

      <Card title={`Calls — ${activeMeta?.name || active}`} meta="Category-scoped list (click row to open audit detail)">
        <Table
          columns={cols}
          rows={calls}
          onRowClick={(r) => navigate(`/calls/${encodeURIComponent(r.id)}`)}
          emptyLabel="No calls available for this category."
        />
      </Card>
    </div>
  );
}
