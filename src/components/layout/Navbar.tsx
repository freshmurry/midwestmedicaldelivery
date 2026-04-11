import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Service Areas', path: '/areas' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Link */}
          <Link
            to="/"
            className="hover:opacity-80 transition-all active:scale-95 duration-200 flex items-center"
            aria-label="MMC Home"
          >
            <Logo className="h-12" />
          </Link>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-bold transition-colors hover:text-mmc-teal tracking-tight",
                  location.pathname === link.path
                    ? "text-mmc-teal"
                    : "text-mmc-dark"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild className="bg-mmc-teal hover:bg-mmc-teal/90 text-white rounded-full px-6 shadow-sm active:scale-95 transition-transform">
              <Link to="/contact">Request Delivery</Link>
            </Button>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-mmc-dark hover:text-mmc-teal transition-colors p-2"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 py-6 px-4 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block text-xl font-bold py-3 px-4 rounded-xl active:bg-mmc-light transition-colors",
                location.pathname === link.path ? "text-mmc-teal bg-mmc-teal/5" : "text-mmc-dark"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 px-4">
            <Button asChild className="w-full bg-mmc-teal hover:bg-mmc-teal/90 text-white rounded-2xl py-7 text-lg font-bold shadow-md">
              <Link to="/contact" onClick={() => setIsOpen(false)}>Request Delivery</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}