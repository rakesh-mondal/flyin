
import React from 'react';

interface AiMessageProps {
  loading: boolean;
  thinking: string;
  message: string;
}

const AiMessage = ({ loading, thinking, message }: AiMessageProps) => {
  return (
    <div className="w-full bg-white p-4 shadow-sm">
      {loading ? (
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 animate-pulse rounded-full bg-black/10"></div>
          <p className="text-lg">{thinking}</p>
        </div>
      ) : (
        <p className="text-lg">{message}</p>
      )}
    </div>
  );
};

export default AiMessage;
