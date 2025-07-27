import React from "react";

// Percentages: Low (0.0%), Medium (71.2%), High (28.8%)
const data = [
  { label: "Low", value: 0.0, color: "bg-[#00b0f0]" },
  { label: "Medium", value: 71.2, color: "bg-[#465f91]" },
  { label: "High", value: 28.8, color: "bg-[#223863]" }
];

export default function SensitivityPopulationChart() {
  return (
    <div className="max-w-xl mx-auto my-8">
      <h2 className="text-center font-semibold mb-8">
        Category Wise Population Falling in Sensitivity Index (in%)
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
                {value}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
