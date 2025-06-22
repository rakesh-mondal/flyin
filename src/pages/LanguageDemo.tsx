import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useTranslation } from '../translations';
import TopHeader from '../components/TripCuration/TopHeader';
import { Button } from '../components/ui/button';

export default function LanguageDemo() {
  const { language, changeLanguage, isRTL } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <TopHeader />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            Arabic Language Demo - {language === 'ar' ? 'عرض اللغة العربية' : 'Language Demo'}
          </h1>
          
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4">Current Language Settings</h2>
            <div className="space-y-2">
              <p><strong>Language:</strong> {language}</p>
              <p><strong>Is RTL:</strong> {isRTL ? 'Yes' : 'No'}</p>
              <p><strong>Direction:</strong> {document.documentElement.dir}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4">Translation Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Navigation</h3>
                <ul className="space-y-1 text-sm">
                  <li>Flights: {t('flights')}</li>
                  <li>Hotels: {t('hotels')}</li>
                  <li>Deals: {t('deals')}</li>
                  <li>Sign In: {t('signIn')}</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Search</h3>
                <ul className="space-y-1 text-sm">
                  <li>From: {t('from')}</li>
                  <li>To: {t('to')}</li>
                  <li>Departure: {t('departure')}</li>
                  <li>Return: {t('return')}</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Common</h3>
                <ul className="space-y-1 text-sm">
                  <li>Loading: {t('loading')}</li>
                  <li>Cancel: {t('cancel')}</li>
                  <li>Confirm: {t('confirm')}</li>
                  <li>Save: {t('save')}</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Booking</h3>
                <ul className="space-y-1 text-sm">
                  <li>Book Now: {t('bookNow')}</li>
                  <li>First Name: {t('firstName')}</li>
                  <li>Email: {t('email')}</li>
                  <li>Phone: {t('phone')}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Test Layout Changes</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button 
                  onClick={() => changeLanguage('en')}
                  variant={language === 'en' ? 'default' : 'outline'}
                >
                  Switch to English
                </Button>
                <Button 
                  onClick={() => changeLanguage('ar')}
                  variant={language === 'ar' ? 'default' : 'outline'}
                >
                  Switch to Arabic - تبديل إلى العربية
                </Button>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 p-4 rounded">
                <h3 className="font-medium mb-2">Sample Card Layout</h3>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div>
                    <p className="font-medium">{t('flights')}</p>
                    <p className="text-sm text-gray-600">{t('from')} {language === 'ar' ? 'دبي' : 'Dubai'} {t('to')} {language === 'ar' ? 'الرياض' : 'Riyadh'}</p>
                  </div>
                  <Button size="sm">{t('bookNow')}</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 