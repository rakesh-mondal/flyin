import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopHeader from '../TripCuration/TopHeader';
import { getAirlineLogo } from '../../utils/airlineLogos';
import ItineraryExtras from './ItineraryExtras';
import FareRules from './FareRules';
import TravellerInput from './TravellerInput';
import { ArrowDownTrayIcon, BriefcaseIcon, CakeIcon, CalendarIcon, DevicePhoneMobileIcon, BellIcon, ExclamationTriangleIcon, ClockIcon, CheckBadgeIcon, ShieldCheckIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Footprints, MoveRight, PlaneLanding, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const steps = [
  'Itinerary',
  'Recommended for you',
  'Add traveller details',
  'Add contact details',
];

const mockOffers = [
  {
    code: 'HSBCCC',
    icon: '', // Not needed, SVG will be rendered
    discount: 'Flat ₹1513 off',
    description: 'Applicable on HSBC Credit Cards',
    details: 'Know more',
    type: 'bank',
  },
  {
    code: 'HDFCEMI',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/HDFC_Bank_Logo.svg',
    discount: 'Flat ₹1500 off',
    description: 'Applicable on HDFC Credit Card EMI',
    details: 'Know more',
    type: 'bank',
  },
];

const CouponCard = () => {
  const [tab, setTab] = useState<'all' | 'bank'>('all');
  const [couponInput, setCouponInput] = useState('');
  const offers = tab === 'all' ? mockOffers : mockOffers.filter(o => o.type === 'bank');

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 w-full">
        <div className="font-semibold text-[16px] mb-3">Apply coupon or gift card</div>
        <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2 w-full mb-3">
          <input
            type="text"
            placeholder="Coupon/Gift card"
            value={couponInput}
            onChange={e => setCouponInput(e.target.value)}
            className="flex-1 border-none outline-none bg-transparent text-sm placeholder-gray-400 font-medium"
          />
          <button
            className={`ml-2 font-bold text-sm bg-transparent shadow-none border-none p-0 hover:bg-transparent focus:outline-none ${couponInput ? 'text-[#194a8f]' : 'text-gray-500'}`}
            type="button"
          >
            Apply
          </button>
        </div>
        <div className="flex gap-2 my-4">
          <button
            onClick={() => setTab('all')}
            className={`rounded-full px-4 py-1 text-xs font-bold border transition ${
              tab === 'all'
                ? 'border-[#194a8f] text-[#194a8f] bg-gray-100'
                : 'border-gray-200 text-black bg-white'
            }`}
          >
            All offers
          </button>
          <button
            onClick={() => setTab('bank')}
            className={`rounded-full px-4 py-1 text-xs font-bold border transition ${
              tab === 'bank'
                ? 'border-[#194a8f] text-[#194a8f] bg-gray-100'
                : 'border-gray-200 text-black bg-white'
            }`}
          >
            Bank offers
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {offers.map((offer) => (
            <div key={offer.code} className="flex flex-col gap-2 border-b last:border-b-0 pb-3 last:pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-[#F1F6FF] rounded-xl px-3 py-1">
                  {offer.code === 'HSBCCC' ? (
                    <span className="w-6 h-6 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                        <path d="M17.5006 6.42834H6.50742V17.5616H17.5006V6.42834Z" fill="white"/>
                        <path d="M23.0002 12.0081L17.5036 6.42834V17.5747L23.0002 12.0081Z" fill="#DB0011"/>
                        <path d="M12.004 12.0081L17.5006 6.42834H6.50742L12.004 12.0081Z" fill="#DB0011"/>
                        <path d="M1 12.0081L6.50952 17.5747V6.42834L1 12.0081Z" fill="#DB0011"/>
                        <path d="M12.004 12.0081L6.50742 17.5748H17.5006L12.004 12.0081Z" fill="#DB0011"/>
                      </svg>
                    </span>
                  ) : offer.code === 'HDFCEMI' ? (
                    <span className="w-6 h-6 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                        <path d="M2 2.00146H22V22.0015H2V2.00146Z" fill="#ED232A"/>
                        <path d="M5.50052 5.50234H18.5019V18.5038H5.50052V5.50234Z" fill="white"/>
                        <path d="M11.0002 2.00146H12.9994V22.0015H11.0002V2.00146Z" fill="white"/>
                        <path d="M2 11.0042H22V13.0034H2V11.0042Z" fill="white"/>
                        <path d="M9.00125 9.00294H15.0015V15.0032H9.00125V9.00294Z" fill="#004C8F"/>
                      </svg>
                    </span>
                  ) : (
                    <img src={offer.icon} alt={offer.code} className="h-6 w-6 rounded object-contain" />
                  )}
                  <span className="font-bold text-black text-[14px]">{offer.code}</span>
                </div>
                <button className="font-medium text-[#194a8f] text-[14px] cursor-pointer">Apply</button>
              </div>
              <div className="font-bold text-green-600 text-xs">{offer.discount}</div>
              <div className="font-medium text-gray-500 text-xs">
                {offer.description}
                <span className="font-semibold text-[#194a8f] ml-1 cursor-pointer">Know more</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const InfoRow = ({ label, value }: { label: string, value: React.ReactNode }) => (
  <div className="flex justify-between text-sm py-1">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-900">{value}</span>
  </div>
);

const ItineraryReview = ({ trip }: { trip: any }) => {
  // Mock data structure for demonstration
  const directions = [
    {
      title: 'Bangalore → Abu Dhabi',
      date: 'Fri, 16 May 2025',
      segments: [
        {
          airline: 'IndiGo',
          code: '6E-1419',
          class: 'Economy',
          depTime: '01:00',
          depCode: 'BLR',
          depAirport: 'Kempegowda International Airport, Terminal 2, Bangalore',
          arrTime: '03:50',
          arrCode: 'AUH',
          arrAirport: 'Zayed International Airport, Terminal A, Abu Dhabi',
          duration: '4h 20m',
          baggage: { checkin: '30kg', cabin: '7kg' },
        },
      ],
      layovers: [],
      arrivesNextDay: false,
    },
    {
      title: 'Abu Dhabi → Bangalore',
      date: 'Fri, 16 May 2025',
      segments: [
        {
          airline: 'IndiGo',
          code: '6E-6284',
          class: 'Economy',
          depTime: '02:30',
          depCode: 'AUH',
          depAirport: 'Zayed International Airport, Terminal A, Abu Dhabi',
          arrTime: '04:15',
          arrCode: 'BOM',
          arrAirport: 'Chatrapati Shivaji Airport, Terminal 2, Mumbai',
          duration: '1h 45m',
          baggage: { checkin: '30kg', cabin: '7kg' },
        },
        {
          layover: true,
          airport: 'Chatrapati Shivaji Airport, Mumbai (BOM)',
          duration: '2h 50m',
          short: true,
        },
        {
          airline: 'IndiGo',
          code: '6E-6284',
          class: 'Economy',
          depTime: '02:30',
          depCode: 'BOM',
          depAirport: 'Chatrapati Shivaji Airport, Terminal 2, Mumbai',
          arrTime: '04:15',
          arrCode: 'BLR',
          arrAirport: 'Kempegowda International Airport, Terminal 1, Bangalore',
          duration: '1h 45m',
          baggage: { checkin: '30kg', cabin: '7kg' },
        },
      ],
      layovers: [],
      arrivesNextDay: true,
    },
  ];

  return (
    <div className="w-full">
      {directions.map((dir, i) => (
        <div key={dir.title} className={i > 0 ? 'pt-8 border-t border-dashed border-gray-200 mt-8' : ''}>
          {/* Header precisely aligned with StepCard title text */}
          <div className="flex items-center justify-between mb-4 ml-4">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-base">{dir.title}</span>
              <span className="text-gray-400 text-base font-medium">{dir.date}</span>
              {dir.arrivesNextDay && (
                <span className="ml-2 px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs font-semibold">ARRIVES NEXT DAY</span>
              )}
            </div>
            <div className="flex gap-6 text-xs text-gray-600 items-center">
              <span className="inline-flex items-center">
                <svg className="inline mr-1" width="16" height="16" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" fill="none"></rect><path d="M5.08333 13.3333C4.78333 13.3333 4.52778 13.2277 4.31667 13.0166C4.10556 12.8055 4 12.55 4 12.25V5.66663C4 5.38886 4.09733 5.15286 4.292 4.95863C4.48622 4.76397 4.72222 4.66663 5 4.66663H6.33333V2.91663C6.33333 2.77219 6.38333 2.64708 6.48333 2.5413C6.58333 2.43597 6.71667 2.3833 6.88333 2.3833H9.11667C9.28333 2.3833 9.41667 2.43597 9.51667 2.5413C9.61667 2.64708 9.66667 2.77219 9.66667 2.91663V4.66663H10.9167C11.2167 4.66663 11.4722 4.77219 11.6833 4.9833C11.8944 5.19441 12 5.44997 12 5.74997V12.25C12 12.55 11.8944 12.8055 11.6833 13.0166C11.4722 13.2277 11.2167 13.3333 10.9167 13.3333C10.9167 13.4777 10.8696 13.6 10.7753 13.7C10.6807 13.8 10.5611 13.85 10.4167 13.85C10.2611 13.85 10.136 13.8 10.0413 13.7C9.94711 13.6 9.9 13.4777 9.9 13.3333H6.1C6.1 13.4777 6.05 13.6 5.95 13.7C5.85 13.8 5.72778 13.85 5.58333 13.85C5.43889 13.85 5.31956 13.8 5.22533 13.7C5.13067 13.6 5.08333 13.4777 5.08333 13.3333ZM6.91667 4.66663H9.08333V2.96663H6.91667V4.66663ZM5.08333 12.6666H10.9167C11.0389 12.6666 11.1389 12.6277 11.2167 12.55C11.2944 12.4722 11.3333 12.3722 11.3333 12.25V5.74997C11.3333 5.62775 11.2944 5.52775 11.2167 5.44997C11.1389 5.37219 11.0389 5.3333 10.9167 5.3333H5.08333C4.96111 5.3333 4.86111 5.37219 4.78333 5.44997C4.70556 5.52775 4.66667 5.62775 4.66667 5.74997V12.25C4.66667 12.3722 4.70556 12.4722 4.78333 12.55C4.86111 12.6277 4.96111 12.6666 5.08333 12.6666ZM5.53333 11.3666C5.53333 11.4555 5.56111 11.5277 5.61667 11.5833C5.67222 11.6389 5.74444 11.6666 5.83333 11.6666C5.92222 11.6666 5.99444 11.6389 6.05 11.5833C6.10556 11.5277 6.13333 11.4555 6.13333 11.3666V6.6333C6.13333 6.54441 6.10556 6.47219 6.05 6.41663C5.99444 6.36108 5.92222 6.3333 5.83333 6.3333C5.74444 6.3333 5.67222 6.36108 5.61667 6.41663C5.56111 6.47219 5.53333 6.54441 5.53333 6.6333V11.3666ZM7.7 11.3666C7.7 11.4555 7.72778 11.5277 7.78333 11.5833C7.83889 11.6389 7.91111 11.6666 8 11.6666C8.08889 11.6666 8.16111 11.6389 8.21667 11.5833C8.27222 11.5277 8.3 11.4555 8.3 11.3666V6.6333C8.3 6.54441 8.27222 6.47219 8.21667 6.41663C8.16111 6.36108 8.08889 6.3333 8 6.3333C7.91111 6.3333 7.83889 6.36108 7.78333 6.41663C7.72778 6.47219 7.7 6.54441 7.7 6.6333V11.3666ZM9.86667 11.3666C9.86667 11.4555 9.89444 11.5277 9.95 11.5833C10.0056 11.6389 10.0778 11.6666 10.1667 11.6666C10.2556 11.6666 10.3278 11.6389 10.3833 11.5833C10.4389 11.5277 10.4667 11.4555 10.4667 11.3666V6.6333C10.4667 6.54441 10.4389 6.47219 10.3833 6.41663C10.3278 6.36108 10.2556 6.3333 10.1667 6.3333C10.0778 6.3333 10.0056 6.36108 9.95 6.41663C9.89444 6.47219 9.86667 6.54441 9.86667 6.6333V11.3666Z" fill="#1C1B1F"></path></svg>
                Check-in: <span className="font-semibold">{dir.segments.find(s => s.baggage)?.baggage.checkin}</span>
              </span>
              <span className="inline-flex items-center">
                <svg className="inline mr-1" width="16" height="16" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" fill="none"></rect><path d="M9.44306 3.21053C9.44306 2.54197 8.90109 2 8.23253 2C7.56398 2 7.02201 2.54197 7.02201 3.21053M11.8641 12.2895C12.1984 12.2895 12.4694 12.0185 12.4694 11.6842V9.26316C12.4694 8.92888 12.1984 8.65789 11.8641 8.65789M4.62931 8.65801C4.29486 8.65539 4.02161 8.92424 4.01899 9.25851L4.00002 11.6795C3.9974 12.0138 4.2664 12.2869 4.60086 12.2895M10.6536 13.5V11.6842C10.6536 10.3471 9.56964 9.26316 8.23253 9.26316C6.89542 9.26316 5.81148 10.3471 5.81148 11.6842V13.5H10.6536ZM8.23253 3.21053C10.2382 3.21053 11.8641 4.83644 11.8641 6.84211V12.6842C11.8641 13.1348 11.4989 13.5 11.0483 13.5H5.41674C4.9662 13.5 4.60096 13.1348 4.60096 12.6842V6.84211C4.60096 4.83644 6.22687 3.21053 8.23253 3.21053ZM7.32938 6.84211H9.14517C9.47944 6.84211 9.75043 6.57112 9.75043 6.23684C9.75043 5.90256 9.47944 5.63158 9.14517 5.63158H7.32938C6.9951 5.63158 6.72411 5.90256 6.72411 6.23684C6.72411 6.57112 6.9951 6.84211 7.32938 6.84211Z" stroke="#1A1A1A" stroke-width="0.7"></path></svg>
                Cabin: <span className="font-semibold">{dir.segments.find(s => s.baggage)?.baggage.cabin}</span>
              </span>
            </div>
          </div>
          {/* Content aligned with header */}
          <div>
            {dir.segments.map((seg, idx) => (
              seg.layover ? (
                <div key={idx} className="flex items-center bg-gray-50 rounded text-xs text-gray-700 px-4 py-3 my-4 justify-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <span className="cursor-pointer flex items-center gap-1 hover:underline">
                        <span className="font-semibold text-blue-700">Layover</span>
                        {` in ${seg.airport} `}
                        <span className="ml-2 text-xs text-rose-500 font-medium">Short layover {seg.duration}</span>
                        <Info className="ml-1 h-3.5 w-3.5 text-blue-500" />
                      </span>
                    </PopoverTrigger>
                    <PopoverContent side="top" align="center" className="bg-white rounded-xl shadow-xl border border-gray-200 p-0 max-w-xs w-[320px]">
                      <div className="p-4">
                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Footprints className="h-4 w-4 text-blue-500" />
                            <span className="font-semibold text-sm text-gray-900">Walking Information</span>
                          </div>
                          <ul className="ml-6 mt-1 text-xs text-gray-700 space-y-0.5">
                            <li className="flex items-center gap-2"><MoveRight className="h-3 w-3 text-gray-400" />Distance: ~800m between terminals</li>
                            <li className="flex items-center gap-2"><ClockIcon className="h-3 w-3 text-gray-400" />Walking time: 8-12 minutes</li>
                            <li className="flex items-center gap-2"><MoveRight className="h-3 w-3 text-gray-400" />Escalators/moving walkways available</li>
                          </ul>
                        </div>
                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <PlaneLanding className="h-4 w-4 text-blue-500" />
                            <span className="font-semibold text-sm text-gray-900">Terminal Transfer</span>
                          </div>
                          <ul className="ml-6 mt-1 text-xs text-gray-700 space-y-0.5">
                            <li>Arrival: <span className="font-medium">Terminal 1, Gate A12</span></li>
                            <li>Departure: <span className="font-medium">Terminal 1, Gate B8</span></li>
                            <li className="flex items-center gap-2"><CheckBadgeIcon className="h-3 w-3 text-green-500" />Same terminal - no shuttle required</li>
                          </ul>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Info className="h-4 w-4 text-blue-500" />
                            <span className="font-semibold text-sm text-gray-900">Important Notes</span>
                          </div>
                          <ul className="ml-6 mt-1 text-xs text-gray-700 space-y-0.5">
                            <li>No visa required for transit</li>
                            <li>Stay in international transit area</li>
                            <li>Boarding begins 45 minutes before departure</li>
                          </ul>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              ) : (
                <div key={idx} className="flex gap-6 items-center" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                  {/* Left: Airline Info */}
                  <div className="flex flex-col items-center min-w-[90px] w-[90px]">
                    <img src={getAirlineLogo(seg.airline)} alt={seg.airline} className="h-10 w-10 rounded bg-white border border-gray-200 object-contain mb-2" />
                    <span className="font-semibold text-gray-900 text-sm text-center">{seg.airline}</span>
                    <span className="text-xs text-gray-500 text-center">{seg.code}</span>
                    <span className="text-xs text-gray-400 text-center font-medium">{seg.class}</span>
                  </div>
                  {/* Right: Timeline and Details */}
                  <div className="flex-1 flex flex-col relative">
                    {/* Departure */}
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-gray-900">{seg.depTime}</span>
                      <span className="text-base text-blue-900 font-sans">{seg.depCode}</span>
                      <span className="text-gray-800 text-sm font-semibold">{seg.depAirport}</span>
                    </div>
                    {/* Timeline with duration */}
                    <div className="flex items-center my-2 relative">
                      <div className="flex flex-col items-center mr-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#194a8f' }} />
                        <div className="w-0.5 h-8" style={{ backgroundColor: '#90b4e8' }} />
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#194a8f' }} />
                      </div>
                      <span className="flex items-center mx-2 text-sm text-gray-600 font-medium">
                        <svg className="mr-1" width="20" height="20" style={{ transform: 'scale(0.7)' }} viewBox="0 0 20 20"><g fill="#4D4D4D" fillRule="evenodd"><path d="M19.202 6.102c-1.055-2.459-2.847-4.246-5.325-5.304A9.83 9.83 0 009.984 0a9.728 9.728 0 00-3.882.798C3.643 1.853 1.844 3.64.787 6.102A9.732 9.732 0 000 9.984c0 1.356.258 2.659.787 3.893 1.057 2.462 2.857 4.26 5.315 5.314a9.728 9.728 0 003.882.798c1.355 0 2.654-.27 3.892-.798 2.48-1.057 4.271-2.856 5.326-5.314A9.782 9.782 0 0020 9.984a9.724 9.724 0 00-.798-3.882zm-1.597 8.3a8.773 8.773 0 01-3.215 3.203 8.613 8.613 0 01-4.406 1.181c-1.192 0-2.33-.23-3.412-.7-1.083-.47-2.017-1.088-2.8-1.87-.781-.781-1.404-1.725-1.87-2.81a8.61 8.61 0 01-.688-3.422c0-1.586.39-3.054 1.17-4.396a8.778 8.778 0 013.204-3.204 8.546 8.546 0 014.396-1.181c1.585 0 3.06.396 4.406 1.18a8.8 8.8 0 013.215 3.205 8.547 8.547 0 011.181 4.396 8.629 8.629 0 01-1.18 4.417z" fillRule="nonzero"></path><path d="M10.618 9.902V4.237c0-.339-.295-.612-.634-.612a.616.616 0 00-.602.612V9.99c0 .011.022.055.022.088a.572.572 0 00.164.492l3.27 3.27a.622.622 0 00.842 0 .59.59 0 000-.854l-3.062-3.083z"></path></g></svg>
                        {seg.duration}
                        <Popover>
                          <PopoverTrigger asChild>
                            <span className="flex items-center gap-2 ml-3 cursor-pointer">
                              <img src="/icons/wifi.png" alt="Wi-Fi" className="w-5 h-5 bg-gray-50 rounded" />
                              <img src="/icons/power.png" alt="Power" className="w-5 h-5 bg-gray-50 rounded" />
                              <img src="/icons/entertainment.png" alt="Entertainment" className="w-5 h-5 bg-gray-50 rounded" />
                              <img src="/icons/baby.png" alt="Baby" className="w-5 h-5 bg-gray-50 rounded" />
                              <img src="/icons/meal.png" alt="Meal" className="w-5 h-5 bg-gray-50 rounded" />
                            </span>
                          </PopoverTrigger>
                          <PopoverContent side="bottom" align="start" className="p-3 w-56 bg-white rounded-xl shadow-xl border border-gray-200">
                            <div className="flex flex-col gap-3">
                              <div className="flex items-center gap-2">
                                <img src="/icons/wifi.png" alt="Wi-Fi" className="w-5 h-5" />
                                <span className="text-sm text-green-700">Wi-fi available</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <img src="/icons/power.png" alt="Power" className="w-5 h-5" />
                                <span className="text-sm text-green-700">Power outlet available</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <img src="/icons/baby.png" alt="Baby" className="w-5 h-5" />
                                <span className="text-sm text-red-600">No baby bassinet</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <img src="/icons/entertainment.png" alt="Entertainment" className="w-5 h-5" />
                                <span className="text-sm text-red-600">No entertainment</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <img src="/icons/meal.png" alt="Meal" className="w-5 h-5" />
                                <span className="text-sm text-red-600">No meal</span>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </span>
                    </div>
                    {/* Arrival */}
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-gray-900">{seg.arrTime}</span>
                      <span className="text-base text-blue-900 font-sans">{seg.arrCode}</span>
                      <span className="text-gray-800 text-sm font-semibold">{seg.arrAirport}</span>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const StepCard = ({ 
  step, 
  title, 
  children, 
  open, 
  className = "", 
  isActive = false, 
  isCompleted = false,
  onHeaderClick 
}: { 
  step: number, 
  title: string, 
  children?: React.ReactNode, 
  open: boolean, 
  className?: string,
  isActive?: boolean,
  isCompleted?: boolean,
  onHeaderClick?: () => void
}) => {
  // Determine circle styling based on step state
  const getCircleClasses = () => {
    if (isActive) {
      return "bg-black text-white border-black";
    } else if (isCompleted) {
      return "bg-[#194a8f] text-white border-[#194a8f]";
    } else {
      return "bg-white text-black border-black";
    }
  };

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 p-4 w-full ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-sm ${getCircleClasses()}`}>
            {step}
          </div>
          <span className="text-lg font-bold">{title}</span>
        </div>
        {isCompleted && (
          <button 
            onClick={onHeaderClick}
            className="flex items-center justify-center w-7 h-7 hover:bg-blue-50 rounded-full transition-colors group"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="11.5" stroke="#2563EB"/>
              <path d="M8 10l4 4 4-4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
      {open ? (
        children || <div className="text-gray-400 text-base mt-2">Coming soon...</div>
      ) : (
        children
      )}
    </div>
  );
};

const SummarySidebar = ({ trip }: { trip: any }) => {
  // State for add-ons expand/collapse
  const [addonsOpen, setAddonsOpen] = useState(true);
  return (
    <div className="sticky top-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4">
        {/* Top row */}
        <div className="flex items-center justify-between mb-1">
          <div className="font-bold text-[16px]">Fare summary</div>
          <div className="text-base text-gray-500 font-normal">1 traveller</div>
        </div>
        {/* List */}
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-[#4B5563] font-medium">Base fare</span>
            <span className="font-bold text-gray-900">₹19,384</span>
          </div>
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-[#4B5563] font-medium">Taxes & fees</span>
            <span className="font-bold text-gray-900">₹2,741</span>
          </div>
          {/* Add-ons */}
          <div>
            <div className="flex items-center justify-between text-[12px] cursor-pointer select-none" onClick={() => setAddonsOpen(v => !v)}>
              <span className="text-[#4B5563] font-medium text-left flex items-center">Add-ons
                <svg className={`ml-1 w-4 h-4 transition-transform ${addonsOpen ? '' : 'rotate-180'}`} viewBox="0 0 20 20" fill="none"><path d="M6 8l4 4 4-4" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <span className="font-bold text-gray-900">₹2,741</span>
            </div>
            {addonsOpen && (
              <div className="mt-2 flex flex-col gap-1">
                <div className="flex items-center justify-between text-[12px] text-gray-500">
                  <span className="flex items-center text-left text-[#4B5563] font-medium">Seat selection</span>
                  <span className="font-medium">₹900</span>
                </div>
                <div className="flex items-center justify-between text-[12px] text-gray-500">
                  <span className="flex items-center text-left text-[#4B5563] font-medium">Meals</span>
                  <span className="font-medium">₹900</span>
                </div>
                <div className="flex items-center justify-between text-[12px] text-gray-500">
                  <span className="flex items-center text-left text-[#4B5563] font-medium">Baggage</span>
                  <span className="font-medium">₹900</span>
                </div>
              </div>
            )}
          </div>
          {/* Discount */}
          <div className="flex items-center justify-between text-[12px] mt-2">
            <span className="text-[#4B5563] font-medium flex items-center text-left">Discount
              <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#A0AEC0" strokeWidth="2"/><path d="M15 12H9" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span className="font-bold text-green-600">-₹900</span>
          </div>
        </div>
        <hr className="my-4 border-gray-200" />
        {/* Total price */}
        <div className="flex items-center justify-between text-[14px] font-bold">
          <span>Total price</span>
          <span>₹26,083</span>
        </div>
        {/* EMI section remains as is */}
        <div className="flex items-start gap-3 bg-yellow-50 rounded-xl p-[10px] mt-4">
          <span className="mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#194a8f" width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </svg>
          </span>
          <div className="flex-1">
            <div className="text-[12px] font-medium text-gray-900 mb-0.5">Pay in 3 interest free EMIs</div>
            <div className="text-[16px] font-bold text-gray-900 mb-0.5">at ₹8,694/mo <span className="text-[#194a8f] text-[12px] font-semibold ml-1 cursor-pointer">· View plans</span></div>
            <div className="text-[12px] text-gray-500">with your credit card</div>
          </div>
        </div>
      </div>
      <CouponCard />
    </div>
  );
};

// 2. Update HorizontalProgressBar to be in a card and match main+sidebar width
function HorizontalProgressBar({ steps, currentStep }) {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[1120px] rounded-2xl border border-gray-200 bg-white px-2 py-3 flex items-center justify-between mb-4 sticky top-0 z-30">
        {steps.map((label, idx) => {
          const stepNum = idx + 1;
          const isActive = currentStep === stepNum;
          const isCompleted = currentStep > stepNum;
          // Always show the label for every step
          return (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center flex-1 min-w-0">
                <div className={`flex items-center justify-center w-7 h-7 rounded-full border-2 font-bold text-sm transition-all duration-200 ${isActive ? 'bg-black text-white border-black' : isCompleted ? 'bg-[#194a8f] text-white border-[#194a8f]' : 'bg-white text-gray-400 border-gray-300'}`}>{stepNum}</div>
                <span className={`mt-1 text-xs font-semibold text-center ${isActive ? 'text-black' : isCompleted ? 'text-[#194a8f]' : 'text-gray-400'}`}>{label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-1 md:mx-2 rounded ${currentStep > stepNum ? 'bg-[#194a8f]' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default function BookingPage({ trip }: { trip: any }) {
  // Debug log for trip object
  console.log('BookingPage trip:', trip);

  const navigate = useNavigate();
  const [openStep, setOpenStep] = useState(1);
  const [showAdultForm, setShowAdultForm] = useState(false);
  const [showChildForm, setShowChildForm] = useState(false);

  // Traveller form state variables
  const [firstNameAdult1, setFirstNameAdult1] = useState('');
  const [lastNameAdult1, setLastNameAdult1] = useState('');
  const [genderAdult1, setGenderAdult1] = useState('');
  const [nationalityAdult1, setNationalityAdult1] = useState('');
  const [passportAdult1, setPassportAdult1] = useState('');
  const [dobDayAdult1, setDobDayAdult1] = useState('');
  const [dobMonthAdult1, setDobMonthAdult1] = useState('');
  const [dobYearAdult1, setDobYearAdult1] = useState('');

  const [firstNameAdult2, setFirstNameAdult2] = useState('');
  const [lastNameAdult2, setLastNameAdult2] = useState('');
  const [genderAdult2, setGenderAdult2] = useState('');
  const [nationalityAdult2, setNationalityAdult2] = useState('');
  const [passportAdult2, setPassportAdult2] = useState('');
  const [dobDayAdult2, setDobDayAdult2] = useState('');
  const [dobMonthAdult2, setDobMonthAdult2] = useState('');
  const [dobYearAdult2, setDobYearAdult2] = useState('');

  const [firstNameChild1, setFirstNameChild1] = useState('');
  const [lastNameChild1, setLastNameChild1] = useState('');
  const [genderChild1, setGenderChild1] = useState('');
  const [nationalityChild1, setNationalityChild1] = useState('');
  const [passportChild1, setPassportChild1] = useState('');
  const [dobDayChild1, setDobDayChild1] = useState('');
  const [dobMonthChild1, setDobMonthChild1] = useState('');
  const [dobYearChild1, setDobYearChild1] = useState('');

  // Passport expiry state variables
  const [passportExpiredAdult1, setPassportExpiredAdult1] = useState(false);
  const [passportExpiredAdult2, setPassportExpiredAdult2] = useState(false);
  const [passportExpiredChild1, setPassportExpiredChild1] = useState(false);

  // Modal state for policies
  const [smartDelayModalOpen, setSmartDelayModalOpen] = useState(false);
  const [flightNotificationModalOpen, setFlightNotificationModalOpen] = useState(false);
  const [autoCheckinModalOpen, setAutoCheckinModalOpen] = useState(false);
  const [lostLuggageModalOpen, setLostLuggageModalOpen] = useState(false);
  const [tripAddModalOpen, setTripAddModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopHeader />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 pt-4 pb-12 px-4 items-start min-h-screen">
        {/* Left: Step Content */}
        <main className="flex-1 min-w-0">
          {/* Step 1: Review your itinerary */}
          <StepCard 
            step={1} 
            title="Review your itinerary" 
            open={openStep >= 1} 
            isActive={openStep === 1} 
            isCompleted={openStep > 1}
            onHeaderClick={() => setOpenStep(1)}
          >
            {openStep === 1 ? (
              <>
                <ItineraryReview trip={trip} />
                <FareRules
                  directions={[
                    {
                      label: 'BLR → DEL: Standard fare',
                      highlights: [
                        {
                          icon: (
                            <svg className="w-6 h-6 text-gray-700" width="16" height="16" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" fill="none"></rect><path d="M5.08333 13.3333C4.78333 13.3333 4.52778 13.2277 4.31667 13.0166C4.10556 12.8055 4 12.55 4 12.25V5.66663C4 5.38886 4.09733 5.15286 4.292 4.95863C4.48622 4.76397 4.72222 4.66663 5 4.66663H6.33333V2.91663C6.33333 2.77219 6.38333 2.64708 6.48333 2.5413C6.58333 2.43597 6.71667 2.3833 6.88333 2.3833H9.11667C9.28333 2.3833 9.41667 2.43597 9.51667 2.5413C9.61667 2.64708 9.66667 2.77219 9.66667 2.91663V4.66663H10.9167C11.2167 4.66663 11.4722 4.77219 11.6833 4.9833C11.8944 5.19441 12 5.44997 12 5.74997V12.25C12 12.55 11.8944 12.8055 11.6833 13.0166C11.4722 13.2277 11.2167 13.3333 10.9167 13.3333C10.9167 13.4777 10.8696 13.6 10.7753 13.7C10.6807 13.8 10.5611 13.85 10.4167 13.85C10.2611 13.85 10.136 13.8 10.0413 13.7C9.94711 13.6 9.9 13.4777 9.9 13.3333H6.1C6.1 13.4777 6.05 13.6 5.95 13.7C5.85 13.8 5.72778 13.85 5.58333 13.85C5.43889 13.85 5.31956 13.8 5.22533 13.7C5.13067 13.6 5.08333 13.4777 5.08333 13.3333ZM6.91667 4.66663H9.08333V2.96663H6.91667V4.66663ZM5.08333 12.6666H10.9167C11.0389 12.6666 11.1389 12.6277 11.2167 12.55C11.2944 12.4722 11.3333 12.3722 11.3333 12.25V5.74997C11.3333 5.62775 11.2944 5.52775 11.2167 5.44997C11.1389 5.37219 11.0389 5.3333 10.9167 5.3333H5.08333C4.96111 5.3333 4.86111 5.37219 4.78333 5.44997C4.70556 5.52775 4.66667 5.62775 4.66667 5.74997V12.25C4.66667 12.3722 4.70556 12.4722 4.78333 12.55C4.86111 12.6277 4.96111 12.6666 5.08333 12.6666ZM5.53333 11.3666C5.53333 11.4555 5.56111 11.5277 5.61667 11.5833C5.67222 11.6389 5.74444 11.6666 5.83333 11.6666C5.92222 11.6666 5.99444 11.6389 6.05 11.5833C6.10556 11.5277 6.13333 11.4555 6.13333 11.3666V6.6333C6.13333 6.54441 6.10556 6.47219 6.05 6.41663C5.99444 6.36108 5.92222 6.3333 5.83333 6.3333C5.74444 6.3333 5.67222 6.36108 5.61667 6.41663C5.56111 6.47219 5.53333 6.54441 5.53333 6.6333V11.3666ZM7.7 11.3666C7.7 11.4555 7.72778 11.5277 7.78333 11.5833C7.83889 11.6389 7.91111 11.6666 8 11.6666C8.08889 11.6666 8.16111 11.6389 8.21667 11.5833C8.27222 11.5277 8.3 11.4555 8.3 11.3666V6.6333C8.3 6.54441 8.27222 6.47219 8.21667 6.41663C8.16111 6.36108 8.08889 6.3333 8 6.3333C7.91111 6.3333 7.83889 6.36108 7.78333 6.41663C7.72778 6.47219 7.7 6.54441 7.7 6.6333V11.3666ZM9.86667 11.3666C9.86667 11.4555 9.89444 11.5277 9.95 11.5833C10.0056 11.6389 10.0778 11.6666 10.1667 11.6666C10.2556 11.6666 10.3278 11.6389 10.3833 11.5833C10.4389 11.5277 10.4667 11.4555 10.4667 11.3666V6.6333C10.4667 6.54441 10.4389 6.47219 10.3833 6.41663C10.3278 6.36108 10.2556 6.3333 10.1667 6.3333C10.0778 6.3333 10.0056 6.36108 9.95 6.41663C9.89444 6.47219 9.86667 6.54441 9.86667 6.6333V11.3666Z" fill="#1C1B1F"></path></svg>
                            ),
                          text: 'Check-in/person: 15kg',
                        },
                        {
                          icon: (
                            <svg className="w-6 h-6 text-gray-700" width="16" height="16" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" fill="none"></rect><path d="M9.44306 3.21053C9.44306 2.54197 8.90109 2 8.23253 2C7.56398 2 7.02201 2.54197 7.02201 3.21053M11.8641 12.2895C12.1984 12.2895 12.4694 12.0185 12.4694 11.6842V9.26316C12.4694 8.92888 12.1984 8.65789 11.8641 8.65789M4.62931 8.65801C4.29486 8.65539 4.02161 8.92424 4.01899 9.25851L4.00002 11.6795C3.9974 12.0138 4.2664 12.2869 4.60086 12.2895M10.6536 13.5V11.6842C10.6536 10.3471 9.56964 9.26316 8.23253 9.26316C6.89542 9.26316 5.81148 10.3471 5.81148 11.6842V13.5H10.6536ZM8.23253 3.21053C10.2382 3.21053 11.8641 4.83644 11.8641 6.84211V12.6842C11.8641 13.1348 11.4989 13.5 11.0483 13.5H5.41674C4.9662 13.5 4.60096 13.1348 4.60096 12.6842V6.84211C4.60096 4.83644 6.22687 3.21053 8.23253 3.21053ZM7.32938 6.84211H9.14517C9.47944 6.84211 9.75043 6.57112 9.75043 6.23684C9.75043 5.90256 9.47944 5.63158 9.14517 5.63158H7.32938C6.9951 5.63158 6.72411 5.90256 6.72411 6.23684C6.72411 6.57112 6.9951 6.84211 7.32938 6.84211Z" stroke="#1A1A1A" stroke-width="0.7"></path></svg>
                            ),
                          text: 'Cabin/person: 7kg',
                        },
                        {
                          icon: (
                            <svg className="w-[18px] h-[18px] text-gray-700" width="18" height="18" viewBox="0 0 16 16"><g fill="none" fillRule="evenodd"><path d="M0 0h16v16H0z"></path><path d="M.667 14.653c0 .374.3.674.673.674H10c.373 0 .673-.3.673-.674V14H.667v.653zm5-8.66c-2.5 0-5 1.34-5 4.007h10c0-2.667-2.5-4.007-5-4.007zM2.413 8.667c.74-1.034 2.314-1.34 3.254-1.34s2.513.306 3.253 1.34H2.413zM.667 11.333h10v1.334h-10v-1.334zm11.333-8V.667h-1.333v2.666H7.333l.154 1.334h6.373L12.927 14H12v1.333h1.147c.56 0 1.02-.433 1.086-.98l1.1-11.02H12z" fill="#4D4D4D" fillRule="nonzero"></path></g></svg>
                            ),
                          text: 'Paid Meal',
                        },
                        {
                          icon: (
                            <svg className="w-[18px] h-[18px] text-gray-700" width="18" height="18" viewBox="0 0 16 16"><g fill="none" fillRule="evenodd"><path d="M0 0h16v16H0z"></path><path d="M5.06 3.607a1.336 1.336 0 0 1 0-1.887c.52-.52 1.367-.52 1.887 0s.52 1.367 0 1.887a1.324 1.324 0 0 1-1.887 0zM4 10.667v-6H2.667v6A3.335 3.335 0 0 0 6 14h4v-1.333H6c-1.107 0-2-.894-2-2zm9.333 2.713L9.953 10H7.667V7.547c.933.766 2.4 1.44 3.666 1.44v-1.44c-1.106.013-2.406-.58-3.113-1.36l-.933-1.034a1.43 1.43 0 0 0-.46-.333 1.483 1.483 0 0 0-.64-.153h-.02c-.827 0-1.5.673-1.5 1.5V10c0 1.107.893 2 2 2h3.38l2.333 2.333.953-.953z" fill="#4D4D4D" fillRule="nonzero"></path></g></svg>
                            ),
                          text: 'Paid Seat',
                        },
                      ],
                      cancellationPolicy: {
                        label: 'Cancellation refund policy',
                        timeline: [
                          { start: 'Now', end: '16 May, 05:00', color: 'yellow', label: 'Refundable' },
                          { start: '16 May, 05:00', end: '16 May, 08:00', color: 'red', label: 'Non-refundable' },
                        ],
                        values: ['₹1,093', '₹0'],
                        info: ['(i)', '(i)'],
                      },
                      dateChangePolicy: {
                        label: 'Date change policy',
                        timeline: [
                          { start: 'Now', end: '16 May, 05:00', color: 'yellow', label: 'Changeable' },
                          { start: '16 May, 05:00', end: '16 May, 08:00', color: 'red', label: 'Non-changeable' },
                        ],
                        values: ['₹3,399 + Fare Difference', 'Non changeable'],
                      },
                    },
                    {
                      label: 'DEL → BLR: Standard fare',
                      highlights: [
                        {
                          icon: (
                            <svg className="w-6 h-6 text-gray-700" width="16" height="16" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" fill="none"></rect><path d="M5.08333 13.3333C4.78333 13.3333 4.52778 13.2277 4.31667 13.0166C4.10556 12.8055 4 12.55 4 12.25V5.66663C4 5.38886 4.09733 5.15286 4.292 4.95863C4.48622 4.76397 4.72222 4.66663 5 4.66663H6.33333V2.91663C6.33333 2.77219 6.38333 2.64708 6.48333 2.5413C6.58333 2.43597 6.71667 2.3833 6.88333 2.3833H9.11667C9.28333 2.3833 9.41667 2.43597 9.51667 2.5413C9.61667 2.64708 9.66667 2.77219 9.66667 2.91663V4.66663H10.9167C11.2167 4.66663 11.4722 4.77219 11.6833 4.9833C11.8944 5.19441 12 5.44997 12 5.74997V12.25C12 12.55 11.8944 12.8055 11.6833 13.0166C11.4722 13.2277 11.2167 13.3333 10.9167 13.3333C10.9167 13.4777 10.8696 13.6 10.7753 13.7C10.6807 13.8 10.5611 13.85 10.4167 13.85C10.2611 13.85 10.136 13.8 10.0413 13.7C9.94711 13.6 9.9 13.4777 9.9 13.3333H6.1C6.1 13.4777 6.05 13.6 5.95 13.7C5.85 13.8 5.72778 13.85 5.58333 13.85C5.43889 13.85 5.31956 13.8 5.22533 13.7C5.13067 13.6 5.08333 13.4777 5.08333 13.3333ZM6.91667 4.66663H9.08333V2.96663H6.91667V4.66663ZM5.08333 12.6666H10.9167C11.0389 12.6666 11.1389 12.6277 11.2167 12.55C11.2944 12.4722 11.3333 12.3722 11.3333 12.25V5.74997C11.3333 5.62775 11.2944 5.52775 11.2167 5.44997C11.1389 5.37219 11.0389 5.3333 10.9167 5.3333H5.08333C4.96111 5.3333 4.86111 5.37219 4.78333 5.44997C4.70556 5.52775 4.66667 5.62775 4.66667 5.74997V12.25C4.66667 12.3722 4.70556 12.4722 4.78333 12.55C4.86111 12.6277 4.96111 12.6666 5.08333 12.6666ZM5.53333 11.3666C5.53333 11.4555 5.56111 11.5277 5.61667 11.5833C5.67222 11.6389 5.74444 11.6666 5.83333 11.6666C5.92222 11.6666 5.99444 11.6389 6.05 11.5833C6.10556 11.5277 6.13333 11.4555 6.13333 11.3666V6.6333C6.13333 6.54441 6.10556 6.47219 6.05 6.41663C5.99444 6.36108 5.92222 6.3333 5.83333 6.3333C5.74444 6.3333 5.67222 6.36108 5.61667 6.41663C5.56111 6.47219 5.53333 6.54441 5.53333 6.6333V11.3666ZM7.7 11.3666C7.7 11.4555 7.72778 11.5277 7.78333 11.5833C7.83889 11.6389 7.91111 11.6666 8 11.6666C8.08889 11.6666 8.16111 11.6389 8.21667 11.5833C8.27222 11.5277 8.3 11.4555 8.3 11.3666V6.6333C8.3 6.54441 8.27222 6.47219 8.21667 6.41663C8.16111 6.36108 8.08889 6.3333 8 6.3333C7.91111 6.3333 7.83889 6.36108 7.78333 6.41663C7.72778 6.47219 7.7 6.54441 7.7 6.6333V11.3666ZM9.86667 11.3666C9.86667 11.4555 9.89444 11.5277 9.95 11.5833C10.0056 11.6389 10.0778 11.6666 10.1667 11.6666C10.2556 11.6666 10.3278 11.6389 10.3833 11.5833C10.4389 11.5277 10.4667 11.4555 10.4667 11.3666V6.6333C10.4667 6.54441 10.4389 6.47219 10.3833 6.41663C10.3278 6.36108 10.2556 6.3333 10.1667 6.3333C10.0778 6.3333 10.0056 6.36108 9.95 6.41663C9.89444 6.47219 9.86667 6.54441 9.86667 6.6333V11.3666Z" fill="#1C1B1F"></path></svg>
                            ),
                          text: 'Check-in/person: 15kg',
                        },
                        {
                          icon: (
                            <svg className="w-6 h-6 text-gray-700" width="16" height="16" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" fill="none"></rect><path d="M9.44306 3.21053C9.44306 2.54197 8.90109 2 8.23253 2C7.56398 2 7.02201 2.54197 7.02201 3.21053M11.8641 12.2895C12.1984 12.2895 12.4694 12.0185 12.4694 11.6842V9.26316C12.4694 8.92888 12.1984 8.65789 11.8641 8.65789M4.62931 8.65801C4.29486 8.65539 4.02161 8.92424 4.01899 9.25851L4.00002 11.6795C3.9974 12.0138 4.2664 12.2869 4.60086 12.2895M10.6536 13.5V11.6842C10.6536 10.3471 9.56964 9.26316 8.23253 9.26316C6.89542 9.26316 5.81148 10.3471 5.81148 11.6842V13.5H10.6536ZM8.23253 3.21053C10.2382 3.21053 11.8641 4.83644 11.8641 6.84211V12.6842C11.8641 13.1348 11.4989 13.5 11.0483 13.5H5.41674C4.9662 13.5 4.60096 13.1348 4.60096 12.6842V6.84211C4.60096 4.83644 6.22687 3.21053 8.23253 3.21053ZM7.32938 6.84211H9.14517C9.47944 6.84211 9.75043 6.57112 9.75043 6.23684C9.75043 5.90256 9.47944 5.63158 9.14517 5.63158H7.32938C6.9951 5.63158 6.72411 5.90256 6.72411 6.23684C6.72411 6.57112 6.9951 6.84211 7.32938 6.84211Z" stroke="#1A1A1A" stroke-width="0.7"></path></svg>
                            ),
                          text: 'Cabin/person: 7kg',
                        },
                        {
                          icon: (
                            <svg className="w-[18px] h-[18px] text-gray-700" width="18" height="18" viewBox="0 0 16 16"><g fill="none" fillRule="evenodd"><path d="M0 0h16v16H0z"></path><path d="M.667 14.653c0 .374.3.674.673.674H10c.373 0 .673-.3.673-.674V14H.667v.653zm5-8.66c-2.5 0-5 1.34-5 4.007h10c0-2.667-2.5-4.007-5-4.007zM2.413 8.667c.74-1.034 2.314-1.34 3.254-1.34s2.513.306 3.253 1.34H2.413zM.667 11.333h10v1.334h-10v-1.334zm11.333-8V.667h-1.333v2.666H7.333l.154 1.334h6.373L12.927 14H12v1.333h1.147c.56 0 1.02-.433 1.086-.98l1.1-11.02H12z" fill="#4D4D4D" fillRule="nonzero"></path></g></svg>
                            ),
                          text: 'Paid Meal',
                        },
                        {
                          icon: (
                            <svg className="w-[18px] h-[18px] text-gray-700" width="18" height="18" viewBox="0 0 16 16"><g fill="none" fillRule="evenodd"><path d="M0 0h16v16H0z"></path><path d="M5.06 3.607a1.336 1.336 0 0 1 0-1.887c.52-.52 1.367-.52 1.887 0s.52 1.367 0 1.887a1.324 1.324 0 0 1-1.887 0zM4 10.667v-6H2.667v6A3.335 3.335 0 0 0 6 14h4v-1.333H6c-1.107 0-2-.894-2-2zm9.333 2.713L9.953 10H7.667V7.547c.933.766 2.4 1.44 3.666 1.44v-1.44c-1.106.013-2.406-.58-3.113-1.36l-.933-1.034a1.43 1.43 0 0 0-.46-.333 1.483 1.483 0 0 0-.64-.153h-.02c-.827 0-1.5.673-1.5 1.5V10c0 1.107.893 2 2 2h3.38l2.333 2.333.953-.953z" fill="#4D4D4D" fillRule="nonzero"></path></g></svg>
                            ),
                          text: 'Paid Seat',
                        },
                      ],
                      cancellationPolicy: {
                        label: 'Cancellation refund policy',
                        timeline: [
                          { start: 'Now', end: '16 May, 05:00', color: 'yellow', label: 'Refundable' },
                          { start: '16 May, 05:00', end: '16 May, 08:00', color: 'red', label: 'Non-refundable' },
                        ],
                        values: ['₹1,093', '₹0'],
                        info: ['(i)', '(i)'],
                      },
                      dateChangePolicy: {
                        label: 'Date change policy',
                        timeline: [
                          { start: 'Now', end: '16 May, 05:00', color: 'yellow', label: 'Changeable' },
                          { start: '16 May, 05:00', end: '16 May, 08:00', color: 'red', label: 'Non-changeable' },
                        ],
                        values: ['₹3,399 + Fare Difference', 'Non changeable'],
                      },
                    },
                  ]}
                />
                <ItineraryExtras />
              </>
            ) : openStep > 1 ? (
              // Summary view for completed Step 1
              <div className="flex flex-col gap-2 py-2 cursor-pointer group" onClick={() => setOpenStep(1)}>
                {/* Outbound Flight Row */}
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center min-w-[80px] gap-2">
                    <img src={getAirlineLogo('IndiGo')} alt="IndiGo" className="h-5 w-5 rounded bg-white border border-gray-200 object-contain" />
                    <div className="flex flex-col justify-center leading-tight">
                      <span className="text-xs font-medium text-gray-900">IndiGo</span>
                      <span className="text-xs text-gray-500">6E-1419</span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-900 truncate">Bangalore → Abu Dhabi</span>
                    <span className="text-xs text-gray-500 truncate">01:00 - 03:50 • 4h 20m</span>
                  </div>
                  <span className="text-xs border border-gray-400 rounded px-1.5 py-0.5 text-gray-500 font-semibold">STANDARD</span>
                </div>
                {/* Return Flight Row */}
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center min-w-[80px] gap-2">
                    <img src={getAirlineLogo('IndiGo')} alt="IndiGo" className="h-5 w-5 rounded bg-white border border-gray-200 object-contain" />
                    <div className="flex flex-col justify-center leading-tight">
                      <span className="text-xs font-medium text-gray-900">IndiGo</span>
                      <span className="text-xs text-gray-500">6E-1419</span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 truncate">Abu Dhabi → Bangalore</span>
                      <span className="bg-yellow-100 text-yellow-900 font-bold rounded px-1 py-0.5 text-xs">NEXT DAY</span>
                    </div>
                    <span className="text-xs text-gray-500 truncate">18:45 - 04:15 • 5h 10m • 1 stop</span>
                  </div>
                  <span className="text-xs border border-gray-400 rounded px-1.5 py-0.5 text-gray-500 font-semibold">STANDARD</span>
                </div>
              </div>
            ) : openStep > 2 ? (
              // Summary view for completed Step 2
              <div className="py-2 text-gray-500 cursor-pointer group" onClick={() => setOpenStep(2)}>
                <span className="text-sm font-medium">Add-ons: Visa Checker (₹2,000) • 2 more items</span>
              </div>
            ) : openStep > 3 ? (
              // Summary view for completed Step 3
              <div className="py-2 text-gray-500 cursor-pointer group" onClick={() => setOpenStep(3)}>
                <span className="text-sm font-medium">Traveller: John Doe • +91 98765 43210</span>
              </div>
            ) : openStep > 4 ? (
              // Summary view for completed Step 4
              <div className="py-2 text-gray-500 cursor-pointer group" onClick={() => setOpenStep(4)}>
                <span className="text-sm font-medium">Contact: john.doe@email.com • +91 98765 43210</span>
              </div>
            ) : null}
          </StepCard>
          {openStep === 1 && (
            <button
              className="mt-6 bg-[#194a8f] text-white font-semibold rounded px-5 py-2.5 text-base hover:bg-[#143a7a]"
              onClick={() => setOpenStep(2)}
            >
              Continue
            </button>
          )}

          {/* Step 2: Recommended for you */}
          <StepCard 
            step={2} 
            title="Recommended for you" 
            open={openStep >= 2} 
            className="mt-6" 
            isActive={openStep === 2} 
            isCompleted={openStep > 2}
            onHeaderClick={() => setOpenStep(2)}
          >
            {openStep === 2 ? (
              <>
                <div className="flex w-full flex-col items-start rounded-md border border-solid border-gray-200 bg-white px-4 py-4">
                  <div className="flex w-full items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold text-gray-900">
                        Smart Delay
                      </span>
                      <button 
                        className="text-[#194a8f] text-sm font-medium hover:underline"
                        onClick={() => setSmartDelayModalOpen(true)}
                      >
                        View policy
                      </button>
                    </div>
                      </div>
                  <div className="flex w-full flex-wrap items-center gap-12">
                    <div className="flex flex-col items-start gap-2">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6.15385V15H16V6.15383C16 3.85325 16 2.70296 15.5177 1.84615C15.2017 1.28485 14.7473 0.81874 14.2 0.49468C13.3646 0 12.2431 0 10 0C7.75692 0 6.63538 0 5.8 0.49468C5.25273 0.81874 4.79827 1.28485 4.48231 1.84615C4 2.70296 4 3.85325 4 6.15385Z" fill="#80A9FA"/>
                          <path d="M15.1786 19H4.82143C4.07648 19 3.61013 19 3.25 18.958V20.2499C3.25 20.6641 2.91421 20.9999 2.5 20.9999C2.08579 20.9999 1.75 20.6641 1.75 20.2499V18.3838C0.92435 17.8283 0.31864 16.9398 0.09402 15.8901C1.11759e-08 15.4507 0 14.9195 0 13.8571V9.2456C0 8.0054 0.94256 7 2.10526 7C3.26797 7 4.21053 8.0054 4.21053 9.2456V12.3333C4.21053 13.2761 4.21053 13.7475 4.50342 14.0404C4.79631 14.3333 5.26772 14.3333 6.21053 14.3333H13.7895C14.7323 14.3333 15.2037 14.3333 15.4966 14.0404C15.7895 13.7475 15.7895 13.2761 15.7895 12.3333V9.2456C15.7895 8.0054 16.732 7 17.8947 7C19.0574 7 20 8.0054 20 9.2456V13.8571C20 14.9195 20 15.4507 19.906 15.8901C19.6814 16.9398 19.0756 17.8283 18.25 18.3838V20.25C18.25 20.6642 17.9142 21 17.5 21C17.0858 21 16.75 20.6642 16.75 20.25V18.958C16.3899 19 15.9235 19 15.1786 19Z" fill="#204899"/>
                        </svg>
                    </div>
                      <span className="text-sm font-medium text-gray-900">
                        Lounge Access
                      </span>
                  </div>
                    <div className="flex flex-col items-start gap-2">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.9272 0.90623V18.875C18.9272 19.0822 18.8449 19.2809 18.6984 19.4274C18.5519 19.5739 18.3532 19.6562 18.146 19.6562C17.9388 19.6562 17.7401 19.5739 17.5936 19.4274C17.4471 19.2809 17.3647 19.0822 17.3647 18.875V14.1875H12.6772C12.47 14.1875 12.2713 14.1052 12.1248 13.9587C11.9783 13.8121 11.896 13.6134 11.896 13.4062C11.9323 11.5348 12.1686 9.67267 12.6011 7.85154C13.5562 3.89744 15.3667 1.24705 17.8384 0.188457C17.9572 0.137569 18.0867 0.116947 18.2155 0.128441C18.3442 0.139935 18.4681 0.183185 18.576 0.254315C18.6839 0.325445 18.7725 0.422234 18.8338 0.536009C18.8951 0.649783 18.9272 0.77699 18.9272 0.90623ZM9.5415 0.7783C9.5262 0.675717 9.49063 0.577207 9.43686 0.488517C9.38308 0.399826 9.31219 0.322731 9.22831 0.261727C9.14443 0.200723 9.04924 0.157033 8.94829 0.133203C8.84735 0.109374 8.74267 0.105883 8.64037 0.122934C8.53806 0.139986 8.44017 0.177238 8.35241 0.232517C8.26465 0.287797 8.18878 0.359998 8.12922 0.444909C8.06966 0.52982 8.0276 0.625741 8.0055 0.727077C7.98339 0.828413 7.98169 0.933136 8.00049 1.03514L8.76025 5.59373H6.42725V0.90623C6.42725 0.69903 6.34494 0.500316 6.19842 0.353803C6.05191 0.20729 5.8532 0.12498 5.646 0.12498C5.4388 0.12498 5.24008 0.20729 5.09357 0.353803C4.94706 0.500316 4.86475 0.69903 4.86475 0.90623V5.59373H2.53174L3.2915 1.03514C3.3103 0.933136 3.3086 0.828413 3.2865 0.727077C3.26439 0.625741 3.22234 0.52982 3.16277 0.444909C3.10321 0.359998 3.02734 0.287797 2.93958 0.232517C2.85182 0.177238 2.75393 0.139986 2.65163 0.122934C2.54932 0.105883 2.44464 0.109374 2.3437 0.133203C2.24275 0.157033 2.14757 0.200723 2.06368 0.261727C1.9798 0.322731 1.90891 0.399826 1.85514 0.488517C1.80136 0.577207 1.76579 0.675717 1.75049 0.7783L0.969238 5.4658C0.962227 5.50809 0.958635 5.55087 0.958496 5.59373C0.960057 6.70097 1.35295 7.77201 2.06774 8.61762C2.78254 9.46322 3.77322 10.0289 4.86475 10.2148V18.875C4.86475 19.0822 4.94706 19.2809 5.09357 19.4274C5.24008 19.5739 5.4388 19.6562 5.646 19.6562C5.8532 19.6562 6.05191 19.5739 6.19842 19.4274C6.34494 19.2809 6.42725 19.0822 6.42725 18.875V10.2148C7.51877 10.0289 8.50946 9.46322 9.22425 8.61762C9.93905 7.77201 10.3319 6.70097 10.3335 5.59373C10.3334 5.55087 10.3298 5.50809 10.3228 5.4658L9.5415 0.7783Z" fill="#00AF17"/>
                        </svg>
                    </div>
                      <span className="text-sm font-medium text-gray-900">
                        Complimentary meals
                      </span>
                      </div>
                    <div className="flex flex-col items-start gap-2">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23.0727 6.63538L12.9164 18.8844C12.7696 19.0617 12.5853 19.2042 12.3767 19.3017C12.1681 19.3991 11.9406 19.449 11.7104 19.4479C11.4808 19.4485 11.254 19.3982 11.0462 19.3008C10.8383 19.2034 10.6546 19.0612 10.5082 18.8844L0.34806 6.63538C0.214338 6.47562 0.114691 6.29021 0.055242 6.09053C-0.00420743 5.89086 -0.0222042 5.68114 0.0023572 5.47425C0.0267935 5.26685 0.0927364 5.0665 0.196255 4.88513C0.299774 4.70377 0.438749 4.5451 0.604896 4.41859C3.79668 1.99056 7.70005 0.682798 11.7104 0.697883C15.7207 0.682798 19.624 1.99056 22.8158 4.41859C22.982 4.5451 23.121 4.70377 23.2245 4.88513C23.328 5.0665 23.3939 5.26685 23.4184 5.47425C23.4429 5.68114 23.4249 5.89086 23.3655 6.09053C23.306 6.29021 23.2064 6.47562 23.0727 6.63538Z" fill="#14B8A6"/>
                        </svg>
                    </div>
                      <span className="text-sm font-medium text-gray-900">Free Wi-fi</span>
                  </div>
                    <div className="flex grow shrink-0 basis-0 flex-col items-end justify-center gap-1">
                      <span className="text-base font-bold text-gray-900">
                        AED 200
                      </span>
                      <Button
                        className="h-8 w-20 flex-none bg-[#194a8f] hover:bg-yellow-400 hover:text-[#194a8f] transition-colors"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                      >
                        Add
                      </Button>
                    </div>
                      </div>
                    </div>

                {/* Smart Delay Policy Modal */}
                <Dialog open={smartDelayModalOpen} onOpenChange={setSmartDelayModalOpen}>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader className="space-y-0 pb-4">
                      <div className="flex items-center gap-2">
                        <DialogTitle className="text-lg font-semibold">Smart Delay</DialogTitle>
                        <button className="text-blue-600 text-sm font-medium hover:underline">
                          View T&Cs
                        </button>
                  </div>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckIcon className="w-3 h-3 text-green-600" />
                </div>
                        <p className="text-sm text-gray-700">
                          It is applicable for flights delayed by more than 2 hrs
                        </p>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckIcon className="w-3 h-3 text-green-600" />
                        </div>
                        <p className="text-sm text-gray-700">
                          Presence of a adult( 18 or above) is necessary to avail this service
                        </p>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckIcon className="w-3 h-3 text-green-600" />
                        </div>
                        <p className="text-sm text-gray-700">
                          This service is non-transferable to other flights
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-lg font-semibold text-gray-900">AED 200</span>
                      <Button 
                        className="bg-[#194a8f] hover:bg-yellow-400 hover:text-[#194a8f] text-white px-6 font-semibold transition-colors"
                        onClick={() => setSmartDelayModalOpen(false)}
                      >
                        Add to fare
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Flight Notification Card */}
                <div className="flex w-full flex-col items-start rounded-md border border-solid border-gray-200 bg-white px-4 py-4 mt-4">
                  <div className="flex w-full items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold text-gray-900">
                        Flight Notification
                      </span>
                      <button 
                        className="text-[#194a8f] text-sm font-medium hover:underline"
                        onClick={() => setFlightNotificationModalOpen(true)}
                      >
                        View policy
                      </button>
                    </div>
                  </div>
                                     <div className="flex w-full flex-wrap items-center gap-12">
                     <div className="flex flex-col items-start gap-2">
                       <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                         <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M4.19034 3.11748C6.01637 1.53858 8.39672 0.583496 11.0002 0.583496C16.7531 0.583496 21.4168 5.24719 21.4168 11.0002C21.4168 13.2253 20.7191 15.2875 19.5306 16.98L16.2085 11.0002H19.3335C19.3335 6.39779 15.6026 2.66683 11.0002 2.66683C8.76039 2.66683 6.72701 3.55044 5.22957 4.9881L4.19034 3.11748ZM17.81 18.8829C15.9839 20.4617 13.6036 21.4168 11.0002 21.4168C5.24719 21.4168 0.583496 16.7531 0.583496 11.0002C0.583496 8.77502 1.28119 6.71283 2.46975 5.02041L5.79183 11.0002H2.66683C2.66683 15.6026 6.39779 19.3335 11.0002 19.3335C13.24 19.3335 15.2733 18.4499 16.7708 17.0122L17.81 18.8829Z" fill="#C50000"/>
                         </svg>
                       </div>
                       <span className="text-sm font-medium text-gray-900">
                         Real time updates
                       </span>
                     </div>
                     <div className="flex flex-col items-start gap-2">
                       <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                         <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M5.55715 17.2917L0.916992 20.9375V1.66667C0.916992 1.09137 1.38337 0.625 1.95866 0.625H20.7087C21.284 0.625 21.7503 1.09137 21.7503 1.66667V16.25C21.7503 16.8253 21.284 17.2917 20.7087 17.2917H5.55715ZM4.8366 15.2083H19.667V2.70833H3.00033V16.6511L4.8366 15.2083ZM7.16699 7.91667H15.5003V10H7.16699V7.91667Z" fill="#14B8A6"/>
                         </svg>
                       </div>
                       <span className="text-sm font-medium text-gray-900">
                         Available via Email & SMS
                       </span>
                     </div>
                     <div className="flex flex-col items-start gap-2">
                       <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                         <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M10.6667 20.9168C4.9137 20.9168 0.25 16.2531 0.25 10.5002C0.25 4.74719 4.9137 0.0834961 10.6667 0.0834961C16.4196 0.0834961 21.0833 4.74719 21.0833 10.5002C21.0833 16.2531 16.4196 20.9168 10.6667 20.9168ZM8.28127 18.487C7.27857 16.3605 6.66388 14.015 6.52845 11.5418H2.3978C2.81042 14.8507 5.16291 17.5571 8.28127 18.487ZM8.61531 11.5418C8.77198 14.0822 9.49771 16.4686 10.6667 18.5752C11.8356 16.4686 12.5614 14.0822 12.718 11.5418H8.61531ZM18.9355 11.5418H14.8049C14.6695 14.015 14.0548 16.3605 13.0521 18.487C16.1704 17.5571 18.5229 14.8507 18.9355 11.5418ZM2.3978 9.4585H6.52845C6.66388 6.98534 7.27857 4.63982 8.28127 2.51325C5.16291 3.44321 2.81042 6.14964 2.3978 9.4585ZM8.61531 9.4585H12.718C12.5614 6.9181 11.8356 4.53167 10.6667 2.42515C9.49771 4.53167 8.77198 6.9181 8.61531 9.4585ZM13.0521 2.51325C14.0548 4.63982 14.6695 6.98534 14.8049 9.4585H18.9355C18.5229 6.14964 16.1704 3.44321 13.0521 2.51325Z" fill="#194BFF"/>
                         </svg>
                       </div>
                       <span className="text-sm font-medium text-gray-900">Access information world-wide</span>
                     </div>
                    <div className="flex grow shrink-0 basis-0 flex-col items-end justify-center gap-1">
                      <span className="text-base font-bold text-gray-900">
                        AED 50
                      </span>
                      <Button
                        className="h-8 w-20 flex-none bg-[#194a8f] hover:bg-yellow-400 hover:text-[#194a8f] transition-colors"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Auto Check-in Card */}
                <div className="flex w-full flex-col items-start rounded-md border border-solid border-gray-200 bg-white px-4 py-4 mt-4">
                  <div className="flex w-full items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold text-gray-900">
                        Auto Check-in
                      </span>
                      <button 
                        className="text-[#194a8f] text-sm font-medium hover:underline"
                        onClick={() => setAutoCheckinModalOpen(true)}
                      >
                        View policy
                      </button>
                    </div>
                  </div>
                                     <div className="flex w-full flex-wrap items-center gap-12">
                     <div className="flex flex-col items-start gap-2">
                       <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                         <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M2.83577 15.1951H21.5858V2.69515H2.83577V15.1951ZM0.752441 1.65348C0.752441 1.07819 1.21882 0.611816 1.79411 0.611816H22.6274C23.2028 0.611816 23.6691 1.07819 23.6691 1.65348V16.2368C23.6691 16.8121 23.2028 17.2785 22.6274 17.2785H1.79411C1.21882 17.2785 0.752441 16.8121 0.752441 16.2368V1.65348ZM9.08577 6.86182C9.08577 6.28652 8.6194 5.82015 8.04411 5.82015C7.46882 5.82015 7.00244 6.28652 7.00244 6.86182C7.00244 7.43713 7.46882 7.90348 8.04411 7.90348C8.6194 7.90348 9.08577 7.43713 9.08577 6.86182ZM11.1691 6.86182C11.1691 8.58775 9.76999 9.98682 8.04411 9.98682C6.31822 9.98682 4.91911 8.58775 4.91911 6.86182C4.91911 5.13593 6.31822 3.73682 8.04411 3.73682C9.76999 3.73682 11.1691 5.13593 11.1691 6.86182ZM8.04598 13.1118C7.03893 13.1118 6.1289 13.5188 5.46799 14.1796L3.99486 12.7065C5.03049 11.6709 6.46421 11.0285 8.04598 11.0285C9.62776 11.0285 11.0615 11.6709 12.0971 12.7065L10.624 14.1796C9.96308 13.5188 9.05304 13.1118 8.04598 13.1118ZM16.5932 11.765L20.7598 7.59838L19.2867 6.12524L15.8566 9.55536L13.989 7.68775L12.5159 9.16088L15.12 11.765L15.8566 12.5016L16.5932 11.765Z" fill="#194BFF"/>
                         </svg>
                       </div>
                       <span className="text-sm font-medium text-gray-900">
                         Auto generated boarding passes
                       </span>
                     </div>
                     <div className="flex flex-col items-start gap-2">
                       <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                         <svg width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M9.5 0.0415039L18.0593 1.94357C18.5359 2.04948 18.875 2.4722 18.875 2.96043V13.3633C18.875 15.453 17.8306 17.4044 16.0919 18.5636L9.5 22.9582L2.90813 18.5636C1.16939 17.4044 0.125 15.453 0.125 13.3633V2.96043C0.125 2.4722 0.464094 2.04948 0.940698 1.94357L9.5 0.0415039ZM9.5 2.17566L2.20833 3.79602V13.3633C2.20833 14.7564 2.90458 16.0573 4.06375 16.8301L9.5 20.4543L14.9362 16.8301C16.0954 16.0573 16.7917 14.7564 16.7917 13.3633V3.79602L9.5 2.17566ZM14.1379 7.56424L15.611 9.03738L8.98187 15.6665L4.56249 11.2471L6.03563 9.7739L8.98115 12.7195L14.1379 7.56424Z" fill="#00AF17"/>
                         </svg>
                       </div>
                       <span className="text-sm font-medium text-gray-900">
                         Instant Check-in
                       </span>
                     </div>

                    <div className="flex grow shrink-0 basis-0 flex-col items-end justify-center gap-1">
                      <span className="text-base font-bold text-gray-900">
                        AED 75
                      </span>
                      <Button
                        className="h-8 w-20 flex-none bg-[#194a8f] hover:bg-yellow-400 hover:text-[#194a8f] transition-colors"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Lost Luggage Protection Card */}
                <div className="flex w-full flex-col items-start rounded-md border border-solid border-gray-200 bg-white px-4 py-4 mt-4">
                  <div className="flex w-full items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold text-gray-900">
                        Lost Luggage Protection
                      </span>
                      <button 
                        className="text-[#194a8f] text-sm font-medium hover:underline"
                        onClick={() => setLostLuggageModalOpen(true)}
                      >
                        View policy
                      </button>
                    </div>
                  </div>
                                     <div className="flex w-full flex-wrap items-center gap-12">
                     <div className="flex flex-col items-start gap-2">
                       <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                         <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M10.8283 0.877441C16.5812 0.877441 21.245 5.54114 21.245 11.2941C21.245 17.047 16.5812 21.7108 10.8283 21.7108C5.07532 21.7108 0.411621 17.047 0.411621 11.2941H2.49495C2.49495 15.8965 6.22591 19.6274 10.8283 19.6274C15.4307 19.6274 19.1616 15.8965 19.1616 11.2941C19.1616 6.69173 15.4307 2.96077 10.8283 2.96077C7.96393 2.96077 5.43711 4.40592 3.93715 6.60686L6.66162 6.60661V8.68994H0.411621V2.43994H2.49495L2.49484 5.04325C4.39531 2.51364 7.42072 0.877441 10.8283 0.877441ZM11.87 6.08578L11.8697 10.8618L15.2477 14.2404L13.7745 15.7135L9.78641 11.7243L9.78662 6.08578H11.87Z" fill="#FF9350"/>
                         </svg>
                       </div>
                       <span className="text-sm font-medium text-gray-900">
                         Return within 96 hours
                       </span>
                     </div>
                     <div className="flex flex-col items-start gap-2">
                       <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M20.0592 8.0695H21.1654C22.316 8.0695 23.2487 9.00224 23.2487 10.1528V14.3195C23.2487 15.4701 22.316 16.4028 21.1654 16.4028H20.0592C19.5466 20.5136 16.0399 23.6945 11.7904 23.6945V21.6112C15.2421 21.6112 18.0404 18.8129 18.0404 15.3612V9.11117C18.0404 5.65938 15.2421 2.86117 11.7904 2.86117C8.33858 2.86117 5.54036 5.65938 5.54036 9.11117V16.4028H2.41536C1.26477 16.4028 0.332031 15.4701 0.332031 14.3195V10.1528C0.332031 9.00224 1.26477 8.0695 2.41536 8.0695H3.5215C4.0341 3.95876 7.54076 0.777832 11.7904 0.777832C16.0399 0.777832 19.5466 3.95876 20.0592 8.0695ZM2.41536 10.1528V14.3195H3.45703V10.1528H2.41536ZM20.1237 10.1528V14.3195H21.1654V10.1528H20.1237ZM7.37311 16.1788L8.47743 14.4119C9.43787 15.0135 10.5735 15.3612 11.7904 15.3612C13.0072 15.3612 14.1429 15.0135 15.1033 14.4119L16.2077 16.1788C14.927 16.9809 13.4129 17.4445 11.7904 17.4445C10.1679 17.4445 8.65372 16.9809 7.37311 16.1788Z" fill="#14B8A6"/>
                         </svg>
                       </div>
                       <span className="text-sm font-medium text-gray-900">
                         24/7 customer support
                       </span>
                     </div>
                     <div className="flex flex-col items-start gap-2">
                       <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                         <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M3.85684 2.61748C5.68287 1.03858 8.06323 0.0834961 10.6667 0.0834961C16.4196 0.0834961 21.0833 4.74719 21.0833 10.5002C21.0833 12.7253 20.3856 14.7875 19.1971 16.48L15.875 10.5002H19C19 5.89779 15.2691 2.16683 10.6667 2.16683C8.4269 2.16683 6.39351 3.05044 4.89607 4.4881L3.85684 2.61748ZM17.4765 18.3829C15.6504 19.9617 13.2701 20.9168 10.6667 20.9168C4.9137 20.9168 0.25 16.2531 0.25 10.5002C0.25 8.27502 0.947698 6.21283 2.13625 4.52041L5.45833 10.5002H2.33333C2.33333 15.1026 6.06429 18.8335 10.6667 18.8335C12.9065 18.8335 14.9398 17.9499 16.4373 16.5122L17.4765 18.3829Z" fill="#C50000"/>
                         </svg>
                       </div>
                       <span className="text-sm font-medium text-gray-900">Real-Time Updates</span>
                     </div>
                    <div className="flex grow shrink-0 basis-0 flex-col items-end justify-center gap-1">
                      <span className="text-base font-bold text-gray-900">
                        AED 120
                      </span>
                      <Button
                        className="h-8 w-20 flex-none bg-[#194a8f] hover:bg-yellow-400 hover:text-[#194a8f] transition-colors"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>

                {/* TripAdd Protection Card */}
                <div className="flex w-full flex-col items-start rounded-md border border-solid border-gray-200 bg-white px-4 py-4 mt-4">
                  <div className="flex w-full items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold text-gray-900">
                        TripAdd Protection
                      </span>
                      <button 
                        className="text-[#194a8f] text-sm font-medium hover:underline"
                        onClick={() => setTripAddModalOpen(true)}
                      >
                        View policy
                      </button>
                    </div>
                  </div>
                                     <div className="flex w-full flex-wrap items-center gap-12">
                     <div className="flex flex-col items-start gap-2">
                       <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                         <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M21.4006 6.51238C21.6239 7.34592 21.1294 8.20269 20.2958 8.42603L3.97644 12.7987C3.51474 12.9225 3.02809 12.7161 2.79609 12.2982L0.0639648 7.37665L1.57323 6.97228L4.14384 9.51874L9.45144 8.09655L4.75299 0.728173L6.76533 0.188965L14.0063 6.87603L19.487 5.40752C20.3205 5.18416 21.1773 5.67883 21.4006 6.51238ZM2.70387 15.7709H19.3705V17.8543H2.70387V15.7709Z" fill="#00AF17"/>
                         </svg>
                       </div>
                       <span className="text-sm font-medium text-gray-900">
                         Instant Flight Updates
                       </span>
                     </div>
                     <div className="flex flex-col items-start gap-2">
                       <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                         <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M11.8099 0.753418C15.837 0.753418 19.1016 4.01801 19.1016 8.04508C19.1016 8.16332 19.0987 8.28091 19.0932 8.39776C21.525 9.25342 23.2682 11.5707 23.2682 14.2951C23.2682 17.7469 20.47 20.5451 17.0182 20.5451H6.60156C3.14978 20.5451 0.351562 17.7469 0.351562 14.2951C0.351562 11.5707 2.09475 9.25342 4.5266 8.39776C4.52104 8.28091 4.51823 8.16332 4.51823 8.04508C4.51823 4.01801 7.78282 0.753418 11.8099 0.753418ZM11.8099 2.83675C8.93342 2.83675 6.60156 5.16861 6.60156 8.04508C6.60156 8.12995 6.60357 8.21449 6.60758 8.29867L6.68137 9.8481L5.21805 10.363C3.56448 10.9448 2.4349 12.5127 2.4349 14.2951C2.4349 16.5962 4.30037 18.4618 6.60156 18.4618H17.0182C19.3194 18.4618 21.1849 16.5962 21.1849 14.2951C21.1849 11.993 19.3203 10.1284 17.0182 10.1284C15.1776 10.1284 13.6158 11.3219 13.0643 12.9771L11.0874 12.3181C11.9146 9.83519 14.2578 8.04508 17.0182 8.04508C17.0182 5.16861 14.6864 2.83675 11.8099 2.83675Z" fill="#194BFF"/>
                         </svg>
                       </div>
                       <span className="text-sm font-medium text-gray-900">
                         Trip Weather Alerts
                       </span>
                     </div>
                     <div className="flex flex-col items-start gap-2">
                       <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                         <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M4 6.15385V15H16V6.15383C16 3.85325 16 2.70296 15.5177 1.84615C15.2017 1.28485 14.7473 0.81874 14.2 0.49468C13.3646 0 12.2431 0 10 0C7.75692 0 6.63538 0 5.8 0.49468C5.25273 0.81874 4.79827 1.28485 4.48231 1.84615C4 2.70296 4 3.85325 4 6.15385Z" fill="#80A9FA"/>
                           <path d="M15.1786 19H4.82143C4.07648 19 3.61013 19 3.25 18.958V20.2499C3.25 20.6641 2.91421 20.9999 2.5 20.9999C2.08579 20.9999 1.75 20.6641 1.75 20.2499V18.3838C0.92435 17.8283 0.31864 16.9398 0.09402 15.8901C1.11759e-08 15.4507 0 14.9195 0 13.8571V9.2456C0 8.0054 0.94256 7 2.10526 7C3.26797 7 4.21053 8.0054 4.21053 9.2456V12.3333C4.21053 13.2761 4.21053 13.7475 4.50342 14.0404C4.79631 14.3333 5.26772 14.3333 6.21053 14.3333H13.7895C14.7323 14.3333 15.2037 14.3333 15.4966 14.0404C15.7895 13.7475 15.7895 13.2761 15.7895 12.3333V9.2456C15.7895 8.0054 16.732 7 17.8947 7C19.0574 7 20 8.0054 20 9.2456V13.8571C20 14.9195 20 15.4507 19.906 15.8901C19.6814 16.9398 19.0756 17.8283 18.25 18.3838V20.25C18.25 20.6642 17.9142 21 17.5 21C17.0858 21 16.75 20.6642 16.75 20.25V18.958C16.3899 19 15.9235 19 15.1786 19Z" fill="#204899"/>
                         </svg>
                       </div>
                       <span className="text-sm font-medium text-gray-900">Lounge Access on Delay</span>
                     </div>
                    <div className="flex grow shrink-0 basis-0 flex-col items-end justify-center gap-1">
                      <span className="text-base font-bold text-gray-900">
                        AED 300
                      </span>
                      <Button
                        className="h-8 w-20 flex-none bg-[#194a8f] hover:bg-yellow-400 hover:text-[#194a8f] transition-colors"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Flight Notification Modal */}
                <Dialog open={flightNotificationModalOpen} onOpenChange={setFlightNotificationModalOpen}>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader className="space-y-0 pb-4">
                  <div className="flex items-center gap-2">
                        <DialogTitle className="text-lg font-semibold">Flight Notification</DialogTitle>
                        <button className="text-blue-600 text-sm font-medium hover:underline">
                          View T&Cs
                        </button>
                  </div>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                                             <div className="flex items-start gap-3">
                         <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                           <CheckIcon className="w-3 h-3 text-green-600" />
                </div>
                         <p className="text-sm text-gray-700">
                           Get real-time updates about flight status and gate changes
                         </p>
              </div>
                       
                       <div className="flex items-start gap-3">
                         <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                           <CheckIcon className="w-3 h-3 text-green-600" />
                         </div>
                         <p className="text-sm text-gray-700">
                           Receive notifications via SMS, email, and push notifications
                         </p>
                       </div>
                       
                       <div className="flex items-start gap-3">
                         <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                           <CheckIcon className="w-3 h-3 text-green-600" />
                         </div>
                         <p className="text-sm text-gray-700">
                           Works for all flight segments and connections
                         </p>
                       </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-lg font-semibold text-gray-900">AED 50</span>
                      <Button 
                        className="bg-[#194a8f] hover:bg-yellow-400 hover:text-[#194a8f] text-white px-6 font-semibold transition-colors"
                        onClick={() => setFlightNotificationModalOpen(false)}
                      >
                        Add to fare
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Auto Check-in Modal */}
                <Dialog open={autoCheckinModalOpen} onOpenChange={setAutoCheckinModalOpen}>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader className="space-y-0 pb-4">
                      <div className="flex items-center gap-2">
                        <DialogTitle className="text-lg font-semibold">Auto Check-in</DialogTitle>
                        <button className="text-blue-600 text-sm font-medium hover:underline">
                          View T&Cs
                        </button>
                      </div>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                                             <div className="flex items-start gap-3">
                         <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                           <CheckIcon className="w-3 h-3 text-green-600" />
                         </div>
                         <p className="text-sm text-gray-700">
                           Automatic check-in 24 hours before departure
                         </p>
                       </div>
                       
                       <div className="flex items-start gap-3">
                         <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                           <CheckIcon className="w-3 h-3 text-green-600" />
                         </div>
                         <p className="text-sm text-gray-700">
                           Best available seat selection automatically
                         </p>
                       </div>
                       
                       <div className="flex items-start gap-3">
                         <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                           <CheckIcon className="w-3 h-3 text-green-600" />
                         </div>
                         <p className="text-sm text-gray-700">
                           Boarding pass sent via email and SMS
                         </p>
                       </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-lg font-semibold text-gray-900">AED 75</span>
                      <Button 
                        className="bg-[#194a8f] hover:bg-yellow-400 hover:text-[#194a8f] text-white px-6 font-semibold transition-colors"
                        onClick={() => setAutoCheckinModalOpen(false)}
                      >
                        Add to fare
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Lost Luggage Protection Modal */}
                <Dialog open={lostLuggageModalOpen} onOpenChange={setLostLuggageModalOpen}>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader className="space-y-0 pb-4">
                      <div className="flex items-center gap-2">
                        <DialogTitle className="text-lg font-semibold">Lost Luggage Protection</DialogTitle>
                        <button className="text-blue-600 text-sm font-medium hover:underline">
                          View T&Cs
                        </button>
                      </div>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                                             <div className="flex items-start gap-3">
                         <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                           <CheckIcon className="w-3 h-3 text-green-600" />
                         </div>
                         <p className="text-sm text-gray-700">
                           Coverage up to AED 2,000 for lost or delayed luggage
                         </p>
                       </div>
                       
                       <div className="flex items-start gap-3">
                         <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                           <CheckIcon className="w-3 h-3 text-green-600" />
                         </div>
                         <p className="text-sm text-gray-700">
                           24/7 support team to track and assist with claims
                         </p>
                       </div>
                       
                       <div className="flex items-start gap-3">
                         <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                           <CheckIcon className="w-3 h-3 text-green-600" />
                         </div>
                         <p className="text-sm text-gray-700">
                           Quick claims processing within 48 hours
                         </p>
                       </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-lg font-semibold text-gray-900">AED 120</span>
                      <Button 
                        className="bg-[#194a8f] hover:bg-yellow-400 hover:text-[#194a8f] text-white px-6 font-semibold transition-colors"
                        onClick={() => setLostLuggageModalOpen(false)}
                      >
                        Add to fare
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* TripAdd Protection Modal */}
                <Dialog open={tripAddModalOpen} onOpenChange={setTripAddModalOpen}>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader className="space-y-0 pb-4">
                      <div className="flex items-center gap-2">
                        <DialogTitle className="text-lg font-semibold">TripAdd Protection</DialogTitle>
                        <button className="text-blue-600 text-sm font-medium hover:underline">
                          View T&Cs
                        </button>
                      </div>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                                             <div className="flex items-start gap-3">
                         <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                           <CheckIcon className="w-3 h-3 text-green-600" />
                         </div>
                         <p className="text-sm text-gray-700">
                           Trip cancellation coverage up to full fare amount
                         </p>
                       </div>
                       
                       <div className="flex items-start gap-3">
                         <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                           <CheckIcon className="w-3 h-3 text-green-600" />
                         </div>
                         <p className="text-sm text-gray-700">
                           Medical emergency coverage up to AED 10,000
                         </p>
                       </div>
                       
                       <div className="flex items-start gap-3">
                         <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                           <CheckIcon className="w-3 h-3 text-green-600" />
                         </div>
                         <p className="text-sm text-gray-700">
                           24/7 emergency assistance and travel support
                         </p>
                       </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-lg font-semibold text-gray-900">AED 300</span>
                      <Button 
                        className="bg-[#194a8f] hover:bg-yellow-400 hover:text-[#194a8f] text-white px-6 font-semibold transition-colors"
                        onClick={() => setTripAddModalOpen(false)}
                      >
                        Add to fare
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            ) : openStep > 2 ? (
              // Summary view for completed Step 2
              <div className="py-2 text-gray-500 cursor-pointer group" onClick={() => setOpenStep(2)}>
                <span className="text-sm font-medium">Recommended items selected</span>
              </div>
            ) : null}
          </StepCard>
          {openStep === 2 && (
            <button
              className="mt-6 bg-[#194a8f] text-white font-semibold rounded px-5 py-2.5 text-base hover:bg-[#143a7a]"
              onClick={() => setOpenStep(3)}
            >
              Continue
            </button>
          )}

          {/* Step 3: Add traveller details */}
          <StepCard 
            step={3} 
            title="Add traveller details" 
            open={openStep >= 3} 
            className="mt-6" 
            isActive={openStep === 3} 
            isCompleted={openStep > 3}
            onHeaderClick={() => setOpenStep(3)}
          >
            {openStep === 3 ? (
              <div className="space-y-6">
                {/* Note about passport names */}
                <div className="bg-gray-50 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">NOTE</span>
                    <span className="text-xs text-gray-700">Make sure the names you enter match the way they appear on your passport.</span>
                  </div>
                </div>

                {/* Adult 1 (Primary traveller) */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-gray-900">Adult 1</h3>
                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-md">Primary traveller</span>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="space-y-4">
                      <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <TravellerInput
                            label="First Name"
                            placeholder="First Name"
                            value={firstNameAdult1}
                            onChange={setFirstNameAdult1}
                            onTravellerSelect={(traveller) => {
                              setFirstNameAdult1(traveller.firstName);
                              setLastNameAdult1(traveller.lastName);
                              // Auto-fill passport if available
                              if (traveller.passportNumber) {
                                setPassportAdult1(traveller.passportNumber);
                              }
                              // Set expiry status
                              setPassportExpiredAdult1(traveller.passportExpired || false);
                            }}
                            showSavedTravellers={true}
                          />
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Last Name</Label>
                            <Input 
                              placeholder="Last Name"
                              value={lastNameAdult1}
                              onChange={(e) => setLastNameAdult1(e.target.value)}
                              className="h-8 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Gender</Label>
                            <Select value={genderAdult1} onValueChange={setGenderAdult1}>
                              <SelectTrigger className="h-8 text-sm">
                                <SelectValue placeholder="Gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Nationality</Label>
                            <Select value={nationalityAdult1} onValueChange={setNationalityAdult1}>
                              <SelectTrigger className="h-8 text-sm">
                                <SelectValue placeholder="Nationality (e.g. India)" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="indian">Indian</SelectItem>
                                <SelectItem value="american">American</SelectItem>
                                <SelectItem value="british">British</SelectItem>
                                <SelectItem value="canadian">Canadian</SelectItem>
                                <SelectItem value="australian">Australian</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Passport Number</Label>
                            <Input 
                              placeholder="Passport Number"
                              value={passportAdult1}
                              onChange={(e) => setPassportAdult1(e.target.value)}
                              className={`h-8 text-sm ${passportExpiredAdult1 ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                            />
                            {passportExpiredAdult1 && (
                              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                                <ExclamationTriangleIcon className="h-4 w-4 flex-shrink-0" />
                                This passport has expired. Please renew before travel.
                              </p>
                            )}
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Date of Birth</Label>
                            <div className="flex gap-1">
                              <Select value={dobDayAdult1} onValueChange={setDobDayAdult1}>
                                <SelectTrigger className="h-8 text-sm w-16">
                                  <SelectValue placeholder="DD" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({length: 31}, (_, i) => (
                                    <SelectItem key={i+1} value={String(i+1).padStart(2, '0')}>
                                      {String(i+1).padStart(2, '0')}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select value={dobMonthAdult1} onValueChange={setDobMonthAdult1}>
                                <SelectTrigger className="h-8 text-sm w-28">
                                  <SelectValue placeholder="MM" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({length: 12}, (_, i) => {
                                    const monthNumber = String(i+1).padStart(2, '0');
                                    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                    const monthName = monthNames[i];
                                    return (
                                      <SelectItem key={i+1} value={monthNumber}>
                                        {monthNumber} ({monthName})
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                              <Select value={dobYearAdult1} onValueChange={setDobYearAdult1}>
                                <SelectTrigger className="h-8 text-sm w-20">
                                  <SelectValue placeholder="YYYY" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({length: 80}, (_, i) => {
                                    const year = new Date().getFullYear() - 18 - i;
                                    return (
                                      <SelectItem key={year} value={String(year)}>
                                        {year}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Adult 2 */}
                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-gray-900">Adult 2</h3>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="space-y-4">
                      <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <TravellerInput
                            label="First Name"
                            placeholder="First Name"
                            value={firstNameAdult2}
                            onChange={setFirstNameAdult2}
                            onTravellerSelect={(traveller) => {
                              setFirstNameAdult2(traveller.firstName);
                              setLastNameAdult2(traveller.lastName);
                              // Auto-fill passport if available
                              if (traveller.passportNumber) {
                                setPassportAdult2(traveller.passportNumber);
                              }
                              // Set expiry status
                              setPassportExpiredAdult2(traveller.passportExpired || false);
                            }}
                            showSavedTravellers={true}
                          />
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Last Name</Label>
                            <Input 
                              placeholder="Last Name"
                              value={lastNameAdult2}
                              onChange={(e) => setLastNameAdult2(e.target.value)}
                              className="h-8 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Gender</Label>
                            <Select value={genderAdult2} onValueChange={setGenderAdult2}>
                              <SelectTrigger className="h-8 text-sm">
                                <SelectValue placeholder="Gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Nationality</Label>
                            <Select value={nationalityAdult2} onValueChange={setNationalityAdult2}>
                              <SelectTrigger className="h-8 text-sm">
                                <SelectValue placeholder="Nationality (e.g. India)" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="indian">Indian</SelectItem>
                                <SelectItem value="american">American</SelectItem>
                                <SelectItem value="british">British</SelectItem>
                                <SelectItem value="canadian">Canadian</SelectItem>
                                <SelectItem value="australian">Australian</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Passport Number</Label>
                            <Input 
                              placeholder="Passport Number"
                              value={passportAdult2}
                              onChange={(e) => setPassportAdult2(e.target.value)}
                              className={`h-8 text-sm ${passportExpiredAdult2 ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                            />
                            {passportExpiredAdult2 && (
                              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                                <ExclamationTriangleIcon className="h-4 w-4 flex-shrink-0" />
                                This passport has expired. Please renew before travel.
                              </p>
                            )}
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Date of Birth</Label>
                            <div className="flex gap-1">
                              <Select value={dobDayAdult2} onValueChange={setDobDayAdult2}>
                                <SelectTrigger className="h-8 text-sm w-16">
                                  <SelectValue placeholder="DD" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({length: 31}, (_, i) => (
                                    <SelectItem key={i+1} value={String(i+1).padStart(2, '0')}>
                                      {String(i+1).padStart(2, '0')}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select value={dobMonthAdult2} onValueChange={setDobMonthAdult2}>
                                <SelectTrigger className="h-8 text-sm w-28">
                                  <SelectValue placeholder="MM" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({length: 12}, (_, i) => {
                                    const monthNumber = String(i+1).padStart(2, '0');
                                    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                    const monthName = monthNames[i];
                                    return (
                                      <SelectItem key={i+1} value={monthNumber}>
                                        {monthNumber} ({monthName})
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                              <Select value={dobYearAdult2} onValueChange={setDobYearAdult2}>
                                <SelectTrigger className="h-8 text-sm w-20">
                                  <SelectValue placeholder="YYYY" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({length: 80}, (_, i) => {
                                    const year = new Date().getFullYear() - 18 - i;
                                    return (
                                      <SelectItem key={year} value={String(year)}>
                                        {year}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Child 1 (2-12 yrs) */}
                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-gray-900">Child 1 (2-12 yrs)</h3>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="space-y-4">
                      <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <TravellerInput
                            label="First Name"
                            placeholder="First Name"
                            value={firstNameChild1}
                            onChange={setFirstNameChild1}
                            onTravellerSelect={(traveller) => {
                              setFirstNameChild1(traveller.firstName);
                              setLastNameChild1(traveller.lastName);
                              // Auto-fill passport if available
                              if (traveller.passportNumber) {
                                setPassportChild1(traveller.passportNumber);
                              }
                              // Set expiry status
                              setPassportExpiredChild1(traveller.passportExpired || false);
                            }}
                            showSavedTravellers={true}
                          />
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Last Name</Label>
                            <Input 
                              placeholder="Last Name"
                              value={lastNameChild1}
                              onChange={(e) => setLastNameChild1(e.target.value)}
                              className="h-8 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Gender</Label>
                            <Select value={genderChild1} onValueChange={setGenderChild1}>
                              <SelectTrigger className="h-8 text-sm">
                                <SelectValue placeholder="Gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Nationality</Label>
                            <Select value={nationalityChild1} onValueChange={setNationalityChild1}>
                              <SelectTrigger className="h-8 text-sm">
                                <SelectValue placeholder="Nationality (e.g. India)" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="indian">Indian</SelectItem>
                                <SelectItem value="american">American</SelectItem>
                                <SelectItem value="british">British</SelectItem>
                                <SelectItem value="canadian">Canadian</SelectItem>
                                <SelectItem value="australian">Australian</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Passport Number</Label>
                            <Input 
                              placeholder="Passport Number"
                              value={passportChild1}
                              onChange={(e) => setPassportChild1(e.target.value)}
                              className={`h-8 text-sm ${passportExpiredChild1 ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                            />
                            {passportExpiredChild1 && (
                              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                                <ExclamationTriangleIcon className="h-4 w-4 flex-shrink-0" />
                                This passport has expired. Please renew before travel.
                              </p>
                            )}
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Date of Birth</Label>
                            <div className="flex gap-1">
                              <Select value={dobDayChild1} onValueChange={setDobDayChild1}>
                                <SelectTrigger className="h-8 text-sm w-16">
                                  <SelectValue placeholder="DD" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({length: 31}, (_, i) => (
                                    <SelectItem key={i+1} value={String(i+1).padStart(2, '0')}>
                                      {String(i+1).padStart(2, '0')}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select value={dobMonthChild1} onValueChange={setDobMonthChild1}>
                                <SelectTrigger className="h-8 text-sm w-28">
                                  <SelectValue placeholder="MM" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({length: 12}, (_, i) => {
                                    const monthNumber = String(i+1).padStart(2, '0');
                                    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                    const monthName = monthNames[i];
                                    return (
                                      <SelectItem key={i+1} value={monthNumber}>
                                        {monthNumber} ({monthName})
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                              <Select value={dobYearChild1} onValueChange={setDobYearChild1}>
                                <SelectTrigger className="h-8 text-sm w-20">
                                  <SelectValue placeholder="YYYY" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({length: 12}, (_, i) => {
                                    const year = new Date().getFullYear() - 2 - i;
                                    return (
                                      <SelectItem key={year} value={String(year)}>
                                        {year}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : openStep > 3 ? (
              // Summary view for completed Step 3
              <div className="py-2 text-gray-500 cursor-pointer group" onClick={() => setOpenStep(3)}>
                <span className="text-sm font-medium">Traveller: John Doe • +91 98765 43210</span>
              </div>
            ) : openStep > 4 ? (
              // Summary view for completed Step 4
              <div className="py-2 text-gray-500 cursor-pointer group" onClick={() => setOpenStep(4)}>
                <span className="text-sm font-medium">Contact: john.doe@email.com • +91 98765 43210</span>
              </div>
            ) : null}
          </StepCard>
          {openStep === 3 && (
            <button
              className="mt-6 bg-[#194a8f] text-white font-semibold rounded px-5 py-2.5 text-base hover:bg-[#143a7a]"
              onClick={() => setOpenStep(4)}
            >
              Continue
            </button>
          )}

          {/* Step 4: Add contact details */}
          <StepCard 
            step={4} 
            title="Add contact details" 
            open={openStep >= 4} 
            className="mt-6" 
            isActive={openStep === 4} 
            isCompleted={openStep > 4}
            onHeaderClick={() => setOpenStep(4)}
          >
            {openStep === 4 ? (
              <div className="space-y-6">
                {/* Information Text */}
                <div className="text-sm text-gray-600 mb-4">
                  Your ticket and flight information will be sent here
                </div>

                {/* Contact Information */}
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1">Contact name</Label>
                      <Input 
                        placeholder="Ex - 'Rakesh'"
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1">Email address</Label>
                      <Input 
                        type="email"
                        placeholder="Ex - 'Rakesh'"
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1">Mobile number</Label>
                      <div className="flex gap-2">
                        <Select defaultValue="+91">
                          <SelectTrigger className="h-8 text-sm w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+91">+91</SelectItem>
                            <SelectItem value="+1">+1</SelectItem>
                            <SelectItem value="+44">+44</SelectItem>
                            <SelectItem value="+971">+971</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input 
                          placeholder="Ex - '943-783-2034'"
                          className="h-8 text-sm flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tax Details Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Tax details</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    To claim credit for the TAX charged by airline, please enter your tax details
                  </p>
                  
                  {/* TAX Checkbox */}
                  <div className="flex items-center space-x-2 mb-4">
                    <Checkbox id="gst" defaultChecked />
                    <Label htmlFor="gst" className="text-sm font-medium text-gray-700 cursor-pointer">
                      I would like to add my TAX Number
                    </Label>
                  </div>

                  {/* TAX Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1">TAXNO</Label>
                      <Input 
                        placeholder="Ex - 'Rakesh'"
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-700 mb-1">Company name</Label>
                      <Input 
                        placeholder="Ex - 'Rakesh'"
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : openStep > 4 ? (
              // Summary view for completed Step 4
              <div className="py-2 text-gray-500 cursor-pointer group" onClick={() => setOpenStep(4)}>
                <span className="text-sm font-medium">Contact: john.doe@email.com • +91 98765 43210</span>
              </div>
            ) : null}
          </StepCard>
          {openStep === 4 && (
            <button
              className="mt-6 bg-[#194a8f] text-white font-semibold rounded px-5 py-2.5 text-base hover:bg-[#143a7a]"
              onClick={() => navigate('/payment', { state: { trip } })}
            >
              Continue to payment
            </button>
          )}
        </main>

        {/* Right: Summary */}
        <div className="w-full md:w-[300px] flex-shrink-0 self-start">
          <SummarySidebar trip={trip} />
        </div>
      </div>
    </div>
  );
} 