import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopHeader from '../TripCuration/TopHeader';
import { Check } from 'lucide-react';

const PaymentConfirmationPage = ({ bookingData }: { bookingData: any }) => {
  const navigate = useNavigate();

  // Mock data for demonstration - in real app this would come from bookingData
  const confirmationData = {
    email: 'ank*******@gmail.com',
    referenceNumber: '4870337234',
    route: {
      from: 'Jeddah',
      to: 'Dubai',
      type: 'Round Trip'
    },
    flights: {
      departure: {
        date: 'Thu, May 22',
        duration: '3h 5m',
        departureTime: '14:35',
        departureCode: 'JED',
        arrivalTime: '18:40',
        arrivalCode: 'DXB',
        route: 'King Abdulaziz Int\'l → Dubai Int\'l'
      },
      return: {
        date: 'Tue, May 27',
        duration: '3h 5m',
        departureTime: '16:10',
        departureCode: 'DXB',
        arrivalTime: '18:15',
        arrivalCode: 'JED',
        route: 'Dubai Int\'l → King Abdulaziz Int\'l'
      }
    },
    recommendations: [
      {
        title: 'London Eye',
        description: 'Enjoy a special 15% off on tickets for the adventure ride with 2 free rides.',
        rating: '4.6%',
        price: '₹1,620',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=240&fit=crop&crop=center',
        features: ['15% off', '2 free rides']
      },
      {
        title: 'Rent a car',
        description: '24/7 available cars (4 seats and more) with free cancellation and free parking',
        rating: '4.6%',
        price: '₹1,620',
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=240&fit=crop&crop=center',
        features: ['free cancellation', 'free parking']
      },
      {
        title: 'Travel Insurance',
        description: '24/7 available cars (4 seats and more) with free cancellation and free parking',
        rating: '4.6%',
        price: '₹1,620',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=240&fit=crop&crop=center',
        features: ['free cancellation', 'free parking']
      },
      {
        title: 'Visa apply',
        description: '24/7 available cars (4 seats and more) with free cancellation and free parking',
        rating: '4.6%',
        price: '₹1,620',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=240&fit=crop&crop=center',
        features: ['free cancellation', 'free parking']
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <TopHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Row: Confirmation Details and Booking Summary */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Left: Confirmation Details */}
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 h-full flex flex-col">
              {/* Success Message */}
              <div className="flex-1">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment completed successfully</h1>
                    <p className="text-gray-600">
                      Thanks for booking with flyin! Your ticket details will be sent to{' '}
                      <span className="font-medium">{confirmationData.email}</span>
                    </p>
                    <p className="text-gray-600 mt-2">
                      Reference number: <span className="font-medium">{confirmationData.referenceNumber}</span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto">
                <button 
                  onClick={() => navigate('/bookings')}
                  className="bg-[#194a8f] text-white font-semibold rounded px-5 py-2.5 text-base hover:bg-yellow-400 hover:text-[#194a8f] transition-colors"
                >
                  View booking
                </button>
              </div>
            </div>
          </div>

          {/* Right: Booking Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-xl border border-gray-200 p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Booking Summary</h2>
                <button className="text-[#194a8f] text-sm font-medium flex items-center gap-1">
                  Details
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Route */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{confirmationData.route.from}</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="font-medium text-gray-900">{confirmationData.route.to}</span>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{confirmationData.route.type}</span>
              </div>

              {/* Flight Details */}
              <div className="space-y-4 mb-6">
                {/* Departure */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">
                      Departure - {confirmationData.flights.departure.date} - {confirmationData.flights.departure.duration}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">{confirmationData.flights.departure.departureTime}</span>
                        <span className="text-sm text-gray-500">{confirmationData.flights.departure.departureCode}</span>
                      </div>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">{confirmationData.flights.departure.arrivalTime}</span>
                        <span className="text-sm text-gray-500">{confirmationData.flights.departure.arrivalCode}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{confirmationData.flights.departure.route}</div>
                  </div>
                </div>

                {/* Return */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">
                      Return - {confirmationData.flights.return.date} - {confirmationData.flights.return.duration}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">{confirmationData.flights.return.departureTime}</span>
                        <span className="text-sm text-gray-500">{confirmationData.flights.return.departureCode}</span>
                      </div>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">{confirmationData.flights.return.arrivalTime}</span>
                        <span className="text-sm text-gray-500">{confirmationData.flights.return.arrivalCode}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{confirmationData.flights.return.route}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Travel Section */}
        <div className="w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">For your trip to Dubai</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {confirmationData.recommendations.map((item, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="h-40 relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-600">{item.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">From {item.price}</span>
                    </div>
                    <button className="bg-[#194a8f] text-white font-medium py-2 px-4 rounded-lg hover:bg-yellow-400 hover:text-[#194a8f] transition-colors text-sm">
                      Know more
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage; 