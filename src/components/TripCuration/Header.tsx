
import React from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { Button } from '../ui/button';

interface HeaderProps {
  onBack: () => void;
}

const Header = ({ onBack }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
      <Button variant="ghost" size="icon" onClick={onBack} className="text-black">
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <h1 className="text-xl font-medium">Your Journey</h1>
      <Button variant="ghost" size="icon" onClick={onBack} className="text-black">
        <X className="h-5 w-5" />
      </Button>
    </header>
  );
};

export default Header;
