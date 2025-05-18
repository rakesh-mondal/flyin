import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SearchParams {
  tripType: 'roundtrip' | 'oneway' | 'multicity';
  origin: string;
  destination: string;
  departDate: string;
  returnDate: string;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
}

interface SearchContextType {
  searchParams: SearchParams;
  updateSearchParams: (params: Partial<SearchParams>) => void;
  executeSearch: () => void;
}

const initialSearchParams: SearchParams = {
  tripType: 'roundtrip',
  origin: '',
  destination: '',
  departDate: '',
  returnDate: '',
  passengers: { adults: 1, children: 0, infants: 0 },
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useState<SearchParams>(initialSearchParams);

  const updateSearchParams = (params: Partial<SearchParams>) => {
    setSearchParams(prev => ({ ...prev, ...params }));
  };

  const executeSearch = () => {
    console.log('Executing search with params:', searchParams);
    // In a real application, this would call an API or dispatch an action
  };

  return (
    <SearchContext.Provider value={{ searchParams, updateSearchParams, executeSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext(): SearchContextType {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
} 