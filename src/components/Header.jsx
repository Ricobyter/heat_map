"use client";

import React, { useState, useRef } from "react";

const Header = () => {
  const [language, setLanguage] = useState("English");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-[#25434e] text-white px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mr-4 shadow-lg">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center relative">
                <div className="absolute inset-1 border-2 border-white rounded-full"></div>
                <div className="text-white text-xs font-bold z-10">BIHAR</div>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="flex-1 text-center">
          <h1 className="text-3xl font-bold tracking-wide">
            Heat Resilience Readiness DSS
          </h1>
        </div>

        {/* Language Selector and Accessibility */}
        <div className="flex items-center space-x-4">
          {/* Accessibility Button with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="bg-white bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center border-2 border-white border-opacity-30 focus:outline-none"
              onClick={() => setDropdownOpen((open) => !open)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
            >
              <span className="text-lg font-bold text-blue-900">A</span>
            </button>
            {dropdownOpen && (
              <ul
                className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg z-50 border"
                role="listbox"
              >
                <li
                  className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                    language === "English" ? "bg-blue-200" : ""
                  }`}
                  onClick={() => {
                    setLanguage("English");
                    setDropdownOpen(false);
                  }}
                  role="option"
                  aria-selected={language === "English"}
                >
                  English
                </li>
                <li
                  className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                    language === "Hindi" ? "bg-blue-200" : ""
                  }`}
                  onClick={() => {
                    setLanguage("Hindi");
                    setDropdownOpen(false);
                  }}
                  role="option"
                  aria-selected={language === "Hindi"}
                >
                  Hindi
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
