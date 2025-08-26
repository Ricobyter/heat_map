// import React from "react";
// import { useEffect, useState } from "react";
// import HeatMap from "./HeatMap";
// import {
//   BarChart as ReBarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart as ReLineChart,
//   Line,
//   Legend,
//   CartesianGrid,
//   RadialBarChart,
//   RadialBar,
//   PolarAngleAxis,
//   ScatterChart,
//   Scatter,
//   ZAxis,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import charts from "../assets/chart.png";
// import AdaptiveCapacityMatrix from "./AdaptiveCapacityMatrix";
// import VulnerabilityDonutChart from "./VulnerabilityDonutChart";
// import ExposureDonutChart from "./charts/ExposureDonutChart";
// import SensitivityDonutChart from "./charts/SensitivityDonutChart";
// import AdaptiveCapacityDonutChart from "./charts/AdaptiveCapacityDonutChart";
// import AdaptiveCapacityBlocksChart from "./charts/AdaptiveCapacityBlocksChart";

// import ExposureBlocksChart from './charts/ExposureBlocksChart';
// import VulnerableBlocksChart from './charts/VulnerableBlocksChart';
// import SensitivityBlocksChart from './charts/SensitivityBlocksChart';

// import AdaptiveCapacityPopulationChart from './charts/AdaptiveCapacityPopulationChart';
// import ExposurePopulationChart from './charts/ExposurePopulationChart';
// import SensitivityPopulationChart from './charts/SensitivityPopulationChart';
// import VulnerablePopulationChart from './charts/VulnerablePopulationChart';

// const barData = [
//   { name: "Patna Sadar", value: 78 },
//   { name: "Patna City", value: 74 },
//   { name: "Danapur", value: 82 },
//   { name: "Maner", value: 68 },
//   { name: "Gopalpur", value: 65 },
//   { name: "Phulwari", value: 59 },
// ];

// const lineData = [
//   { year: "2017", Pre: 20, Mon: 25, Post: 28, Winter: 30 },
//   { year: "2018", Pre: 22, Mon: 26, Post: 29, Winter: 31 },
//   { year: "2019", Pre: 24, Mon: 27, Post: 30, Winter: 32 },
//   { year: "2020", Pre: 26, Mon: 29, Post: 31, Winter: 33 },
//   { year: "2021", Pre: 28, Mon: 30, Post: 33, Winter: 35 },
// ];

// const gaugeData = [{ name: "Safe", value: 44, fill: "#f87171" }];

// const bubbleData = [
//   { x: 100, y: 200, z: 200, name: "Cooling Centres" },
//   { x: 120, y: 100, z: 100, name: "Green Cover" },
//   { x: 170, y: 300, z: 300, name: "Sheds" },
//   { x: 140, y: 250, z: 150, name: "Reflective Roofing" },
// ];

// const subdistricts = [
//   "Athamalgola",
//   "Bakhtiarpur",
//   "Barh",
//   "Belchi",
//   "Bihta",
//   "Bikram",
//   "Daniyawan",
//   "Danapur",
//   "Dhanarua",
//   "Dulhin Bazar",
//   "Fatuha",
//   "Ghoswari",
//   "Khusrupur",
//   "Maner",
//   "Masaurhi",
//   "Mokama",
//   "Naubatpur",
//   "Paliganj",
//   "Pandarak",
//   "Patna Sadar",
//   "Phulwarisharif",
//   "Punpun",
//   "Sampatchak",
// ];

// const BarChart = () => (
//   <ResponsiveContainer width="100%" height="100%">
//     <ReBarChart
//       data={barData}
//       margin={{ top: 20, left: 20, right: 0, bottom: 0 }}
//     >
//       <XAxis dataKey="name" tick={{ fontSize: 10 }} />
//       <YAxis />
//       <Tooltip />
//       <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//     </ReBarChart>
//   </ResponsiveContainer>
// );

// const LineChart = () => (
//   <ResponsiveContainer width="100%" height="100%">
//     <ReLineChart
//       data={lineData}
//       margin={{ top: 20, left: 20, right: 10, bottom: 0 }}
//     >
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="year" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Line type="monotone" dataKey="Pre" stroke="#f59e42" strokeWidth={2} />
//       <Line type="monotone" dataKey="Mon" stroke="#ef4444" strokeWidth={2} />
//       <Line type="monotone" dataKey="Post" stroke="#3b82f6" strokeWidth={2} />
//       <Line type="monotone" dataKey="Winter" stroke="#10b981" strokeWidth={2} />
//     </ReLineChart>
//   </ResponsiveContainer>
// );

// const GaugeChart = () => (
//   <div className="h-48 w-full flex items-center justify-center -mt-10">
//     <ResponsiveContainer width="90%" height="100%">
//       <RadialBarChart
//         cx="50%"
//         cy="100%"
//         innerRadius="80%"
//         outerRadius="100%"
//         barSize={20}
//         data={gaugeData}
//         startAngle={180}
//         endAngle={0}
//       >
//         <PolarAngleAxis
//           type="number"
//           domain={[30, 50]}
//           angleAxisId={0}
//           tick={false}
//         />
//         <RadialBar background clockWise dataKey="value" />
//         <Tooltip />
//       </RadialBarChart>
//     </ResponsiveContainer>
//   </div>
// );

// const BubbleChart = () => (
//   <div className="h-48 w-full mt-7 -ml-9">
//     <ResponsiveContainer width="100%" height="100%">
//       <ScatterChart>
//         <XAxis type="number" dataKey="x" tick={false} />
//         <YAxis type="number" dataKey="y" domain={[0, 400]} tick={false} />
//         <ZAxis type="number" dataKey="z" range={[80, 300]} />
//         <Tooltip />
//         <Scatter data={bubbleData} fill="#a78bfa" />
//       </ScatterChart>
//     </ResponsiveContainer>
//   </div>
// );

// const donutChartMap = {
//   vulnerability_index: VulnerabilityDonutChart,
//   exposure_index: ExposureDonutChart,
//   sensitivity_index: SensitivityDonutChart,
//   adaptive_capacity_index: AdaptiveCapacityDonutChart,
// };

// const blocksChartMap = {
//   adaptive_capacity_index: AdaptiveCapacityBlocksChart,
//   exposure_index: ExposureBlocksChart,
//   sensitivity_index: SensitivityBlocksChart,
//   vulnerability_index: VulnerableBlocksChart,
// };

// const populationChartMap = {
//   adaptive_capacity_index: AdaptiveCapacityPopulationChart,
//   exposure_index: ExposurePopulationChart,
//   sensitivity_index: SensitivityPopulationChart,
//   vulnerability_index: VulnerablePopulationChart,
// };

// const donutTitleMap = {
//   vulnerability_index: "Heat Vulnerability by Area",
//   exposure_index: "Exposure by Area",
//   sensitivity_index: "Sensitivity by Area",
//   adaptive_capacity_index: "Adaptive Capacity by Area"
// };

// const Dashboard = ({ mapType, selectedLayer }) => {
//   const options = ["Preparedness", "Response", "Recovery"];
//   const [mapName, setMapName] = useState(mapType);
//   const [loading, setLoading] = useState(false);
//   const [weather, setWeather] = useState(null);
//   const [error, setError] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(null);

//   const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

//   const fetchWeather = () => {
//     setLoading(true);
//     fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=Patna,IN&units=metric&appid=${API_KEY}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.main) {
//           setWeather({
//             temp: data.main.temp,
//             humidity: data.main.humidity,
//             description: data.weather[0].description,
//           });
//           setLastUpdated(new Date());
//           setError(null);
//         } else {
//           setError("Unable to fetch weather data");
//         }
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Error connecting to weather service");
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchWeather();
//   }, []);

//   const [activeOption, setActiveOption] = useState(null);

//   const formatTimestamp = (date) => {
//     if (!date) return "";
//     return date.toLocaleTimeString('en-IN', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   const SelectedPopulationChart = populationChartMap[mapType];

//   return (
//     <div className="flex-1 p-6 bg-gray-50 min-h-screen">
//       <div className="grid grid-cols-12 gap-6">
//         <div className="col-span-8">
//           <HeatMap mapType={mapType} selectedLayer={selectedLayer} />
//         </div>

//         <div className="col-span-4 space-y-4">
//           <div className="grid grid-cols-2 gap-4 w-[28vw]">
//             <div className="bg-#F9F6EE p-5 rounded-lg shadow border text-center">
//               <div className="relative group">
//                 <div className="text-3xl font-bold text-blue-600 mb-2">
//                   {loading ? (
//                     <div className="flex justify-center items-center">
//                       <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
//                     </div>
//                   ) : weather ? (
//                     weather.temp + "°C"
//                   ) : (
//                     "--"
//                   )}
//                 </div>
//                 <div className="absolute bottom-full mb-2 hidden group-hover:block w-max px-3 py-1 rounded bg-gray-700 text-white text-xs">
//                   Source: OpenWeather API
//                 </div>
//               </div>
//               <div className="text-sm text-gray-600 font-medium">
//                 Temperature
//               </div>
//               {lastUpdated && (
//                 <div className="text-xs text-gray-400 mt-1">
//                   Updated: {formatTimestamp(lastUpdated)}
//                 </div>
//               )}
//             </div>
//             <div className="bg-#F9F6EE p-5 rounded-lg shadow border text-center">
//               <div className="text-3xl font-bold text-red-600 mb-2">7</div>
//               <div className="text-sm text-gray-600 font-medium">
//                 Heat-Related
//                 <br />
//                 Mortality Rate
//               </div>
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4 w-[28vw]">
//             <div className="bg-#F9F6EE p-5 rounded-lg shadow border text-center">
//               <div className="relative group">
//                 <div className="text-3xl font-bold text-orange-600 mb-2">
//                   {loading ? (
//                     <div className="flex justify-center items-center">
//                       <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
//                     </div>
//                   ) : weather ? (
//                     weather.humidity + "%"
//                   ) : (
//                     "--"
//                   )}
//                 </div>
//                 <div className="absolute bottom-full mb-2 hidden group-hover:block w-max px-3 py-1 rounded bg-gray-700 text-white text-xs">
//                   Source: OpenWeather API
//                 </div>
//               </div>
//               <div className="text-sm text-gray-600 font-medium">
//                 Relative Humidity
//               </div>
//               {lastUpdated && (
//                 <div className="text-xs text-gray-400 mt-1">
//                   Updated: {formatTimestamp(lastUpdated)}
//                 </div>
//               )}
//             </div>
//             <div className="bg-#F9F6EE p-5 rounded-lg shadow border text-center">
//               <div className="text-3xl font-bold text-green-600 mb-2">1</div>
//               <div className="text-sm text-gray-600 font-medium">
//                 Cooling Centres
//               </div>
//             </div>
//           </div>

//           {mapType === "adaptive_capacity_index" && (
//             <div>
//               <AdaptiveCapacityMatrix />
//             </div>
//           )}

//           {mapType !== "adaptive_capacity_index" && (
//             <div className="w-[28vw] px-5 py-3 mt-5 border border-gray-700 rounded shadow-md  bg-white ">
//               <h2 className="text-md font-semibold mb-3 text-gray-800">
//                 Recommendations
//               </h2>
//               <div className="grid grid-cols-2 gap-3">
//                 {options.map((option) => (
//                   <button
//                     key={option}
//                     onClick={() => setActiveOption(option)}
//                     className={`flex justify-center items-center py-2 border rounded text-sm font-medium text-center
//               ${
//                 activeOption === option
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "bg-white text-gray-800 border-gray-400 hover:bg-gray-100"
//               }`}
//                   >
//                     {option}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="col-span-4 bg-#F9F6EE p-6 rounded-lg shadow border">
//           <h3 className="text-lg font-semibold mb-2 text-gray-800">
//             <h3 className="text-lg font-semibold mb-2 text-gray-800">
//               {donutTitleMap[mapType] || "Heat Vulnerability by Area"}
//             </h3>
//           </h3>
//           <div className="mt-4">
//             <div className="h-48 w-full mt-7 -ml-7 flex items-center justify-center">
//               <div>
//                 {
//                   donutChartMap[mapType]
//                     ? React.createElement(donutChartMap[mapType])
//                     : null
//                 }
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-span-8 bg-#F9F6EE p-6 rounded-lg shadow border">
//           {SelectedPopulationChart ? <SelectedPopulationChart /> : null}
//         </div>

//         <div className="col-span-8 bg-#F9F6EE p-6 rounded-lg shadow border">
//           {blocksChartMap[mapType] ? React.createElement(blocksChartMap[mapType]) : null}
//         </div>

//         <div className="col-span-4 bg-#F9F6EE p-6 rounded-lg shadow border">
//           <h3 className="text-lg font-semibold mb-3 text-green-600">
//             Heatwave Advisories
//           </h3>
//           <div className="text-sm text-gray-700 space-y-1 leading-relaxed">
//             <div className="flex items-start space-x-2">
//               <div className="w-4 h-4 bg-orange-500 rounded mt-1"></div>
//               <div>
//                 <p className="font-semibold text-orange-600">
//                   Elderly (Orange Alert)
//                 </p>
//                 <p>Drink 2-3L water daily, visit cooling shelters.</p>
//                 <p>BSDMA Helpline: 0612-2547232</p>
//               </div>
//             </div>

//             <div className="flex items-start space-x-2 mt-4">
//               <div className="w-4 h-4 bg-red-500 rounded mt-1"></div>
//               <div>
//                 <p className="font-semibold text-red-600">
//                   Outdoor Workers (Red Alert)
//                 </p>
//                 <p>Suspend non-essential work, use cooling vests.</p>
//               </div>
//             </div>

//             <div className="flex items-start space-x-2 mt-4">
//               <div className="w-4 h-4 bg-yellow-400 rounded mt-1"></div>
//               <div>
//                 <p className="font-semibold text-yellow-500">
//                   Children & Infants (Yellow Alert)
//                 </p>
//                 <p>
//                   Keep indoors during peak heat hours. Ensure hydration and
//                   light clothing.
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start space-x-2 mt-4">
//               <div className="w-4 h-4 bg-blue-400 rounded mt-1"></div>
//               <div>
//                 <p className="font-semibold text-blue-600">
//                   General Public (Blue Alert)
//                 </p>
//                 <p>
//                   Avoid strenuous activities. Drink fluids. Use public cooling
//                   centers if needed.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import HeatMap from "./HeatMap";

// Import all your chart components (use correct paths)
import VulnerabilityDonutChart from "./VulnerabilityDonutChart";
import ExposureDonutChart from "./charts/ExposureDonutChart";
import SensitivityDonutChart from "./charts/SensitivityDonutChart";
import AdaptiveCapacityDonutChart from "./charts/AdaptiveCapacityDonutChart";
import AdaptiveCapacityBlocksChart from "./charts/AdaptiveCapacityBlocksChart";
import ExposureBlocksChart from "./charts/ExposureBlocksChart";
import VulnerableBlocksChart from "./charts/VulnerableBlocksChart";
import SensitivityBlocksChart from "./charts/SensitivityBlocksChart";
import AdaptiveCapacityPopulationChart from "./charts/AdaptiveCapacityPopulationChart";
import ExposurePopulationChart from "./charts/ExposurePopulationChart";
import SensitivityPopulationChart from "./charts/SensitivityPopulationChart";
import VulnerablePopulationChart from "./charts/VulnerablePopulationChart";
import Footer1 from "./Footer1";

const donutChartMap = {
  vulnerability_index: VulnerabilityDonutChart,
  exposure_index: ExposureDonutChart,
  sensitivity_index: SensitivityDonutChart,
  adaptive_capacity_index: AdaptiveCapacityDonutChart,
};

const blocksChartMap = {
  adaptive_capacity_index: AdaptiveCapacityBlocksChart,
  exposure_index: ExposureBlocksChart,
  sensitivity_index: SensitivityBlocksChart,
  vulnerability_index: VulnerableBlocksChart,
};

const populationChartMap = {
  adaptive_capacity_index: AdaptiveCapacityPopulationChart,
  exposure_index: ExposurePopulationChart,
  sensitivity_index: SensitivityPopulationChart,
  vulnerability_index: VulnerablePopulationChart,
};

const donutTitleMap = {
  vulnerability_index: "Heat Vulnerability by Area",
  exposure_index: "Exposure by Area",
  sensitivity_index: "Sensitivity by Area",
  adaptive_capacity_index: "Adaptive Capacity by Area",
};

const recommendations = ["Preparedness", "Response", "Recovery"];

export default function Dashboard({
  mapType = "vulnerability_index",
  selectedLayer,
  selectedYear,
}) {
  const [weather, setWeather] = useState(null);

  // Dummy Data for Demo
  useEffect(() => {
    setWeather({ temp: 31.19, humidity: 88 });
  }, []);

  const SelectedDonutChart = donutChartMap[mapType];
  const SelectedPopulationChart = populationChartMap[mapType];
  const SelectedBlocksChart = blocksChartMap[mapType];

  const tempColorClass = (t) => {
    if (t == null || Number.isNaN(Number(t))) return "text-gray-500";
    const temp = Number(t);
    if (temp <= 15) return "text-blue-600";
    if (temp <= 25) return "text-sky-500";
    if (temp <= 32) return "text-orange-500";
    if (temp <= 40) return "text-red-600";
    return "text-rose-700";
  };

  return (
    <div className=" min-h-screen bg-white pt-5 w-full  shadow-md rounded-lg shadow-gray-400 font-roboto">
      {/* TOP PANEL */}

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-12 gap-5 px-5">
        {/* MAIN COLUMN */}
        <div className="col-span-9">
          <div className="flex flex-row items-center gap-6 mb-3">
{/* left temp/card */}
<div className="flex items-center gap-2">
  <div className="relative group flex flex-col items-center px-3 py-1 border-r-1 border-gray-400 bg-white">
    <span className={`text-xl font-bold ${tempColorClass(weather?.temp)}`}>
      {weather?.temp ?? "--"}°C
    </span>
    <span className="text-xs text-gray-600">Temperature</span>
    <span className="text-xs text-blue-500">
      Relative Humidity:{" "}
      <span className="font-bold text-yellow-500">
        {weather?.humidity ?? "--"}%
      </span>
    </span>

    {/* Tooltip */}
    <div
      className="
        pointer-events-none
        absolute -top-8 left-1/2 -translate-x-1/2
        whitespace-nowrap
        rounded-md bg-blue-100 px-2 py-1 text-[10px] font-medium text-blue-700 border-0.5 border-blue-700
        opacity-0 transition-opacity duration-150
        group-hover:opacity-100
      "
    >
      Source: Open Weather API
      <span
        className="absolute left-1/2 top-full -translate-x-1/2
                   h-0 w-0 border-x-8 border-x-transparent border-t-8 border-blue-100"
      />
    </div>
  </div>
</div>

            {/* center alert */}
            <div className="flex-1 bg-yellow-100 px-5 py-2 rounded-lg flex items-center gap-2 border-none">
              <span className="text-yellow-600 text-lg font-semibold">
                <svg
                  className="inline-block h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                {`Yellow Alert: Heavy Rainfall Predicted Across Several Districts on ${new Date().toLocaleDateString(
                  "en-IN",
                  { day: "2-digit", month: "long", year: "numeric" }
                )}, `}
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow ">
            {/* HEATMAP */}
            <HeatMap
              mapType={mapType}
              selectedLayer={selectedLayer}
              selectedYear={selectedYear}
            />
          </div>
        </div>

        {/* SIDEBAR COLUMN */}
        <div className="col-span-3 flex flex-col justify-between">
          {/* Vulnerability Donut/Index */}
          <div className="bg-white p-4 rounded-lg shadow-md shadow-gray-400 max-h-[36vh]">
            <h3 className=" text-center text-xs font-semibold mb-2 text-gray-800">
              {donutTitleMap[mapType]}
            </h3>
            <div className="flex justify-center">
              {SelectedDonutChart ? <SelectedDonutChart /> : null}
            </div>
          </div>
          {/* Population Chart */}
          <div className="bg-white p-3 rounded-lg shadow-md shadow-gray-400 max-h-[36vh]">
            <div>
              {SelectedPopulationChart ? <SelectedPopulationChart /> : null}
            </div>
          </div>
          {/* Blocks Chart */}
          <div className="bg-white p-3 rounded-lg shadow-md shadow-gray-400 max-h-[36vh]">
            <div>{SelectedBlocksChart ? <SelectedBlocksChart /> : null}</div>
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  );
}
