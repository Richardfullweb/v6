import React from 'react';
import { Heart, Mail, MapPin } from 'lucide-react';

interface PrayerPartnerCardProps {
  name: string;
  imageUrl: string;
  location: string;
  prayerInterests: string[];
  email: string;
  matchPercentage: number;
}

export default function PrayerPartnerCard({
  name,
  imageUrl,
  location,
  prayerInterests,
  email,
  matchPercentage
}: PrayerPartnerCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              src={imageUrl}
              alt={name}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div className="absolute -bottom-2 -right-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              {matchPercentage}% Match
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          
          <div className="flex items-center text-gray-600 text-sm mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>

          <div className="mt-3">
            <div className="flex flex-wrap gap-2">
              {prayerInterests.map((interest, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                >
                  <Heart className="h-3 w-3 mr-1" />
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => window.location.href = `mailto:${email}`}
          className="flex items-center justify-center px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors"
        >
          <Mail className="h-4 w-4 mr-2" />
          Connect
        </button>
      </div>
    </div>
  );
}