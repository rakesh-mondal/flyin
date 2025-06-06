import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface PriceAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PriceAlertsModal = ({ isOpen, onClose }: PriceAlertsModalProps) => {
  const [email, setEmail] = useState('');
  const [directOnly, setDirectOnly] = useState(false);
  const [specialDeals, setSpecialDeals] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    toast.success('Price alerts enabled successfully!');
    onClose();
    // Reset form
    setEmail('');
    setDirectOnly(false);
    setSpecialDeals(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Receive alerts by email
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:border-[#194E91] focus:border-[#194E91] outline-none transition-colors"
              required
            />
          </div>

          {/* Direct Only Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="directOnly"
              checked={directOnly}
              onChange={(e) => setDirectOnly(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="directOnly" className="text-sm text-gray-700">
              Direct only
            </label>
          </div>

          {/* Special Deals Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="specialDeals"
              checked={specialDeals}
              onChange={(e) => setSpecialDeals(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="specialDeals" className="text-sm text-gray-700">
              Send me special Flyin.com deals and travel reminders
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground hover:text-[#194E91] font-medium py-3 rounded-lg transition-colors mt-6"
          >
            Enable 24h Price Tracking
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PriceAlertsModal; 