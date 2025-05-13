import React from 'react';
import { Phone } from 'lucide-react';

const TopHeader = () => (
  <div className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-6 h-14">
    {/* Left: Logo and nav */}
    <div className="flex items-center gap-8">
      <img src="/lovable-uploads/b3b14138-007e-4f04-b265-b44f5f351a9b.png" alt="Flyin.com" className="h-7" />
      <nav className="flex gap-6 text-sm font-medium text-[#1a2a3a]">
        <a href="#" className="hover:text-[#194E91]">Flights</a>
        <a href="#" className="hover:text-[#194E91]">Hotels</a>
        <a href="#" className="hover:text-[#194E91]">Flight + Hotel</a>
        <a href="#" className="hover:text-[#194E91]">Staycations</a>
        <a href="#" className="hover:text-[#194E91]">Activities</a>
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
        {/* WhatsApp Icon SVG */}
        <svg className="h-5 w-5 text-gray-500" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.828-2.205C13.416 27.417 14.686 27.7 16 27.7c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.7c-1.18 0-2.337-.206-3.433-.611l-.244-.09-4.65 1.308 1.242-4.47-.159-.23C7.13 19.02 6.3 17.06 6.3 15c0-5.374 4.326-9.7 9.7-9.7s9.7 4.326 9.7 9.7-4.326 9.7-9.7 9.7zm5.13-7.13c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.28.7-.9.86-.16.18-.32.2-.6.07-.28.14-1.18.43-2.25-1.36-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3s.98 2.66 1.12 2.85c.14.18 1.93 2.95 4.68 4.02.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/>
          </g>
        </svg>
        +966112246333
      </a>
      <img src="/images/awards-header.png" alt="Middle East's Leading Online Travel Agency Awards" className="h-8" />
    </div>
  </div>
);

export default TopHeader; 