import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Check, X as Cross, Luggage, Calendar, Armchair, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FEATURES = [
  { key: 'freeCancellation', label: 'Free cancellation', icon: Calendar },
  { key: 'freeDateChange', label: 'Free date change', icon: Calendar },
  { key: 'freeSeatSelection', label: 'Free seat selection', icon: Armchair },
  { key: 'freeMealSelection', label: 'Free meal selection', icon: Utensils },
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
      price: 500,
      currency: 'AED',
      description: '', // Removed description
      features: {
        baggage: 'Cabin luggage 7 kg, Check-in luggage 15 kg',
        cancellation: false,
        cancellationFee: 200,
        dateChange: true,
        dateChangeFee: 25,
        seatSelection: false,
        mealSelection: false,
      },
      promo: 'Get Flat AED 80 off using TRYCT for new users',
    },
    {
      id: 'flex',
      label: 'Flyin Flex',
      price: 590,
      currency: 'AED',
      description: '', // Removed description
      features: {
        baggage: 'Cabin luggage 7 kg, Check-in luggage 15 kg',
        cancellation: true,
        cancellationFee: 25,
        dateChange: true,
        dateChangeFee: 25,
        seatSelection: true,
        mealSelection: false,
      },
      promo: 'Get Flat AED 80 off using TRYCT for new users',
      highlight: 'CTSPECIAL',
    },
    {
      id: 'standard',
      label: 'Standard fare',
      price: 615,
      currency: 'AED',
      description: '', // Removed description
      features: {
        baggage: 'Cabin luggage 7 kg, Check-in luggage 15 kg',
        cancellation: false,
        cancellationFee: 25,
        dateChange: true,
        dateChangeFee: 25,
        seatSelection: true,
        mealSelection: false,
      },
      promo: 'Get Flat AED 80 off using TRYCT for new users',
      highlight: 'Best deal',
    },
  ];
}

function featureMatch(option, filters) {
  // Only show cards that match all checked filters
  return FEATURES.every(f => !filters[f.key] || option.features[f.key] === true);
}

const FareSelectionModal = ({ open, trip, onClose, onFareSelected }) => {
  const [filters, setFilters] = useState({
    freeCancellation: false,
    freeDateChange: false,
    freeSeatSelection: false,
    freeMealSelection: false,
  });

  const fareOptions = useMemo(() => getFareOptions(trip), [trip]);
  const filteredOptions = useMemo(
    () => fareOptions.filter(option => featureMatch(option, filters)),
    [fareOptions, filters]
  );

  if (!trip) return null;

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-5xl w-full">
        <DialogHeader>
          <DialogTitle>Select your fare</DialogTitle>
        </DialogHeader>
        {/* Airline logo and name below the title */}
        <div className="flex items-center gap-2">
          {trip.outbound?.airlineLogo && (
            <img src={trip.outbound.airlineLogo} alt={trip.outbound.airlineName} className="h-7 w-7 object-contain" />
          )}
          <span className="font-semibold text-base">{trip.outbound?.airlineName || 'Airline'}</span>
        </div>
        {/* Price, Outbound/Return details, Stops */}
        <div className="flex flex-col gap-0 text-sm text-gray-700 ml-9">
          <span>
            {(trip.outbound?.departureCity || trip.outbound?.departureCode) + ' → ' + (trip.outbound?.arrivalCity || trip.outbound?.arrivalCode)} {trip.outbound?.departureTime} - {trip.outbound?.arrivalTime}
            {trip.outbound?.stops !== undefined && (
              <span> · {trip.outbound.stops}</span>
            )}
          </span>
          {trip.return && (
            <span>
              {(trip.return.departureCity || trip.return.departureCode) + ' → ' + (trip.return.arrivalCity || trip.return.arrivalCode)} {trip.return.departureTime} - {trip.return.arrivalTime}
              {trip.return.stops !== undefined && (
                <span> · {trip.return.stops}</span>
              )}
            </span>
          )}
        </div>
        {/* Quick feature filter bar (checkboxes) */}
        <div className="flex gap-4 mb-6">
          {FEATURES.map(f => (
            <label key={f.key} className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters[f.key]}
                onChange={e => setFilters({ ...filters, [f.key]: e.target.checked })}
                className="accent-black"
              />
              <span className="text-sm text-gray-700">{f.label}</span>
            </label>
          ))}
        </div>
        <div className="overflow-x-auto w-full">
          <div
            className="grid w-full"
            style={{
              gridTemplateColumns: `180px repeat(${filteredOptions.length}, minmax(260px, 1fr))`,
              gridTemplateRows: 'auto repeat(5, 48px) auto',
            }}
          >
            {/* Legend column: header is empty, then features */}
            <div className="border-r pr-6" style={{ gridRow: '1 / span 1' }}></div>
            <div className="flex items-center gap-3 border-r pr-6" style={{ gridRow: 2 }}><Luggage className="h-5 w-5 text-gray-500" /><span className="text-xs text-gray-700">Baggage</span></div>
            <div className="flex items-center gap-3 border-r pr-6" style={{ gridRow: 3 }}><Calendar className="h-5 w-5 text-gray-500" /><span className="text-xs text-gray-700">Cancellation fee</span></div>
            <div className="flex items-center gap-3 border-r pr-6" style={{ gridRow: 4 }}><Calendar className="h-5 w-5 text-gray-500" /><span className="text-xs text-gray-700">Date Change fee</span></div>
            <div className="flex items-center gap-3 border-r pr-6" style={{ gridRow: 5 }}><Armchair className="h-5 w-5 text-gray-500" /><span className="text-xs text-gray-700">Seat selection</span></div>
            <div className="flex items-center gap-3 border-r pr-6" style={{ gridRow: 6 }}><Utensils className="h-5 w-5 text-gray-500" /><span className="text-xs text-gray-700">Meal selection</span></div>
            {/* Fare cards, one column per fare */}
            {filteredOptions.map((option, colIdx) => (
              <React.Fragment key={option.id}>
                {/* Card header: airline logo, name, label, price, description, highlight, stops */}
                <div
                  className="border rounded-lg bg-white relative shadow-sm mx-2 px-5 pt-5 pb-2 flex flex-col items-center"
                  style={{ gridColumn: colIdx + 2, gridRow: 1 }}
                >
                  {option.highlight && (
                    <div className="absolute top-3 right-3 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                      {option.highlight}
                    </div>
                  )}
                  <div className="font-semibold mb-1 text-sm">{option.label}</div>
                  <div className="text-2xl font-bold mb-2">{option.currency} {option.price}</div>
                  <div className="text-xs text-gray-600 mb-2">{option.description}</div>
                </div>
                {/* Baggage */}
                <div className="flex items-center gap-2 px-5 text-sm" style={{ gridColumn: colIdx + 2, gridRow: 2 }}>
                  <Luggage className="h-4 w-4 text-gray-400" />
                  <span>{option.features.baggage}</span>
                </div>
                {/* Cancellation fee */}
                <div className="flex items-center gap-2 px-5 text-sm" style={{ gridColumn: colIdx + 2, gridRow: 3 }}>
                  {option.features.cancellation ? (
                    <><Check className="inline h-4 w-4 text-green-600" /> Free cancellation for AED {option.features.cancellationFee}</>
                  ) : (
                    <><Cross className="inline h-4 w-4 text-gray-400" /> Starts at AED {option.features.cancellationFee}</>
                  )}
                </div>
                {/* Date Change fee */}
                <div className="flex items-center gap-2 px-5 text-sm" style={{ gridColumn: colIdx + 2, gridRow: 4 }}>
                  {option.features.dateChange ? (
                    <><Check className="inline h-4 w-4 text-green-600" /> Free date change for AED {option.features.dateChangeFee}</>
                  ) : (
                    <><Cross className="inline h-4 w-4 text-gray-400" /> Paid date change</>
                  )}
                </div>
                {/* Seat selection */}
                <div className="flex items-center gap-2 px-5 text-sm" style={{ gridColumn: colIdx + 2, gridRow: 5 }}>
                  {option.features.seatSelection ? (
                    <><Check className="inline h-4 w-4 text-green-600" /> Free seat selection</>
                  ) : (
                    <><Cross className="inline h-4 w-4 text-gray-400" /> Paid seat</>
                  )}
                </div>
                {/* Meal selection */}
                <div className="flex items-center gap-2 px-5 text-sm" style={{ gridColumn: colIdx + 2, gridRow: 6 }}>
                  {option.features.mealSelection ? (
                    <><Check className="inline h-4 w-4 text-green-600" /> Free meal</>
                  ) : (
                    <><Cross className="inline h-4 w-4 text-gray-400" /> Paid meal</>
                  )}
                </div>
                {/* Promo and select button (immediately after features) */}
                <div className="px-5 pb-5" style={{ gridColumn: colIdx + 2, gridRow: 7 }}>
                  <div className="text-xs text-green-700 bg-green-50 rounded px-2 py-1 mb-2 font-medium">
                    {option.promo}
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary-hover hover:text-[#194E91] w-full py-3 rounded-lg font-semibold text-lg mt-2" onClick={() => onFareSelected({ ...trip, selectedFare: option })}>
                    Select
                  </Button>
                </div>
              </React.Fragment>
            ))}
          </div>
          {filteredOptions.length === 0 && (
            <div className="text-gray-400 text-sm mt-4">No fares match the selected filters.</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FareSelectionModal; 