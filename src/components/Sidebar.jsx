// src/components/Sidebar.jsx
import React, { useState } from "react";

/**
 * Sidebar (full)
 * - Always visible (sticky full height)
 * - Expandable groups
 * - navTo pushes history so simple SPA navigation works
 *
 * Usage: <Sidebar initialActive="dashboard" />
 */

export default function Sidebar({ initialActive = "dashboard" }) {
  const [active, setActive] = useState(initialActive);
  const [expanded, setExpanded] = useState({
    pledge: true,
    master: true,
    pending: false,
    reports: true,
    accounts: false,
    options: false,
  });

  function toggleGroup(key) {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function navTo(href, id) {
    try {
      window.history.pushState({}, "", href);
      window.dispatchEvent(new PopStateEvent("popstate"));
    } catch (e) {
      // ignore in older browsers
    }
    setActive(id);
  }

  const linkBase =
    "block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors";
  const linkActive = "bg-slate-700 text-white font-semibold";
  const linkInactive = "text-slate-200 hover:bg-slate-700 hover:text-white";

  return (
    <aside
      className="w-64 min-w-[220px] bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4 flex-shrink-0 h-screen sticky top-0 overflow-auto"
      aria-label="Main sidebar"
    >
      <div className="mb-6">
        <div className="text-lg font-extrabold tracking-wide mb-1">Gold Shop</div>
        <div className="text-xs text-slate-300">Infossel Gold Finance</div>
      </div>

      <nav className="space-y-3">
        <div>
          <button
            onClick={() => navTo("/", "dashboard")}
            className={`${linkBase} ${active === "dashboard" ? linkActive : linkInactive}`}
          >
            🏠 Dashboard
          </button>
        </div>

        {/* Pledge Entry */}
        <div>
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
              aria-label="expand pledge"
            >
              {expanded.pledge ? "▾" : "▸"}
            </button>
          </div>

          {expanded.pledge && (
            <div className="mt-2 space-y-1 pl-2">
              <button onClick={() => navTo("/loan", "pledge-new")} className={`${linkBase} ${active === "pledge-new" ? linkActive : linkInactive}`}>
                ➕ New Loan
              </button>
              <button onClick={() => navTo("/pledge/view", "pledge-view")} className={`${linkBase} ${active === "pledge-view" ? linkActive : linkInactive}`}>
                🔎 View Loans
              </button>
              <button onClick={() => navTo("/pledge/bank", "pledge-bank")} className={`${linkBase} ${active === "pledge-bank" ? linkActive : linkInactive}`}>
                🏦 Bank Loans
              </button>
              <button onClick={() => navTo("/pledge/action", "pledge-action")} className={`${linkBase} ${active === "pledge-action" ? linkActive : linkInactive}`}>
                ⚡ Actioned List
              </button>
            </div>
          )}
        </div>

        {/* Master */}
        <div>
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
              <button onClick={() => navTo("/master/scheme", "master-scheme")} className={`${linkBase} ${active === "master-scheme" ? linkActive : linkInactive}`}>🧾 Scheme</button>
              <button onClick={() => navTo("/master/goldtype", "master-goldtype")} className={`${linkBase} ${active === "master-goldtype" ? linkActive : linkInactive}`}>🟡 Gold Type</button>
              <button onClick={() => navTo("/master/area", "master-area")} className={`${linkBase} ${active === "master-area" ? linkActive : linkInactive}`}>📍 Area</button>
              <button onClick={() => navTo("/master/id", "master-id")} className={`${linkBase} ${active === "master-id" ? linkActive : linkInactive}`}>🆔 Govt ID</button>
            </div>
          )}
        </div>

        {/* Pending */}
        <div>
          <button onClick={() => navTo("/pending", "pending-list")} className={`${linkBase} ${active === "pending-list" ? linkActive : linkInactive}`}>
            ⏳ Pending List
          </button>
        </div>

        {/* Vault */}
        <div>
          <button onClick={() => navTo("/vault", "vault")} className={`${linkBase} ${active === "vault" ? linkActive : linkInactive}`}>
            🏦 Vault
          </button>
        </div>

        {/* Reports */}
        <div>
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
              <button onClick={() => navTo("/reports/collection", "report-collection")} className={`${linkBase} ${active === "report-collection" ? linkActive : linkInactive}`}>📊 Collection</button>
              <button onClick={() => navTo("/reports/ledger", "report-ledger")} className={`${linkBase} ${active === "report-ledger" ? linkActive : linkInactive}`}>📁 Ledger</button>
              <button onClick={() => navTo("/reports/party", "report-party")} className={`${linkBase} ${active === "report-party" ? linkActive : linkInactive}`}>👥 Party Summary</button>
            </div>
          )}
        </div>

        {/* Accounts */}
        <div>
          <div className="flex items-center justify-between">
            <button onClick={() => toggleGroup("accounts")} className="text-sm px-2 py-1 text-slate-200 hover:text-white">Accounts</button>
            <button onClick={() => toggleGroup("accounts")} className="text-sm px-2 py-1 text-slate-300 hover:text-white">{expanded.accounts ? "▾" : "▸"}</button>
          </div>

          {expanded.accounts && (
            <div className="mt-2 space-y-1 pl-2">
              <button onClick={() => navTo("/accounts/daybook", "acc-daybook")} className={`${linkBase} ${active === "acc-daybook" ? linkActive : linkInactive}`}>📔 Day Book</button>
              <button onClick={() => navTo("/accounts/statement", "acc-statement")} className={`${linkBase} ${active === "acc-statement" ? linkActive : linkInactive}`}>📄 Statement</button>
            </div>
          )}
        </div>

        {/* Options */}
        <div>
          <div className="flex items-center justify-between">
            <button onClick={() => toggleGroup("options")} className="text-sm px-2 py-1 text-slate-200 hover:text-white">Options</button>
            <button onClick={() => toggleGroup("options")} className="text-sm px-2 py-1 text-slate-300 hover:text-white">{expanded.options ? "▾" : "▸"}</button>
          </div>

          {expanded.options && (
            <div className="mt-2 space-y-1 pl-2">
              <button onClick={() => navTo("/options/settings", "opt-settings")} className={`${linkBase} ${active === "opt-settings" ? linkActive : linkInactive}`}>⚙️ Settings</button>
            </div>
          )}
        </div>
      </nav>

      <div className="mt-6 text-xs text-slate-300">
        <div className="mb-1">v0.1</div>
        <div>Superadmin</div>
      </div>
    </aside>
  );
}
