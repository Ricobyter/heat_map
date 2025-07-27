import React from "react";

const data = [
  { label: "Low", value: 5, color: "bg-sky-400" },
  { label: "Medium", value: 4, color: "bg-blue-700" },
  { label: "High", value: 14, color: "bg-blue-900" },
];

const total = data.reduce((sum, d) => sum + d.value, 0);

export default function VulnerableBlocksChart() {
  return (
    <div className="max-w-xl mx-auto my-8">
      <h2 className="text-center font-semibold mb-8">
        Category Wise Block Vulnerability (in %)
      </h2>
      <div className="space-y-4">
        {data.map(({ label, value, color }) => {
          const percent = ((value / total) * 100).toFixed(1);
          return (
            <div key={label} className="flex items-center">
              <span className="w-16 mr-2 text-sm">{label}</span>
              <div className="flex-1 bg-gray-100 rounded h-11 relative">
                <div
                  className={`h-11 rounded ${color}`}
                  style={{ width: `${percent}%` }}
                ></div>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-medium">
                  {percent}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
