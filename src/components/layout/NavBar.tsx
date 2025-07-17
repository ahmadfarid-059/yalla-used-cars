"use client";

import React, { useState } from "react";
import { ChevronDown, Menu, User, Bell, ChevronUp } from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/images/logo-en.svg";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { replace } = useRouter();

  const navItems = [
    { name: "Used", href: "/used-cars", hasNew: true },
    { name: "Featured", href: "/used-cars?featured=true", hasNew: true },
  ];

  const countries = [
    { code: "AE", name: "UAE", flag: "🇦🇪" },
    { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
    { code: "KW", name: "Kuwait", flag: "🇰🇼" },
    { code: "QA", name: "Qatar", flag: "🇶🇦" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Image
            alt="logo"
            src={Logo}
            width={150}
            height={80}
            onClick={() => replace("/used-cars")}
            className="cursor-pointer"
          />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 h-full">
            {/* Country/Language Selector */}
            <div className="relative h-full">
              <button
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 h-full hover:border-b-primary hover:border-b-4 text-sm text-black  transition-colors cursor-pointer"
              >
                <span className="text-lg">🇦🇪</span>
                <span className="font-medium">UAE</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isCountryDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsCountryDropdownOpen(false)}
                    >
                      <span className="text-lg">{country.flag}</span>
                      <span>{country.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Arabic Language Toggle */}
            <button className="flex items-center space-x-2 px-3 py-2 h-full hover:border-b-primary hover:border-b-4 text-sm text-black  transition-colors cursor-pointer">
              العربية
            </button>

            {/* Navigation Items */}
            <div className="flex items-center space-x-6 h-full">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative flex items-center text-sm font-medium text-gray-700 hover:border-b-primary hover:border-b-4 transition-colors h-full"
                >
                  {item.name}
                  {item.hasNew && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold text-white bg-red-500 rounded-full">
                      New
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Sell My Car Button */}
            <button className="hidden md:inline-flex items-center px-4 py-2 bg-green-light hover:bg-green-dark text-white font-bold rounded-md transition-colors cursor-pointer">
              Sell My Car
            </button>

            {/* Notifications (Optional) */}
            <button className="hidden md:flex p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>

            {/* User Dropdown */}
            <div className="relative ">
              <button
                className="flex items-center space-x-1 p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <User className="w-5 h-5" />
                {isUserDropdownOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 rounded-2xl top-full mt-1 w-48 text-primary bg-white border border-gray-200 shadow-lg z-50">
                  <div className="px-4 py-2  my-2 text-sm text-primary font-bold cursor-pointer hover:bg-gray-50 hover:text-black">
                    Login | Register
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Country Selector Mobile */}
              <div className="px-3 py-2">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <span className="text-lg">🇦🇪</span>
                  <span>UAE</span>
                  <span className="mx-2">•</span>
                  <span>العربية</span>
                </div>
              </div>

              {/* Navigation Items Mobile */}
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  {item.name}
                  {item.hasNew && (
                    <span className="ml-2 px-1.5 py-0.5 text-xs font-semibold text-white bg-red-500 rounded-full">
                      New
                    </span>
                  )}
                </a>
              ))}

              {/* Mobile Actions */}
              <div className="pt-4 pb-2 border-t border-gray-200">
                <button className="w-full mb-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition-colors">
                  Sell My Car
                </button>
                <div className="space-y-1">
                  <a
                    href="/login"
                    className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    Sign In
                  </a>
                  <a
                    href="/register"
                    className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    Register
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for dropdowns */}
      {(isCountryDropdownOpen || isUserDropdownOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsCountryDropdownOpen(false);
            setIsUserDropdownOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
