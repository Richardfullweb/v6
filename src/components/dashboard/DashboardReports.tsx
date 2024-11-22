import React, { useState } from 'react';
import { Download, Calendar, TrendingUp, DollarSign, Users, Ticket, ChevronDown } from 'lucide-react';
import { exportReportToPDF } from '../../utils/pdfExport';

interface ReportMetric {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

interface ReportData {
  metrics: ReportMetric[];
  salesData: {
    date: string;
    revenue: number;
    tickets: number;
  }[];
  topEvents: {
    name: string;
    tickets: number;
    revenue: number;
  }[];
}

const mockReportData: ReportData = {
  metrics: [
    { label: 'Total Revenue', value: '$45,233', trend: '+18.2%', trendUp: true },
    { label: 'Tickets Sold', value: '8,647', trend: '+23.1%', trendUp: true },
    { label: 'Average Price', value: '$28.50', trend: '-2.4%', trendUp: false },
    { label: 'Conversion Rate', value: '3.8%', trend: '+12.5%', trendUp: true },
  ],
  salesData: [
    { date: '2024-03-01', revenue: 5200, tickets: 180 },
    { date: '2024-03-02', revenue: 4800, tickets: 165 },
    { date: '2024-03-03', revenue: 6100, tickets: 210 },
    { date: '2024-03-04', revenue: 5900, tickets: 195 },
    { date: '2024-03-05', revenue: 7200, tickets: 245 },
    { date: '2024-03-06', revenue: 6800, tickets: 230 },
    { date: '2024-03-07', revenue: 8100, tickets: 275 },
  ],
  topEvents: [
    { name: 'Eucharistic Revival Conference', tickets: 450, revenue: 12500 },
    { name: 'Young Adult Retreat', tickets: 320, revenue: 8800 },
    { name: 'Parish Mission Week', tickets: 280, revenue: 7200 },
    { name: 'Lenten Prayer Service', tickets: 210, revenue: 5250 },
    { name: 'Catholic Youth Night', tickets: 185, revenue: 4625 },
  ],
};

const dateRangeLabels = {
  '7days': 'Last 7 days',
  '30days': 'Last 30 days',
  '90days': 'Last 3 months',
  'year': 'Last year'
};

export default function DashboardReports() {
  const [dateRange, setDateRange] = useState('7days');
  const [reportType, setReportType] = useState('all');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportReportToPDF(mockReportData, dateRangeLabels[dateRange as keyof typeof dateRangeLabels]);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
        <div className="flex items-center space-x-4">
          <select
            className="rounded-md border-gray-300 text-sm focus:ring-red-500 focus:border-red-500"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            {Object.entries(dateRangeLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2 ${
              isExporting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            <Download className="h-4 w-4" />
            <span>{isExporting ? 'Exporting...' : 'Export Report'}</span>
          </button>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockReportData.metrics.map((metric) => (
          <div key={metric.label} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">{metric.label}</h3>
              <span className={`inline-flex items-center text-sm ${
                metric.trendUp ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className={`h-4 w-4 mr-1 ${
                  metric.trendUp ? '' : 'transform rotate-180'
                }`} />
                {metric.trend}
              </span>
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Report Types */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-md ${
              reportType === 'all'
                ? 'bg-red-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setReportType('all')}
          >
            All Reports
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              reportType === 'sales'
                ? 'bg-red-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setReportType('sales')}
          >
            Sales
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              reportType === 'tickets'
                ? 'bg-red-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setReportType('tickets')}
          >
            Tickets
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              reportType === 'events'
                ? 'bg-red-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setReportType('events')}
          >
            Events
          </button>
        </div>

        {/* Sales Chart */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-600 rounded-full mr-1"></div>
                <span className="text-sm text-gray-600">Revenue</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-200 rounded-full mr-1"></div>
                <span className="text-sm text-gray-600">Tickets</span>
              </div>
            </div>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Sales Chart Visualization</span>
          </div>
        </div>
      </div>

      {/* Top Events */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Events</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tickets Sold
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockReportData.topEvents.map((event, index) => (
                  <tr key={event.name}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{event.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{event.tickets}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${event.revenue.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-red-600 rounded-full"
                          style={{
                            width: `${(event.revenue / mockReportData.topEvents[0].revenue) * 100}%`,
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}