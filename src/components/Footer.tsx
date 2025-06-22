import React from 'react';
import { Button } from './ui/button';
import { useTranslation } from '../translations';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: t('support'),
      links: [
        t('covidFaqs'),
        t('manageTrips'),
        t('contactCustomerService'),
        t('safetyResourceCentre')
      ]
    },
    {
      title: t('discover'),
      links: [
        t('geniusLoyalty'),
        t('seasonalDeals'),
        t('travelArticles'),
        t('flyinBusiness'),
        t('travellerReviewAwards'),
        t('carHire'),
        t('flightFinder'),
        t('restaurantReservations'),
        t('flyinTravelAgents')
      ]
    },
    {
      title: t('termsAndSettings'),
      links: [
        t('privacyCookies'),
        t('termsConditions'),
        t('grievanceOfficer'),
        t('modernSlaveryStatement'),
        t('humanRightsStatement')
      ]
    },
    {
      title: t('partners'),
      links: [
        t('extranetLogin'),
        t('partnerHelp'),
        t('listProperty'),
        t('becomeAffiliate')
      ]
    },
    {
      title: t('about'),
      links: [
        t('aboutFlyin'),
        t('howWeWork'),
        t('sustainability'),
        t('pressCentre'),
        t('careers'),
        t('investorRelations'),
        t('corporateContact')
      ]
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto footer-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-3 footer-links">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button className="text-sm text-gray-600 hover:text-primary transition-colors duration-200 text-left">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Currency selector */}
        <div className="flex items-center justify-start mb-8">
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 footer-currency">
            <div className="w-6 h-4 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-blue-600 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white flex items-center justify-center">
                  <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-700">INR</span>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="text-center content-text">
            <p className="text-xs text-gray-600">
              {t('flyinDescription')}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {t('copyright').replace('{year}', currentYear.toString())}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 