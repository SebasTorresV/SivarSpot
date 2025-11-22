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
}

export interface Category {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}