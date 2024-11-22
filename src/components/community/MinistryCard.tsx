import React from 'react';
import { Users, Calendar, MessageCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MinistryCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  memberCount: number;
  meetingSchedule: string;
  parish: string;
  category: string;
}

export default function MinistryCard({
  id,
  name,
  description,
  imageUrl,
  memberCount,
  meetingSchedule,
  parish,
  category
}: MinistryCardProps) {
  return (
    <Link to={`/ministry/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
        <div className="relative h-48">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {category}
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
          
          <div className="text-sm text-gray-500 mb-4">{parish}</div>
          
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-2" />
              <span>{memberCount} members</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{meetingSchedule}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MessageCircle className="w-5 h-5 mr-2" />
              <span>Active discussions</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}