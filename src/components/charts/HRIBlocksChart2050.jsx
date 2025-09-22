import React, { useState } from "react";

const districtData = {
  Moderate: ["Athmalgola","Belchhi","Ghoswari","Pandarak","Dhanarua","Paliganj","Dulhin Bazar"],
  High: ["Sampatchak","Fatwah","Daniyawan","Khusrupur","Barh","Mokama","Bakhtiyarpur","Bikram","Masaurhi","Punpun","Maner","Naubatpur"],
  "Very High": ["Patna Sadar","Phulwari Sharif","Bihta","Danapur"]
};

const data = [
  { label: "Moderate", value: 30.4, color: "#46b1e1", gradientFrom: "#b6eaff", gradientTo: "#00bfff" },
  { label: "High", value: 52.2, color: "#465f91", gradientFrom: "#a9bcec", gradientTo: "#465f91" },
  { label: "Very High", value: 17.4, color: "#7d50c7", gradientFrom: "#d5c7f6", gradientTo: "#7d50c7" },
];

export default function HRIBlocksChart2050() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="max-w-[280px] mx-auto my-8">
      <h2 className="text-center text-sm font-semibold mb-6 text-gray-700">
        Category Wise Block<br />HRI Baseline 2050 (in %)
      </h2>

      <div className="space-y-4">
        {data.map(({ label, value, color, gradientFrom, gradientTo }) => {
          const percent = Number(value).toFixed(1);
          const lightColor = `${color}30`;
          const districts = districtData[label] || [];
          const isHovered = hovered === label;

          return (
            <div key={label} className="relative">
              <div className="flex items-center">
                <span className="w-20 mr-3 text-sm font-medium text-gray-600">
                  {label}
                </span>

                {/* Wrapper controls positioning; NOT clipped */}
                <div
                  className="relative flex-1 h-8 cursor-pointer"
                  onMouseEnter={() => setHovered(label)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Track: only this is clipped + stripes */}
                  <div
                    className="absolute inset-0 rounded-lg overflow-hidden"
                    style={{
                      background: `repeating-linear-gradient(
                        180deg,
                        ${lightColor} 0 2px,
                        transparent 2px 4px
                      )`,
                      borderRadius: 12,
                    }}
                  >
                    {/* Fill: pill shape so right end is rounded too */}
                    <div
                      className="h-full"
                      style={{
                        width: `${percent}%`,
                        background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
                        borderRadius: 12, // round both ends for the “pill” look
                      }}
                    />
                  </div>

                  {/* Percentage chip OUTSIDE the clipped box */}
                  <span
                    className="absolute top-1/2 -translate-y-1/2 text-sm font-semibold px-2 py-2 bg-white rounded-xl shadow-sm"
                    style={{
                      left: `calc(${percent}% + 8px)`,
                      color: "#5e6acc",
                      whiteSpace: "nowrap",
                      zIndex: 2,
                    }}
                  >
                    {percent}%
                  </span>
                </div>
              </div>

              {/* Tooltip */}
              {isHovered && (
                <div
                  className="absolute z-50 mt-2 p-3 bg-white rounded-lg shadow-lg border animate-fade-in"
                  style={{
                    left: 20,
                    minWidth: 240,
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
                        onClick={() => console.log("District selected:", d)}
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
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
      `}</style>
    </div>
  );
}
