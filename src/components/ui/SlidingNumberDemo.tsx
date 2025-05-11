import { useState } from 'react';
import { SlidingNumber } from '@/components/ui/sliding-number';

export default function SlidingNumberDemo() {
  const [value, setValue] = useState(123);

  return (
    <div className="p-10">
      <SlidingNumber value={value} />
      <button
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setValue((v) => v + Math.floor(Math.random() * 100))}
      >
        Change Number
      </button>
    </div>
  );
} 