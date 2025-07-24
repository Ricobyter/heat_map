import { useState } from "react";

const Sidebar = ({
  mapType,
  setMap,
  selectedYear,
  setSelectedYear,
  vulnerableGroups,
  setVulnerableGroups
}) => {
  // Local state if not received from parent — can be omitted if lifted entirely to Home
  const internalVulnerableGroups = useState({
    elderly: false,
    children: false,
    pregnantWomen: false,
    outdoorWorkers: false,
    slumDwellers: false,
  });
  const internalSelectedYear = useState("2030");

  const groups = vulnerableGroups ?? internalVulnerableGroups[0];
  const setGroups = setVulnerableGroups ?? internalVulnerableGroups[1];
  const year = selectedYear ?? internalSelectedYear[0];
  const setYear = setSelectedYear ?? internalSelectedYear[1];

  const years = [
    ["2025", "2030", "2035", "2040"],
    ["2045", "2050"],
  ];

  const subdistricts = [
    "Athamalgola", "Bakhtiarpur", "Barh", "Belchi", "Bihta", "Bikram",
    "Daniyawan", "Danapur", "Dhanarua", "Dulhin Bazar", "Fatuha", "Ghoswari",
    "Khusrupur", "Maner", "Masaurhi", "Mokama", "Naubatpur", "Paliganj",
    "Pandarak", "Patna Sadar", "Phulwarisharif", "Punpun", "Sampatchak",
  ];

  const layers = [
  "None",
  "Point of Interest",
  "Settlements and Buildings",
  "Health Facilities",
  "Water and Sewer Infrastructure",
  "Roads",
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
  "Waste Management"
];

  const handleVulnerableGroupChange = (group) => {
    setGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  const [selectedLayer, setSelectedLayer] = useState("None");


  return (
    <div className="w-[20vw] min-h-screen border-r border-gray-200" style={{ backgroundColor: "#FFFF" }}>
      <div className="p-4">
        {/* Time Period */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Time Period
          </label>
          <select className="w-full p-3 border border-gray-300 rounded text-gray-800 text-sm bg-[#F9F6EE]">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>

        {/* Subdistrict/Block */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Subdistrict/Block
          </label>
          <select className="w-full p-3 border border-gray-300 rounded text-gray-800 text-sm bg-[#F9F6EE]">
            {subdistricts.map((subdistrict) => (
              <option key={subdistrict}>{subdistrict}</option>
            ))}
          </select>
        </div>

        {/* Layers Dropdown */}
<div className="mb-6">
  <label className="block text-sm font-semibold text-gray-800 mb-3">
    Layers
  </label>
<select
  className="w-full p-3 border border-gray-300 rounded text-gray-800 text-sm bg-[#F9F6EE]"
  value={selectedLayer}
  onChange={e => setSelectedLayer(e.target.value)}
>
  {layers.map((layer) => (
    <option key={layer} value={layer}>
      {layer}
    </option>
  ))}
</select>
</div>

        {/* Vulnerable Group */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Vulnerable Group
          </label>
          <div className="space-y-3">
            {[
              { key: "elderly", label: "Elderly" },
              { key: "children", label: "Children" },
              { key: "pregnantWomen", label: "Pregnant Women" },
              { key: "outdoorWorkers", label: "Outdoor Workers" },
              { key: "slumDwellers", label: "Slum Dwellers" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center text-sm cursor-pointer text-gray-700">
                <input
                  type="checkbox"
                  checked={groups[key]}
                  onChange={() => handleVulnerableGroupChange(key)}
                  className="mr-3 w-4 h-4"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Heat Risk Scenario */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Heat Risk Indices
          </label>
          <div className="space-y-3">
            {[
              { key: "exposure_index", label: "Exposure Index" },
              { key: "sensitivity_index", label: "Sensitivity Index" },
              { key: "adaptive_capacity_index", label: "Adaptive Capacity Index" },
              { key: "vulnerability_index", label: "Vulnerability Index" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center text-sm cursor-pointer text-gray-700">
                <input
                  type="checkbox"
                  name="heatRiskScenario"
                  checked={(mapType ?? "vulnerability_index") === key}
                  onChange={() => setMap(key)}
                  className="mr-3 w-4 h-4"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* SSP Scenario */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Heat Risk Scenario
          </label>
          <select className="w-full p-3 border border-gray-300 rounded text-gray-800 text-sm bg-[#F9F6EE] mb-4">
            <option>Select Year</option>
          </select>
          <div className="space-y-2">
            {years.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-4 gap-2">
                {row.map((yearValue) => (
                  <button
                    key={yearValue}
                    onClick={() => setYear(yearValue)}
                    className={`py-2 px-1 text-xs font-medium rounded ${
                      year === yearValue
                        ? "bg-green-600 text-[#F9F6EE]"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {yearValue}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Run Simulation Button */}
        <div className="mt-8">
          <button className="w-full bg-green-600 text-[#F9F6EE] py-3 px-4 rounded font-semibold hover:bg-green-700 transition-colors">
            Run Simulation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
