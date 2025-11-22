import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';
import { useSavedEvents } from '../hooks';
import NotFoundPage from './NotFound';
import Button from '../components/ui/Button';
import { slugify } from '../utils/slug';

const CategoriaDetallePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isEventSaved, toggleSaveEvent } = useSavedEvents();
  const { events, loading } = useEvents();

  const category = useMemo(() => {
    return CATEGORIES.find(cat => slugify(cat.name) === slug);
  }, [slug]);

  const eventsInCategory = useMemo(() => {
    if (!category) return [];
    return events.filter(event => {
      // Normalise both event.category and category.name to slug to compare
      const eventSlug = slugify(event.category);
      const catSlug = slugify(category.name);
      return eventSlug === catSlug;
    });
  }, [category, events]);

  if (loading) {
    return <p className="text-center py-20">Cargando eventos...</p>;
  }

  if (!category) {
    return <NotFoundPage />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-dark mb-8">Eventos de: {category.name}</h1>
      {eventsInCategory.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {eventsInCategory.map(event => (
            <EventCard key={event.id} event={event} isSaved={isEventSaved(event.id)} onToggleSave={toggleSaveEvent} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-6 bg-white rounded-lg shadow-md">
          <h2 className="mt-4 text-2xl font-semibold text-dark">No hay eventos en esta categoría</h2>
          <p className="mt-2 text-gray-500">Pronto habrán nuevos eventos. ¡Vuelve a revisar!</p>
          <Link to="/categorias" className="mt-6 inline-block">
            <Button variant="primary">Ver todas las categorías</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoriaDetallePage;