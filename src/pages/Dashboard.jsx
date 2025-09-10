// src/pages/Dashboard.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/ui/Card";
import CardContent from "../components/ui/CardContent";
import ProfitChart from "../components/ProfitChart";
import VaultChart from "../components/VaultChart";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar initialActive="dashboard" />

      <main className="flex-1 p-6 overflow-auto">
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

        {/* Summary cards */}
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

        {/* More summary cards */}
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

        {/* Profit + Vault */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="bg-green-200 border-green-400">
            <CardContent>
              <p className="text-sm">Profit for the Month</p>
              <p className="text-2xl font-bold text-green-900">₹ 65,200</p>
            </CardContent>
          </Card>
          <Card className="bg-white border">
            <CardContent>
              <p className="text-sm">Vault Snapshot</p>
              <p className="text-lg font-semibold">Shop: 420 g · Bank: 275 g</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ProfitChart />
          <VaultChart />
        </div>

        {/* Alerts */}
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
