import React from 'react';
import EventCard from '../components/EventCard';
import { useSavedEvents } from '../hooks';
import { useEvents } from '../context/EventContext';

const EventosPage: React.FC = () => {
  const { isEventSaved, toggleSaveEvent } = useSavedEvents();
  const { events, loading } = useEvents();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-dark mb-8">Todos los Eventos</h1>
      {loading ? (
        <p className="text-center text-gray-500">Cargando eventos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {events.map(event => (
            <EventCard key={event.id} event={event} isSaved={isEventSaved(event.id)} onToggleSave={toggleSaveEvent} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventosPage;