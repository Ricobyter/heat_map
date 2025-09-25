// Sidebar1.jsx - With vulnerability index functionality
import { useState } from "react";
import { MdPublic, MdTrendingUp, MdWarning } from "react-icons/md";
import { GrVulnerability } from "react-icons/gr";

const Sidebar1 = () => {
  // Local state
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedLayer, setSelectedLayer] = useState("None");
  const [mapType, setMapType] = useState("vulnerability_index"); // Default to vulnerability_index

  const years = [["2030", "2035", "2040", "2050"]];
  const subdistricts = [
    "Athmalgola","Bakhtiyarpur","Barh","Belchhi","Bihta","Bikram","Daniyawan","Danapur",
    "Dhanarua","Dulhin Bazar","Fatwah","Ghoswari","Khusrupur","Maner","Masaurhi","Mokama",
    "Naubatpur","Paliganj","Pandarak","Patna Sadar","Phulwari Sharif","Punpun","Sampatchak",
  ];
  const layers = [
    "None","Roads","Water and Sewer Infrastructure","Settlements and Buildings","Facilities","Residential Densities",
    "Utilities and Infrastructure","BMA Agriculture","Planning","Nature","Waste Management","Point of Interest",
    "BMA Soil Type","Transportation","BMA Buildup Area","Elderly","Children","Pregnant Women","Outdoor Workers","Slum Dwellers",
  ];

  const heatRiskIcons = {
    exposure_index: <MdPublic className="w-5 h-5 text-gray-500 mr-2" />,
    sensitivity_index: <GrVulnerability className="w-5 h-5 text-gray-500 mr-2" />,
    adaptive_capacity_index: <MdTrendingUp className="w-5 h-5 text-gray-500 mr-2" />,
    vulnerability_index: <MdWarning className="w-5 h-5 text-green-600 mr-2" />, // Green icon for vulnerability
  };

  // Navigate parent window to analytics (break out of iframe)
  const redirectToAnalytics = () => {
    if (window.self !== window.top) {
      window.top.location.href = "/analytics";
    } else {
      window.location.href = "/analytics";
    }
  };

  const handleBlockChange = (selectedBlockName) => {
    setSelectedBlock(selectedBlockName);
    
    // Update iframe for block selection (this should work for vulnerability index)
    setTimeout(() => {
      const iframe = document.getElementById("heatMapIframe");
      if (iframe) {
        try {
          const currentSrc = iframe.src;
          const url = new URL(currentSrc);
          
          if (selectedBlockName) {
            url.searchParams.set("block", selectedBlockName);
          } else {
            url.searchParams.delete("block");
          }
          
          url.searchParams.set("_t", Date.now());
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

  const handleLayerChange = (selectedLayerValue) => {
    if (selectedLayerValue === "None") {
      setSelectedLayer(selectedLayerValue);
    } else {
      redirectToAnalytics();
    }
  };

  const handleScenarioClick = (yearValue) => {
    redirectToAnalytics();
  };



  const handleAssessmentClick = (assessmentKey) => {
    if (assessmentKey === "vulnerability_index") {
      setMapType(assessmentKey);
      setSelectedYear(""); // Clear year selection when vulnerability is selected
      
      // Update iframe to show vulnerability index
      setTimeout(() => {
        const iframe = document.getElementById("heatMapIframe");
        if (iframe) {
          try {
            const currentSrc = iframe.src;
            const url = new URL(currentSrc);
            url.searchParams.set("assessment", "vulnerability_index");
            url.searchParams.set("_t", Date.now());
            
            iframe.src = "about:blank";
            setTimeout(() => {
              iframe.src = url.toString();
            }, 50);
            
          } catch (error) {
            console.error("Error updating iframe src:", error);
          }
        }
      }, 100);
    } else {
      redirectToAnalytics();
    }
  };

  return (
    <div className="w-[25vw] min-h-screen shadow-md shadow-gray-400 font-noto-sans rounded-lg flex flex-col" style={{ backgroundColor: "#FFFF" }}>
      <div className="p-4 flex-grow overflow-auto">
        {/* Block Selection */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-600 mb-3">Block</label>
          <select
            className="w-full p-3 border border-gray-300 rounded text-gray-600 text-sm bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
            value={selectedBlock}
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

        {/* Layers */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-600 mb-3">Layers</label>
          <select
            className="w-full p-3 border border-gray-300 rounded text-gray-600 text-sm bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
            value={selectedLayer}
            onChange={(e) => handleLayerChange(e.target.value)}
          >
            {layers.map((layer) => (
              <option key={layer} value={layer}>
                {layer}
              </option>
            ))}
          </select>
        </div>

        {/* Heat Risk Assessment */}
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
                className={`flex items-center text-sm cursor-pointer p-2 rounded transition-colors ${
                  mapType === key 
                    ? "  " 
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="heatRiskScenario"
                  checked={mapType === key}
                  onChange={() => handleAssessmentClick(key)}
                  className="mr-3 w-4 h-4 accent-green-600"
                />
                {heatRiskIcons[key]}
                <span className={mapType === key ? "font-semibold" : ""}>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Years */}
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
                      selectedYear === yearValue ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-300"
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
            onClick={() => handleScenarioClick("2023")}
          >
            2023
          </button>
          <button
            className={`py-2 px-5 rounded-md font-medium transition-colors ${
              heatDeathYear === "2024" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleScenarioClick("2024")}
          >
            2024
          </button>
          <button
            className={`py-2 px-5 rounded-md font-medium transition-colors ${
              heatDeathYear === "2025" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleScenarioClick("2023")}
          >
            2025
          </button>
        </div>

        {/* Heatwave Data Button */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={() => handleScenarioClick("2023")}
            className="w-full bg-[#D10000] cursor-pointer hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Health Facilities
          </button>
        </div>
       
  
      </div>
      </div>
      </div>
    
  );
};

export default Sidebar1;
