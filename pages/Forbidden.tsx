import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const ForbiddenPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center flex flex-col items-center justify-center h-full">
      <h1 className="text-6xl font-extrabold text-red-500">403</h1>
      <h2 className="mt-4 text-3xl font-bold text-dark">Acceso Denegado</h2>
      <p className="mt-2 text-lg text-gray-500">Esta sección es solo para organizadores.</p>
      <div className="mt-8 space-x-4">
        <Link to="/explorar">
            <Button variant="primary">Volver a Explorar</Button>
        </Link>
        <Button variant="outline">Solicitar Rol</Button>
      </div>
    </div>
  );
};

export default ForbiddenPage;
