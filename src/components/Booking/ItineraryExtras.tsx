import React from 'react';

const ItineraryExtras = () => (
  <div className="my-6 space-y-6">
    {/* Visa Denial Cover */}
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-center justify-between">
      <div>
        <span className="font-semibold text-purple-700">This booking is covered by</span>
        <a href="#" className="text-purple-600 underline ml-1">Visa Denial Cover</a>
        <div className="text-sm text-gray-700 mt-1">
          Get a full refund if your visa is rejected. Cancel up to 24 hrs before departure. T&C apply.
          <a href="#" className="text-blue-600 ml-1">Learn more</a>
        </div>
      </div>
      <div className="text-right">
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-bold">FREE</span>
        <span className="line-through text-gray-400 ml-2">₹1800/pax</span>
      </div>
    </div>
    {/* Travel & Medical Insurance */}
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-900">Protect your trip with Travel & Medical Insurance</span>
        <span className="text-blue-700 font-bold">₹325</span>
        <button className="bg-blue-600 text-white px-4 py-1 rounded">Add</button>
      </div>
      <div className="flex space-x-6 mb-2">
        <div>
          <div className="font-semibold">Medical Expenses Reimbursement</div>
          <div className="text-xs text-gray-600">upto $1,00,000</div>
        </div>
        <div>
          <div className="font-semibold">Baggage Loss</div>
          <div className="text-xs text-gray-600">upto $500</div>
        </div>
        <div>
          <div className="font-semibold">Trip Cancellation</div>
          <div className="text-xs text-gray-600">upto $2,500</div>
        </div>
      </div>
      <div className="flex items-center text-xs text-gray-500 mt-2">
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2b/Reliance_General_Insurance_Logo.png" alt="Reliance General Insurance" className="h-4 mr-2" />
        This travel insurance is only valid for the age group of 90 days to 70 years. By adding the insurance, you agree to the Terms & conditions and Good health terms.
      </div>
    </div>
  </div>
);

export default ItineraryExtras; 