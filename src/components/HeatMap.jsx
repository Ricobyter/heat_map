const HeatMap = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow border h-full">
      {/* Map Container */}
      <div className="relative h-96 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
        {/* Geographic boundaries and regions */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
          {/* High vulnerability regions (Red) */}
          <path d="M120 60 L280 50 L320 100 L300 140 L200 150 L150 120 Z" fill="#DC2626" opacity="0.9" />
          <path d="M80 180 L180 170 L200 200 L160 220 L100 210 Z" fill="#DC2626" opacity="0.9" />

          {/* Moderate vulnerability regions (Orange) */}
          <path d="M50 80 L120 70 L140 110 L100 130 L60 120 Z" fill="#EA580C" opacity="0.8" />
          <path d="M250 160 L340 150 L360 190 L320 210 L270 200 Z" fill="#EA580C" opacity="0.8" />
          <path d="M180 220 L260 210 L280 240 L240 260 L200 250 Z" fill="#EA580C" opacity="0.8" />

          {/* Low vulnerability regions (Yellow) */}
          <path d="M300 200 L360 195 L370 230 L340 245 L310 240 Z" fill="#EAB308" opacity="0.7" />
          <path d="M50 220 L100 215 L120 245 L80 260 L55 250 Z" fill="#EAB308" opacity="0.7" />

          {/* State boundaries */}
          <path
            d="M40 40 L360 40 L360 260 L40 260 Z"
            fill="none"
            stroke="#6B7280"
            strokeWidth="2"
            strokeDasharray="5,5"
          />

          {/* Rivers */}
          <path d="M0 180 Q100 170 200 180 T400 175" fill="none" stroke="#3B82F6" strokeWidth="4" opacity="0.6" />
        </svg>

        {/* Location markers and labels */}
        <div className="absolute top-20 left-32">
          <div className="w-2 h-2 bg-black rounded-full"></div>
          <div className="text-xs font-semibold mt-1 whitespace-nowrap">Phulwari Sharif</div>
        </div>

        <div className="absolute top-16 right-24">
          <div className="w-2 h-2 bg-black rounded-full"></div>
          <div className="text-xs font-semibold mt-1">Patna</div>
        </div>

        <div className="absolute bottom-20 left-20">
          <div className="w-2 h-2 bg-black rounded-full"></div>
          <div className="text-xs font-semibold mt-1">Danapur</div>
        </div>

        {/* Additional place names scattered across the map */}
        <div className="absolute top-12 left-16 text-xs text-gray-600">Muzaffarpur</div>
        <div className="absolute top-24 right-16 text-xs text-gray-600">Begusarai</div>
        <div className="absolute bottom-16 right-20 text-xs text-gray-600">Jehanabad</div>
        <div className="absolute bottom-12 left-32 text-xs text-gray-600">Arrah</div>
      </div>

      {/* Legend */}
      <div className="flex justify-center items-center space-x-8 mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-600 rounded"></div>
          <span className="font-medium">High Vulnerability</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-orange-600 rounded"></div>
          <span className="font-medium">Moderate Vulnerability</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="font-medium">Low Vulnerability</span>
        </div>
      </div>
    </div>
  )
}

export default HeatMap
