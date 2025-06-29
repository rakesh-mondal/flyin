import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import FlightSearchForm from './FlightSearchForm';
import AnimatedStar from './AnimatedStar';
import { cn } from '@/lib/utils';
import { useTranslation } from '../translations';
import { useLanguage } from '@/hooks/useLanguage';

interface DualModeSearchProps {
  children: React.ReactNode; // This will be the AI search component
  onSearch: (query: string) => void;
  className?: string;
}

export default function DualModeSearch({ children, onSearch, className }: DualModeSearchProps) {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  return (
    <div className={cn("w-full", className)}>
      <Tabs defaultValue="flights" className="w-full">
        <TabsList className="flex w-full justify-center bg-transparent px-2">
          <TabsTrigger 
            value="flights" 
            className="relative border-b-2 border-transparent px-4 pb-2 pt-2 text-sm font-medium text-gray-600 transition-all data-[state=active]:border-b-black data-[state=active]:font-semibold data-[state=active]:text-gray-900 data-[state=active]:shadow-none"
          >
            {t('flights')}
          </TabsTrigger>
          <TabsTrigger 
            value="hotels" 
            className="relative border-b-2 border-transparent px-4 pb-2 pt-2 text-sm font-medium text-gray-600 transition-all data-[state=active]:border-b-black data-[state=active]:font-semibold data-[state=active]:text-gray-900 data-[state=active]:shadow-none"
          >
            {t('hotels')}
          </TabsTrigger>
          <TabsTrigger 
            value="rentals" 
            className="relative border-b-2 border-transparent px-4 pb-2 pt-2 text-sm font-medium text-gray-600 transition-all data-[state=active]:border-b-black data-[state=active]:font-semibold data-[state=active]:text-gray-900 data-[state=active]:shadow-none"
          >
{t('rentals')}
          </TabsTrigger>
          <TabsTrigger 
            value="ai" 
            className="relative border-b-2 border-transparent px-4 pb-2 pt-2 text-sm font-medium text-gray-600 transition-all data-[state=active]:border-b-black data-[state=active]:font-semibold data-[state=active]:text-gray-900 data-[state=active]:shadow-none"
          >
            <span className={cn("flex items-center", isRTL ? "flex-row-reverse" : "")}>
              {t('tryFlyinAI')}
              <span className={isRTL ? "mr-1.5" : "ml-1.5"}>
                <AnimatedStar />
              </span>
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="flights" className="mt-4 min-h-[100px]">
          <FlightSearchForm onSearch={onSearch} />
        </TabsContent>
        
        <TabsContent value="hotels" className="mt-4 min-h-[100px]">
          <div className="h-[72px] flex items-center justify-center">
            <p className="text-gray-500 text-sm">Hotels search coming soon...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="rentals" className="mt-4 min-h-[100px]">
          <div className="h-[72px] flex items-center justify-center">
            <p className="text-gray-500 text-sm">Car rentals coming soon...</p>
          </div>
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
