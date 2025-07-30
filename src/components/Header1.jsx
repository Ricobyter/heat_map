import React, { useState } from 'react';
import { MdLocationOn } from 'react-icons/md';
import { HiMenu, HiMenuAlt1 } from 'react-icons/hi';

const Header1 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <div className="flex flex-col">
              <div className="text-md font-bold leading-tight">
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
            <div className="hidden sm:flex items-center space-x-1 text-sm text-gray-600">
              <MdLocationOn className="w-4 h-4" />
              <span>New delhi,DL</span>
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
              <div className="flex items-center space-x-1 text-sm text-gray-600 px-2 py-1">
                <MdLocationOn className="w-4 h-4" />
                <span>New delhi,DL</span>
             
                  <HiMenu className="w-6 h-6 text-black" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header1;
