import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { Pencil, Trash } from '../icons';
import formatDate from '../utils/formatDate';

const OrganizePage: React.FC = () => {
  const { userProfile } = useAuth();
  const { events, loading, deleteEvent } = useEvents();

  const organizerEvents = useMemo(() => {
    if (!userProfile) return [];
    const organizerIdentifier = userProfile.companyName || userProfile.name;
    return events.filter(event => event.organizer === organizerIdentifier);
  }, [events, userProfile]);

  const handleDelete = async (eventId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer.')) {
      try {
        await deleteEvent(eventId);
      } catch (error) {
        console.error('Failed to delete event:', error);
        alert('No se pudo eliminar el evento.');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-dark mb-4">Panel de Organizador</h1>
        <p className="text-lg text-gray-600 mb-8">Aquí podrás crear y gestionar tus eventos.</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-12">
        {/* Create Event Card */}
        <div className="p-8 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-dark">¿Tienes una nueva idea?</h2>
          <p className="mt-2 text-gray-500">Comienza a dar a conocer tus actividades.</p>
          <Link to="/organizar/crear">
              <Button className="mt-6">Crear Nuevo Evento</Button>
          </Link>
        </div>

        {/* My Events Section */}
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-dark mb-6">Mis Eventos Creados</h2>
          {loading ? (
            <p className="text-gray-500 text-center">Cargando tus eventos...</p>
          ) : organizerEvents.length > 0 ? (
            <div className="space-y-4">
              {organizerEvents.map(event => (
                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-bold text-dark">{event.title}</p>
                    <p className="text-sm text-gray-500">{formatDate(event.date)}</p>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <Link to={`/organizar/editar/${event.id}`}>
                      <button aria-label="Editar evento" className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-colors">
                        <Pencil className="w-5 h-5" />
                      </button>
                    </Link>
                    <button onClick={() => handleDelete(event.id)} aria-label="Eliminar evento" className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors">
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Aún no has creado ningún evento.</p>
              <p className="text-gray-500">¡Crea uno para empezar!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizePage;
