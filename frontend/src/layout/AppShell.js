import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../App.css";

function iconGlyph(label) {
  // Simple inline glyphs to avoid adding an icon dependency.
  const map = {
    Dashboard: "▦",
    Calls: "☎",
    Categories: "⧉",
    Reports: "≋",
    Analytics: "◔",
    Settings: "⚙",
  };
  return map[label] || "•";
}

function usePageMeta() {
  const { pathname } = useLocation();

  if (pathname === "/" || pathname === "/dashboard") {
    return { title: "Dashboard", subtitle: "Executive overview of audits, risk, and remediation." };
  }
  if (pathname.startsWith("/calls/")) {
    return { title: "Call Audit Detail", subtitle: "Review transcript, findings, and compliance indicators." };
  }
  if (pathname.startsWith("/calls")) {
    return { title: "Calls", subtitle: "Browse and filter audited calls." };
  }
  if (pathname.startsWith("/categories")) {
    return { title: "Categories", subtitle: "Audit performance by call category and scripts." };
  }
  if (pathname.startsWith("/reports")) {
    return { title: "Reports", subtitle: "Generated audit reports and remediation status." };
  }
  if (pathname.startsWith("/analytics")) {
    return { title: "Analytics", subtitle: "Trends and high-level insights across periods." };
  }
  if (pathname.startsWith("/settings")) {
    return { title: "Settings", subtitle: "Manage preferences and workspace configuration." };
  }
  return { title: "Call Audit Platform", subtitle: "Ocean Professional theme (desktop-first)." };
}

function SidebarItem({ to, label, hint }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `navItem ${isActive ? "navItemActive" : ""}`}
      end={to === "/" || to === "/calls"}
    >
      <span className="navIcon" aria-hidden="true">
        {iconGlyph(label)}
      </span>
      <span className="navLabel">{label}</span>
      {hint ? <span className="navHint">{hint}</span> : null}
    </NavLink>
  );
}

// PUBLIC_INTERFACE
export default function AppShell() {
  /** Root application shell: fixed 240px sidebar and centered main content (max 1440px). */
  const meta = usePageMeta();

  return (
    <div className="appShell">
      <aside className="sidebar" aria-label="Primary">
        <div className="brand">
          <div className="brandTitle">Call Audit Platform</div>
          <div className="brandMeta">Ocean Professional • Desktop</div>
        </div>

        <div className="navGroup">
          <div className="navGroupTitle">Overview</div>
          <SidebarItem to="/" label="Dashboard" />
        </div>

        <div className="navGroup">
          <div className="navGroupTitle">Audits</div>
          <SidebarItem to="/calls" label="Calls" />
        </div>

        <div className="navGroup">
          <div className="navGroupTitle">Categories</div>
          <SidebarItem to="/categories/sales-pitch" label="Categories" hint="3" />
        </div>

        <div className="navGroup">
          <div className="navGroupTitle">Insights</div>
          <SidebarItem to="/reports" label="Reports" />
          <SidebarItem to="/analytics" label="Analytics" />
        </div>

        <div className="navGroup">
          <div className="navGroupTitle">Admin</div>
          <SidebarItem to="/settings" label="Settings" />
        </div>

        <div style={{ marginTop: 24, padding: "0 8px", color: "rgba(17,24,39,0.55)", fontSize: 12 }}>
          <div style={{ fontWeight: 800, marginBottom: 6 }}>Data Source</div>
          <div className="mono">
            API: {process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL ? "configured" : "mock fallback"}
          </div>
        </div>
      </aside>

      <main className="main">
        <div className="mainInner">
          <header className="topbar">
            <div>
              <h1 className="topbarTitle">{meta.title}</h1>
              <p className="topbarSubtitle">{meta.subtitle}</p>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <a className="btn" href="/calls">
                Open calls
              </a>
              <a className="btn btnPrimary" href="/reports">
                View reports
              </a>
            </div>
          </header>

          <div className="content">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
