import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import Header1 from "../components/Header1";
import Footer1 from "../components/Footer1";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Home = () => {
  const [mapType, setMap] = useState("vulnerability_index"); 
  const [selectedLayer, setSelectedLayer] = useState("None");
  const [selectedYear, setSelectedYear] = useState("");
  const [heatDeathYear, setHeatDeathYear] = useState("");
  const [showHeatwavePrevention, setShowHeatwavePrevention] = useState(false);

  const { user, loading, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated (after auth check completes)
  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
      }
    }
  }, [loading, user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      {/* <Header /> */}
      <Header1 />

      {/* Auth status */}
      <div className="flex justify-end px-6 mt-2">
        {loading ? (
          <div className="text-sm text-gray-600">Checking authentication...</div>
        ) : user ? (
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-700">{user.name || user.email} ({user.status})</div>
            <button
              onClick={() => logout()}
              className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
            {isAuthenticated() && user.role === 'admin' && (
              <Link to="/admin" className="text-sm text-teal-600 font-semibold">Admin</Link>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm text-teal-600 font-semibold">Sign in</Link>
            <Link to="/signup" className="text-sm text-gray-700">Sign up</Link>
          </div>
        )}
      </div>
      {/* <NavBar /> */}


      <div className="flex px-4 mt-4 gap-4">
        <Sidebar mapType={mapType} setMap={setMap} selectedLayer={selectedLayer}
      setSelectedLayer={setSelectedLayer} selectedYear={selectedYear} setSelectedYear={setSelectedYear} heatDeathYear={heatDeathYear} setHeatDeathYear={setHeatDeathYear} showHeatwavePrevention={showHeatwavePrevention} setShowHeatwavePrevention={setShowHeatwavePrevention} />
      
        <Dashboard mapType={mapType} selectedLayer={selectedLayer} selectedYear={selectedYear} heatDeathYear={heatDeathYear} showHeatwavePrevention={showHeatwavePrevention} />
      </div>

    


    </div>
  );
};

export default Home;
