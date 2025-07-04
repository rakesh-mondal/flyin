import React from 'react';
import { cn } from '@/lib/utils';
import { PlaneTakeoff, Image as ImageIcon } from 'lucide-react';
import { useTranslation } from '../translations';

interface SuggestionCardProps {
  title: string;
  image: string;
  type?: string;
  price?: string;
  departure?: string;
  onClick: () => void;
}

export default function SuggestionCard({ title, image, type, price, departure, onClick }: SuggestionCardProps) {
  const { t } = useTranslation();
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  // Function to translate the type
  const getTranslatedType = (type: string) => {
    switch (type) {
      case 'Trending':
        return t('trending');
      case 'For You':
        return t('forYou');
      case 'Popular':
        return t('popular');
      default:
        return type;
    }
  };

  // Use a proper image element to detect load/error events
  React.useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
  }, [image]);

  return (
    <div 
      className="group relative h-32 sm:h-40 w-56 sm:w-64 shrink-0 cursor-pointer overflow-hidden rounded-xl transition-transform duration-300 hover:scale-[1.02]"
      onClick={onClick}
    >
      {/* Background image with fallback */}
      {!imageError ? (
        <>
          {imageLoaded && (
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${image})` }}
            />
          )}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <ImageIcon className="h-6 sm:h-8 w-6 sm:w-8 animate-pulse text-gray-400" />
            </div>
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-400">
          <ImageIcon className="h-6 sm:h-8 w-6 sm:w-8 mb-2" />
          <span className="text-xs">Image unavailable</span>
        </div>
      )}
      
      {/* Type tag moved to top right */}
      {type && (
        <div className="absolute right-2 sm:right-3 top-2 sm:top-3 z-10">
          <span className="rounded-full bg-black/60 px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs font-medium text-white backdrop-blur-sm">
            {getTranslatedType(type)}
          </span>
        </div>
      )}
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 p-3 sm:p-4 text-white z-10">
        <h3 className="text-base sm:text-lg font-medium leading-tight">{title}</h3>
        
        <div className="mt-0.5 sm:mt-1 flex items-center space-x-2 text-xs sm:text-sm">
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
