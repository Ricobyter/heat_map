import { useMemo, useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { AiOutlineInfoCircle } from "react-icons/ai";

// Content sections
import Preparedness from "../components/Preparedness";
import Response from "../components/Response";
import Recovery from "../components/Recovery";

// Tooltip component
function Tooltip({ label, children }) {
  return (
    <span className="relative group cursor-pointer">
      {children}
      <span className="absolute left-1/2 -translate-x-1/2 -top-8 z-20 w-max px-2 py-1 rounded bg-gray-700 text-white text-xs font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
        {label}
      </span>
    </span>
  );
}

// Helper for rendering map titles with tooltip above HRI
function MapTitleWithTooltip({ title }) {
  const hriMatch = /(HRI)(.*)/i;
  const match = title.match(hriMatch);

  if (match) {
    return (
      <span>
        <Tooltip label="Heat Readiness Index">
          <span className="font-semibold">{match[1]}</span>
        </Tooltip>
        {match[2]}
      </span>
    );
  }
  return <span>{title}</span>;
}

// Reusable modal
const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 cursor-pointer hover:text-gray-700 text-3xl font-light hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          >
            ×
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(90vh-88px)] bg-gray-50">{children}</div>
      </div>
    </div>
  );
};

export default function HeatMap({
  mapType = "vulnerability_index",
  selectedLayer = "None",
  selectedYear,
  heatDeathYear,
  showHeatwavePrevention = false,
}) {
  // One modal, multiple types
  const [modal, setModal] = useState({ open: false, type: null });

  const openReco = (type) => setModal({ open: true, type }); // "preparedness" | "response" | "recovery" | "about"
  const closeModal = () => setModal({ open: false, type: null });

  const modalTitle =
    {
      preparedness: "Preparedness Recommendations",
      response: "Response Recommendations",
      recovery: "Recovery Recommendations",
      about: "Recommendations for Patna District Heat Action Plan",
    }[modal.type] || "";

  const modalBody = (
    <>
      {modal.type === "preparedness" && <Preparedness />}
      {modal.type === "response" && <Response />}
      {modal.type === "recovery" && <Recovery />}
      {modal.type === "about" && (
        <div className="px-6 py-5 text-sm sm:text-base leading-7 text-slate-800">
          <h4 className="text-base font-semibold mb-2">Introduction</h4>
          <p className="mb-3">
            In recent years, Patna district has witnessed rising intensity, frequency, and duration of heatwaves, driven by rapid urbanisation, climate change, and the loss of green cover. These extreme heat events disproportionately affect vulnerable groups such as informal sector workers, children, the elderly, and low-income households who face heightened risks due to inadequate housing, limited access to cooling infrastructure, and greater exposure to extreme temperatures.
          </p>
          <p className="mb-3">
            Within the framework of the Patna Model Heat Action Plan, the following recommendations have been developed and categorised under Preparedness, Response, and Recovery. Each recommendation is contextualised for Patna’s urban, peri-urban, and rural mix, tagged by expected implementation timeline and feasibility. The recommendations prioritise vulnerable populations and critical public facilities, while ensuring solutions are:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-3">
            <li>Locally grounded, leveraging readily available materials and resources.</li>
            <li>Infrastructure-linked, building on and strengthening existing systems.</li>
            <li>Institutionally embedded, integrating heatwave resilience within the core functions of municipal governance, public health systems, and disaster management operations.</li>
          </ul>
          <p>
            This structured approach aims to ensure that Patna’s Model Heat Action Plan moves beyond reactive measures to a systemic, evidence-based model of heatwave preparedness, response, and recovery.
          </p>
        </div>
      )}
    </>
  );

  // Maps config (unchanged from your version)
  const baseMaps = {
    exposure_index: "/exposure_index_satellite.html",
    vulnerability_index: "/new_vulnerability_index_base.html",
    sensitivity_index: "/sensitivity_index_satellite.html",
    adaptive_capacity_index: "/new_adaptive_capacity_base.html",
  };
  const roadsMaps = {
    exposure_index: "/patna_exposure_esri_sat_with_hybrid_switch.html",
    vulnerability_index: "/vulnerability_index_and_road_satellites.html",
    sensitivity_index: "/sensitivity_index_and_road_satellites.html",
    adaptive_capacity_index: "/adaptive_capacity_index_road_satellite_view.html",
  };
  const waterSewerMaps = {
    exposure_index: "/patna_blocks_with_water&sewer_infradetailed.html",
    vulnerability_index: "/vulnerability_index_water_sewer_infrastructure.html",
    sensitivity_index: "/sensitivity_index_water_sewer_infrastructure.html",
    adaptive_capacity_index: "/adaptive_capacity_index_water_sewer_infrastructure_updated.html",
  };
  const healthFacilitiesMap = {
    exposure_index: "/exposure_index_health_facilities.html",
    vulnerability_index: "/vulnerability_index_and_health_facilities.html",
    sensitivity_index: "/sensitivity_index_health_facilities.html",
    adaptive_capacity_index: "/adaptive_capacity_and_health_facilities.html",
  };
  const pointOfInterestMaps = {
    exposure_index: "/exposure_index_point_of_interest.html",
  };
  const settlementsAndBuildingsMaps = {
    exposure_index: "/exposure_index_settlements_buildings.html",
    vulnerability_index: "/vulnerability_index_settlements_buildings.html",
    sensitivity_index: "/sensitivity_index_settlements_buildings.html",
    adaptive_capacity_index: "/adaptive_capacity_index_settlements_buildings.html",
  };
  const facilitiesMaps = {
    exposure_index: "/exposure_index_facilities.html",
    vulnerability_index: "/vulnerability_index_facilities.html",
    sensitivity_index: "/sensitivity_index_facilities.html",
    adaptive_capacity_index: "/adaptive_capacity_facilities.html",
  };
  const residentialDensityMaps = {
    exposure_index: "/exposure_index_residential_densities.html",
    vulnerability_index: "/vulnerability_residential_densities_choropleth.html",
    sensitivity_index: "/sensitivity_index_residential_densities.html",
    adaptive_capacity_index: "/adaptive_capacity_residential_densities_choropleth.html",
  };
  const utilitiesAndInfrastructureMaps = {
    exposure_index: "/exposure_index_utilities_infrastructure.html",
    vulnerability_index: "/vulnerability_utilities_infrastructure.html",
    sensitivity_index: "/sensitivity_index_utilities_infrastructure.html",
    adaptive_capacity_index: "/adaptive_capacity_utilities_infrastructure.html",
  };
  const planningMaps = {
    exposure_index: "/exposure_index_planning.html",
    vulnerability_index: "/vulnerability_planning.html",
    sensitivity_index: "/sensitivity_index_planning.html",
    adaptive_capacity_index: "/adaptive_index_planning.html",
  };
  const agricultureMaps = {
    exposure_index: "/exposure_index_agriculture.html",
    vulnerability_index: "/vulnerability_agriculture.html",
    sensitivity_index: "/sensitivity_agriculture.html",
    adaptive_capacity_index: "/adaptive_capacity_agriculture.html",
  };
  const natureMaps = {
    exposure_index: "/exposure_index_nature.html",
    vulnerability_index: "/vulnerability_nature_fixed.html",
    sensitivity_index: "/sensitivity_index_nature.html",
    adaptive_capacity_index: "/adaptive_capacity_nature.html",
  };
  const wasteManagementMaps = {
    exposure_index: "/exposure_index_waste_management_fixed.html",
    vulnerability_index: "/vulnerability_waste_management.html",
    sensitivity_index: "/sensitivity_index_waste_management_fixed.html",
    adaptive_capacity_index: "/adaptive_capacity_waste_management.html",
  };

  const HRIIndex2030 = "/vulnerability_2030_base.html";
  const HRIIndex2035 = "/vulnerability_index_2035_satellite.html";
  const HRIIndex2040 = "/vulnerability_index_2040_satellite.html";
  const HRIIndex2050 = "/vulnerability_index_2050_satellite.html";

  const heatDeathYear2023 = "/death_blocks_2023_hospitals.html"
  const heatDeathYear2024 = "/death_blocks_2024_hospitals.html"
  const heatDeathYear2025 = "/death_blocks_2025_hospitals.html"

  // Maps for 2025 scenario (inferred filenames based on project pattern)
  const maps2025 = {
    "Roads": "/vulnerability_2025_road-satelllite.html",
    "Water and Sewer Infrastructure": "/vulnerability_2025_water-sewer-infrastructure_map.html",
    "Health Facilities": "/2025_health_facilities.html",
    "Point Of Interest": "/vulnerability_2025_point_of_interest.html",
    "Settlements and Buildings": "/vulnerability_2025_settlements_buildings.html",
    "Facilities": "/vulnerabilities_2025_facilities_hri.html",
    "Residential Densities": "/2025_residential_densities_choropleth_hri.html",
    "Utilities and Infrastructure": "/vulnerability_2025_utilities_infra_hri.html",
    "Planning": "/2025_planning_simple_hri.html",
    "BMA Agriculture": "/2025_agriculture_hri.html",
    "Nature": "/2025_nature_hri.html",
    "Waste Management": "/2025_waste_management_hri.html",
    "None": "/vulnerability_2025_base.html",
  };

  const maps2030 = {
    "Roads": "/vulnerability_2030_road-satelllite.html",
    "Water and Sewer Infrastructure": "/vulnerability_2030_water-sewer-infrastructure_map.html",
    "Health Facilities": "/2030_health_facilities.html",
    "Point Of Interest": "/vulnerability_2030_point_of_interest.html",
    "Settlements and Buildings": "/vulnerability_2030_settlements_buildings.html",
    "Facilities": "/vulnerabilities_2030_facilities_hri.html",
    "Residential Densities": "/2030_residential_densities_choropleth_hri.html",
    "Utilities and Infrastructure": "/vulnerability_2030_utilities_infra_hri.html",
    "Planning": "/2030_planning_simple_hri.html",
    "BMA Agriculture": "/2030_agriculture_hri.html",
    "Nature": "/2030_nature_hri.html",
    "Waste Management": "/2030_waste_management_hri.html",
    "None": "/vulnerability_2030_base.html" // fallback/default
  };

  const maps2035 = {
    "Roads": "/vulnerability_2035_road-satelllite.html",
    "Water and Sewer Infrastructure": "/vulnerability_2035_water-sewer-infrastructure_map.html",
    "Health Facilities": "/2035_health_facilities.html",
    "Point Of Interest": "/vulnerability_2035_point_of_interest.html",
    "Settlements and Buildings": "/vulnerability_2035_settlements_buildings.html",
    "Facilities": "/vulnerabilities_2035_facilities_hri.html",
    "Residential Densities": "/2035_residential_densities_choropleth_hri.html",
    "Utilities and Infrastructure": "/vulnerability_2035_utilities_infra_hri.html",
    "Planning": "/2035_planning_simple_hri.html",
    "BMA Agriculture": "/2035_agriculture_hri.html",
    "Nature": "/2035_nature_hri.html",
    "Waste Management": "/2035_waste_management_hri.html",
    "None": "/vulnerability_2035_base.html"
  };

  const maps2040 = {
    "Roads": "/vulnerability_2040_road-satelllite.html",
    "Water and Sewer Infrastructure": "/vulnerability_2040_water-sewer-infrastructure_map.html",
    "Health Facilities": "/2040_health_facilities.html",
    "Point Of Interest": "/vulnerability_2040_point_of_interest.html",
    "Settlements and Buildings": "/vulnerability_2040_settlements_buildings.html",
    "Facilities": "/vulnerabilities_2040_facilities_hri.html",
    "Residential Densities": "/2040_residential_densities_choropleth_hri.html",
    "Utilities and Infrastructure": "/vulnerability_2040_utilities_infra_hri.html",
    "Planning": "/2040_planning_simple_hri.html",
    "BMA Agriculture": "/2040_agriculture_hri.html",
    "Nature": "/2040_nature_hri.html",
    "Waste Management": "/2040_waste_management_hri.html",
    "None": "/vulnerability_2040_base.html"
  };

  const maps2050 = {
    "Roads": "/vulnerability_2050_road-satelllite.html",
    "Water and Sewer Infrastructure": "/vulnerability_2050_water-sewer-infrastructure_map.html",
    "Health Facilities": "/2050_health_facilities.html",
    "Point Of Interest": "/vulnerability_2050_point_of_interest.html",
    "Settlements and Buildings": "/vulnerability_2050_settlements_buildings.html",
    "Facilities": "/vulnerabilities_2050_facilities_hri.html",
    "Residential Densities": "/2050_residential_densities_choropleth_hri.html",
    "Utilities and Infrastructure": "/vulnerability_2050_utilities_infra_hri.html",
    "Planning": "/2050_planning_simple_hri.html",
    "BMA Agriculture": "/2050_agriculture_hri.html",
    "Nature": "/2050_nature_hri.html",
    "Waste Management": "/2050_waste_management_hri.html",
    "None": "/vulnerability_2050_base.html"
  };

  const mapName = {
    exposure_index: "Heat Exposure Map",
    vulnerability_index: "Heat Vulnerability Map",
    sensitivity_index: "Heat Sensitivity Map",
    adaptive_capacity_index: "Adaptive Capacity Map",
  };

  const { src, title } = useMemo(() => {
    const type = mapType in baseMaps ? mapType : "vulnerability_index";

    // Show heatwave prevention map if requested
    if (showHeatwavePrevention) {
      return { src: "/heatwave_prevention.html", title: "Heatwave Prevention Action Plan" };
    }

    if (selectedYear === "2025") {
      const src = maps2025[selectedLayer] || maps2025["None"];
      return { src, title: "HRI for 2025 Scenario" };
    }

    if (selectedYear === "2030") {
      const src = maps2030[selectedLayer] || maps2030["None"];
      return { src, title: "HRI for 2030 Scenario" };
    }
    if (selectedYear === "2035") {
      const src = maps2035[selectedLayer] || maps2035["None"];
      return { src, title: "HRI for 2035 Scenario" };
    }
    if (selectedYear === "2040") {
      const src = maps2040[selectedLayer] || maps2040["None"];
      return { src, title: "HRI for 2040 Scenario" };
    }
    if (selectedYear === "2050") {
      const src = maps2050[selectedLayer] || maps2050["None"];
      return { src, title: "HRI for 2050 Scenario" };
    }

    if (heatDeathYear === "2023") {
      console.log("Loading 2023 map");
      return { src: heatDeathYear2023, title: "Heat Wave Related Patient Data 2023" };
    }
    if (heatDeathYear === "2024") {
      console.log("Loading 2024 map");
      return { src: heatDeathYear2024, title: "Heat Wave Related Patient Data 2024" };
    }
    if (heatDeathYear === "2025") {
      console.log("Loading 2025 map");
      return { src: heatDeathYear2025, title: "Heat Wave Related Patient Data 2025" };
    }

    const isProjectionYear = ["2030", "2035", "2040", "2050"].includes(String(selectedYear));
    const forceBaseMapForProjection =
      isProjectionYear && ["exposure_index", "sensitivity_index", "adaptive_capacity_index"].includes(type);

    if (selectedLayer === "Roads") return { src: roadsMaps[type] || baseMaps[type], title: mapName[type] || "Heat Map" };
    if (selectedLayer === "Water and Sewer Infrastructure")
      return { src: waterSewerMaps[type] || baseMaps[type], title: mapName[type] || "Heat Map" };
    if (selectedLayer === "Health Facilities")
      return { src: healthFacilitiesMap[type] || baseMaps[type], title: mapName[type] || "Heat Map" };
    if (selectedLayer === "Point Of Interest")
      return { src: pointOfInterestMaps[type] || baseMaps[type], title: mapName[type] || "Heat Map" };
    if (selectedLayer === "Settlements and Buildings")
      return { src: settlementsAndBuildingsMaps[type] || baseMaps[type], title: mapName[type] || "Heat Map" };
    if (selectedLayer === "Facilities")
      return { src: facilitiesMaps[type] || baseMaps[type], title: mapName[type] || "Heat Map" };
    if (selectedLayer === "Residential Densities")
      return { src: residentialDensityMaps[type] || baseMaps[type], title: mapName[type] || "Heat Map" };
    if (selectedLayer === "Utilities and Infrastructure")
      return { src: utilitiesAndInfrastructureMaps[type] || baseMaps[type], title: mapName[type] || "Heat Map" };
    if (selectedLayer === "Planning")
      return { src: planningMaps[type] || baseMaps[type], title: mapName[type] || "Heat Map" };
    if (selectedLayer === "BMA Agriculture")
      return { src: agricultureMaps[type] || baseMaps[type], title: mapName[type] || "Heat Map" };
    if (selectedLayer === "Nature")
      return { src: natureMaps[type] || baseMaps[type], title: mapName[type] || "Heat Map" };
    if (selectedLayer === "Waste Management")
      return { src: wasteManagementMaps[type] || baseMaps[type], title: mapName[type] || "Heat Map" };

    if (forceBaseMapForProjection) return { src: baseMaps[type], title: mapName[type] || "Heat Map" };

    return { src: baseMaps[type] || baseMaps.vulnerability_index, title: mapName[type] || "Heat Vulnerability Map" };
  }, [mapType, selectedLayer, selectedYear, heatDeathYear, showHeatwavePrevention]);

  const isProjectionYear = ["2030", "2035", "2040", "2050"].includes(String(selectedYear));
  const isHeatDataYear = ["2023", "2024", "2025"].includes(String(heatDeathYear));

  const legendLabels = isProjectionYear
    ? { high: "Very High, Urban", mid: "High, Peri-Urban", low: "Moderate, Rural" }
    : { high: "High", mid: "Medium", low: "Low" };

  const HIDE_DENSITY_YEARS = new Set(["2030", "2035", "2040", "2050"]);
  const shouldHidePopulationDensity = HIDE_DENSITY_YEARS.has(selectedYear);

  return (
    <>
      <div className="bg-#F9F6EE pt-0 rounded-lg shadow-md shadow-gray-400 h-full w-full font-roboto">
        <div className="relative h-120 rounded-lg overflow-hidden border border-gray-200">
          <iframe id="heatMapIframe" src={src} title="Interactive Heat Map" style={{ width: "100%", height: "100%", border: "none" }} />
        </div>

        <div className="bg-white px-6 py-4 rounded-md">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  {/* Modified: Tooltip for HRI in the title */}
                  <h1 className="text-2xl font-bold text-gray-800">
                    <MapTitleWithTooltip title={title} />
                  </h1>

                  {/* Legend */}
                  {
                    !isHeatDataYear && !showHeatwavePrevention && (
                      <div className="flex flex-row text-xs space-x-2 px-2">
                        <div className="flex flex-col items-center space-y-1">
                          <span className="font-medium">{legendLabels.high}</span>
                          <div className={`w-6 h-6 rounded-full ${mapType === "adaptive_capacity_index" ? "bg-[#a1d885]" : "bg-[#f26963]"}`} />
                        </div>
                        <div className="flex flex-col items-center space-y-1">
                          <span className="font-medium">{legendLabels.mid}</span>
                          <div className={`w-6 h-6 rounded-full ${mapType === "adaptive_capacity_index" ? "bg-[#d6f5be]" : "bg-[#f3c26e]"}`} />
                        </div>
                        <div className="flex flex-col items-center space-y-1">
                          <span className="font-medium ">{legendLabels.low}</span>
                          <div
                            className={`w-6 h-6 rounded-full shadow-sm ${
                              isProjectionYear
                                ? "bg-[#fce99f]"
                                : mapType === "adaptive_capacity_index"
                                ? "bg-[#b7c6b0]"
                                : mapType === "vulnerability_index"
                                ? "bg-[#f1c2aa]"
                                : "bg-[#ecc1aa]"
                            }`}
                          />
                        </div>
                      </div>
                    )
                  }
                </div>

                {!shouldHidePopulationDensity && !isHeatDataYear && (
                  <div className="mb-6">
                    <p className="text-gray-600 text-sm mb-2">Population Density (2025) / km²:</p>
                    <div className="flex items-center gap-6">
                      <span className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-900 rounded-full" />
                        <span className="text-sm text-gray-600">≤ 929</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <div className="w-1.75 h-1.75 bg-red-900 rounded-full" />
                        <span className="text-sm text-gray-600">≤ 1683</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-900 rounded-full" />
                        <span className="text-sm text-gray-600">≤ 2299</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-red-900 rounded-full" />
                        <span className="text-sm text-gray-600">≤ 4131</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-900 rounded-full" />
                        <span className="text-sm text-gray-600">≤ 16327</span>
                      </span>
                    </div>
                  </div>
                )}

                <div className="border-b border-gray-300 mb-6" />

                {/* Advisory snippet */}
                <div className="flex items-start gap-4 cursor-pointer">
                  <div className="bg-[#FFFCE8] border-2 border-[#FFEF10] rounded-lg p-3 flex items-center gap-3">
                   
                    <div className="flex items-center justify-center w-8 h-8 bg-[#FFFCE8] rounded">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-gray-800">Heatwave</div>
                      <div className="text-gray-700">Advisories</div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      <a href="http://www.bsdma.org/Know-Your-Risk.aspx?id=6" className="text-[#46b1e1]">Heatwave Advisories devised by BSDMA</a>
                    </h3>
                    <p className="text-sm text-gray-700">
                      Email: info@bsdma.org • Helpline: 0612-2547232
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar — Recommendations */}
            <div className="relative bg-white hover:bg-[#E2ECF4] duration-100 rounded-lg shadow-sm p-4 min-w-[280px]">
              {/* Info icon opens 'about' content in the same modal */}
              <button
                type="button"
                onClick={() => openReco("about")}
                aria-label="About these recommendations"
                className=" absolute cursor-pointer top-2 right-2 inline-flex items-center justify-center rounded-full p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400/40"
              >
                <AiOutlineInfoCircle className="w-5 h-5 text-red-600" />
              </button>

              <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">Recommendations</h3>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => openReco("preparedness")}
                  className="bg-white hover:bg-gray-200 shadow-sm shadow-gray-600 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  Preparedness
                </button>
                <button
                  onClick={() => openReco("response")}
                  className="bg-white hover:bg-gray-200 shadow-sm shadow-gray-600 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  Response
                </button>
              </div>

              <button
                onClick={() => openReco("recovery")}
                className="w-full bg-white hover:bg-gray-200 shadow-sm shadow-gray-600 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium transition-colors"
              >
                Recovery
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Single modal instance, content switched by 'type' */}
      <Modal isOpen={modal.open} onClose={closeModal} title={modalTitle}>
        {modalBody}
      </Modal>
    </>
  );
}
