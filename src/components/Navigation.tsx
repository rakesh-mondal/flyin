
import React from 'react';
import { PlaneTakeoff, Search, Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
  isVisible?: boolean;
}

export default function Navigation({ activeTab, onChangeTab, isVisible = true }: NavigationProps) {
  const tabs = [
    { id: 'home', label: 'Discover', icon: PlaneTakeoff },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'trips', label: 'My Flights', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 z-20 w-full border-t border-gray-200 bg-white shadow-md transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="mx-auto flex max-w-md items-center justify-around px-4 py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "flex flex-1 flex-col items-center rounded-lg py-2 text-xs transition-colors",
              activeTab === tab.id 
                ? "text-black font-medium" 
                : "text-gray-400 hover:text-gray-900"
            )}
            onClick={() => onChangeTab(tab.id)}
          >
            <tab.icon className="mb-1 h-5 w-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
