import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import { FiGlobe } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";

const Header1 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPreparedDropdownOpen, setIsPreparedDropdownOpen] = useState(false);
  const [location, setLocation] = useState("Getting location...");
  const [locationError, setLocationError] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPreparedDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const linkClasses = ({ isActive }) =>
    [
      "pb-1 border-b-2",
      "text-gray-700 font-medium hover:text-red-600",
      isActive ? "text-red-600 font-semibold border-red-600" : "border-transparent",
    ].join(" ");

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  // Handle language change
  const handleLanguageChange = (lang) => {
    if (lang === selectedLang) return;

    setSelectedLang(lang);
    
    if (lang === 'en') {
      // Reset to English by reloading page
      // Clear Google Translate cookies
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      // Clear hash
      if (window.location.hash.includes('googtrans')) {
        window.history.replaceState("", document.title, window.location.pathname + window.location.search);
      }
      
      // Reload to get clean English version
      window.location.reload();
      
    } else if (lang === 'hi') {
      // Set the cookie directly for Hindi translation
      document.cookie = 'googtrans=/en/hi; path=/; domain=' + window.location.hostname;
      
      // Set the hash
      window.location.hash = '#googtrans(en|hi)';
      
      // Reload to apply translation
      window.location.reload();
    }
  };

  // Initialize Google Translate
  useEffect(() => {
    // Add Google Translate script
    const addScript = () => {
      // Remove existing script if any
      const existingScript = document.querySelector('script[src*="translate.google.com"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,hi',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element');
      };

      document.head.appendChild(script);
    };

    addScript();

    // Check current translation state
    setTimeout(() => {
      const hash = window.location.hash;
      const cookie = document.cookie;
      
      if (hash.includes('googtrans') && hash.includes('hi') ||
          cookie.includes('googtrans=/en/hi') ||
          document.body.classList.contains('translated-ltr')) {
        setSelectedLang('hi');
      } else {
        setSelectedLang('en');
      }
    }, 1000);
  }, []);

  // Location functionality
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

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            {/* Logo */}
            <div className="flex items-center space-x-3" translate="no">
              <img src="logo_new.jpg" alt="Logo" className="w-21 h-21 rounded-full object-cover" />
              <div className="flex flex-col font-staatliches tracking-wide leading-tight">
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
              <NavLink to="/" end className={linkClasses} onClick={handleNavClick}>
                Home
              </NavLink>
              <NavLink to="/analytics" className={linkClasses} onClick={handleNavClick}>
                Analytics
              </NavLink>
<Link to="/#about" className='text-gray-700 font-medium hover:text-red-600 pb-1' onClick={handleNavClick}>
  About us
</Link>
              
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsPreparedDropdownOpen(!isPreparedDropdownOpen)}
                  className="flex items-center space-x-1 pb-1 border-b-2 border-transparent text-gray-700 font-medium hover:text-red-600 transition-colors"
                  aria-label="Get Prepared Options"
                >
                  <span>Get Prepared</span>
                  <FaChevronDown  
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isPreparedDropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {isPreparedDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                    <a
                      href="http://www.bsdma.org/Know-Your-Risk.aspx?id=6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                      onClick={() => setIsPreparedDropdownOpen(false)}
                    >
                      <FiExternalLink className="w-4 h-4" />
                      <div>
                        <div className="font-medium">Visit Website</div>
                        <div className="text-sm text-gray-500">Official preparedness guide</div>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </nav>

            {/* Right */}
            <div className="flex items-center space-x-4">
              {/* Language Dropdown */}
              <div className="flex items-center space-x-2" translate="no">
                <FiGlobe className="w-4 h-4 text-gray-600" />
                <select 
                  value={selectedLang}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1 bg-white text-gray-700 focus:outline-none focus:border-gray-400"
                  aria-label="Select Language"
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी</option>
                </select>
              </div>

              {/* Location */}
              <div className="hidden sm:flex items-center space-x-1 text-sm" translate="no">
                <MdLocationOn className={`w-4 h-4 ${locationError ? "text-red-500" : "text-gray-600"}`} />
                <span className={locationError ? "text-red-500" : "text-gray-600"}>{location}</span>
              </div>

              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="md:hidden p-2 text-gray-600"
                translate="no"
              >
                <HiMenu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-3">
              <nav className="flex flex-col space-y-3">
                <NavLink to="/" end className={linkClasses} onClick={handleNavClick}>
                  Home
                </NavLink>
                <NavLink to="/analytics" className={linkClasses} onClick={handleNavClick}>
                  Analytics
                </NavLink>
                <Link to="/about" className="font-medium" onClick={handleNavClick}>
                  About us
                </Link>

                {/* Mobile Language Dropdown */}
                <div className="flex items-center space-x-2 px-2" translate="no">
                  <FiGlobe className="w-4 h-4 text-gray-600" />
                  <select 
                    value={selectedLang}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1 bg-white text-gray-700 focus:outline-none"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिन्दी</option>
                  </select>
                </div>

                <div className="flex items-center space-x-1 text-sm px-2 py-1" translate="no">
                  <MdLocationOn className={`w-4 h-4 ${locationError ? "text-red-500" : "text-gray-600"}`} />
                  <span className={locationError ? "text-red-500" : "text-gray-600"}>{location}</span>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      <style jsx global>{`
        .goog-te-banner-frame {
          display: none !important;
        }
        
        body {
          top: 0px !important;
        }
        
        .skiptranslate > iframe {
          display: none !important;
        }
        
        body > .skiptranslate {
          display: none !important;
        }
        
        #google_translate_element {
          display: none !important;
        }
        
        /* This allows the combo to work but keeps it hidden */
        .goog-te-combo {
          position: absolute !important;
          left: -9999px !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }
        
        /* Hide the Google Translate styling but don't disable functionality */
        font[style*="background-color: rgba(0, 0, 0, 0.1)"] {
          background-color: transparent !important;
          background: none !important;
        }
      `}</style>
    </>
  );
};

export default Header1;
