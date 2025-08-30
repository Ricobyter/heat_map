
import React, { useState } from "react";

const data = [
  { label: "Low", value: 0.0, color: "#46b1e1", blocks: 0 },
  { label: "Medium", value: 60.9, color: "#465f91", blocks: 14 },
  { label: "High", value: 39.1, color: "#7d50c7", blocks: 9 },
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
    <div className="max-w-[230px] mx-auto my-8 h-full">
      <h2 className="text-center text-xs font-semibold mb-4">
        Category Wise Blocks Sensitivity (in %)
      </h2>
      <div className="space-y-4">
        {data.map(({ label, value, color, blocks }) => {
          const lightColor = color + "40";

          return (
            <div key={label} className="flex items-center relative">
              <span className="w-16 mr-2 text-sm font-semibold text-gray-600">
                {label}
              </span>
              <div
                className="relative flex-1 h-8 rounded-lg cursor-pointer"
                onMouseEnter={() => handleMouseEnter(label)}
                onMouseLeave={handleMouseLeave}
                style={{
                  background: `repeating-linear-gradient(0deg, ${lightColor} 0px, ${lightColor} 2px, transparent 2px, transparent 4px)`,
                  borderRadius: "12px",
                }}
              >
                {/* Colored bar with white shine at start */}
                <div
                  className="h-full rounded relative overflow-hidden"
                  style={{
                    width: `${value}%`,
                    backgroundColor: color,
                    borderRadius: "12px",
                  }}
                >
                  {/* White gradient shine only at start */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "80%",
                      height: "100%",
                      background:
                        "linear-gradient(to right, rgba(255,255,255,0.6), rgba(255,255,255,0))",
                      pointerEvents: "none",
                    }}
                  ></div>
                </div>

                {/* Hover tooltip */}
                {hovered === label && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-40px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "white",
                      padding: "4px 8px",
                      borderRadius: "16px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      fontSize: "1rem",
                      fontWeight: "500",
                      color: "#5e6acc",
                      whiteSpace: "nowrap",
                      zIndex: 1000,
                    }}
                  >
                    {value}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
