// Response.jsx
import React from 'react';

const Response = () => {
  const responseData = [
    {
      recommendation: "Activation of district/block-level heat action protocols and cross-department coordination",
      term: "Short",
      feasibility: "High"
    },
    {
      recommendation: "Micro-targeted advisories via WhatsApp, loudspeakers, RWAs; Field outreach by ASHAs/Anganwadis: door-to-door ORS, distress flags",
      term: "Short",
      feasibility: "High"
    },
    {
      recommendation: "Block Officers checklist on water, power, clinics, kiosks, incidents",
      term: "Short",
      feasibility: "High"
    },
    {
      recommendation: "Rapid deployment of doctor-on-Wheels (mobile medical vans) and emergency ORS/hydration booths in hot spots and slums",
      term: "Short",
      feasibility: "High"
    },
    {
      recommendation: "Cooling shelters and dedicated cool-off points for auto/e-rickshaw drivers, daily-wage labourers in markets and transit nodes",
      term: "Short",
      feasibility: "Moderate"
    },
    {
      recommendation: "Water misting/sprinkler systems at high-traffic public places (markets, bus stands, etc.)",
      term: "Medium",
      feasibility: "Moderate"
    },
    {
      recommendation: "Temporary shaded rest areas and public drinking water distribution at key locations",
      term: "Short",
      feasibility: "High"
    },
    {
      recommendation: "Real-time health surveillance: daily reporting of heatstroke/admission data and seasonal bulletins in all health centres",
      term: "Short",
      feasibility: "High"
    },
    {
      recommendation: "No-cut power for hospitals, PHCs, cooling centres",
      term: "Short",
      feasibility: "High"
    },
    {
      recommendation: "Transport & fire services on standby at crowded hubs",
      term: "Short",
      feasibility: "Moderate"
    },
    {
      recommendation: "Adjusted work hours and school timings on heat alert days to minimise outdoor exposure",
      term: "Short",
      feasibility: "High"
    },
    {
      recommendation: "Micro-grant support for seasonal livelihoods (e.g., buttermilk stalls, coconut water vendors).",
      term: "Short, Medium",
      feasibility: "Moderate"
    },
    {
      recommendation: "Pilot micro-insurance for outdoor workers",
      term: "",
      feasibility: ""
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 font-montserrat">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Response</h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-5xl">
          Actions triggered during heatwave alerts to immediately reduce mortality and morbidity, especially among the most vulnerable populations.
        </p>
      </div>
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-gradient-to-r from-blue-700 to-blue-800 text-white">
              <th className="px-6 py-4 text-left text-base font-semibold border-r border-blue-600 last:border-r-0">
                Recommendation
              </th>
              <th className="px-6 py-4 text-center text-base font-semibold border-r border-blue-600 last:border-r-0">
                Term
              </th>
              <th className="px-6 py-4 text-center text-base font-semibold">
                Feasibility
              </th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {responseData.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-blue-50' : 'bg-white'
                } hover:bg-blue-100 transition-colors duration-200 border-b border-gray-200`}
              >
                <td className="px-6 py-4 text-gray-800 text-sm leading-relaxed border-r border-gray-200">
                  {item.recommendation}
                </td>
                <td className="px-6 py-4 text-center text-gray-700 text-sm font-medium border-r border-gray-200">
                  {item.term}
                </td>
                <td className="px-6 py-4 text-center text-gray-700 text-sm font-medium">
                  {item.feasibility}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Responsive Cards */}
      <div className="block md:hidden space-y-4">
        {responseData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-700"
          >
            <div className="space-y-3">
              <div>
                <span className="text-blue-800 font-semibold text-sm">Recommendation:</span>
                <p className="text-gray-800 text-sm mt-1 leading-relaxed">
                  {item.recommendation}
                </p>
              </div>
              {(item.term || item.feasibility) && (
                <div className="flex justify-between items-start">
                  <div className="flex-1 mr-4">
                    <span className="text-blue-800 font-semibold text-sm">Term:</span>
                    <p className="text-gray-700 text-sm font-medium">{item.term || 'N/A'}</p>
                  </div>
                  <div className="flex-1">
                    <span className="text-blue-800 font-semibold text-sm">Feasibility:</span>
                    <p className="text-gray-700 text-sm font-medium">{item.feasibility || 'N/A'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Response;
