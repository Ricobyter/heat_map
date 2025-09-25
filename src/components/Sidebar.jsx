import { useState, useEffect } from "react";
import { MdPublic, MdTrendingUp, MdWarning } from "react-icons/md";
import { GrVulnerability } from "react-icons/gr";
import HeatwaveData from "./HeatwaveData";

const Sidebar = ({
  mapType,
  setMap,
  selectedYear,
  setSelectedYear,
  vulnerableGroups,
  setVulnerableGroups,
  selectedLayer,
  setSelectedLayer,
  selectedBlock,
  setSelectedBlock,
  onBlockSelect,
  heatDeathYear,
  setHeatDeathYear,
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
  const internalSelectedBlock = useState("");

  const groups = vulnerableGroups ?? internalVulnerableGroups[0];
  const setGroups = setVulnerableGroups ?? internalVulnerableGroups[1];

  const [fallbackYear, setFallbackYear] = internalSelectedYear;
  const year = typeof selectedYear === "string" ? selectedYear : fallbackYear;
  const setYear =
    typeof setSelectedYear === "function" ? setSelectedYear : setFallbackYear;

  const [fallbackBlock, setFallbackBlock] = internalSelectedBlock;
  const block =
    typeof selectedBlock === "string" ? selectedBlock : fallbackBlock;
  const setBlock =
    typeof setSelectedBlock === "function" ? setSelectedBlock : setFallbackBlock;

      const internalHeatDeathYearState = useState("");
  const heatYear = heatDeathYear ?? internalHeatDeathYearState[0];
  const setHeatYear = typeof setHeatDeathYear === "function" ? setHeatDeathYear : internalHeatDeathYearState[1];

  // Modal state for Heatwave Data
  const [isHeatwaveDataModalOpen, setIsHeatwaveDataModalOpen] = useState(false);

  const years = [["2030", "2035", "2040", "2050"]];

  const subdistricts = [
    "Athmalgola","Bakhtiyarpur","Barh","Belchhi","Bihta","Bikram","Daniyawan","Danapur",
    "Dhanarua","Dulhin Bazar","Fatwah","Ghoswari","Khusrupur","Maner","Masaurhi","Mokama",
    "Naubatpur","Paliganj","Pandarak","Patna Sadar","Phulwari Sharif","Punpun","Sampatchak",
  ];

  const layers = [
    "None","Roads","Water and Sewer Infrastructure",
    
    "Settlements and Buildings","Facilities","Residential Densities",
    "Utilities and Infrastructure",
    "BMA Agriculture",
    "Planning",
    "Nature",
    "Waste Management",
    

  ];

  const heatRiskIcons = {
    exposure_index: <MdPublic className="w-5 h-5 text-gray-500 mr-2" />,
    sensitivity_index: <GrVulnerability className="w-5 h-5 text-gray-500 mr-2" />,
    adaptive_capacity_index: <MdTrendingUp className="w-5 h-5 text-gray-500 mr-2" />,
    vulnerability_index: <MdWarning className="w-5 h-5 text-gray-500 mr-2" />,
  };

  // Modal component for Heatwave Data
  const Modal = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
      if (!isOpen) return;
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-[9999] p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full h-[90vh] overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 cursor-pointer hover:text-gray-700 text-3xl font-light hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            >
              ×
            </button>
          </div>
          <div className="overflow-y-auto h-[calc(90vh-88px)] bg-gray-50">{children}</div>
        </div>
      </div>
    );
  };

  const handleBlockChange = (selectedBlockName) => {
    setBlock(selectedBlockName);
    if (onBlockSelect && typeof onBlockSelect === "function") {
      onBlockSelect(selectedBlockName);
    }

    // Always update iframe - either zoom to block or reset to normal view
    setTimeout(() => {
      const iframe = document.getElementById("heatMapIframe");
      if (iframe) {
        try {
          const currentSrc = iframe.src;
          const url = new URL(currentSrc);
          
          if (selectedBlockName) {
            // Zoom to selected block
            url.searchParams.delete("block");
            url.searchParams.set("block", selectedBlockName);
          } else {
            // Reset to normal view - remove block parameter
            url.searchParams.delete("block");
          }
          
          // Add cache buster to force reload
          url.searchParams.set("_t", Date.now());
          
          // Force reload by setting src twice - this ensures proper reload
          iframe.src = "about:blank";
          setTimeout(() => {
            iframe.src = url.toString();
          }, 50);
          
        } catch (error) {
          console.error("Error updating iframe src:", error);
        }
      }
    }, 100);
  };

  // Handle Heat Risk Scenario button click - clears Heat Risk Assessment
  const handleScenarioClick = (yearValue) => {
    setYear(yearValue);
    // Clear any selected Heat Risk Assessment
    if (typeof setMap === "function") {
      setMap(""); // or setMap("") - whatever represents "no selection"
    }
    setBlock("")
    setHeatDeathYear("") 
  };

  // Handle Heat Risk Assessment radio click - clears Heat Risk Scenario
  const handleAssessmentClick = (assessmentKey) => {
    if (typeof setMap === "function") {
      setMap(assessmentKey);
    }
    // Clear Heat Risk Scenario selection - reset to default/initial state
    setYear("");
    setBlock("")
    setHeatDeathYear("") // or whatever your default/initial year should be
  };



  return (
    <div className="w-[25vw] min-h-screen shadow-md shadow-gray-400 font-noto-sans rounded-lg flex flex-col" style={{ backgroundColor: "#FFFF" }}>
      <div className="p-4 flex-grow overflow-auto">
        {/* Block Selection */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-600 mb-3">Block</label>
          <select
            className="w-full p-3 border border-gray-300 rounded text-gray-600 text-sm bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
            value={block}
            onChange={(e) => handleBlockChange(e.target.value)}
          >
            <option value="">Select a block...</option>
            {subdistricts.map((subdistrict) => (
              <option key={subdistrict} value={subdistrict}>
                {subdistrict}
              </option>
            ))}
          </select>
        </div>

        {/* Layers Dropdown */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-600 mb-3">Layers</label>
          <select
            className="w-full p-3 border border-gray-300 rounded text-gray-600 text-sm bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
            value={selectedLayer}
              onChange={(e) => {
    setSelectedLayer(e.target.value);
    setBlock("");
  }}
          >
            {layers.map((layer) => (
              <option key={layer} value={layer}>
                {layer}
              </option>
            ))}
          </select>
        </div>

        {/* Heat Risk Indices */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-600 mb-3">Heat Risk Assessment</label>
          <div className="space-y-3">
            {[
              { key: "exposure_index", label: "Exposure Index" },
              { key: "sensitivity_index", label: "Sensitivity Index" },
              { key: "adaptive_capacity_index", label: "Adaptive Capacity Index" },
              { key: "vulnerability_index", label: "Heat Vulnerability Index" },
            ].map(({ key, label }) => (
              <label
                key={key}
                className="flex items-center text-sm cursor-pointer text-gray-700 hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="radio"
                  name="heatRiskScenario"
                  checked={mapType === key}
                  onChange={() => handleAssessmentClick(key)}
                  className="mr-3 w-4 h-4 accent-green-700"
                />
                
                {heatRiskIcons[key]}
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* SSP Scenario (Year) */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-600 mb-3">Heat Risk Scenario</label>
          <div className="space-y-2">
            {years.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-2 gap-2">
                {row.map((yearValue) => (
                  <button
                    key={yearValue}
                    onClick={() => handleScenarioClick(yearValue)}
                    className={`py-3 px-2 text-md font-medium rounded-md transition-colors ${
                      year === yearValue ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    {yearValue}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
        <h3 className="block text-sm font-bold text-gray-600 mb-3">Heat Wave Related Patient Data</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            className={`py-2 px-5 rounded-md font-medium transition-colors ${
              heatDeathYear === "2023" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => {setHeatYear("2023");
        setBlock("");
        setMap("");
        setYear("");
        setSelectedLayer("None");}}
          >
            2023
          </button>
          <button
            className={`py-2 px-5 rounded-md font-medium transition-colors ${
              heatDeathYear === "2024" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => {setHeatYear("2024");
        setBlock("");
        setMap("");
        setYear("");
        setSelectedLayer("None");
      }}
          >
            2024
          </button>
          <button
            className={`py-2 px-5 rounded-md font-medium transition-colors ${
              heatDeathYear === "2025" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => {setHeatYear("2025");
        setBlock("");
        setMap("");
        setYear("");
        setSelectedLayer("None");
      }}
          >
            2025
          </button>
        </div>

        {/* Heatwave Data Button */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={() => setIsHeatwaveDataModalOpen(true)}
            className="w-full bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Heatwave Data
          </button>
        </div>
       
  
      </div>
      </div>

      {/* Heatwave Data Modal */}
      <Modal
        isOpen={isHeatwaveDataModalOpen}
        onClose={() => setIsHeatwaveDataModalOpen(false)}
        title="Heat Wave Prevention Action Plan - Patna District 2025"
      >
        <HeatwaveData />
      </Modal>

    </div>
  );
};

export default Sidebar;

