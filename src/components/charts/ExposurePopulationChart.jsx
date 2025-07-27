import React from "react";

// Percentages: Low (10.9%), Medium (26.6%), High (62.5%)
const data = [
  { label: "Low", value: 10.9, color: "bg-[#00b0f0]" },
  { label: "Medium", value: 26.6, color: "bg-[#465f91]" },
  { label: "High", value: 62.5, color: "bg-[#223863]" }
];

export default function ExposurePopulationChart() {
  return (
    <div className="max-w-xl mx-auto my-8">
      <h2 className="text-center font-semibold mb-8">
        Category Wise Population Falling in Exposure Index (in%)
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
