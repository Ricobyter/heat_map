import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"

const HeatMap = ({mapType}) => {
    const mapSrcs = {
    exposure_index: "/exposure_index.html",
    vulnerability_index: "/vulnerability_index.html",
    sensitivity_index: "/sensitivity_index.html",
    adaptive_capacity_index: "/adaptive_capacity_index.html",
  };

  const src = mapSrcs[mapType] || "/exposure_index.html";
  return (
    <div className="bg-#F9F6EE p-6 rounded-lg shadow border h-full">
      <div className="relative h-96 rounded-lg overflow-hidden border border-gray-200">
        <iframe
          src={src}
          title="Interactive Heat Map"
          style={{ width: "100%", height: "100%", border: "none" }}
        ></iframe>
      </div>
      {/* Legend */}
      <div className="flex justify-center items-center space-x-8 mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-4 bg-[#ed0900] rounded"></div>
          <span className="font-medium">High Heat</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-10 h-4 bg-[#f5a319] rounded"></div>
          <span className="font-medium">Moderate Heat</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-10 h-4 bg-[#ecc1aa] rounded"></div>
          <span className="font-medium">Low Heat</span>
        </div>
      </div>
    </div>
  )
}

export default HeatMap
