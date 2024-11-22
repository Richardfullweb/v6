import React from 'react';
import { Calendar, Clock, MapPin, Users, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

interface VolunteerOpportunityProps {
  id: string;
  title: string;
  ministry: string;
  date: Date;
  time: string;
  location: string;
  spotsAvailable: number;
  description: string;
  skills: string[];
  onSignUp: (id: string) => void;
}

export default function VolunteerOpportunityCard({
  id,
  title,
  ministry,
  date,
  time,
  location,
  spotsAvailable,
  description,
  skills,
  onSignUp
}: VolunteerOpportunityProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{ministry}</p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {spotsAvailable} spots left
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-5 h-5 mr-2" />
          <span>{format(date, 'MMMM d, yyyy')}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-5 h-5 mr-2" />
          <span>{time}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-5 h-5 mr-2" />
          <span>{location}</span>
        </div>
      </div>

      <p className="mt-4 text-gray-600 line-clamp-2">{description}</p>

      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-1" />
          <span>{spotsAvailable} volunteers needed</span>
        </div>
        <button
          onClick={() => onSignUp(id)}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Sign Up
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
}