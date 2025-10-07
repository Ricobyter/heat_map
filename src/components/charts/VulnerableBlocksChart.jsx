import React, { useState } from "react";

const districtData = {
  Low: [
    "Sampatchak",
    "Ghoswari",
    "Pandarak",
    "Masaurhi",
    "Dulhin Bazar",
    "Bikram"
  ],
  Medium: [
    "Fatwah",
    "Punpun",
    "Bihta"
  ],
  High: [
    "Patna Sadar",
    "Phulwari Sharif",
    "Daniyawan",
    "Khusrupur",
    "Athmalgola",
    "Mokama",
    "Belchhi",
    "Bakhtiyarpur",
    "Barh",
    "Dhanarua",
    "Danapur",
    "Maner",
    "Naubatpur",
    "Paliganj"
  ]
};

const data = [
  { 
    label: "Low", 
    value: 26.1, 
    color: "#46b1e1", 
    blocks: 6,
    gradientFrom: "#b6eaff",
    gradientTo: "#00bfff"
  },
  { 
    label: "Medium", 
    value: 13.0, 
    color: "#465f91", 
    blocks: 3,
    gradientFrom: "#a9bcec",
    gradientTo: "#465f91"
  },
  { 
    label: "High", 
    value: 60.9, 
    color: "#7d50c7", 
    blocks: 14,
    gradientFrom: "#d5c7f6",
    gradientTo: "#7d50c7"
  },
];

const total = data.reduce((sum, d) => sum + d.value, 0);

export default function VulnerableBlocksChart() {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (label) => setHovered(label);
  const handleMouseLeave = () => setHovered(null);

  return (
    <div className="max-w-[280px] mx-auto my-8">
      <h2 className="text-center text-sm font-semibold mb-4">
        Category Wise Block<br />Vulnerability 
      </h2>
      <div className="space-y-4">
        {data.map(({ label, value, color, gradientFrom, gradientTo }) => {
          const percent = ((value / total) * 100).toFixed(1);
          const lightColor = color + "30";
          const isHovered = hovered === label;
          const districts = districtData[label] || [];
          const gradientId = `gradient-${label}-vulnerability`;

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
                  {/* SVG for gradient bar */}
                  <svg 
                    width="100%" 
                    height="100%" 
                    className="absolute top-0 left-0"
                    style={{ borderRadius: "12px" }}
                  >
                    <defs>
                      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={gradientFrom} />
                        <stop offset="100%" stopColor={gradientTo} />
                      </linearGradient>
                    </defs>
                    <rect
                      x="0"
                      y="0"
                      width={`${percent}%`}
                      height="100%"
                      fill={`url(#${gradientId})`}
                      rx="12"
                    />
                  </svg>

                  {/* Percentage label at bar end */}
                  <span
                    className="absolute top-0 h-full flex items-center text-xs px-2 py-0.5 font-semibold bg-white rounded-lg shadow-sm"
                    style={{
                      left: `${percent}%`,
                      marginLeft: "8px",
                      color,
                    }}
                  >
                    {percent}%
                  </span>
                </div>
              </div>

              {/* Tooltip with districts */}
              {isHovered && (
                <div
                  className="absolute z-50 mt-1 p-1 bg-white rounded-lg shadow-lg border animate-fade-in"
                  style={{
                    left: "20px",
                    minWidth: "240px",
                    borderTop: `3px solid ${color}`,
                  }}
                >
                  <div className="text-xs font-semibold text-gray-700 mb-2">
                    {label} Blocks ({districts.length})
                  </div>
                  <div className="grid grid-cols-3 gap-0.5">
                    {districts.map((d, i) => (
                      <div
                        key={i}
                        className="text-xs text-gray-600 px-1 py-1 bg-gray-50 rounded hover:bg-blue-50 transition-colors cursor-pointer"
                        onClick={() => {
                          console.log("District selected:", d);
                          // add your district-click logic
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
