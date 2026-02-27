import { apiClient } from "./client";
import { mockCalls, mockDashboard, mockCategories } from "./mockData";

function hasApi() {
  return Boolean(apiClient.resolveApiBaseUrl());
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * In mock mode, simulate small latency to make UI feel realistic.
 */
async function maybeMockDelay() {
  if (!hasApi()) await sleep(220);
}

function normalizeRisk(risk) {
  if (!risk) return "low";
  const v = String(risk).toLowerCase();
  if (v === "high" || v === "medium" || v === "low") return v;
  return "low";
}

// PUBLIC_INTERFACE
export async function getDashboardSummary() {
  /** Fetch summary KPIs and rollups for the dashboard. */
  if (!hasApi()) {
    await maybeMockDelay();
    return mockDashboard;
  }

  try {
    return await apiClient.requestJson("/dashboard/summary");
  } catch (e) {
    // Backend not in scope; gracefully fallback to demo dataset.
    await maybeMockDelay();
    return mockDashboard;
  }
}

// PUBLIC_INTERFACE
export async function listCalls(filters = {}) {
  /** List calls with optional filters. Filters are best-effort in mock mode. */
  if (!hasApi()) {
    await maybeMockDelay();
    const { query, categoryId, risk } = filters;

    return mockCalls
      .filter((c) => (categoryId ? c.categoryId === categoryId : true))
      .filter((c) => (risk ? normalizeRisk(c.risk) === normalizeRisk(risk) : true))
      .filter((c) => {
        if (!query) return true;
        const q = query.toLowerCase();
        return (
          c.id.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.agent.toLowerCase().includes(q) ||
          c.customer.toLowerCase().includes(q)
        );
      });
  }

  try {
    const qs = new URLSearchParams();
    Object.entries(filters || {}).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v).trim() !== "") qs.set(k, String(v));
    });
    const suffix = qs.toString() ? `?${qs.toString()}` : "";
    return await apiClient.requestJson(`/calls${suffix}`);
  } catch (e) {
    await maybeMockDelay();
    return mockCalls;
  }
}

// PUBLIC_INTERFACE
export async function getCallById(callId) {
  /** Fetch a single call by ID (for detail view). */
  if (!hasApi()) {
    await maybeMockDelay();
    const found = mockCalls.find((c) => c.id === callId);
    if (!found) throw new Error(`Call not found: ${callId}`);
    return found;
  }

  try {
    return await apiClient.requestJson(`/calls/${encodeURIComponent(callId)}`);
  } catch (e) {
    await maybeMockDelay();
    const found = mockCalls.find((c) => c.id === callId);
    if (!found) throw e;
    return found;
  }
}

// PUBLIC_INTERFACE
export async function listCategories() {
  /** List supported call categories used for navigation + filtering. */
  if (!hasApi()) {
    await maybeMockDelay();
    return mockCategories;
  }

  try {
    return await apiClient.requestJson("/categories");
  } catch (e) {
    await maybeMockDelay();
    return mockCategories;
  }
}
