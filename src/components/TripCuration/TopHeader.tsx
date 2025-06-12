import React, { useState } from 'react';
import { Phone, User, ChevronDown, Globe, DollarSign } from 'lucide-react';

interface TopHeaderProps {
  isSignedIn?: boolean;
  userName?: string;
  onSignIn?: () => void;
  onSignOut?: () => void;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
];

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', flag: '🇸🇦' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
];

const TopHeader = ({ 
  isSignedIn = false, 
  userName = '', 
  onSignIn, 
  onSignOut 
}: TopHeaderProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[1]); // Default to SAR

  return (
    <div className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-6 h-14">
      {/* Left: Logo and nav */}
      <div className="flex items-center gap-8">
        <img src="/lovable-uploads/b3b14138-007e-4f04-b265-b44f5f351a9b.png" alt="Flyin.com" className="h-7" />
        <nav className="hidden lg:flex gap-6 text-sm font-medium text-[#1a2a3a]">
          <a href="#" className="hover:text-[#194E91] transition-colors">Flights</a>
          <a href="#" className="hover:text-[#194E91] transition-colors">Hotels</a>
          <a href="#" className="hover:text-[#194E91] transition-colors">Flight + Hotel</a>
          <a href="#" className="hover:text-[#194E91] transition-colors">Staycations</a>
          <a href="#" className="hover:text-[#194E91] transition-colors">Activities</a>
        </nav>
      </div>
      
      {/* Right: Deals, My Bookings, Language, Currency, Contact, Awards, User Section */}
      <div className="flex items-center gap-4 text-sm font-medium text-[#1a2a3a]">
        {/* Deals */}
        <div className="relative flex items-center">
          <span className="mr-1">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path d="M4 7V6a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1" stroke="#1a2a3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect width="20" height="13" x="2" y="7" rx="2" stroke="#1a2a3a" strokeWidth="1.5"/>
              <circle cx="17" cy="12" r="1" fill="#1a2a3a"/>
            </svg>
          </span>
          <span className="hidden sm:inline">Deals</span>
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1.5">7</span>
        </div>
        
        {/* My Bookings */}
        <a href="#" className="hidden sm:inline hover:text-[#194E91] transition-colors">My Bookings</a>
        
        {/* Language Selector */}
        <div className="relative group">
          <button className="flex items-center gap-1 hover:text-[#194E91] transition-colors">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">{selectedLanguage.flag}</span>
            <span className="hidden md:inline">{selectedLanguage.name}</span>
            <ChevronDown className="h-3 w-3" />
          </button>
          
          {/* Language Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="py-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => setSelectedLanguage(language)}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    selectedLanguage.code === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <span className="mr-2">{language.flag}</span>
                  {language.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Currency Selector */}
        <div className="relative group">
          <button className="flex items-center gap-1 hover:text-[#194E91] transition-colors">
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">{selectedCurrency.flag}</span>
            <span>{selectedCurrency.code}</span>
            <ChevronDown className="h-3 w-3" />
          </button>
          
          {/* Currency Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="py-2">
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => setSelectedCurrency(currency)}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    selectedCurrency.code === currency.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <span className="mr-2">{currency.flag}</span>
                  <span className="font-medium">{currency.code}</span>
                  <span className="text-gray-500 ml-2">({currency.symbol}) {currency.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* WhatsApp Contact */}
        <a 
          href="tel:+966112246333" 
          className="hidden lg:flex items-center gap-1 hover:text-[#194E91] transition-colors"
        >
          <svg className="h-4 w-4 text-green-500" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.828-2.205C13.416 27.417 14.686 27.7 16 27.7c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.7c-1.18 0-2.337-.206-3.433-.611l-.244-.09-4.65 1.308 1.242-4.47-.159-.23C7.13 19.02 6.3 17.06 6.3 15c0-5.374 4.326-9.7 9.7-9.7s9.7 4.326 9.7 9.7-4.326 9.7-9.7 9.7z"/>
          </svg>
          <span className="hidden xl:inline">+966112246333</span>
        </a>
        
        {/* Awards */}
        <img 
          src="/images/awards-header.png" 
          alt="Middle East's Leading Online Travel Agency Awards" 
          className="h-6 hidden lg:block" 
        />
        
        {/* User Section - Moved to last position */}
        {isSignedIn ? (
          <div className="relative group">
            <button className="flex items-center gap-2 hover:text-[#194E91] transition-colors">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Hello {userName}</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            
            {/* User Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Bookings</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</a>
                <hr className="my-1" />
                <button 
                  onClick={onSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button 
            onClick={onSignIn}
            className="hover:text-[#194E91] transition-colors"
          >
            Sign In
          </button>
        )}
      </div>
      
      {/* Mobile Menu Button */}
      <button className="lg:hidden flex items-center">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
};

export default TopHeader; 