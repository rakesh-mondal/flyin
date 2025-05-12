import React, { useState } from 'react';
import TopHeader from '../TripCuration/TopHeader';
import { getAirlineLogo } from '../../utils/airlineLogos';

const steps = [
  'Review your itinerary',
  'Choose add-ons',
  'Add contact details',
  'Add traveller details',
];

const mockOffers = [
  {
    code: 'HDFCEMI',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/HDFC_Bank_Logo.svg',
    discount: 'Flat ₹1500 off',
    description: 'Applicable on HDFC Credit Card EMI',
    details: 'Know more',
    type: 'bank',
  },
  {
    code: 'CTDOM',
    icon: 'https://cdn-icons-png.flaticon.com/512/5977/5977575.png',
    discount: 'Flat ₹447 off',
    description: 'Additional 5% cashback with Flipkart Axis Credit Card',
    details: 'Know more',
    type: 'bank',
  },
];

const CouponCard = () => {
  const [tab, setTab] = useState<'all' | 'bank'>('all');
  const offers = tab === 'all' ? mockOffers : mockOffers.filter(o => o.type === 'bank');

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6 w-full">
      <div className="font-semibold text-base mb-3">Apply coupon or gift card</div>
      <div className="flex gap-2 mb-3">
        <input type="text" placeholder="Coupon/Gift card" className="border rounded px-2 py-1 flex-1 text-sm" />
        <button className="bg-black text-white rounded px-4 py-1 text-sm font-semibold">Apply</button>
      </div>
      <div className="flex gap-2 mb-3">
        <button onClick={() => setTab('all')} className={`px-3 py-1 rounded-full text-xs font-medium border ${tab === 'all' ? 'bg-black text-white border-black' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>All offers</button>
        <button onClick={() => setTab('bank')} className={`px-3 py-1 rounded-full text-xs font-medium border ${tab === 'bank' ? 'bg-black text-white border-black' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>Bank offers</button>
      </div>
      <div className="flex flex-col gap-3">
        {offers.map((offer) => (
          <div key={offer.code} className="flex items-start gap-3 border-b last:border-b-0 pb-3 last:pb-0">
            <img src={offer.icon} alt={offer.code} className="h-7 w-7 rounded bg-gray-100 object-contain mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-gray-100 text-gray-800 rounded px-2 py-0.5 text-xs font-semibold tracking-wide">{offer.code}</span>
                <button className="ml-auto text-blue-600 text-xs font-semibold">Apply</button>
              </div>
              <div className="text-green-600 font-semibold text-sm mb-0.5">{offer.discount}</div>
              <div className="text-xs text-gray-600">
                {offer.description} <a href="#" className="text-blue-600 font-medium">{offer.details}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
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
          code: '6E-1430',
          class: 'Economy',
          depTime: '18:45',
          depCode: 'AUH',
          depAirport: 'Zayed International Airport, Terminal A, Abu Dhabi',
          arrTime: '23:40',
          arrCode: 'BOM',
          arrAirport: 'Chatrapati Shivaji Airport, Terminal 2, Mumbai',
          duration: '3h 25m',
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
    <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white font-bold text-lg">1</div>
        <span className="text-xl font-bold">Review your itinerary</span>
      </div>
      {directions.map((dir, i) => (
        <div key={dir.title} className={i > 0 ? 'pt-8 border-t border-dashed border-gray-200 mt-8' : ''}>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-semibold text-lg">{dir.title}</span>
            <span className="text-gray-400 text-base font-medium">{dir.date}</span>
            {dir.arrivesNextDay && (
              <span className="ml-2 px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs font-semibold">ARRIVES NEXT DAY</span>
            )}
          </div>
          {dir.segments.map((seg, idx) => (
            seg.layover ? (
              <div key={idx} className="bg-gray-50 rounded text-sm text-gray-700 flex items-center px-4 py-2 my-4">
                <span>Layover in {seg.airport}</span>
                <span className="ml-2 text-xs text-rose-500 font-medium">Short layover {seg.duration}</span>
              </div>
            ) : (
              <div key={idx} className="py-3">
                <div className="grid grid-cols-[70px_1fr] gap-2 items-start">
                  {/* Left: Airline logo and info */}
                  <div className="flex flex-col items-start text-left">
                    <img src={getAirlineLogo(seg.airline)} alt={seg.airline} className="h-8 w-8 object-contain rounded bg-white border border-gray-200" />
                    <span className="text-sm font-semibold text-gray-900 leading-tight mt-1">{seg.airline}</span>
                    <span className="text-xs text-gray-500">{seg.code}</span>
                    <span className="text-xs text-gray-500">{seg.class}</span>
                  </div>
                  {/* Right: Times, codes, airport, and baggage info */}
                  <div className="flex flex-col w-full">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base tracking-wide">{seg.depTime}</span>
                      <span className="text-gray-700 font-medium text-sm">{seg.depCode}</span>
                      <span className="text-gray-400 mx-1">•</span>
                      <span className="text-gray-700 text-sm font-medium">{seg.depAirport}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-400"><svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#F3F4F6"/><path d="M8 4v4l2.5 2.5" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                      <span className="text-gray-600 text-sm">{seg.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="font-bold text-base tracking-wide">{seg.arrTime}</span>
                      <span className="text-gray-700 font-medium text-sm">{seg.arrCode}</span>
                      <span className="text-gray-400 mx-1">•</span>
                      <span className="text-gray-700 text-sm font-medium">{seg.arrAirport}</span>
                    </div>
                    {/* Baggage info below the airport name, aligned left */}
                    <div className="flex flex-row gap-8 text-gray-600 text-xs font-normal mt-4">
                      <span>Check-in baggage <span className="font-semibold">{seg.baggage.checkin} / adult</span></span>
                      <span>Cabin baggage <span className="font-semibold">{seg.baggage.cabin} / adult</span></span>
                    </div>
                  </div>
                </div>
                <div className="border-b border-dashed border-gray-100 last:border-b-0" />
              </div>
            )
          ))}
        </div>
      ))}
    </div>
  );
};

const StepCard = ({ step, title, children }: { step: number, title: string, children?: React.ReactNode }) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full mt-8">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold text-lg">{step}</div>
      <span className="text-xl font-bold">{title}</span>
    </div>
    {children || <div className="text-gray-400 text-base mt-2">Coming soon...</div>}
  </div>
);

const SummarySidebar = ({ trip }: { trip: any }) => (
  <aside className="w-full max-w-xs sticky top-8">
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <div className="flex items-start justify-between mb-1">
        <div className="text-lg font-semibold">Total price</div>
        <div className="text-3xl font-bold text-right">₹26,083</div>
      </div>
      <div className="text-sm text-gray-500 mb-4">1 adult</div>
      <hr className="my-3 border-gray-200" />
      <div className="flex flex-col gap-2 mb-3">
        <div className="flex items-center justify-between text-base">
          <span className="text-gray-600">Base fare (1 traveller)</span>
          <span className="font-medium text-gray-900">₹19,384</span>
        </div>
        <div className="flex items-center justify-between text-base">
          <span className="text-gray-600">Taxes and fees</span>
          <span className="font-medium text-gray-900">₹6,699</span>
        </div>
        <div className="flex items-center justify-between text-base">
          <span className="text-gray-400 flex items-center">Visa Denial Cover <svg className="ml-1" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="9" fill="#7C3AED"/><path d="M7.5 9.5L9 11L12 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          <span className="font-semibold text-green-600">FREE</span>
        </div>
      </div>
      <hr className="my-3 border-gray-200" />
      <div className="flex items-start gap-3 bg-orange-50 rounded-xl p-3 mt-2">
        <span className="mt-1"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#FFF3E0"/><path d="M7 10V8.5A2.5 2.5 0 0 1 9.5 6h5A2.5 2.5 0 0 1 17 8.5V10" stroke="#FF6F00" strokeWidth="1.5"/><rect x="7" y="10" width="10" height="6" rx="2" stroke="#FF6F00" strokeWidth="1.5"/><path d="M10 13h4" stroke="#FF6F00" strokeWidth="1.5" strokeLinecap="round"/></svg></span>
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900 mb-0.5">Pay in 3 interest free EMIs</div>
          <div className="text-lg font-bold text-gray-900 mb-0.5">at ₹8,694/mo <span className="text-blue-600 text-base font-semibold ml-1 cursor-pointer">· View plans</span></div>
          <div className="text-xs text-gray-500">with your credit card</div>
        </div>
      </div>
    </div>
    <CouponCard />
  </aside>
);

export default function BookingPage({ trip }: { trip: any }) {
  // Debug log for trip object
  console.log('BookingPage trip:', trip);

  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopHeader />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 py-12 px-4">
        {/* Left: Vertical Stepper and Content */}
        <main className="flex-1 min-w-0">
          <ItineraryReview trip={trip} />
          <StepCard step={2} title="Choose add-ons" />
          <StepCard step={3} title="Add contact details" />
          <StepCard step={4} title="Add traveller details" />
          <button
            className="mt-8 bg-black text-white font-bold rounded px-6 py-3 text-lg"
            onClick={() => setStep((s) => Math.min(s + 1, 4))}
          >
            Continue
          </button>
        </main>
        {/* Right: Summary */}
        <div className="w-full md:w-96 flex-shrink-0">
          <SummarySidebar trip={trip} />
        </div>
      </div>
    </div>
  );
} 