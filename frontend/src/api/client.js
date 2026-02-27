/**
 * Lightweight API client for the Call Audit Platform.
 * Uses REACT_APP_API_BASE or REACT_APP_BACKEND_URL when available.
 * Falls back to mock data for local/demo usage (backend not in scope).
 */

const DEFAULT_TIMEOUT_MS = 12000;

function resolveApiBaseUrl() {
  const envBase =
    (process.env.REACT_APP_API_BASE && process.env.REACT_APP_API_BASE.trim()) ||
    (process.env.REACT_APP_BACKEND_URL && process.env.REACT_APP_BACKEND_URL.trim()) ||
    "";

  // If not provided, treat as "mock-only".
  return envBase;
}

function joinUrl(base, path) {
  if (!base) return path;
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

/**
 * @param {string} path
 * @param {RequestInit} init
 * @returns {Promise<any>}
 */
async function requestJson(path, init = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const base = resolveApiBaseUrl();
    const url = joinUrl(base, path);

    const res = await fetch(url, {
      ...init,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(init.headers || {}),
      },
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const err = new Error(`API error ${res.status} for ${path}${text ? `: ${text}` : ""}`);
      err.status = res.status;
      throw err;
    }

    // Allow empty 204 responses.
    if (res.status === 204) return null;
    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}

export const apiClient = {
  resolveApiBaseUrl,
  requestJson,
};
