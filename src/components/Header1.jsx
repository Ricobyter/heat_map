// Header1.jsx
import React, { useState, useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import { FiGlobe } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Header1 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useState("Getting location...");
  const [locationError, setLocationError] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');

  // Prevent hash changes from affecting React Router
  useEffect(() => {
    const handleHashChange = (e) => {
      if (window.location.hash.includes('googtrans')) {
        // Don't prevent the event, just clean up the URL after translation
        setTimeout(() => {
          const cleanUrl = window.location.pathname + window.location.search;
          window.history.replaceState(null, null, cleanUrl);
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Simplified function to reset to English
  const resetToEnglish = () => {
    // Clear Google Translate cookies
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
    document.cookie = 'googtrans=/auto/en; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
    
    // Remove hash and reload
    if (window.location.hash) {
      window.history.replaceState("", document.title, window.location.pathname + window.location.search);
    }
    
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // Simplified function to translate to Hindi
  const translateToHindi = () => {
    // Set the cookie first
    document.cookie = 'googtrans=/auto/hi; path=/; domain=' + window.location.hostname;
    
    // Use the hash method (this is necessary for Google Translate to work)
    window.location.hash = '#googtrans(auto|hi)';
    
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // Trigger translation programmatically using the dropdown
  const triggerGoogleTranslate = (targetLang) => {
    const selectElement = document.querySelector('.goog-te-combo');
    if (selectElement) {
      selectElement.value = targetLang;
      // Create and dispatch the change event
      const event = new Event('change', { bubbles: true });
      selectElement.dispatchEvent(event);
      
      // Also try triggering with mouse events
      const clickEvent = new MouseEvent('click', { bubbles: true });
      selectElement.dispatchEvent(clickEvent);
    }
  };

  // Handle language change
  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
    
    if (lang === 'en') {
      resetToEnglish();
    } else if (lang === 'hi') {
      // Try programmatic method first, fallback to hash method
      setTimeout(() => {
        triggerGoogleTranslate('hi');
        
        // If programmatic doesn't work, use hash method as backup
        setTimeout(() => {
          const isTranslated = document.body.classList.contains('translated-ltr') || 
                              document.querySelector('font[style*="background-color"]');
          
          if (!isTranslated) {
            translateToHindi();
          }
        }, 1000);
      }, 500);
    }
  };

  // Initialize Google Translate
  useEffect(() => {
    const addGoogleTranslateScript = () => {
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
          pageLanguage: 'auto',
          includedLanguages: 'en,hi',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
          multilanguagePage: true
        }, 'google_translate_element');
      };

      document.head.appendChild(script);
    };

    // Initialize Google Translate
    if (!window.google || !window.google.translate) {
      addGoogleTranslateScript();
    } else {
      window.googleTranslateElementInit();
    }

    // Check current translation state
    const checkCurrentLanguage = () => {
      const hash = window.location.hash;
      const cookie = document.cookie;
      
      // Clean up hash immediately
      if (hash && hash.includes('googtrans')) {
        const cleanUrl = window.location.pathname + window.location.search;
        window.history.replaceState(null, null, cleanUrl);
      }
      
      // Determine current language from cookie or DOM
      if (cookie.includes('googtrans=/auto/hi') || cookie.includes('googtrans=/en/hi') ||
          document.body.classList.contains('translated-ltr') ||
          document.querySelector('font[style*="background-color"]')) {
        setSelectedLang('hi');
      } else {
        setSelectedLang('en');
      }
    };

    // Check language state after a delay to ensure Google Translate is loaded
    setTimeout(checkCurrentLanguage, 1000);
  }, []);

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
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            {/* Logo */}
            <div className="flex items-center space-x-3" translate="no">
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
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Prepared
              </a>
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
                <NavLink to="/" end className={linkClasses} onClick={() => setIsMenuOpen(false)}>
                  Home
                </NavLink>
                <NavLink to="/analytics" className={linkClasses} onClick={() => setIsMenuOpen(false)}>
                  Analytics
                </NavLink>
                <NavLink to="/about" className={linkClasses} onClick={() => setIsMenuOpen(false)}>
                  About us
                </NavLink>

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

      {/* Visible Google Translate element for programmatic access */}
      {/* <div id="google_translate_element" style={{ display: 'none' }}></div> */}

      {/* Enhanced CSS to hide Google Translate UI */}
      <style jsx global>{`
        /* Hide Google Translate widget UI */
        #google_translate_element {
          display: none !important;
        }
        
        .skiptranslate > iframe {
          display: none !important;
        }
        
        body > .skiptranslate {
          display: none !important;
        }
        
        .goog-te-banner-frame {
          display: none !important;
        }
        
        body {
          top: 0px !important;
        }
        
        /* Keep the dropdown accessible but hidden */
        .goog-te-combo {
          position: absolute !important;
          left: -9999px !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
        
        /* Fix translation styling issues */
        font[style*="background-color: rgba(0, 0, 0, 0.1)"] {
          background-color: transparent !important;
          background: none !important;
        }
      `}</style>
    </>
  );
};

export default Header1;
