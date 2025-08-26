// import React from "react";

// const data = [
//   { label: "Low", value: 5, color: "bg-sky-400" },
//   { label: "Medium", value: 4, color: "bg-blue-700" },
//   { label: "High", value: 14, color: "bg-blue-900" },
// ];

// const total = data.reduce((sum, d) => sum + d.value, 0);

// export default function VulnerableBlocksChart() {
//   return (
//     <div className="max-w-xl mx-auto my-8">
//       <h2 className="text-center font-semibold mb-8">
//         Category Wise Block Vulnerability (in %)
//       </h2>
//       <div className="space-y-4">
//         {data.map(({ label, value, color }) => {
//           const percent = ((value / total) * 100).toFixed(1);
//           return (
//             <div key={label} className="flex items-center">
//               <span className="w-16 mr-2 text-sm">{label}</span>
//               <div className="flex-1 bg-gray-100 rounded h-11 relative">
//                 <div
//                   className={`h-11 rounded ${color}`}
//                   style={{ width: `${percent}%` }}
//                 ></div>
//                 <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-medium">
//                   {percent}%
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";

const data = [
  { label: "Low", value: 5, color: "#46b1e1", blocks: 5 }, // bg-sky-400
  { label: "Medium", value: 4, color: "#465f91", blocks: 4 }, // bg-blue-700
  { label: "High", value: 14, color: "#7d50c7", blocks: 14 }, // bg-blue-900
];

const total = data.reduce((sum, d) => sum + d.value, 0);

export default function VulnerableBlocksChart() {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (label) => {
    setHovered(label);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <div className="max-w-[230px] mx-auto my-8 h-full">
      <h2 className="text-center text-xs font-semibold mb-6">
        Category Wise Block <br /> Vulnerability (in %)
      </h2>
      <div className="space-y-4">
        {data.map(({ label, value, color, blocks }) => {
          const percent = ((value / total) * 100).toFixed(1);
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
                }}
              >
                {/* Colored bar with white shine at start */}
                <div
                  className="h-full rounded relative overflow-hidden"
                  style={{
                    width: `${percent}%`,
                    backgroundColor: color,
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
                      borderRadius: "14px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      fontSize: "1rem",
                      fontWeight: "500",
                      color: "#5e6acc",
                      whiteSpace: "nowrap",
                      zIndex: 1000,
                    }}
                  >
                    {percent}%
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
