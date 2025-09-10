import React, { useState } from "react";
import Card from "../components/ui/Card";
import CardContent from "../components/ui/CardContent";
import ProfitChart from "../components/ProfitChart";
import VaultChart from "../components/VaultChart";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [active, setActive] = useState("dashboard");

  const menu = [
    { id: "dashboard", label: "Dashboard", href: "/" },
    { id: "pledge", label: "Pledge Entry", href: "/loan" },
    { id: "master", label: "Master", href: "/master" },
    { id: "search", label: "Search", href: "/search" },
    { id: "vault", label: "Vault", href: "/vault" },
    { id: "reports", label: "Reports", href: "/reports" },
    { id: "accounts", label: "Accounts", href: "/accounts" },
    { id: "options", label: "Options", href: "/options" }
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Side Menu */}
      <aside className="w-64 bg-slate-800 text-white p-6 flex-shrink-0 h-screen sticky top-0">
        <div className="rounded-2xl overflow-hidden">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Menu</h2>
          </div>

          <nav>
            <ul className="space-y-2 text-sm">
              {menu.map((m) => (
                <li key={m.id}>
                  <a
                    href={m.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setActive(m.id);
                      // update url and notify router
                      window.history.pushState({}, "", m.href);
                      window.dispatchEvent(new PopStateEvent("popstate"));
                    }}
                    className={
                      "block px-3 py-2 rounded-lg transition-colors " +
                      (active === m.id
                        ? "bg-slate-700 text-white font-semibold"
                        : "text-slate-200 hover:bg-slate-700 hover:text-white")
                    }
                  >
                    {m.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm bg-slate-100 px-3 py-1 rounded-lg border">
              Gold Rate Today: ₹ 5,200 /g
            </span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm shadow">
              Fetch Today's Rate
            </button>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <Card className="bg-blue-100 border-blue-300">
            <CardContent>
              <p className="text-sm">Cash in Hand</p>
              <p className="text-xl font-bold text-blue-800">₹ 1,25,000</p>
            </CardContent>
          </Card>

          <Card className="bg-yellow-100 border-yellow-300">
            <CardContent>
              <p className="text-sm">Gold in Shop Vault</p>
              <p className="text-xl font-bold text-yellow-800">420 g</p>
            </CardContent>
          </Card>

          <Card className="bg-orange-100 border-orange-300">
            <CardContent>
              <p className="text-sm">Gold in Bank Vault</p>
              <p className="text-xl font-bold text-orange-800">275 g</p>
            </CardContent>
          </Card>

          <Card className="bg-green-100 border-green-300">
            <CardContent>
              <p className="text-sm">Active Loans</p>
              <p className="text-xl font-bold text-green-800">42</p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-purple-100 border-purple-300">
            <CardContent>
              <p className="text-sm">Closed Loans</p>
              <p className="text-xl font-bold text-purple-800">118</p>
            </CardContent>
          </Card>

          <Card className="bg-red-100 border-red-300">
            <CardContent>
              <p className="text-sm">Pending for Payment</p>
              <p className="text-xl font-bold text-red-800">27</p>
            </CardContent>
          </Card>

          <Card className="bg-indigo-100 border-indigo-300">
            <CardContent>
              <p className="text-sm">Total Customers</p>
              <p className="text-xl font-bold text-indigo-800">320</p>
            </CardContent>
          </Card>

          <Card className="bg-pink-100 border-pink-300">
            <CardContent>
              <p className="text-sm">Today's Spend</p>
              <p className="text-xl font-bold text-pink-800">₹ 8,500</p>
            </CardContent>
          </Card>
        </div>

        {/* Profit & Vault Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <Card className="bg-green-200 border-green-400">
              <CardContent>
                <p className="text-sm">Profit for the Month</p>
                <p className="text-2xl font-bold text-green-900">₹ 65,200</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-white border">
              <CardContent>
                <p className="text-sm">Vault Snapshot</p>
                <p className="text-lg font-semibold">Shop: 420 g · Bank: 275 g</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section: two charts side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ProfitChart />
          <VaultChart />
        </div>

        {/* Alerts / Reminders */}
        <Card className="bg-slate-100 border-slate-300">
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Alerts</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>5 Loans due today (₹ 1,10,000)</li>
              <li>1 Bank repayment pending tomorrow</li>
              <li>Vault stock low on loose chains</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
