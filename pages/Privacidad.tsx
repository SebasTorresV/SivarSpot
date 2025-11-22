import React from 'react';

const PrivacidadPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-dark mb-6">Política de Privacidad</h1>
        <div className="prose max-w-none text-gray-700 space-y-4">
            <p><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}</p>
            <p>
                Tu privacidad es importante para nosotros. Es política de SivarSpot respetar tu privacidad con respecto a cualquier información que podamos recopilar de ti a través de nuestro sitio web.
            </p>
            <h2 className="text-xl font-bold text-dark">1. Información que recopilamos</h2>
            <p>
                [Contenido de marcador de posición para la sección de información recopilada...]
            </p>
            <h2 className="text-xl font-bold text-dark">2. Cómo usamos tu información</h2>
            <p>
                [Contenido de marcador de posición para la sección de uso de información...]
            </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacidadPage;
