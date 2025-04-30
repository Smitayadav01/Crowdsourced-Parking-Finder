import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Car, Menu, X, MapPin, Plus, User, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) => 
    `px-3 py-2 rounded-md flex items-center gap-2 transition-colors
    ${isActive 
      ? 'bg-purple-50 text-purple-700 font-medium' 
      : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-purple-700 font-bold text-xl">
            <Car className="h-6 w-6" />
            <span>ParkSpot</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            <NavLink to="/map" className={navLinkClasses}>
              <MapPin className="h-5 w-5" />
              <span>Find Parking</span>
            </NavLink>
            
            {isAuthenticated && (
              <NavLink to="/add-spot" className={navLinkClasses}>
                <Plus className="h-5 w-5" />
                <span>Add Spot</span>
              </NavLink>
            )}
            
            {isAuthenticated ? (
              <>
                <NavLink to="/profile" className={navLinkClasses}>
                  <User className="h-5 w-5" />
                  <span>{user?.name || 'Profile'}</span>
                </NavLink>
                <button 
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className={navLinkClasses}>
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </NavLink>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md animate-slide-up">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink to="/map" className={navLinkClasses} onClick={closeMenu}>
              <MapPin className="h-5 w-5" />
              <span>Find Parking</span>
            </NavLink>
            
            {isAuthenticated && (
              <NavLink to="/add-spot" className={navLinkClasses} onClick={closeMenu}>
                <Plus className="h-5 w-5" />
                <span>Add Spot</span>
              </NavLink>
            )}
            
            {isAuthenticated ? (
              <>
                <NavLink to="/profile" className={navLinkClasses} onClick={closeMenu}>
                  <User className="h-5 w-5" />
                  <span>{user?.name || 'Profile'}</span>
                </NavLink>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <NavLink to="/login" className={navLinkClasses} onClick={closeMenu}>
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header
