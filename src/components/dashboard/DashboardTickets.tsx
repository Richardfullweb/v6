import React, { useState } from 'react';
import { Search, Filter, Download, MoreVertical, Eye, Edit, Trash2, Check, X } from 'lucide-react';
import { format } from 'date-fns';

interface Ticket {
  id: string;
  eventName: string;
  purchaseDate: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  type: string;
  status: 'valid' | 'used' | 'cancelled' | 'refunded';
  price: number;
  paymentId: string;
  checkInTime?: string;
}

const mockTickets: Ticket[] = [
  {
    id: 'TK-2024-001',
    eventName: 'Eucharistic Revival Conference',
    purchaseDate: '2024-03-10',
    customer: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567'
    },
    type: 'General Admission',
    status: 'valid',
    price: 25.00,
    paymentId: 'PAY-001'
  },
  {
    id: 'TK-2024-002',
    eventName: 'Youth Prayer Night',
    purchaseDate: '2024-03-09',
    customer: {
      name: 'Maria Garcia',
      email: 'maria.garcia@example.com',
      phone: '+1 (555) 234-5678'
    },
    type: 'Early Bird',
    status: 'used',
    price: 20.00,
    paymentId: 'PAY-002',
    checkInTime: '2024-03-09 19:30'
  },
  {
    id: 'TK-2024-003',
    eventName: 'Lenten Retreat',
    purchaseDate: '2024-03-08',
    customer: {
      name: 'David Johnson',
      email: 'david.johnson@example.com',
      phone: '+1 (555) 345-6789'
    },
    type: 'Group Rate',
    status: 'cancelled',
    price: 15.00,
    paymentId: 'PAY-003'
  },
  {
    id: 'TK-2024-004',
    eventName: 'Parish Mission Week',
    purchaseDate: '2024-03-07',
    customer: {
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      phone: '+1 (555) 456-7890'
    },
    type: 'General Admission',
    status: 'refunded',
    price: 30.00,
    paymentId: 'PAY-004'
  }
];

export default function DashboardTickets() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showTicketDetails, setShowTicketDetails] = useState(false);

  const handleCheckIn = (ticketId: string) => {
    setTickets(tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          status: 'used' as const,
          checkInTime: format(new Date(), 'yyyy-MM-dd HH:mm')
        };
      }
      return ticket;
    }));
  };

  const handleCancelTicket = (ticketId: string) => {
    if (window.confirm('Are you sure you want to cancel this ticket?')) {
      setTickets(tickets.map(ticket => {
        if (ticket.id === ticketId) {
          return {
            ...ticket,
            status: 'cancelled' as const
          };
        }
        return ticket;
      }));
    }
  };

  const handleExportTickets = () => {
    // In a real application, this would generate a CSV or PDF file
    const csv = tickets.map(ticket => {
      return [
        ticket.id,
        ticket.eventName,
        ticket.customer.name,
        ticket.customer.email,
        ticket.type,
        ticket.status,
        ticket.price,
        ticket.purchaseDate
      ].join(',');
    }).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tickets-export-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'valid':
        return 'bg-green-100 text-green-800';
      case 'used':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Tickets Management</h1>
        <button 
          onClick={handleExportTickets}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Export Tickets</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets by ID, event, or customer..."
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
                <option value="valid">Valid</option>
                <option value="used">Used</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purchase Date
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {ticket.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.eventName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ticket.customer.name}</div>
                    <div className="text-sm text-gray-500">{ticket.customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      {ticket.checkInTime && (
                        <span className="ml-1 text-xs">({format(new Date(ticket.checkInTime), 'HH:mm')})</span>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${ticket.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(ticket.purchaseDate), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {ticket.status === 'valid' && (
                        <button
                          onClick={() => handleCheckIn(ticket.id)}
                          className="text-green-600 hover:text-green-700"
                          title="Check In"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedTicket(ticket);
                          setShowTicketDetails(true);
                        }}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      {ticket.status === 'valid' && (
                        <button
                          onClick={() => handleCancelTicket(ticket.id)}
                          className="text-red-600 hover:text-red-700"
                          title="Cancel Ticket"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Details Modal */}
      {showTicketDetails && selectedTicket && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowTicketDetails(false)} />
            
            <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-semibold text-gray-900">Ticket Details</h2>
                <button onClick={() => setShowTicketDetails(false)} className="text-gray-400 hover:text-gray-500">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Ticket Information</h3>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm text-gray-900">ID: {selectedTicket.id}</p>
                      <p className="text-sm text-gray-900">Event: {selectedTicket.eventName}</p>
                      <p className="text-sm text-gray-900">Type: {selectedTicket.type}</p>
                      <p className="text-sm text-gray-900">Price: ${selectedTicket.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-900">Payment ID: {selectedTicket.paymentId}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Customer Information</h3>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm text-gray-900">Name: {selectedTicket.customer.name}</p>
                      <p className="text-sm text-gray-900">Email: {selectedTicket.customer.email}</p>
                      <p className="text-sm text-gray-900">Phone: {selectedTicket.customer.phone}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status History</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-900">Purchase Date:</span>
                      <span className="text-gray-500">{format(new Date(selectedTicket.purchaseDate), 'MMM d, yyyy HH:mm')}</span>
                    </div>
                    {selectedTicket.checkInTime && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-900">Check-in Time:</span>
                        <span className="text-gray-500">{format(new Date(selectedTicket.checkInTime), 'MMM d, yyyy HH:mm')}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-900">Current Status:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedTicket.status)}`}>
                        {selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-4">
                <button
                  onClick={() => setShowTicketDetails(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}