// Preparedness.jsx
import React from 'react';

const Preparedness = () => {
  const preparednessData = [
    {
      recommendation: "Cool roof interventions (use of lime/chuna, cool roof paint, reflective coatings) for informal houses, schools, Anganwadis, and public buildings",
      term: "Short",
      feasibility: "High"
    },
    {
      recommendation: "Roof retrofits (PET bottles, static/dynamic eco-board, cardboard, and wood-wool panels) in high-risk settlements",
      term: "Short",
      feasibility: "High"
    },
    {
      recommendation: "Raised garden mesh with climber vines for roof cooling and community greening",
      term: "Short",
      feasibility: "High"
    },
    {
      recommendation: "Corrugated cardboard insulation (fire retardant) for informal/temporary roofs",
      term: "Short",
      feasibility: "High"
    },
    {
      recommendation: "Layered roof solutions (tarpaulin, insulation sheet, thermocol/cardboard, bamboo, jute) in slum settlements",
      term: "Short",
      feasibility: "Moderate"
    },
    {
      recommendation: "Urban zoning for heat resilience: incentives for green roofs, permeable surfaces, and mandatory tree cover (30-40%) in public premises",
      term: "Medium",
      feasibility: "Moderate"
    },
    {
      recommendation: "Construction of heat shelters and hydration/ORS stations in wards and public spaces overlaying critical lifelines (PHCs, water, power, roads)",
      term: "Short",
      feasibility: "High"
    },
    {
      recommendation: "Shaded corridors and pedestrian pathways using local materials or creepers",
      term: "Medium",
      feasibility: "Moderate"
    },
    {
      recommendation: "District Heat Task Force with 24x7 Heat Cell: Block Heat Officers with escalation matrix",
      term: "Short",
      feasibility: "High"
    },
    {
      recommendation: "Departmental SOP compendium: one-pager roles for each department with vendor lists",
      term: "Short",
      feasibility: "High"
    },
    {
      recommendation: "Heat-resilient Anganwadis, schools, and PHCs: retrofitting with insulation and provision for early closure during red alerts",
      term: "Medium",
      feasibility: "Moderate"
    },
    {
      recommendation: "Early warning and risk forecast systems: localised outreach and ward-level advisories",
      term: "Medium",
      feasibility: "Moderate"
    },
    {
      recommendation: "UHI hotspot mitigation in top wards with greening, coatings, misting kiosks",
      term: "Medium",
      feasibility: "Moderate"
    },
    {
      recommendation: "Training for health/frontline workers, heat literacy in schools, and community awareness campaigns",
      term: "Short",
      feasibility: "High"
    },
    {
      recommendation: "Registry of vulnerable groups (elderly, outdoor workers, slums) for outreach",
      term: "Medium",
      feasibility: "High"
    },
    {
      recommendation: "Analysis 3-5 years OPD/ER data vs. heat alerts for heat threshold refinement",
      term: "Short",
      feasibility: "High"
    },
    {
      recommendation: "Workplace heat-safety standards for MSMEs and contracts",
      term: "Medium",
      feasibility: "Moderate"
    },
    {
      recommendation: "School/workplace heat modules (exam rescheduling, hydration breaks), Integrate heat curriculum into schools",
      term: "Medium, Long",
      feasibility: "High"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 font-montserrat">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Preparedness</h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-5xl">
          Actions designed to reduce exposure, build community and institutional readiness, and empower vulnerable groups before a heatwave occurs.
        </p>
      </div>
      
      {/* Table Container */}
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
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
            {preparednessData.map((item, index) => (
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
      <div className="block md:hidden mt-6 space-y-4">
        {preparednessData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600"
          >
            <div className="space-y-3">
              <div>
                <span className="text-blue-700 font-semibold text-sm">Recommendation:</span>
                <p className="text-gray-800 text-sm mt-1 leading-relaxed">
                  {item.recommendation}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-blue-700 font-semibold text-sm">Term:</span>
                  <p className="text-gray-700 text-sm font-medium">{item.term}</p>
                </div>
                <div>
                  <span className="text-blue-700 font-semibold text-sm">Feasibility:</span>
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

export default Preparedness;
