// src/components/Sidebar.jsx
import React, { useState } from "react";

export default function Sidebar({ initialActive = "dashboard" }) {
  const [active, setActive] = useState(initialActive);
  const [expanded, setExpanded] = useState({
    pledge: true,
    master: false,
    reports: false,
  });

  function toggleGroup(key) {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function navTo(href, id) {
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
    setActive(id);
  }

  const linkClasses = (id) =>
    "block px-3 py-2 rounded-lg transition-colors text-sm " +
    (active === id
      ? "bg-slate-700 text-white font-semibold"
      : "text-slate-200 hover:bg-slate-700 hover:text-white");

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4 flex-shrink-0 h-screen sticky top-0">
      <div className="mb-6">
        <div className="text-lg font-extrabold tracking-wide mb-1">Gold Shop</div>
        <div className="text-xs text-slate-300">Infossel</div>
      </div>

      {/* Dashboard link */}
      <div className="mb-3">
        <button onClick={() => navTo("/", "dashboard")} className={linkClasses("dashboard")}>
          🏠 Dashboard
        </button>
      </div>

      {/* Pledge Entry group */}
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => toggleGroup("pledge")}
            className="text-sm px-2 py-1 text-slate-200 hover:text-white"
          >
            Pledge Entry
          </button>
          <button
            onClick={() => toggleGroup("pledge")}
            className="text-sm px-2 py-1 text-slate-300 hover:text-white"
          >
            {expanded.pledge ? "▾" : "▸"}
          </button>
        </div>

        {expanded.pledge && (
          <div className="mt-2 space-y-1 pl-2">
            <button onClick={() => navTo("/loan", "pledge-new")} className={linkClasses("pledge-new")}>
              ➕ New Loan
            </button>
            <button onClick={() => navTo("/pledge/view", "pledge-view")} className={linkClasses("pledge-view")}>
              🔎 View Loans
            </button>
            <button onClick={() => navTo("/pledge/action", "pledge-action")} className={linkClasses("pledge-action")}>
              ⚡ Actioned List
            </button>
          </div>
        )}
      </div>

      {/* Master group */}
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <button onClick={() => toggleGroup("master")} className="text-sm px-2 py-1 text-slate-200 hover:text-white">
            Master
          </button>
          <button onClick={() => toggleGroup("master")} className="text-sm px-2 py-1 text-slate-300 hover:text-white">
            {expanded.master ? "▾" : "▸"}
          </button>
        </div>

        {expanded.master && (
          <div className="mt-2 space-y-1 pl-2">
            <button onClick={() => navTo("/master/scheme", "master-scheme")} className={linkClasses("master-scheme")}>
              🧾 Scheme
            </button>
            <button onClick={() => navTo("/master/goldtype", "master-goldtype")} className={linkClasses("master-goldtype")}>
              🟡 Gold Type
            </button>
            <button onClick={() => navTo("/master/area", "master-area")} className={linkClasses("master-area")}>
              📍 Area
            </button>
          </div>
        )}
      </div>

      {/* Vault */}
      <div className="mb-3">
        <button onClick={() => navTo("/vault", "vault")} className={linkClasses("vault")}>
          🏦 Vault
        </button>
      </div>

      {/* Reports group */}
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <button onClick={() => toggleGroup("reports")} className="text-sm px-2 py-1 text-slate-200 hover:text-white">
            Reports
          </button>
          <button onClick={() => toggleGroup("reports")} className="text-sm px-2 py-1 text-slate-300 hover:text-white">
            {expanded.reports ? "▾" : "▸"}
          </button>
        </div>

        {expanded.reports && (
          <div className="mt-2 space-y-1 pl-2">
            <button onClick={() => navTo("/reports/collection", "report-collection")} className={linkClasses("report-collection")}>
              📊 Collection
            </button>
            <button onClick={() => navTo("/reports/ledger", "report-ledger")} className={linkClasses("report-ledger")}>
              📁 Ledger
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 text-xs text-slate-300">
        <div className="mb-1">v0.1</div>
        <div>Superadmin</div>
      </div>
    </aside>
  );
}
