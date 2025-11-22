import React from 'react';
import { Link } from 'react-router-dom';

const LegalPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-dark mb-6">Centro Legal</h1>
        <p className="text-gray-600 mb-8">
          Encuentra información importante sobre nuestras políticas y términos de servicio.
        </p>
        <ul className="space-y-4">
          <li>
            <Link to="/legal/terminos" className="text-lg font-semibold text-primary hover:underline">
              Términos y Condiciones
            </Link>
            <p className="text-gray-500">Reglas y directrices para usar SivarSpot.</p>
          </li>
          <li>
            <Link to="/legal/privacidad" className="text-lg font-semibold text-primary hover:underline">
              Política de Privacidad
            </Link>
            <p className="text-gray-500">Cómo manejamos y protegemos tu información.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LegalPage;
