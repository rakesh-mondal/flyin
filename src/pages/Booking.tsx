import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingPage from '../components/Booking/BookingPage';

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const trip = location.state?.trip;

  // Debug: log the state received
  console.log('Booking page location.state:', location.state);

  if (!trip) {
    return (
      <div className="p-8 text-center text-gray-500">
        <div>No trip selected. Please start from the home page.</div>
        <button
          className="mt-4 px-4 py-2 bg-black text-white rounded"
          onClick={() => navigate('/')}
        >
          Go to Home
        </button>
      </div>
    );
  }

  return <BookingPage trip={trip} />;
} 