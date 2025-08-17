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
        // Try to get city/town/village name
        const city = data.address.city || 
                    data.address.town || 
                    data.address.village || 
                    data.address.suburb || 
                    data.address.neighbourhood ||
                    data.address.hamlet;
        
        // Try to get state or state code
        const state = data.address.state;
        const stateCode = data.address['ISO3166-2-lvl4'] || 
                         (state ? state.substring(0, 2).toUpperCase() : '');
        
        // If we have both city and state, return formatted string
        if (city && (state || stateCode)) {
          return `${city}, ${stateCode || state}`;
        }
        
        // If we only have city, return just city
        if (city) {
          return city;
        }
        
        // If we have country, return country
        if (data.address.country) {
          return data.address.country;
        }
        
        // Last resort - return the display name (formatted address)
        if (data.display_name) {
          // Extract the first two parts of the address
          const parts = data.display_name.split(',');
          return parts.slice(0, 2).join(',').trim();
        }
      }
      
      // If all else fails, show coordinates
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
              src='logo1.png' 
              alt="Logo" 
              className="w-21 h-21 rounded-full object-cover"
            />
            <div className="flex flex-col font-staatliches">
              <div className="text-md  font-semibold leading-tight">
                <span className="text-blue-700">MODEL </span>
                <span className="text-red-600">HEAT</span>
              </div>
              <div className="text-md font-bold text-blue-700 leading-tight">
                ACTION PLAN FOR
              </div>
              <div className="text-md font-bold text-green-700 leading-tight">
                PATNA
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#" 
              className="text-red-600 font-semibold border-b-2 border-red-600 pb-1"
            >
              Home
            </a>
            <a 
              href="#" 
              className="text-gray-700 font-medium"
            >
              Analytics
            </a>
            <a 
              href="#" 
              className="text-gray-700 font-medium"
            >
              Datasets
            </a>
            <a 
              href="#" 
              className="text-gray-700 font-medium"
            >
              About us
            </a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Location */}
            <div className="hidden sm:flex items-center space-x-1 text-sm">
              <MdLocationOn className={`w-4 h-4 ${locationError ? 'text-red-500' : 'text-gray-600'}`} />
              <span className={locationError ? 'text-red-500' : 'text-gray-600'}>
                Your Location
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
