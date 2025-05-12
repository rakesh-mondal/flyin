import React from 'react';
import TravelCanvas from '@/components/TravelCanvas';
import { Toaster } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/curation?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <TravelCanvas onSearch={handleSearch} />
      <Toaster position="top-center" />
    </div>
  );
};

export default Index;
