import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import { useState } from "react";
import NavBar from "../components/Navbar";
import Header1 from "../components/Header1";
import Footer1 from "../components/Footer1";

const Home = () => {
  const [mapType, setMap] = useState("vulnerability_index"); 
  const [selectedLayer, setSelectedLayer] = useState("None");
  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      {/* <Header /> */}
      <Header1 />
      {/* <NavBar /> */}


      <div className="flex px-4 mt-4 gap-4">
        <Sidebar mapType={mapType} setMap={setMap}       selectedLayer={selectedLayer}
      setSelectedLayer={setSelectedLayer}/>
      
        <Dashboard mapType={mapType} selectedLayer={selectedLayer}/>
      </div>

    


    </div>
  );
};

export default Home;
