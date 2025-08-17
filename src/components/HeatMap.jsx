import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import compass from "../assets/compass2.png";

const HeatMap = ({ mapType, selectedLayer }) => {
  const mapSrcs = {
    exposure_index: "/exposure_index.html",
    vulnerability_index: "/vulnerability_index.html",
    sensitivity_index: "/sensitivity_index.html",
    adaptive_capacity_index: "/adaptive_capacity_index.html",
  };

  const mapName = {
    exposure_index: "Heat Exposure Map",
    vulnerability_index: "Heat Vulnerability Map",
    sensitivity_index: "Heat Sensitivity Map",
    adaptive_capacity_index: "Adaptive Capacity Map",
  };

  const legendItems = [
    { density: "≤ 929", size: "w-2 h-2" },
    { density: "≤ 1683", size: "w-2 h-2" },
    { density: "≤ 2299", size: "w-3 h-3" },
    { density: "≤ 4131", size: "w-3 h-3" },
    { density: "≤ 16327", size: "w-4 h-4" },
  ];

    // Adjust the source for the iframe:
  let src;
  if (selectedLayer === "Health Facilities") {
    src = "/exposure_index_health_facilities.html";
  } else {
    src = mapSrcs[mapType] || "/vulnerability_index.html";
  }
    const title =
    selectedLayer === "Health Facilities"
      ? "Health Facilities Map"
      : mapName[mapType] || "Heat Vulnerability Map";
  return (
    <div className="bg-#F9F6EE pt-0 rounded-lg shadow-md shadow-gray-400  h-full w-full font-roboto">
      <div className="relative h-120  rounded-lg overflow-hidden border border-gray-200">
        <iframe
          src={src}
          title="Interactive Heat Map"
          style={{ width: "100%", height: "100%", border: "none" }}
        ></iframe>
      </div>
      {/* Legend */}

      {/* <div className="flex justify-around items-center text-sm">
        <div className="px-4 border-r-2 border-gray-900">
          <div className="text-sm text-black">
            <div className="font-semibold ">
              Population Density (2025) / km^2:
            </div>
            <div className="grid grid-cols-2 gap-y-0.5 gap-x-6 text-xs">
              {legendItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <span
                    className={`inline-block rounded-full bg-[#4B1E1E] ${item.size}`}
                  ></span>
                  <span>{item.density}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4  ">
          <div>
            <h1 className="text-lg font-semibold ">{title}</h1>
          </div>

          <div className="flex flex-row text-xs space-x-2 px-2 ">
            <div className="flex flex-col items-center space-y-1 ">
              <span className="font-medium">High</span>
              <div
                className={`w-14 h-6 rounded-sm ${
                  mapType === "adaptive_capacity_index"
                    ? "bg-[#a1d885]"
                    : "bg-[#ed0900]"
                }`}
              ></div>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="font-medium">Medium</span>
              <div
                className={`w-14 h-6 rounded ${
                  mapType === "adaptive_capacity_index"
                    ? "bg-[#d6f5be]"
                    : "bg-[#f5a319]"
                }`}
              ></div>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="font-medium">Low</span>
              <div
                className={`w-14 h-6 rounded shadow-sm ${
                  mapType === "adaptive_capacity_index"
                    ? "bg-[#b7c6b0]"
                    : mapType === "vulnerability_index"
                    ? "bg-[#f2f3d0]"
                    : "bg-[#ecc1aa]"
                }`}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center ">
          <div className="pl-2  border-l-2 border-gray-900">
            <img src={compass} alt="" className="h-28" />
          </div>
        </div>
      </div> */}

          <div className="bg-white px-6 py-4 rounded-md">
      {/* Main Header Container */}
      <div className="flex justify-between items-start">
        
        {/* Left Section */}
        <div className="flex-1 pr-8">
          {/* Map Title and Legend */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
              
              {/* Vulnerability Legend - Right aligned */}
<div className="flex flex-row text-xs space-x-2 px-2">
                <div className="flex flex-col items-center space-y-1">
                  <span className="font-medium">High</span>
                  <div
                    className={`w-6 h-6 rounded-full ${
                      mapType === "adaptive_capacity_index"
                        ? "bg-[#a1d885]"
                        : "bg-[#ed0900]"
                    }`}
                  ></div>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <span className="font-medium">Medium</span>
                  <div
                    className={`w-6 h-6 rounded-full ${
                      mapType === "adaptive_capacity_index"
                        ? "bg-[#d6f5be]"
                        : "bg-[#f5a319]"
                    }`}
                  ></div>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <span className="font-medium">Low</span>
                  <div
                    className={`w-6 h-6 rounded-full shadow-sm ${
                      mapType === "adaptive_capacity_index"
                        ? "bg-[#b7c6b0]"
                        : mapType === "vulnerability_index"
                        ? "bg-[#f2f3d0]"
                        : "bg-[#ecc1aa]"
                    }`}
                  ></div>
                </div>
              </div>
            
            </div>

            {/* Population Density */}
            <div className="mb-6">
              <p className="text-gray-600 text-sm mb-2">Population Density (2025) / km²:</p>
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-900 rounded-full"></div>
                  <span className="text-sm text-gray-600">≤ 929</span>
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-1.75 h-1.75 bg-red-900 rounded-full"></div>
                  <span className="text-sm text-gray-600">≤ 1683</span>
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-900 rounded-full"></div>
                  <span className="text-sm text-gray-600">≤ 2299</span>
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-red-900 rounded-full"></div>
                  <span className="text-sm text-gray-600">≤ 4131</span>
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-900 rounded-full"></div>
                  <span className="text-sm text-gray-600">≤ 16327</span>
                </span>
              </div>
            </div>

            {/* Divider Line */}
            <div className="border-b border-gray-300 mb-6"></div>

            {/* Advisory Section */}
            <div className="flex items-start gap-4">
              {/* Yellow Advisory Card */}
              <div className="bg-yellow-200 border-2 border-yellow-400 rounded-lg p-3 flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-yellow-300 rounded">
                  <svg className="w-5 h-5 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-800">Heatwave</div>
                  <div className="text-gray-700">Advisories</div>
                </div>
              </div>

              {/* Advisory Text */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">
                  Elderly <span className="text-orange-600">(Orange Alert)</span>
                </h3>
                <p className="text-sm text-gray-700">
                  Drink 2-3L water daily, visit cooling shelters. BSDMA Helpline: 0612-2547232
                </p>
              </div>
            </div>

            {/* Blue info box */}

          </div>
        </div>

        {/* Right Section - Recommendations */}
        <div className="bg-blue-100 rounded-lg shadow-sm p-4 min-w-[280px]">
          <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">Recommendations</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium transition-colors">
              Preparedness
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium transition-colors">
              Response
            </button>
          </div>
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium transition-colors">
            Recovery
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HeatMap;
