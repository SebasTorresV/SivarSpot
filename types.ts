import type React from 'react';

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  price: number;
  imageUrl: string;
  organizer: string;
  featured: boolean;
  
  // 👇 AGREGA ESTA LÍNEA (El signo ? es por si algún evento viejo no lo tiene)
  organizer_id?: string;
}

export interface Category {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}
