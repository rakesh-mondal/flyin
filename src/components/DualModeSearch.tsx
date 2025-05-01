
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import FlightSearchForm from './FlightSearchForm';
import AnimatedStar from './AnimatedStar';

interface DualModeSearchProps {
  children: React.ReactNode; // This will be the AI search component
  onSearch: (query: string) => void;
}

export default function DualModeSearch({ children, onSearch }: DualModeSearchProps) {
  return (
    <div className="w-full max-w-3xl">
      <Tabs defaultValue="fly" className="w-full">
        <TabsList className="flex w-full justify-start border-b border-gray-200 bg-transparent px-2">
          <TabsTrigger 
            value="fly" 
            className="relative border-b-2 border-transparent px-4 pb-2 pt-2 text-sm font-medium text-gray-600 data-[state=active]:border-black data-[state=active]:font-semibold data-[state=active]:text-gray-900"
          >
            Fly
          </TabsTrigger>
          <TabsTrigger 
            value="ai" 
            className="relative border-b-2 border-transparent px-4 pb-2 pt-2 text-sm font-medium text-gray-600 data-[state=active]:border-black data-[state=active]:font-semibold data-[state=active]:text-gray-900"
          >
            Try Flyin AI
            <span className="ml-1.5">
              <AnimatedStar />
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="fly" className="mt-6">
          <FlightSearchForm onSearch={onSearch} />
        </TabsContent>
        
        <TabsContent value="ai" className="mt-6">
          {children}
        </TabsContent>
      </Tabs>
    </div>
  );
}
