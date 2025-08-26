// import { useState } from "react";
// import { MdPublic, MdFavorite, MdTrendingUp, MdWarning } from 'react-icons/md';
// import { GrVulnerability } from "react-icons/gr";

// const Sidebar = ({
//   mapType,
//   setMap,
//   selectedYear,
//   setSelectedYear,
//   vulnerableGroups,
//   setVulnerableGroups,
//   selectedLayer,
//   setSelectedLayer
// }) => {
//   // Local state if not received from parent — can be omitted if lifted entirely to Home
//   const internalVulnerableGroups = useState({
//     elderly: false,
//     children: false,
//     pregnantWomen: false,
//     outdoorWorkers: false,
//     slumDwellers: false,
//   });
//   const internalSelectedYear = useState("2030");

//   const groups = vulnerableGroups ?? internalVulnerableGroups[0];
//   const setGroups = setVulnerableGroups ?? internalVulnerableGroups[1];
//   const year = selectedYear ?? internalSelectedYear;
//   const setYear = setSelectedYear ?? internalSelectedYear[1];

//   const years = [
//     ["2025", "2030", "2035", "2040"],
//     ["2050"],
//   ];

//   const subdistricts = [
//     "Athamalgola",
//     "Bakhtiarpur",
//     "Barh",
//     "Belchi",
//     "Bihta",
//     "Bikram",
//     "Daniyawan",
//     "Danapur",
//     "Dhanarua",
//     "Dulhin Bazar",
//     "Fatuha",
//     "Ghoswari",
//     "Khusrupur",
//     "Maner",
//     "Masaurhi",
//     "Mokama",
//     "Naubatpur",
//     "Paliganj",
//     "Pandarak",
//     "Patna Sadar",
//     "Phulwarisharif",
//     "Punpun",
//     "Sampatchak",
//   ];

//   const layers = [
//     "None",
//     "Point of Interest",
//     "Settlements and Buildings",
//     "Health Facilities",
//     "Water and Sewer Infrastructure",
//     "Roads",
//     "Facilities",
//     "Residential Densities",
//     "Solid Waste",
//     "BMA Buildup Area",
//     "BMA Soil Type",
//     "BMA Agriculture",
//     "Utilities and Infrastructure",
//     "Transportation",
//     "Planning",
//     "Nature",
//     "Waste Management",
//   ];

//   const heatRiskIcons = {
//     exposure_index: <MdPublic className="w-5 h-5 text-gray-600 mr-2" />,
//     sensitivity_index: <GrVulnerability className="w-5 h-5 text-gray-600 mr-2" />,
//     adaptive_capacity_index: <MdTrendingUp className="w-5 h-5 text-gray-600 mr-2" />,
//     vulnerability_index: <MdWarning className="w-5 h-5 text-gray-600 mr-2" />
//   };

//   const handleVulnerableGroupChange = (group) => {
//     setGroups((prev) => ({
//       ...prev,
//       [group]: !prev[group],
//     }));
//   };

//   return (
//     <div
//       className="w-[25vw] min-h-screen shadow-md shadow-gray-400 font-noto-sans rounded-lg flex flex-col"
//       style={{ backgroundColor: "#FFFF" }}
//     >
//       <div className="p-4 flex-grow overflow-auto">
//         {/* Time Period */}
//         <div className="mb-6">
//           <label className="block text-sm font-semibold text-gray-600 mb-3">
//             Time Period
//           </label>
//           <select className="w-full p-3 border border-gray-300 rounded text-gray-600 text-sm bg-white">
//             <option>Today</option>
//             <option>This Week</option>
//             <option>This Month</option>
//           </select>
//         </div>

//         {/* Subdistrict/Block */}
//         <div className="mb-6">
//           <label className="block text-sm font-semibold text-gray-600 mb-3">
//             Subdistrict/Block
//           </label>
//           <select className="w-full p-3 border border-gray-300 rounded text-gray-600 text-sm bg-white">
//             {subdistricts.map((subdistrict) => (
//               <option key={subdistrict}>{subdistrict}</option>
//             ))}
//           </select>
//         </div>

//         {/* Layers Dropdown */}
//         <div className="mb-6">
//           <label className="block text-sm font-semibold text-gray-600 mb-3">
//             Layers
//           </label>
//           <select
//             className="w-full p-3 border border-gray-300 rounded text-gray-600 text-sm bg-white"
//             value={selectedLayer}
//             onChange={(e) => setSelectedLayer(e.target.value)}
//           >
//             {layers.map((layer) => (
//               <option key={layer} value={layer}>{layer}</option>
//             ))}
//           </select>
//         </div>

//         {/* Heat Risk Scenario */}
//         <div className="mb-8">
//           <label className="block text-sm font-semibold text-gray-600 mb-3">
//             Heat Risk Indices
//           </label>
//           <div className="space-y-3">
//             {[
//               { key: "exposure_index", label: "Exposure Index" },
//               { key: "sensitivity_index", label: "Sensitivity Index" },
//               {
//                 key: "adaptive_capacity_index",
//                 label: "Adaptive Capacity Index",
//               },
//               { key: "vulnerability_index", label: "Vulnerability Index" },
//             ].map(({ key, label }) => (
//               <label
//                 key={key}
//                 className="flex items-center text-sm cursor-pointer text-gray-700"
//               >
//                 <input
//                   type="checkbox"
//                   name="heatRiskScenario"
//                   checked={(mapType ?? "vulnerability_index") === key}
//                   onChange={() => setMap(key)}
//                   className="mr-3 w-4 h-4"
//                 />
//                 {heatRiskIcons[key]}
//                 {label}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Vulnerable Group */}
//         <div className="mb-6">
//           <label className="block text-sm font-semibold text-gray-600 mb-3">
//             Vulnerable Group
//           </label>
//           <div className="space-y-3">
//             {[
//               { key: "elderly", label: "Elderly" },
//               { key: "children", label: "Children" },
//               { key: "pregnantWomen", label: "Pregnant Women" },
//               { key: "outdoorWorkers", label: "Outdoor Workers" },
//               { key: "slumDwellers", label: "Slum Dwellers" },
//             ].map(({ key, label }) => (
//               <label
//                 key={key}
//                 className="flex items-center text-sm cursor-pointer text-gray-700"
//               >
//                 <input
//                   type="checkbox"
//                   checked={groups[key]}
//                   onChange={() => handleVulnerableGroupChange(key)}
//                   className="mr-3 w-4 h-4"
//                 />

//                 {label}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* SSP Scenario */}
//         <div className="mb-8">
//           <label className="block text-sm font-semibold text-gray-600 mb-3">
//             Heat Risk Scenario
//           </label>
//           <select className="w-full p-3 border border-gray-300 rounded text-gray-600 text-sm bg-white mb-4">
//             <option>Select Year</option>
//           </select>
//           <div className="space-y-2">
//             {years.map((row, rowIndex) => (
//               <div key={rowIndex} className="grid grid-cols-4 gap-2">
//                 {row.map((yearValue) => (
//                   <button
//                     key={yearValue}
//                     onClick={() => setYear(yearValue)}
//                     className={`py-2 px-1 text-xs font-medium rounded ${
//                       year === yearValue
//                         ? "bg-green-600 text-white"
//                         : "bg-gray-200 text-gray-600 hover:bg-gray-300"
//                     }`}
//                   >
//                     {yearValue}
//                   </button>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
      
//       {/* Run Simulation Button at the bottom */}
//       <div className="p-4">
//         <button className="w-full bg-blue-200 border border-blue-700 py-3 px-4 rounded text-blue-700 font-semibold hover:bg-blue-300 transition-colors cursor-pointer">
//           Run Simulation
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import { useState } from "react";
import { MdPublic, MdTrendingUp, MdWarning } from 'react-icons/md';
import { GrVulnerability } from "react-icons/gr";

const Sidebar = ({
  mapType,
  setMap,
  selectedYear,
  setSelectedYear,
  vulnerableGroups,
  setVulnerableGroups,
  selectedLayer,
  setSelectedLayer
}) => {
  // Local fallback state (only used if parent doesn't control these)
  const internalVulnerableGroups = useState({
    elderly: false,
    children: false,
    pregnantWomen: false,
    outdoorWorkers: false,
    slumDwellers: false,
  });
  const internalSelectedYear = useState("2025");

  // Controlled or fallback state wiring
  const groups = vulnerableGroups ?? internalVulnerableGroups[0];
  const setGroups = setVulnerableGroups ?? internalVulnerableGroups[1];

  // Correctly read the value part of the internal tuple
  const [fallbackYear, setFallbackYear] = internalSelectedYear;
  const year = typeof selectedYear === "string" ? selectedYear : fallbackYear;
  const setYear = typeof setSelectedYear === "function" ? setSelectedYear : setFallbackYear;

  const years = [
    ["2025", "2030", "2035", "2040"],
    ["2050"],
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

  const layers = [
    "None",
    "Roads",
    "Water and Sewer Infrastructure",
    "Health Facilities",
    "Point of Interest",
    "Settlements and Buildings",
    "Facilities",
    "Residential Densities",
    "Solid Waste",
    "BMA Buildup Area",
    "BMA Soil Type",
    "BMA Agriculture",
    "Utilities and Infrastructure",
    "Transportation",
    "Planning",
    "Nature",
    "Waste Management",
    "Elderly",
    "Children",
    "Pregnant Women",
    "Outdoor Workers",
    "Slum Dwellers"
  ];

  const heatRiskIcons = {
    exposure_index: <MdPublic className="w-5 h-5 text-gray-600 mr-2" />,
    sensitivity_index: <GrVulnerability className="w-5 h-5 text-gray-600 mr-2" />,
    adaptive_capacity_index: <MdTrendingUp className="w-5 h-5 text-gray-600 mr-2" />,
    vulnerability_index: <MdWarning className="w-5 h-5 text-gray-600 mr-2" />
  };



  return (
    <div
      className="w-[25vw] min-h-screen shadow-md shadow-gray-400 font-noto-sans rounded-lg flex flex-col"
      style={{ backgroundColor: "#FFFF" }}
    >
      <div className="p-4 flex-grow overflow-auto">
        {/* Time Period */}


        {/* Block */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-600 mb-3">
            Block
          </label>
          <select className="w-full p-3 border border-gray-300 rounded text-gray-600 text-sm bg-white">
            {subdistricts.map((subdistrict) => (
              <option key={subdistrict}>{subdistrict}</option>
            ))}
          </select>
        </div>

        {/* Layers Dropdown */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-600 mb-3">
            Layers
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded text-gray-600 text-sm bg-white"
            value={selectedLayer}
            onChange={(e) => setSelectedLayer(e.target.value)}
          >
            {layers.map((layer) => (
              <option key={layer} value={layer}>{layer}</option>
            ))}
          </select>
        </div>

        {/* Heat Risk Indices */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-600 mb-3">
            Heat Risk Assessment
          </label>
          <div className="space-y-3">
            {[
              { key: "exposure_index", label: "Exposure Index" },
              { key: "sensitivity_index", label: "Sensitivity Index" },
              { key: "adaptive_capacity_index", label: "Adaptive Capacity Index" },
              { key: "vulnerability_index", label: "Vulnerability Index" },
            ].map(({ key, label }) => (
              <label
                key={key}
                className="flex items-center text-sm cursor-pointer text-gray-700"
              >
                {/* Use radio for single selection */}
                <input
                  type="radio"
                  name="heatRiskScenario"
                  checked={(mapType ?? "vulnerability_index") === key}
                  onChange={() => setMap(key)}
                  className="mr-3 w-4 h-4"
                />
                {heatRiskIcons[key]}
                {label}
              </label>
            ))}
          </div>
        </div>


        {/* SSP Scenario (Year) */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-600 mb-3">
            Heat Risk Scenario
          </label>
          <div className="space-y-2">
            {years.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-4 gap-2">
                {row.map((yearValue) => (
                  <button
                    key={yearValue}
                    onClick={() => setYear(yearValue)}
                    className={`py-2 px-1 text-xs font-medium rounded ${
                      year === yearValue
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    {yearValue}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Run Simulation Button at the bottom */}
      <div className="p-4">
        <button className="w-full bg-[#E2ECF4] border border-[#007CDB] py-3 px-4 rounded text-[#007CDB] font-semibold hover:bg-blue-300 transition-colors cursor-pointer">
          Run Simulation
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
