import { useState } from "react";
import HeatMap from "./HeatMap";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  Legend,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import charts from "../assets/chart.png";

const barData = [
  { name: "Patna Sadar", value: 78 },
  { name: "Patna City", value: 74 },
  { name: "Danapur", value: 82 },
  { name: "Maner", value: 68 },
  { name: "Gopalpur", value: 65 },
  { name: "Phulwari", value: 59 },
];

const lineData = [
  { year: "2017", Pre: 20, Mon: 25, Post: 28, Winter: 30 },
  { year: "2018", Pre: 22, Mon: 26, Post: 29, Winter: 31 },
  { year: "2019", Pre: 24, Mon: 27, Post: 30, Winter: 32 },
  { year: "2020", Pre: 26, Mon: 29, Post: 31, Winter: 33 },
  { year: "2021", Pre: 28, Mon: 30, Post: 33, Winter: 35 },
];

const gaugeData = [{ name: "Safe", value: 44, fill: "#f87171" }];

const bubbleData = [
  { x: 100, y: 200, z: 200, name: "Cooling Centres" },
  { x: 120, y: 100, z: 100, name: "Green Cover" },
  { x: 170, y: 300, z: 300, name: "Sheds" },
  { x: 140, y: 250, z: 150, name: "Reflective Roofing" },
];

const subdistricts = [
  "Athamalgola",
  "Bakhtiarpur",
  "Barh",
  "Belchi",
  "Bihta",
  "Bikram",
  "Daniyawan",
  "Danapur",
  "Dhanarua",
  "Dulhin Bazar",
  "Fatuha",
  "Ghoswari",
  "Khusrupur",
  "Maner",
  "Masaurhi",
  "Mokama",
  "Naubatpur",
  "Paliganj",
  "Pandarak",
  "Patna Sadar",
  "Phulwarisharif",
  "Punpun",
  "Sampatchak",
];

const BarChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <ReBarChart
      data={barData}
      margin={{ top: 20, left: 20, right: 0, bottom: 0 }}
    >
      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
    </ReBarChart>
  </ResponsiveContainer>
);

const LineChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <ReLineChart
      data={lineData}
      margin={{ top: 20, left: 20, right: 10, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Pre" stroke="#f59e42" strokeWidth={2} />
      <Line type="monotone" dataKey="Mon" stroke="#ef4444" strokeWidth={2} />
      <Line type="monotone" dataKey="Post" stroke="#3b82f6" strokeWidth={2} />
      <Line type="monotone" dataKey="Winter" stroke="#10b981" strokeWidth={2} />
    </ReLineChart>
  </ResponsiveContainer>
);

const GaugeChart = () => (
  <div className="h-48 w-full flex items-center justify-center -mt-10">
    <ResponsiveContainer width="90%" height="100%">
      <RadialBarChart
        cx="50%"
        cy="100%"
        innerRadius="80%"
        outerRadius="100%"
        barSize={20}
        data={gaugeData}
        startAngle={180}
        endAngle={0}
      >
        <PolarAngleAxis
          type="number"
          domain={[30, 50]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar background clockWise dataKey="value" />
        <Tooltip />
      </RadialBarChart>
    </ResponsiveContainer>
  </div>
);

const BubbleChart = () => (
  <div className="h-48 w-full mt-7 -ml-9">
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart>
        <XAxis type="number" dataKey="x" tick={false} />
        <YAxis type="number" dataKey="y" domain={[0, 400]} tick={false} />
        <ZAxis type="number" dataKey="z" range={[80, 300]} />
        <Tooltip />
        <Scatter data={bubbleData} fill="#a78bfa" />
      </ScatterChart>
    </ResponsiveContainer>
  </div>
);

const Dashboard = ({ mapType }) => {
  const options = ["Financial", "Technology", "Capacity Building", "System"];
  const [mapName, setMapName] = useState(mapType);

  const [activeOption, setActiveOption] = useState(null);
  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-7">
          <HeatMap mapType={mapType} />
        </div>

        <div className="col-span-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-#F9F6EE p-5 rounded-lg shadow border text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">68</div>
              <div className="text-sm text-gray-600 font-medium">
                Heatwave Days
              </div>
            </div>
            <div className="bg-#F9F6EE p-5 rounded-lg shadow border text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">7</div>
              <div className="text-sm text-gray-600 font-medium">
                Heat-Related
                <br />
                Mortality Rate
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-#F9F6EE p-5 rounded-lg shadow border text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">93%</div>
              <div className="text-sm text-gray-600 font-medium">
                Households Lacking
                <br />
                Air Conditioning
              </div>
            </div>
            <div className="bg-#F9F6EE p-5 rounded-lg shadow border text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">1</div>
              <div className="text-sm text-gray-600 font-medium">
                Cooling Centres
              </div>
            </div>
          </div>
          
{mapType === "adaptive_capacity_index" && (
  <div>
    <img src={charts} alt="Chart" className="h-31 w-full" />
  </div>
)}
          <div className="px-5 py-3 mt-5 border border-gray-700 rounded shadow-md  bg-white w-full">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Recommendations
            </h2>
            <div className="grid grid-cols-4 gap-3">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => setActiveOption(option)}
                  className={`flex justify-center items-center py-2 border rounded text-sm font-medium text-center
              ${
                activeOption === option
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-800 border-gray-400 hover:bg-gray-100"
              }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-4 bg-#F9F6EE p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Heat Vulnerability by Area
          </h3>
          <div className="mt-4">
            <div className="h-48 w-full mt-7 -ml-7">
              <BarChart />
            </div>
          </div>
        </div>

        <div className="col-span-4 bg-#F9F6EE p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Seasonal Temperature Anomaly
          </h3>
          <div className="mt-4">
            <div className="h-48 w-full mt-7 -ml-7">
              <LineChart />
            </div>
          </div>
        </div>

        <div className="col-span-4 bg-#F9F6EE p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Heatwave Threshold Analysis
          </h3>
          <div className="text-sm text-gray-600 mb-2">Select Block</div>
          <select className="w-full p-3 border border-gray-300 rounded text-gray-800 text-sm bg-[#F9F6EE]">
            {subdistricts.map((subdistrict) => (
              <option key={subdistrict}>{subdistrict}</option>
            ))}
          </select>
          <div>
            <GaugeChart />
          </div>
        </div>

        <div className="col-span-4 bg-#F9F6EE p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Heat Risk Mitigation Strategies
          </h3>
          <div className="text-sm text-gray-600 mb-2">Select Block</div>
          <select className="w-full p-3 border border-gray-300 rounded text-gray-800 text-sm bg-[#F9F6EE]">
            {subdistricts.map((subdistrict) => (
              <option key={subdistrict}>{subdistrict}</option>
            ))}
          </select>
          <BubbleChart />
        </div>

        <div className="col-span-8 bg-#F9F6EE p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4 text-green-600">
            Heatwave Advisories
          </h3>
          <div className="text-sm text-gray-700 space-y-2 leading-relaxed">
            {/* Advisory 1 */}
            <div className="flex items-start space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded mt-1"></div>
              <div>
                <p className="font-semibold text-orange-600">
                  Elderly (Orange Alert)
                </p>
                <p>Drink 2-3L water daily, visit cooling shelters.</p>
                <p>BOSMA Helpline: 1070</p>
              </div>
            </div>

            {/* Advisory 2 */}
            <div className="flex items-start space-x-2 mt-4">
              <div className="w-4 h-4 bg-red-500 rounded mt-1"></div>
              <div>
                <p className="font-semibold text-red-600">
                  Outdoor Workers (Red Alert)
                </p>
                <p>Suspend non-essential work, use cooling vests.</p>
              </div>
            </div>

            {/* ✅ Advisory 3 */}
            <div className="flex items-start space-x-2 mt-4">
              <div className="w-4 h-4 bg-yellow-400 rounded mt-1"></div>
              <div>
                <p className="font-semibold text-yellow-500">
                  Children & Infants (Yellow Alert)
                </p>
                <p>
                  Keep indoors during peak heat hours. Ensure hydration and
                  light clothing.
                </p>
              </div>
            </div>

            {/* ✅ Advisory 4 */}
            <div className="flex items-start space-x-2 mt-4">
              <div className="w-4 h-4 bg-blue-400 rounded mt-1"></div>
              <div>
                <p className="font-semibold text-blue-600">
                  General Public (Blue Alert)
                </p>
                <p>
                  Avoid strenuous activities. Drink fluids. Use public cooling
                  centers if needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
