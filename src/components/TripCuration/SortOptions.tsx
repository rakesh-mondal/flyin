
import React from 'react';
import { cn } from '@/lib/utils';

interface SortOptionsProps {
  activeSort: 'best' | 'cheapest' | 'quickest';
  setActiveSort: (sort: 'best' | 'cheapest' | 'quickest') => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ activeSort, setActiveSort }) => {
  return (
    <div className="mb-4 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex">
        <button 
          onClick={() => setActiveSort('cheapest')}
          className={cn(
            "flex-1 border-r border-gray-200 p-3 text-center transition-all",
            activeSort === 'cheapest' ? "bg-blue-50 border-b-2 border-b-blue-600" : ""
          )}
        >
          <div className={cn("text-sm", activeSort === 'cheapest' ? "font-medium" : "text-gray-500")}>Cheapest</div>
          <div className="font-bold">$45,717</div>
          <div className="text-xs text-gray-500">28h 00m</div>
        </button>
        <button 
          onClick={() => setActiveSort('best')}
          className={cn(
            "flex-1 border-r border-gray-200 p-3 text-center transition-all",
            activeSort === 'best' ? "bg-blue-50 border-b-2 border-b-blue-600" : ""
          )}
        >
          <div className={cn("text-sm", activeSort === 'best' ? "font-medium" : "text-gray-500")}>Best</div>
          <div className="font-bold">$59,035</div>
          <div className="text-xs text-gray-500">10h 15m</div>
        </button>
        <button 
          onClick={() => setActiveSort('quickest')}
          className={cn(
            "flex-1 p-3 text-center transition-all",
            activeSort === 'quickest' ? "bg-blue-50 border-b-2 border-b-blue-600" : ""
          )}
        >
          <div className={cn("text-sm", activeSort === 'quickest' ? "font-medium" : "text-gray-500")}>Quickest</div>
          <div className="font-bold">$59,035</div>
          <div className="text-xs text-gray-500">10h 15m</div>
        </button>
      </div>
    </div>
  );
};

export default SortOptions;
