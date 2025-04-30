
import React from 'react';
import { PlaneTakeoff, Search, Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

export default function Navigation({ activeTab, onChangeTab }: NavigationProps) {
  const tabs = [
    { id: 'home', label: 'Discover', icon: PlaneTakeoff },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'trips', label: 'My Flights', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="sticky bottom-0 z-20 w-full border-t border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-md items-center justify-around px-4 py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "flex flex-1 flex-col items-center rounded-lg py-2 text-xs transition-colors",
              activeTab === tab.id 
                ? "text-black font-medium" 
                : "text-gray-500 hover:text-gray-900"
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
