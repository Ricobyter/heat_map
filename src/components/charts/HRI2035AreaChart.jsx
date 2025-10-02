import React, { useMemo, useState } from "react";

/* Data */
const districtData = {
  Moderate: ["Athmalgola","Belchhi","Ghoswari","Pandarak","Dhanarua","Paliganj","Dulhin Bazar"],
  High: ["Sampatchak","Fatwah","Daniyawan","Khusrupur","Barh","Mokama","Bakhtiyarpur","Bikram","Masaurhi","Punpun","Maner","Naubatpur"],
  "Very High": ["Patna Sadar","Phulwari Sharif","Bihta","Danapur"],
};

const areaMap = {
  Dhanarua: 183.4, Naubatpur: 168.03, Masaurhi: 202.26, Maner: 171.96, Pandarak: 205.75,
  Barh: 120.19, Athmalgola: 50.41, Belchhi: 69.65, Khusrupur: 63.1, Fatwah: 125.98,
  Ghoswari: 138.61, Bihta: 198.16, Sampatchak: 63.81, Punpun: 130.78, Paliganj: 238.78,
  Bikram: 152.79, "Dulhin Bazar": 108.43, Bakhtiyarpur: 171.16, Mokama: 194.23,
  "Patna Sadar": 148.91, Daniyawan: 65.37, Danapur: 128.18, "Phulwari Sharif": 110.2,
};

/* Area percentages */
const useAreaPercentages = () =>
  useMemo(() => {
    const totalArea = Object.values(areaMap).reduce((s, a) => s + a, 0);
    const perCategory = Object.fromEntries(
      Object.keys(districtData).map((cat) => [
        cat,
        districtData[cat].reduce((s, b) => s + (areaMap[b] || 0), 0),
      ])
    );
    return Object.fromEntries(
      Object.entries(perCategory).map(([cat, a]) => [
        cat,
        Number(((a / totalArea) * 100).toFixed(1)),
      ])
    );
  }, []);

export default function HRI2035AreaChart() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const percentages = useAreaPercentages();

  const hriData = [
    {
      label: "Moderate",
      value: percentages["Moderate"] || 0,
      gradientFrom: "#b6eaff",
      gradientTo: "#00bfff",
      color: "#46b1e1",
      lightColor: "#b6eaff50",
    },
    {
      label: "High",
      value: percentages["High"] || 0,
      gradientFrom: "#a9bcec",
      gradientTo: "#465f91",
      color: "#465f91",
      lightColor: "#a9bcec50",
    },
    {
      label: "Very High",
      value: percentages["Very High"] || 0,
      gradientFrom: "#e9d5ff",
      gradientTo: "#8b5cf6",
      color: "#8b5cf6",
      lightColor: "#e9d5ff50",
    },
  ];

  const handleDistrictClick = (d) => console.log("District selected:", d);

  const H = 110; // px height
  const W = 40;  // px width

  return (
    <div className="max-w-xs mx-auto my-6 relative">
      <h2 className="text-center text-sm font-semibold mb-14">
        Heat Risk by Area
      </h2>

      <div className="flex justify-center items-end gap-2" style={{ height: H }}>
        {hriData.map(({ label, value, gradientFrom, gradientTo, color, lightColor }) => {
          const barPx = Math.max(0, Math.min(100, value)) * (H / 100);
          const isHovered = hoveredCategory === label;
          const districts = districtData[label] || [];

          return (
            <div
              key={label}
              className="relative flex flex-col items-center cursor-pointer"
              onMouseEnter={() => setHoveredCategory(label)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Bar wrapper with clipped rounded corners */}
              <div
                style={{
                  position: "relative",
                  width: W,
                  height: H,
                  borderRadius: 12,
                  overflow: "hidden",
                  background: `repeating-linear-gradient(
                    90deg,
                    ${lightColor} 0 2px,
                    transparent 2px 4px
                  )`,
                }}
              >
                {/* Bottom-aligned fill, only round top corners */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    height: `${value}%`,
                    background: `linear-gradient(${gradientFrom}, ${gradientTo})`,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
              </div>

              {/* Value bubble positioned just above the fill */}
              <div
                style={{
                  position: "absolute",
                  top: `${H - barPx - 34}px`, // lift a bit more so it clears the bar
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "white",
                  color: "#5e6acc",
                  fontWeight: 600,
                  borderRadius: 14,
                  minWidth: 52,
                  textAlign: "center",
                  boxShadow: "0 2px 6px rgba(60,60,120,0.1)",
                  padding: "2px 10px",
                  fontSize: "1rem",
                }}
              >
                {value}%
              </div>

              <span className="mt-4 text-sm font-medium text-gray-700">
                {label}
              </span>

              {isHovered && (
                <div
                  className="absolute z-50 mt-2 p-3 bg-white rounded-lg shadow-lg border animate-fade-in"
                  style={{
                    right: 10,
                    minWidth: 240,
                    borderTop: `3px solid ${color}`,
                    top: 140,
                  }}
                >
                  <div className="text-xs font-semibold text-gray-700 mb-2">
                    {label} HRI 2030 Blocks ({districts.length})
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
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
      `}</style>
    </div>
  );
}
