import React, { useState } from 'react';

const districtData = {
  Low: [
    "Khusrupur",
    "Danapur",
    "Maner"
  ],
  Medium: [
    "Patna Sadar",
    "Phulwari Sharif",
    "Fatwah",
    "Daniyawan",
    "Athmalgola",
    "Mokama",
    "Belchhi",
    "Ghoswari",
    "Bakhtiyarpur",
    "Barh",
    "Punpun",
    "Dhanarua",
    "Naubatpur",
    "Paliganj"
  ],
  High: [
    "Sampatchak",
    "Pandarak",
    "Masaurhi",
    "Bihta",
    "Dulhin Bazar",
    "Bikram"
  ]
};

const data = [
  { 
    label: 'Low', 
    value: 13.0, 
    color: '#46b1e1', 
    blocks: 3,
    gradientFrom: '#b6eaff',
    gradientTo: '#00bfff'
  },
  { 
    label: 'Medium', 
    value: 60.9, 
    color: '#465f91', 
    blocks: 14,
    gradientFrom: '#a9bcec',
    gradientTo: '#465f91'
  },
  { 
    label: 'High', 
    value: 26.1, 
    color: '#7d50c7', 
    blocks: 6,
    gradientFrom: '#d5c7f6',
    gradientTo: '#7d50c7'
  }
];

export default function AdaptiveCapacityBlocksChart() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleMouseEnter = (label) => {
    setHoveredCategory(label);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div className="max-w-[280px] mx-auto my-8 h-full">
      <h2 className="text-center text-sm font-semibold mb-6 text-gray-700">
        Category wise Block<br />Adaptive capacity (in %)
      </h2>
      <div className="space-y-4">
        {data.map(({ label, value, color, blocks, gradientFrom, gradientTo }) => {
          const lightColor = color + '30';
          const isHovered = hoveredCategory === label;
          const districts = districtData[label] || [];
          const gradientId = `gradient-${label}-adaptive-capacity`;
          
          return (
            <div key={label} className="relative">
              {/* Main bar section */}
              <div className="flex items-center relative">
                <span className="w-16 mr-3 text-sm font-medium text-gray-600">
                  {label}
                </span>
                <div className="relative flex-1">
                  <div
                    className="relative h-8 rounded cursor-pointer transition-all duration-200"
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
                        width={`${value}%`}
                        height="100%"
                        fill={`url(#${gradientId})`}
                        rx="12"
                      />
                    </svg>
                    
                    {/* Percentage text positioned at the end of the bar */}
                    <span 
                      className="absolute top-0 h-full flex items-center text-xs font-semibold bg-white px-2 py-0.5 rounded-lg shadow-sm"
                      style={{
                        left: `${value}%`,
                        marginLeft: '8px',
                        color: color
                      }}
                    >
                      {value}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Districts tooltip on hover */}
              {isHovered && (
                <div 
                  className="absolute z-50 mt-2 p-3 bg-white rounded-lg shadow-lg border animate-fade-in"
                  style={{ 
                    left: '20px',
                    minWidth: '240px',
                    borderTop: `3px solid ${color}`
                  }}
                >
                  <div className="text-xs font-semibold text-gray-700 mb-2">
                    {label} Blocks ({districts.length}):
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {districts.map((district, index) => (
                      <div
                        key={index}
                        className="text-xs text-gray-600 px-2 py-1 bg-gray-50 rounded hover:bg-blue-50 transition-colors cursor-pointer"
                        onClick={() => {
                          console.log('District selected:', district);
                          // Add your district selection logic here
                        }}
                      >
                        {district}
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
