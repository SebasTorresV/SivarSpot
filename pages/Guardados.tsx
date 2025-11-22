import React from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';
import { useSavedEvents } from '../hooks';
import Button from '../components/ui/Button';

const GuardadosPage: React.FC = () => {
  const { savedEvents, isEventSaved, toggleSaveEvent } = useSavedEvents();
  const { events, loading } = useEvents();
  
  // FIX: Removed 'as any' cast since savedEvents is now an array of strings.
  const savedEventsDetails = events.filter(event => savedEvents.includes(event.id));

  if (loading) {
    return <p className="text-center py-12">Cargando tus eventos guardados...</p>
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-dark mb-8">Mis Eventos Guardados</h1>
      {savedEventsDetails.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {savedEventsDetails.map(event => (
            // FIX: Removed 'as any' casts and corrected the onToggleSave prop to pass the function directly.
            <EventCard 
              key={event.id} 
              event={event} 
              isSaved={isEventSaved(event.id)} 
              onToggleSave={toggleSaveEvent}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-6 bg-white rounded-lg shadow-md">
          <h2 className="mt-4 text-2xl font-semibold text-dark">No tienes eventos guardados</h2>
          <p className="mt-2 text-gray-500">Explora los eventos y guarda los que más te interesen.</p>
          <Link to="/explorar" className="mt-6 inline-block">
            <Button variant="primary">Explorar Eventos</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default GuardadosPage;