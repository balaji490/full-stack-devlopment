import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { HomeIcon, MembershipIcon, DashboardIcon, AddIcon, HistoryIcon, GoalsIcon, LoginIcon } from './Icons';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home', Icon: HomeIcon },
    { path: '/membership', label: 'Membership', Icon: MembershipIcon },
    { path: '/dashboard', label: 'Dashboard', Icon: DashboardIcon },
    { path: '/add', label: 'Add Activity', Icon: AddIcon },
    { path: '/history', label: 'History', Icon: HistoryIcon },
    { path: '/goals', label: 'Goals', Icon: GoalsIcon }
  ];

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-2xl sticky top-0 z-50 backdrop-blur-md bg-opacity-95 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Logo />
          
          <div className="flex items-center gap-4">
            {navLinks.map((link) => {
              const Icon = link.Icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                    isActive(link.path)
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold shadow-lg shadow-orange-500/50'
                      : 'hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-900 text-gray-300 hover:text-white border border-transparent hover:border-orange-500/50'
                  }`}
                >
                  <Icon />
                  <span className="hidden lg:inline">{link.label}</span>
                </Link>
              );
            })}
            {isAuthenticated ? (
              <>
                <span className="hidden lg:inline text-gray-300 text-sm px-3 font-medium">
                  {currentUser?.name || currentUser?.email || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg transition-all flex items-center gap-2 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 text-gray-300 hover:text-white border border-transparent hover:border-red-500/50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  isActive('/login')
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold shadow-lg shadow-orange-500/50'
                    : 'hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-900 text-gray-300 hover:text-white border border-transparent hover:border-orange-500/50'
                }`}
              >
                <LoginIcon />
                <span className="hidden lg:inline">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
