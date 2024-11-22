import React, { useState } from 'react';
import { Search, Filter, Plus, Tag, Copy, Trash2, Edit } from 'lucide-react';
import CreateCouponModal from './CreateCouponModal';

interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  event: string;
  usageLimit: number;
  usageCount: number;
  expiryDate: string;
  status: 'active' | 'expired' | 'depleted';
}

const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'EASTER2024',
    type: 'percentage',
    value: 20,
    event: 'Eucharistic Revival Conference',
    usageLimit: 100,
    usageCount: 45,
    expiryDate: '2024-04-30',
    status: 'active'
  },
  {
    id: '2',
    code: 'YOUTH10',
    type: 'fixed',
    value: 10,
    event: 'Young Adult Retreat',
    usageLimit: 50,
    usageCount: 50,
    expiryDate: '2024-05-15',
    status: 'depleted'
  },
  {
    id: '3',
    code: 'LENT2024',
    type: 'percentage',
    value: 15,
    event: 'Parish Mission Week',
    usageLimit: 200,
    usageCount: 0,
    expiryDate: '2024-03-01',
    status: 'expired'
  }
];

export default function DashboardCoupons() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const getStatusColor = (status: Coupon['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'depleted':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateCoupon = (couponData: any) => {
    // Handle coupon creation here
    console.log('Creating coupon:', couponData);
  };

  const filteredCoupons = mockCoupons.filter(coupon => {
    const matchesSearch = 
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.event.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || coupon.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Coupons Management</h1>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Coupon</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search coupons..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:border-transparent appearance-none bg-white"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="depleted">Depleted</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoupons.map((coupon) => (
            <div key={coupon.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Tag className="h-5 w-5 text-red-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{coupon.code}</h3>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(coupon.status)}`}>
                  {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <p className="text-sm text-gray-600">{coupon.event}</p>
                <p className="text-lg font-semibold text-gray-900">
                  {coupon.type === 'percentage' ? `${coupon.value}% OFF` : `$${coupon.value} OFF`}
                </p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Usage: {coupon.usageCount}/{coupon.usageLimit}</span>
                  <span>Expires: {coupon.expiryDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-gray-500">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-500">
                    <Copy className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-500">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-600 rounded-full"
                    style={{ width: `${(coupon.usageCount / coupon.usageLimit) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateCouponModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCoupon}
      />
    </>
  );
}