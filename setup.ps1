# Run from project root D:\Personal\gold-loan-app
$ErrorActionPreference = "Stop"

Write-Host "Starting: create Sidebar component and patch pages..." -ForegroundColor Cyan

# Ensure src/components exists
$componentsDir = Join-Path $PSScriptRoot "src\components"
if (-not (Test-Path $componentsDir)) {
    New-Item -ItemType Directory -Path $componentsDir | Out-Null
    Write-Host "Created folder: $componentsDir"
}

# Create Sidebar.jsx
$sidebarPath = Join-Path $componentsDir "Sidebar.jsx"
$sidebarContent = @'
import React, { useState } from "react";

/**
 * Reusable Sidebar with expandable groups.
 * - Keeps full menu visible
 * - Menu groups can expand/collapse
 * - Uses Tailwind color classes (you can adjust)
 */
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
            aria-label="toggle"
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

      {/* Reports */}
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

      {/* Footer small links */}
      <div className="mt-6 text-xs text-slate-300">
        <div className="mb-1">v0.1</div>
        <div>Superadmin</div>
      </div>
    </aside>
  );
}
'@

Set-Content -Path $sidebarPath -Value $sidebarContent -Encoding UTF8
Write-Host "Sidebar.jsx written to $sidebarPath" -ForegroundColor Green

# Helper function to patch a page: backup, replace first <aside>..</aside> block and add import
function Patch-Page($pagePath, $sidebarImportLine, $sidebarJSX) {
    if (-not (Test-Path $pagePath)) {
        Write-Warning "Page not found: $pagePath — skipping."
        return
    }

    $backupPath = "$pagePath.backup"
    if (-not (Test-Path $backupPath)) {
        Copy-Item -Path $pagePath -Destination $backupPath -Force
        Write-Host "Backup created: $backupPath"
    } else {
        Write-Host "Backup already exists: $backupPath"
    }

    $content = Get-Content -Raw -Path $pagePath -Encoding UTF8

    # find first <aside ...> block and its closing </aside>
    $startIndex = $content.IndexOf("<aside")
    if ($startIndex -lt 0) {
        Write-Warning "No <aside> tag found in $pagePath — skipping aside replacement."
        # still ensure import present
        if ($content -notmatch [regex]::Escape($sidebarImportLine)) {
            # insert import after first import block or at top
            $lines = $content -split "`n"
            $inserted = $false
            for ($i=0; $i -lt $lines.Length; $i++) {
                if ($lines[$i] -match "^import ") {
                    # keep scanning until last import line
                    continue
                }
            }
            # simple prepend import
            $content = $sidebarImportLine + "`n" + $content
            Set-Content -Path $pagePath -Value $content -Encoding UTF8
            Write-Host "Added import to $pagePath"
        }
        return
    }

    $endIndex = $content.IndexOf("</aside>", $startIndex)
    if ($endIndex -lt 0) {
        Write-Warning "Found <aside> but no closing </aside> in $pagePath — skipping aside replacement."
        return
    }
    $endIndex = $endIndex + ("</aside>").Length

    $before = $content.Substring(0, $startIndex)
    $after = $content.Substring($endIndex)

    $newContent = $before + $sidebarJSX + $after

    # ensure import statement present
    if ($newContent -notmatch [regex]::Escape($sidebarImportLine)) {
        # attempt to insert after last import line
        $lines = $newContent -split "`n"
        $lastImportIndex = -1
        for ($i=0; $i -lt $lines.Length; $i++) {
            if ($lines[$i] -match "^\s*import\s") { $lastImportIndex = $i }
        }
        if ($lastImportIndex -ge 0) {
            $beforeImp = $lines[0..$lastImportIndex] -join "`n"
            $afterImp = $lines[($lastImportIndex+1)..($lines.Length-1)] -join "`n"
            $newContent = $beforeImp + "`n" + $sidebarImportLine + "`n" + $afterImp
        } else {
            # prepend
            $newContent = $sidebarImportLine + "`n" + $newContent
        }
    }

    Set-Content -Path $pagePath -Value $newContent -Encoding UTF8
    Write-Host "Patched $pagePath: replaced aside block and ensured import." -ForegroundColor Green
}

# Patch Dashboard.jsx
$dashboardPath = Join-Path $PSScriptRoot "src\pages\Dashboard.jsx"
$importLine = 'import Sidebar from "../components/Sidebar";'
$jsxReplaceDashboard = '<Sidebar initialActive="dashboard" />'
Patch-Page -pagePath $dashboardPath -sidebarImportLine $importLine -sidebarJSX $jsxReplaceDashboard

# Patch NewLoan.jsx
$newLoanPath = Join-Path $PSScriptRoot "src\pages\NewLoan.jsx"
$jsxReplaceNewLoan = '<Sidebar initialActive="pledge-new" />'
Patch-Page -pagePath $newLoanPath -sidebarImportLine $importLine -sidebarJSX $jsxReplaceNewLoan

Write-Host "Done. Please restart dev server if running: npm run dev" -ForegroundColor Cyan
