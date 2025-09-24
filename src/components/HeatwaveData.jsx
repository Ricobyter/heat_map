// HeatwavePrevention.js
import React from "react";

const preventionData = [
  { name: "PHC Athmalgola", wards: 0, beds: 1, cooling: "1 Cooler", doctors: 3, paramedics: 4, remarks: "No Space Avilable" },
  { name: "CHC Bakhtiarpur", wards: 1, beds: 5, cooling: "1 cooler", doctors: 2, paramedics: 2, remarks: "" },
  { name: "Sub Divisional Hospital Barh", wards: 1, beds: 5, cooling: "1 Cooler", doctors: 3, paramedics: 6, remarks: "" },
  { name: "PHC Barh", wards: 0, beds: 0, cooling: "0", doctors: 0, paramedics: 0, remarks: "No Space Avilable" },
  { name: "PHC Belchi", wards: 1, beds: 2, cooling: "AC ROOM", doctors: 3, paramedics: 2, remarks: "" },
  { name: "PHC Bihta", wards: 1, beds: 2, cooling: "1 COOLER", doctors: 3, paramedics: 6, remarks: "" },
  { name: "PHC Bikram", wards: 1, beds: 1, cooling: "AC ROOM", doctors: 1, paramedics: 2, remarks: "" },
  { name: "PHC Daniyawan", wards: 1, beds: 2, cooling: "1 COOLER", doctors: 2, paramedics: 4, remarks: "" },
  { name: "CHC Dhanarua", wards: 1, beds: 6, cooling: "1 COOLER", doctors: 2, paramedics: 4, remarks: "" },
  { name: "Sub Divisional Hospital Danapur", wards: 1, beds: 4, cooling: "AC ROOM", doctors: 1, paramedics: 2, remarks: "" },
  { name: "PHC Danapur", wards: 1, beds: 1, cooling: "1 COOLER", doctors: 1, paramedics: 2, remarks: "" },
  { name: "PHC Dulhin Bazar", wards: 1, beds: 2, cooling: "AC ROOM", doctors: 1, paramedics: 2, remarks: "" },
  { name: "CHC Fatwah", wards: 1, beds: 2, cooling: "1 Cooler", doctors: 1, paramedics: 2, remarks: "" },
  { name: "PHC Ghoswari", wards: 1, beds: 3, cooling: "1 Cooler", doctors: 1, paramedics: 2, remarks: "" },
  { name: "PHC Khusrupur", wards: 1, beds: 2, cooling: "1 COOLER", doctors: 1, paramedics: 1, remarks: "" },
  { name: "PHC Maner", wards: 1, beds: 2, cooling: "1 COOLER", doctors: 1, paramedics: 1, remarks: "" },
  { name: "PHC Masaurhi", wards: 1, beds: 1, cooling: "AC ROOM", doctors: 1, paramedics: 2, remarks: "" },
  { name: "Sub Divisional Hospital Masaurhi", wards: 1, beds: 4, cooling: "AC ROOM", doctors: 3, paramedics: 6, remarks: "" },
  { name: "PHC Mokama", wards: 1, beds: 1, cooling: "1 COOLER", doctors: 1, paramedics: 1, remarks: "" },
  { name: "RH Mokama", wards: 1, beds: 2, cooling: "AC ROOM", doctors: 1, paramedics: 1, remarks: "" },
  { name: "PHC Naubatpur", wards: 1, beds: 2, cooling: "1 Cooler", doctors: 1, paramedics: 2, remarks: "" },
  { name: "Sub Divisional Hospital Paliganj", wards: 1, beds: 2, cooling: "1 COOLER", doctors: 2, paramedics: 2, remarks: "" },
  { name: "PHC Paliganj", wards: 0, beds: 3, cooling: "1 COOLER", doctors: 4, paramedics: 8, remarks: "" },
  { name: "PHC Pandarak", wards: 1, beds: 2, cooling: "1 COOLER", doctors: 2, paramedics: 0, remarks: "" },
  { name: "Sadar Hospital Guru Govind Singh Patna City", wards: 1, beds: 4, cooling: "AC ROOM", doctors: 3, paramedics: 6, remarks: "" },
  { name: "Gardanibagh Hospital", wards: 1, beds: 1, cooling: "1 COOLER", doctors: 1, paramedics: 1, remarks: "" },
  { name: "PHC Patna Sadar", wards: 1, beds: 1, cooling: "1 COOLER", doctors: 1, paramedics: 3, remarks: "" },
  { name: "CHC Phulwari Sharif", wards: 1, beds: 2, cooling: "1 COOLER", doctors: 1, paramedics: 2, remarks: "" },
  { name: "PHC Punpun", wards: 1, beds: 2, cooling: "1 COOLER", doctors: 1, paramedics: 2, remarks: "" },
  { name: "PHC Sampatchak", wards: 1, beds: 1, cooling: "1 COOLER", doctors: 1, paramedics: 2, remarks: "" }
];


export default function HeatwaveData() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-xl">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">
        Heat Wave Prevention Action Plan - Patna District 2025
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-3 py-2 text-left">Health Centre</th>
              <th className="px-3 py-2 text-right">Wards Created</th>
              <th className="px-3 py-2 text-right">Beds Installed</th>
              <th className="px-3 py-2 text-left">ACs/Coolers</th>
              <th className="px-3 py-2 text-right">Doctors</th>
              <th className="px-3 py-2 text-right">Paramedicals</th>
              <th className="px-3 py-2 text-left">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {preventionData.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-3 py-2">{row.name}</td>
                <td className="px-3 py-2 text-right">{row.wards}</td>
                <td className="px-3 py-2 text-right">{row.beds}</td>
                <td className="px-3 py-2">{row.cooling}</td>
                <td className="px-3 py-2 text-right">{row.doctors}</td>
                <td className="px-3 py-2 text-right">{row.paramedics}</td>
                <td className="px-3 py-2">{row.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
