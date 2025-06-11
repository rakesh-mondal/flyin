import React from 'react';
import TravelCanvas from '@/components/TravelCanvas';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/curation?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex-1">
        <TravelCanvas onSearch={handleSearch} />
      </div>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
};

export default Index;
