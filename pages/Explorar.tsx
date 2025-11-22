import React from 'react';
import { CATEGORIES } from '../constants';
import { useEvents } from '../context/EventContext';
import Button from '../components/ui/Button';
import { Search } from '../icons';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { useSavedEvents } from '../hooks';
import { slugify } from '../utils/slug';

const ExplorarPage: React.FC = () => {
  const { isEventSaved, toggleSaveEvent } = useSavedEvents();
  const { events, loading } = useEvents();

  const featuredEvents = events.filter(event => event.featured);
  const upcomingEvents = events.filter(event => !event.featured).slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-primary text-white text-center" style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723a9ce6890?q=80&w=2070&auto=format&fit=crop')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}>
        <div className="absolute inset-0 bg-[#002A6E] opacity-80"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="py-20 md:py-28">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">El Salvador te espera.</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">Encuentra los mejores eventos, actividades y lugares para explorar en el corazón de Centroamérica.</p>
            <div className="mt-8">
              <Link to="/eventos">
                 <Button variant="secondary" className="text-lg px-10 py-4 !rounded-md">¡Empieza a explorar!</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white pb-1"> {/* This wrapper helps with the transition from hero to search */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div id="search-bar" className="relative -mt-16 z-20">
            <div className="max-w-5xl mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  <div className="md:col-span-5 w-full">
                    <label htmlFor="keyword" className="block text-sm font-semibold text-gray-700 mb-1">Palabra clave</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input 
                        type="text" id="keyword"
                        className="w-full h-[48px] p-3 pl-10 bg-[#f3f4f6] border-gray-300 rounded-md text-dark placeholder-gray-400 focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="Buscar por nombre..."
                      />
                    </div>
                  </div>
                  <div className="md:col-span-3 w-full">
                    <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-1">Fecha</label>
                    <select id="date" className="w-full h-[48px] px-3 bg-[#f3f4f6] border-gray-300 rounded-md appearance-none text-dark focus:ring-2 focus:ring-secondary focus:border-transparent">
                      <option>Cualquier fecha</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 w-full">
                    <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-1">Precio</label>
                    <select id="price" className="w-full h-[48px] px-3 bg-[#f3f4f6] border-gray-300 rounded-md appearance-none text-dark focus:ring-2 focus:ring-secondary focus:border-transparent">
                      <option>Todos</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 w-full">
                    <Button type="submit" className="w-full flex items-center justify-center p-3 h-[48px] !rounded-md">
                        <Search className="w-5 h-5 mr-2"/>
                        <span>Buscar</span>
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Categories */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center text-dark mb-12">Explora por Categoría</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {CATEGORIES.map(category => (
                <Link
                  key={category.name}
                  to={`/categorias/${slugify(category.name)}`}
                  className="group flex flex-col items-center justify-center text-center p-4 sm:p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm transition-all duration-300 ease-in-out cursor-pointer hover:shadow-md hover:-translate-y-1"
                >
                  <category.icon className="w-10 h-10 text-primary" />
                  <span className="mt-4 font-semibold text-gray-800">{category.name}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
      
      {/* Event sections on a light background */}
      <div className="bg-light py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           {/* Featured Events */}
          <section>
            {loading ? <p className="text-center">Cargando eventos...</p> :
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredEvents.map(event => (
                      <EventCard 
                          key={event.id} 
                          event={event}
                          isSaved={isEventSaved(event.id)}
                          onToggleSave={toggleSaveEvent}
                      />
                  ))}
              </div>
            }
          </section>

           {/* Upcoming Events */}
           <section className="mt-16">
            <h2 className="text-3xl font-bold text-center text-dark mb-12">Próximos Eventos</h2>
             {loading ? <p className="text-center">Cargando eventos...</p> :
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {upcomingEvents.map(event => (
                      <EventCard 
                          key={event.id} 
                          event={event}
                          isSaved={isEventSaved(event.id)}
                          onToggleSave={toggleSaveEvent}
                      />
                  ))}
              </div>
            }
            <div className="text-center mt-12">
                <Link to="/eventos">
                    <Button variant="outline">Ver todos los eventos</Button>
                </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ExplorarPage;