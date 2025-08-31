import React, { useState } from "react";

const districtData = {
  Low: [],
  Medium: [
    "Dhanarua",
    "Naubatpur",
    "Masaurhi",
    "Fatwah",
    "Bihta",
    "Sampatchak",
    "Punpun",
    "Paliganj",
    "Bikram",
    "Dulhin Bazar",
    "Phulwari Sharif",
    "Maner",
    "Danapur",
  ],
  High: [
    "Pandarak",
    "Barh",
    "Athmalgola",
    "Belchhi",
    "Bakhtiyarpur",
    "Mokama",
    "Patna Sadar",
    "Daniyawan",
    "Khusrupur",
    "Ghoswari",
  ],
};

const data = [
  { label: "Low", value: 0.0, color: "#46b1e1", blocks: 0 },
  { label: "Medium", value: 60.9, color: "#465f91", blocks: 13 },
  { label: "High", value: 39.1, color: "#7d50c7", blocks: 10 },
];

export default function SensitivityBlocksChart() {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (label) => {
    setHovered(label);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <div className="max-w-[280px] mx-auto my-8 h-full">
      <h2 className="text-center text-xs font-semibold mb-6 text-gray-700">
        Category Wise Block <br />Sensitivity (in %)
      </h2>
      <div className="space-y-4">
        {data.map(({ label, value, color }) => {
          const lightColor = color + "30";
          const isHovered = hovered === label;
          const districts = districtData[label] || [];

          return (
            <div key={label} className="relative">
              <div className="flex items-center">
                <span className="w-16 mr-3 text-sm font-medium text-gray-600">
                  {label}
                </span>
                <div
                  className="relative flex-1 h-8 rounded-lg cursor-pointer transition-all duration-200"
                  onMouseEnter={() => handleMouseEnter(label)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    background: `repeating-linear-gradient(0deg, ${lightColor} 0px, ${lightColor} 2px, transparent 2px, transparent 4px)`,
                    borderRadius: "12px",
                  }}
                >
                  {/* Filled bar */}
                  <div
                    className="h-full rounded-lg"
                    style={{
                      width: `${value}%`,
                      backgroundColor: color,
                      borderRadius: "12px",
                    }}
                  />

                  {/* Percentage label just past bar end */}
                  <span
                    className="absolute top-0 h-full flex items-center text-xs font-semibold px-3 py-0.5 bg-white rounded-lg"
                    style={{
                      left: `${value}%`,
                      marginLeft: "8px",
                      color: color,
                    }}
                  >
                    {value}%
                  </span>
                </div>
              </div>

              {/* Tooltip with district list on hover */}
              {isHovered && (
                <div
                  className="absolute z-50 mt-2 p-3 bg-white rounded-lg shadow-lg border animate-fade-in"
                  style={{
                    left: "20px",
                    minWidth: "240px",
                    borderTop: `3px solid ${color}`,
                  }}
                >
                  <div className="text-xs font-semibold text-gray-700 mb-2">
                    {label} Districts ({districts.length})
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {districts.map((d, i) => (
                      <div
                        key={i}
                        className="text-xs text-gray-600 px-2 py-1 bg-gray-50 rounded hover:bg-blue-50 transition-colors cursor-pointer"
                        onClick={() => {
                          console.log("District selected:", d);
                          // Add your district-click logic here
                        }}
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
