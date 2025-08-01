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
    <div className="bg-#F9F6EE pt-6 rounded-lg shadow border h-full w-[65vw]">
      <div className="relative h-96  rounded-lg overflow-hidden border border-gray-200">
        <iframe
          src={src}
          title="Interactive Heat Map"
          style={{ width: "100%", height: "100%", border: "none" }}
        ></iframe>
      </div>
      {/* Legend */}

      <div className="flex justify-around items-center text-sm">
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
      </div>
    </div>
  );
};

export default HeatMap;
