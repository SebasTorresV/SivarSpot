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

            {/* SECCIÓN 1 */}
            <h2 className="text-xl font-bold text-dark mt-6">1. Información que recopilamos</h2>
            <p>
                Recopilamos información de dos maneras: información que tú nos proporcionas voluntariamente e información que se recopila automáticamente cuando utilizas nuestros servicios.
            </p>
            <ul className="list-disc pl-5 space-y-2">
                <li>
                    <strong>Información Personal:</strong> Cuando te registras en SivarSpot (ya sea como Visitante u Organizador), podemos pedirte información como tu nombre, dirección de correo electrónico, nombre de la empresa y enlaces a redes sociales.
                </li>
                <li>
                    <strong>Datos de Eventos:</strong> Si eres un Organizador, recopilamos la información de los eventos que publicas (títulos, fechas, ubicaciones, precios e imágenes). Ten en cuenta que esta información está destinada a ser pública.
                </li>
                <li>
                    <strong>Datos de Uso:</strong> Podemos recopilar información sobre cómo accedes y utilizas el servicio, como tu tipo de navegador, tiempo de visita y páginas visitadas.
                </li>
            </ul>

            {/* SECCIÓN 2 */}
            <h2 className="text-xl font-bold text-dark mt-6">2. Cómo usamos tu información</h2>
            <p>
                Usamos la información recopilada para diversos fines, que incluyen:
            </p>
            <ul className="list-disc pl-5 space-y-2">
                <li>
                    <strong>Proveer y mantener nuestro servicio:</strong> Para gestionar tu cuenta, permitir el inicio de sesión y asegurar que la plataforma funcione correctamente.
                </li>
                <li>
                    <strong>Publicación de Eventos:</strong> Para mostrar públicamente los eventos que los Organizadores crean, permitiendo que los Visitantes los encuentren.
                </li>
                <li>
                    <strong>Comunicación:</strong> Para contactarte con actualizaciones, boletines informativos (si te has suscrito) o avisos de seguridad relacionados con tu cuenta.
                </li>
                <li>
                    <strong>Seguridad:</strong> Para monitorear y prevenir el uso no autorizado o abusivo de la plataforma.
                </li>
            </ul>

            {/* SECCIONES EXTRA RECOMENDADAS */}
            <h2 className="text-xl font-bold text-dark mt-6">3. Compartir información</h2>
            <p>
                SivarSpot <strong>no vende</strong> ni alquila tu información personal a terceros. Sin embargo, podemos compartir información en las siguientes situaciones:
            </p>
            <ul className="list-disc pl-5 space-y-2">
                <li>
                    <strong>Información Pública:</strong> Si eres un Organizador, la información de tu perfil público (nombre de la empresa, redes sociales) y los detalles de tus eventos son accesibles para cualquier visitante del sitio.
                </li>
                <li>
                    <strong>Requisitos Legales:</strong> Podemos divulgar tu información si así lo exige la ley o en respuesta a solicitudes válidas de las autoridades públicas (por ejemplo, un tribunal o una agencia gubernamental).
                </li>
            </ul>

            <h2 className="text-xl font-bold text-dark mt-6">4. Seguridad de los datos</h2>
            <p>
                La seguridad de tus datos es importante para nosotros. Utilizamos métodos comercialmente aceptables para proteger tu información personal, pero recuerda que ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro. Nos esforzamos por proteger tus datos, pero no podemos garantizar su seguridad absoluta.
            </p>

            <h2 className="text-xl font-bold text-dark mt-6">5. Tus derechos</h2>
            <p>
                Dependiendo de tu ubicación, tienes derechos sobre tus datos personales, incluyendo el derecho a acceder, corregir o eliminar la información que tenemos sobre ti. Si deseas eliminar tu cuenta o modificar tus datos, puedes hacerlo desde la configuración de tu perfil o contactándonos directamente.
            </p>

            <h2 className="text-xl font-bold text-dark mt-6">6. Contacto</h2>
            <p>
                Si tienes alguna pregunta sobre esta Política de Privacidad, puedes contactarnos a través de nuestro correo electrónico de soporte.
            </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacidadPage;
