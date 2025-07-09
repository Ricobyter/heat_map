import { MapContainer, TileLayer, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet.heat"
import { useEffect } from "react"

// Example heatmap data: [lat, lng, intensity]
const heatmapPoints = [
  [25.5941, 85.1376, 0.9], // Patna
  [25.6022, 85.1194, 0.8], // Phulwari Sharif
  [25.6394, 85.0470, 0.7], // Danapur
  [25.4697, 85.0122, 0.6], // Arrah
  [26.1226, 85.3906, 0.5], // Muzaffarpur
  [25.4186, 86.1336, 0.5], // Begusarai
  [25.2132, 84.9869, 0.4], // Jehanabad
]

function HeatmapLayer({ points }) {
  const map = useMap()
  useEffect(() => {
    // Dynamically import leaflet.heat
    import("leaflet.heat").then(() => {
      const heatLayer = window.L.heatLayer(points, {
        radius: 30,
        blur: 25,
        maxZoom: 12,
        gradient: {
          0.4: "#fde047",   // Low Heat (yellow-500)
          0.7: "#f59e42",   // Moderate Heat (orange-600)
          1.0: "#dc2626"    // High Heat (red-600)
        }
      }).addTo(map)
      return () => {
        map.removeLayer(heatLayer)
      }
    })
  }, [map, points])
  return null
}

const HeatMap = () => {
  return (
    <div className="bg-#F9F6EE p-6 rounded-lg shadow border h-full">
      <div className="relative h-96 rounded-lg overflow-hidden border border-gray-200">
        <MapContainer
          center={[25.5941, 85.1376]} // Centered on Patna, Bihar
          zoom={8}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <HeatmapLayer points={heatmapPoints} />
        </MapContainer>
      </div>
      {/* Legend */}
      <div className="flex justify-center items-center space-x-8 mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-600 rounded"></div>
          <span className="font-medium">High Heat</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-orange-600 rounded"></div>
          <span className="font-medium">Moderate Heat</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="font-medium">Low Heat</span>
        </div>
      </div>
    </div>
  )
}

export default HeatMap
