import React, { useState, useEffect } from 'react';
import { Calendar, PlaneTakeoff, Hotel, DollarSign, Info, ChevronDown, Bell, Plane, Luggage, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import FlightTimings from './FlightTimings';
import PriceAlertsModal from './PriceAlertsModal';
import { cn } from '@/lib/utils';

interface FilterChipsProps {
  selectedAirlines: string[];
  onAirlinesChange: (airlines: string[]) => void;
  onDepartureTimeChange?: (time: string) => void;
  onReturnTimeChange?: (time: string) => void;
  departureRoute?: string;
  returnRoute?: string;
  selectedStops?: string[];
  onStopsChange?: (stops: string[]) => void;
}

const FilterChips = ({
  selectedAirlines = [],
  onAirlinesChange = () => {
    console.warn('FilterChips: onAirlinesChange prop is missing!');
  },
  onDepartureTimeChange,
  onReturnTimeChange,
  departureRoute,
  returnRoute,
  selectedStops = [],
  onStopsChange = () => {},
}: FilterChipsProps) => {
  const [isPriceAlertsModalOpen, setIsPriceAlertsModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 4873, max: 62000 });

  useEffect(() => {
    if (!selectedAirlines || selectedAirlines.length === 0) {
      onAirlinesChange(['emirates', 'air-india', 'etihad', 'vistara', 'qatar', 'lufthansa', 'singapore']);
    }
  }, []);

  const handleRemoveAirline = (airline: string) => {
    onAirlinesChange(selectedAirlines.filter(a => a !== airline));
  };

  const handleStopSelect = (stop: 'non-stop' | '1-stop' | '2-more') => {
    if (selectedStops.includes(stop)) {
      onStopsChange(selectedStops.filter(s => s !== stop));
      toast.success(`${stop} filter removed`);
    } else {
      onStopsChange([...selectedStops, stop]);
      toast.success(`${stop} filter applied`);
    }
  };

  try {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
        {/* Get Price Alerts */}
        <div className="px-4 py-3 border-b border-gray-200">
          <button 
            className="flex items-center gap-2 w-full text-left bg-blue-50 hover:bg-blue-100 rounded-lg p-2 transition-colors"
            onClick={() => {
              setIsPriceAlertsModalOpen(true);
            }}
          >
            <Bell className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-900">Get Price Alerts</span>
          </button>
        </div>
        {/* Header with flight count */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-base">
              <span className="font-semibold text-gray-900">1577</span>
              <span className="text-gray-500"> of </span>
              <span className="font-semibold text-gray-900">2000</span>
              <span className="text-gray-500"> flights</span>
            </div>
          </div>
        </div>
        {/* Recommended Section */}
        <div className="border-b border-gray-200">
          <div className="w-full px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <h3 className="text-sm font-semibold text-gray-900">Recommended</h3>
            </div>
          </div>
          <div className="px-4 pb-3">
            <div className="space-y-3">
              {/* Nonstop */}
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                />
                <Plane className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">Nonstop</span>
              </label>
              
              {/* Checked baggage included */}
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                />
                <Luggage className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">Checked baggage included</span>
              </label>
              
              {/* Hide budget airlines */}
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                />
                <Tag className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">Hide budget airlines</span>
              </label>
            </div>
          </div>
        </div>
        {/* Stops Section */}
        <div className="border-b border-gray-200">
          <div className="w-full px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <h3 className="text-sm font-semibold text-gray-900">Stops</h3>
            </div>
            <button 
              className="text-xs font-medium text-primary hover:text-[#194E91]"
              onClick={() => {
                onStopsChange([]);
                toast.success("Stops filter reset");
              }}
            >
              Reset
            </button>
          </div>
          <div className="px-4 pb-3">
            <div className="grid grid-cols-3 gap-1">
              <button 
                className={cn(
                  "flex flex-col items-center py-2 px-2 border transition-all rounded-md",
                  selectedStops.includes('non-stop')
                    ? "border-blue-500 bg-blue-50 text-blue-600 font-semibold"
                    : "border-gray-200 bg-white text-gray-900"
                )}
                onClick={() => handleStopSelect('non-stop')}
              >
                <span className="text-sm font-medium">Direct</span>
                <span className={cn(
                  "text-xs mt-0.5",
                  selectedStops.includes('non-stop') ? "text-blue-600" : "text-gray-500"
                )}>₹26,909</span>
              </button>
              <button 
                className={cn(
                  "flex flex-col items-center py-2 px-2 border transition-all rounded-md",
                  selectedStops.includes('1-stop')
                    ? "border-blue-500 bg-blue-50 text-blue-600 font-semibold"
                    : "border-gray-200 bg-white text-gray-900"
                )}
                onClick={() => handleStopSelect('1-stop')}
              >
                <span className="text-sm font-medium">1 stop</span>
                <span className={cn(
                  "text-xs mt-0.5",
                  selectedStops.includes('1-stop') ? "text-blue-600" : "text-gray-500"
                )}>₹27,464</span>
              </button>
              <button 
                className={cn(
                  "flex flex-col items-center py-2 px-2 border transition-all rounded-md",
                  selectedStops.includes('2-more')
                    ? "border-blue-500 bg-blue-50 text-blue-600 font-semibold"
                    : "border-gray-200 bg-white text-gray-900"
                )}
                onClick={() => handleStopSelect('2-more')}
              >
                <span className="text-sm font-medium">2+ stops</span>
                <span className={cn(
                  "text-xs mt-0.5",
                  selectedStops.includes('2-more') ? "text-blue-600" : "text-gray-500"
                )}>₹39,393</span>
              </button>
            </div>
          </div>
        </div>
        {/* Flight Timings Section */}
        <div className="border-b border-gray-200">
          <div className="w-full px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <h3 className="text-sm font-semibold text-gray-900">Flight Timings</h3>
            </div>
            <button 
              className="text-xs font-medium text-primary hover:text-[#194E91]"
              onClick={() => {
                if (typeof onDepartureTimeChange === 'function') onDepartureTimeChange('');
                if (typeof onReturnTimeChange === 'function') onReturnTimeChange('');
              }}
            >
              Reset
            </button>
          </div>
          <div className="px-4 pb-3">
            <FlightTimings
              departureRoute={departureRoute}
              returnRoute={returnRoute}
              onDepartureTimeChange={onDepartureTimeChange}
              onReturnTimeChange={onReturnTimeChange}
            />
          </div>
        </div>
        {/* Airlines Section */}
        <div>
          <div className="w-full px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <h3 className="text-sm font-semibold text-gray-900">Airlines</h3>
            </div>
            <button 
              className="text-xs font-medium text-primary hover:text-[#194E91]"
              onClick={() => {
                onAirlinesChange([]);
                toast.success("Airlines filter reset");
              }}
            >
              Reset
            </button>
          </div>
          <div className="px-4 pb-3">
            <div className="space-y-2">
              {/* Multi-airline option */}
              <label className="flex items-center w-full cursor-pointer group">
                <div className="flex items-center flex-1">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedAirlines.includes('multi')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onAirlinesChange([...selectedAirlines, 'multi']);
                      } else {
                        onAirlinesChange(selectedAirlines.filter(a => a !== 'multi'));
                      }
                    }}
                  />
                  <span className="ml-2 text-sm text-gray-700">Show multi-airline itineraries</span>
                </div>
              </label>
              {/* Airlines list */}
              <div className="space-y-2">
                {/* Emirates */}
                <label className="flex items-center w-full cursor-pointer group">
                  <div className="flex items-center flex-1">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedAirlines.includes('emirates')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onAirlinesChange([...selectedAirlines, 'emirates']);
                        } else {
                          onAirlinesChange(selectedAirlines.filter(a => a !== 'emirates'));
                        }
                      }}
                    />
                    <div className="ml-2 flex items-center justify-between flex-1">
                      <div className="flex items-center gap-2">
                        <img 
                          src="https://airhex.com/images/airline-logos/emirates.png"
                          alt="Emirates"
                          className="h-4 w-6 object-contain"
                        />
                        <span className="text-sm text-gray-700 relative">
                          Emirates
                          <span className="ml-1 text-xs text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Only</span>
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">₹65,909</span>
                    </div>
                  </div>
                </label>
                {/* Air India */}
                <label className="flex items-center w-full cursor-pointer group">
                  <div className="flex items-center flex-1">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedAirlines.includes('air-india')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onAirlinesChange([...selectedAirlines, 'air-india']);
                        } else {
                          onAirlinesChange(selectedAirlines.filter(a => a !== 'air-india'));
                        }
                      }}
                    />
                    <div className="ml-2 flex items-center justify-between flex-1">
                      <div className="flex items-center gap-2">
                        <img 
                          src="https://airhex.com/images/airline-logos/air-india.png"
                          alt="Air India"
                          className="h-4 w-6 object-contain"
                        />
                        <span className="text-sm text-gray-700 relative">
                          Air India
                          <span className="ml-1 text-xs text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Only</span>
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">₹59,035</span>
                    </div>
                  </div>
                </label>
                {/* Etihad Airways */}
                <label className="flex items-center w-full cursor-pointer group">
                  <div className="flex items-center flex-1">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedAirlines.includes('etihad')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onAirlinesChange([...selectedAirlines, 'etihad']);
                        } else {
                          onAirlinesChange(selectedAirlines.filter(a => a !== 'etihad'));
                        }
                      }}
                    />
                    <div className="ml-2 flex items-center justify-between flex-1">
                      <div className="flex items-center gap-2">
                        <img 
                          src="https://airhex.com/images/airline-logos/etihad-airways.png"
                          alt="Etihad Airways"
                          className="h-4 w-6 object-contain"
                        />
                        <span className="text-sm text-gray-700 relative">
                          Etihad Airways
                          <span className="ml-1 text-xs text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Only</span>
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">₹45,717</span>
                    </div>
                  </div>
                </label>
                {/* Vistara */}
                <label className="flex items-center w-full cursor-pointer group">
                  <div className="flex items-center flex-1">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedAirlines.includes('vistara')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onAirlinesChange([...selectedAirlines, 'vistara']);
                        } else {
                          onAirlinesChange(selectedAirlines.filter(a => a !== 'vistara'));
                        }
                      }}
                    />
                    <div className="ml-2 flex items-center justify-between flex-1">
                      <div className="flex items-center gap-2">
                        <img 
                          src="https://airhex.com/images/airline-logos/vistara.png"
                          alt="Vistara"
                          className="h-4 w-6 object-contain"
                        />
                        <span className="text-sm text-gray-700 relative">
                          Vistara
                          <span className="ml-1 text-xs text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Only</span>
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">₹48,200</span>
                    </div>
                  </div>
                </label>
                {/* Qatar Airways */}
                <label className="flex items-center w-full cursor-pointer group">
                  <div className="flex items-center flex-1">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedAirlines.includes('qatar')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onAirlinesChange([...selectedAirlines, 'qatar']);
                        } else {
                          onAirlinesChange(selectedAirlines.filter(a => a !== 'qatar'));
                        }
                      }}
                    />
                    <div className="ml-2 flex items-center justify-between flex-1">
                      <div className="flex items-center gap-2">
                        <img 
                          src="https://airhex.com/images/airline-logos/qatar-airways.png"
                          alt="Qatar Airways"
                          className="h-4 w-6 object-contain"
                        />
                        <span className="text-sm text-gray-700 relative">
                          Qatar Airways
                          <span className="ml-1 text-xs text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Only</span>
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">₹52,800</span>
                    </div>
                  </div>
                </label>
                {/* Lufthansa */}
                <label className="flex items-center w-full cursor-pointer group">
                  <div className="flex items-center flex-1">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedAirlines.includes('lufthansa')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onAirlinesChange([...selectedAirlines, 'lufthansa']);
                        } else {
                          onAirlinesChange(selectedAirlines.filter(a => a !== 'lufthansa'));
                        }
                      }}
                    />
                    <div className="ml-2 flex items-center justify-between flex-1">
                      <div className="flex items-center gap-2">
                        <img 
                          src="https://airhex.com/images/airline-logos/lufthansa.png"
                          alt="Lufthansa"
                          className="h-4 w-6 object-contain"
                        />
                        <span className="text-sm text-gray-700 relative">
                          Lufthansa
                          <span className="ml-1 text-xs text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Only</span>
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">₹61,000</span>
                    </div>
                  </div>
                </label>
                {/* Singapore Airlines */}
                <label className="flex items-center w-full cursor-pointer group">
                  <div className="flex items-center flex-1">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedAirlines.includes('singapore')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onAirlinesChange([...selectedAirlines, 'singapore']);
                        } else {
                          onAirlinesChange(selectedAirlines.filter(a => a !== 'singapore'));
                        }
                      }}
                    />
                    <div className="ml-2 flex items-center justify-between flex-1">
                      <div className="flex items-center gap-2">
                        <img 
                          src="https://airhex.com/images/airline-logos/singapore-airlines.png"
                          alt="Singapore Airlines"
                          className="h-4 w-6 object-contain"
                        />
                        <span className="text-sm text-gray-700 relative">
                          Singapore Airlines
                          <span className="ml-1 text-xs text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Only</span>
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">₹58,500</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div>
          <div className="w-full px-4 py-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Price</h3>
              <div className="text-xs font-medium" style={{ color: '#194E91' }}>
                ₹{priceRange.min.toLocaleString()} - ₹{priceRange.max.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="px-4 pb-3">
            <div className="space-y-3">
              {/* Dual Range Slider */}
              <div className="relative h-2">
                {/* Background track */}
                <div className="absolute top-1/2 w-full h-2 bg-gray-200 rounded-lg transform -translate-y-1/2"></div>
                
                {/* Active track */}
                <div 
                  className="absolute top-1/2 h-2 rounded-lg transform -translate-y-1/2"
                  style={{
                    backgroundColor: '#194E91',
                    left: `${((priceRange.min - 4873) / (62000 - 4873)) * 100}%`,
                    width: `${((priceRange.max - priceRange.min) / (62000 - 4873)) * 100}%`
                  }}
                ></div>
                
                {/* Min thumb */}
                <input
                  type="range"
                  min="4873"
                  max="62000"
                  value={priceRange.min}
                  onChange={(e) => {
                    const newMin = Math.min(Number(e.target.value), priceRange.max - 1000);
                    setPriceRange(prev => ({ ...prev, min: newMin }));
                  }}
                  className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer range-slider-min"
                />
                
                {/* Max thumb */}
                <input
                  type="range"
                  min="4873"
                  max="62000"
                  value={priceRange.max}
                  onChange={(e) => {
                    const newMax = Math.max(Number(e.target.value), priceRange.min + 1000);
                    setPriceRange(prev => ({ ...prev, max: newMax }));
                  }}
                  className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer range-slider-max"
                />
                
                <style dangerouslySetInnerHTML={{
                  __html: `
                    .range-slider-min, .range-slider-max {
                      -webkit-appearance: none;
                      appearance: none;
                      background: transparent;
                      cursor: pointer;
                      pointer-events: none;
                    }
                    .range-slider-min::-webkit-slider-thumb, .range-slider-max::-webkit-slider-thumb {
                      -webkit-appearance: none;
                      appearance: none;
                      height: 20px;
                      width: 20px;
                      border-radius: 50%;
                      background: #194E91;
                      cursor: pointer;
                      border: 2px solid #ffffff;
                      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                      pointer-events: auto;
                      position: relative;
                      z-index: 10;
                    }
                    .range-slider-min::-moz-range-thumb, .range-slider-max::-moz-range-thumb {
                      height: 20px;
                      width: 20px;
                      border-radius: 50%;
                      background: #194E91;
                      cursor: pointer;
                      border: 2px solid #ffffff;
                      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                      border: none;
                      pointer-events: auto;
                      z-index: 10;
                    }
                    .range-slider-min::-webkit-slider-thumb {
                      z-index: 1;
                    }
                    .range-slider-max::-webkit-slider-thumb {
                      z-index: 2;
                    }
                  `
                }} />
              </div>
              
              {/* Min/Max Labels */}
              <div className="flex justify-between text-sm text-gray-500">
                <span>₹ 4,873</span>
                <span>₹ 62,000</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Price Alerts Modal */}
        <PriceAlertsModal
          isOpen={isPriceAlertsModalOpen}
          onClose={() => setIsPriceAlertsModalOpen(false)}
        />
      </div>
    );
  } catch (err) {
    return (
      <div style={{ background: 'red', color: 'white', padding: 20 }}>
        Error rendering FilterChips: {err && err.toString()}
      </div>
    );
  }
};

export default FilterChips;
