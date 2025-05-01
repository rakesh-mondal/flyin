
import React from 'react';

const SponsoredBanner: React.FC = () => {
  return (
    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
      <div className="flex items-center">
        <img 
          src="https://www.emirates.com/etc/designs/ecom/creative/emirates-logo.png" 
          alt="Emirates" 
          className="h-6 mr-2" 
        />
        <div>
          <span className="text-xs text-gray-500">Sponsored</span>
          <h4 className="font-medium text-amber-900">Book Premium Economy to Dubai and earn extra miles</h4>
        </div>
      </div>
    </div>
  );
};

export default SponsoredBanner;
