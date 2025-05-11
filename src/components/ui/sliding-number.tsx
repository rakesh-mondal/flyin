'use client';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper to split number into digits
function getDigits(value: number) {
  return value.toString().split('');
}

type SlidingNumberProps = {
  value: number;
  padStart?: boolean;
  decimalSeparator?: string;
};

export function SlidingNumber({
  value,
  padStart = false,
  decimalSeparator = '.',
}: SlidingNumberProps) {
  const absValue = Math.abs(value);
  const [integerPart, decimalPart] = absValue.toString().split('.');
  const integerValue = parseInt(integerPart, 10);
  const paddedInteger =
    padStart && integerValue < 10 ? `0${integerPart}` : integerPart;
  const integerDigits = paddedInteger.split('');

  // Store previous value to determine animation direction
  const prevValue = useRef<number>(value);
  const direction = value > prevValue.current ? 1 : -1;
  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return (
    <div className="flex items-center">
      {value < 0 && '-'}
      {integerDigits.map((digit, idx) => (
        <Digit
          key={idx}
          digit={digit}
          direction={direction}
        />
      ))}
      {decimalPart && (
        <>
          <span>{decimalSeparator}</span>
          {decimalPart.split('').map((digit, idx) => (
            <Digit
              key={`decimal-${idx}`}
              digit={digit}
              direction={direction}
            />
          ))}
        </>
      )}
    </div>
  );
}

function Digit({ digit, direction }: { digit: string; direction: number }) {
  return (
    <span className="relative inline-block w-[1ch] overflow-x-visible overflow-y-clip leading-none tabular-nums">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={digit}
          initial={{ y: direction > 0 ? 24 : -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: direction > 0 ? -24 : 24, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="absolute left-0 right-0"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
      <span className="invisible">0</span>
    </span>
  );
} 