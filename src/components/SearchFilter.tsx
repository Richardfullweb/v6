import React from 'react';
import { Search, Calendar, MapPin, Filter } from 'lucide-react';
import { EventFilters } from '../hooks/useEventFilters';

interface SearchFilterProps {
  filters: EventFilters;
  onFilterChange: (filters: EventFilters) => void;
}

export default function SearchFilter({ filters, onFilterChange }: SearchFilterProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 -mt-28 relative z-10 border border-red-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-red-400" />
            <input
              type="text"
              placeholder="Buscar eventos..."
              className="w-full pl-12 pr-4 py-3 border border-red-100 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
              value={filters.query}
              onChange={(e) => onFilterChange({ ...filters, query: e.target.value })}
            />
          </div>

          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-red-400" />
            <input
              type="date"
              className="w-full pl-12 pr-4 py-3 border border-red-100 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
              value={filters.date}
              onChange={(e) => onFilterChange({ ...filters, date: e.target.value })}
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-red-400" />
            <input
              type="text"
              placeholder="Localização..."
              className="w-full pl-12 pr-4 py-3 border border-red-100 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
              value={filters.location}
              onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-red-400" />
            <select
              className="w-full pl-12 pr-4 py-3 border border-red-100 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent appearance-none bg-white transition-all"
              value={filters.type}
              onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
            >
              <option value="">Todos os Tipos</option>
              <option value="Mass">Missa</option>
              <option value="Adoration">Adoração</option>
              <option value="Retreats">Retiros</option>
              <option value="Youth">Juventude</option>
              <option value="Parish Events">Eventos Paroquiais</option>
              <option value="Conferences">Conferências</option>
              <option value="Prayer Groups">Grupos de Oração</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}