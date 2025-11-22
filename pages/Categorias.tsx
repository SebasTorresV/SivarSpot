import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { slugify } from '../utils/slug';

const CategoriasPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-dark mb-8 text-center">Explora por Categoría</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 max-w-4xl mx-auto">
        {CATEGORIES.map(category => (
          <Link
            key={category.name}
            to={`/categorias/${slugify(category.name)}`}
            className="group flex flex-col items-center justify-center text-center p-6 bg-white rounded-xl shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:bg-primary"
          >
            <category.icon className="w-12 h-12 text-primary transition-colors duration-300 group-hover:text-white" />
            <span className="mt-4 font-semibold text-dark transition-colors duration-300 group-hover:text-white">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriasPage;