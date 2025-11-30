import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { canViewAnalytics } from '@utils/roleUtils';
import logoIcon from "@assets/logo.png"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    
    const userRole = (user as any)?.role || (user as any)?.rol || '';
    const showAnalytics = canViewAnalytics(userRole);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-primary top-0 text-white sticky w-full z-50 transition-all duration-300 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-wider text-white flex items-center">
                    <img src={logoIcon} alt="200 Millas Logo" className="h-8 w-8 mr-2" />
                    200 MILLAS
                </Link>

                {/* Desktop Navigation (Admin/Empleado only) */}
                <nav className="hidden md:flex items-center space-x-8 uppercase text-sm tracking-widest">
                    <Link to={isAuthenticated ? "/dashboard" : "/login"} className="hover:text-gray-300 transition-colors">Dashboard</Link>
                    {isAuthenticated && (
                        <Link to="/products" className="hover:text-gray-300 transition-colors">Productos</Link>
                    )}
                    {isAuthenticated && showAnalytics && (
                        <Link to="/analytics" className="hover:text-gray-300 transition-colors">Analytics</Link>
                    )}

                    <div className="flex items-center space-x-4 ml-4 border-l border-white/20 pl-8">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm normal-case font-medium">Hola, {user?.nombre}</span>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 border border-white text-white hover:bg-white hover:text-primary transition-all rounded-sm"
                                >
                                    Salir
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-gray-300 transition-colors">Login</Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav className="md:hidden bg-primary absolute w-full border-t border-white/10 h-screen">
                        <div className="flex flex-col items-center py-8 space-y-6 uppercase text-sm tracking-widest">
                        <Link to={isAuthenticated ? "/dashboard" : "/login"} className="hover:text-gray-300 text-lg" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                        {isAuthenticated && (
                            <Link to="/products" className="hover:text-gray-300 text-lg" onClick={() => setIsMenuOpen(false)}>Productos</Link>
                        )}
                        {isAuthenticated && showAnalytics && (
                            <Link to="/analytics" className="hover:text-gray-300 text-lg" onClick={() => setIsMenuOpen(false)}>Analytics</Link>
                        )}
                        <hr className="w-12 border-white/20" />

                        {isAuthenticated ? (
                            <>
                                <span className="text-lg normal-case font-bold">Hola, {user?.nombre}</span>
                                <button onClick={handleLogout} className="hover:text-gray-300 text-lg">Cerrar Sesión</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-gray-300 text-lg" onClick={() => setIsMenuOpen(false)}>Login</Link>
                            </>
                        )}
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;