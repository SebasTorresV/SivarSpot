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

            {/* SECCIÓN 1 */}
            <h2 className="text-xl font-bold text-dark mt-6">1. Aceptación de los términos</h2>
            <p>
                Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando SivarSpot si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.
            </p>

            {/* SECCIÓN 2 */}
            <h2 className="text-xl font-bold text-dark mt-6">2. Contenido</h2>
            <p>
                Nuestra plataforma permite a los usuarios (especialmente a los "Organizadores") publicar, enlazar, almacenar, compartir y poner a disposición cierta información, textos, gráficos, videos u otro material (en adelante, el "Contenido").
            </p>
            <ul className="list-disc pl-5 space-y-2">
                <li>
                    <strong>Responsabilidad del Contenido:</strong> Usted es responsable del Contenido que publique en SivarSpot, incluida su legalidad, fiabilidad y adecuación. SivarSpot no se hace responsable de la veracidad de la información de los eventos publicados por terceros.
                </li>
                <li>
                    <strong>Derechos de Propiedad:</strong> Al publicar Contenido en SivarSpot, usted nos otorga el derecho y la licencia para usar, modificar, realizar públicamente, mostrar públicamente, reproducir y distribuir dicho Contenido en y a través de la plataforma. Usted conserva todos sus derechos sobre cualquier Contenido que envíe.
                </li>
                <li>
                    <strong>Contenido Prohibido:</strong> Está terminantemente prohibido publicar eventos falsos, ilegales, ofensivos, o que infrinjan los derechos de propiedad intelectual de terceros. Nos reservamos el derecho de eliminar cualquier evento que viole estas normas sin previo aviso.
                </li>
            </ul>

            {/* SECCIÓN 3 */}
            <h2 className="text-xl font-bold text-dark mt-6">3. Cuentas de usuario</h2>
            <p>
                Cuando crea una cuenta en SivarSpot, debe proporcionarnos información precisa, completa y actual en todo momento. El incumplimiento de esto constituye una violación de los Términos, que puede resultar en la terminación inmediata de su cuenta en nuestro servicio.
            </p>
            <ul className="list-disc pl-5 space-y-2">
                <li>
                    <strong>Seguridad:</strong> Usted es responsable de salvaguardar la contraseña que utiliza para acceder al servicio y de cualquier actividad o acción bajo su contraseña.
                </li>
                <li>
                    <strong>Roles de Usuario:</strong>
                    <ul className="list-circle pl-5 mt-1">
                        <li><em>Visitantes:</em> Usuarios que utilizan la plataforma para descubrir y asistir a eventos.</li>
                        <li><em>Organizadores:</em> Usuarios con permisos para crear, gestionar y promocionar eventos. Los Organizadores son los únicos responsables de la ejecución y gestión de sus eventos.</li>
                    </ul>
                </li>
                <li>
                    <strong>Notificación:</strong> Debe notificarnos inmediatamente al darse cuenta de cualquier violación de seguridad o uso no autorizado de su cuenta.
                </li>
            </ul>

            {/* SECCIONES EXTRA RECOMENDADAS */}
            <h2 className="text-xl font-bold text-dark mt-6">4. Cancelación y Reembolsos</h2>
            <p>
                SivarSpot actúa como intermediario de información. Las políticas de cancelación y reembolso son responsabilidad exclusiva del <strong>Organizador</strong> del evento. SivarSpot no se hace responsable de reembolsos por eventos cancelados, pospuestos o que no cumplan con las expectativas del asistente, salvo que se indique explícitamente lo contrario en la descripción del evento.
            </p>

            <h2 className="text-xl font-bold text-dark mt-6">5. Limitación de Responsabilidad</h2>
            <p>
                En ningún caso SivarSpot, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán responsables por cualquier daño indirecto, incidental, especial, consecuente o punitivo, incluyendo, sin limitación, pérdida de beneficios, datos, uso, buena voluntad, u otras pérdidas intangibles, resultantes de su acceso o uso o la imposibilidad de acceder o usar el servicio.
            </p>

            <h2 className="text-xl font-bold text-dark mt-6">6. Ley Aplicable</h2>
            <p>
                Estos Términos se regirán e interpretarán de acuerdo con las leyes de <strong>la República de El Salvador</strong>, sin tener en cuenta sus disposiciones sobre conflictos de leyes.
            </p>
        </div>
      </div>
    </div>
  );
};

export default TerminosPage;
