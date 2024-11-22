import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';

interface CreateCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (couponData: any) => void;
}

export default function CreateCouponModal({ isOpen, onClose, onSubmit }: CreateCouponModalProps) {
  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage',
    value: '',
    event: '',
    usageLimit: '',
    expiryDate: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        
        <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-semibold text-gray-900">Create New Coupon</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  id="code"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="e.g., SUMMER2024"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Discount Type *
                </label>
                <select
                  id="type"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="percentage">Percentage Discount</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>

              <div>
                <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                  Discount Value *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    id="value"
                    required
                    min="0"
                    max={formData.type === 'percentage' ? '100' : undefined}
                    className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-red-500 focus:ring-red-500"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm">
                      {formData.type === 'percentage' ? '%' : '$'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="event" className="block text-sm font-medium text-gray-700">
                  Event *
                </label>
                <select
                  id="event"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  value={formData.event}
                  onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                >
                  <option value="">Select an event</option>
                  <option value="1">Eucharistic Revival Conference</option>
                  <option value="2">Young Adult Retreat</option>
                  <option value="3">Parish Mission Week</option>
                </select>
              </div>

              <div>
                <label htmlFor="usageLimit" className="block text-sm font-medium text-gray-700">
                  Usage Limit *
                </label>
                <input
                  type="number"
                  id="usageLimit"
                  required
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                  Expiry Date *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    id="expiryDate"
                    required
                    className="block w-full pl-10 rounded-md border-gray-300 focus:border-red-500 focus:ring-red-500"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter coupon description..."
              />
            </div>

            <div className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Create Coupon
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}