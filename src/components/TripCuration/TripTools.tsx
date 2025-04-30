
import React from 'react';
import { Separator } from '../ui/separator';
import ActivitiesSheet from './ActivitiesSheet';
import BudgetSheet from './BudgetSheet';
import AlternativeDatesPopover from './AlternativeDatesPopover';

interface TripToolsProps {
  selectedActivities: string[];
  setSelectedActivities: React.Dispatch<React.SetStateAction<string[]>>;
  budgetRange: { min: number; max: number };
  setBudgetRange: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
  alternativeDates: string[];
  handleSelectDate: (date: string) => void;
}

const TripTools = ({
  selectedActivities,
  setSelectedActivities,
  budgetRange,
  setBudgetRange,
  alternativeDates,
  handleSelectDate
}: TripToolsProps) => {
  return (
    <div className="mt-2 flex items-center justify-center">
      {/* Activities Button */}
      <ActivitiesSheet 
        selectedActivities={selectedActivities} 
        setSelectedActivities={setSelectedActivities} 
      />
      
      <Separator orientation="vertical" className="mx-2 h-4" />
      
      {/* Budget Button */}
      <BudgetSheet 
        budgetRange={budgetRange} 
        setBudgetRange={setBudgetRange} 
      />
      
      <Separator orientation="vertical" className="mx-2 h-4" />
      
      {/* Alternative Dates Button */}
      <AlternativeDatesPopover 
        alternativeDates={alternativeDates} 
        handleSelectDate={handleSelectDate} 
      />
    </div>
  );
};

export default TripTools;
