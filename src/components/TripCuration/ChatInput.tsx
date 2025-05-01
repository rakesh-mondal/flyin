
import React, { useState } from 'react';
import { Send, Mic } from 'lucide-react';
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
  const [isRecording, setIsRecording] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userMessage.trim()) {
      onSubmitMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // This would be where you'd start voice recording
      setTimeout(() => {
        setIsRecording(false);
        setUserMessage("I'm looking for a luxury hotel in Dubai");
      }, 2000);
    }
  };

  return (
    <div className="relative w-full max-w-full mx-auto">
      <div className={cn(
        "relative transition-all duration-300",
        isInputFocused ? "scale-[1.02]" : ""
      )}>
        {isInputFocused && (
          <GlowEffect
            colors={['#0894FF', '#C959DD', '#FF2E54', '#FF9004']} 
            mode="static"
            blur="medium"
            scale={1.05}
            className="rounded-full opacity-60"
          />
        )}
        <div className="relative flex items-center">
          <Button
            className={cn(
              "absolute left-3 h-10 w-10 rounded-full bg-transparent hover:bg-gray-100 z-20",
              isRecording && "text-red-500 animate-pulse"
            )}
            size="icon"
            variant="ghost"
            onClick={toggleRecording}
          >
            <Mic className="h-5 w-5" />
          </Button>
          
          <input
            type="text"
            placeholder={isRecording ? "Listening..." : "Ask me anything about your trip..."}
            className={cn(
              "h-14 w-full rounded-full bg-gray-100 pl-14 pr-16 text-base",
              "placeholder:text-gray-500 focus:outline-none relative z-10",
              isInputFocused ? "bg-white border-transparent shadow-lg focus:ring-1 focus:ring-primary/50" : "border border-gray-300"
            )}
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            onKeyPress={handleKeyPress}
            disabled={isRecording}
          />
          
          <Button
            className={cn(
              "absolute right-3 h-10 w-10 rounded-full z-20",
              userMessage.trim() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            )}
            size="icon"
            onClick={onSubmitMessage}
            disabled={!userMessage.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Quick suggestion chips */}
      <div className="mt-3 flex flex-wrap gap-2">
        {["Best time to visit?", "Local customs?", "Budget recommendations", "Family-friendly activities"].map((suggestion) => (
          <button 
            key={suggestion}
            onClick={() => {
              setUserMessage(suggestion);
              setTimeout(() => onSubmitMessage(), 100);
            }}
            className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs hover:bg-gray-50"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ChatInput;
