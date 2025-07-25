import React from "react";

const direct = [
  "Access to Electricity",
  "Access to Potable water supply",
  "Participation of Women in Formal Sector",
  "Literacy rate",
  "Sources of Income"
];
const indirect = [
  "Population Density",
  "Informal Settlement",
  "Households with single room",
  "Population under 6 years",
  "Income less than INR 5000"
];

const blockColorDirect = "bg-[#2f6f4d] text-white";
const blockColorIndirect = "bg-[#560202] text-white";

const AdaptiveCapacityFunctionBlocks = () => (
  <div className="flex w-[23vw] max-w-full" style={{ minWidth: 260 }}>
    {/* Vertical section label */}
    <div className="flex flex-col justify-center items-center">
      <div className="bg-blue-900 text-white font-bold text-center text-xs p-2 h-50" style={{writingMode: "sideways-lr",textOrientation: "mixed", fontSize: '9px', letterSpacing: '0.1em', borderRadius: '0.25rem 0 0 0.25rem'}}>
        Functional <br /> Relationship w.r.t<br />Adaptive Capacity
      </div>
    </div>
    {/* Right matrix blocks */}
    <div className="flex-1 pl-2">
        
      <div className="flex mb-[2px]">
        <div className="flex items-center bg-white font-bold text-[#2f6f4d] border border-[#2f6f4d] border-dashed px-1 py-0.5 mr-1 text-[10px]" style={{minWidth: 50}}>
          Direct
        </div>
        <div className="flex flex-wrap gap-[2px]">
          {direct.map((d) => (
            <div
              key={d}
              className={blockColorDirect + " px-2 py-1 rounded text-[10px] font-medium whitespace-nowrap"}
              style={{minWidth: "70px", marginRight: '2px'}}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
      <div className="flex">
        <div className="flex items-center bg-white font-bold text-red-700 border border-[#560202] border-dashed px-1 py-0.5 mr-1 text-[10px]" style={{minWidth: 50}}>
          Indirect
        </div>
        <div className="flex flex-wrap gap-[2px]">
          {indirect.map((i) => (
            <div
              key={i}
              className={blockColorIndirect + " px-2 py-1 rounded text-[10px] font-medium whitespace-nowrap"}
              style={{minWidth: "70px", marginRight: '2px'}}
            >
              {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AdaptiveCapacityFunctionBlocks;
