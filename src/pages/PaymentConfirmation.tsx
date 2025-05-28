import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentConfirmationPage from '../components/Payment/PaymentConfirmationPage';

export default function PaymentConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;

  // Debug: log the state received
  console.log('PaymentConfirmation page location.state:', location.state);

  if (!bookingData) {
    return (
      <div className="p-8 text-center text-gray-500">
        <div>No booking data found. Please start from the booking page.</div>
        <button
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary-hover hover:text-[#194E91]"
          onClick={() => navigate('/Booking')}
        >
          Go to Booking
        </button>
      </div>
    );
  }

  return <PaymentConfirmationPage bookingData={bookingData} />;
} 