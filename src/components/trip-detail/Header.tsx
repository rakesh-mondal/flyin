
import React from 'react';
import { ArrowLeft, PlaneTakeoff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  image: string;
  title: string;
  destination: string;
  onBack: () => void;
}

export function Header({ image, title, destination, onBack }: HeaderProps) {
  return (
    <div className="relative h-52">
      <img 
        src={image} 
        alt={destination}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      
      {/* Back button */}
      <Button 
        className="absolute left-4 top-4 rounded-full bg-black/30 text-white hover:bg-black/50"
        size="icon"
        variant="ghost"
        onClick={onBack}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      
      {/* Title overlay */}
      <div className="absolute bottom-0 left-0 w-full p-6 text-white">
        <h1 className="text-3xl font-medium">{title}</h1>
        <p className="mt-1 flex items-center text-lg">
          <PlaneTakeoff className="mr-1.5 h-4 w-4" />
          {destination}
        </p>
      </div>
    </div>
  );
}
