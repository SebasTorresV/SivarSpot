import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES } from '../constants';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Event } from '../types';

// Page for editing an existing event. Loads the event from context based on the
// route parameter and pre-populates a form. On submit it sends a PUT request
// via the updateEvent function from EventContext and redirects back to
// the organizer dashboard.
const EditarEventoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { events, updateEvent } = useEvents();
  const { userProfile } = useAuth();

  // Find the event to edit from the context. If not found, eventToEdit will be undefined.
  const eventToEdit = events.find(ev => ev.id === id);

  // Local state for the form. Initialize with empty strings and update once eventToEdit is loaded.
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: CATEGORIES[0].name,
    date: '',
    location: '',
    price: '0',
    imageUrl: '',
  });

  // When the event to edit becomes available, populate the formData state.
  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        title: eventToEdit.title || '',
        description: eventToEdit.description || '',
        category: eventToEdit.category || CATEGORIES[0].name,
        // Convert ISO date string to input format expected by datetime-local (YYYY-MM-DDTHH:MM)
        date: eventToEdit.date ? eventToEdit.date.substring(0, 16) : '',
        location: eventToEdit.location || '',
        price: eventToEdit.price !== undefined ? String(eventToEdit.price) : '0',
        imageUrl: eventToEdit.imageUrl || '',
      });
    }
  }, [eventToEdit]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    if (!formData.title || !formData.date || !formData.location) {
      alert('Por favor, completa los campos obligatorios: título, fecha y ubicación.');
      return;
    }
    const eventData: Omit<Event, 'id'> = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      featured: eventToEdit?.featured || false,
      coordinates: eventToEdit?.coordinates || { lat: 13.692, lng: -89.231 },
      organizer: userProfile?.companyName || userProfile?.name || eventToEdit?.organizer || 'Anónimo',
    };
    try {
      await updateEvent(id, eventData);
      alert('Evento actualizado con éxito');
      navigate('/organizar');
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Ocurrió un error al actualizar el evento.');
    }
  };

  // If the event is not found, display a message
  if (!eventToEdit) {
    return <p className="text-center py-12">Evento no encontrado.</p>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-dark mb-6">Editar Evento</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">Título del Evento</label>
            <Input id="title" name="title" type="text" value={formData.title} onChange={handleChange} placeholder="Ej: Concierto de Verano" required />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-sm" placeholder="Describe tu evento..."></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">Categoría</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-sm">
                {CATEGORIES.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-1">Fecha</label>
              <Input id="date" name="date" type="datetime-local" value={formData.date} onChange={handleChange} required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-1">Ubicación</label>
              <Input id="location" name="location" type="text" value={formData.location} onChange={handleChange} placeholder="Ej: Teatro Nacional" required />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-1">Precio ($)</label>
              <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} placeholder="0.00" min="0" step="0.01" />
            </div>
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-1">URL de la Imagen</label>
            <Input id="imageUrl" name="imageUrl" type="text" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/imagen.jpg" />
          </div>
          <div className="flex justify-end pt-4">
            <Button type="button" variant="outline" className="mr-4" onClick={() => navigate('/organizar')}>Cancelar</Button>
            <Button type="submit" variant="primary">
              Actualizar Evento
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarEventoPage;