import React from 'react';

const TopHeader = () => (
  <div className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-6 h-14">
    {/* Left: Logo and nav */}
    <div className="flex items-center gap-8">
      <img src="/lovable-uploads/b3b14138-007e-4f04-b265-b44f5f351a9b.png" alt="Flyin.com" className="h-7" />
      <nav className="flex gap-6 text-sm font-medium text-[#1a2a3a]">
        <a href="#" className="hover:text-blue-700">Flights</a>
        <a href="#" className="hover:text-blue-700">Hotels</a>
        <a href="#" className="hover:text-blue-700">Flight + Hotel</a>
        <a href="#" className="hover:text-blue-700">Staycations</a>
        <a href="#" className="hover:text-blue-700">Activities</a>
      </nav>
    </div>
    {/* Right: Deals, Sign In, My Bookings, Language, WhatsApp, Awards */}
    <div className="flex items-center gap-6 text-sm font-medium text-[#1a2a3a]">
      <div className="relative flex items-center">
        <span className="mr-1"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M4 7V6a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1" stroke="#1a2a3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect width="20" height="13" x="2" y="7" rx="2" stroke="#1a2a3a" strokeWidth="1.5"/><circle cx="17" cy="12" r="1" fill="#1a2a3a"/></svg></span>
        <span>Deals</span>
        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1.5">7</span>
      </div>
      <a href="#">Sign In</a>
      <a href="#">My Bookings</a>
      <select className="border rounded px-2 py-1"><option>عربي | SAR</option></select>
      <a href="tel:+966112246333" className="flex items-center gap-1">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M21 16.5V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.5a1 1 0 0 1 1 0.76l1.2 5a1 1 0 0 1-.29 1L8.09 11.91a16 16 0 0 0 6 6l2.15-2.15a1 1 0 0 1 1-.29l5 1.2a1 1 0 0 1 .76 1V19a2 2 0 0 1-2 2z" stroke="#1a2a3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        +966112246333
      </a>
      <img src="/images/awards-header.png" alt="Middle East's Leading Online Travel Agency Awards" className="h-8" />
    </div>
  </div>
);

export default TopHeader; 