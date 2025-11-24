import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// Ajustamos las importaciones para que sean más robustas
import { Menu, X, User, Bookmark } from '../../icons'; 
import Button from '../ui/Button'; 

// Importación directa de la imagen. 
// Asumimos que Header.tsx está en src/components/layout/
// y SivarSpot.png está en src/
import logoSivar from '../../SivarSpot.png';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { userProfile, logout } = useAuth();
    const isAuthenticated = !!userProfile;
    
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `font-medium transition-colors text-gray-600 hover:text-primary ${isActive ? 'text-primary' : ''}`;

    const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
        `block py-2 px-3 rounded-md font-medium transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`;

    const mainNavLinks = (
        <>
            <NavLink to="/explorar" className={navLinkClass}>Explorar</NavLink>
            <NavLink to="/eventos" className={navLinkClass}>Eventos</NavLink>
            <NavLink to="/categorias" className={navLinkClass}>Categorías</NavLink>
            {userProfile?.role === 'organizador' && (
              <NavLink to="/organizar" className={navLinkClass}>Organizar un evento</NavLink>
            )}
        </>
    );

    return (
        <header className="bg-gray-100 sticky top-0 z-50 border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* LOGO SECTION */}
                    <div className="flex-shrink-0">
                        <Link to="/explorar" className="flex items-center">
                            {/* Usamos la imagen importada en lugar del texto */}
                            <img 
                                src={logoSivar} 
                                alt="SivarSpot Logo" 
                                className="h-12 w-auto object-contain hover:opacity-90 transition-opacity" 
                            />
                        </Link>
                    </div>

                    {/* DESKTOP NAVIGATION */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {mainNavLinks}
                    </nav>

                    {/* USER MENU (DESKTOP) */}
                    <div className="hidden md:flex items-center">
                        {isAuthenticated && userProfile ? (
                            <div className="relative group pb-2">
                                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary font-medium focus:outline-none">
                                    <User className="w-6 h-6" />
                                    <span>Mi Cuenta</span>
                                </button>
                                {/* Dropdown Menu */}
                                <div className="absolute right-0 top-full pt-2 w-52 bg-white rounded-md shadow-lg z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible border border-gray-100">
                                    <div className="px-4 py-2 text-sm text-gray-700">
                                        <p className="font-semibold truncate" title={userProfile.email}>{userProfile.email}</p>
                                        <p className="text-xs text-gray-500 capitalize">Rol: {userProfile?.role}</p>
                                    </div>
                                    <div className="border-t border-gray-100"></div>
                                    <Link to="/guardados" className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                        <Bookmark className="w-5 h-5 mr-3 text-gray-500" />
                                        <span>Mis Guardados</span>
                                    </Link>
                                    <button onClick={logout} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                      {/* Spacer icon for alignment if needed, or just margin */}
                                      <span className="w-5 h-5 mr-3 flex items-center justify-center text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                      </span>
                                      <span>Cerrar Sesión</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                           <Link to="/login">
                             <Button variant="primary" className="!font-semibold !px-6 !py-2.5 !rounded-lg shadow-sm hover:shadow-md transition-all">Iniciar Sesión</Button>
                           </Link>
                        )}
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menú" className="text-gray-700 hover:text-primary focus:outline-none">
                            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU */}
            {isMenuOpen && (
                 <div className="md:hidden bg-white shadow-lg border-t border-gray-100 animate-fadeIn">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        <NavLink to="/explorar" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Explorar</NavLink>
                        <NavLink to="/eventos" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Eventos</NavLink>
                        <NavLink to="/categorias" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Categorías</NavLink>
                        {userProfile?.role === 'organizador' && (
                          <NavLink to="/organizar" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Organizar un evento</NavLink>
                        )}
                        <hr className="my-3 border-gray-100"/>
                        {isAuthenticated && userProfile ? (
                             <>
                                <div className="px-2 py-2 text-sm text-gray-700 bg-gray-50 rounded-md mb-2">
                                    <p className="font-semibold truncate">{userProfile.email}</p>
                                    <p className="text-xs text-gray-500 capitalize">Rol: {userProfile?.role}</p>
                                </div>
                                <Link to="/guardados" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>
                                    Mis Guardados
                                </Link>
                                <Button variant="outline" className="w-full mt-2 border-gray-300 text-gray-700 hover:bg-gray-50" onClick={() => { logout(); setIsMenuOpen(false); }}>
                                    Cerrar Sesión
                                </Button>
                             </>
                        ) : (
                            <Link to="/login" className="block w-full mt-4" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="primary" className="w-full !font-semibold shadow-sm">Iniciar Sesión</Button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
