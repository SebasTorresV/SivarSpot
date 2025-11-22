import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center flex flex-col items-center justify-center h-full">
      <h1 className="text-6xl font-extrabold text-primary">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-dark">Página no encontrada</h2>
      <p className="mt-2 text-lg text-gray-500">Lo sentimos, la página que buscas no existe.</p>
      <Link to="/explorar" className="mt-8">
        <Button variant="primary">Volver a Explorar</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
