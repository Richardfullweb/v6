import React from 'react';
import { Calendar, Clock, MapPin, Heart, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Event } from '../types/event';

export default function EventCard(event: Event) {
  return (
    <Link to={`/event/${event.id}`}>
      <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <div className="relative h-56">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-red-600 px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
            {event.category}
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
              {event.title}
            </h3>
            <p className="text-red-100 text-sm drop-shadow-lg">{event.parish}</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2 text-red-500" />
              <span>{format(event.date, 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2 text-red-500" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2 text-red-500" />
              <span>{event.location}</span>
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-red-500" />
              <span className="text-sm text-gray-600">43 participantes</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-red-600 mr-2">
                {event.price === 0 ? 'Gratuito' : `R$ ${event.price}`}
              </span>
              <Heart className="h-5 w-5 text-red-400 transition-transform group-hover:scale-110 group-hover:text-red-600" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}