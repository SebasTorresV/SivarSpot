import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Event } from '../types';

interface EventContextType {
  events: Event[];
  loading: boolean;
  addEvent: (eventData: Omit<Event, 'id'>) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  updateEvent: (eventId: string, eventData: Omit<Event, 'id'>) => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Event[] = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        // Keep events empty on error to reflect backend unavailability
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const addEvent = async (eventData: Omit<Event, 'id'>): Promise<void> => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const newEvent: Event = await response.json();
      setEvents(prevEvents => [newEvent, ...prevEvents]);
    } catch (error) {
      console.error("Error creating event:", error);
      throw error; // Re-throw error to be handled by the UI form
    }
  };
  
  const updateEvent = async (eventId: string, eventData: Omit<Event, 'id'>): Promise<void> => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) {
        throw new Error('Failed to update event');
      }
      const updated: Event = await response.json();
      setEvents(prevEvents => prevEvents.map(ev => (ev.id === eventId ? updated : ev)));
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  };
  
  const deleteEvent = async (eventId: string): Promise<void> => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  };

  return (
    <EventContext.Provider value={{ events, loading, addEvent, deleteEvent, updateEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
