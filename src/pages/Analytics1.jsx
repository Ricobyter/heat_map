import Dashboard from "../components/Dashboard";
import { useState } from "react";
import NavBar from "../components/Navbar";
import Header1 from "../components/Header1";
import Footer1 from "../components/Footer1";
import Sidebar1 from "../components/Sidebar1";
import Dashboard1 from "../components/Dashboard1";
import Header2 from "../components/Header2";

const AnalyticsDemo = () => {
  const [mapType, setMap] = useState("vulnerability_index"); 
  const [selectedLayer, setSelectedLayer] = useState("None");
  const [selectedYear, setSelectedYear] = useState("");
  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      {/* <Header /> */}
      <Header2 />
      {/* <NavBar /> */}


      <div className="flex px-4 mt-4 gap-4">
        <Sidebar1 mapType={mapType} setMap={setMap} selectedLayer={selectedLayer}
      setSelectedLayer={setSelectedLayer} selectedYear={selectedYear} setSelectedYear={setSelectedYear}/>
      
        <Dashboard1 mapType={mapType} selectedLayer={selectedLayer} selectedYear={selectedYear}/>
      </div>

    


    </div>
  );
};

export default AnalyticsDemo;
