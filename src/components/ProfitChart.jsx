import React from "react";
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  { month: "Jan", profit: 12000, spend: 5000 },
  { month: "Feb", profit: 18000, spend: 8000 },
  { month: "Mar", profit: 15000, spend: 7000 },
  { month: "Apr", profit: 22000, spend: 9500 },
  { month: "May", profit: 19500, spend: 8500 },
];

export default function ProfitChart() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-2">Monthly Profit vs Spend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="profit" fill="#4ade80" name="Profit" />
          <Bar dataKey="spend" fill="#f87171" name="Spend" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
