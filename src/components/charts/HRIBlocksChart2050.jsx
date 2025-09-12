import React, { useState } from "react";

const districtData = {
  Moderate: [
    "Athmalgola",
    "Belchhi", 
    "Ghoswari",
    "Pandarak",
    "Dhanarua",
    "Paliganj",
    "Dulhin Bazar"
  ],
  High: [
    "Sampatchak",
    "Fatwah",
    "Daniyawan", 
    "Khusrupur",
    "Barh",
    "Mokama",
    "Bakhtiyarpur",
    "Bikram",
    "Masaurhi",
    "Punpun",
    "Maner",
    "Naubatpur"
  ],
  "Very High": [
    "Patna Sadar",
    "Phulwari Sharif",
    "Bihta",
    "Danapur"
  ]
};

const data = [
  { 
    label: "Moderate", 
    value: 30.4, 
    color: "#46b1e1",
    gradientFrom: "#b6eaff",
    gradientTo: "#00bfff"
  },
  { 
    label: "High", 
    value: 52.2, 
    color: "#465f91",
    gradientFrom: "#a9bcec",
    gradientTo: "#465f91"
  },
  { 
    label: "Very High", 
    value: 17.4, 
    color: "#7d50c7",
    gradientFrom: "#d5c7f6",
    gradientTo: "#7d50c7"
  },
];

export default function HRIBlocksChart2050() {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (label) => setHovered(label);
  const handleMouseLeave = () => setHovered(null);

  return (
    <div className="max-w-[280px] mx-auto my-8">
      <h2 className="text-center text-sm font-semibold mb-6 text-gray-700">
        Category Wise Block<br />HRI Baseline 2050 (in %)
      </h2>
      <div className="space-y-4">
        {data.map(({ label, value, color, gradientFrom, gradientTo }) => {
          const percent = value.toFixed(1);
          const lightColor = color + "30";
          const isHovered = hovered === label;
          const districts = districtData[label] || [];
          const gradientId = `gradient-${label}-hri2050-horizontal`;

          return (
            <div key={label} className="relative">
              <div className="flex items-center">
                <span className="w-20 mr-3 text-sm font-medium text-gray-600">
                  {label}
                </span>
                <div
                  className="relative flex-1 h-8 rounded-lg cursor-pointer transition-all duration-200"
                  onMouseEnter={() => handleMouseEnter(label)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    background: `repeating-linear-gradient(0deg, ${lightColor} 0, ${lightColor} 2px, transparent 2px, transparent 4px)`,
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

                  {/* Percentage label just past bar end */}
                  <span
                    className="absolute top-0 h-full flex items-center text-xs font-semibold px-2 py-0.5 bg-white rounded-lg shadow-sm"
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
                    {label} Blocks ({districts.length})
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {districts.map((d, i) => (
                      <div
                        key={i}
                        className="text-xs text-gray-600 px-2 py-1 bg-gray-50 rounded hover:bg-blue-50 transition-colors cursor-pointer"
                        onClick={() => {
                          console.log("District selected:", d);
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
