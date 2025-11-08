import React, { useState } from "react";

const districtData = {
  Low: ['Masaurhi', 'Pandarak', 'Ghoswari', 'Bikram'],
  Medium: [
    'Maner','Barh','Athmalgola','Khusrupur','Fatwah',
    'Sampatchak','Punpun','Dulhin Bazar','Danapur'
  ],
  High: [
    'Dhanarua','Naubatpur','Belchhi','Bihta','Paliganj',
    'Bakhtiyarpur','Mokama','Patna Sadar','Daniyawan',
    'Phulwari Sharif'
  ]
};

const populationData = {
  "Dhanarua": 257073,
  "Naubatpur": 255374,
  "Masaurhi": 306870,
  "Maner": 338423,
  "Pandarak": 191225,
  "Barh": 276355,
  "Athmalgola": 112505,
  "Belchhi": 81837,
  "Khusrupur": 137680,
  "Fatwah": 252175,
  "Ghoswari": 92636,
  "Bihta": 331329,
  "Sampatchak": 132170,
  "Punpun": 170854,
  "Paliganj": 316779,
  "Bikram": 212863,
  "Dulhin Bazar": 154557,
  "Bakhtiyarpur": 288061,
  "Mokama": 259696,
  "Patna Sadar": 2431371,
  "Daniyawan": 92867,
  "Danapur": 529556,
  "Phulwari Sharif": 353269
};

export default function ExposurePopulationChart() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Calculate population percentages dynamically
  const calculatePopulationPercentages = () => {
    const totalPopulation = Object.values(populationData).reduce((sum, pop) => sum + pop, 0);
    
    const categoryPopulations = {};
    Object.keys(districtData).forEach(category => {
      categoryPopulations[category] = districtData[category].reduce((sum, block) => {
        return sum + (populationData[block] || 0);
      }, 0);
    });
    
    return Object.keys(categoryPopulations).map(category => ({
      category,
      percentage: parseFloat(((categoryPopulations[category] / totalPopulation) * 100).toFixed(1))
    }));
  };

  const exposureData = [
    {
      label: 'Low',
      value: calculatePopulationPercentages().find(item => item.category === 'Low')?.percentage || 0,
      gradientId: 'lowExposureGradient',
      gradientFrom: '#b6eaff',
      gradientTo: '#00bfff',
      color: '#46b1e1'
    },
    {
      label: 'Medium',
      value: calculatePopulationPercentages().find(item => item.category === 'Medium')?.percentage || 0,
      gradientId: 'mediumExposureGradient',
      gradientFrom: '#a9bcec',
      gradientTo: '#465f91',
      color: '#465f91'
    },
    {
      label: 'High',
      value: calculatePopulationPercentages().find(item => item.category === 'High')?.percentage || 0,
      gradientId: 'highExposureGradient',
      gradientFrom: '#d5c7f6',
      gradientTo: '#7d50c7',
      color: '#7d50c7'
    }
  ];

  const handleMouseEnter = (category) => {
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  const handleDistrictClick = (district) => {
    console.log("District selected:", district);
    // Add your district-click logic here
  };

  return (
    <div className="max-w-xs mx-auto my-0 relative">
      <h2 className="text-center text-sm font-semibold mb-4">
        Category wise Exposed<br />Population 
      </h2>
      <div className="flex justify-center items-end h-45 gap-2">
        {exposureData.map(({ label, value, gradientId, gradientFrom, gradientTo, color }) => {
          const svgHeight = 130;
          const svgWidth = 40;
          const barHeight = (value * svgHeight) / 100;
          const isHovered = hoveredCategory === label;
          const districts = districtData[label] || [];
          const lightColor = color + "30";
          
          return (
            <div 
              key={label} 
              className="relative flex flex-col items-center cursor-pointer"
              onMouseEnter={() => handleMouseEnter(label)}
              onMouseLeave={handleMouseLeave}
            >
              <svg width={svgWidth} height={svgHeight} className="block">
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor={gradientFrom} />
                    <stop offset="100%" stopColor={gradientTo} />
                  </linearGradient>
                  <pattern 
                    id={`lines-${label}-exposure`} 
                    patternUnits="userSpaceOnUse" 
                    width="4" 
                    height="4"
                  >
                    <rect x="0" y="0" width="2" height="4" fill={lightColor} />
                  </pattern>
                </defs>
                {/* Background with striped lines */}
                <rect
                  x="0"
                  y="0"
                  width={svgWidth}
                  height={svgHeight}
                  fill={`url(#lines-${label}-exposure)`}
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
                {value}%
              </div>
              {/* Category Label */}
              <span className="mt-4 text-sm font-medium text-gray-700">
                {label}
              </span>
              
              {/* Tooltip */}
              {isHovered && (
                <div
                  className="absolute z-50 mt-2 p-3 bg-white rounded-lg shadow-lg border animate-fade-in"
                  style={{
                    right: "20px",
                    minWidth: "240px",
                    borderTop: `3px solid ${color}`,
                    top: "140px"
                  }}
                >
                  <div className="text-xs font-semibold text-gray-700 mb-2">
                    {label} Exposure Blocks ({districts.length})
                  </div>
                  {districts.length > 0 ? (
                    <div className="grid grid-cols-3 gap-1">
                      {districts.map((d, i) => (
                        <div
                          key={i}
                          className="text-xs text-gray-600 px-2 py-1 bg-gray-50 rounded hover:bg-blue-50 transition-colors cursor-pointer"
                          onClick={() => handleDistrictClick(d)}
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500 italic">
                      No blocks in this category
                    </div>
                  )}
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
