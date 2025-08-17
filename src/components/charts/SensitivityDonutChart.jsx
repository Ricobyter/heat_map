import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// Data arrangement
const districtData = {
  Low: ['Maner', 'Khusrupur', 'Ghoswari', 'Danapur'],
  Medium: [
    'Dhanarua','Naubatpur','Masaurhi','Fatwah',
    'Bihta','Sampatchak','Punpun','Paliganj','Bikram','Dulhin Bazar','Phulwari Sharif'
  ],
  High: [
    'Pandarak','Barh','Athmalgola','Belchhi','Bakhtiyarpur','Mokama','Patna Sadar','Daniyawan'
  ]
};

const total = Object.values(districtData).reduce((acc, arr) => acc + arr.length, 0);
const CHART_DATA = [
  { value: districtData.Low.length, color: '#f2f3d0', key: 'Low' },
  { value: districtData.Medium.length, color: '#f5a319', key: 'Medium' },
  { value: districtData.High.length, color: '#ec645f', key: 'High' }
];

const percentages = {
  Low: ((districtData.Low.length / total) * 100).toFixed(1),
  Medium: ((districtData.Medium.length / total) * 100).toFixed(1),
  High: ((districtData.High.length / total) * 100).toFixed(1)
};

const renderCustomLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.65;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const cat = CHART_DATA[index].key;
  return percent > 0.03 ? (
    <text
      x={x}
      y={y}
      fill="#111"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontSize: '13px', fontWeight: 600 }}
    >
      {percentages[cat]}%
    </text>
  ) : null;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const idx = payload[0].payload.key;
    return (
      <div className="bg-white border rounded shadow p-2 text-xs max-w-[220px]">
        <div className="font-bold mb-1">{idx} Sensitivity</div>
        <div className="mb-1 text-[13px] font-semibold text-slate-600">
          {percentages[idx]}% of districts
        </div>
        <div className="text-[11px]">{districtData[idx].join(', ')}</div>
      </div>
    );
  }
  return null;
};

export default function SensitivityDonutChart() {
  return (
    <div className="w-full flex items-center justify-center py-4 ">
      <PieChart width={120} height={120}>
        <Pie
          data={CHART_DATA}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={30}
          outerRadius={60}
          label={renderCustomLabel}
          isAnimationActive={true}
          labelLine={false}
          paddingAngle={3}
        >
          {CHART_DATA.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </div>
  );
}
