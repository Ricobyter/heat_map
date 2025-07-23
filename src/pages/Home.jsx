import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import { useState } from "react";

const Home = () => {
  const [mapType, setMap] = useState("vulnerability_index"); 
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Red Alert Banner */}
      <div className="bg-red-600 text-white px-6 py-2 text-sm font-medium">
        Red Alert: 45°C expected on 2 May 2025, Stay Hydrated!
      </div>

      <div className="flex">
        <Sidebar mapType={mapType} setMap={setMap}/>
        <Dashboard mapType={mapType}/>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white px-6 py-3 text-xs">
        <div className="flex justify-between items-center">
          <div className="flex space-x-6">
            <a href="#" className="hover:underline">
              About
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>
          <div className="text-right">
            <div>
              © 2025 IPE Global | Developed for BSDMA by IPE Global in
              collaboration with UNDP
            </div>
            <a href="mailto:info@bsdma.org">Email</a>| Helpline : 0612-2547232
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
