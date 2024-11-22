import React from 'react';
import { Users, Ticket, Calendar, DollarSign, TrendingUp, ArrowUpRight } from 'lucide-react';

const stats = [
  { name: 'Total Users', value: '2,543', icon: Users, trend: '+12.5%' },
  { name: 'Tickets Sold', value: '8,647', icon: Ticket, trend: '+23.1%' },
  { name: 'Active Events', value: '186', icon: Calendar, trend: '+4.3%' },
  { name: 'Revenue', value: '$45,233', icon: DollarSign, trend: '+18.2%' },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        <div className="flex items-center space-x-3">
          <select className="rounded-md border-gray-300 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-red-50 rounded-lg">
                <stat.icon className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                {stat.trend}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-red-600 hover:text-red-700">View all</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <ArrowUpRight className="h-4 w-4 text-red-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">New ticket purchase</p>
                  <p className="text-sm text-gray-500">John Doe purchased 2 tickets for Youth Retreat</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
            <button className="text-sm text-red-600 hover:text-red-700">View all</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Youth Prayer Night</p>
                    <p className="text-xs text-gray-500">March 15, 2024 • 7:00 PM</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-red-600">
                  43 registered
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}