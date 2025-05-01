import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import FlightSearchForm from './FlightSearchForm';
import AnimatedStar from './AnimatedStar';
import { cn } from '@/lib/utils';

interface DualModeSearchProps {
  children: React.ReactNode; // This will be the AI search component
  onSearch: (query: string) => void;
  className?: string;
}

export default function DualModeSearch({ children, onSearch, className }: DualModeSearchProps) {
  return (
    <div className={cn("w-full", className)}>
      <Tabs defaultValue="fly" className="w-full">
        <TabsList className="flex w-full justify-center bg-transparent px-2">
          <TabsTrigger 
            value="fly" 
            className="relative border-b-2 border-transparent px-4 pb-2 pt-2 text-sm font-medium text-gray-600 transition-all data-[state=active]:border-b-black data-[state=active]:font-semibold data-[state=active]:text-gray-900 data-[state=active]:shadow-none"
          >
            Fly
          </TabsTrigger>
          <TabsTrigger 
            value="ai" 
            className="relative border-b-2 border-transparent px-4 pb-2 pt-2 text-sm font-medium text-gray-600 transition-all data-[state=active]:border-b-black data-[state=active]:font-semibold data-[state=active]:text-gray-900 data-[state=active]:shadow-none"
          >
            Try Flyin AI
            <span className="ml-1.5">
              <AnimatedStar />
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="fly" className="mt-4 min-h-[100px]">
          <FlightSearchForm onSearch={onSearch} />
        </TabsContent>
        
        <TabsContent value="ai" className="mt-4 min-h-[100px]">
          <div className="h-[72px] flex items-center">
            {children}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
