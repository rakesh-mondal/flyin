import React, { useState } from 'react';
import TravelCanvas from '@/components/TravelCanvas';
import Footer from '@/components/Footer';
import TopHeader from '@/components/TripCuration/TopHeader';
import { Toaster } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState('Rakesh');

  const handleSearch = (query: string) => {
    navigate(`/curation?query=${encodeURIComponent(query)}`);
  };

  const handleSignIn = () => {
    setIsSignedIn(true);
    // Here you would implement actual sign-in logic
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    // Here you would implement actual sign-out logic
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <TopHeader 
        isSignedIn={isSignedIn}
        userName={userName}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />
      <div className="flex-1">
        <TravelCanvas onSearch={handleSearch} />
      </div>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
};

export default Index;
