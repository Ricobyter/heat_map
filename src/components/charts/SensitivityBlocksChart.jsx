import React from "react";

const data = [
  { label: "Low", value: 0.0, color: "bg-[#46b1e1]" },       // 0 of 23 blocks
  { label: "Medium", value: 60.9, color: "bg-[#215f9a]" },  // 14 of 23 blocks
  { label: "High", value: 39.1, color: "bg-[#104862]" }     // 9 of 23 blocks
];

export default function SensitivityBlocksChart() {
  return (
    <div className="max-w-xl mx-auto my-8 h-full">
      <h2 className="text-center font-semibold mb-8">
        Category Wise Blocks Sensitivity (in %)
      </h2>
      <div className="space-y-4">
        {data.map(({ label, value, color }) => (
          <div key={label} className="flex items-center">
            <span className="w-16 mr-2 text-sm">{label}</span>
            <div className="flex-1 bg-gray-100 rounded h-11 relative">
              <div
                className={`h-11 rounded ${color}`}
                style={{ width: `${value}%` }}
              ></div>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-medium">
                {value}% ({label === "Low" ? 0 : label === "Medium" ? 14 : 9})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
