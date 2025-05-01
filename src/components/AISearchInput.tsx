
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

interface AISearchInputProps {
  onSearch?: (query: string) => void;
}

const AISearchInput: React.FC<AISearchInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-3 flex items-center">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input 
          type="text"
          placeholder="Ask AI: 'Weekend trip to Dubai for family of 4'"
          className="pl-10 pr-4 py-3 h-14 w-full rounded-md border-gray-200 bg-white text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </form>
  );
};

export default AISearchInput;
