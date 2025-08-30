import React, { useState } from 'react';

const data = [
  { label: 'Low', value: 21.7, color: '#46b1e1', blocks: 5 },
  { label: 'Medium', value: 52.2, color: '#465f91', blocks: 12 },
  { label: 'High', value: 26.1, color: '#7d50c7', blocks: 6 }
];

export default function AdaptiveCapacityBlocksChart() {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (label) => {
    console.log('Hovering:', label);
    setHovered(label);
  };

  const handleMouseLeave = () => {
    console.log('Mouse left');
    setHovered(null);
  };

  return (
    <div className="max-w-[230px] mx-auto my-8 h-full">
      <h2 className="text-center text-xs font-semibold mb-4">
        Category Wise Blocks Adaptive Capacity (in %)
      </h2>
      <div className="space-y-4">
        {data.map(({ label, value, color, blocks }) => {
          const lightColor = color + '40';
          
          return (
            <div key={label} className="flex items-center relative">
              <span className="w-16 mr-2 text-sm font-semibold text-gray-600">{label}</span>
              <div
                className="relative flex-1 h-8 rounded cursor-pointer"
                onMouseEnter={() => handleMouseEnter(label)}
                onMouseLeave={handleMouseLeave}
                style={{
                  background: `repeating-linear-gradient(0deg, ${lightColor} 0px, ${lightColor} 2px, transparent 2px, transparent 4px)`,
                  borderRadius: "12px",
                }}
              >
                {/* Colored bar */}
                <div
                  className="h-full rounded"
                  style={{
                    width: `${value}%`,
                    backgroundColor: color,
                    background: `${color}, linear-gradient(to right, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 30%)`,
                    borderRadius: "12px",
                  }}
                ></div>

                {/* Tooltip */}
                {hovered === label && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '-40px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'white',
                      padding: '4px 8px',
                      borderRadius: '14px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: '1rem',
                      fontWeight: '500',
                      color: '#5e6acc',
                      whiteSpace: 'nowrap',
                      zIndex: 1000
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



