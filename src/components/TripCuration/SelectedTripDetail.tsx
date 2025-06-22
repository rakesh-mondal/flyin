import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';
import FlightMap from './FlightMap';
import FlightInsights from './FlightInsights';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import { formatNumber } from '@/lib/utils';

interface SelectedTripDetailProps {
  trip: any;
  insights?: any[];
  onProceedToBook: () => void;
  onBack?: () => void;
  isMobile?: boolean;
}

export default function SelectedTripDetail({ 
  trip, 
  insights = [],
  onProceedToBook, 
  onBack,
  isMobile = false 
}: SelectedTripDetailProps) {
  const { language, isRTL } = useLanguage();
  const t = (key: string) => translations[language][key] || key;
  const isArabic = language === 'ar';
  
  // Helper functions for translation
  const translateAirline = (airlineName: string) => {
    const airlineTranslations = {
      'Emirates': t('emirates') || 'طيران الإمارات',
      'Qatar Airways': t('qatarAirways') || 'الخطوط الجوية القطرية',
      'Etihad Airways': t('etihadAirways') || 'طيران الاتحاد',
      'Etihad': t('etihadAirways') || 'طيران الاتحاد',
      'Turkish Airlines': t('turkishAirlines') || 'الخطوط الجوية التركية',
      'Lufthansa': t('lufthansa') || 'لوفتهانزا',
      'British Airways': t('britishAirways') || 'الخطوط الجوية البريطانية',
      'Air France': t('airFrance') || 'الخطوط الجوية الفرنسية',
      'KLM': t('klm') || 'كيه إل إم',
      'Swiss': t('swiss') || 'سويس',
      'Austrian Airlines': t('austrianAirlines') || 'الخطوط الجوية النمساوية'
    };
    return airlineTranslations[airlineName] || airlineName;
  };

  const translateCity = (cityName: string) => {
    const cityTranslations = {
      'New York': t('newYork') || 'نيويورك',
      'Dubai': t('dubai') || 'دبي',
      'London': t('london') || 'لندن',
      'Paris': t('paris') || 'باريس',
      'Mumbai': t('mumbai') || 'مومباي'
    };
    return cityTranslations[cityName] || cityName;
  };

  const translateAirportCode = (code: string) => {
    const airportTranslations = {
      'DXB': t('dxbAirport') || 'دبي',
      'JFK': t('jfkAirport') || 'جون كينيدي',
      'LHR': t('lhrAirport') || 'هيثرو',
      'CDG': t('cdgAirport') || 'شارل ديغول',
      'BOM': t('bomAirport') || 'مومباي'
    };
    return airportTranslations[code] || code;
  };

  const formatTime = (time: string) => formatNumber(time, isArabic);
  
  if (!trip) return null;

  return (
    <div className="flex flex-col h-full overflow-hidden rounded-xl bg-white">
      {/* Mobile back button */}
      {isMobile && onBack && (
        <div className="p-4 border-b border-gray-200">
          <Button 
            variant="ghost" 
            onClick={onBack} 
            className="flex items-center text-gray-700"
            size="sm"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t('backToFlightOptions')}
          </Button>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Left column */}
        <div className="flex-1 p-6">
          {/* Trip Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold">{trip.title || `Trip to ${trip.arrivalCity}`}</h2>
            <p className="text-gray-500 flex items-center mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              {trip.dates || 'Dates not specified'}
            </p>
          </div>
          
          {/* AI Flight Insights */}
          {insights && insights.length > 0 && (
            <div className="mb-6">
              <FlightInsights insights={insights} />
            </div>
          )}
          
          {/* Flight Map */}
          <div className="mb-6 aspect-[16/9] w-full overflow-hidden rounded-lg">
            <FlightMap 
              departureCity={trip.departureCity} 
              departureCode={trip.departureCode}
              arrivalCity={trip.arrivalCity}
              arrivalCode={trip.arrivalCode}
            />
          </div>

          {/* Flight Details */}
          <div className="space-y-6">
            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="mb-3 text-lg font-medium">{t('outboundFlight')}</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">{translateCity(trip.departureCity)}</span> ({translateAirportCode(trip.departureCode)}) →{' '}
                  <span className="font-medium">{translateCity(trip.arrivalCity)}</span> ({translateAirportCode(trip.arrivalCode)})
                </p>
                <p className="text-sm text-gray-500">
                  {formatTime(trip.departureTime)} - {formatTime(trip.arrivalTime)} • {formatTime(trip.duration)}
                </p>
                <p className="text-sm text-gray-500">{translateAirline(trip.airline)}</p>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="mb-3 text-lg font-medium">{t('returnFlight')}</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">{translateCity(trip.arrivalCity)}</span> ({translateAirportCode(trip.arrivalCode)}) →{' '}
                  <span className="font-medium">{translateCity(trip.departureCity)}</span> ({translateAirportCode(trip.departureCode)})
                </p>
                <p className="text-sm text-gray-500">
                  {formatTime(trip.returnDepartureTime)} - {formatTime(trip.returnArrivalTime)} • {formatTime(trip.duration)}
                </p>
                <p className="text-sm text-gray-500">{translateAirline(trip.airline)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Booking summary */}
        <div className="w-full border-t lg:w-80 lg:border-l lg:border-t-0 border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">{t('priceSummary')}</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>{t('baseFare')}</span>
                <span>₹{formatNumber(trip.baseFare, isArabic)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t('taxesAndFees')}</span>
                <span>₹{formatNumber(trip.taxes, isArabic)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium pt-3 border-t border-gray-200">
                <span>{t('totalPerPerson')}</span>
                <span>₹{formatNumber(trip.price, isArabic)}</span>
              </div>
            </div>

            <Button
              onClick={onProceedToBook}
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600"
            >
              {t('proceedToBook')}
            </Button>

            <p className="mt-4 text-xs text-center text-gray-500">
              {t('termsAndConditions')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
