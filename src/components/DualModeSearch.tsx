
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import FlightSearchForm from './FlightSearchForm';

interface DualModeSearchProps {
  children: React.ReactNode; // This will be the AI search component
  onSearch: (query: string) => void;
}

export default function DualModeSearch({ children, onSearch }: DualModeSearchProps) {
  return (
    <div className="w-full max-w-3xl">
      <Tabs defaultValue="fly" className="w-full">
        <TabsList className="mb-6 w-full bg-gray-100">
          <TabsTrigger value="fly" className="w-1/2 data-[state=active]:bg-white">
            Fly
          </TabsTrigger>
          <TabsTrigger value="ai" className="w-1/2 data-[state=active]:bg-white">
            Try Flyin AI
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="fly" className="mt-6 space-y-4">
          <FlightSearchForm onSearch={onSearch} />
        </TabsContent>
        
        <TabsContent value="ai" className="mt-6">
          {children}
        </TabsContent>
      </Tabs>
    </div>
  );
}
