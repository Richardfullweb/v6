import React from 'react';
import { Cross, Heart, Users, Music, Book, Star, Sun, Coffee } from 'lucide-react';

const categories = [
  { name: 'Todos os Eventos', icon: Cross },
  { name: 'Missa', icon: Heart },
  { name: 'Adoração', icon: Star },
  { name: 'Retiros', icon: Sun },
  { name: 'Juventude', icon: Users },
  { name: 'Eventos Paroquiais', icon: Coffee },
  { name: 'Conferências', icon: Book },
  { name: 'Grupos de Oração', icon: Music }
];

export default function CategoryFilter() {
  return (
    <div className="flex space-x-4 overflow-x-auto py-4 scrollbar-hide">
      {categories.map(({ name, icon: Icon }) => (
        <button
          key={name}
          className={`flex items-center px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-200 ${
            name === 'Todos os Eventos'
              ? 'bg-red-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
              : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 hover:shadow-md'
          }`}
        >
          <Icon className="h-5 w-5 mr-2" />
          {name}
        </button>
      ))}
    </div>
  );
}