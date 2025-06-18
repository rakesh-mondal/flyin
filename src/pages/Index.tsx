import React, { useState } from 'react';
import TravelCanvas from '@/components/TravelCanvas';
import Footer from '@/components/Footer';
import TopHeader from '@/components/TripCuration/TopHeader';
import { Toaster } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';
import AuthModal from '@/components/AuthModal';

const Index = () => {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState('Rakesh');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleSearch = (query: string) => {
    navigate(`/curation?query=${encodeURIComponent(query)}`);
  };

  const handleSignIn = (data: any) => {
    console.log('Sign in data:', data);
    setIsSignedIn(true);
    setUserName(data.email.split('@')[0]); // Use email prefix as name
    // Here you would implement actual sign-in logic
  };

  const handleSignUp = (data: any) => {
    console.log('Sign up data:', data);
    setIsSignedIn(true);
    setUserName(data.firstName);
    // Here you would implement actual sign-up logic
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    // Here you would implement actual sign-out logic
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <TopHeader 
        isSignedIn={isSignedIn}
        userName={userName}
        onSignIn={openAuthModal}
        onSignOut={handleSignOut}
      />
      <div className="flex-1">
        <TravelCanvas onSearch={handleSearch} />
      </div>
      <Footer />
      <Toaster position="top-center" />
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
      />
    </div>
  );
};

export default Index;
