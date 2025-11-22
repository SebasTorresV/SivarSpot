import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, Bookmark } from '../icons';
import Button from './ui/Button';

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
                    <div className="flex-shrink-0">
                        <Link to="/explorar" className="text-2xl font-extrabold text-primary">
                            Sivar<span className="text-secondary">Spot</span>
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        {mainNavLinks}
                    </nav>

                    <div className="hidden md:flex items-center">
                        {isAuthenticated && userProfile ? (
                            <div className="relative group pb-2">
                                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary font-medium">
                                    <User className="w-6 h-6" />
                                    <span>Mi Cuenta</span>
                                </button>
                                <div className="absolute right-0 top-full pt-2 w-52 bg-white rounded-md shadow-lg z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible">
                                    <div className="px-4 py-2 text-sm text-gray-700">
                                        <p className="font-semibold truncate">{userProfile.email}</p>
                                        <p className="text-xs text-gray-500">Rol: {userProfile?.role}</p>
                                    </div>
                                    <div className="border-t border-gray-100"></div>
                                    <Link to="/guardados" className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <Bookmark className="w-5 h-5 mr-3 text-gray-500" />
                                        <span>Mis Guardados</span>
                                    </Link>
                                    <button onClick={logout} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                      <span className="w-5 h-5 mr-3" /> {/* Spacer for alignment */}
                                      <span>Cerrar Sesión</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                           <Link to="/login">
                             <Button variant="primary" className="!font-semibold !px-6 !py-2.5 !rounded-lg">Iniciar Sesión</Button>
                           </Link>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menú">
                            {isMenuOpen ? <X className="w-6 h-6 text-dark" /> : <Menu className="w-6 h-6 text-dark" />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                 <div className="md:hidden bg-white shadow-lg">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        <NavLink to="/explorar" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Explorar</NavLink>
                        <NavLink to="/eventos" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Eventos</NavLink>
                        <NavLink to="/categorias" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Categorías</NavLink>
                        {userProfile?.role === 'organizador' && (
                          <NavLink to="/organizar" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Organizar un evento</NavLink>
                        )}
                        <hr className="my-3"/>
                        {isAuthenticated && userProfile ? (
                             <>
                                <div className="px-1 py-2 text-sm text-gray-700">
                                    <p className="font-semibold">Email: {userProfile.email}</p>
                                    <p className="font-semibold">Rol: {userProfile?.role}</p>
                                </div>
                                <Button variant="outline" className="w-full" onClick={() => { logout(); setIsMenuOpen(false); }}>Cerrar Sesión</Button>
                             </>
                        ) : (
                            <Link to="/login" className="block w-full" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="primary" className="w-full !font-semibold">Iniciar Sesión</Button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;