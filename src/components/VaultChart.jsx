import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Shop Vault", value: 420 },
  { name: "Bank Vault", value: 275 },
  { name: "In Transit / Other", value: 45 }
];

const COLORS = ["#FBBF24", "#FB923C", "#60A5FA"];

export default function VaultChart() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-2">Vault Distribution (grams)</h3>

      {/* responsive container with fixed height ensures correct rendering */}
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <PieChart>
            {/* Pie centered left to make space for legend on the right */}
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="40%"
              cy="50%"
              innerRadius={"50%"}
              outerRadius={"75%"}
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
              // disable label to avoid overlapping inside the donut
              label={false}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => `${value} g`}
              contentStyle={{ fontSize: 13 }}
            />

            {/* Legend placed to the right, vertical, smaller font */}
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              iconType="square"
              wrapperStyle={{ paddingLeft: 16, fontSize: 13 }}
              formatter={(value) => (
                <span style={{ fontSize: 13, color: "#334155" }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* numeric summary (below chart) */}
      <div className="mt-3 text-sm text-slate-600 space-y-1">
        <div><strong>Shop Vault:</strong> 420 g</div>
        <div><strong>Bank Vault:</strong> 275 g</div>
        <div><strong>Other:</strong> 45 g</div>
      </div>

      {/* small style tweak so legend text doesn't wrap oddly on narrow screens */}
      <style jsx>{`
        @media (max-width: 768px) {
          .recharts-legend-wrapper {
            display: flex !important;
            justify-content: center !important;
            padding-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
