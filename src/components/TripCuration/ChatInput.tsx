
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { GlowEffect } from '../ui/glow-effect';

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
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
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
          placeholder="Ask a question..."
          className={cn(
            "h-14 w-full rounded-full bg-gray-100 px-6 pr-16 text-lg",
            "placeholder:text-gray-500 focus:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary/50 relative z-10",
            isInputFocused ? "border-transparent shadow-lg" : "border border-gray-300"
          )}
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          onKeyPress={handleKeyPress}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20">
          <Button
            className="h-10 w-10 rounded-full bg-black text-white hover:bg-black/90"
            size="icon"
            onClick={onSubmitMessage}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
