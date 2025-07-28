import React from "react";

const data = [
  { label: "Low", value: 11.1, color: "bg-[#00b0f0]" },    // Low exposure (light orange)
  { label: "Medium", value: 29.2, color: "bg-[#465f91]" }, // Medium exposure (yellow)
  { label: "High", value: 59.7, color: "bg-[#223863]" }    // High exposure (red)
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
