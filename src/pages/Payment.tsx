import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentPage from '../components/Payment/PaymentPage';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const trip = location.state?.trip;

  // Debug: log the state received
  console.log('Payment page location.state:', location.state);

  if (!trip) {
    return (
      <div className="p-8 text-center text-gray-500">
        <div>No trip selected. Please start from the booking page.</div>
        <button
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary-hover hover:text-[#194E91]"
          onClick={() => navigate('/Booking')}
        >
          Go to Booking
        </button>
      </div>
    );
  }

  return <PaymentPage trip={trip} />;
} 