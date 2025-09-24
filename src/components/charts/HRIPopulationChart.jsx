import React, { useMemo, useState, useCallback } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// --- Areas (km²) for each block
const areaMap = {
  "Dhanarua": 279217,
  "Naubatpur": 279261,
  "Masaurhi": 207698,
  "Maner": 370582,
  "Pandarak": 207698,
  "Barh": 304787,
  "Athmalgola": 122195,
  "Belchhi": 88881,
  "Khusrupur": 150723,
  "Fatwah": 277727,
  "Ghoswari": 100612,
  "Bihta": 364080,
  "Sampatchak": 143559,
  "Punpun": 185575,
  "Paliganj": 344869,
  "Bikram": 232889,
  "Dulhin Bazar": 167870,
  "Bakhtiyarpur": 316478,
  "Mokama": 286997,
  "Patna Sadar": 2767811,
  "Daniyawan": 100865,
  "Danapur": 594955,
  "Phulwari Sharif": 391849
};

// --- Data
const districtData = {
  Moderate: ["Athmalgola","Belchhi","Ghoswari","Pandarak","Dhanarua","Paliganj","Dulhin Bazar"],
  High: ["Sampatchak","Fatwah","Daniyawan","Khusrupur","Barh","Mokama","Bakhtiyarpur","Bikram","Masaurhi","Punpun","Maner","Naubatpur"],
  "Very High": ["Patna Sadar","Phulwari Sharif","Bihta","Danapur"],
};

const COLORS = { "Very High": '#ec645f', High: '#f5a319', Moderate: '#e7d55a' };
const TRACKS = { "Very High": '#f9e0df', High: '#fde7c6', Moderate: '#f5f1cf' };

const toPercent = (n, d) => ((n / d) * 100).toFixed(1);

const CustomTooltip = ({ active, hoveredCategory, chart, title = 'Adaptive Capacity' }) => {
  if (!active || !hoveredCategory) return null;
  const info = chart?.[hoveredCategory];
  if (!info) return null;

  return (
    <div className="bg-white border rounded shadow p-2 text-xs max-w-[260px]">
      <div className="font-bold mb-1">{hoveredCategory} {title}</div>
      <div className="mb-1 text-[13px] font-semibold text-slate-600">
        {info.percentText} of total population
      </div>
      <div className="mb-1 text-[13px] text-slate-600">
        {info.areaText} 
      </div>
      <div className="text-[11px] leading-snug">{info.items.join(', ')}</div>
    </div>
  );
};

export default function HRIPopulationChart() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const chart = useMemo(() => {
    const sumCategoryArea = (blocks) =>
      blocks.reduce((sum, b) => sum + (areaMap[b] || 0), 0);

    const totalArea =
      sumCategoryArea(districtData.Moderate) +
      sumCategoryArea(districtData.High) +
      sumCategoryArea(districtData["Very High"]);

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
      "Very High": build("Very High"),
      High: build('High'),
      Moderate: build('Moderate')
    };
  }, []);

  // Geometry (consistent with other charts)
  const size = 160;
  const center = '50%';
  const outerR = 74;
  const gap = 10;
  const thickness = 14;
  const padAngle = 3;
  const START = 210;
  const END = -150;

  const handleEnter = useCallback((cat) => () => setHoveredCategory(cat), []);
  const handleLeave = useCallback(() => setHoveredCategory(null), []);

  // One ring: track + [visible, transparent filler]
  const Ring = ({ cat, inner, outer }) => {
    const visible = chart[cat].value;
    const filler = Math.max(chart.total - visible, 0);

    const dataVisible = [
      {
        value: visible,
        key: cat,
        meta: {
          percentText: chart[cat].percentText,
          items: chart[cat].items
        }
      },
      { value: filler, key: `${cat}-filler` }
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

        {/* Data */}
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
                  <h2 className="text-center text-sm font-semibold mb-2">
        Population by HRI Risk Level
      </h2>
      <div className="relative flex items-center justify-center">
        <ResponsiveContainer width={size} height={size}>
          <PieChart>
            <Ring cat="Very High" inner={outerR - thickness} outer={outerR} />
            <Ring
              cat="High"
              inner={outerR - thickness - gap - thickness}
              outer={outerR - thickness - gap}
            />
            <Ring
              cat="Moderate"
              inner={outerR - 2 * (thickness + gap) - thickness}
              outer={outerR - 2 * (thickness + gap)}
            />
            <Tooltip
              content={
                <CustomTooltip
                  hoveredCategory={hoveredCategory}
                  chart={chart}
                  title="HRI Population"
                />
              }
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-2 flex items-center justify-center gap-4 text-[12px]">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: COLORS["Very High"] }} />
          <span className="text-slate-700">Very High</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: COLORS.High }} />
          <span className="text-slate-700">High</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: COLORS.Moderate }} />
          <span className="text-slate-700">Moderate</span>
        </div>
      </div>
    </div>
  );
}
