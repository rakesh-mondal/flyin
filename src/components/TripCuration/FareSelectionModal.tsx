import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Check, X as Cross, Luggage, Calendar, Armchair, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const FEATURES = [
  { key: 'freeCancellation', label: 'Free cancellation' },
  { key: 'freeDateChange', label: 'Free date change' },
  { key: 'freeSeatSelection', label: 'Free seat selection' },
  { key: 'freeMealSelection', label: 'Free meal selection' },
  { key: 'checkInLuggage', label: 'Check-in luggage' },
];

const LEGEND = [
  { label: 'Baggage', icon: Luggage },
  { label: 'Cancellation fee', icon: Calendar },
  { label: 'Date Change fee', icon: Calendar },
  { label: 'Seat selection', icon: Armchair },
  { label: 'Meal selection', icon: Utensils },
];

// Helper to get fare options based on trip
function getFareOptions(trip) {
  // Hardcoded realistic fares
  return [
    {
      id: 'base',
      label: 'Base fare',
      price: 350,
      currency: 'AED',
      features: {
        baggage: {
          cabin: 'Cabin luggage 7 kg',
          checkin: 'Check-in luggage 15 kg'
        },
        cancellation: false,
        cancellationFee: 200,
        dateChange: false,
        dateChangeFee: 200,
        seatSelection: false,
        mealSelection: false,
      },
      promo: 'Get Flat AED 80 off using TRYFL for new users',
    },
    {
      id: 'flex',
      label: 'Flyin Flex',
      price: 450,
      currency: 'AED',
      features: {
        baggage: {
          cabin: 'Cabin luggage 7 kg',
          checkin: 'Check-in luggage 15 kg'
        },
        cancellation: true,
        cancellationFee: 25,
        dateChange: true,
        dateChangeFee: 25,
        seatSelection: true,
        mealSelection: true,
      },
      promo: 'Get Flat AED 80 off using TRYFL for new users',
      highlight: 'Best deal',
      badge: 'CTSPECIAL',
    },
    {
      id: 'premium',
      label: 'Flex fare',
      price: 550,
      currency: 'AED',
      features: {
        baggage: {
          cabin: 'Cabin luggage 7 kg',
          checkin: 'Check-in luggage 15 kg'
        },
        cancellation: true,
        cancellationFee: 25,
        dateChange: false,
        dateChangeFee: 200,
        seatSelection: false,
        mealSelection: true,
        expressCheckIn: true,
        priorityBoarding: true,
      },
    },
  ];
}

function featureMatch(option, filters) {
  // Only show cards that match all checked filters
  return Object.entries(filters).every(([key, value]) => !value || (
    key === 'freeCancellation' ? option.features.cancellation : 
    key === 'freeDateChange' ? option.features.dateChange :
    key === 'freeSeatSelection' ? option.features.seatSelection :
    key === 'freeMealSelection' ? option.features.mealSelection :
    key === 'checkInLuggage' ? option.features.baggage.checkin :
    false
  ));
}

const FareSelectionModal = ({ open, trip, onClose, onFareSelected }) => {
  if (!trip) return null;
  const [filters, setFilters] = useState({
    freeCancellation: false,
    freeDateChange: false,
    freeSeatSelection: false,
    freeMealSelection: false,
    checkInLuggage: false,
  });
  
  const fareOptions = useMemo(() => getFareOptions(trip), [trip]);
  const filteredOptions = useMemo(
    () => fareOptions.filter(option => featureMatch(option, filters)),
    [fareOptions, filters]
  );
  
  const [selectedFare, setSelectedFare] = useState(filteredOptions[1]?.id || filteredOptions[0]?.id || '');
  
  // Track removed features by fare ID
  const [removedFeatures, setRemovedFeatures] = useState({
    flex: {
      cancellation: false,
      dateChange: false,
      seatSelection: false,
      mealSelection: false
    },
    premium: {
      cancellation: false,
      dateChange: false,
      seatSelection: false,
      mealSelection: false
    }
  });
  
  // Toggle feature removal for a specific fare
  const toggleFeature = (fareId, feature) => {
    setRemovedFeatures(prev => ({
      ...prev,
      [fareId]: {
        ...prev[fareId],
        [feature]: !prev[fareId]?.[feature]
      }
    }));
  };
  
  const [activeTab, setActiveTab] = useState('outbound');
  
  // Provide mock data for outbound and return if missing (for prototype)
  const mockOutbound = {
    airlineLogo: 'https://airhex.com/images/airline-logos/qatar-airways.png',
    airlineName: 'Qatar Airways',
    departureTime: '13:10',
    arrivalTime: '20:08',
    stops: '1 stop',
    departureCode: 'RUH',
    arrivalCode: 'DXB',
    departureDate: 'Fri, 28 Mar',
  };
  const mockReturn = {
    airlineLogo: 'https://airhex.com/images/airline-logos/qatar-airways.png',
    airlineName: 'Qatar Airways',
    departureTime: '09:10',
    arrivalTime: '12:15',
    stops: 'Non-stop',
    departureCode: 'DXB',
    arrivalCode: 'RUH',
    departureDate: 'Fri, 28 Mar',
  };
  const outbound = trip.outbound || mockOutbound;
  const inbound = trip.return || mockReturn;
  
  const handleContinue = () => {
    const selected = filteredOptions.find(option => option.id === selectedFare);
    if (selected) {
      // Apply feature removals to the selected fare
      const modifiedSelectedFare = {
        ...selected,
        features: {
          ...selected.features,
          cancellation: removedFeatures[selected.id]?.cancellation ? false : selected.features.cancellation,
          dateChange: removedFeatures[selected.id]?.dateChange ? false : selected.features.dateChange,
          seatSelection: removedFeatures[selected.id]?.seatSelection ? false : selected.features.seatSelection,
          mealSelection: removedFeatures[selected.id]?.mealSelection ? false : selected.features.mealSelection,
        }
      };
      onFareSelected({ ...trip, selectedFare: modifiedSelectedFare });
    }
  };

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-7xl w-full p-0 overflow-hidden">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Select your fare</DialogTitle>
          </DialogHeader>
          {/* Flight summary tabs (always show both for prototype) */}
          <div className="flex gap-x-8 mt-2 mb-2">
            {/* Outbound Tab */}
            <button
              className={`flex flex-row items-center min-h-[56px] px-2 pb-2 border-b-2 ${activeTab === 'outbound' ? 'border-blue-600' : 'border-transparent'}`}
              onClick={() => setActiveTab('outbound')}
              type="button"
            >
              {/* Left: Logo + Name */}
              <div className="flex flex-col items-center min-w-[60px]">
                <div className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-[4px] bg-white">
                  {outbound.airlineLogo ? (
                    <img src={outbound.airlineLogo} alt={outbound.airlineName} className="w-6 h-6 object-contain" />
                  ) : (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M2 16l20-4M2 8l20 4M10 6.5L12 4l2 2.5M10 17.5L12 20l2-2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </div>
                <span className="text-[12px] font-medium text-black mt-1">{outbound.airlineName || 'Airline'}</span>
              </div>
              {/* Right: Details */}
              <div className="flex flex-col items-start justify-center ml-4">
                <span className="flex items-baseline gap-2">
                  <span className="text-[14px] font-bold text-black">{outbound.departureTime || '—'} - {outbound.arrivalTime || '—'}</span>
                  <span className="text-[12px] font-bold text-gray-500">({outbound.stops || 'Non-stop'})</span>
                </span>
                <span className="text-[12px] text-gray-500 mt-0.5">{outbound.departureCode || '—'} → {outbound.arrivalCode || '—'} · {outbound.departureDate || '—'}</span>
              </div>
            </button>
            {/* Return Tab (always show, use mock if missing) */}
            <button
              className={`flex flex-row items-center min-h-[56px] px-2 pb-2 border-b-2 ${activeTab === 'return' ? 'border-blue-600' : 'border-transparent'}`}
              onClick={() => setActiveTab('return')}
              type="button"
            >
              {/* Left: Logo + Name */}
              <div className="flex flex-col items-center min-w-[60px]">
                <div className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-[4px] bg-white">
                  {inbound.airlineLogo ? (
                    <img src={inbound.airlineLogo} alt={inbound.airlineName} className="w-6 h-6 object-contain" />
                  ) : (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M2 16l20-4M2 8l20 4M10 6.5L12 4l2 2.5M10 17.5L12 20l2-2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </div>
                <span className="text-[12px] font-medium text-black mt-1">{inbound.airlineName || 'Airline'}</span>
              </div>
              {/* Right: Details */}
              <div className="flex flex-col items-start justify-center ml-4">
                <span className="flex items-baseline gap-2">
                  <span className="text-[14px] font-bold text-black">{inbound.departureTime || '—'} - {inbound.arrivalTime || '—'}</span>
                  <span className="text-[12px] font-bold text-gray-500">({inbound.stops || 'Non-stop'})</span>
                </span>
                <span className="text-[12px] text-gray-500 mt-0.5">{inbound.departureCode || '—'} → {inbound.arrivalCode || '—'} · {inbound.departureDate || '—'}</span>
              </div>
            </button>
          </div>
          
          {/* Filter checkboxes */}
          <div className="flex flex-wrap gap-4 mt-3 border-b pb-4">
            {FEATURES.map(f => (
              <label key={f.key} className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filters[f.key]}
                  onChange={e => setFilters({ ...filters, [f.key]: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 accent-blue-700"
                />
                <span className="text-sm text-gray-700">{f.label}</span>
              </label>
            ))}
          </div>
          
          {/* Fare selection */}
          <div className="mt-4">
            <div className="flex">
              {/* Left column with labels */}
              <div className="w-44 pt-10 bg-[#F9FAFB] pl-6">
                <div className="text-lg font-semibold mb-8">Plans</div>
                
                <div className="flex items-center gap-2 h-[68px]">
                  <Luggage className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium">Baggage</span>
                </div>
                
                <div className="flex items-center gap-2 h-[40px]">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium">Cancellation</span>
                </div>
                
                <div className="flex items-center gap-2 h-[40px]">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium">Date Change</span>
                </div>
                
                <div className="flex items-center gap-2 h-[40px]">
                  <Armchair className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium">Seat selection</span>
                </div>
                
                <div className="flex items-center gap-2 h-[40px]">
                  <Utensils className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium">Meal</span>
                </div>
                
                <div className="flex items-center gap-2 h-[84px]">
                  <span className="text-sm font-medium">Exclusive benefits</span>
                </div>
              </div>
              
              {/* Fare cards */}
              <div className="flex-1">
                <RadioGroup 
                  value={selectedFare} 
                  onValueChange={setSelectedFare}
                  className="grid grid-cols-3 gap-1"
                >
                  {filteredOptions.map((option) => (
                    <div key={option.id} className="relative">
                      {/* Badge: FLSPECIAL, slightly down from top right */}
                      {option.badge && (
                        <div className="absolute right-3 top-10 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                          FLSPECIAL
                        </div>
                      )}
                      {/* Radio button: top right */}
                      <div className="absolute top-3 right-3">
                        <RadioGroupItem value={option.id} id={option.id} className="h-5 w-5 text-blue-700" />
                      </div>
                      <div className={`border-2 ${selectedFare === option.id ? 'border-[#184E91]' : 'border-gray-200'} rounded-lg overflow-hidden transition-all duration-200`}>
                        <div className="pt-8 pb-3 flex flex-col items-start relative border-b px-4">
                          {/* Left-aligned label and price */}
                          <div className="text-base font-medium text-left w-full" style={{ fontSize: '16px' }}>{option.label}</div>
                          <div className="font-bold text-left w-full" style={{ fontSize: '24px' }}>{option.currency} {option.price}</div>
                        </div>
                        
                        {/* Baggage */}
                        <div className="px-3 py-2 border-b border-dashed h-[68px]">
                          <div className="flex items-start gap-2">
                            <Check className="h-5 w-5 mt-0.5 text-green-500 flex-shrink-0" />
                            <span className="text-[12px]">{option.features.baggage.cabin}</span>
                          </div>
                          <div className="flex items-start gap-2 mt-1">
                            <Check className="h-5 w-5 mt-0.5 text-green-500 flex-shrink-0" />
                            <span className="text-[12px]">{option.features.baggage.checkin}</span>
                          </div>
                        </div>
                        
                        {/* Cancellation */}
                        <div className="px-3 py-2.5 border-b border-dashed">
                          <div className="flex items-center gap-2 w-full">
                            {option.features.cancellation && !removedFeatures[option.id]?.cancellation ? (
                              <Check className="h-5 w-5 text-green-500 flex-shrink-0 transition-all duration-200" />
                            ) : (
                              <Cross className="h-5 w-5 text-red-500 flex-shrink-0 transition-all duration-200" />
                            )}
                            <div className="flex-1 flex justify-between items-center">
                              <span className="text-[12px] transition-all duration-200 min-w-[120px]">Free cancellation for AED 25</span>
                              {option.id === 'flex' && (
                                <span
                                  className={`h-5 flex items-center text-xs font-medium cursor-pointer transition-colors duration-200 min-w-[45px] text-right ${option.features.cancellation && !removedFeatures[option.id]?.cancellation ? 'text-red-600 hover:text-red-700' : 'text-[#184E91] hover:text-blue-700'}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFeature(option.id, 'cancellation');
                                  }}
                                >
                                  {option.features.cancellation && !removedFeatures[option.id]?.cancellation ? 'Remove' : 'Add'}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className={`text-[10px] font-semibold text-red-500 mt-0.5 ml-7 ${option.features.cancellation && removedFeatures[option.id]?.cancellation ? '' : 'invisible'}`}>Cancellation fee starts from AED 200 onwards.</div>
                        </div>
                        
                        {/* Date Change */}
                        <div className="px-3 py-2.5 border-b border-dashed">
                          <div className="flex items-center gap-2 w-full">
                            {option.features.dateChange && !removedFeatures[option.id]?.dateChange ? (
                              <Check className="h-5 w-5 text-green-500 flex-shrink-0 transition-all duration-200" />
                            ) : (
                              <Cross className="h-5 w-5 text-red-500 flex-shrink-0 transition-all duration-200" />
                            )}
                            <div className="flex-1 flex justify-between items-center">
                              <span className="text-[12px] transition-all duration-200 min-w-[120px]">Free date change for AED 25</span>
                              {option.id === 'flex' && (
                                <span
                                  className={`h-5 flex items-center text-xs font-medium cursor-pointer transition-colors duration-200 min-w-[45px] text-right ${option.features.dateChange && !removedFeatures[option.id]?.dateChange ? 'text-red-600 hover:text-red-700' : 'text-[#184E91] hover:text-blue-700'}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFeature(option.id, 'dateChange');
                                  }}
                                >
                                  {option.features.dateChange && !removedFeatures[option.id]?.dateChange ? 'Remove' : 'Add'}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className={`text-[10px] font-semibold text-red-500 mt-0.5 ml-7 ${option.features.dateChange && removedFeatures[option.id]?.dateChange ? '' : 'invisible'}`}>Date change fee starts from AED 200 onwards.</div>
                        </div>
                        
                        {/* Seat selection */}
                        <div className="px-3 py-2.5 border-b border-dashed">
                          <div className="flex items-center gap-2 w-full">
                            {option.features.seatSelection && !removedFeatures[option.id]?.seatSelection ? (
                              <Check className="h-5 w-5 text-green-500 flex-shrink-0 transition-all duration-200" />
                            ) : (
                              <Cross className="h-5 w-5 text-red-500 flex-shrink-0 transition-all duration-200" />
                            )}
                            <div className="flex-1 flex justify-between items-center">
                              <span className="text-[12px] transition-all duration-200 min-w-[120px]">Seat selection for AED 25</span>
                              {option.id === 'flex' && (
                                <span
                                  className={`h-5 flex items-center text-xs font-medium cursor-pointer transition-colors duration-200 min-w-[45px] text-right ${option.features.seatSelection && !removedFeatures[option.id]?.seatSelection ? 'text-red-600 hover:text-red-700' : 'text-[#184E91] hover:text-blue-700'}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFeature(option.id, 'seatSelection');
                                  }}
                                >
                                  {option.features.seatSelection && !removedFeatures[option.id]?.seatSelection ? 'Remove' : 'Add'}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className={`text-[10px] font-semibold text-red-500 mt-0.5 ml-7 ${option.features.seatSelection && removedFeatures[option.id]?.seatSelection ? '' : 'invisible'}`}>Seat selection fee starts from AED 200 onwards.</div>
                        </div>
                        
                        {/* Meal selection */}
                        <div className="px-3 py-2.5 border-b border-dashed">
                          <div className="flex items-center gap-2 w-full">
                            {option.features.mealSelection && !removedFeatures[option.id]?.mealSelection ? (
                              <Check className="h-5 w-5 text-green-500 flex-shrink-0 transition-all duration-200" />
                            ) : (
                              <Cross className="h-5 w-5 text-red-500 flex-shrink-0 transition-all duration-200" />
                            )}
                            <div className="flex-1 flex justify-between items-center">
                              <span className="text-[12px] transition-all duration-200 min-w-[120px]">Meal selection for AED 25</span>
                              {option.id === 'flex' && (
                                <span
                                  className={`h-5 flex items-center text-xs font-medium cursor-pointer transition-colors duration-200 min-w-[45px] text-right ${option.features.mealSelection && !removedFeatures[option.id]?.mealSelection ? 'text-red-600 hover:text-red-700' : 'text-[#184E91] hover:text-blue-700'}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFeature(option.id, 'mealSelection');
                                  }}
                                >
                                  {option.features.mealSelection && !removedFeatures[option.id]?.mealSelection ? 'Remove' : 'Add'}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className={`text-[10px] font-semibold text-red-500 mt-0.5 ml-7 ${option.features.mealSelection && removedFeatures[option.id]?.mealSelection ? '' : 'invisible'}`}>Meal selection fee starts from AED 200 onwards.</div>
                        </div>
                        
                        {/* Exclusive benefits - Fixed height to prevent layout shift */}
                        <div className="px-3 py-3 h-[84px] overflow-y-auto">
                          {option.promo ? (
                            <div className="bg-green-50 rounded p-2 flex items-start gap-2">
                              <div className="text-green-500 font-bold text-xl mt-0.5">⊕</div>
                              <div className="text-sm text-green-700">
                                {option.promo}
                              </div>
                            </div>
                          ) : option.features.expressCheckIn ? (
                            <div className="flex flex-col gap-1 mt-1">
                              <div className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span className="text-sm">Express Check-in</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span className="text-sm">Priority Boarding</span>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      {option.highlight && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-[#184E91] px-4 py-0.5 rounded-full z-10 border-2 border-[#184E91]" style={{ fontSize: '14px' }}>
                          {option.highlight}
                        </div>
                      )}
                    </div>
                  ))}
                </RadioGroup>
                
                {filteredOptions.length === 0 && (
                  <div className="text-gray-400 text-center p-8">No fares match the selected filters.</div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer with price and continue button */}
        <div className="flex items-center justify-between bg-white border-t p-4">
          <div>
            <div className="text-2xl font-bold">
              AED {filteredOptions.find(o => o.id === selectedFare)?.price || 450}
            </div>
            <div className="text-sm text-gray-500">per person</div>
          </div>
          <Button 
            onClick={handleContinue}
            className="bg-primary hover:bg-primary-hover text-primary-foreground hover:text-[#194E91] font-semibold rounded-lg px-5 py-2 min-w-[110px]"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FareSelectionModal; 