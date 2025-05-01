
import React from 'react';
import { MessageSquareText } from 'lucide-react';
import { Button } from '../ui/button';

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton = ({ onClick }: ChatButtonProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        onClick={onClick} 
        className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
        size="icon"
      >
        <MessageSquareText className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default ChatButton;
