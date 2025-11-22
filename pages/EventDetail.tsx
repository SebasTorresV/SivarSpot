import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useSavedEvents } from '../hooks';
import formatDate from '../utils/formatDate';
import { Calendar, MapPin, Star, Bookmark } from '../icons';
import Button from '../components/ui/Button';
import NotFoundPage from './NotFound';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { events, loading } = useEvents();
  const event = events.find(e => e.id === id);
  const { isEventSaved, toggleSaveEvent } = useSavedEvents();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (loading) {
    return <p className="text-center py-20">Cargando evento...</p>;
  }

  if (!event) {
    return <NotFoundPage />;
  }
  
  // FIX: Removed 'as any' cast as useSavedEvents now correctly handles string IDs.
  const isSaved = isEventSaved(event.id);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <img src={event.imageUrl} alt={event.title} className="w-full h-64 md:h-full object-cover"/>
            <div className="p-8">
              <span className="text-sm font-semibold text-primary">{event.category.toUpperCase()}</span>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-dark mt-2">{event.title}</h1>
              <p className="text-gray-500 mt-4 text-lg">{event.description}</p>
              
              <div className="mt-8 space-y-4">
                  <div className="flex items-center">
                      <Calendar className="w-6 h-6 text-primary mr-3"/>
                      <div>
                          <p className="font-semibold text-dark">Fecha y Hora</p>
                          <p className="text-gray-600">{formatDate(event.date)}</p>
                      </div>
                  </div>
                  <div className="flex items-center">
                      <MapPin className="w-6 h-6 text-primary mr-3"/>
                      <div>
                          <p className="font-semibold text-dark">Ubicación</p>
                          <p className="text-gray-600">{event.location}</p>
                      </div>
                  </div>
                  <div className="flex items-center">
                      <Star className="w-6 h-6 text-primary mr-3"/>
                      <div>
                          <p className="font-semibold text-dark">Precio</p>
                          <p className="text-gray-600">{event.price === 0 ? 'Gratis' : `$${event.price.toFixed(2)}`}</p>
                      </div>
                  </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Button variant="secondary" className="w-full sm:w-auto flex-1">Comprar Tickets</Button>
                  {/* FIX: Removed 'as any' cast as useSavedEvents now correctly handles string IDs. */}
                  <Button variant="outline" className="w-full sm:w-auto" onClick={() => toggleSaveEvent(event.id)}>
                      <Bookmark className={`w-5 h-5 mr-2 ${isSaved ? 'text-red-500 fill-current' : ''}`} />
                      {isSaved ? 'Guardado' : 'Guardar'}
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;