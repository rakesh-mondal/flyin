import React, { useState, useEffect } from 'react';
import { Calendar, PlaneTakeoff, Hotel, DollarSign, Info, ChevronDown, Bell, Plane, Luggage, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import FlightTimings from './FlightTimings';
import PriceAlertsModal from './PriceAlertsModal';
import { cn, formatNumber } from '@/lib/utils';
import { useTranslation } from '@/translations';
import { useLanguage } from '@/hooks/useLanguage';
import './FilterChips.css';

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
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [isPriceAlertsModalOpen, setIsPriceAlertsModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 4873, max: 62000 });
  const [stopoverDuration, setStopoverDuration] = useState({ min: 30, max: 1290 });
  const [totalDuration, setTotalDuration] = useState(1650);

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

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const hoursStr = formatNumber(hours, isArabic);
    const minsStr = formatNumber(mins, isArabic);
    return `${hoursStr}h ${minsStr}m`;
  };

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
          <span className="text-sm font-semibold text-gray-900">{t('getPriceAlerts')}</span>
        </button>
      </div>

      {/* Header with flight count */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-base">
            <span className="font-semibold text-gray-900">{formatNumber(1577, isArabic)}</span>
            <span className="text-gray-500"> {t('of')} </span>
            <span className="font-semibold text-gray-900">{formatNumber(2000, isArabic)}</span>
            <span className="text-gray-500"> {t('flightsCount')}</span>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="border-b border-gray-200">
        <div className="w-full px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-sm font-semibold text-gray-900">{t('recommended')}</h3>
          </div>
        </div>
        <div className="px-4 pb-3">
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
              />
              <Plane className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">{t('nonstop')}</span>
            </label>
            
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
              />
              <Luggage className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">{t('checkedBaggageIncluded')}</span>
            </label>
            
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
              />
              <Tag className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">{t('hideBudgetAirlines')}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Stops Section */}
      <div className="border-b border-gray-200">
        <div className="w-full px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-sm font-semibold text-gray-900">{t('stops')}</h3>
          </div>
          <button 
            className="text-xs font-medium text-primary hover:text-[#194E91]"
            onClick={() => {
              onStopsChange([]);
              toast.success("Stops filter reset");
            }}
          >
            {t('reset')}
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
              <span className="text-sm font-medium">{t('direct')}</span>
              <span className={cn(
                "text-xs mt-0.5",
                selectedStops.includes('non-stop') ? "text-blue-600" : "text-gray-500"
                              )}>₹{formatNumber('26,909', isArabic)}</span>
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
              <span className="text-sm font-medium">1 {t('stop')}</span>
              <span className={cn(
                "text-xs mt-0.5",
                selectedStops.includes('1-stop') ? "text-blue-600" : "text-gray-500"
                              )}>₹{formatNumber('27,464', isArabic)}</span>
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
              <span className="text-sm font-medium">2+ {t('stops')}</span>
              <span className={cn(
                "text-xs mt-0.5",
                selectedStops.includes('2-more') ? "text-blue-600" : "text-gray-500"
                              )}>₹{formatNumber('39,393', isArabic)}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Flight Timings Section */}
      <div className="border-b border-gray-200">
        <div className="w-full px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-sm font-semibold text-gray-900">{t('flightTimings')}</h3>
          </div>
          <button 
            className="text-xs font-medium text-primary hover:text-[#194E91]"
            onClick={() => {
              if (typeof onDepartureTimeChange === 'function') onDepartureTimeChange('');
              if (typeof onReturnTimeChange === 'function') onReturnTimeChange('');
            }}
          >
            {t('reset')}
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
      <div className="border-b border-gray-200">
        <div className="w-full px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-sm font-semibold text-gray-900">{t('airlines')}</h3>
          </div>
          <button 
            className="text-xs font-medium text-primary hover:text-[#194E91]"
            onClick={() => {
              onAirlinesChange([]);
              toast.success("Airlines filter reset");
            }}
          >
            {t('reset')}
          </button>
        </div>
        <div className="px-4 pb-3">
          <div className="space-y-2">
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
                <span className="ml-2 text-sm text-gray-700">{t('showMultiAirlineItineraries')}</span>
              </div>
            </label>

            <div className="space-y-2">
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
                        {t('emirates')}
                        <span className="ml-1 text-xs text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{t('only')}</span>
                      </span>
                    </div>
                                            <span className="text-xs text-gray-500">₹{formatNumber('52,000', isArabic)}</span>
                  </div>
                </div>
              </label>

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
                        {t('airIndia')}
                        <span className="ml-1 text-xs text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{t('only')}</span>
                      </span>
                    </div>
                                            <span className="text-xs text-gray-500">₹{formatNumber('48,500', isArabic)}</span>
                  </div>
                </div>
              </label>

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
                        src="https://airhex.com/images/airline-logos/etihad.png"
                        alt="Etihad"
                        className="h-4 w-6 object-contain"
                      />
                      <span className="text-sm text-gray-700 relative">
                        {t('etihad')}
                        <span className="ml-1 text-xs text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{t('only')}</span>
                      </span>
                    </div>
                                            <span className="text-xs text-gray-500">₹{formatNumber('45,200', isArabic)}</span>
                  </div>
                </div>
              </label>

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
                        {t('vistara')}
                        <span className="ml-1 text-xs text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{t('only')}</span>
                      </span>
                    </div>
                                            <span className="text-xs text-gray-500">₹{formatNumber('39,800', isArabic)}</span>
                  </div>
                </div>
              </label>

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
                        {t('qatarAirways')}
                        <span className="ml-1 text-xs text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{t('only')}</span>
                      </span>
                    </div>
                                            <span className="text-xs text-gray-500">₹{formatNumber('55,000', isArabic)}</span>
                  </div>
                </div>
              </label>

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
                        {t('lufthansa')}
                        <span className="ml-1 text-xs text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{t('only')}</span>
                      </span>
                    </div>
                                            <span className="text-xs text-gray-500">₹{formatNumber('61,000', isArabic)}</span>
                  </div>
                </div>
              </label>

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
                        {t('singaporeAirlines')}
                        <span className="ml-1 text-xs text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{t('only')}</span>
                      </span>
                    </div>
                                            <span className="text-xs text-gray-500">₹{formatNumber('58,500', isArabic)}</span>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Price Section */}
      <div className="border-b border-gray-200">
        <div className="w-full px-4 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">{t('price')}</h3>
            <div className="text-xs font-medium" style={{ color: '#194E91' }}>
              ₹{priceRange.min.toLocaleString()} - ₹{priceRange.max.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="px-4 pb-3">
          <div className="space-y-3">
            <div className="relative h-2">
              <div className="absolute top-1/2 w-full h-2 bg-gray-200 rounded-lg transform -translate-y-1/2"></div>
              <div 
                className="absolute top-1/2 h-2 rounded-lg transform -translate-y-1/2"
                style={{
                  backgroundColor: '#194E91',
                  left: `${((priceRange.min - 4873) / (62000 - 4873)) * 100}%`,
                  width: `${((priceRange.max - priceRange.min) / (62000 - 4873)) * 100}%`
                }}
              ></div>
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
            </div>
            <div className="flex justify-between text-sm text-gray-500">
                              <span>₹ {formatNumber('4,873', isArabic)}</span>
                <span>₹ {formatNumber('62,000', isArabic)}</span>
            </div>
          </div>
        </div>
      </div>
        
      {/* Airports Section */}
      <div className="border-b border-gray-200">
        <div className="w-full px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-sm font-semibold text-gray-900">{t('airports')}</h3>
          </div>
          <button 
            className="text-xs font-medium text-primary hover:text-[#194E91]"
            onClick={() => {
              toast.success("Airports filter reset");
            }}
          >
            {t('reset')}
          </button>
        </div>
        <div className="px-4 pb-3">
          <div className="space-y-4">
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
              />
              <span className="text-sm text-gray-700">{t('returnFlightArrivesAtDeparture')}</span>
            </label>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">{t('arrivingIn')} Dubai</h4>
              <div className="space-y-2">
                <label className="flex items-center w-full cursor-pointer group">
                  <div className="flex items-center flex-1">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-2 flex items-center justify-between flex-1">
                      <span className="text-sm text-gray-700">{t('shjSharjahInternational')}</span>
                      <span className="text-xs text-gray-500">₹ {formatNumber('25,013', isArabic)}</span>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center w-full cursor-pointer group">
                  <div className="flex items-center flex-1">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-2 flex items-center justify-between flex-1">
                      <span className="text-sm text-gray-700">{t('auhZayedInternational')}</span>
                      <span className="text-xs text-gray-500">₹ {formatNumber('22,921', isArabic)}</span>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center w-full cursor-pointer group">
                  <div className="flex items-center flex-1">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-2 flex items-center justify-between flex-1">
                      <span className="text-sm text-gray-700">{t('dubaiEtihadBusStation')}</span>
                      <span className="text-xs text-gray-500">₹ {formatNumber('34,921', isArabic)}</span>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center w-full cursor-pointer group">
                  <div className="flex items-center flex-1">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-2 flex items-center justify-between flex-1">
                      <span className="text-sm text-gray-700">{t('dubaiEmiratesBusStation')}</span>
                      <span className="text-xs text-gray-500">₹ {formatNumber('38,425', isArabic)}</span>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center w-full cursor-pointer group">
                  <div className="flex items-center flex-1">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-2 flex items-center justify-between flex-1">
                      <span className="text-sm text-gray-700">{t('dxbInternational')}</span>
                      <span className="text-xs text-gray-500">₹ {formatNumber('42,153', isArabic)}</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Duration Section */}
      <div className="border-b border-gray-200">
        <div className="w-full px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-sm font-semibold text-gray-900">{t('duration')}</h3>
          </div>
          <button 
            className="text-xs font-medium text-primary hover:text-[#194E91]"
            onClick={() => {
              setStopoverDuration({ min: 30, max: 1290 });
              setTotalDuration(1650);
              toast.success("Duration filter reset");
            }}
          >
            {t('reset')}
          </button>
        </div>
        <div className="px-4 pb-3">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">{t('stopoverDuration')}</span>
                <span className="text-xs font-medium" style={{ color: '#194E91' }}>
                  {formatDuration(stopoverDuration.min)} - {formatDuration(stopoverDuration.max)}
                </span>
              </div>
              <div className="relative h-2">
                <div className="absolute top-1/2 w-full h-2 bg-gray-200 rounded-lg transform -translate-y-1/2"></div>
                <div 
                  className="absolute top-1/2 h-2 rounded-lg transform -translate-y-1/2"
                  style={{
                    backgroundColor: '#194E91',
                    left: `${((stopoverDuration.min - 30) / (1290 - 30)) * 100}%`,
                    width: `${((stopoverDuration.max - stopoverDuration.min) / (1290 - 30)) * 100}%`
                  }}
                ></div>
                <input
                  type="range"
                  min="30"
                  max="1290"
                  value={stopoverDuration.min}
                  onChange={(e) => {
                    const newMin = Math.min(Number(e.target.value), stopoverDuration.max - 30);
                    setStopoverDuration(prev => ({ ...prev, min: newMin }));
                  }}
                  className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer stopover-slider-min"
                />
                <input
                  type="range"
                  min="30"
                  max="1290"
                  value={stopoverDuration.max}
                  onChange={(e) => {
                    const newMax = Math.max(Number(e.target.value), stopoverDuration.min + 30);
                    setStopoverDuration(prev => ({ ...prev, max: newMax }));
                  }}
                  className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer stopover-slider-max"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{formatNumber('0', isArabic)}h {formatNumber('30', isArabic)}m</span>
                <span>{formatNumber('21', isArabic)}h {formatNumber('30', isArabic)}m</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">{t('totalDuration')}</span>
                <span className="text-xs font-medium" style={{ color: '#194E91' }}>
                  &lt; {formatDuration(totalDuration)}
                </span>
              </div>
              <div className="relative h-2">
                <div className="absolute top-1/2 w-full h-2 bg-gray-200 rounded-lg transform -translate-y-1/2"></div>
                <div 
                  className="absolute top-1/2 h-2 rounded-lg transform -translate-y-1/2"
                  style={{
                    backgroundColor: '#194E91',
                    left: '0%',
                    width: `${((totalDuration - 180) / (1650 - 180)) * 100}%`
                  }}
                ></div>
                <input
                  type="range"
                  min="180"
                  max="1650"
                  value={totalDuration}
                  onChange={(e) => setTotalDuration(Number(e.target.value))}
                  className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer total-duration-slider"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{formatNumber('3', isArabic)}h {formatNumber('0', isArabic)}m</span>
                <span>{formatNumber('27', isArabic)}h {formatNumber('30', isArabic)}m</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Aircrafts Section */}
      <div className="border-b border-gray-200">
        <div className="w-full px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-sm font-semibold text-gray-900">{t('aircrafts')}</h3>
          </div>
          <button 
            className="text-xs font-medium text-primary hover:text-[#194E91]"
            onClick={() => {
              toast.success("Aircrafts filter reset");
            }}
          >
            {t('reset')}
          </button>
        </div>
        <div className="px-4 pb-3">
          <div className="space-y-2">
            <label className="flex items-center w-full cursor-pointer group">
              <div className="flex items-center flex-1">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="ml-2 flex items-center justify-between flex-1">
                  <span className="text-sm text-gray-700">{t('largeAircraft')}</span>
                  <span className="text-xs text-gray-500">₹ {formatNumber('24,853', isArabic)}</span>
                </div>
              </div>
            </label>
            
            <label className="flex items-center w-full cursor-pointer group">
              <div className="flex items-center flex-1">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="ml-2 flex items-center justify-between flex-1">
                  <span className="text-sm text-gray-700">{t('midsizeAircraft')}</span>
                  <span className="text-xs text-gray-500">₹ {formatNumber('22,921', isArabic)}</span>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <PriceAlertsModal 
        isOpen={isPriceAlertsModalOpen}
        onClose={() => setIsPriceAlertsModalOpen(false)}
      />
    </div>
  );
};

export default FilterChips; 