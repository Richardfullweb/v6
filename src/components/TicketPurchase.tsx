import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CreditCard, Users, Shield, X } from 'lucide-react';
import { format } from 'date-fns';
import { Event } from '../types/event';

interface TicketPurchaseProps {
  event: Event;
  onClose: () => void;
}

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
}

const ticketTypes: TicketType[] = [
  {
    id: 'general',
    name: 'General Admission',
    price: 25,
    description: 'Access to all conference sessions and materials',
    available: 100
  },
  {
    id: 'early',
    name: 'Early Bird',
    price: 20,
    description: 'Limited time offer - 20% off general admission',
    available: 50
  },
  {
    id: 'group',
    name: 'Group (5+ tickets)',
    price: 20,
    description: 'Special rate for groups of 5 or more',
    available: 200
  }
];

export default function TicketPurchase({ event, onClose }: TicketPurchaseProps) {
  const [selectedTicket, setSelectedTicket] = useState<string>('general');
  const [quantity, setQuantity] = useState<number>(1);
  const [step, setStep] = useState<number>(1);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
    email: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedTicketType = ticketTypes.find(t => t.id === selectedTicket);
  const subtotal = (selectedTicketType?.price || 0) * quantity;
  const serviceFee = subtotal * 0.1;
  const total = subtotal + serviceFee;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Reset after showing success message
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            {/* Ticket Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Your Tickets</h2>
              <div className="space-y-4">
                {ticketTypes.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedTicket === ticket.id
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-red-600'
                    }`}
                    onClick={() => setSelectedTicket(ticket.id)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{ticket.name}</h3>
                        <p className="text-sm text-gray-600">{ticket.description}</p>
                      </div>
                      <div className="text-xl font-bold text-gray-900">${ticket.price}</div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>{ticket.available} tickets available</span>
                      {selectedTicket === ticket.id && (
                        <div className="flex items-center space-x-2">
                          <button
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              setQuantity(Math.max(1, quantity - 1));
                            }}
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{quantity}</span>
                          <button
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              setQuantity(Math.min(selectedTicketType?.available || 0, quantity + 1));
                            }}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={paymentDetails.name}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={paymentDetails.email}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={paymentDetails.phone}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Details</h2>
              <form onSubmit={handlePayment} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={paymentDetails.expiry}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      value={paymentDetails.cvc}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, cvc: e.target.value })}
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-3 px-4 rounded-md text-white ${
                    isProcessing ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
                  } transition-colors`}
                >
                  {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                </button>
              </form>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <div className="mb-4 text-green-500">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Purchase Successful!</h2>
          <p className="text-gray-600">Your tickets have been confirmed. Check your email for details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-gray-50 rounded-lg max-w-4xl w-full relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-8">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= s ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {s}
                    </div>
                    {s < 3 && (
                      <div className={`w-24 h-1 ${
                        step > s ? 'bg-red-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Select Tickets</span>
                <span>Details</span>
                <span>Payment</span>
              </div>
            </div>

            {/* Event Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
                <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                  {event.category}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{format(event.date, 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            {/* Current Step Content */}
            {renderStep()}

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Tickets ({quantity}x)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 text-center text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <Shield className="w-6 h-6 text-red-600 mb-2" />
                <span>Secure Payment</span>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-6 h-6 text-red-600 mb-2" />
                <span>Instant Confirmation</span>
              </div>
              <div className="flex flex-col items-center">
                <CreditCard className="w-6 h-6 text-red-600 mb-2" />
                <span>Money-back Guarantee</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => step > 1 ? setStep(step - 1) : onClose}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                {step > 1 ? 'Back' : 'Cancel'}
              </button>
              {step < 3 && (
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}