// Recovery.jsx
import React from 'react';

const Recovery = () => {
  const recoveryData = [
    {
      recommendation: "Post-heatwave review and protocol update using health and community feedback",
      term: "Short",
      feasibility: "High"
    },
    {
      recommendation: "After-action reviews per department; district report card in 15 days",
      term: "Short",
      feasibility: "High"
    },
    {
      recommendation: "Ex-gratia for confirmed deaths via SDRF norms; simplified pathways; Pilot wage-loss relief/parametric covers for daily wagers",
      term: "Short, Medium",
      feasibility: "High, Moderate"
    },
    {
      recommendation: "Medical and psychosocial support for heat-affected patients and vulnerable families",
      term: "Short",
      feasibility: "Moderate"
    },
    {
      recommendation: "Livelihood recovery: temporary relief and pilot heat insurance/micro-insurance for informal sector workers",
      term: "Medium",
      feasibility: "Moderate"
    },
    {
      recommendation: "Restoration/upgrade of damaged cooling infrastructure in slums, Anganwadis, and public spaces",
      term: "Medium",
      feasibility: "Moderate"
    },
    {
      recommendation: "Update district disaster plans and building codes using heatwave impact lessons",
      term: "Medium",
      feasibility: "Moderate"
    },
    {
      recommendation: "Long-term structural interventions: solar reflective pavements, heat-safe market retrofits, rural resilience pods, green roof micro-grants, and heat risk certification for new infrastructure projects",
      term: "Long",
      feasibility: "Moderate-Low"
    },
    {
      recommendation: "Advance green corridors, wetlands, reflective pavements",
      term: "Long",
      feasibility: "Moderate-Low"
    },
    {
      recommendation: "Development of ward-level 'heat resilience scorecard' for prioritising interventions and resource allocation",
      term: "Long",
      feasibility: "Moderate"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 font-montserrat">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Recovery</h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-5xl">
          Actions to restore well-being, evaluate response, and build systemic resilience following a severe heatwave event.
        </p>
      </div>
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-gradient-to-r from-blue-800 to-blue-900 text-white">
              <th className="px-6 py-4 text-left text-base font-semibold border-r border-blue-700 last:border-r-0">
                Recommendation
              </th>
              <th className="px-6 py-4 text-center text-base font-semibold border-r border-blue-700 last:border-r-0">
                Term
              </th>
              <th className="px-6 py-4 text-center text-base font-semibold">
                Feasibility
              </th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {recoveryData.map((item, index) => (
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
        {recoveryData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-800"
          >
            <div className="space-y-3">
              <div>
                <span className="text-blue-800 font-semibold text-sm">Recommendation:</span>
                <p className="text-gray-800 text-sm mt-1 leading-relaxed">
                  {item.recommendation}
                </p>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex-1 mr-4">
                  <span className="text-blue-800 font-semibold text-sm">Term:</span>
                  <p className="text-gray-700 text-sm font-medium">{item.term}</p>
                </div>
                <div className="flex-1">
                  <span className="text-blue-800 font-semibold text-sm">Feasibility:</span>
                  <p className="text-gray-700 text-sm font-medium">{item.feasibility}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

            <div className="  p-4 sm:p-5 mt-4">
  <h3 className="text-base font-semibold text-slate-800 mb-3">Notes</h3>

  <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 marker:text-slate-300">
    <li>
      <span className="font-medium text-slate-900">Short Term:</span>
      {" "}
      Actions implementable in the next 0–1 year using current resources and schemes.
    </li>
    <li>
      <span className="font-medium text-slate-900">Medium Term:</span>
      {" "}
      1–3 years, requiring interdepartmental collaboration and modest infrastructural investment.
    </li>
    <li>
      <span className="font-medium text-slate-900">Long Term:</span>
      {" "}
      3+ years, capital/technology intensive or requiring major bylaw/policy shifts.
    </li>
    <li>
      <span className="font-medium text-slate-900">Feasibility:</span>
      {" "}
      High = low‑cost and scalable; Moderate = requires some coordination or new outlay; Low = depends on new policy, technology, or large funds.
    </li>
  </ul>
</div>
    </div>
  );
};

export default Recovery;
