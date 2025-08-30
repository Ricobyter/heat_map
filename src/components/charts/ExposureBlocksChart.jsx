// import React from "react";

// const data = [
//   { label: "Low", value: 17.4, color: "bg-[#46b1e1]" },    // 4 of 23 blocks
//   { label: "Medium", value: 39.1, color: "bg-[#215f9a]" }, // 9 of 23 blocks
//   { label: "High", value: 43.5, color: "bg-[#104862]" }    // 10 of 23 blocks
// ];

// export default function ExposureBlocksChart() {
//   return (
//     <div className="max-w-xl mx-auto my-8 h-full">
//       <h2 className="text-center font-semibold mb-8">
//         Category Wise Blocks Exposure (in %)
//       </h2>
//       <div className="space-y-4">
//         {data.map(({ label, value, color }) => (
//           <div key={label} className="flex items-center">
//             <span className="w-16 mr-2 text-sm">{label}</span>
//             <div className="flex-1 bg-gray-100 rounded h-11 relative">
//               <div
//                 className={`h-11 rounded ${color}`}
//                 style={{ width: `${value}%` }}
//               ></div>
//               <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-medium">
//                 {value}% ({label === "Low" ? 4 : label === "Medium" ? 9 : 10})
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";

const data = [
  { label: "Low", value: 17.4, color: "#46b1e1", blocks: 4 },
  { label: "Medium", value: 39.1, color: "#465f91", blocks: 9 },
  { label: "High", value: 43.5, color: "#7d50c7", blocks: 10 },
];

export default function ExposureBlocksChart() {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (label) => {
    setHovered(label);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <div className="max-w-[230px] mx-auto my-8 h-full">
      <h2 className="text-center text-xs font-semibold mb-8">
        Category wise Block Exposure (in %)
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
                className="relative flex-1 h-8 rounded cursor-pointer"
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

                {/* Tooltip */}
                {hovered === label && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-40px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "white",
                      padding: "4px 8px",
                      borderRadius: "14px",
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
