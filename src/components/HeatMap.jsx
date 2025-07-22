import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import compass from '../assets/compass2.png'

const HeatMap = ({ mapType }) => {
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

  const src = mapSrcs[mapType] || "/vulnerability_index.html";
  const title = mapName[mapType] || "Heat Vulnerability Map";
  return (
    <div className="bg-#F9F6EE pt-6 rounded-lg shadow border h-full">
      <div className="relative h-96 rounded-lg overflow-hidden border border-gray-200">
        <iframe
          src={src}
          title="Interactive Heat Map"
          style={{ width: "100%", height: "100%", border: "none" }}
        ></iframe>
      </div>
      {/* Legend */}
      
      <div className="flex justify-around items-center text-sm">
        <div className="pr-4 border-r-2 border-gray-900">
          <div className="text-sm text-black">
            <div className="font-semibold ">
              Population Density (2025)
              <br />
              per sq.km:
            </div>
            <div className="grid grid-cols-2 gap-y-2 gap-x-6">
              {legendItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span
                    className={`inline-block rounded-full bg-[#4B1E1E] ${item.size}`}
                  ></span>
                  <span>{item.density}</span>
                </div>
              ))}
            </div>
          </div>
        </div>


          
        
        <div className="flex flex-col items-center justify-center space-y-4">

          <div>
            <h1 className="text-xl font-semibold ">
              {title}
            </h1>
          </div>

        
        <div className="flex flex-row text-xs space-x-2 ">
          <div className="flex flex-col items-center space-y-1 ">
            <span className="font-medium">High</span>
            <div className="w-20 h-6 bg-[#ed0900] rounded-sm"></div>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <span className="font-medium">Medium</span>
            <div className="w-20 h-6 bg-[#f5a319] rounded"></div>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <span className="font-medium">Low Heat</span>
            <div className="w-20 h-6 bg-[#ecc1aa] rounded"></div>
          </div>
        </div>

        </div>



        <div className="flex items-center justify-center ">
          <div className="pl-2  border-l-2 border-gray-900">

          
          <img src={compass} alt="" className="h-32"/>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeatMap;
