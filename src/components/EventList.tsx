import React from 'react';
import EventCard from './EventCard';
import CategoryFilter from './CategoryFilter';
import SearchFilter from './SearchFilter';
import { useEventFilters } from '../hooks/useEventFilters';
import { useEvents } from '../hooks/useSupabase';
import { Cross, Heart, Calendar, MapPin } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

export default function EventList() {
  const { events, loading, error } = useEvents();
  const { filters, setFilters, filteredEvents } = useEventFilters(events);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 rounded-lg p-8 max-w-lg mx-auto">
          <h3 className="text-xl font-medium text-red-900 mb-2">Erro ao carregar eventos</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-primary-dark to-primary pt-32 pb-48">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519892338685-86566ba02b3c')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-full p-4">
              <Cross className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 font-serif">
            Encontre Eventos Católicos
            <br />
            <span className="text-secondary">Perto de Você</span>
          </h1>
          <p className="text-white/90 text-xl max-w-2xl mx-auto leading-relaxed">
            Participe de momentos especiais de fé, oração e celebração em sua comunidade
          </p>
          
          {/* Featured Events Preview */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {events.slice(0, 3).map((event) => (
              <div key={event.id} className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-left">
                <div className="flex items-center space-x-3 mb-3">
                  <Calendar className="h-5 w-5 text-secondary" />
                  <span className="text-white/90">{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <h3 className="text-white font-semibold mb-2">{event.title}</h3>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-secondary" />
                  <span className="text-white/90">{event.location}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center mt-8 space-x-4">
            <span className="flex items-center text-white/90">
              <Heart className="h-5 w-5 mr-2" fill="currentColor" />
              {events.length} eventos disponíveis
            </span>
          </div>
        </div>

        <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-gray-50"></div>
      </div>

      {/* Search Section */}
      <SearchFilter filters={filters} onFilterChange={setFilters} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryFilter />

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-primary/5 rounded-lg p-8 max-w-lg mx-auto">
              <h3 className="text-xl font-medium text-primary mb-2">Nenhum evento encontrado</h3>
              <p className="text-gray-600">Tente ajustar seus filtros de busca</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/5 via-white to-primary/5 py-12 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Não encontrou o que procura?
            </h2>
            <p className="text-gray-600 mb-6">
              Entre em contato conosco e ajudaremos você a encontrar o evento perfeito
            </p>
            <button className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Fale Conosco
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}