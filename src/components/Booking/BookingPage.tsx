import React, { useState } from 'react';
import TopHeader from '../TripCuration/TopHeader';
import { getAirlineLogo } from '../../utils/airlineLogos';
import ItineraryExtras from './ItineraryExtras';
import FareRules from './FareRules';
import { ArrowDownTrayIcon, BriefcaseIcon, CakeIcon, UserIcon, CalendarIcon, DevicePhoneMobileIcon, BellIcon } from '@heroicons/react/24/outline';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Footprints, MoveRight, Timer, PlaneLanding, BadgeCheck, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const steps = [
  'Itinerary',
  'Choose add-ons',
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
                            <li className="flex items-center gap-2"><Timer className="h-3 w-3 text-gray-400" />Walking time: 8-12 minutes</li>
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
                            <li className="flex items-center gap-2"><BadgeCheck className="h-3 w-3 text-green-500" />Same terminal - no shuttle required</li>
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

const StepCard = ({ step, title, children, open, className = "", isActive = false, isCompleted = false }: { 
  step: number, 
  title: string, 
  children?: React.ReactNode, 
  open: boolean, 
  className?: string,
  isActive?: boolean,
  isCompleted?: boolean 
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
    <div className={`bg-white rounded-2xl border border-gray-200 p-6 w-full ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${getCircleClasses()}`}>
          {step}
        </div>
        <span className="text-xl font-bold">{title}</span>
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

  const [openStep, setOpenStep] = useState(1);
  const [showAdultForm, setShowAdultForm] = useState(false);
  const [showChildForm, setShowChildForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopHeader />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 pt-4 pb-12 px-4 items-start min-h-screen">
        {/* Left: Step Content */}
        <main className="flex-1 min-w-0">
          {/* Step 1: Review your itinerary */}
          <StepCard step={1} title="Review your itinerary" open={openStep >= 1} isActive={openStep === 1} isCompleted={openStep > 1}>
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
              <div className="flex flex-col gap-3 py-3 cursor-pointer group" onClick={() => setOpenStep(1)}>
                {/* Outbound Flight Row */}
                <div className="flex items-center gap-4 w-full">
                  <div className="flex items-center min-w-[100px] gap-3">
                    <img src={getAirlineLogo('IndiGo')} alt="IndiGo" className="h-6 w-6 rounded bg-white border border-gray-200 object-contain" />
                    <div className="flex flex-col justify-center leading-tight">
                      <span className="text-sm font-medium text-gray-900">IndiGo</span>
                      <span className="text-xs text-gray-500">6E-1419</span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-900 truncate">Bangalore → Abu Dhabi</span>
                    <span className="text-xs text-gray-500 truncate">01:00 - 03:50 • 4h 20m</span>
                  </div>
                  <span className="text-xs border border-gray-400 rounded px-2 py-1 text-gray-500 font-semibold">STANDARD</span>
                  <span className="flex items-center justify-center group-hover:bg-blue-50 rounded-full transition-colors" style={{width: 32, height: 32}}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5" stroke="#2563EB"/><path d="M8 10l4 4 4-4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
                {/* Return Flight Row */}
                <div className="flex items-center gap-4 w-full">
                  <div className="flex items-center min-w-[100px] gap-3">
                    <img src={getAirlineLogo('IndiGo')} alt="IndiGo" className="h-6 w-6 rounded bg-white border border-gray-200 object-contain" />
                    <div className="flex flex-col justify-center leading-tight">
                      <span className="text-sm font-medium text-gray-900">IndiGo</span>
                      <span className="text-xs text-gray-500">6E-1419</span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 truncate">Abu Dhabi → Bangalore</span>
                      <span className="bg-yellow-100 text-yellow-900 font-bold rounded px-1.5 py-0.5 text-xs">NEXT DAY</span>
                    </div>
                    <span className="text-xs text-gray-500 truncate">18:45 - 04:15 • 5h 10m • 1 stop</span>
                  </div>
                  <span className="text-xs border border-gray-400 rounded px-2 py-1 text-gray-500 font-semibold">STANDARD</span>
                  <span className="flex items-center justify-center" style={{width: 32, height: 32, visibility: 'hidden'}}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5" stroke="#2563EB"/><path d="M8 10l4 4 4-4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
              </div>
            ) : null}
          </StepCard>
          {openStep === 1 && (
            <button
              className="mt-8 bg-[#194a8f] text-white font-semibold rounded px-5 py-2.5 text-base hover:bg-[#143a7a]"
              onClick={() => setOpenStep(2)}
            >
              Continue
            </button>
          )}

          {/* Step 2: Choose add-ons */}
          <StepCard step={2} title="Choose add-ons" open={openStep >= 2} className="mt-6" isActive={openStep === 2} isCompleted={openStep > 2}>
            {openStep === 2 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full mb-6">
                <div className="text-xl font-bold mb-4">Travel Essentials</div>
                <div className="flex flex-col gap-4">
                  {/* Visa Requirement Checker */}
                  <div className="flex items-start gap-4 bg-gray-50 rounded-lg p-4">
                    <div className="bg-[#e6f1ff] rounded-full w-10 h-10 flex items-center justify-center">
                      <CalendarIcon className="text-[#194a8f] w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-lg">Visa Requirement Checker</div>
                      <div className="text-sm text-gray-700">Check visa requirements for Indian citizens. Most visitors need a visa to enter UAE</div>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="font-bold text-xl">₹2,000</span>
                        <a href="#" className="text-[#194a8f] text-sm underline">View benefits</a>
                      </div>
                    </div>
                    <button className="ml-4 bg-[#194a8f] text-white rounded px-3 py-1.5 text-xs font-medium hover:bg-[#143a7a]">Remove</button>
                  </div>
                  {/* International sim cards */}
                  <div className="flex items-start gap-4 bg-gray-50 rounded-lg p-4">
                    <div className="bg-[#e6f1ff] rounded-full w-10 h-10 flex items-center justify-center">
                      <DevicePhoneMobileIcon className="text-[#194a8f] w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-lg">International sim cards</div>
                      <div className="text-sm text-gray-700">Get a sim card having 20 GB data, 60 min international call and valid till 8 days.</div>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="font-bold text-xl">₹300</span>
                        <a href="#" className="text-[#194a8f] text-sm underline">View benefits</a>
                      </div>
                    </div>
                    <button className="ml-4 border border-[#194a8f] text-[#194a8f] rounded px-3 py-1.5 text-xs font-medium hover:bg-[#194a8f] hover:text-white">Add</button>
                  </div>
                  {/* Flight Alerts */}
                  <div className="flex items-start gap-4 bg-gray-50 rounded-lg p-4">
                    <div className="bg-[#e6f1ff] rounded-full w-10 h-10 flex items-center justify-center">
                      <BellIcon className="text-[#194a8f] w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-lg">Flight Alerts</div>
                      <div className="text-sm text-gray-700">Get real-time notifications about any flight changes by email and SMS.</div>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="font-bold text-xl">₹800</span>
                        <a href="#" className="text-[#194a8f] text-sm underline">View benefits</a>
                      </div>
                    </div>
                    <button className="ml-4 border border-[#194a8f] text-[#194a8f] rounded px-3 py-1.5 text-xs font-medium hover:bg-[#194a8f] hover:text-white">Add</button>
                  </div>
                </div>
                {/* Footer */}
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-2">
                    <img src="/tripadd-logo.svg" alt="TripAdd" className="h-5" />
                    <a href="#" className="text-[#194a8f] text-sm underline">View terms & conditions</a>
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="accent-[#194a8f]" />
                    I accept the terms and conditions of this policy
                  </label>
                </div>
              </div>
            ) : openStep > 2 ? (
              // Summary view for completed Step 2
              <div className="py-3 text-gray-500 cursor-pointer group" onClick={() => setOpenStep(2)}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Add-ons: Visa Checker (₹2,000) • 2 more items</span>
                  <span className="flex items-center justify-center group-hover:bg-blue-50 rounded-full transition-colors" style={{width: 32, height: 32}}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5" stroke="#2563EB"/><path d="M8 10l4 4 4-4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
              </div>
            ) : null}
          </StepCard>
          {openStep === 2 && (
            <button
              className="mt-8 bg-[#194a8f] text-white font-semibold rounded px-5 py-2.5 text-base hover:bg-[#143a7a]"
              onClick={() => setOpenStep(3)}
            >
              Continue
            </button>
          )}

          {/* Step 3: Add traveller details */}
          <StepCard step={3} title="Add traveller details" open={openStep >= 3} className="mt-6" isActive={openStep === 3} isCompleted={openStep > 3}>
            {openStep === 3 ? (
              <div className="space-y-6">
                {/* Adult Section */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Adult (&gt;12 years)</h3>
                  
                  {/* Existing Travellers */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mukesh" />
                      <Label htmlFor="mukesh" className="text-sm font-medium text-gray-700 cursor-pointer">Mr Mukesh Khanna</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="rosie" />
                      <Label htmlFor="rosie" className="text-sm font-medium text-gray-700 cursor-pointer">Mrs Rosie fernandez</Label>
                    </div>
                  </div>

                  {/* Add New Adult Link */}
                  {!showAdultForm ? (
                    <button 
                      onClick={() => setShowAdultForm(true)}
                      className="flex items-center gap-2 text-[#194a8f] hover:text-[#143a7a] font-medium text-sm mb-4"
                    >
                      <span className="text-lg">+</span>
                      ADD NEW ADULT
                    </button>
                  ) : null}

                  {/* Adult Form - Show when showAdultForm is true */}
                  {showAdultForm && (
                    <>
                      {/* Warning Message */}
                      <div className="flex items-start gap-2 bg-yellow-50 rounded-lg p-3 mb-4">
                        <div className="flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-xs text-yellow-800">Please ensure that your name matches your govt. ID such as Aadhaar, Passport or Driver's License</span>
                      </div>

                      {/* Personal Details */}
                      <div className="mb-5">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Personal details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Gender</Label>
                            <Select>
                              <SelectTrigger className="h-8 text-sm">
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">First name</Label>
                            <Input 
                              placeholder="Ex - 'Rakesh'"
                              className="h-8 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Last name</Label>
                            <Input 
                              placeholder="Ex - 'Rakesh'"
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Date of birth</Label>
                            <Input 
                              type="date" 
                              className="h-8 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Nationality</Label>
                            <Input 
                              placeholder="Ex - 'Indian'"
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Passport Details */}
                      <div className="mb-5">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Passport details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Passport Number</Label>
                            <Input 
                              placeholder="Ex - 'A1234567'"
                              className="h-8 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Issuing country</Label>
                            <Input 
                              placeholder="Ex - 'India'"
                              className="h-8 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Expiry date</Label>
                            <Input 
                              type="date" 
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Save/Cancel buttons */}
                      <div className="flex gap-3 mb-4">
                        <button 
                          onClick={() => setShowAdultForm(false)}
                          className="px-3 py-1.5 bg-[#194a8f] text-white text-xs font-medium rounded-md hover:bg-[#143a7a]"
                        >
                          Save Adult
                        </button>
                        <button 
                          onClick={() => setShowAdultForm(false)}
                          className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Child Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Child (2-12 years)</h3>
                  
                  {/* Add New Child Link */}
                  {!showChildForm ? (
                    <button 
                      onClick={() => setShowChildForm(true)}
                      className="flex items-center gap-2 text-[#194a8f] hover:text-[#143a7a] font-medium text-sm mb-4"
                    >
                      <span className="text-lg">+</span>
                      ADD NEW CHILD
                    </button>
                  ) : null}

                  {/* Child Form - Show when showChildForm is true */}
                  {showChildForm && (
                    <>
                      {/* Warning Message */}
                      <div className="flex items-start gap-2 bg-yellow-50 rounded-lg p-3 mb-4">
                        <div className="flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-xs text-yellow-800">Please ensure that your name matches your govt. ID such as Aadhaar, Passport or Driver's License</span>
                      </div>

                      {/* Personal Details */}
                      <div className="mb-5">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Personal details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Gender</Label>
                            <Select>
                              <SelectTrigger className="h-8 text-sm">
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">First name</Label>
                            <Input 
                              placeholder="Ex - 'Rakesh'"
                              className="h-8 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Last name</Label>
                            <Input 
                              placeholder="Ex - 'Rakesh'"
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Date of birth</Label>
                            <Input 
                              type="date" 
                              className="h-8 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Nationality</Label>
                            <Input 
                              placeholder="Ex - 'Indian'"
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Passport Details */}
                      <div className="mb-5">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Passport details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Passport Number</Label>
                            <Input 
                              placeholder="Ex - 'A1234567'"
                              className="h-8 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Issuing country</Label>
                            <Input 
                              placeholder="Ex - 'India'"
                              className="h-8 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-700 mb-1">Expiry date</Label>
                            <Input 
                              type="date" 
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Save/Cancel buttons */}
                      <div className="flex gap-3 mb-4">
                        <button 
                          onClick={() => setShowChildForm(false)}
                          className="px-3 py-1.5 bg-[#194a8f] text-white text-xs font-medium rounded-md hover:bg-[#143a7a]"
                        >
                          Save Child
                        </button>
                        <button 
                          onClick={() => setShowChildForm(false)}
                          className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : openStep > 3 ? (
              // Summary view for completed Step 3
              <div className="py-3 text-gray-500 cursor-pointer group" onClick={() => setOpenStep(3)}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Traveller: John Doe • +91 98765 43210</span>
                  <span className="flex items-center justify-center group-hover:bg-blue-50 rounded-full transition-colors" style={{width: 32, height: 32}}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5" stroke="#2563EB"/><path d="M8 10l4 4 4-4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
              </div>
            ) : null}
          </StepCard>
          {openStep === 3 && (
            <button
              className="mt-8 bg-[#194a8f] text-white font-semibold rounded px-5 py-2.5 text-base hover:bg-[#143a7a]"
              onClick={() => setOpenStep(4)}
            >
              Continue
            </button>
          )}

          {/* Step 4: Add contact details */}
          <StepCard step={4} title="Add contact details" open={openStep >= 4} className="mt-6" isActive={openStep === 4} isCompleted={openStep > 4}>
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
              <div className="py-3 text-gray-500 cursor-pointer group" onClick={() => setOpenStep(4)}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Contact: john.doe@email.com • +91 98765 43210</span>
                  <span className="flex items-center justify-center group-hover:bg-blue-50 rounded-full transition-colors" style={{width: 32, height: 32}}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5" stroke="#2563EB"/><path d="M8 10l4 4 4-4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
              </div>
            ) : null}
          </StepCard>
          {openStep === 4 && (
            <button
              className="mt-8 bg-[#194a8f] text-white font-semibold rounded px-5 py-2.5 text-base hover:bg-[#143a7a]"
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