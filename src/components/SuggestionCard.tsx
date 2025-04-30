
import React from 'react';
import { cn } from '@/lib/utils';
import { PlaneTakeoff } from 'lucide-react';

interface SuggestionCardProps {
  title: string;
  image: string;
  type?: string;
  price?: string;
  departure?: string;
  onClick: () => void;
}

export default function SuggestionCard({ title, image, type, price, departure, onClick }: SuggestionCardProps) {
  return (
    <div 
      className="group relative h-44 w-72 shrink-0 cursor-pointer overflow-hidden rounded-xl transition-transform duration-300 hover:scale-[1.02]"
      onClick={onClick}
    >
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-white/80">
          {type || 'Recommended Flight'}
        </span>
        <h3 className="text-xl font-medium leading-tight">{title}</h3>
        
        <div className="mt-1 flex items-center space-x-2 text-sm">
          {price && <span className="font-semibold">${price}</span>}
          {departure && (
            <div className="flex items-center">
              <PlaneTakeoff className="mr-1 h-3 w-3" />
              <span>{departure}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Hover effect */}
      <div className={cn(
        "absolute inset-0 border-2 border-white/0 rounded-xl transition-all duration-300",
        "group-hover:border-white/40"
      )} />
    </div>
  );
}
