import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ChevronLeft, Users } from 'lucide-react';
import { format } from 'date-fns';
import { events } from '../data/events';
import RegisterModal from './RegisterModal';
import TicketPurchase from './TicketPurchase';

export default function EventDetails() {
  const { id } = useParams();
  const event = events.find(e => e.id === id);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isTicketPurchaseOpen, setIsTicketPurchaseOpen] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Event not found</h2>
          <Link to="/" className="mt-4 text-red-600 hover:text-red-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 pb-12">
        <div className="relative h-96">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <Link
            to="/"
            className="absolute top-4 left-4 flex items-center text-white hover:text-gray-200"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 -mt-32 relative">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  {event.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
                <p className="text-gray-600 mb-6">{event.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{format(event.date, 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Schedule</h2>
                <div className="space-y-4">
                  {event.schedule.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start border-l-2 border-red-600 pl-4 pb-4"
                    >
                      <div className="min-w-[100px] font-semibold text-gray-900">
                        {item.time}
                      </div>
                      <div className="text-gray-600">{item.activity}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Organizer</h2>
                <div className="flex items-center">
                  <img
                    src={event.organizer.imageUrl}
                    alt={event.organizer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">{event.organizer.name}</div>
                    <div className="text-gray-600 text-sm">{event.organizer.role}</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <button 
                  onClick={() => setIsTicketPurchaseOpen(true)}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors mb-4"
                >
                  Purchase Tickets
                </button>
                <button 
                  onClick={() => setIsRegisterOpen(true)}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors mb-4"
                >
                  Register for Free
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Users className="w-5 h-5 mr-2" />
                  Share Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isRegisterOpen && (
        <RegisterModal 
          event={event}
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
        />
      )}

      {isTicketPurchaseOpen && (
        <TicketPurchase 
          event={event}
          onClose={() => setIsTicketPurchaseOpen(false)}
        />
      )}
    </>
  );
}