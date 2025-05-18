import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
// import { DatePicker } from '../../components/ui/date-picker';

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

// This would typically be in a context, but we're mocking it in tests
export const useSearchContext = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    tripType: 'roundtrip',
    origin: '',
    destination: '',
    departDate: '',
    returnDate: '',
    passengers: { adults: 1, children: 0, infants: 0 },
  });

  const updateSearchParams = (params: Partial<SearchParams>) => {
    setSearchParams(prev => ({ ...prev, ...params }));
  };

  const executeSearch = () => {
    console.log('Executing search with params:', searchParams);
    // In a real app, this would call an API or dispatch an action
  };

  return { searchParams, updateSearchParams, executeSearch };
};

export function FlightSearchForm() {
  const { searchParams, updateSearchParams, executeSearch } = useSearchContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <RadioGroup
        value={searchParams.tripType}
        onValueChange={(value) => updateSearchParams({ tripType: value as 'roundtrip' | 'oneway' | 'multicity' })}
        className="flex gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="roundtrip" id="roundtrip" />
          <Label htmlFor="roundtrip">Round Trip</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="oneway" id="oneway" />
          <Label htmlFor="oneway">One Way</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="multicity" id="multicity" />
          <Label htmlFor="multicity">Multi-City</Label>
        </div>
      </RadioGroup>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="from">From</Label>
          <Input
            id="from"
            value={searchParams.origin}
            onChange={(e) => updateSearchParams({ origin: e.target.value })}
            placeholder="City or airport"
          />
        </div>
        <div>
          <Label htmlFor="to">To</Label>
          <Input
            id="to"
            value={searchParams.destination}
            onChange={(e) => updateSearchParams({ destination: e.target.value })}
            placeholder="City or airport"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="depart">Depart</Label>
          <Input
            id="depart"
            type="date"
            value={searchParams.departDate}
            onChange={(e) => updateSearchParams({ departDate: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="return">Return</Label>
          <Input
            id="return"
            type="date"
            value={searchParams.returnDate}
            onChange={(e) => updateSearchParams({ returnDate: e.target.value })}
            disabled={searchParams.tripType === 'oneway'}
          />
        </div>
      </div>

      <Button type="submit" className="w-full">Search Flights</Button>
    </form>
  );
} 