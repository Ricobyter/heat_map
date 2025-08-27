import React, { useState, useEffect } from 'react';
import { MdLocationOn } from 'react-icons/md';
import { HiMenu } from 'react-icons/hi';

const Header1 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useState('Getting location...');
  const [locationError, setLocationError] = useState(false);

  // Function to get location name from coordinates using free Nominatim service
const getLocationName = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
    );
    const data = await response.json();

    if (data && data.address) {
      const state = data.address.state;
      const country = data.address.country;
      // Prefer showing state and country
      if (state && country) {
        return `${state}, ${country}`;
      }
      if (state) {
        return state;
      }
      if (country) {
        return country;
      }
      // fallback: display_name or coordinates
      if (data.display_name) {
        const parts = data.display_name.split(',');
        return parts.slice(-3).join(',').trim();
      }
    }
    return `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
  } catch (error) {
    console.error('Error getting location name:', error);
    return `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
  }
};


  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Coordinates:', latitude, longitude); // Debug log
          const locationName = await getLocationName(latitude, longitude);
          console.log('Location name:', locationName); // Debug log
          setLocation(locationName);
          setLocationError(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setLocation('Permission denied');
              break;
            case error.POSITION_UNAVAILABLE:
              setLocation('Location unavailable');
              break;
            case error.TIMEOUT:
              setLocation('Location timeout');
              break;
            default:
              setLocation('Location error');
              break;
          }
          setLocationError(true);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000, // Increased timeout
          maximumAge: 300000 // Cache for 5 minutes
        }
      );
    } else {
      setLocation('Geolocation not supported');
      setLocationError(true);
    }
  }, []);

 


  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img 
              src='logo_new.jpg' 
              alt="Logo" 
              className="w-21 h-21 rounded-full object-cover"
            />
            <div className="flex flex-col font-staatliches font-semibold tracking-wide">
              <div className="text-[20px]  leading-tight">
                <span className="text-[#004275] ">MODEL </span>
                <span className="text-red-600">HEAT</span>
              </div>
              <div className="text-[20px] text-[#004275] leading-tight">
                ACTION PLAN FOR
              </div>
              <div className="text-[20px] text-green-700 leading-tight">
                PATNA
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#" 
              className="text-gray-700 font-medium"
            >
              Home
            </a>
            <a 
              href="#" 
              className="text-red-600 font-semibold border-b-2 border-red-600 pb-1"
            >
              Analytics
            </a>

            <a 
              href="#" 
              className="text-gray-700 font-medium"
            >
              About us
            </a>

            <a href="http://www.bsdma.org/GetPrepared.aspx?id=1" className="text-gray-700 font-medium">Get Prepared</a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Location */}
<div className="hidden sm:flex items-center space-x-1 text-sm">
  <MdLocationOn className={`w-4 h-4 ${locationError ? 'text-red-500' : 'text-gray-600'}`} />
  <span className={locationError ? 'text-red-500' : 'text-gray-600'}>
    {location}
  </span>
</div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              <HiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-3">
            <nav className="flex flex-col space-y-3">
              <a 
                href="#" 
                className="text-red-600 font-semibold px-2 py-1"
              >
                Home
              </a>
              <a 
                href="#" 
                className="text-gray-700 font-medium px-2 py-1"
              >
                Analytics
              </a>
              <a 
                href="#" 
                className="text-gray-700 font-medium px-2 py-1"
              >
                Datasets
              </a>
              <a 
                href="#" 
                className="text-gray-700 font-medium px-2 py-1"
              >
                About us
              </a>
              <div className="flex items-center space-x-1 text-sm px-2 py-1">
                <MdLocationOn className={`w-4 h-4 ${locationError ? 'text-red-500' : 'text-gray-600'}`} />
                <span className={locationError ? 'text-red-500' : 'text-gray-600'}>
                  {location}
                </span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header1;
