import { useState } from 'react';
import { Menu, X, ShoppingCart, Users, Map, MessageSquare, Home, Video, LogIn, LogOut, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import ServerStatus from './ServerStatus';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Store', path: '/store', icon: ShoppingCart },
    { name: 'Leaderboard', path: '/leaderboard', icon: Users },
  ];

  const guideLinks = [
    { name: 'Staff Guide', path: '/guides/staff', icon: MessageSquare },
    { name: 'Media Guide', path: '/guides/media', icon: Video },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <div className="flex items-center space-x-8 xl:space-x-12">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group cursor-pointer flex-shrink-0">
              <img src="/logo.png" alt="Soulberry Logo" className="w-10 h-10 lg:w-12 lg:h-12 object-contain group-hover:scale-105 transition-transform" />
              <span className="font-display font-bold text-2xl lg:text-3xl tracking-tighter text-white whitespace-nowrap">
                SOUL<span className="text-[var(--secondary)]">BERRY</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      "flex items-center space-x-2 px-2 xl:px-4 py-2 rounded-md text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                      isActive 
                        ? "text-[var(--secondary)] scale-105" 
                        : "text-[var(--muted-foreground)] hover:text-[var(--secondary)] hover:scale-105"
                    )}
                  >
                    {/* <Icon className="w-4 h-4" /> */}
                    <span>{link.name}</span>
                  </Link>
                );
              })}
              
              <div className="relative group">
                <button className={cn(
                  "flex items-center space-x-2 px-2 xl:px-4 py-2 rounded-md text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                  location.pathname.startsWith('/guides')
                    ? "text-[var(--secondary)] scale-105"
                    : "text-[var(--muted-foreground)] hover:text-[var(--secondary)] hover:scale-105"
                )}>
                  <span>Guides</span>
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-[var(--card)] border border-[var(--border)] rounded-md shadow-xl py-2 mt-2 relative before:absolute before:-top-4 before:left-0 before:w-full before:h-4">
                    {guideLinks.map((link) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <Link
                          key={link.name}
                          to={link.path}
                          className={cn(
                            "block px-4 py-2 text-sm font-bold uppercase tracking-widest transition-colors",
                            isActive
                              ? "text-[var(--secondary)] bg-[var(--muted)]"
                              : "text-[var(--muted-foreground)] hover:text-[var(--secondary)] hover:bg-[var(--muted)]"
                          )}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3 bg-[var(--muted)]/50 pr-4 rounded-full border border-[var(--border)]">
                <img 
                  src={`https://crafthead.net/avatar/${user.platform === 'bedrock' ? '.' : ''}${user.username}/32`} 
                  alt={user.username}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-bold text-white">{user.username}</span>
                <button 
                  onClick={logout}
                  className="text-[var(--muted-foreground)] hover:text-red-400 ml-2 transition-all hover:scale-110"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 bg-[var(--primary)] hover:bg-[#A31845] text-white rounded-md text-sm font-bold uppercase tracking-wider transition-all hover:scale-105"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
            
            <ServerStatus />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden space-x-4">
            {user ? (
              <div className="flex items-center">
                <img 
                  src={`https://crafthead.net/avatar/${user.platform === 'bedrock' ? '.' : ''}${user.username}/32`} 
                  alt={user.username}
                  className="w-8 h-8 rounded-full"
                />
              </div>
            ) : (
              <Link to="/login" className="text-[var(--primary)] p-2">
                <LogIn className="w-5 h-5" />
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--background)]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium",
                    isActive 
                      ? "bg-[var(--primary)] text-white" 
                      : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            
            <div className="pt-2 pb-1">
              <div className="px-3 text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
                Guides
              </div>
              {guideLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium",
                      isActive 
                        ? "bg-[var(--primary)] text-white" 
                        : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
            
            {user && (
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex w-full items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-red-400 hover:bg-[var(--muted)]"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            )}

            <div className="px-3 py-3">
              <ServerStatus isMobile />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
