import React, { useState, useRef } from "react";
import { FaGlobe } from "react-icons/fa";

const NavBar = () => {
  const [langDropdown, setLangDropdown] = useState(false);
  const [language, setLanguage] = useState("English");
  const langRef = useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#12303b] w-full py-2">
      <div className="flex items-center justify-end space-x-10 px-8 w-full">
        <a href="#" className="text-white text-[17px] hover:text-blue-200 transition">Home</a>
        <a href="#" className="text-white text-[17px] hover:text-blue-200 transition">Analytics</a>
        <a href="#" className="text-white text-[17px] hover:text-blue-200 transition">Datasets</a>
        <a href="#" className="text-white text-[17px] hover:text-blue-200 transition">About us</a>
        <div className="relative" ref={langRef}>
          <button
            className="flex items-center text-white text-[17px] px-2"
            onClick={() => setLangDropdown((d) => !d)}
          >
            <FaGlobe className="mr-2 text-lg" />
            {language}
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {langDropdown && (
            <div className="absolute right-0 mt-2 w-28 bg-white text-black rounded shadow-lg z-50 border">
              <div
                onClick={() => { setLanguage("English"); setLangDropdown(false); }}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${language === "English" ? "bg-blue-100" : ""}`}
              >
                English
              </div>
              <div
                onClick={() => { setLanguage("Hindi"); setLangDropdown(false); }}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${language === "Hindi" ? "bg-blue-100" : ""}`}
              >
                Hindi
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
