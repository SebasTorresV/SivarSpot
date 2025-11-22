import React from 'react';

const TerminosPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-dark mb-6">Términos y Condiciones</h1>
        <div className="prose max-w-none text-gray-700 space-y-4">
            <p><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}</p>
            <p>
                Bienvenido a SivarSpot. Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de SivarSpot.
            </p>
            <h2 className="text-xl font-bold text-dark">1. Aceptación de los términos</h2>
            <p>
                Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando SivarSpot si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.
            </p>
            <h2 className="text-xl font-bold text-dark">2. Contenido</h2>
            <p>
                [Contenido de marcador de posición para la sección de contenido...]
            </p>
            <h2 className="text-xl font-bold text-dark">3. Cuentas de usuario</h2>
            <p>
                [Contenido de marcador de posición para la sección de cuentas de usuario...]
            </p>
        </div>
      </div>
    </div>
  );
};

export default TerminosPage;
