
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

interface ChatInputProps {
  onSubmitMessage: () => void;
  userMessage: string;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
}

const ChatInput = ({ onSubmitMessage, userMessage, setUserMessage }: ChatInputProps) => {
  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Ask a question or refine your search..."
        className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-3 pr-10 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
      />
      <Button
        className="absolute right-1 rounded-full bg-black p-2 text-white hover:bg-black/90"
        size="icon"
        onClick={onSubmitMessage}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChatInput;
