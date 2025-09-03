// VulnerablePopulationChart.jsx
import React from "react";

// const data = [
//   { label: "Low", value: 13.17, color: "bg-[#00b0f0]" },
//   { label: "Medium", value: 13.35, color: "bg-[#465f91]" },
//   { label: "High", value: 73.48, color: "bg-[#223863]" },
// ];

// export default function VulnerablePopulationChart() {
//   return (
//     <div className="max-w-xl mx-auto my-8">
//       <h2 className="text-center font-semibold mb-8">
//         Category wise Vulnerable Population (in %)
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
//                 {value}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


const data = [
  {
    label: 'Low',
    value: 13.17,
    gradientId: 'lowExposureGradient',
    gradientFrom: '#b6eaff',
    gradientTo: '#00bfff',
    patternId: 'patternLowExposure'
  },
  {
    label: 'Medium',
    value: 13.35,
    gradientId: 'mediumExposureGradient',
    gradientFrom: '#a9bcec',
    gradientTo: '#465f91',
    patternId: 'patternMedExposure'
  },
  {
    label: 'High',
    value: 73.48,
    gradientId: 'highExposureGradient',
    gradientFrom: '#d5c7f6',
    gradientTo: '#7d50c7',
    patternId: 'patternHighExposure'
  }
];

export default function VulnerablePopulationChart() {
  return (
    <div className="max-w-xs mx-auto my-0">
      <h2 className="text-center text-sm font-semibold mb-4">
        Category wise Vulnerable <br />
         Population (in %)
      </h2>
      <div className="flex justify-center items-end h-45 gap-2">
        {data.map(({ label, value, gradientId, patternId, gradientFrom, gradientTo }) => {
          const svgHeight = 130;
          const svgWidth = 40;
          const barHeight = (value * svgHeight) / 100;
          return (
            <div key={label} className="relative flex flex-col items-center">
              <svg width={svgWidth} height={svgHeight} className="block">
                <defs>
                  <pattern id={patternId} patternUnits="userSpaceOnUse" width="7" height="7" patternTransform="rotate(0)">
                    <rect x="0" y="0" width="2" height="7" fill="#f0f0f0" />
                  </pattern>
                  <linearGradient id={gradientId} x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor={gradientFrom} />
                    <stop offset="100%" stopColor={gradientTo} />
                  </linearGradient>
                </defs>
                {/* Lined background */}
                <rect
                  x="0"
                  y="0"
                  width={svgWidth}
                  height={svgHeight}
                  fill={`url(#${patternId})`}
                  rx="12"
                />
                {/* Colored Value Bar */}
                <rect
                  x="0"
                  y={svgHeight - barHeight}
                  width={svgWidth}
                  height={barHeight}
                  fill={`url(#${gradientId})`}
                  rx="12"
                />
              </svg>
              {/* Value Label */}
              <div
                style={{
                  position: 'absolute',
                  top: `${svgHeight - barHeight - 28}px`,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'white',
                  color: '#5e6acc',
                  fontWeight: 600,
                  borderRadius: '14px',
                  minWidth: '52px',
                  textAlign: 'center',
                  boxShadow: '0 2px 6px rgba(60,60,120,0.1)',
                  padding: '2px 10px',
                  fontSize: '1rem'
                }}
              >
                {value}
              </div>
              {/* Category Label */}
              <span className="mt-4 text-sm font-medium text-gray-700">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}