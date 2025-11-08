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
    <header className="bg-[#25434e] text-white px-6 h-20 flex items-center">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/logo2.png" // Path to the logo in the public folder
            alt="Logo"
            className="w-17 h-17 object-contain mr-4" // Increased size of the logo
          />
        </div>

        {/* Title */}
        <div className="flex-1 text-center">
          <h1 className="text-3xl font-bold tracking-wide">
            Heat Resilience Readiness DSS
          </h1>
        </div>

        {/* Language Selector and Accessibility */}

      </div>
    </header>
  );
};

export default Header;
