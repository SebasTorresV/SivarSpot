import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../types';
import { Bookmark, Calendar, MapPin } from '../icons';
import formatDate from '../utils/formatDate';

interface EventCardProps {
  event: Event;
  isSaved: boolean;
  // FIX: The event ID is a string, so the onToggleSave function should expect a string.
  onToggleSave: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, isSaved, onToggleSave }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-2xl flex flex-col">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={event.imageUrl} alt={event.title} />
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleSave(event.id); }} 
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:text-red-500 transition-colors"
          aria-label={isSaved ? "Quitar de guardados" : "Guardar evento"}
        >
          <Bookmark className={`w-6 h-6 ${isSaved ? 'text-red-500 fill-current' : ''}`} />
        </button>
        <div className="absolute bottom-0 left-0 bg-primary/80 text-white px-3 py-1 text-sm font-semibold rounded-tr-lg">
          {event.price === 0 ? 'Gratis' : `$${event.price.toFixed(2)}`}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm font-semibold text-primary">{event.category.toUpperCase()}</p>
        <h3 className="text-lg font-bold text-dark mt-1 mb-2">{event.title}</h3>
        <div className="flex items-center text-gray-500 text-sm mt-auto">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm mt-2">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="truncate">{event.location}</span>
        </div>
        <Link to={`/event/${event.id}`} className="mt-4 w-full text-center bg-secondary text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
            Ver Detalles
        </Link>
      </div>
    </div>
  );
};

export default EventCard;