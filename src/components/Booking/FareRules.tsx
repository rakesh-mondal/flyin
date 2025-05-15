import React, { useState } from 'react';

// Types for dynamic props
export interface FareRulePolicy {
  label: string;
  timeline: { start: string; end: string; color: string; label: string }[];
  values: string[];
  info?: string[];
}

export interface FareRuleDirection {
  label: string; // e.g., "BLR → DEL: Standard fare"
  highlights: { icon: React.ReactNode; text: string }[];
  cancellationPolicy: FareRulePolicy;
  dateChangePolicy: FareRulePolicy;
}

export interface FareRulesProps {
  directions: FareRuleDirection[];
}

const FareRules: React.FC<FareRulesProps> = ({ directions }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    cancellation: true,
    dateChange: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const direction = directions[activeTab];

  return (
    <div className="bg-white rounded-xl border border-gray-200 mt-6">
      {/* Tabs */}
      <div className="flex gap-2 px-4 pt-4">
        {directions.map((dir, idx) => (
          <button
            key={dir.label}
            className={
              `px-5 py-2 rounded-full font-semibold text-sm transition
              ${idx === activeTab
                ? 'bg-[#194E91] text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-blue-50'}
              border border-transparent
              focus:outline-none focus:ring-2 focus:ring-[#194E91]`
            }
            onClick={() => setActiveTab(idx)}
            type="button"
          >
            {dir.label}
          </button>
        ))}
      </div>
      {/* Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-4 border-b border-gray-200">
        {direction.highlights.map((h, i) => (
          <div key={i} className="flex items-center gap-2 text-gray-700 text-xs font-medium">
            {h.icon}
            <span className="whitespace-nowrap">{h.text}</span>
          </div>
        ))}
      </div>
      {/* Policies */}
      <div className="divide-y divide-gray-200">
        {/* Cancellation Policy */}
        <div>
          <button
            className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-[15px] text-gray-900 focus:outline-none"
            onClick={() => toggleSection('cancellation')}
          >
            <span>Cancellation refund policy</span>
            <svg className={`w-5 h-5 ml-2 transition-transform ${openSections.cancellation ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {openSections.cancellation && (
            <div className="px-6 pb-4">
              <div className="flex items-center text-xs text-gray-500 mb-2 font-medium">
                <span className="w-1/3">Cancel between</span>
                <span className="w-1/3 text-center">{direction.cancellationPolicy.timeline[1].start}</span>
                <span className="w-1/3 text-right">{direction.cancellationPolicy.timeline[1].end}</span>
              </div>
              {/* Timeline */}
              <div className="flex items-center mb-2">
                <div className="flex-1 h-2 rounded-full bg-yellow-300" style={{ maxWidth: '66%' }} />
                <div className="flex-1 h-2 rounded-full bg-red-400 ml-1" style={{ maxWidth: '34%' }} />
              </div>
              <div className="flex items-center text-sm font-semibold">
                <span className="w-1/3">Amount refundable</span>
                <span className="w-1/3 text-center">{direction.cancellationPolicy.values[0]} <span className="text-gray-400 cursor-pointer text-xs font-normal">{direction.cancellationPolicy.info?.[0]}</span></span>
                <span className="w-1/3 text-right">{direction.cancellationPolicy.values[1]} <span className="text-gray-400 cursor-pointer text-xs font-normal">{direction.cancellationPolicy.info?.[1]}</span></span>
              </div>
            </div>
          )}
        </div>
        {/* Date Change Policy */}
        <div>
          <button
            className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-[15px] text-gray-900 focus:outline-none"
            onClick={() => toggleSection('dateChange')}
          >
            <span>Date change policy</span>
            <svg className={`w-5 h-5 ml-2 transition-transform ${openSections.dateChange ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {openSections.dateChange && (
            <div className="px-6 pb-4">
              <div className="flex items-center text-xs text-gray-500 mb-2 font-medium">
                <span className="w-1/3">Change between</span>
                <span className="w-1/3 text-center">{direction.dateChangePolicy.timeline[1].start}</span>
                <span className="w-1/3 text-right">{direction.dateChangePolicy.timeline[1].end}</span>
              </div>
              {/* Timeline */}
              <div className="flex items-center mb-2">
                <div className="flex-1 h-2 rounded-full bg-yellow-300" style={{ maxWidth: '66%' }} />
                <div className="flex-1 h-2 rounded-full bg-red-400 ml-1" style={{ maxWidth: '34%' }} />
              </div>
              <div className="flex items-center text-sm font-semibold">
                <span className="w-1/3">Date change charges</span>
                <span className="w-1/3 text-center">{direction.dateChangePolicy.values[0]}</span>
                <span className="w-1/3 text-right">{direction.dateChangePolicy.values[1]}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FareRules; 