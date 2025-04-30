
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { GlowEffect } from '../ui/glow-effect';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSubmitMessage: () => void;
  userMessage: string;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
}

const ChatInput = ({ onSubmitMessage, userMessage, setUserMessage }: ChatInputProps) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userMessage.trim()) {
      onSubmitMessage();
    }
  };

  return (
    <div className="relative flex items-center">
      <div className="relative flex-1">
        {isInputFocused && (
          <GlowEffect
            colors={['#0894FF', '#C959DD', '#FF2E54', '#FF9004']} 
            mode="static"
            blur="medium"
            scale={1.05}
            className="rounded-full opacity-60"
          />
        )}
        <input
          type="text"
          placeholder="Ask a question or refine your search..."
          className={cn(
            "flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-3 pr-10 text-sm outline-none relative z-10",
            isInputFocused ? "border-transparent shadow-lg" : "focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          )}
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <Button
        className="absolute right-1 rounded-full bg-black p-2 text-white hover:bg-black/90 z-20"
        size="icon"
        onClick={onSubmitMessage}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChatInput;
