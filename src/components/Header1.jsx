// Header1.jsx
import React, { useState, useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const Header1 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useState("Getting location...");
  const [locationError, setLocationError] = useState(false);

  // Reverse geocode via Nominatim (unchanged)
  const getLocationName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
      );
      const data = await response.json();

      if (data && data.address) {
        const state = data.address.state;
        const country = data.address.country;
        if (state && country) return `${state}, ${country}`;
        if (state) return state;
        if (country) return country;
        if (data.display_name) {
          const parts = data.display_name.split(",");
          return parts.slice(-3).join(",").trim();
        }
      }
      return `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
    } catch (err) {
      console.error("Error getting location name:", err);
      return `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const locationName = await getLocationName(latitude, longitude);
          setLocation(locationName);
          setLocationError(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setLocation("Permission denied");
              break;
            case error.POSITION_UNAVAILABLE:
              setLocation("Location unavailable");
              break;
            case error.TIMEOUT:
              setLocation("Location timeout");
              break;
            default:
              setLocation("Location error");
          }
          setLocationError(true);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 300000 }
      );
    } else {
      setLocation("Geolocation not supported");
      setLocationError(true);
    }
  }, []);

  // Utility to render NavLink with active underline
  const linkClasses = ({ isActive }) =>
    [
      "pb-1 border-b-2",
      "text-gray-700 font-medium hover:text-red-600",
      isActive ? "text-red-600 font-semibold border-red-600" : "border-transparent",
    ].join(" ");

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="logo_new.jpg" alt="Logo" className="w-21 h-21 rounded-full object-cover" />
            <div className="flex flex-col font-staatliches font-semibold tracking-wide leading-tight">
              <div className="text-[20px]">
                <span className="text-[#004275]">MODEL </span>
                <span className="text-red-600">HEAT</span>
              </div>
              <div className="text-[20px] text-[#004275]">ACTION PLAN FOR</div>
              <div className="text-[20px] text-green-700">PATNA</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" end className={linkClasses}>
              Home
            </NavLink>
            <NavLink to="/analytics" className={linkClasses}>
              Analytics
            </NavLink>
            <NavLink to="/about" className={linkClasses}>
              About us
            </NavLink>
            <a
              href="http://www.bsdma.org/GetPrepared.aspx?id=1"
              className="pb-1 border-b-2 border-transparent text-gray-700 font-medium hover:text-red-600"
            >
              Get Prepared
            </a>
          </nav>

          {/* Right */}
          <div className="flex items-center space-x-4">
            {/* Location */}
            <div className="hidden sm:flex items-center space-x-1 text-sm">
              <MdLocationOn className={`w-4 h-4 ${locationError ? "text-red-500" : "text-gray-600"}`} />
              <span className={locationError ? "text-red-500" : "text-gray-600"}>{location}</span>
            </div>
            {/* Mobile menu button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-600">
              <HiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-3">
            <nav className="flex flex-col space-y-3">
              <NavLink to="/" end className={linkClasses} onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/analytics" className={linkClasses} onClick={() => setIsMenuOpen(false)}>
                Analytics
              </NavLink>
              <NavLink to="/about" className={linkClasses} onClick={() => setIsMenuOpen(false)}>
                About us
              </NavLink>
              <div className="flex items-center space-x-1 text-sm px-2 py-1">
                <MdLocationOn className={`w-4 h-4 ${locationError ? "text-red-500" : "text-gray-600"}`} />
                <span className={locationError ? "text-red-500" : "text-gray-600"}>{location}</span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header1;
