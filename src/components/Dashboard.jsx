import HeatMap from "./HeatMap"

const Dashboard = () => {
  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Risk Assessment and Scenario Simulator Buttons */}
      <div className="flex items-center space-x-4 mb-6">
        <button className="bg-green-600 text-white py-3 px-6 rounded font-semibold hover:bg-green-700 transition-colors">
          Risk Assessment
        </button>
        <button className="bg-gray-400 text-white py-3 px-6 rounded font-semibold hover:bg-gray-500 transition-colors">
          Scenario Simulator
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Heat Map - Large */}
        <div className="col-span-7">
          <HeatMap />
        </div>

        {/* Statistics Cards */}
        <div className="col-span-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow border text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">68</div>
              <div className="text-sm text-gray-600 font-medium">Heatwave Days</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">7</div>
              <div className="text-sm text-gray-600 font-medium">
                Heat-Related
                <br />
                Mortality Rate
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow border text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">93%</div>
              <div className="text-sm text-gray-600 font-medium">
                Households Lacking
                <br />
                Air Conditioning
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">1</div>
              <div className="text-sm text-gray-600 font-medium">Cooling Centres</div>
            </div>
          </div>
        </div>

        {/* Heat Vulnerability by Area Chart */}
        <div className="col-span-4 bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Heat Vulnerability by Area</h3>
          <div className="flex items-end justify-between space-x-2 h-40">
            {[
              { height: 85, color: "bg-blue-500" },
              { height: 75, color: "bg-blue-500" },
              { height: 90, color: "bg-blue-500" },
              { height: 65, color: "bg-cyan-400" },
              { height: 70, color: "bg-teal-400" },
              { height: 60, color: "bg-green-400" },
            ].map((bar, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className={`w-full rounded-t ${bar.color}`} style={{ height: `${bar.height}%` }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal Temperature Anomaly */}
        <div className="col-span-4 bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Seasonal Temperature Anomaly</h3>
          <div className="h-40 flex items-center justify-center relative">
            <svg className="w-full h-full" viewBox="0 0 300 150">
              <defs>
                <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              <polyline
                fill="none"
                stroke="url(#tempGradient)"
                strokeWidth="3"
                points="20,120 60,100 100,80 140,85 180,70 220,75 260,60"
              />
              <circle cx="20" cy="120" r="4" fill="#3B82F6" />
              <circle cx="60" cy="100" r="4" fill="#3B82F6" />
              <circle cx="100" cy="80" r="4" fill="#3B82F6" />
              <circle cx="140" cy="85" r="4" fill="#3B82F6" />
              <circle cx="180" cy="70" r="4" fill="#10B981" />
              <circle cx="220" cy="75" r="4" fill="#10B981" />
              <circle cx="260" cy="60" r="4" fill="#10B981" />
            </svg>
          </div>
        </div>

        {/* Heatwave Threshold Analysis */}
        <div className="col-span-4 bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Heatwave Threshold Analysis</h3>
          <div className="text-sm text-gray-600 mb-2">Select Block</div>
          <select className="w-full p-2 border rounded mb-4 text-sm">
            <option>Phulwari Sharif</option>
          </select>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#EF4444"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="188"
                  strokeDashoffset="50"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">44°C</span>
              </div>
            </div>
          </div>
        </div>

        {/* Heat Risk Mitigation Strategies */}
        <div className="col-span-4 bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Heat Risk Mitigation Strategies</h3>
          <div className="text-sm text-gray-600 mb-2">Select Block</div>
          <select className="w-full p-2 border rounded mb-4 text-sm">
            <option>Phulwari Sharif</option>
          </select>
          <div className="relative h-32">
            <div className="absolute top-4 left-8 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
              Cooling
              <br />
              Centers
            </div>
            <div className="absolute top-8 right-12 w-20 h-20 bg-orange-400 rounded-full flex items-center justify-center text-white text-xs font-semibold">
              Public
              <br />
              Awareness
            </div>
            <div className="absolute bottom-4 left-16 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
              Early
              <br />
              Warning
            </div>
          </div>
        </div>

        {/* Heatwave Advisories */}
        <div className="col-span-8 bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4 text-green-600">Heatwave Advisories</h3>
          <div className="text-sm text-gray-700 space-y-2 leading-relaxed">
            <div className="flex items-start space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded mt-1"></div>
              <div>
                <p className="font-semibold text-orange-600">Elderly (Orange Alert)</p>
                <p>Drink 2-3L water daily, visit cooling shelters.</p>
                <p>BOSMA Helpline: 1070</p>
              </div>
            </div>
            <div className="flex items-start space-x-2 mt-4">
              <div className="w-4 h-4 bg-red-500 rounded mt-1"></div>
              <div>
                <p className="font-semibold text-red-600">Outdoor Workers (Red Alert)</p>
                <p>Suspend non-essential work, use cooling vests.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
