
import React, { useState } from 'react';
import TravelCanvas from '@/components/TravelCanvas';
import TripCuration from '@/components/TripCuration';
import TripDetail from '@/components/TripDetail';
import Navigation from '@/components/Navigation';
import MyTrips from '@/components/MyTrips';
import Profile from '@/components/Profile';
import { Toaster } from '@/components/ui/sonner';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState('home');
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView('search');
  };

  const handleBack = () => {
    if (currentView === 'detail') {
      setCurrentView('search');
    } else {
      setCurrentView('home');
    }
  };

  const handleViewTrip = (trip: any) => {
    setSelectedTrip(trip);
    setCurrentView('detail');
  };

  const handleChangeTab = (tab: string) => {
    setActiveTab(tab);
    
    if (tab === 'home') {
      setCurrentView('home');
    } else if (tab === 'search') {
      // If we already have a search query, show results
      if (searchQuery) {
        setCurrentView('search');
      } else {
        setCurrentView('home');
      }
    } else if (tab === 'trips') {
      setCurrentView('trips');
    } else if (tab === 'profile') {
      setCurrentView('profile');
    }
  };

  // Add console logs to help with debugging
  console.log('Current view:', currentView);
  console.log('Search query:', searchQuery);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      {currentView === 'home' && (
        <TravelCanvas onSearch={handleSearch} />
      )}
      
      {currentView === 'search' && (
        <TripCuration 
          searchQuery={searchQuery} 
          onBack={handleBack}
          onViewTrip={handleViewTrip}
        />
      )}
      
      {currentView === 'detail' && selectedTrip && (
        <TripDetail 
          trip={selectedTrip}
          onBack={handleBack}
        />
      )}
      
      {currentView === 'trips' && (
        <MyTrips onViewTrip={handleViewTrip} />
      )}
      
      {currentView === 'profile' && (
        <Profile />
      )}
      
      {/* Only show navigation on certain views */}
      {['home', 'trips', 'profile'].includes(currentView) && (
        <Navigation activeTab={activeTab} onChangeTab={handleChangeTab} />
      )}
      
      <Toaster position="top-center" />
    </div>
  );
}

export default Index;
