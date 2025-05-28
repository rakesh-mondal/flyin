import React, { useState } from 'react';
import TopHeader from '../TripCuration/TopHeader';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CreditCard, Building2, Trash2, Eye, EyeOff } from 'lucide-react';

const PaymentPage = ({ trip }: { trip: any }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'netbanking'>('card');
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [saveCard, setSaveCard] = useState(false);
  const [showCVV, setShowCVV] = useState(false);

  // Mock saved card data
  const savedCards = [
    {
      id: '4589',
      number: '**** **** **** 4589',
      holder: 'Mr Ankush Panda',
      expiry: '05/26'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <TopHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Payment Form */}
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h1 className="text-xl font-semibold text-gray-900 mb-6">Select a Payment Method</h1>
              
              {/* Payment Method Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setSelectedPaymentMethod('card')}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                    selectedPaymentMethod === 'card'
                      ? 'border-[#194a8f] text-[#194a8f]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  Credit/Debit Card
                </button>
                <button
                  onClick={() => setSelectedPaymentMethod('netbanking')}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                    selectedPaymentMethod === 'netbanking'
                      ? 'border-[#194a8f] text-[#194a8f]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  Net Banking
                </button>
              </div>

              {selectedPaymentMethod === 'card' && (
                <div className="space-y-6">
                  {/* Saved Cards */}
                  {savedCards.length > 0 && (
                    <div className="space-y-4">
                      {savedCards.map((card) => (
                        <div key={card.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                id={`card-${card.id}`}
                                name="selectedCard"
                                value={card.id}
                                checked={selectedCard === card.id}
                                onChange={(e) => setSelectedCard(e.target.value)}
                                className="w-4 h-4 text-[#194a8f] border-gray-300 focus:ring-[#194a8f]"
                              />
                              <div>
                                <div className="font-medium text-gray-900">{card.number}</div>
                                <div className="text-sm text-gray-500">{card.holder}</div>
                                <div className="text-sm text-gray-500">Expires {card.expiry}</div>
                              </div>
                            </div>
                            <button className="text-red-500 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Card Number */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Card Number</Label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="1234567890123456"
                        className="pl-10"
                        maxLength={19}
                      />
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                        <div className="w-6 h-4 bg-orange-500 rounded-sm"></div>
                        <div className="w-6 h-4 bg-gray-300 rounded-sm"></div>
                      </div>
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Cardholder Name</Label>
                    <Input
                      type="text"
                      placeholder="Name as per card"
                    />
                  </div>

                  {/* Expiry Date and CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Expiry Date</Label>
                      <Input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">CVV</Label>
                      <div className="relative">
                        <Input
                          type={showCVV ? "text" : "password"}
                          placeholder="•••"
                          maxLength={4}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCVV(!showCVV)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCVV ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Save Card Checkbox */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saveCard"
                      checked={saveCard}
                      onCheckedChange={(checked) => setSaveCard(checked as boolean)}
                    />
                    <Label htmlFor="saveCard" className="text-sm text-gray-700">
                      Save this card for future payments
                    </Label>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-700 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Your payment information is secure and encrypted
                    </div>
                  </div>
                </div>
              )}

              {selectedPaymentMethod === 'netbanking' && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Select your bank</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sbi">State Bank of India</SelectItem>
                        <SelectItem value="hdfc">HDFC Bank</SelectItem>
                        <SelectItem value="icici">ICICI Bank</SelectItem>
                        <SelectItem value="axis">Axis Bank</SelectItem>
                        <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Booking Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Booking Summary</h2>
                <button className="text-[#194a8f] text-sm font-medium">Details</button>
              </div>

              {/* Route */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">Jeddah</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="font-medium text-gray-900">Dubai</span>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">Round Trip</span>
              </div>

              {/* Flight Details */}
              <div className="space-y-4 mb-6">
                {/* Departure */}
                <div>
                  <div className="text-sm text-gray-500 mb-1">Departure - Thu, May 22 - 3h 5m</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">14:35</span>
                      <span className="text-sm text-gray-500">JED</span>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">18:40</span>
                      <span className="text-sm text-gray-500">DXB</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">King Abdulaziz Int'l → Dubai Int'l</div>
                </div>

                {/* Return */}
                <div>
                  <div className="text-sm text-gray-500 mb-1">Return - Tue, May 27 - 3h 5m</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">16:10</span>
                      <span className="text-sm text-gray-500">DXB</span>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">18:15</span>
                      <span className="text-sm text-gray-500">JED</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Dubai Int'l → King Abdulaziz Int'l</div>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                <div className="flex items-center gap-2 text-green-700 text-sm font-medium mb-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  24-hour free cancellation available
                </div>
                <div className="text-green-600 text-xs">
                  You can cancel this booking without charges within 24 hours of booking.
                </div>
              </div>

              {/* Price Details */}
              <div className="space-y-3 mb-6">
                <h3 className="font-semibold text-gray-900">Price Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Base fare</span>
                    <span className="font-medium">₹16,200.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes & fees</span>
                    <span className="font-medium">₹3,462.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-green-600">-₹0.00</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total Amount</span>
                      <span className="font-bold text-lg">₹19,662.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pay Now Button */}
              <button className="w-full bg-[#194a8f] text-white font-semibold py-3 rounded-lg hover:bg-[#143a7a] transition-colors">
                Pay now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 