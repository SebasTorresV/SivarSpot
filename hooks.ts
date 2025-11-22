
import { useState, useEffect, useCallback } from 'react';

export function useSavedEvents() {
  // FIX: Event IDs from Firestore are strings, not numbers.
  const [savedEvents, setSavedEvents] = useState<string[]>([]);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem('savedEvents');
      if (item) {
        setSavedEvents(JSON.parse(item));
      }
    } catch (error) {
      console.error('Error reading from localStorage', error);
    }
  }, []);

  // FIX: eventId should be a string to match the event.id type.
  const toggleSaveEvent = useCallback((eventId: string) => {
    setSavedEvents(prevSavedEvents => {
      const isSaved = prevSavedEvents.includes(eventId);
      const newSavedEvents = isSaved
        ? prevSavedEvents.filter(id => id !== eventId)
        : [...prevSavedEvents, eventId];
      
      try {
        window.localStorage.setItem('savedEvents', JSON.stringify(newSavedEvents));
      } catch (error) {
        console.error('Error writing to localStorage', error);
      }
      
      return newSavedEvents;
    });
  }, []);
  
  // FIX: eventId should be a string to match the event.id type.
  const isEventSaved = useCallback((eventId: string) => {
    return savedEvents.includes(eventId);
  }, [savedEvents]);

  return { savedEvents, toggleSaveEvent, isEventSaved };
}