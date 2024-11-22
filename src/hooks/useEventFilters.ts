import { useState, useMemo } from 'react';
import { Event } from '../types/event';
import { isSameDay, parseISO } from 'date-fns';

export interface EventFilters {
  query: string;
  date: string;
  location: string;
  type: string;
}

export function useEventFilters(events: Event[]) {
  const [filters, setFilters] = useState<EventFilters>({
    query: '',
    date: '',
    location: '',
    type: '',
  });

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Text search
      const searchQuery = filters.query.toLowerCase();
      const matchesQuery = !filters.query || 
        event.title.toLowerCase().includes(searchQuery) ||
        event.description.toLowerCase().includes(searchQuery) ||
        event.parish.toLowerCase().includes(searchQuery);

      // Date filter
      const matchesDate = !filters.date || 
        isSameDay(event.date, parseISO(filters.date));

      // Location filter
      const matchesLocation = !filters.location ||
        event.location.toLowerCase().includes(filters.location.toLowerCase());

      // Type filter
      const matchesType = !filters.type ||
        event.category.toLowerCase() === filters.type.toLowerCase();

      return matchesQuery && matchesDate && matchesLocation && matchesType;
    });
  }, [events, filters]);

  return {
    filters,
    setFilters,
    filteredEvents,
  };
}