"use client"

import { useState } from "react"

const Sidebar = () => {
  const [selectedYear, setSelectedYear] = useState("2030")
  const [vulnerableGroups, setVulnerableGroups] = useState({
    elderly: false,
    children: false,
    pregnantWomen: false,
    outdoorWorkers: false,
    slumDwellers: false,
  })

  const years = [
    ["2025", "2030", "2035", "2040"],
    ["2045", "2050", "2055", "2060"],
    ["2065", "2070", "2075", "2080"],
    ["2085", "2090", "2095", "2100"],
  ]

  const handleVulnerableGroupChange = (group) => {
    setVulnerableGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  return (
    <div className="w-72 min-h-screen border-r border-gray-200" style={{ backgroundColor: "#FFFF" }}>
      <div className="p-6">
        {/* Time Period */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 mb-3">Time Period</label>
          <select className="w-full p-3 border border-gray-300 rounded text-gray-800 text-sm bg-[#F9F6EE]">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>

        {/* Subdistrict/Block */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 mb-3">Subdistrict/Block</label>
          <select className="w-full p-3 border border-gray-300 rounded text-gray-800 text-sm bg-[#F9F6EE]">
            <option>Phulwari Sharif</option>
            <option>Patna Sadar</option>
            <option>Danapur</option>
          </select>
        </div>

        {/* Vulnerable Group */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 mb-3">Vulnerable Group</label>
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
                  checked={vulnerableGroups[key]}
                  onChange={() => handleVulnerableGroupChange(key)}
                  className="mr-3 w-4 h-4"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* SSP Scenario */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-800 mb-3">SSP Scenario</label>
          <select className="w-full p-3 border border-gray-300 rounded text-gray-800 text-sm bg-[#F9F6EE] mb-4">
            <option>Select Year</option>
          </select>

          <div className="space-y-2">
            {years.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-4 gap-2">
                {row.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`py-2 px-1 text-xs font-medium rounded ${
                      selectedYear === year
                        ? "bg-green-600 text-[#F9F6EE]"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {year}
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
  )
}

export default Sidebar
