
import React from 'react';
import { Activity } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '../ui/sheet';

interface ActivitiesSheetProps {
  selectedActivities: string[];
  setSelectedActivities: React.Dispatch<React.SetStateAction<string[]>>;
}

const ActivitiesSheet = ({ selectedActivities, setSelectedActivities }: ActivitiesSheetProps) => {
  const activities = [
    'Sightseeing', 'Cultural Tours', 'Food & Wine', 'Adventure', 
    'Beach', 'Nightlife', 'Shopping', 'Nature', 'Museums'
  ];

  const handleAddActivities = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter(a => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
    
    toast.success(`${selectedActivities.includes(activity) ? 'Removed' : 'Added'} activity: ${activity}`, {
      description: "Updating your recommendations...",
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-1 text-xs text-gray-600 hover:bg-gray-100"
          size="sm"
        >
          <Activity className="h-3 w-3" /> 
          <span>Add activities</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-xl px-4 py-6">
        <SheetHeader className="mb-4 text-left">
          <SheetTitle>Add Activities</SheetTitle>
          <SheetDescription>Select activities you're interested in</SheetDescription>
        </SheetHeader>
        <div className="flex flex-wrap gap-2">
          {activities.map((activity) => (
            <Button
              key={activity}
              variant={selectedActivities.includes(activity) ? "default" : "outline"}
              className={cn(
                selectedActivities.includes(activity) 
                  ? "bg-black text-white hover:bg-black/90" 
                  : "bg-white hover:bg-gray-100"
              )}
              size="sm"
              onClick={() => handleAddActivities(activity)}
            >
              {activity}
            </Button>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <Button 
            className="bg-black text-white hover:bg-black/90"
            onClick={() => {
              toast.success(`Added ${selectedActivities.length} activities to your search!`);
            }}
          >
            Apply
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ActivitiesSheet;
