import React, { useState } from 'react';

const districtData = {
  Low: ['Maner', 'Khusrupur', 'Ghoswari', 'Bakhtiyarpur'],
  Medium: [
    'Naubatpur', 'Barh', 'Athmalgola', 'Belchhi', 'Pandarak', 'Fatwah', 'Paliganj',
    'Mokama', 'Patna Sadar', 'Daniyawan', 'Danapur', 'Phulwari Sharif'
  ],
  High: [
    'Dhanarua', 'Masaurhi', 'Bihta', 'Sampatchak', 'Punpun', 'Bikram', 'Dulhin Bazar'
  ]
};

const data = [
  { label: 'Low', value: 21.7, color: '#46b1e1', blocks: 5 },
  { label: 'Medium', value: 52.2, color: '#465f91', blocks: 12 },
  { label: 'High', value: 26.1, color: '#7d50c7', blocks: 6 }
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
        Category wise Block<br />Vulnerability (in %)
      </h2>
      <div className="space-y-6">
        {data.map(({ label, value, color, blocks }) => {
          const lightColor = color + '30';
          const isHovered = hoveredCategory === label;
          const districts = districtData[label] || [];
          
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
                    {/* Colored bar */}
                    <div
                      className="h-full rounded relative"
                      style={{
                        width: `${value}%`,
                        backgroundColor: color,
                        borderRadius: "12px",
                      }}
                    />
                    
                    {/* Percentage text positioned at the end of the bar */}
                    <span 
                      className="absolute top-0 h-full flex items-center text-xs font-semibold bg-white px-2 py-0.5 rounded-lg"
                      style={{
                        left: `${value}%`,
                        marginLeft: '8px',
                        color: color
                      }}
                    >
                      {value}
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
                    {label} Category Districts ({districts.length}):
                  </div>
                  <div className="grid grid-cols-2 gap-1">
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
