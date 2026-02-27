/**
 * Mock dataset for the Call Audit Platform UI.
 * These records are intentionally shaped to support list + detail + category pages.
 */

export const mockCategories = [
  { id: "sales-pitch", name: "Sales Pitch", description: "Pitch quality, objections, and next-step clarity." },
  { id: "welcome-calls", name: "Welcome Calls", description: "Onboarding readiness, KYC prompts, and tone." },
  { id: "pre-trade", name: "Pre-trade Confirmations", description: "Mandatory disclosures and trade suitability." },
];

export const mockCalls = [
  {
    id: "CAL-10021",
    title: "ACME Capital — Initial Pitch",
    categoryId: "sales-pitch",
    agent: "Ava Chen",
    customer: "Morgan H.",
    date: "2026-02-20",
    durationSec: 1840,
    score: 86,
    risk: "low",
    flags: ["Next step set"],
    highlights: [
      "Strong discovery questions",
      "Clear value framing",
      "Handled pricing objection effectively",
    ],
    transcriptSnippet:
      "…to make sure we're aligned, can you walk me through your current process for trade confirmations?",
    metrics: {
      talkRatioAgent: 0.54,
      talkRatioCustomer: 0.46,
      interruptions: 2,
      monologuesOver60s: 1,
    },
    findings: [
      { severity: "info", title: "Good rapport", detail: "Used customer's name and confirmed objectives." },
      { severity: "warn", title: "Compliance reminder", detail: "Mentioned fees; disclosure phrasing could be tighter." },
    ],
    timeline: [
      { t: "00:00", label: "Warm intro", note: "Friendly opening and context set." },
      { t: "04:12", label: "Needs discovery", note: "Captured constraints + timeline." },
      { t: "13:25", label: "Pricing", note: "Explained pricing tiers and value." },
    ],
  },
  {
    id: "CAL-10022",
    title: "Welcome Call — New Account",
    categoryId: "welcome-calls",
    agent: "Noah Patel",
    customer: "Jesse R.",
    date: "2026-02-21",
    durationSec: 1320,
    score: 78,
    risk: "medium",
    flags: ["KYC follow-up", "Risk disclosure"],
    highlights: ["Clear next steps", "Account access walkthrough"],
    transcriptSnippet:
      "…before we proceed, I need to confirm a few details for compliance and security.",
    metrics: {
      talkRatioAgent: 0.61,
      talkRatioCustomer: 0.39,
      interruptions: 5,
      monologuesOver60s: 3,
    },
    findings: [
      { severity: "warn", title: "KYC incomplete", detail: "Customer unsure about address verification." },
      { severity: "warn", title: "Talk ratio high", detail: "Agent dominated; consider more check-ins." },
    ],
    timeline: [
      { t: "00:00", label: "Purpose", note: "Set expectations and agenda." },
      { t: "03:40", label: "Security", note: "Confirmed authentication steps." },
      { t: "12:05", label: "Wrap-up", note: "Summarized actions and email follow-up." },
    ],
  },
  {
    id: "CAL-10023",
    title: "Pre-trade Confirmation — Options",
    categoryId: "pre-trade",
    agent: "Lina Gomez",
    customer: "Sam K.",
    date: "2026-02-23",
    durationSec: 980,
    score: 69,
    risk: "high",
    flags: ["Missing disclosure", "Suitability concern"],
    highlights: ["Trade details captured"],
    transcriptSnippet:
      "…just to confirm, do you understand the risks associated with options and potential losses?",
    metrics: {
      talkRatioAgent: 0.49,
      talkRatioCustomer: 0.51,
      interruptions: 1,
      monologuesOver60s: 0,
    },
    findings: [
      { severity: "danger", title: "Disclosure incomplete", detail: "Did not explicitly state margin requirements." },
      { severity: "warn", title: "Suitability", detail: "Customer indicated low experience with options." },
    ],
    timeline: [
      { t: "00:00", label: "Trade intent", note: "Captured order details and limits." },
      { t: "07:10", label: "Risks", note: "Risk statement partial; needs full template." },
      { t: "14:20", label: "Confirmation", note: "Read back order and asked for confirmation." },
    ],
  },
];

export const mockDashboard = {
  periodLabel: "Last 14 days",
  kpis: [
    { label: "Calls audited", value: 124, delta: "+8.8%" },
    { label: "Avg quality score", value: 81, delta: "+1.6" },
    { label: "High-risk calls", value: 9, delta: "-2" },
    { label: "Open remediation", value: 14, delta: "+3" },
  ],
  topCategories: [
    { id: "sales-pitch", label: "Sales Pitch", count: 62, avgScore: 83 },
    { id: "welcome-calls", label: "Welcome Calls", count: 41, avgScore: 79 },
    { id: "pre-trade", label: "Pre-trade", count: 21, avgScore: 74 },
  ],
};
