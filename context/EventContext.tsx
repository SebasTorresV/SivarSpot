import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Event } from "../types";
import { supabase } from "../utils/supabaseClient";

interface EventContextType {
  events: Event[];
  loading: boolean;
  addEvent: (eventData: Omit<Event, "id">) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  updateEvent: (eventId: string, eventData: Omit<Event, "id">) => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

// --- CORRECCIÓN AQUÍ: Mapeamos organizer_id ---
const mapRowToEvent = (row: any): Event => ({
  id: row.id,
  title: row.title,
  description: row.description ?? "",
  category: row.category_slug ?? "",
  date: row.date_time,
  location: row.location ?? "",
  coordinates: {
    lat: Number(row.lat ?? 0),
    lng: Number(row.lng ?? 0),
  },
  price: Number(row.price ?? 0),
  imageUrl: row.image_url ?? "",
  organizer: row.organizer_name ?? "",
  featured: row.featured ?? false,
  organizer_id: row.organizer_id, // <--- ¡ESTO FALTABA!
});

const mapEventToRow = (event: Omit<Event, "id">) => ({
  title: event.title,
  description: event.description,
  category_slug: event.category,
  date_time: event.date,
  location: event.location,
  lat: event.coordinates.lat,
  lng: event.coordinates.lng,
  price: event.price,
  image_url: event.imageUrl,
  organizer_name: event.organizer,
  featured: event.featured,
  // No necesitamos enviar organizer_id aquí porque la base de datos lo pone sola
});

export const EventProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*") // Trae todas las columnas, incluyendo organizer_id
          .order("date_time", { ascending: true });

        if (error) {
          console.error("Supabase error:", error);
          setEvents([]);
          return;
        }

        const mapped = (data ?? []).map(mapRowToEvent);
        setEvents(mapped);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const addEvent = async (eventData: Omit<Event, "id">): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from("events")
        .insert([mapEventToRow(eventData)])
        .select("*")
        .single();

      if (error) throw error;

      if (data) {
        const newEvent = mapRowToEvent(data);
        setEvents((prevEvents) => [newEvent, ...prevEvents]);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  };

  const updateEvent = async (
    eventId: string,
    eventData: Omit<Event, "id">
  ): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from("events")
        .update(mapEventToRow(eventData))
        .eq("id", eventId)
        .select("*")
        .single();

      if (error) throw error;

      if (data) {
        const updated = mapRowToEvent(data);
        setEvents((prevEvents) =>
          prevEvents.map((ev) => (ev.id === eventId ? updated : ev))
        );
      }
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  };

  const deleteEvent = async (eventId: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventId);

      if (error) throw error;

      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  };

  return (
    <EventContext.Provider
      value={{ events, loading, addEvent, deleteEvent, updateEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};
