import React, { useMemo, useState, useCallback } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// --- Areas (km²) for each block
const areaMap = {
  Dhanarua: 183.40,
  Naubatpur: 168.03,
  Masaurhi: 202.26,
  Maner: 171.96,
  Pandarak: 205.75,
  Barh: 120.19,
  Athmalgola: 50.41,
  Belchhi: 69.65,
  Khusrupur: 63.10,
  Fatwah: 125.98,
  Ghoswari: 138.61,
  Bihta: 198.16,
  Sampatchak: 63.81,
  Punpun: 130.78,
  Paliganj: 238.78,
  Bikram: 152.79,
  "Dulhin Bazar": 108.43,
  Bakhtiyarpur: 171.16,
  Mokama: 194.23,
  "Patna Sadar": 148.91,
  Daniyawan: 65.37,
  Danapur: 128.18,
  "Phulwari Sharif": 110.20,
};

// --- Data
const districtData = {
  Low: [ ],
  Medium: [
    "Dhanarua",
    "Naubatpur",
    "Masaurhi",
    "Fatwah",
    "Bihta",
    "Sampatchak",
    "Punpun",
    "Paliganj",
    "Bikram",
    "Dulhin Bazar",
    "Phulwari Sharif",
    "Maner",
    "Danapur"
  ],
  High: [
    "Pandarak",
    "Barh",
    "Athmalgola",
    "Belchhi",
    "Bakhtiyarpur",
    "Mokama",
    "Patna Sadar",
    "Daniyawan",
    "Khusrupur",
     "Ghoswari",
  ],
};

const COLORS = { High: "#ec645f", Medium: "#f5a319", Low: "#e7d55a" };
const TRACKS = { High: "#f9e0df", Medium: "#fde7c6", Low: "#f5f1cf" };

const toPercent = (n, d) => ((n / d) * 100).toFixed(1);

// Tooltip that uses the category tracked in state to ensure correctness
const CustomTooltip = ({ active, payload, label, hoveredCategory, chart }) => {
  if (!active || !hoveredCategory) return null;

  const cat = hoveredCategory;
  const info = chart?.[cat];
  if (!info) return null;

  return (
    <div className="bg-white border rounded shadow p-1 text-xs max-w-[400px]">
      <div className="font-bold mb-1">{cat} Sensitivity</div>
      <div className="mb-1 text-[13px] font-semibold text-slate-600">
        {info.percentText} of total area
      </div>
      <div className="mb-1 text-[13px] text-slate-600">
        {info.areaText} km²
      </div>
        <div className="text-[9px] leading-snug grid grid-cols-3 gap-1">
        {info.items.map((block, i) => (
          <div
            key={i}
            className="text-gray-600 px-1 py-0.5 bg-gray-50 rounded"
          >
            {block}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function SensitivityDonutChart() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const chart = useMemo(() => {
    const sumCategoryArea = (blocks) =>
      blocks.reduce((sum, b) => sum + (areaMap[b] || 0), 0);

    const totalArea =
      sumCategoryArea(districtData.Low) +
      sumCategoryArea(districtData.Medium) +
      sumCategoryArea(districtData.High);

    const build = (key) => {
      const area = sumCategoryArea(districtData[key]);
      const percent = toPercent(area, totalArea);
      return {
        key,
        value: area,
        color: COLORS[key],
        track: TRACKS[key],
        percentText: `${percent}%`,
        areaText: area.toFixed(2),
        items: districtData[key],
        total: totalArea,
      };
    };

    return {
      total: totalArea,
      High: build("High"),
      Medium: build("Medium"),
      Low: build("Low"),
    };
  }, []);

  // Geometry (match your other chart)
  const size = 180;
  const center = "50%";
  const outerR = 84;
  const gap = 10;
  const thickness = 14;
  const padAngle = 3;
  const START = 210;
  const END = -150;

  // Handlers to set hovered ring explicitly
  const handleEnter = useCallback((cat) => () => setHoveredCategory(cat), []);
  const handleLeave = useCallback(() => setHoveredCategory(null), []);

  // One ring: background + [visible, filler]
  const Ring = ({ cat, inner, outer }) => {
    const visible = chart[cat].value;
    const filler = Math.max(chart.total - visible, 0);

    const dataVisible = [
      {
        value: visible,
        key: cat, // real slice
        meta: {
          percentText: chart[cat].percentText,
          items: chart[cat].items,
        },
      },
      { value: filler, key: `${cat}-filler` }, // transparent completion
    ];

    return (
      <>
        {/* Track */}
        <Pie
          data={[{ value: 1 }]}
          dataKey="value"
          cx={center}
          cy={center}
          startAngle={START}
          endAngle={END}
          innerRadius={inner}
          outerRadius={outer}
          isAnimationActive={false}
          paddingAngle={0}
          stroke="none"
        >
          <Cell fill={chart[cat].track} />
        </Pie>

        {/* Data (bind hover to this ring) */}
        <Pie
          data={dataVisible}
          nameKey="key"
          dataKey="value"
          cx={center}
          cy={center}
          startAngle={START}
          endAngle={END}
          innerRadius={inner}
          outerRadius={outer}
          label={false}
          labelLine={false}
          paddingAngle={padAngle}
          isAnimationActive
          stroke="none"
          cornerRadius={10}
          onMouseEnter={handleEnter(cat)}
          onMouseMove={handleEnter(cat)}
          onMouseLeave={handleLeave}
        >
          <Cell fill={chart[cat].color} />
          <Cell fill="transparent" />
        </Pie>
      </>
    );
  };

  return (
    <div className="w-full max-w-sm bg-white">
                        <h2 className="text-center text-sm font-semibold mb-4">
        Sensitivity by Area 
      </h2>
      <div className="relative flex items-center justify-center">
        <ResponsiveContainer width={size} height={size}>
          <PieChart>
            <Ring cat="High" inner={outerR - thickness} outer={outerR} />
            <Ring
              cat="Medium"
              inner={outerR - thickness - gap - thickness}
              outer={outerR - thickness - gap}
            />
            <Ring
              cat="Low"
              inner={outerR - 2 * (thickness + gap) - thickness}
              outer={outerR - 2 * (thickness + gap)}
            />
            <Tooltip
              content={
                <CustomTooltip
                  hoveredCategory={hoveredCategory}
                  chart={chart}
                />
              }
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-2 flex items-center gap-4 text-[12px] justify-center">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: COLORS.High }}
          />
          <span className="text-slate-700">High</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: COLORS.Medium }}
          />
          <span className="text-slate-700">Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: COLORS.Low }}
          />
          <span className="text-slate-700">Low</span>
        </div>
      </div>
    </div>
  );
}
