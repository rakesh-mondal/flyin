
import React from 'react';
import { Sparkles } from 'lucide-react';

const AnimatedStar: React.FC = () => {
  return (
    <div className="relative inline-flex items-center justify-center">
      <span className="absolute animate-ping opacity-75">
        <Sparkles className="h-3 w-3 text-black" />
      </span>
      <Sparkles className="h-4 w-4 fill-black text-black" />
    </div>
  );
};

export default AnimatedStar;
