import React from 'react';
import { DollarSign } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '../ui/sheet';

interface BudgetSheetProps {
  budgetRange: { min: number; max: number };
  setBudgetRange: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
}

const BudgetSheet = ({ budgetRange, setBudgetRange }: BudgetSheetProps) => {
  const handleSetBudget = (min: number, max: number) => {
    setBudgetRange({ min, max });
    toast.success(`Budget updated to $${min} - $${max}`, {
      description: "Adjusting your recommendations based on budget...",
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
          <DollarSign className="h-3 w-3" /> 
          <span>Adjust budget</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-xl px-4 py-6">
        <SheetHeader className="mb-4 text-left">
          <SheetTitle>Set Your Budget</SheetTitle>
          <SheetDescription>Select budget range per person</SheetDescription>
        </SheetHeader>
        <div className="space-y-6">
          <div className="flex justify-between">
            <p className="font-medium">${budgetRange.min}</p>
            <p className="font-medium">${budgetRange.max}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary-hover hover:text-[#194E91]" 
              onClick={() => handleSetBudget(1000, 3000)}
            >
              Economy ($1,000 - $3,000)
            </Button>
            <Button 
              variant="outline" 
              className="hover:bg-gray-100"
              onClick={() => handleSetBudget(3000, 5000)}
            >
              Standard ($3,000 - $5,000)
            </Button>
            <Button 
              variant="outline" 
              className="hover:bg-gray-100"
              onClick={() => handleSetBudget(5000, 8000)}
            >
              Premium ($5,000 - $8,000)
            </Button>
            <Button 
              variant="outline" 
              className="hover:bg-gray-100"
              onClick={() => handleSetBudget(8000, 15000)}
            >
              Luxury ($8,000+)
            </Button>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary-hover hover:text-[#194E91]"
            onClick={() => {
              toast.success(`Budget set to $${budgetRange.min} - $${budgetRange.max} per person`);
            }}
          >
            Apply
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BudgetSheet;
