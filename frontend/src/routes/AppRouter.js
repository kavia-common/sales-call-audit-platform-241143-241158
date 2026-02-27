import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "../layout/AppShell";
import DashboardPage from "../pages/DashboardPage";
import CallsPage from "../pages/CallsPage";
import CallDetailPage from "../pages/CallDetailPage";
import CategoriesPage from "../pages/CategoriesPage";
import ReportsPage from "../pages/ReportsPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import SettingsPage from "../pages/SettingsPage";

// PUBLIC_INTERFACE
export default function AppRouter() {
  /** Application routes for the Call Audit Platform. */
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />

        <Route path="/calls" element={<CallsPage />} />
        <Route path="/calls/:callId" element={<CallDetailPage />} />

        <Route path="/categories/:categoryId" element={<CategoriesPage />} />
        <Route path="/categories" element={<Navigate to="/categories/sales-pitch" replace />} />

        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
