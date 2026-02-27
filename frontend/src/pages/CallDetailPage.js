import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCallById } from "../api/callsApi";
import { Badge } from "../components/Badge";
import { Card } from "../components/Card";
import { Tabs } from "../components/Tabs";

function riskVariant(risk) {
  if (risk === "high") return "danger";
  if (risk === "medium") return "warn";
  return "success";
}

function severityVariant(sev) {
  if (sev === "danger") return "danger";
  if (sev === "warn") return "warn";
  if (sev === "info") return "primary";
  return "neutral";
}

function formatDuration(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
}

// PUBLIC_INTERFACE
export default function CallDetailPage() {
  /** Call detail/audit page with internal tabs for review workflows. */
  const { callId } = useParams();
  const [call, setCall] = useState(null);
  const [tab, setTab] = useState("overview");
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setError("");
        const data = await getCallById(callId);
        if (!alive) return;
        setCall(data);
      } catch (e) {
        if (!alive) return;
        setError(String(e?.message || e));
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [callId]);

  const tabs = useMemo(
    () => [
      { key: "overview", label: "Overview" },
      { key: "transcript", label: "Transcript" },
      { key: "findings", label: "Findings" },
      { key: "metrics", label: "Metrics" },
    ],
    []
  );

  if (error) {
    return (
      <Card title="Call not found" meta={callId}>
        <div className="helper">{error}</div>
        <div style={{ marginTop: 12 }}>
          <Link className="btn" to="/calls">
            Back to calls
          </Link>
        </div>
      </Card>
    );
  }

  if (!call) {
    return (
      <Card title="Loading call audit…" meta={callId}>
        <div className="helper">Fetching audit data (API or mock fallback).</div>
      </Card>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card
        title={call.title}
        meta={`${call.id} • ${call.date} • ${call.agent} • ${formatDuration(call.durationSec)}`}
        right={
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Badge variant={riskVariant(call.risk)}>{String(call.risk).toUpperCase()} RISK</Badge>
            <span className="badge badgePrimary">Score {call.score}</span>
            <Link className="btn" to="/calls">
              Back
            </Link>
          </div>
        }
      >
        <Tabs tabs={tabs} activeKey={tab} onChange={setTab} />

        <div className="hr" />

        {tab === "overview" && (
          <div className="grid" style={{ gap: 16 }}>
            <div className="col6">
              <Card title="Key highlights" meta="What went well / what to keep">
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {(call.highlights || []).map((h) => (
                    <li key={h} style={{ marginBottom: 8 }}>
                      {h}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="col6">
              <Card title="Flags" meta="Signals for remediation or follow-up">
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {(call.flags || []).map((f) => (
                    <span key={f} className="badge badgeWarn">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="helper" style={{ marginTop: 10 }}>
                  Use Findings tab to review compliance items.
                </div>
              </Card>
            </div>

            <div className="col12">
              <Card title="Timeline" meta="Moments captured during the call">
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {(call.timeline || []).map((t) => (
                    <div
                      key={t.t + t.label}
                      style={{
                        display: "flex",
                        gap: 14,
                        alignItems: "baseline",
                        padding: 12,
                        border: "1px solid var(--op-border)",
                        borderRadius: 12,
                      }}
                    >
                      <span className="mono" style={{ width: 68 }}>
                        {t.t}
                      </span>
                      <div style={{ fontWeight: 900 }}>{t.label}</div>
                      <div className="helper">{t.note}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {tab === "transcript" && (
          <div className="grid" style={{ gap: 16 }}>
            <div className="col12">
              <Card title="Transcript (snippet)" meta="Full transcript would be retrieved from backend when available">
                <div style={{ lineHeight: 1.7 }}>
                  <p style={{ marginTop: 0 }}>
                    <strong>Snippet:</strong> {call.transcriptSnippet}
                  </p>
                  <div className="helper">
                    Note: This environment uses a demo transcript snippet. Wire to backend endpoint to fetch full
                    transcript when available.
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {tab === "findings" && (
          <div className="grid" style={{ gap: 16 }}>
            <div className="col12">
              <Card title="Audit findings" meta="Severity-coded compliance and quality observations">
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {(call.findings || []).map((f) => (
                    <div
                      key={f.title}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 16,
                        padding: 14,
                        border: "1px solid var(--op-border)",
                        borderRadius: 12,
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 950, marginBottom: 6 }}>{f.title}</div>
                        <div className="helper">{f.detail}</div>
                      </div>
                      <Badge variant={severityVariant(f.severity)}>{String(f.severity).toUpperCase()}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {tab === "metrics" && (
          <div className="grid" style={{ gap: 16 }}>
            <div className="col4">
              <Card title="Talk ratio" meta="Agent vs customer">
                <div className="kpiValue">{Math.round((call.metrics.talkRatioAgent || 0) * 100)}%</div>
                <div className="kpiSub">Agent talk time</div>
                <div className="helper" style={{ marginTop: 8 }}>
                  Customer: {Math.round((call.metrics.talkRatioCustomer || 0) * 100)}%
                </div>
              </Card>
            </div>
            <div className="col4">
              <Card title="Interruptions" meta="Counts during the call">
                <div className="kpiValue">{call.metrics.interruptions}</div>
                <div className="kpiSub">Interruptions recorded</div>
              </Card>
            </div>
            <div className="col4">
              <Card title="Long monologues" meta="Segments over 60 seconds">
                <div className="kpiValue">{call.metrics.monologuesOver60s}</div>
                <div className="kpiSub">Monologues &gt; 60s</div>
              </Card>
            </div>
            <div className="col12">
              <Card title="Notes" meta="How to improve">
                <div className="helper">
                  Reduce risk by ensuring disclosure templates are fully read and suitability checks are explicit for
                  high-risk instruments.
                </div>
              </Card>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
